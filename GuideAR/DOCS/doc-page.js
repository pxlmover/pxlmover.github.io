(function () {
  function resolveCategoryLabel(pageKey, pageTitle) {
    if (!pageKey) return pageTitle || 'AudioReactive Docs';

    const prefix = pageKey.split('.')[0];
    const prefixMap = {
      A: 'A - Core Controls',
      B: 'B - Audio',
      C: 'C - Mesh Reaction',
      D: 'D - Light Reaction',
      E: 'E - DMX',
      Workflows: 'Workflow Recipes & Initial Setup',
      Materials: 'Materials'
    };

    if (prefixMap[prefix]) return prefixMap[prefix];

    const categories = (window.GUIDE_CONTENT && window.GUIDE_CONTENT.categories) || [];
    const found = categories.find(cat => cat && typeof cat.header === 'string' && cat.header.startsWith(`${prefix} -`));
    if (found && found.header) return found.header;

    return pageTitle || 'AudioReactive Docs';
  }

  function setDocsHeader(headerEl, categoryLabel, pageTitle) {
    if (!headerEl) return;

    const top = document.createElement('span');
    top.className = 'docs-header-category';
    top.textContent = categoryLabel || '';

    const bottom = document.createElement('span');
    bottom.className = 'docs-header-page';
    bottom.textContent = pageTitle || '';

    headerEl.innerHTML = '';
    headerEl.appendChild(top);
    headerEl.appendChild(bottom);
  }

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

  function armLazyVideo(video, videoConfig, isPriority) {
    if (isPriority) {
      video.preload = videoConfig.preload || 'metadata';
      return;
    }

    video.preload = 'none';

    if (!('IntersectionObserver' in window)) {
      video.preload = videoConfig.preload || 'metadata';
      video.load();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry || !entry.isIntersecting) return;

      video.preload = videoConfig.preload || 'metadata';
      video.load();
      observer.disconnect();
    }, {
      rootMargin: '250px 0px'
    });

    observer.observe(video);
  }

  function createImageLightbox() {
    const overlay = document.createElement('div');
    overlay.id = 'gallery-modal';
    overlay.setAttribute('aria-hidden', 'true');

    const content = document.createElement('div');
    content.id = 'gallery-modal-content';
    content.setAttribute('role', 'dialog');
    content.setAttribute('aria-modal', 'true');
    content.setAttribute('aria-label', 'Expanded screenshot view');

    const closeButton = document.createElement('button');
    closeButton.id = 'gallery-modal-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close expanded image');
    closeButton.textContent = '×';

    const body = document.createElement('div');
    body.id = 'gallery-modal-body';

    const modalImage = document.createElement('img');
    modalImage.id = 'gallery-modal-image';
    modalImage.alt = 'Expanded screenshot';

    body.appendChild(modalImage);
    content.appendChild(closeButton);
    content.appendChild(body);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    let previouslyFocusedElement = null;

    function getFocusableElements() {
      return Array.from(content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
    }

    function closeModal() {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('gallery-modal-open');
      modalImage.src = '';
      modalImage.alt = 'Expanded screenshot';

      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
      }
      previouslyFocusedElement = null;
    }

    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay.style.display === 'flex') {
        closeModal();
      }
    });

    overlay.addEventListener('keydown', function (event) {
      if (overlay.style.display !== 'flex' || event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    return {
      open: function (src, altText) {
        if (!src) return;
        previouslyFocusedElement = document.activeElement;
        modalImage.src = src;
        modalImage.alt = altText || 'Expanded screenshot';
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('gallery-modal-open');
        closeButton.focus();
      }
    };
  }

  function appendClickableImage(parent, lightbox, src, altText) {
    if (!src) return;
    const img = document.createElement('img');
    img.src = src;
    img.alt = altText || 'Screenshot';
    img.classList.add('gallery-image-clickable');
    img.addEventListener('click', function () {
      lightbox.open(img.src, img.alt);
    });
    parent.appendChild(img);
  }

  function renderDocPage() {
    const pageKey = document.body.getAttribute('data-guide-page');
    const page = window.GUIDE_DOCS && window.GUIDE_DOCS[pageKey];
    const headerEl = document.querySelector('.header');
    const pageTitleEl = document.getElementById('doc-page-title');
    const galleryRoot = document.getElementById('doc-gallery-grid');

    if (!page || !pageTitleEl || !galleryRoot) {
      return;
    }

    document.title = `${page.pageTitle} – AudioReactive Docs`;
    if (headerEl) {
      setDocsHeader(headerEl, resolveCategoryLabel(pageKey, page.pageTitle), page.pageTitle);
    }
    pageTitleEl.textContent = page.pageTitle;

    galleryRoot.innerHTML = '';
    const lightbox = createImageLightbox();

    (page.cards || []).forEach((card, cardIndex) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';

      const title = document.createElement('div');
      title.className = 'gallery-title';
      title.textContent = card.title || '';
      item.appendChild(title);

      const videoConfig = normalizeVideoConfig(card);
      if (videoConfig) {
        const video = buildVideoElement(videoConfig);
        armLazyVideo(video, videoConfig, cardIndex === 0);
        item.appendChild(video);
      } else if (card.media && card.media.type === 'image') {
        const imageSources = [];
        if (card.media.src) {
          imageSources.push(card.media.src);
        }
        if (Array.isArray(card.media.images)) {
          imageSources.push(...card.media.images.filter(Boolean));
        }

        imageSources.forEach(function (src) {
          appendClickableImage(item, lightbox, src, card.title || page.pageTitle);
        });
      } else if (card.imageSrc) {
        appendClickableImage(item, lightbox, card.imageSrc, card.title || page.pageTitle);
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
