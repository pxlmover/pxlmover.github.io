window.GUIDE_DOCS = {
  __mediaDefaults: {
    controls: true,
    loop: false,
    muted: false,
    autoplay: false,
    playsInline: true,
    preload: "metadata"
  },
  "A.PlaybackAndDelay": {
    pageTitle: "Playback & Delay",
    cards: [
      {
        title: "Set a custom start time / Delay start after trigger.",
        media: {
          type: "video",
          src: "../videos/TestVideo4k.mp4",
          preload: "auto",
          controls: true,
          muted: false,
          loop: false,
          sources: [
            {
              src: "../videos/TestVideo4k.mp4",
              type: "video/mp4"
            }
          ]
        },
        descriptionHtml: "'Playback Start Time' is in seconds. A value of 15 starts audio tracks at the 15 second mark.<br>'Post Trigger Delay Start' is in seconds. A value of 5 delays reactions by 5 seconds after trigger.<br>'Trigger Collision Cooldown' prevents repeated collision-trigger spam and is also in seconds.<br>These timing values affect MetaSounds when using Band Mode as well."
      }
    ]
  },
  "A.RefreshRate": {
    pageTitle: "Refresh Rate",
    cards: [
      {
        title: "Set the audio reaction update speed.",
        media: {
          type: "video",
          src: "../videos/TestVideo4k.mp4",
          preload: "auto",
          controls: true,
          muted: false,
          loop: false,
          sources: [
            {
              src: "../videos/TestVideo4k.mp4",
              type: "video/mp4"
            }
          ]
        },
        descriptionHtml: "The 'Refresh Rate' determines how often the system updates audio-reactive elements.<br>Lower values (e.g., 0.01) provide smoother, more frequent updates but may use more CPU and reduce FPS. Values lower than 0.01 give diminished returns.<br>Higher values can be used (0.1+) to get a more choppy, stuttered, even stop motion feel to the reaction response.<br>Higher values (e.g., 0.1) reduce update frequency and can improve performance on slower systems.<br>Adjust this setting to balance responsiveness and system load for your project."
      }
    ]
  },
  "A.TriggerTypes": {
    pageTitle: "Trigger",
    cards: [
      {
        title: "Trigger",
        imageSrc: "../images/BlueprintDetails/A-CoreControls/Triggers.png",
        descriptionHtml: "1) <strong>Trigger</strong> (Enum): BeginPlay, Sequencer, Collision, RapidFire.<br>2) <strong>Trigger Collision Cooldown</strong> (seconds): minimum interval between collision triggers.<br>3) <strong>Post Trigger Delay Start</strong> (seconds): delay after trigger before response starts.<br>4) <strong>Playback Start Time</strong> (seconds): playback offset into the source.<br>5) <strong>Refresh Rate</strong> (seconds): control-rate interval (lower = smoother response, higher = more stepped response)."
      }
    ]
  },
  "A.PeakVisualizer": {
    pageTitle: "Peak Visualizer",
    cards: [
      {
        title: "Peak Visualizer",
        imageSrc: "../images/BlueprintDetails/A-CoreControls/PeakVisualizer.png",
        descriptionHtml: "1) <strong>Peak Visualizer</strong>: turns on live level readout while running.<br>2) <strong>Peak Visualizer to Output Log</strong>: also prints those values to Output Log for troubleshooting."
      }
    ]
  },
  "A.RapidFire": {
    pageTitle: "Rapid Fire",
    cards: [
      {
        title: "Rapid Fire",
        imageSrc: "../images/BlueprintDetails/A-CoreControls/RapidFire.png",
        descriptionHtml: "1) <strong>Rapid Fire</strong>: allows very fast repeated triggering.<br>2) <strong>Rapid Fire Reset</strong> (seconds): wait time before it can trigger again.<br>Use this with Trigger set to <strong>RapidFire</strong>."
      }
    ]
  },
  "A.Proximity": {
    pageTitle: "Proximity",
    cards: [
      {
        title: "Proximity",
        imageSrc: "../images/BlueprintDetails/A-CoreControls/Proximity.png",
        descriptionHtml: "1) <strong>Proximity Active</strong>: turns on distance-based response.<br>2) <strong>Player as Center</strong>: uses the player position as the center point.<br>3) <strong>Center Actor</strong>: pick a specific actor as center when Player as Center is off.<br>4) <strong>Radius</strong>: max distance where the effect still applies.<br>5) <strong>Falloff Start Ratio</strong>: where fading begins inside the radius (0.5 means halfway out)."
      }
    ]
  },
  "A.ClonersEffectors": {
    pageTitle: "Cloners Effectors",
    cards: [
      {
        title: "Cloners Effectors",
        imageSrc: "../images/BlueprintDetails/A-CoreControls/ClonersEffectors.png",
        descriptionHtml: "1) <strong>Cloners Effectors</strong>: click <strong>+</strong> to add an entry.<br>2) Open the new entry.<br>3) Set <strong>AudioName</strong> to match your source name:<br>&nbsp;&nbsp;• In <strong>Audio Tracks/Stems</strong> mode, use the exact <strong>Track Name</strong> label from the <span class=\"category-ref\">B - Audio</span> track list.<br>&nbsp;&nbsp;• In <strong>Frequency Bands</strong> mode, use <strong>Band0</strong>, <strong>Band1</strong>, <strong>Band2</strong>, or <strong>Band3</strong>.<br>4) Set <strong>AudioBand</strong> based on mode:<br>&nbsp;&nbsp;• <strong>Frequency Bands</strong>: fixed index order <strong>0 = Bass</strong>, <strong>1 = Low-Mid</strong>, <strong>2 = High-Mid</strong>, <strong>3 = High</strong>.<br>&nbsp;&nbsp;• <strong>Audio Tracks/Stems</strong>: use the <strong>audio track array index</strong> (<strong>0..N</strong>) from the Multiple Audio Tracks list; this grows as you add tracks.<br>Repeat for more mappings."
      }
    ]
  },
  "B.TrackManagement": {
    pageTitle: "Multiple Audio Tracks",
    cards: [
      {
        title: "Multiple Audio Tracks",
        imageSrc: "../images/BlueprintDetails/B-Audio/MultipleAudioTracks.png",
        descriptionHtml: "1) <strong>Multiple Audio Tracks</strong>: click <strong>+</strong> to add each stem/track.<br>2) <strong>Track Name</strong>: name shown for this track.<br>3) <strong>Peak</strong>: input trim/sensitivity for that track (helps gain matching).<br>4) <strong>Audio</strong>: choose the sound asset.<br>5) <strong>Attack</strong>: how quickly it reacts to hits/transients.<br>6) <strong>Release</strong>: how quickly it settles back down.<br>7) <strong>Smoothing Distance</strong>: overall smoothing amount.<br>8) <strong>Small Change Smoothing</strong>: smoothing for subtle movement.<br>9) <strong>Large Change Smoothing</strong>: smoothing for stronger peaks.<br><strong>Index behavior in this mode:</strong> each entry has an array index (<strong>0..N</strong>) and that index is what systems like Cloners/Effector <strong>AudioBand</strong> can follow in Audio Tracks/Stems mode.<br><strong>Note:</strong> This is different from <strong>Frequency Bands</strong> mode, which always uses fixed band indices 0-3."
      }
    ]
  },
  "B.PeakVisualization": {
    pageTitle: "Peak Visualization",
    cards: [
      {
        title: "Enable Audio Level Visualization",
        media: {
          type: "video",
          src: "../videos/TestVideo4k.mp4",
          preload: "auto",
          controls: true,
          muted: false,
          loop: false,
          sources: [
            {
              src: "../videos/TestVideo4k.mp4",
              type: "video/mp4"
            }
          ]
        },
        descriptionHtml: "Under the 'B-Audio Rollout', you'll find the 'Peak Tools' rollout. Enable 'Peak Visualization' to start visualizing audio track levels in real-time."
      },
      {
        title: "Watch Audio Levels in Real-Time",
        media: {
          type: "video",
          src: "../videos/TestVideo4k.mp4",
          preload: "auto",
          controls: true,
          muted: false,
          loop: false,
          sources: [
            {
              src: "../videos/TestVideo4k.mp4",
              type: "video/mp4"
            }
          ]
        },
        descriptionHtml: "Once enabled, press play or simulate to see the float values in real time. The names are tied to the 'Track Name' parameter in each added audio track.<br>Use these values in the 'Peak' parameter of your audio tracks to quickly perform audio normalization, allowing soft audio sources to more easily affect reactive elements.<br>A value of 0.3 seems pretty common."
      }
    ]
  },
  "B.BandSplitting": {
    pageTitle: "Single Track Frequency Bands",
    cards: [
      {
        title: "Single Track Frequency Bands",
        imageSrc: "../images/BlueprintDetails/B-Audio/FrequencyBands1.png",
        descriptionHtml: "Use this section when Mode is <strong>Frequency Bands</strong>.<br>1) <strong>Audio Track</strong>: source track to split into bands.<br>2) <strong>Smoothing Distance</strong>: overall smoothing for band output.<br>3) <strong>Small Change Smoothing</strong>: smooth subtle changes.<br>4) <strong>Large Change Smoothing</strong>: control stronger spikes.<br><strong>Index order is fixed low-to-high:</strong> <strong>0 = Bass</strong>, <strong>1 = Low-Mid</strong>, <strong>2 = High-Mid</strong>, <strong>3 = High</strong>.<br><strong>Band label mapping:</strong><br>&nbsp;&nbsp;• <strong>Band 1 -> index 0</strong><br>&nbsp;&nbsp;• <strong>Band 2 -> index 1</strong><br>&nbsp;&nbsp;• <strong>Band 3 -> index 2</strong><br>&nbsp;&nbsp;• <strong>Band 4 -> index 3</strong>"
      },
      {
        title: "Frequency Bands Inside MetaSounds",
        imageSrc: "../images/BlueprintDetails/B-Audio/FrequencyBands_InsideMetaSounds.png",
        descriptionHtml: "This view shows the frequency-band processing path inside the MetaSounds setup.<br>Use it to validate that the same low-to-high mapping is used end-to-end: <strong>0 = Bass</strong>, <strong>1 = Low-Mid</strong>, <strong>2 = High-Mid</strong>, <strong>3 = High</strong>.<br><strong>Band label mapping:</strong><br>&nbsp;&nbsp;• <strong>Band 1 -> index 0</strong><br>&nbsp;&nbsp;• <strong>Band 2 -> index 1</strong><br>&nbsp;&nbsp;• <strong>Band 3 -> index 2</strong><br>&nbsp;&nbsp;• <strong>Band 4 -> index 3</strong><br>If your in-scene response looks off, compare this internal band output against the mapped values used by Blueprint settings."
      }
    ]
  },
  "B.SmoothingParams": {
    pageTitle: "Smoothing Parameters",
    cards: [
      {
        title: "Smooth Those Reactions:",
        media: {
          type: "video",
          src: "../videos/TestVideo4k.mp4",
          preload: "auto",
          controls: true,
          muted: false,
          loop: false,
          sources: [
            {
              src: "../videos/TestVideo4k.mp4",
              type: "video/mp4"
            }
          ]
        },
        descriptionHtml: "Under the <span class=\"category-ref\">B - Audio</span> rollout, you'll find the smoothing options for each audio track. Adjust smoothing parameters to control how quickly values respond to changes in your audio intensity.<br>Smoothing Distance - Larger Values = Smoother Response.<br>Small Change Smoothing - How much smoothing to apply to small frequency changes.<br>Large Change Smoothing - How much smoothing to apply to large frequency changes."
      }
    ]
  },
  "B.LiveMode": {
    pageTitle: "Live Input (Mic IN)",
    cards: [
      {
        title: "Live Input (Mic IN)",
        media: {
          type: "video",
          src: "../videos/TestVideo4k.mp4",
          preload: "auto",
          controls: true,
          muted: false,
          loop: false,
          sources: [
            {
              src: "../videos/TestVideo4k.mp4",
              type: "video/mp4"
            }
          ]
        },
        descriptionHtml: "Set Mode to <strong>Live Input (Mic IN)</strong> for real-time control.<br>This listens to microphone input or loopbacked system audio instead of pre-made tracks.<br>Great for live demos, rehearsal, and quick setup checks."
      }
    ]
  },
  "B.Mode": {
    pageTitle: "Mode",
    cards: [
      {
        title: "Mode",
        imageSrc: "../images/BlueprintDetails/B-Audio/Mode.png",
        descriptionHtml: "<strong>Mode</strong> chooses how audio is read:<br>1) <strong>Frequency Bands</strong>: one track split into frequency bands.<br>2) <strong>Audio Tracks/Stems</strong>: multiple separate tracks/stems.<br>3) <strong>Live Input (Mic IN)</strong>: real-time mic or loopbacked system audio.<br><strong>Critical mapping notes:</strong><br>&nbsp;&nbsp;• In <strong>Frequency Bands</strong> mode, index order is fixed: <strong>0 = Bass</strong>, <strong>1 = Low-Mid</strong>, <strong>2 = High-Mid</strong>, <strong>3 = High</strong>.<br>&nbsp;&nbsp;• Band label mapping:<br>&nbsp;&nbsp;&nbsp;&nbsp;• <strong>Band 1 -> index 0</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;• <strong>Band 2 -> index 1</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;• <strong>Band 3 -> index 2</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;• <strong>Band 4 -> index 3</strong><br>&nbsp;&nbsp;• In <strong>Audio Tracks/Stems</strong> mode, index uses the track array order <strong>0..N</strong> and expands as users add more tracks."
      }
    ]
  },
  "C.StaticMeshControl": {
    pageTitle: "Static Mesh Control",
    cards: [
      {
        title: "Base Rollout",
        imageSrc: "../images/BlueprintDetails/C-MeshReaction/MeshReactions.png",
        descriptionHtml: "1) <strong>Reactive Meshes</strong>: master on/off for mesh reactions.<br>2) <strong>Audio Reactive Static Meshes</strong>: click <strong>+</strong> to add each target setup.<br>3) In each setup: <strong>Enabled</strong>, <strong>Static Mesh</strong>, <strong>Use Tags</strong>, <strong>Audio Track</strong>, <strong>Transform Response</strong>.<br>4) <strong>Transform Response</strong> has three sections: <strong>Scale</strong>, <strong>Translate</strong>, <strong>Rotate</strong>.<br>5) Each section uses: <strong>Use X</strong>, <strong>Use Y</strong>, <strong>Use Z</strong>, <strong>Multiplier</strong>, <strong>Min Value</strong>, <strong>Max Value</strong>."
      },
      {
        title: "Tag Mode (BETA) - Reactive Actors with Static Mesh Components",
        descriptionHtml: "<strong>Tag Mode is currently BETA.</strong><br>Use this when one actor contains one or more <strong>Static Mesh Components</strong> and you want those internal components to react through tags.<br>1) Enable <strong>Use Tags</strong> on the mesh reaction entry.<br>2) Set an <strong>Actor Tag</strong> on the target actor.<br>3) Add at least one matching <strong>Component Tag</strong> on the static mesh component(s) inside that actor.<br>4) Keep using <strong>Audio Track</strong> and <strong>Transform Response</strong> as normal.<br>5) Current behavior: all matched tagged components in that actor share the same <strong>Scale / Translate / Rotate</strong> settings for that index."
      }
    ]
  },
  "D.ReactiveLights": {
    pageTitle: "Reactive Lights",
    cards: [
      {
        title: "Reactive Lights",
        imageSrc: "../images/BlueprintDetails/D-LightReaction/ReactiveLights.png",
        descriptionHtml: "1) Enable <strong>Reactive Lights</strong> to activate light-driven response.<br>2) In <strong>Audio Reactive Lights</strong>, click <strong>+</strong> to add each fixture entry.<br>3) For each entry, assign <strong>Light</strong>, set base <strong>Intensity</strong>, and choose the driving <strong>Audio Track</strong>.<br>4) Use <strong>Reactive Color Control</strong> to tune <strong>Light Color Low</strong>, <strong>Light Color High</strong>, and <strong>High Low Contrast</strong>.<br>&nbsp;&nbsp;• <strong>High Low Contrast</strong> controls how smoothly or sharply the color shifts between the low/high colors as audio intensity changes.<br>5) Optional: enable <strong>Set Solid Color</strong> and pick <strong>Solid Light Color (R,G,B,A)</strong> when you want fixed hue with audio-reactive intensity."
      },
      {
        title: "Set Solid Color Behavior",
        descriptionHtml: "When <strong>Set Solid Color</strong> is enabled, color stays fixed to <strong>Solid Light Color</strong> while brightness still reacts to audio.<br>Use this when you want consistent color with reactive intensity."
      }
    ]
  },
  "E.FixtureWidgetOverview": {
    pageTitle: "DMX Group Control",
    cards: [
      {
        title: "Scope",
        media: {
          type: "video",
          sources: [
            {
              src: "../../DOCS/gifs/E/DMXWidgetQuickView.webm",
              type: "video/webm"
            }
          ]
        },
        descriptionHtml: "This DMX system is Unreal-only and simplified for built-in fixtures.<br>It does <strong>not</strong> output to external DMX hardware (no ArtNet or other DMX protocol output)."
      },
      {
        title: "Group Control",
        descriptionHtml: "1) <strong>Enable DMX</strong> to turn the DMX section on.<br>2) Use <strong>Group Control</strong> for shared setup across tagged fixture groups.<br>3) In <strong>Light Fixture Groups</strong>, each group includes:<br>&nbsp;&nbsp;• <strong>Fixture Type</strong><br>&nbsp;&nbsp;• <strong>Actor Tag</strong><br>&nbsp;&nbsp;• <strong>Moving Head Attributes</strong> (Color Wheel, Gobo, Tilt Offset)<br>&nbsp;&nbsp;• <strong>Light Color (Static/Strobe/Wash)</strong><br>&nbsp;&nbsp;• <strong>Shutter</strong><br>&nbsp;&nbsp;• <strong>Enable Beam</strong><br>&nbsp;&nbsp;• <strong>Audio Track</strong><br>&nbsp;&nbsp;• <strong>Mute Fixtures</strong><br>&nbsp;&nbsp;• <strong>Add Function</strong>."
      },
      {
        title: "Add Function (Per Light Fixture Group Entry)",
        descriptionHtml: "Inside <strong>Add Function</strong>, each function entry has:<br>1) <strong>Function Type</strong><br>2) <strong>Reaction Intensity</strong><br>3) <strong>Override Audio Track</strong><br>4) <strong>Audio Track</strong><br>5) <strong>Non Reactive</strong><br>6) <strong>Non Reactive Intensity</strong><br>7) <strong>Mute Function</strong>."
      },
      {
        title: "Laser Groups",
        descriptionHtml: "In <strong>Laser Groups</strong>, each group includes:<br>1) <strong>Tag</strong><br>2) <strong>Color</strong><br>3) <strong>Angle</strong><br>4) <strong>Length</strong><br>5) <strong>Count</strong><br>6) <strong>Width</strong><br>7) <strong>Audio Track</strong><br>8) <strong>Mute</strong><br>9) <strong>Reactive</strong> controls:<br>&nbsp;&nbsp;• Reactive Angle (Enable, Strength)<br>&nbsp;&nbsp;• Reactive Length (Enable, Strength)<br>&nbsp;&nbsp;• Reactive Beam Count (Enable, Strength)<br>&nbsp;&nbsp;• Reactive Beam Width (Enable, Strength)."
      }
    ]
  },
  "E.MovingHeads": {
    pageTitle: "DMX Individual Control",
    cards: [
      {
        title: "Individual Control",
        media: {
          type: "video",
          sources: [
            {
              src: "../../DOCS/gifs/E/MovingHeadFunctions.webm",
              type: "video/webm"
            }
          ]
        },
        descriptionHtml: "<strong>Individual Control</strong> contains two arrays: <strong>Light Fixtures</strong> and <strong>Lasers</strong>.<br>These use the <strong>same rollout structure and parameters</strong> as Group Control, but applied at individual-entry level."
      },
      {
        title: "Individual Light Fixtures",
        descriptionHtml: "Individual <strong>Light Fixtures</strong> follow the same fields as Light Fixture Groups:<br>Fixture Type, Actor Tag, Moving Head Attributes, Light Color (Static/Strobe/Wash), Shutter, Enable Beam, Audio Track, Mute Fixtures, and Add Function entries."
      },
      {
        title: "Individual Lasers",
        descriptionHtml: "Individual <strong>Lasers</strong> follow the same fields as Laser Groups:<br>Tag, Color, Angle, Length, Count, Width, Audio Track, Mute, and Reactive Angle/Length/Beam Count/Beam Width (each with Enable + Strength)."
      }
    ]
  },
  "Workflows.ReactiveMeshSetup": {
    pageTitle: "How to Setup a Reactive Mesh",
    cards: [
      {
        title: "Workflow Overview",
        descriptionHtml: "This page is a practical setup recipe (separate from A/B/C parameter reference).<br>Use this format for your full recording walkthrough: from scene prep to final tuning."
      },
      {
        title: "1) Add a mesh actor to the level",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_StaticMesh/AddTheMesh.png"
        },
        descriptionHtml: "1) Open the actor placement menu in the viewport toolbar.<br>2) Go to <strong>Shapes</strong> and add a <strong>Sphere</strong> (or any static mesh actor)."
      },
      {
        title: "2) Assign the target mesh in C - Mesh Reaction",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_StaticMesh/AssignMeshReactive.png"
        },
        descriptionHtml: "1) Select your <strong>BP_AudioReactive</strong> actor.<br>2) In <span class=\"category-ref\">C - Mesh Reaction</span>, enable <strong>Reactive Meshes</strong> and add an entry in <strong>Audio Reactive Static Meshes</strong>.<br>3) In the <strong>Static Mesh</strong> field, pick the mesh actor you placed in the level."
      },
      {
        title: "3) Adjust transform response parameters",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_StaticMesh/AdjustParameters.png"
        },
        descriptionHtml: "1) Set the mesh entry to <strong>Enabled</strong> and assign the desired <strong>Audio Track</strong>.<br>2) Expand <strong>Transform Response</strong> and tune <strong>Scale</strong>, <strong>Translate</strong>, and <strong>Rotate</strong> axes as needed."
      }
    ]
  },
  "Workflows.ReactiveMaterialSetup": {
    pageTitle: "How to Setup a Reactive Material",
    cards: [
      {
        title: "Workflow Overview",
        descriptionHtml: "This page is for practical material setup flow (not details-panel field reference).<br>Perfect for a concise creator-facing tutorial with your new 4K + audio format."
      },
      {
        title: "Recommended Recording Script",
        descriptionHtml: "1) Create/open material instance with reactive features.<br>2) Connect AudioReactive material controls.<br>3) Assign source track/band mapping.<br>4) Tune response range and smoothing feel.<br>5) Show final look in-context with music."
      }
    ]
  },
  "Workflows.ReactiveLightSetup": {
    pageTitle: "How to Setup a Reactive Light",
    cards: [
      {
        title: "Workflow Overview",
        descriptionHtml: "This page is for practical lighting setup steps (separate from D rollout reference).<br>Use this for quick-start videos focused on results and tuning workflow."
      },
      {
        title: "1) Enable reactive lights and assign array entries",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_Light/EnableLightsAssignToArrayEntries.png"
        },
        descriptionHtml: "1) Select your <strong>BP_AudioReactive</strong> actor.<br>2) In <span class=\"category-ref\">D - Light Reaction</span>, enable <strong>Reactive Lights</strong>.<br>3) Add your light actors into <strong>Audio Reactive Lights</strong> array entries.<br>4) Set each entry's base values such as <strong>Intensity</strong> and <strong>Audio Track</strong>."
      },
      {
        title: "2) Visualize tracks and set color mode",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_Light/VisualizeSetMultipleTracksSetColorMode.png"
        },
        descriptionHtml: "1) Use track visualization while tuning to confirm each light is tied to the intended source.<br>2) For each light entry, configure <strong>Reactive Color Control</strong> as needed; <strong>High Low Contrast</strong> controls smooth vs sharp transitions between your low/high colors based on audio intensity.<br>3) Choose between fully reactive color behavior or <strong>Set Solid Color</strong> mode depending on the look you want."
      }
    ]
  },
  "Workflows.FirstTimeSetupChecklist": {
    pageTitle: "First-Time Setup Checklist",
    cards: [  
      {
        title: "1) Install + Enable",
        descriptionHtml: "1) Install <strong>AudioReactive</strong> from Fab/Marketplace into your UE project.<br>2) Open <strong>Edit -> Plugins</strong> and confirm <strong>AudioReactive</strong> is enabled.<br>3) Restart Unreal Editor when prompted."
      },
      {
        title: "2) Verify plugin content is visible",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_Initial/EnablePluginContent.png",
          images: [
            "../../DOCS/images/Workflows/Setup_Initial/EnablePluginContentDetails.png"
          ]
        },
        descriptionHtml: "1) Open Content Browser settings and enable <strong>Show Plugin Content</strong>.<br>2) Confirm the <strong>/AudioReactive</strong> content root appears.<br>3) Do the same for any material to enable plugin content globally in all live search boxes."
      },
      {
        title: "Enabling Motion Graphics Integration",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_Initial/EnableMotionDesign.png"
        },
        descriptionHtml: "1) Open <strong>Project Settings -> Plugins -> AudioReactive</strong>.<br>2) Enable <strong>Motion Design Integration</strong>.<br>3) Restart Unreal Editor when prompted.<br>4) Confirm required UE plugin <strong>Motion Design</strong> is now enabled in your project plugin list."
      }
    ]
  },
  "Workflows.ClonerEffectorLiveAudio": {
    pageTitle: "How to Setup Cloner/Effector Live Audio",
    cards: [
      {
        title: "Workflow Overview",
        descriptionHtml: "This workflow demonstrates <strong>Audio Track / Frequency Band mapping</strong> for Cloner/Effector setup (not just Live Input).<br>Use it to connect <span class=\"category-ref\">B - Audio</span> output to cloner animators using <strong>AudioName</strong> and <strong>AudioBand</strong>.<br><strong>Frequency Bands mode:</strong> <strong>0 = Bass</strong>, <strong>1 = Low-Mid</strong>, <strong>2 = High-Mid</strong>, <strong>3 = High</strong>.<br><strong>Band labels:</strong><br>&nbsp;&nbsp;• <strong>Band 1 -> index 0</strong><br>&nbsp;&nbsp;• <strong>Band 2 -> index 1</strong><br>&nbsp;&nbsp;• <strong>Band 3 -> index 2</strong><br>&nbsp;&nbsp;• <strong>Band 4 -> index 3</strong><br><strong>Audio Tracks/Stems mode:</strong> use the track array index <strong>0..N</strong> from Multiple Audio Tracks; this grows as tracks are added."
      },
      {
        title: "1) Add a cloner entry, set track, and create a LiveValue animator",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_Cloner/AddClonerSetTrackAddLiveValueAnimator.png"
        },
        descriptionHtml: "1) Select your <strong>BP_AudioReactive</strong> actor and add a <strong>Cloners Effectors</strong> entry in <span class=\"category-ref\">A - Core Controls</span>.<br>2) Set <strong>AudioName</strong> to the track you want to drive and choose an <strong>AudioBand</strong> index.<br>3) Select the Cloner actor, open <strong>Animators</strong>, click <strong>Add Animators</strong>, and add <strong>LiveValue</strong>."
      },
      {
        title: "2) Link LiveValue to cloner Global Scale",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_Cloner/TestGlobalScaleWithLiveValue.png"
        },
        descriptionHtml: "1) In the Cloner details panel, right-click <strong>Global Scale</strong>.<br>2) Choose <strong>LiveValue_0</strong> from existing animators and apply the <strong>Scale -> All</strong> preset link.<br>3) Confirm X/Y/Z scale properties are now linked so the cloner responds uniformly."
      },
      {
        title: "3) Play and tune magnitude while validating AudioName match",
        media: {
          type: "image",
          src: "../../DOCS/images/Workflows/Setup_Cloner/TestPlayIncreaseMagnitudeEnsureAudioNameMatch.png"
        },
        descriptionHtml: "1) Press <strong>Play</strong> and verify the cloner reacts in real time.<br>2) In the LiveValue animator, increase <strong>Magnitude</strong> until motion is clearly visible.<br>3) If there is no response, verify the animator <strong>Value Name</strong> exactly matches the BP entry <strong>AudioName</strong>, then re-test."
      }
    ]
  },
  "Materials.ReactiveMaterials": {
    pageTitle: "Reactive Materials",
    cards: [
      {
        title: "Reactive Materials - Emission",
        videoSrc: "../../DOCS/Materials/gifs/EmissionOverview.webm",
        descriptionHtml: "Emission is one of the most popular material attributes for AudioReactive setups.<br>Any material instance with emissive support in the master material gets these controls.<br>'Offset' sets a base/floor brightness, and 'Threshold' can prevent low-level reaction."
      },
      {
        title: "Reactive Materials - Instance Parameters",
        videoSrc: "../../DOCS/Materials/gifs/OtherMaterialFunctions.webm",
        descriptionHtml: "Additional reactive functions are available for Base Color, Roughness, Displacement, and WPO.<br>Reactive Base Color appears black until audio input increases.<br>Reactive Roughness changes reflectivity/matte response.<br>Reactive Displacement requires displacement console commands and Nanite.<br>Reactive WPO pushes/pulls geometry based on local normal."
      },
      {
        title: "Reactive Materials - The Audio Stuff",
        videoSrc: "../../DOCS/Materials/gifs/AudioMasterOverview.webm",
        descriptionHtml: "MF_AudioReactive_AudioMaster handles incoming Blueprint float values and routes them to material channels.<br>This function includes 9 default collection parameters, each receiving values from its respective <a href='../../DOCS/B/TrackManagement.html' style='color:#64b5f6; font-weight:700; text-decoration:underline;' target='_blank'>Audio Track Index</a>."
      }
    ]
  },
  "Materials.MaterialOverview": {
    pageTitle: "Material Overview",
    cards: [
      {
        title: "Material Example 1",
        videoSrc: "gifs/PATHGOESHERE.webm",
        descriptionHtml: "Description for Material Example 1."
      },
      {
        title: "Material Example 2",
        videoSrc: "gifs/PATHGOESHERE.webm",
        descriptionHtml: "Description for Material Example 2."
      },
      {
        title: "Material Example 3",
        videoSrc: "gifs/PATHGOESHERE.webm",
        descriptionHtml: "Description for Material Example 3."
      },
      {
        title: "Material Example 4",
        videoSrc: "gifs/PATHGOESHERE.webm",
        descriptionHtml: "Description for Material Example 4."
      }
    ]
  }
};
