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
          sources: [
            {
              src: "../../DOCS/gifs/A/PlaybackDelay.webm",
              type: "video/webm"
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
        videoSrc: "../../DOCS/gifs/A/RefreshRate.webm",
        descriptionHtml: "The 'Refresh Rate' determines how often the system updates audio-reactive elements.<br>Lower values (e.g., 0.01) provide smoother, more frequent updates but may use more CPU and reduce FPS. Values lower than 0.01 give diminished returns.<br>Higher values can be used (0.1+) to get a more choppy, stuttered, even stop motion feel to the reaction response.<br>Higher values (e.g., 0.1) reduce update frequency and can improve performance on slower systems.<br>Adjust this setting to balance responsiveness and system load for your project."
      }
    ]
  },
  "A.TriggerTypes": {
    pageTitle: "Trigger Types",
    cards: [
      {
        title: "Trigger Enum Options",
        videoSrc: "../../DOCS/gifs/A/TriggerOverview.webm",
        descriptionHtml: "The Trigger enum currently includes: BeginPlay, Sequencer, Collision, and RapidFire.<br>BeginPlay starts automatically when the level begins.<br>Sequencer is driven by your Sequencer event trigger workflow.<br>Collision triggers when your configured collision condition is met.<br>RapidFire is designed for fast repeat trigger use cases like projectile-style impacts."
      }
    ]
  },
  "A.RapidFire": {
    pageTitle: "Rapid Fire",
    cards: [
      {
        title: "Rapid Fire Overview:",
        videoSrc: "../../DOCS/gifs/A/RapidFire.webm",
        descriptionHtml: "Rapid Fire is intended for quick repeated triggering.<br>Set Trigger to <strong>RapidFire</strong> in the Trigger enum, then tune <strong>Rapid Fire Reset</strong> (seconds) to control retrigger cooldown.<br>This is ideal for projectile hits, repeated impacts, and burst-style one-shot audio reactions."
      }
    ]
  },
  "A.Proximity": {
    pageTitle: "Proximity",
    cards: [
      {
        title: "Proximity Rollout Overview",
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
        descriptionHtml: "The Proximity group adds distance-based reaction control directly in A - Core Controls.<br>Enable <strong>Proximity Active</strong> to turn it on.<br>Use <strong>Player as Center</strong> for player-driven distance checks, or disable it and set a specific <strong>Center Actor</strong>.<br><strong>Radius</strong> controls overall influence range, and <strong>Falloff Start Ratio</strong> controls where falloff begins inside that radius."
      },
      {
        title: "Recommended Starting Values",
        descriptionHtml: "A practical starting point is:<br>Radius: <strong>2000</strong><br>Falloff Start Ratio: <strong>0.5</strong><br>Then tune Radius for scene scale and adjust Falloff Start Ratio for a tighter or smoother transition zone."
      }
    ]
  },
  "A.ClonersEffectors": {
    pageTitle: "Cloners Effectors",
    cards: [
      {
        title: "Array-Based Effector Mapping",
        descriptionHtml: "The Cloners Effectors group uses an array workflow.<br>Add elements in the array, then configure each element's fields.<br>Current element fields shown in the rollout are <strong>AudioName</strong> and <strong>AudioBand</strong>."
      },
      {
        title: "Setup Flow",
        descriptionHtml: "1) Add an array element.<br>2) Set <strong>AudioName</strong> (example: Band1).<br>3) Set <strong>AudioBand</strong> (example: 1).<br>Repeat per element to map multiple cloner effectors to different audio bands."
      }
    ]
  },
  "B.TrackManagement": {
    pageTitle: "Audio Track Management",
    cards: [
      {
        title: "Adding Audio Tracks:",
        videoSrc: "../../DOCS/gifs/B/AddAudioTracks.webm",
        descriptionHtml: "Click the '+' button to add a new audio track, or drag in from your content browser.<br>Set the 'Track Name' (used for <a href='PeakVisualization.html' style='color:#64b5f6; font-weight:700; text-decoration:underline;'>Peak Visualization</a> and Debugging)."
      }
    ]
  },
  "B.PeakVisualization": {
    pageTitle: "Peak Visualization",
    cards: [
      {
        title: "Enable Audio Level Visualization",
        videoSrc: "../../DOCS/gifs/B/EnablePeakVis.webm",
        descriptionHtml: "Under the 'B-Audio Rollout', you'll find the 'Peak Tools' rollout. Enable 'Peak Visualization' to start visualizing audio track levels in real-time."
      },
      {
        title: "Watch Audio Levels in Real-Time",
        videoSrc: "../../DOCS/gifs/B/ViewPeaks.webm",
        descriptionHtml: "Once enabled, press play or simulate to see the float values in real time. The names are tied to the 'Track Name' parameter in each added audio track.<br>Use these values in the 'Peak' parameter of your audio tracks to quickly perform audio normalization, allowing soft audio sources to more easily affect reactive elements.<br>A value of 0.3 seems pretty common."
      }
    ]
  },
  "B.BandSplitting": {
    pageTitle: "Band Splitting (Beta)",
    cards: [
      {
        title: "Plug In Your Sound - Set Smoothing Levels:",
        videoSrc: "../../DOCS/gifs/B/EnableBands.webm",
        descriptionHtml: "Enabling 'Band Mode' will disable the 'Audio Track' system and switch to a Metasound frequency splitting system.<br>Smoothing Distance - Larger Values = Smoother Response.<br>Small Change Smoothing - How much smoothing to apply to small frequency changes.<br>Large Change Smoothing - How much smoothing to apply to large frequency changes."
      },
      {
        title: "Locate the MetaSound_AR asset:",
        videoSrc: "../../DOCS/gifs/B/MetaSoundContent.webm",
        descriptionHtml: "You'll find the MetaSound_AR file in the Audioreactive/MetaSound folder."
      },
      {
        title: "Explore the MetaSound Graph:",
        videoSrc: "../../DOCS/gifs/B/MetaSoundOverview.webm",
        descriptionHtml: "Once in the Metasound graph, you'll notice it goes through high/low pass filters, through a band splitter, and each band gets fine controls over the sound.<br>To trigger the track manually within MetaSounds, disconnect the 'Wave Player' nodes 'Wave Asset' blue pipe and set the track you wish to process.<br>The pink wire zig-zags are visualizers that light up based on the strength of the band signal, allowing you to see the result of the 'In Range B' knob on each bands Map Range node.<br>The In Range B controls the master values that get passed from MetaSounds into your reactive elements."
      }
    ]
  },
  "B.SmoothingParams": {
    pageTitle: "Smoothing Parameters",
    cards: [
      {
        title: "Smooth Those Reactions:",
        videoSrc: "../../DOCS/gifs/B/AudioTrackSmoothing.webm",
        descriptionHtml: "Under the 'B-Audio' Rollout, you'll find the smoothing options for each audio track. Adjust smoothing parameters to control how quickly values respond to changes in your audio intensity.<br>Smoothing Distance - Larger Values = Smoother Response.<br>Small Change Smoothing - How much smoothing to apply to small frequency changes.<br>Large Change Smoothing - How much smoothing to apply to large frequency changes."
      }
    ]
  },
  "B.LiveMode": {
    pageTitle: "Live Mode (Beta)",
    cards: [
      {
        title: "Live Mode Overview: (BETA)",
        videoSrc: "../../DOCS/gifs/B/LiveAudioEnable.webm",
        descriptionHtml: "Enable Live Mode to use real-time audio input for your reactions. This feature allows you to connect a microphone or other live audio source and see immediate feedback.<br>Use a Virtual Audio Cable to instantly route any audio playing through your PC into the AudioReactive system.<br>Instantly visualize anything playing on your PC, in your browser, in your DAW, or simply through your microphone.<br>Live Mode uses the MetaSound_LIVE_AR asset.<br>Live Mode is currently in BETA so you may experience a few bugs or have Unreal crash."
      }
    ]
  },
  "C.StaticMeshControl": {
    pageTitle: "Static Mesh Control",
    cards: [
      {
        title: "Mesh Control Setup:",
        videoSrc: "../../DOCS/gifs/C/StaticMeshControl.webm",
        descriptionHtml: "In the Mesh Reaction rollout, add as many meshes you want, there is no limit.<br>Easily configure Scale / Rotate / Translate using any combination your heart desires.<br>The strength multipliers can be adjusted to achieve the desired responsiveness on a per axis basis.<br>The <a href='../B/TrackManagement.html' style='color:#64b5f6; font-weight:700; text-decoration:underline;'>Audio Track</a> parameter will always look at the index of audio tracks UNLESS <a href='../B/BandSplitting.html' style='color:#64b5f6; font-weight:700; text-decoration:underline;'>Band Mode</a> is enabled, in which case it will look at the band number."
      }
    ]
  },
  "C.ActorsWithComponents": {
    pageTitle: "Actors With Components",
    cards: [
      {
        title: "Component Control Setup:",
        videoSrc: "../../DOCS/gifs/C/ActorTagApplication.webm",
        descriptionHtml: "Add any number of components to your actor for audio-reactive control.<br>Easily configure Scale, Rotate, or Translate for each component.<br>Adjust strength multipliers and assign <a href='../B/TrackManagement.html' style='color:#64b5f6; font-weight:700; text-decoration:underline;'>Audio Tracks</a> or <a href='../B/BandSplitting.html' style='color:#64b5f6; font-weight:700; text-decoration:underline;'>Bands</a> for precise control.<br>This setup allows for flexible and dynamic reactions across multiple components within a single actor."
      }
    ]
  },
  "D.ReactiveLights": {
    pageTitle: "Reactive Lights",
    cards: [
      {
        title: "Light Control Setup:",
        videoSrc: "../../DOCS/gifs/D/AddLights.webm",
        descriptionHtml: "Add and configure lights in your scene for audio-reactive control.<br>Easily set up intensity, loudness based colorshifting, or static color with intensity only reactions.<br>Enabling 'Set Solid Color' will disable color reactions and only use intensity/brightness reaction.<br>Adjust multipliers and assign the audio track."
      }
    ]
  },
  "E.FixtureWidgetOverview": {
    pageTitle: "Fixture Widget Overview",
    cards: [
      {
        title: "Fixture Widget Setup:",
        videoSrc: "../../DOCS/gifs/E/DMXWidgetQuickView.webm",
        descriptionHtml: "The DMX Fixture Widget allows you to quickly group and arrange fixtures and assign them AudioReactive parameters. You can 'Select All Fixtures Of Type' to quickly select all fixtures of a certain type.<br>Press ALT+R to enable/disable fixture beam cone visualizers.<br>You can use the 'Add Actor Tag On Selected Fixtures' to add the tag. Duplicate tags are currently NOT checked (in progress).<br>Once your Fixture Type dropdown is set, the tag selector is populated with all found Actor Tags in your level for that Fixture Type.<br>You can then select fixtures of that type by actor tag.<br>If you want to clear all and start fresh, use 'Clear ALL ACTOR TAGS On Selected Fixtures'.<br>Actor Tags can also be added manually in the Details panel and will appear in the widget dropdown automatically."
      },
      {
        title: "Quickly Update Standard Fixtures To AudioReactive:",
        videoSrc: "../../DOCS/gifs/E/UpdateFixturesAudioReactive.webm",
        descriptionHtml: "'Update All Fixtures To AudioReactive' quickly swaps standard engine fixtures to AudioReactive versions:<br>Moving Head - Static Head - Laser - WashLED - Strobe.<br>All existing fixture positions are preserved."
      }
    ]
  },
  "E.MovingHeads": {
    pageTitle: "Moving Heads",
    cards: [
      {
        title: "Moving Head Intro",
        videoSrc: "../../DOCS/gifs/E/MovingHeadFunctions.webm",
        descriptionHtml: "Moving Head fixtures include Dimmer/Shutter/Zoom/Frost plus Pan and Tilt.<br>Each function has Audio Track Override and a Mute Function checkbox for per-function control.<br>Pan and Tilt can be very successful with proper <a href='../B/SmoothingParams.html' style='color:#64b5f6; text-decoration:underline; font-weight:700;' target='_blank'>Audio Smoothing</a> settings.<br>Moving Heads use ColorWheel and Gobo wheels with value ranges tied to presets."
      },
      {
        title: "Moving Head Midtro",
        videoSrc: "../../DOCS/gifs/E/DMXEffectTables.webm",
        descriptionHtml: "Moving Heads have unique parameters in 'Moving Head Attributes' inside each fixture index.<br>Control ColorWheel, Gobo, and Tilt Offset values.<br>You can create custom ColorWheel/Gobo datatables and assign them in BP_MovingHead_AR components."
      },
      {
        title: "Moving Head Outro",
        videoSrc: "../../DOCS/gifs/E/MovingHeadAttributes.webm",
        descriptionHtml: "Shared attributes affect multiple fixture types.<br>'Shutter' and 'Enable Beam' are used across fixtures.<br>Beam quality can be adjusted in BP_MovingHead_AR presets (low/medium/high/ultra/custom)."
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
