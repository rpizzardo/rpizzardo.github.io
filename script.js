// Simple lightbox for the fieldwork gallery. No dependencies.
(function () {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const full = items[currentIndex].getAttribute('data-full');
    const alt = items[currentIndex].querySelector('img').getAttribute('alt');
    lightboxImg.src = full;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  function showRelative(offset) {
    currentIndex = (currentIndex + offset + items.length) % items.length;
    const full = items[currentIndex].getAttribute('data-full');
    const alt = items[currentIndex].querySelector('img').getAttribute('alt');
    lightboxImg.src = full;
    lightboxImg.alt = alt;
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showRelative(-1));
  nextBtn.addEventListener('click', () => showRelative(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });
})();
