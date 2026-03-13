# GuideAR Media Workflow (Audio-Enabled)

This project now supports a future-proof media schema in `DOCS/docs-content.js`.

## Quick Rule

- Record high-quality masters once.
- Deliver web-ready files in a consistent format.
- If every clip follows this checklist, updates are plug-and-play.

## Recommended Formats

- Primary: **WebM** (`VP9 + Opus`) for lightweight delivery
- Fallback: **MP4** (`H.264 + AAC`) for broad compatibility
- Keep clips short (5-25s) and focused per concept

## Pre-Delivery Checklist (Use This Every Time)

- MP4 codec: `H.264`
- MP4 pixel format: `yuv420p`
- MP4 audio: `AAC`, `48kHz`, `160-192kbps`
- MP4 web flag: `+faststart` (moov atom at beginning)
- Optional WebM: `VP9 + Opus`
- Resolution target: `1920x1080` default, `2560x1440` if text is too small
- FPS: `30` for docs/tutorials (use `60` only when needed)
- Consistent naming: `FeatureName_Step01.mp4` (+ `.webm` optional)

## OBS Recording Preset (source/master)

- Recording Format: `MKV` (safer)
- Canvas Resolution: `3840x2160` (if recording on 4K desktop)
- Output (Scaled) Resolution: `1920x1080` default (`2560x1440` for text-heavy clips)
- Downscale Filter: `Lanczos`
- FPS: `30`
- Encoder: `NVENC H.264` (or `x264`)
- Rate control: `CQP`
- CQ: `20-24` (start at `22`)
- Keyframe interval: `2s`
- Audio: `AAC`, `48kHz`, `160-192kbps`

### NVENC Recording Encoder Values (Recommended)

- Preset: `P5` or `P6`
- Tuning: `High Quality`
- Multipass: `Two Passes (Quarter Resolution)`
- Profile: `high`
- Look-ahead: `Off`
- Psycho Visual Tuning: `On`
- B-frames: `2`

## Transcode Commands (ffmpeg)

### WebM (smallest)

```bash
ffmpeg -i input.mkv -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -tile-columns 2 -c:a libopus -b:a 96k output.webm
```

### MP4 fallback

```bash
ffmpeg -i input.mkv -c:v libx264 -preset slow -crf 23 -movflags +faststart -c:a aac -b:a 128k output.mp4
```

### Faststart fix for existing MP4 (no re-encode)

```bash
ffmpeg -i input.mp4 -c copy -movflags +faststart output_faststart.mp4
```

### Browser-safe MP4 re-encode (if playback issues)

```bash
ffmpeg -i input.mp4 -c:v libx264 -pix_fmt yuv420p -profile:v high -level 4.1 -movflags +faststart -c:a aac -b:a 160k output_safe.mp4
```

## New Card Schema (preferred)

```js
{
  title: "My Clip",
  media: {
    type: "video",
    poster: "../../DOCS/gifs/B/MyClipPoster.jpg", // optional
    controls: true,
    muted: false,
    loop: false,
    autoplay: false,
    preload: "metadata",
    sources: [
      { src: "../../DOCS/gifs/B/MyClip.webm", type: "video/webm" },
      { src: "../../DOCS/gifs/B/MyClip.mp4", type: "video/mp4" }
    ],
    tracks: [
      { kind: "captions", src: "../../DOCS/gifs/B/MyClip.en.vtt", srclang: "en", label: "English", default: true }
    ]
  },
  descriptionHtml: "Instruction text here."
}
```

## Handoff Format for Bulk Updates

When delivering new media for updates, provide a list like:

```txt
A.Proximity | Card 1 | DOCS/videos/Proximity_Overview.mp4 | DOCS/videos/Proximity_Overview.webm
A.ClonersEffectors | Card 1 | DOCS/videos/Cloners_ArraySetup.mp4 | DOCS/videos/Cloners_ArraySetup.webm
```

Optional fields to include:

- poster image path
- caption file path (`.vtt`)
- preferred title text
- updated description text

## Backward Compatibility

Existing entries using `videoSrc` still work. You can migrate gradually card-by-card.

## Suggested File Naming

- `FeatureName_Step01.webm`
- `FeatureName_Step01.mp4`
- `FeatureName_Step01.en.vtt` (optional captions)
- `FeatureName_Step01.jpg` (optional poster)
