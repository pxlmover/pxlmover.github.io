/**
 * AudioAnalysis MIDI Control System
 * Professional-grade MIDI control integration for real-time audio analysis
 * Features: Web MIDI API, Web Audio API, parameter mapping, MIDI learn
 */

class AudioAnalysisMIDI {
  constructor() {
    // Core system components
    this.midiAccess = null;
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.dataArray = null;
    this.freqDataArray = null;
    this.isAnalysisRunning = false;
    
    // MIDI device management
    this.connectedDevices = new Map();
    this.midiMappings = new Map();
    this.learningParam = null;
    
    // Audio analysis parameters
    this.parameters = {
      'low-freq': { value: 0, min: 0, max: 100, cc: null },
      'mid-freq': { value: 0, min: 0, max: 100, cc: null },
      'high-freq': { value: 0, min: 0, max: 100, cc: null },
      'volume': { value: 0, min: 0, max: 100, cc: null },
      'dynamics': { value: 0, min: 0, max: 100, cc: null },
      'threshold': { value: 50, min: 0, max: 100, cc: null },
      'smoothing': { value: 25, min: 0, max: 100, cc: null },
      'sensitivity': { value: 75, min: 0, max: 100, cc: null },
      'resonance': { value: 10, min: 0, max: 100, cc: null }
    };
    
    // Performance monitoring
    this.performanceStats = {
      sampleRate: 0,
      bufferSize: 0,
      latency: 0
    };
    
    // Visualization
    this.canvas = null;
    this.canvasContext = null;
    this.animationFrame = null;
    
    // Initialize the system
    this.init();
  }

  init() {
    this.setupDOM();
    this.setupEventListeners();
    this.log('AudioAnalysis MIDI system initialized', 'info');
  }

