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
(function initHeroCollage() {
  const colA = document.getElementById('collage-col-a');
  const colB = document.getElementById('collage-col-b');
  const colC = document.getElementById('collage-col-c');
  const strip = document.getElementById('img-strip');

  if (!colA) return;

  const imgs = [...STATIC_IMAGES].sort(() => Math.random() - 0.5);
  const third = Math.ceil(imgs.length / 3);
  const cols = [imgs.slice(0, third), imgs.slice(third, third * 2), imgs.slice(third * 2)];

  [colA, colB, colC].forEach((col, i) => {
    const set = [...cols[i], ...cols[i]];
    set.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Black Jaguars';
      img.loading = 'lazy';
      col.appendChild(img);
    });
  });

  if (strip) {
    const stripImgs = [...imgs, ...imgs];
    stripImgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      strip.appendChild(img);
    });
  }
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
    const hidden = JSON.parse(localStorage.getItem('bjr_hidden_media')) || [];
    const adminItems = JSON.parse(localStorage.getItem('bjr_gallery')) || [];
    const staticItems = STATIC_IMAGES
      .filter(src => !hidden.includes(src))
      .map(src => ({ type: 'image', src, caption: '' }));
    const staticVideos = STATIC_VIDEOS
      .filter(src => !hidden.includes(src))
      .map(src => ({ type: 'video', src, caption: '', local: true }));
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

// ── Admin Fixtures on Public Site ────────────────────────────
(function renderAdminFixtures() {
  const fixtures = JSON.parse(localStorage.getItem('bjr_fixtures') || '[]');
  if (!fixtures.length) return;

  // Find or create the "Our Results" block inside the fixtures section
  let container = document.getElementById('admin-fixtures-block');
  if (!container) {
    const section = document.querySelector('.fixtures .container');
    if (!section) return;
    container = document.createElement('div');
    container.id = 'admin-fixtures-block';
    container.innerHTML = '<h3 class="results-heading">Our Results</h3>';
    section.appendChild(container);
  }

  const table = document.createElement('div');
  table.className = 'fixtures-table-wrap';
  table.innerHTML = `
    <table class="fixtures-table">
      <thead>
        <tr><th>Date</th><th>Home</th><th>Away</th><th>Venue</th><th>Div</th><th>Result</th></tr>
      </thead>
      <tbody>
        ${fixtures.map(f => {
          const outcome = f.outcome || 'upcoming';
          let badge, rowClass = '';
          if (outcome === 'W') { badge = `<span class="badge win">W ${f.scoreUs}–${f.scoreThem}</span>`; rowClass = 'result-win'; }
          else if (outcome === 'L') { badge = `<span class="badge loss">L ${f.scoreUs}–${f.scoreThem}</span>`; rowClass = 'result-loss'; }
          else if (outcome === 'D') { badge = `<span class="badge draw">D ${f.scoreUs}–${f.scoreThem}</span>`; rowClass = 'result-draw'; }
          else if (outcome === 'bye') { badge = `<span class="badge bye">Bye</span>`; }
          else { badge = `<span class="badge upcoming">Upcoming</span>`; rowClass = 'upcoming'; }
          const isHome = f.home.toLowerCase().includes('jaguar') || f.home.toLowerCase().includes('black');
          return `<tr class="${rowClass}">
            <td>${f.date}</td>
            <td class="${isHome ? 'home-team' : ''}">${f.home}</td>
            <td class="${!isHome ? 'home-team' : ''}">${f.away}</td>
            <td>${f.venue || '—'}</td>
            <td>${f.division || '—'}</td>
            <td>${badge}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;
  container.appendChild(table);
})();

// ── Public Team Section ───────────────────────────────────────
(function renderPublicTeam() {
  const grid = document.getElementById('team-grid');
  if (!grid) return;

  const DEFAULT_PLAYERS = [
    { name: 'Siyanda Dlamini', number: 1,  position: 'Loosehead Prop',    captain: true  },
    { name: 'Thabo Mthembu',   number: 9,  position: 'Scrumhalf',          captain: false },
    { name: 'Lungelo Zulu',    number: 10, position: 'Flyhalf',             captain: false },
    { name: 'Nkosinathi Cele', number: 8,  position: 'Number 8',            captain: false },
    { name: 'Bongani Ntuli',   number: 15, position: 'Fullback',            captain: false },
    { name: 'Musa Khumalo',    number: 7,  position: 'Openside Flanker',    captain: false },
  ];

  try {
    const stored = localStorage.getItem('bjr_players');
    const hidden = JSON.parse(localStorage.getItem('bjr_hidden_players') || '[]');
    const players = stored ? JSON.parse(stored) : DEFAULT_PLAYERS;
    const visible = players.filter((_, i) => !hidden.includes(i));

    if (!visible.length) {
      grid.innerHTML = '<p style="color:#888;text-align:center;grid-column:1/-1">Squad details coming soon.</p>';
      return;
    }

    grid.innerHTML = visible.map(p => `
      <div class="player-card">
        <div class="player-avatar">${p.number}</div>
        <h3>${p.name}</h3>
        <span class="position">${p.position}</span>
        ${p.captain ? '<span class="captain-badge">Captain</span>' : ''}
      </div>
    `).join('');
  } catch(e) {
    grid.innerHTML = '';
  }
})();
