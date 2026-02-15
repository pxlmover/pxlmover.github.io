window.GUIDE_CONTENT = {
  featuredLink: {
    href: "DOCS/Materials/ReactiveMaterials.html",
    label: "AudioReactive Materials"
  },
  categories: [
    {
      header: "A - Core Controls",
      items: [
        {
          title: "Playback & Timing",
          href: "DOCS/A/PlaybackAndDelay.html",
          description: "Core timing controls include Playback Start Time, Post Trigger Delay Start, and Trigger Collision Cooldown so you can control when reactions begin and how often collision triggers are allowed."
        },
        {
          title: "Refresh Rate Settings",
          href: "DOCS/A/RefreshRate.html",
          description: "Adjust the master refresh rate of the AudioReactive engine. Lower values (0.01) yield buttery smooth reactions, while higher values (0.1+) give a choppy / stop motion feel."
        },
        {
          title: "Trigger Enum (BeginPlay / Sequencer / Collision / RapidFire)",
          href: "DOCS/A/TriggerTypes.html",
          description: "The Trigger dropdown currently supports BeginPlay, Sequencer, Collision, and RapidFire. Pick the mode that matches your use case, then tune cooldown/delay where needed."
        },
        {
          title: "Rapid Fire System (Beta)",
          href: "DOCS/A/RapidFire.html",
          description: "Enable Rapid Fire for repeated reactions. This feature works best with short burst audio tracks of any combination and quantity. Perfect for projectile hits, impacts, and other one-shot effects.\n\nThis allows AudioReactive to be re-triggered using the 'Rapid Fire Reset' Parameter, allowing you to set a cooldown in seconds."
        },
        {
          title: "Peak Visualizer",
          href: "DOCS/B/PeakVisualization.html",
          description: "Quick enable toggles in Core Controls let you visualize peak values and optionally print them to output log for tuning."
        },
        {
          title: "Proximity",
          href: "DOCS/A/Proximity.html",
          description: "Enable Proximity Active, choose Player as Center or Center Actor, then tune Radius and Falloff Start Ratio for distance-based reaction behavior."
        },
        {
          title: "Cloners Effectors",
          href: "DOCS/A/ClonersEffectors.html",
          description: "Cloners Effectors supports array-based entries. Each element currently exposes AudioName and AudioBand for per-item mapping."
        }
      ]
    },
    {
      header: "B - Audio",
      items: [
        {
          title: "Audio Track Management",
          href: "DOCS/B/TrackManagement.html",
          description: "Add your audio tracks. There is no limit to the number of tracks you can add. Sound Effects, Song Stems, etc."
        },
        {
          title: "Peak Visualization Tools",
          href: "DOCS/B/PeakVisualization.html",
          description: "Visualize audio peaks for accurate audio normalization. Each Audio Track has it's own 'peak' parameter at default 0.36. The lower the value, the louder the reaction from that specific track."
        },
        {
          title: "Band Splitting (Beta)",
          href: "DOCS/B/BandSplitting.html",
          description: "Split a track into frequency bands (0-3) and assign them as you would Audio Track numbers (0-3). Enabling Band Mode will disable the Audio Track system."
        },
        {
          title: "Smoothing Parameters (Beta)",
          href: "DOCS/B/SmoothingParams.html",
          description: "Fine-tune smoothing for more natural reactions. Control smoothing window, and how much small and large jumps in frequency are independently smoothed out."
        },
        {
          title: "Live Mode (Beta)",
          href: "DOCS/B/LiveMode.html",
          description: "Enable live mode for real-time audio input. This feature is very new, super cool, and might still have a bug or two. You know how it is.\n\nUses an identical Metasound graph as the Band Mode but with a custom input to bring in live PC audio"
        }
      ]
    },
    {
      header: "C - Mesh Reaction",
      items: [
        {
          title: "Static Mesh Control",
          href: "DOCS/C/StaticMeshControl.html",
          description: "Control static mesh transforms with audio. Independently control any combination of transform reactions on any axis."
        },
        {
          title: "Actors with Static Mesh Components",
          href: "DOCS/C/ActorsWithComponents.html",
          description: "Control Actors containing Static Mesh components with audio. Actor Tag driven workflow captures all Static Mesh components in your actor.\n\nTested using a single static mesh component, using multiple may have unexpected results (or could be really awesome)."
        }
      ]
    },
    {
      header: "D - Light Reaction",
      items: [
        {
          title: "Reactive Lights",
          href: "DOCS/D/ReactiveLights.html",
          description: "Point Lights, Spot Lights, Directional Lights, and Rect lights.\n\nLight Intensity Reaction and/or Magnitude Controlled Color Shifting."
        }
      ]
    },
    {
      header: "E - DMX",
      items: [
        {
          title: "DMX Fixture Setup Widget",
          href: "DOCS/E/FixtureWidgetOverview.html",
          description: "Prepare fixtures, assign tags, create groups, and manage large DMX setups using handy selection tools."
        },
        {
          title: "Moving Head Control",
          href: "DOCS/E/MovingHeads.html",
          description: "Make your Moving Heads AudioReactive. Each function can be set to static or reactive values.\n\nAudio Tracks can be assigned PER FUNCTION for precise control.\n\nAvailable Reactive Functions:\nDimmer - Colorwheel - Shutter - Gobo - Zoom - Frost - Pan - Tilt."
        },
        {
          title: "Static/Strobe/Wash",
          description: "Configure statics, strobes, and washes\nDimmer - Color - Shutter.",
          modal: {
            title: "Static/Strobe/Wash",
            description: "Configure static, strobe, and wash effects.",
            image: ""
          }
        },
        {
          title: "Lasers",
          description: "Set up lasers individually or in groups.\nSet static values or set any combination of parameters to audioreactive.\nAngle - Length - Beam Count - Beam Width",
          modal: {
            title: "Laser Groups (with beam parameters!)",
            description: "Set up laser groups and beam parameters.",
            image: ""
          }
        }
      ]
    }
  ]
};