  setupDOM() {
    // Get DOM elements
    this.canvas = document.getElementById('audio-visualizer');
    this.canvasContext = this.canvas?.getContext('2d');
    
    // Initialize canvas
    if (this.canvas && this.canvasContext) {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }

  setupEventListeners() {
    // MIDI controls
    document.getElementById('init-midi')?.addEventListener('click', () => this.initializeMIDI());
    document.getElementById('refresh-devices')?.addEventListener('click', () => this.refreshMIDIDevices());
    
    // Audio controls
    document.getElementById('start-audio')?.addEventListener('click', () => this.startAudioAnalysis());
    document.getElementById('stop-audio')?.addEventListener('click', () => this.stopAudioAnalysis());
    document.getElementById('audio-input-select')?.addEventListener('change', (e) => this.selectAudioInput(e.target.value));
    
    // Parameter learning
    document.querySelectorAll('.learn-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const param = e.target.getAttribute('data-param');
        this.startMIDILearn(param);
      });
    });
    
    // Utility controls
    document.getElementById('clear-log')?.addEventListener('click', () => this.clearLog());
  }

  async initializeMIDI() {
    try {
      if (!navigator.requestMIDIAccess) {
        throw new Error('Web MIDI API not supported in this browser');
      }

      this.log('Requesting MIDI access...', 'info');
      this.midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      
      this.midiAccess.addEventListener('statechange', (e) => this.handleMIDIStateChange(e));
      
      this.updateMIDIStatus('connected');
      this.refreshMIDIDevices();
      this.log('MIDI system initialized successfully', 'midi');
      
    } catch (error) {
      this.updateMIDIStatus('error');
      this.log(`MIDI initialization failed: ${error.message}`, 'error');
    }
  }

  refreshMIDIDevices() {
    if (!this.midiAccess) {
      this.log('MIDI not initialized', 'error');
      return;
    }

    const deviceList = document.getElementById('midi-device-list');
    if (!deviceList) return;

    deviceList.innerHTML = '';
    this.connectedDevices.clear();

    // Process input devices
    const inputs = Array.from(this.midiAccess.inputs.values());
    
    if (inputs.length === 0) {
      const noDeviceItem = document.createElement('li');
      noDeviceItem.className = 'midi-device-item';
      noDeviceItem.textContent = 'No MIDI input devices detected';
      deviceList.appendChild(noDeviceItem);
    } else {
      inputs.forEach(input => {
        const deviceItem = document.createElement('li');
        deviceItem.className = 'midi-device-item';
        
        const deviceInfo = document.createElement('span');
        deviceInfo.textContent = `${input.name} (${input.manufacturer || 'Unknown'})`;
        
        const connectBtn = document.createElement('button');
        connectBtn.className = 'btn';
        connectBtn.style.fontSize = '0.8em';
        connectBtn.style.padding = '6px 12px';
        connectBtn.textContent = 'Connect';
        
        connectBtn.addEventListener('click', () => this.connectMIDIDevice(input, deviceItem));
        
        deviceItem.appendChild(deviceInfo);
        deviceItem.appendChild(connectBtn);
        deviceList.appendChild(deviceItem);
      });
    }

    this.log(`Found ${inputs.length} MIDI input device(s)`, 'midi');
  }

  connectMIDIDevice(input, deviceElement) {
    try {
      input.addEventListener('midimessage', (e) => this.handleMIDIMessage(e));
      
      this.connectedDevices.set(input.id, {
        device: input,
        element: deviceElement
      });
      
      deviceElement.classList.add('active');
      const connectBtn = deviceElement.querySelector('.btn');
      if (connectBtn) {
        connectBtn.textContent = 'Connected';
        connectBtn.disabled = true;
      }
      
      this.log(`Connected to MIDI device: ${input.name}`, 'midi');
    } catch (error) {
      this.log(`Failed to connect MIDI device: ${error.message}`, 'error');
    }
  }

  handleMIDIMessage(event) {
    const [status, controller, value] = event.data;
    
    // Handle Control Change messages (0xB0-0xBF)
    if ((status & 0xF0) === 0xB0) {
      const channel = status & 0x0F;
      this.log(`MIDI CC: Controller ${controller}, Value ${value}, Channel ${channel}`, 'midi');
      
      // If we're in learning mode
      if (this.learningParam) {
        this.mapMIDIController(this.learningParam, controller);
        this.stopMIDILearn();
      }
      
      // Apply mapped parameter changes
      this.applyMIDIControl(controller, value);
    }
  }

  startMIDILearn(paramName) {
    // Stop any previous learning
    this.stopMIDILearn();
    
    this.learningParam = paramName;
    
    // Update UI
    const paramElement = document.querySelector(`[data-param="${paramName}"]`);
    const learnBtn = paramElement?.querySelector('.learn-btn');
    
    if (paramElement && learnBtn) {
      paramElement.classList.add('learning');
      learnBtn.classList.add('learning');
      learnBtn.textContent = 'Listening...';
    }
    
    this.log(`Learning MIDI mapping for parameter: ${paramName}`, 'info');
    
    // Auto-stop learning after 10 seconds
    setTimeout(() => {
      if (this.learningParam === paramName) {
        this.stopMIDILearn();
        this.log('MIDI learn timeout - no controller detected', 'error');
      }
    }, 10000);
  }

  stopMIDILearn() {
    if (!this.learningParam) return;
    
    const paramName = this.learningParam;
    const paramElement = document.querySelector(`[data-param="${paramName}"]`);
    const learnBtn = paramElement?.querySelector('.learn-btn');
    
    if (paramElement && learnBtn) {
      paramElement.classList.remove('learning');
      learnBtn.classList.remove('learning');
      learnBtn.textContent = 'Learn';
    }
    
    this.learningParam = null;
  }

  mapMIDIController(paramName, controllerId) {
    if (this.parameters[paramName]) {
      this.parameters[paramName].cc = controllerId;
      this.midiMappings.set(controllerId, paramName);
      
      // Update UI to show mapping
      const paramElement = document.querySelector(`[data-param="${paramName}"]`);
      if (paramElement) {
        paramElement.classList.add('mapped');
        const learnBtn = paramElement.querySelector('.learn-btn');
        if (learnBtn) {
          learnBtn.textContent = `CC${controllerId}`;
        }
      }
      
      this.log(`Mapped CC${controllerId} to parameter: ${paramName}`, 'midi');
    }
  }

  applyMIDIControl(controllerId, midiValue) {
    const paramName = this.midiMappings.get(controllerId);
    if (!paramName || !this.parameters[paramName]) return;
    
    const param = this.parameters[paramName];
    // Convert MIDI value (0-127) to parameter range
    const normalizedValue = midiValue / 127;
    const paramValue = param.min + (normalizedValue * (param.max - param.min));
    
    param.value = Math.round(paramValue);
    
    // Update UI
    const valueElement = document.getElementById(`${paramName}-value`);
    if (valueElement) {
      valueElement.textContent = param.value;
    }
    
    // Apply parameter to audio analysis
    this.applyAudioParameter(paramName, param.value);
  }

  applyAudioParameter(paramName, value) {
    if (!this.analyser) return;
    
    switch (paramName) {
      case 'smoothing':
        this.analyser.smoothingTimeConstant = value / 100;
        break;
      case 'threshold':
        // Custom threshold handling for visualization
        break;
      case 'sensitivity':
        // Adjust FFT size based on sensitivity
        break;
      // Add more parameter applications as needed
    }
    
    this.log(`Applied ${paramName}: ${value}`, 'audio');
  }

  async startAudioAnalysis() {
    try {
      if (this.isAnalysisRunning) {
        this.log('Audio analysis already running', 'error');
        return;
      }

      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });
      
      // Create analyser node
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.25;
      
      // Connect microphone to analyser
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);
      
      // Create data arrays
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.freqDataArray = new Uint8Array(bufferLength);
      
      this.isAnalysisRunning = true;
      this.updateAudioStatus('connected');
      
      // Update performance stats
      this.performanceStats.sampleRate = this.audioContext.sampleRate;
      this.performanceStats.bufferSize = bufferLength;
      this.performanceStats.latency = Math.round((bufferLength / this.audioContext.sampleRate) * 1000);
      this.updatePerformanceStats();
      
      // Start visualization
      this.startVisualization();
      
      this.log('Audio analysis started successfully', 'audio');
      
    } catch (error) {
      this.updateAudioStatus('error');
      this.log(`Failed to start audio analysis: ${error.message}`, 'error');
    }
  }

  stopAudioAnalysis() {
    this.isAnalysisRunning = false;
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.analyser = null;
    this.updateAudioStatus('');
    
    // Clear canvas
    if (this.canvasContext) {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    this.log('Audio analysis stopped', 'audio');
  }

  startVisualization() {
    if (!this.isAnalysisRunning || !this.analyser || !this.canvasContext) return;
    
    const draw = () => {
      if (!this.isAnalysisRunning) return;
      
      this.animationFrame = requestAnimationFrame(draw);
      
      // Get audio data
      this.analyser.getByteTimeDomainData(this.dataArray);
      this.analyser.getByteFrequencyData(this.freqDataArray);
      
      // Clear canvas
      this.canvasContext.fillStyle = 'rgba(24, 26, 42, 0.2)';
      this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw waveform
      this.drawWaveform();
      
      // Draw frequency bars
      this.drawFrequencyBars();
      
      // Update real-time parameters
      this.updateRealTimeParameters();
    };
    
    draw();
  }

  drawWaveform() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = '#00eaff';
    this.canvasContext.beginPath();
    
    const sliceWidth = width / this.dataArray.length;
    let x = 0;
    
    for (let i = 0; i < this.dataArray.length; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = v * height / 4 + height / 8;
      
      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    this.canvasContext.stroke();
  }

  drawFrequencyBars() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const barWidth = width / this.freqDataArray.length * 2.5;
    
    let x = 0;
    
    for (let i = 0; i < this.freqDataArray.length / 4; i++) { // Only show lower frequencies
      const barHeight = (this.freqDataArray[i] / 255) * (height * 0.6);
      
      // Create gradient for bars
      const gradient = this.canvasContext.createLinearGradient(0, height, 0, height - barHeight);
      gradient.addColorStop(0, '#00eaff');
      gradient.addColorStop(0.5, '#6f6fff');
      gradient.addColorStop(1, '#b36fff');
      
      this.canvasContext.fillStyle = gradient;
      this.canvasContext.fillRect(x, height - barHeight - 20, barWidth, barHeight);
      
      x += barWidth + 1;
    }
  }

  updateRealTimeParameters() {
    if (!this.freqDataArray) return;
    
    // Calculate frequency band levels
    const bufferLength = this.freqDataArray.length;
    const lowEnd = Math.floor(bufferLength * 0.1);
    const midEnd = Math.floor(bufferLength * 0.4);
    
    let lowSum = 0, midSum = 0, highSum = 0;
    
    for (let i = 0; i < lowEnd; i++) {
      lowSum += this.freqDataArray[i];
    }
    for (let i = lowEnd; i < midEnd; i++) {
      midSum += this.freqDataArray[i];
    }
    for (let i = midEnd; i < bufferLength; i++) {
      highSum += this.freqDataArray[i];
    }
    
    // Update parameters that aren't MIDI-mapped
    if (!this.parameters['low-freq'].cc) {
      this.parameters['low-freq'].value = Math.round((lowSum / lowEnd / 255) * 100);
      document.getElementById('low-freq-value').textContent = this.parameters['low-freq'].value;
    }
    
    if (!this.parameters['mid-freq'].cc) {
      this.parameters['mid-freq'].value = Math.round((midSum / (midEnd - lowEnd) / 255) * 100);
      document.getElementById('mid-freq-value').textContent = this.parameters['mid-freq'].value;
    }
    
    if (!this.parameters['high-freq'].cc) {
      this.parameters['high-freq'].value = Math.round((highSum / (bufferLength - midEnd) / 255) * 100);
      document.getElementById('high-freq-value').textContent = this.parameters['high-freq'].value;
    }
  }

  handleMIDIStateChange(event) {
    const port = event.port;
    const isInput = port.type === 'input';
    
    if (isInput) {
      if (event.port.state === 'connected') {
        this.log(`MIDI device connected: ${port.name}`, 'midi');
      } else if (event.port.state === 'disconnected') {
        this.log(`MIDI device disconnected: ${port.name}`, 'midi');
        
        // Remove from connected devices
        this.connectedDevices.delete(port.id);
      }
      
      // Refresh device list
      this.refreshMIDIDevices();
    }
  }

  async selectAudioInput(deviceId) {
    if (!deviceId) return;
    
    try {
      // Stop current analysis if running
      if (this.isAnalysisRunning) {
        this.stopAudioAnalysis();
      }
      
      // Get specific audio device
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { 
          deviceId: deviceId,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      
      this.log(`Switched to audio input: ${deviceId}`, 'audio');
      
    } catch (error) {
      this.log(`Failed to switch audio input: ${error.message}`, 'error');
    }
  }

  async populateAudioInputs() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      
      const select = document.getElementById('audio-input-select');
      if (select) {
        // Clear existing options except the first one
        select.innerHTML = '<option value="">Select Audio Input...</option>';
        
        audioInputs.forEach(device => {
          const option = document.createElement('option');
          option.value = device.deviceId;
          option.textContent = device.label || `Audio Input ${device.deviceId.substr(0, 8)}...`;
          select.appendChild(option);
        });
      }
      
    } catch (error) {
      this.log(`Failed to enumerate audio devices: ${error.message}`, 'error');
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    
    this.canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  updateMIDIStatus(status) {
    const indicator = document.getElementById('midi-status');
    if (indicator) {
      indicator.className = `status-indicator ${status}`;
    }
  }

  updateAudioStatus(status) {
    const indicator = document.getElementById('audio-status');
    if (indicator) {
      indicator.className = `status-indicator ${status}`;
    }
  }

  updatePerformanceStats() {
    document.getElementById('sample-rate').textContent = this.performanceStats.sampleRate;
    document.getElementById('buffer-size').textContent = this.performanceStats.bufferSize;
    document.getElementById('latency').textContent = this.performanceStats.latency;
  }

  log(message, type = 'info') {
    const logPanel = document.getElementById('activity-log');
    if (!logPanel) return;
    
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    
    logPanel.appendChild(entry);
    logPanel.scrollTop = logPanel.scrollHeight;
    
    // Keep log entries limited
    const entries = logPanel.querySelectorAll('.log-entry');
    if (entries.length > 100) {
      entries[0].remove();
    }
  }

  clearLog() {
    const logPanel = document.getElementById('activity-log');
    if (logPanel) {
      logPanel.innerHTML = '<div class="log-entry info">Log cleared</div>';
    }
  }
}

// Initialize the system when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.audioAnalysisMIDI = new AudioAnalysisMIDI();
  
  // Populate audio inputs after user interaction
  document.body.addEventListener('click', () => {
    window.audioAnalysisMIDI.populateAudioInputs();
  }, { once: true });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioAnalysisMIDI;
}