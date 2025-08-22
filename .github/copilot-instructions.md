# Copilot Instructions for pxlmover.github.io

## Project Overview
This is a static documentation and showcase site for AudioReactive and related Unreal Engine tools. The codebase is organized by feature, with subsites and galleries for demos, guides, and product documentation. The main technologies are HTML, CSS, and JavaScript, with a focus on interactive UI, responsive design, and animated effects.

## Key Directories & Files
- `GuideAR/` – Main documentation and guide subsites
- `GuideAR/DOCS/` – Feature-specific documentation (A-G)
- `GuideAR/gifs/`, `GuideAR/images/`, `GuideAR/videos/` – Media assets for guides and galleries
- `GuideAR/style.css`, `GuideAR/common.js` – Shared styles and scripts
- `sites/` – Main showcase pages (e.g., `Audioreactive.html`, `Resume.html`)
- `images/` – General images and screenshots

## Essential Patterns & Conventions
- **Theme & Interactivity:** Theme switching and animated backgrounds use CSS variables and JavaScript event listeners. See `common.js` and main site HTML for examples.
- **Soundwave Animation:** SVG soundwave backgrounds are dynamically generated and animated via JS. See the script block in `Audioreactive.html` for the current pattern.
- **Gallery Layouts:** Video and image galleries use CSS grid/flexbox for responsive scaling. Hover effects and lightboxes are implemented with JS and CSS transitions.
- **Subsite Linking:** Navigation between subsites uses relative links. Ensure paths are correct for local and deployed usage.
- **Media Format:** Prefer `.webm` for video compatibility. Update links across subsites as needed.
- **Party Switch & Special Effects:** Interactive buttons (e.g., Party Switch) use JS to toggle CSS classes for animated backgrounds.

## Developer Workflows
- **No build step:** All files are static. Edit HTML/CSS/JS directly and refresh in browser to test.
- **Debugging:** Use browser dev tools for layout, JS errors, and network issues. No automated test suite is present.
- **Adding Features:** Place new guides, galleries, or demos in the appropriate subfolder. Update navigation links and ensure media assets are referenced with correct relative paths.

## Integration Points
- **External Fonts:** Google Fonts are loaded via `<link>` in HTML `<head>`.
- **YouTube Embeds:** Video galleries use YouTube thumbnails and lightbox playback via iframe.
- **Unreal Engine Integration:** Designed for embedding in Unreal Engine Web Browser widget; test for scaling and compatibility.

## Examples
- **Animated Soundwave:** See `sites/Audioreactive.html` script for dynamic SVG generation and animation.
- **Gallery Grid:** See `.video-gallery`, `.video-grid`, and `.gallery-grid` CSS classes for layout conventions.
- **Theme Switcher:** See JS event listeners and CSS variable usage in `common.js` and main HTML files.

## Tips for AI Agents
- Always use relative paths for media and links.
- When adding new interactive features, follow the event-driven JS patterns in main site files.
- For new documentation, match the structure and style of existing subsites in `GuideAR/DOCS/`.
- Keep UI responsive: use CSS grid/flexbox and media queries as in current stylesheets.

---

If any section is unclear or missing important project-specific details, please provide feedback to improve these instructions.
