window.GUIDE_CONTENT = {
  communityLinks: [
    {
      href: "https://discord.gg/sdVxScU4SW",
      label: "Join The Discord",
      className: "guide-community-btn discord",
      external: true
    },
    {
      href: "https://www.youtube.com/@AudioReactive_UE",
      label: "YouTube Tutorials",
      className: "guide-community-btn youtube",
      external: true
    }
  ],
  categories: [
    {
      header: "Blueprint Details Guide",
      categories: [
        {
          header: "A - Core Controls",
          items: [
            {
              title: "Trigger",
              href: "DOCS/A/TriggerTypes.html",
              description: "Trigger workflow: Trigger enum (BeginPlay, Sequencer, Collision, RapidFire), Trigger Collision Cooldown, Post Trigger Delay Start, Playback Start Time, and Refresh Rate."
            },
            {
              title: "Peak Visualizer",
              href: "DOCS/A/PeakVisualizer.html",
              description: "Peak monitoring toggles: Peak Visualizer, then Peak Visualizer to Output Log for quick calibration and debugging."
            },
            {
              title: "Rapid Fire",
              href: "DOCS/A/RapidFire.html",
              description: "Rapid retrigger controls: Rapid Fire toggle plus Rapid Fire Reset (seconds)."
            },
            {
              title: "Proximity",
              href: "DOCS/A/Proximity.html",
              description: "Distance-driven response controls: Proximity Active, Player as Center, Center Actor, Radius, and Falloff Start Ratio."
            },
            {
              title: "Cloners Effectors",
              href: "DOCS/A/ClonersEffectors.html",
              description: "Array-based cloner/effector mapping with Animator AudioName key + AudioBand per entry."
            }
          ]
        },
        {
          header: "B - Audio",
          items: [
            {
              title: "Mode",
              href: "DOCS/B/Mode.html",
              description: "Select the active analysis path: Frequency Bands, Audio Tracks/Stems, or Live Input (Mic IN)."
            },
            {
              title: "Multiple Audio Tracks",
              href: "DOCS/B/TrackManagement.html",
              description: "Per-stem array workflow with track labeling, gain staging (Peak), envelope timing (Attack/Release), and smoothing controls."
            },
            {
              title: "Single Track Frequency Bands",
              href: "DOCS/B/BandSplitting.html",
              description: "Single-source band workflow with smoothing controls for transient handling and response contouring."
            },
            {
              title: "Live Input (Mic IN)",
              href: "DOCS/B/LiveMode.html",
              description: "Real-time input path for microphone or loopbacked system audio."
            }
          ]
        },
        {
          header: "C - Mesh Reaction",
          items: [
            {
              title: "Static Mesh Control",
              href: "DOCS/C/StaticMeshControl.html",
              description: "Unified C rollout: enable Reactive Meshes, then configure Audio Reactive Static Meshes entries. Includes Tag Mode (BETA) for reactive actors containing static mesh components via Actor Tag + Component Tags."
            }
          ]
        },
        {
          header: "D - Light Reaction",
          items: [
            {
              title: "Reactive Lights",
              href: "DOCS/D/ReactiveLights.html",
              description: "Current rollout: Reactive Lights bool, Audio Reactive Lights array, then per index Light, Intensity, Reactive Color Control (Low/High/Contrast), Audio Track, Set Solid Color, and Solid Light Color (RGBA). High Low Contrast controls how smoothly or sharply color transitions between low/high colors as audio intensity changes."
            }
          ]
        },
        {
          header: "E - DMX",
          items: [
            {
              title: "DMX Group Control",
              href: "DOCS/E/FixtureWidgetOverview.html",
              description: "Unreal built-in fixture workflow only (no ArtNet/output protocol). Covers Enable DMX, Light Fixture Groups, and Laser Groups in Group Control."
            },
            {
              title: "DMX Individual Control",
              href: "DOCS/E/MovingHeads.html",
              description: "Individual Control arrays mirror the same rollouts and fields used in Group Control for both Light Fixtures and Lasers."
            },
            {
              title: "Watch DMX YouTube Tutorial",
              href: "https://www.youtube.com/watch?v=gNOzQNSr2cw",
              className: "dmx-youtube-btn",
              external: true
            }
          ]
        }
      ]
    },
    {
      header: "Workflow Recipes & Initial Setup",
      items: [
        {
          title: "First-Time Setup Checklist",
          href: "DOCS/Workflows/FirstTimeSetupChecklist.html",
          description: "Complete first-run checklist: install, enable, restart, content visibility, base actor placement, and first playback verification."
        },
        {
          title: "AudioReactive Materials",
          href: "DOCS/Materials/ReactiveMaterials.html",
          description: "Material-focused reference and walkthrough content covering emissive response, reactive parameter behavior, and audio routing setup."
        },
        {
          title: "How to Setup a Reactive Mesh",
          href: "DOCS/Workflows/ReactiveMeshSetup.html",
          description: "Practical start-to-finish workflow for building a reactive mesh setup from scratch."
        },
        {
          title: "How to Setup a Reactive Light",
          href: "DOCS/Workflows/ReactiveLightSetup.html",
          description: "Step-by-step light setup workflow focused on usable defaults, tuning, and final polish."
        },
        {
          title: "How to Setup Cloner/Effector Live Audio",
          href: "DOCS/Workflows/ClonerEffectorLiveAudio.html",
          description: "Workflow recipe for cloner/effector audio mapping (not live-only), including AudioName + AudioBand setup. Frequency Bands use fixed indices (0=Bass, 1=Low-Mid, 2=High-Mid, 3=High), while Audio Tracks/Stems uses dynamic track array indices (0..N) that grow as tracks are added."
        }
      ]
    }
  ]
};
