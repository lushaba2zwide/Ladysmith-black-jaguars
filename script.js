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
  if (!images.length) {
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
const STATIC_IMAGES = [
  "images/IMG-20260321-WA0044.jpg",
  "images/IMG-20260321-WA0045.jpg",
  "images/IMG-20260321-WA0045 - Copy.jpg",
  "images/IMG-20260321-WA0046.jpg",
  "images/IMG-20260321-WA0047.jpg",
  "images/IMG-20260321-WA0048.jpg",
  "images/IMG-20260321-WA0049.jpg",
  "images/IMG-20260321-WA0050.jpg",
  "images/IMG-20260321-WA0051.jpg",
  "images/IMG-20260321-WA0052.jpg",
  "images/IMG-20260321-WA0056.jpg",
  "images/IMG-20260323-WA0003.jpg",
  "images/IMG-20260323-WA0004.jpg",
  "images/IMG-20260323-WA0005.jpg",
  "images/IMG-20260323-WA0006.jpg",
  "images/IMG-20260323-WA0007.jpg",
  "images/IMG-20260323-WA0013.jpg",
  "images/IMG-20260323-WA0014.jpg",
  "images/IMG-20260323-WA0015.jpg",
  "images/IMG-20260323-WA0016.jpg",
  "images/IMG-20260323-WA0017.jpg",
  "images/IMG-20260323-WA0018.jpg",
  "images/IMG-20260323-WA0024.jpg",
  "images/IMG-20260323-WA0025.jpg",
  "images/IMG-20260323-WA0026.jpg",
  "images/IMG-20260323-WA0028.jpg",
  "images/IMG-20260323-WA0029.jpg",
  "images/IMG-20260323-WA0031.jpg",
  "images/IMG-20260323-WA0033.jpg",
  "images/IMG-20260323-WA0036.jpg",
  "images/IMG-20260323-WA0040.jpg",
  "images/IMG-20260323-WA0042.jpg",
  "images/IMG-20260323-WA0046.jpg",
  "images/IMG-20260323-WA0048.jpg",
  "images/IMG-20260323-WA0049.jpg",
  "images/IMG-20260323-WA0050.jpg",
  "images/IMG-20260323-WA0051.jpg",
  "images/IMG-20260323-WA0052.jpg",
  "images/IMG-20260323-WA0054.jpg",
  "images/IMG-20260323-WA0055.jpg",
  "images/IMG-20260323-WA0056.jpg",
  "images/IMG-20260323-WA0057.jpg",
  "images/IMG-20260323-WA0058.jpg",
  "images/IMG-20260323-WA0060.jpg",
  "images/IMG-20260323-WA0061.jpg",
  "images/IMG-20260323-WA0062.jpg",
  "images/IMG-20260323-WA0063.jpg",
  "images/IMG-20260323-WA0064.jpg",
  "images/IMG-20260323-WA0065.jpg",
  "images/IMG-20260323-WA0066.jpg",
  "images/IMG-20260323-WA0068.jpg",
  "images/IMG-20260323-WA0069.jpg",
  "images/IMG-20260323-WA0071.jpg",
  "images/IMG-20260323-WA0072.jpg",
  "images/IMG-20260323-WA0073.jpg",
  "images/IMG-20260323-WA0074.jpg",
  "images/IMG-20260323-WA0075.jpg",
  "images/IMG-20260323-WA0079.jpg",
  "images/IMG-20260323-WA0080.jpg",
  "images/IMG-20260323-WA0081.jpg",
  "images/IMG-20260323-WA0113.jpg",
  "images/IMG-20260323-WA0114.jpg",
  "images/IMG-20260323-WA0115.jpg",
  "images/IMG-20260323-WA0116.jpg",
  "images/IMG-20260323-WA0117.jpg",
  "images/IMG-20260323-WA0118.jpg",
  "images/IMG-20260323-WA0120.jpg",
  "images/IMG-20260323-WA0121.jpg",
  "images/IMG-20260323-WA0122.jpg",
  "images/IMG-20260323-WA0124.jpg",
];
let pubGalleryFilter = 'all';

const STATIC_VIDEOS = [
  "images/VID-20260227-WA0003.mp4",
  "images/VID-20260313-WA0001.mp4",
  "images/VID-20260318-WA0056.mp4",
  "images/VID-20260319-WA0066.mp4",
  "images/VID-20260319-WA0070.mp4",
  "images/VID-20260319-WA0071.mp4",
  "images/VID-20260319-WA0084.mp4",
  "images/VID-20260319-WA0086.mp4",
  "images/VID-20260319-WA0087.mp4",
  "images/VID-20260319-WA0088.mp4",
  "images/VID-20260319-WA0089.mp4",
  "images/VID-20260319-WA0115.mp4",
  "images/VID-20260321-WA0053.mp4",
  "images/VID-20260323-WA0008.mp4",
  "images/VID-20260323-WA0011.mp4",
  "images/VID-20260323-WA0023.mp4",
  "images/VID-20260323-WA0034.mp4",
  "images/VID-20260323-WA0035.mp4",
  "images/VID-20260323-WA0043.mp4",
  "images/VID-20260323-WA0044.mp4",
  "images/VID-20260323-WA0070.mp4",
  "images/VID-20260323-WA0082.mp4",
  "images/VID-20260323-WA0085.mp4",
  "images/VID-20260323-WA0087.mp4",
  "images/VID-20260323-WA0088.mp4",
  "images/VID-20260323-WA0089.mp4",
  "images/VID-20260323-WA0090.mp4",
  "images/VID-20260323-WA0091.mp4",
  "images/VID-20260323-WA0092.mp4",
  "images/VID-20260323-WA0093.mp4",
  "images/VID-20260323-WA0094.mp4",
  "images/VID-20260323-WA0095.mp4",
  "images/VID-20260323-WA0096.mp4",
  "images/VID-20260323-WA0097.mp4",
  "images/VID-20260323-WA0098.mp4",
  "images/VID-20260323-WA0099.mp4",
  "images/VID-20260323-WA0100.mp4",
  "images/VID-20260323-WA0101.mp4",
  "images/VID-20260323-WA0110.mp4",
  "images/VID-20260323-WA0119.mp4",
  "images/VID-20260323-WA0123.mp4",
  "images/VID-20260323-WA0125.mp4",
  "images/VID-20260323-WA0126.mp4",
  "images/VID-20260323-WA0127.mp4",
  "images/VID-20260323-WA0128.mp4",
  "images/VID-20260323-WA0129.mp4",
  "images/VID-20260323-WA0130.mp4",
  "images/VID-20260323-WA0131.mp4",
  "images/VID-20260323-WA0132.mp4",
  "images/VID-20260323-WA0133.mp4",
  "images/VID-20260323-WA0134.mp4",
  "images/VID-20260323-WA0135.mp4",
  "images/VID-20260323-WA0136.mp4",
  "images/VID-20260323-WA0137.mp4",
  "images/VID-20260323-WA0138.mp4",
];

function loadPubGallery() {
  try {
    const adminItems = JSON.parse(localStorage.getItem('bjr_gallery')) || [];
    const staticItems = STATIC_IMAGES.map(src => ({ type: 'image', src, caption: '' }));
    const staticVideos = STATIC_VIDEOS.map(src => ({ type: 'video', src, caption: '', local: true }));
    return [...adminItems, ...staticItems, ...staticVideos];
  } catch {
    return [
      ...STATIC_IMAGES.map(src => ({ type: 'image', src, caption: '' })),
      ...STATIC_VIDEOS.map(src => ({ type: 'video', src, caption: '', local: true })),
    ];
  }
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
        : item.local
          ? `<video preload="metadata" style="width:100%;height:180px;object-fit:cover;display:block;">
               <source src="${item.src}#t=0.5" type="video/mp4" />
             </video><div class="vid-play-overlay">▶</div>`
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
  } else if (item.local) {
    content.innerHTML = `
      <video controls autoplay style="max-width:90vw;max-height:80vh;border-radius:8px;">
        <source src="${item.src}" type="video/mp4" />
      </video>
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
