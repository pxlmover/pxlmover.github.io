(function () {
  function getMediaDefaults() {
    return (window.GUIDE_DOCS && window.GUIDE_DOCS.__mediaDefaults) || {};
  }

  function inferMimeType(src) {
    if (!src) return '';
    const cleanSrc = src.split('?')[0].toLowerCase();
    if (cleanSrc.endsWith('.webm')) return 'video/webm';
    if (cleanSrc.endsWith('.mp4')) return 'video/mp4';
    if (cleanSrc.endsWith('.ogv') || cleanSrc.endsWith('.ogg')) return 'video/ogg';
    if (cleanSrc.endsWith('.mov')) return 'video/quicktime';
    return '';
  }

  function normalizeVideoConfig(card) {
    const defaults = getMediaDefaults();
    const media = card.media;
    if (media && media.type === 'video') {
      const rawSources = media.sources || [];
      const normalizedSources = rawSources
        .map(source => {
          if (!source) return null;
          if (typeof source === 'string') {
            return { src: source, type: inferMimeType(source) };
          }
          if (source.src) {
            return { src: source.src, type: source.type || inferMimeType(source.src) };
          }
          return null;
        })
        .filter(Boolean);

      const sources = [...normalizedSources];
      if (media.src) {
        sources.unshift({
          src: media.src,
          type: media.typeHint || inferMimeType(media.src)
        });
      }
      return {
        sources,
        poster: media.poster || defaults.poster || '',
        controls: media.controls ?? defaults.controls ?? true,
        loop: media.loop ?? defaults.loop ?? false,
        muted: media.muted ?? defaults.muted ?? false,
        autoplay: media.autoplay ?? defaults.autoplay ?? false,
        playsInline: media.playsInline ?? defaults.playsInline ?? true,
        preload: media.preload || defaults.preload || 'metadata',
        tracks: media.tracks || []
      };
    }

    if (card.videoSrc) {
      return {
        sources: [
          {
            src: card.videoSrc,
            type: inferMimeType(card.videoSrc)
          }
        ],
        poster: defaults.poster || '',
        controls: defaults.controls ?? true,
        loop: defaults.loop ?? false,
        muted: defaults.muted ?? false,
        autoplay: defaults.autoplay ?? false,
        playsInline: defaults.playsInline ?? true,
        preload: defaults.preload || 'metadata',
        tracks: []
      };
    }

    return null;
  }

  function buildVideoElement(videoConfig) {
    const video = document.createElement('video');
    video.controls = Boolean(videoConfig.controls);
    video.loop = Boolean(videoConfig.loop);
    video.muted = Boolean(videoConfig.muted);
    video.autoplay = Boolean(videoConfig.autoplay);
    video.playsInline = Boolean(videoConfig.playsInline);
    video.preload = videoConfig.preload || 'metadata';

    if (videoConfig.poster) {
      video.poster = videoConfig.poster;
    }

    (videoConfig.sources || []).forEach(source => {
      const sourceEl = document.createElement('source');
      sourceEl.src = source.src;
      sourceEl.type = source.type || inferMimeType(source.src);
      video.appendChild(sourceEl);
    });

    const primarySource = (videoConfig.sources || []).find(source => source && source.src);
    if (primarySource) {
      video.src = primarySource.src;
    }

    (videoConfig.tracks || []).forEach(track => {
      if (!track || !track.src) return;
      const trackEl = document.createElement('track');
      trackEl.kind = track.kind || 'captions';
      trackEl.src = track.src;
      trackEl.srclang = track.srclang || 'en';
      trackEl.label = track.label || 'English';
      trackEl.default = Boolean(track.default);
      video.appendChild(trackEl);
    });

    video.style.width = '100%';
    video.style.maxWidth = '1080px';
    video.style.maxHeight = '760px';
    video.style.display = 'block';
    video.style.marginBottom = '16px';
    video.style.background = '#181a2a';
    video.style.borderRadius = '0';
    video.textContent = 'Your browser does not support the video tag.';

    return video;
  }

  function renderDocPage() {
    const pageKey = document.body.getAttribute('data-guide-page');
    const page = window.GUIDE_DOCS && window.GUIDE_DOCS[pageKey];
    const pageTitleEl = document.getElementById('doc-page-title');
    const galleryRoot = document.getElementById('doc-gallery-grid');

    if (!page || !pageTitleEl || !galleryRoot) {
      return;
    }

    document.title = `${page.pageTitle} – AudioReactive Docs`;
    pageTitleEl.textContent = page.pageTitle;

    galleryRoot.innerHTML = '';

    (page.cards || []).forEach(card => {
      const item = document.createElement('div');
      item.className = 'gallery-item';

      const title = document.createElement('div');
      title.className = 'gallery-title';
      title.textContent = card.title || '';
      item.appendChild(title);

      const videoConfig = normalizeVideoConfig(card);
      if (videoConfig) {
        const video = buildVideoElement(videoConfig);
        item.appendChild(video);
      } else if (card.media && card.media.type === 'image' && card.media.src) {
        const img = document.createElement('img');
        img.src = card.media.src;
        img.alt = card.title || page.pageTitle;
        item.appendChild(img);
      } else if (card.imageSrc) {
        const img = document.createElement('img');
        img.src = card.imageSrc;
        img.alt = card.title || page.pageTitle;
        item.appendChild(img);
      }

      const desc = document.createElement('div');
      desc.className = 'gallery-desc gallery-instruction';
      desc.innerHTML = card.descriptionHtml || '';
      item.appendChild(desc);

      galleryRoot.appendChild(item);
    });

    const backLink = document.querySelector('.back-link');
    if (backLink) {
      backLink.addEventListener('click', function () {
        localStorage.setItem('guideARScroll', window.scrollY);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderDocPage);
  } else {
    renderDocPage();
  }
})();
