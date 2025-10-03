document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.carousel-images img');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  let idx = 0;
  function show(idxNew) {
    images[idx].classList.remove('active');
    idx = (idxNew + images.length) % images.length;
    images[idx].classList.add('active');
  }
  images[0].classList.add('active');
  prev.onclick = () => show(idx - 1);
  next.onclick = () => show(idx + 1);

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.onclick = () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    };
  });
  lightbox.onclick = () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  };
});

document.addEventListener('DOMContentLoaded', function() {
  // Grid gallery lightbox
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const zoomIn = document.getElementById('zoom-in');
  const zoomOut = document.getElementById('zoom-out');
  const zoomReset = document.getElementById('zoom-reset');
  let zoom = 1;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    zoom = 1;
    lightboxImg.style.transform = 'scale(1)';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }
  galleryImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(img.src, img.alt);
    });
  });
  closeBtn.onclick = closeLightbox;
  lightbox.onclick = function(e) {
    if (e.target === lightbox) closeLightbox();
  };
  document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) closeLightbox();
  });

  // Zoom controls
  zoomIn.onclick = function(e) {
    e.stopPropagation();
    zoom = Math.min(zoom + 0.2, 3);
    lightboxImg.style.transform = `scale(${zoom})`;
  };
  zoomOut.onclick = function(e) {
    e.stopPropagation();
    zoom = Math.max(zoom - 0.2, 0.5);
    lightboxImg.style.transform = `scale(${zoom})`;
  };
  zoomReset.onclick = function(e) {
    e.stopPropagation();
    zoom = 1;
    lightboxImg.style.transform = 'scale(1)';
  };
});