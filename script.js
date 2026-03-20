// Division tab switcher
function showDiv(div) {
  document.querySelectorAll('.div-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.div-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('div-' + div).classList.add('active');
  event.target.classList.add('active');
}

// Mobile nav toggle
function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.background = window.scrollY > 50
    ? 'rgba(0,0,0,0.98)'
    : 'rgba(0,0,0,0.92)';
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 4000);
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.value-card, .player-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── Hero Slideshow ────────────────────────────────────────────
(function initHeroSlideshow() {
  const container = document.getElementById('hero-slides');
  if (!container) return;

  let images = [];
  try {
    const gallery = JSON.parse(localStorage.getItem('bjr_gallery')) || [];
    images = gallery.filter(g => g.type === 'image').map(g => g.src);
  } catch {}

  if (!images.length) {
    // no gallery images yet — show fallback jaguar pattern
    container.closest('.hero').classList.add('hero-no-images');
    container.closest('.hero').style.background =
      'linear-gradient(135deg, #0a0a0a 0%, #1a1a0a 50%, #0a0a0a 100%)';
    return;
  }

  // build slide elements
  images.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'hero-slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url('${src}')`;
    container.appendChild(div);
  });

  if (images.length < 2) return; // only one image, no need to cycle

  let current = 0;
  setInterval(() => {
    const slides = container.querySelectorAll('.hero-slide');
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    // reset zoom animation
    slides[current].style.animation = 'none';
    slides[current].offsetHeight; // reflow
    slides[current].style.animation = '';
    slides[current].classList.add('active');
  }, 5000);
})();

// ── Public Gallery ────────────────────────────────────────────
let pubGalleryFilter = 'all';

function loadPubGallery() {
  try { return JSON.parse(localStorage.getItem('bjr_gallery')) || []; } catch { return []; }
}

function getYouTubeEmbed(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function renderPubGallery() {
  const grid = document.getElementById('gallery-pub-grid');
  if (!grid) return;
  const all = loadPubGallery();
  const items = pubGalleryFilter === 'all' ? all : all.filter(g => g.type === pubGalleryFilter);

  if (!items.length) {
    grid.innerHTML = '<p class="gallery-empty">No media added yet. Check back soon.</p>';
    return;
  }

  grid.innerHTML = items.map((item, i) => `
    <div class="gallery-pub-item" onclick="openLightbox(${all.indexOf(item)})">
      ${item.type === 'image'
        ? `<img src="${item.src}" alt="${item.caption || 'Gallery'}" loading="lazy" />`
        : `<div class="vid-thumb">▶</div>`
      }
      ${item.caption ? `<div class="item-caption">${item.caption}</div>` : ''}
    </div>
  `).join('');
}

function filterPubGallery(type, btn) {
  pubGalleryFilter = type;
  document.querySelectorAll('.gfp-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPubGallery();
}

function openLightbox(i) {
  const item = loadPubGallery()[i];
  if (!item) return;
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');

  if (item.type === 'image') {
    content.innerHTML = `
      <img src="${item.src}" alt="${item.caption || 'Gallery'}" />
      ${item.caption ? `<p class="lightbox-caption">${item.caption}</p>` : ''}
    `;
  } else {
    const embed = getYouTubeEmbed(item.src);
    content.innerHTML = `
      <iframe src="${embed}" allowfullscreen></iframe>
      ${item.caption ? `<p class="lightbox-caption">${item.caption}</p>` : ''}
    `;
  }

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightbox-content').innerHTML = '';
  document.body.style.overflow = '';
}

// close lightbox with Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// init
renderPubGallery();
