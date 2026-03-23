// ── Storage helpers ──────────────────────────────────────────
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

// ── Tab switching ─────────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ── Modal helpers ─────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ══════════════════════════════════════════════════════════════
// PLAYERS
// ══════════════════════════════════════════════════════════════
let players = load('bjr_players', [
  { name: 'Siyanda Dlamini', number: 1, position: 'Loosehead Prop', captain: true },
  { name: 'Thabo Mthembu',   number: 9, position: 'Scrumhalf',       captain: false },
  { name: 'Lungelo Zulu',    number: 10, position: 'Flyhalf',         captain: false },
  { name: 'Nkosinathi Cele', number: 8, position: 'Number 8',         captain: false },
  { name: 'Bongani Ntuli',   number: 15, position: 'Fullback',        captain: false },
  { name: 'Musa Khumalo',    number: 7, position: 'Openside Flanker', captain: false },
]);

function renderPlayers() {
  const grid = document.getElementById('players-grid');
  if (!players.length) {
    grid.innerHTML = '<p class="empty-state">No players yet. Add your first player.</p>';
    return;
  }
  grid.innerHTML = players.map((p, i) => `
    <div class="player-card-admin">
      <div class="jersey">${p.number}</div>
      <h3>${p.name}</h3>
      <span class="pos">${p.position}</span>
      ${p.captain ? '<span class="captain-tag">Captain</span>' : ''}
      <div class="card-actions">
        <button class="btn-edit" onclick="editPlayer(${i})">Edit</button>
        <button class="btn-delete" onclick="deletePlayer(${i})">Delete</button>
      </div>
    </div>
  `).join('');
}

function openPlayerModal(i = -1) {
  document.getElementById('p-index').value = i;
  if (i >= 0) {
    const p = players[i];
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-number').value = p.number;
    document.getElementById('p-position').value = p.position;
    document.getElementById('p-captain').checked = p.captain;
    document.getElementById('player-modal-title').textContent = 'Edit Player';
  } else {
    document.getElementById('p-name').value = '';
    document.getElementById('p-number').value = '';
    document.getElementById('p-position').value = '';
    document.getElementById('p-captain').checked = false;
    document.getElementById('player-modal-title').textContent = 'Add Player';
  }
  openModal('player-modal');
}

function editPlayer(i) { openPlayerModal(i); }

function savePlayer(e) {
  e.preventDefault();
  const i = parseInt(document.getElementById('p-index').value);
  const player = {
    name: document.getElementById('p-name').value.trim(),
    number: parseInt(document.getElementById('p-number').value),
    position: document.getElementById('p-position').value.trim(),
    captain: document.getElementById('p-captain').checked,
  };
  if (i >= 0) players[i] = player; else players.push(player);
  save('bjr_players', players);
  renderPlayers();
  closeModal('player-modal');
}

function deletePlayer(i) {
  if (!confirm('Remove this player?')) return;
  players.splice(i, 1);
  save('bjr_players', players);
  renderPlayers();
}

// ══════════════════════════════════════════════════════════════
// FIXTURES
// ══════════════════════════════════════════════════════════════
let fixtures = load('bjr_fixtures', []);

function renderFixtures() {
  const tbody = document.getElementById('fixtures-tbody');
  if (!fixtures.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No fixtures yet. Add one above.</td></tr>';
    return;
  }
  tbody.innerHTML = fixtures.map((f, i) => {
    const outcome = f.outcome || 'upcoming';
    let resultBadge;
    if (outcome === 'W') resultBadge = `<span class="badge win">W ${f.scoreUs}–${f.scoreThem}</span>`;
    else if (outcome === 'L') resultBadge = `<span class="badge loss">L ${f.scoreUs}–${f.scoreThem}</span>`;
    else if (outcome === 'D') resultBadge = `<span class="badge draw">D ${f.scoreUs}–${f.scoreThem}</span>`;
    else if (outcome === 'bye') resultBadge = `<span class="badge bye">Bye</span>`;
    else resultBadge = `<span class="badge upcoming">Upcoming</span>`;
    return `
      <tr>
        <td>${f.date}</td>
        <td>${f.home}</td>
        <td>${f.away}</td>
        <td>${f.venue || '—'}</td>
        <td>${f.time || '—'}</td>
        <td>${resultBadge}</td>
        <td>
          <button class="btn-edit" onclick="editFixture(${i})">Edit</button>
          <button class="btn-delete" onclick="deleteFixture(${i})">Del</button>
        </td>
      </tr>`;
  }).join('');
}

function openFixtureModal(i = -1) {
  document.getElementById('f-index').value = i;
  const scoreFields = document.getElementById('score-fields');
  if (i >= 0) {
    const f = fixtures[i];
    document.getElementById('f-date').value = f.date;
    document.getElementById('f-home').value = f.home;
    document.getElementById('f-away').value = f.away;
    document.getElementById('f-venue').value = f.venue || '';
    document.getElementById('f-time').value = f.time || '';
    document.getElementById('f-division').value = f.division || '1st';
    document.getElementById('f-outcome').value = f.outcome || 'upcoming';
    document.getElementById('f-score-us').value = f.scoreUs || 0;
    document.getElementById('f-score-them').value = f.scoreThem || 0;
    document.getElementById('fixture-modal-title').textContent = 'Edit Fixture';
  } else {
    document.getElementById('f-date').value = '';
    document.getElementById('f-home').value = '';
    document.getElementById('f-away').value = '';
    document.getElementById('f-venue').value = '';
    document.getElementById('f-time').value = '';
    document.getElementById('f-division').value = '1st';
    document.getElementById('f-outcome').value = 'upcoming';
    document.getElementById('f-score-us').value = 0;
    document.getElementById('f-score-them').value = 0;
    document.getElementById('fixture-modal-title').textContent = 'Add Fixture';
  }
  const outcome = document.getElementById('f-outcome').value;
  scoreFields.style.display = ['W','L','D'].includes(outcome) ? 'flex' : 'none';
  openModal('fixture-modal');
}

// Show/hide score fields based on outcome
document.addEventListener('change', function(e) {
  if (e.target.id === 'f-outcome') {
    const scoreFields = document.getElementById('score-fields');
    scoreFields.style.display = ['W','L','D'].includes(e.target.value) ? 'flex' : 'none';
  }
});

function editFixture(i) { openFixtureModal(i); }

function saveFixture(e) {
  e.preventDefault();
  const i = parseInt(document.getElementById('f-index').value);
  const outcome = document.getElementById('f-outcome').value;
  const fixture = {
    date: document.getElementById('f-date').value,
    home: document.getElementById('f-home').value.trim(),
    away: document.getElementById('f-away').value.trim(),
    venue: document.getElementById('f-venue').value.trim(),
    time: document.getElementById('f-time').value,
    division: document.getElementById('f-division').value,
    outcome,
    scoreUs: parseInt(document.getElementById('f-score-us').value) || 0,
    scoreThem: parseInt(document.getElementById('f-score-them').value) || 0,
  };
  if (i >= 0) fixtures[i] = fixture; else fixtures.push(fixture);
  save('bjr_fixtures', fixtures);
  renderFixtures();
  closeModal('fixture-modal');
}

function deleteFixture(i) {
  if (!confirm('Remove this fixture?')) return;
  fixtures.splice(i, 1);
  save('bjr_fixtures', fixtures);
  renderFixtures();
}

// ══════════════════════════════════════════════════════════════
// NEWS
// ══════════════════════════════════════════════════════════════
let news = load('bjr_news', []);

function renderNews() {
  const list = document.getElementById('news-list');
  if (!news.length) {
    list.innerHTML = '<p class="empty-state">No posts yet. Add your first announcement.</p>';
    return;
  }
  list.innerHTML = news.map((n, i) => `
    <div class="news-card">
      <div class="news-card-header">
        <div>
          <h3>${n.title}</h3>
          <span class="news-date">${n.date}</span>
        </div>
        <div class="card-actions">
          <button class="btn-edit" onclick="editNews(${i})">Edit</button>
          <button class="btn-delete" onclick="deleteNews(${i})">Delete</button>
        </div>
      </div>
      <p>${n.content}</p>
    </div>
  `).join('');
}

function openNewsModal(i = -1) {
  document.getElementById('n-index').value = i;
  if (i >= 0) {
    const n = news[i];
    document.getElementById('n-title').value = n.title;
    document.getElementById('n-date').value = n.date;
    document.getElementById('n-content').value = n.content;
    document.getElementById('news-modal-title').textContent = 'Edit Post';
  } else {
    document.getElementById('n-title').value = '';
    document.getElementById('n-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('n-content').value = '';
    document.getElementById('news-modal-title').textContent = 'Add Post';
  }
  openModal('news-modal');
}

function editNews(i) { openNewsModal(i); }

function saveNews(e) {
  e.preventDefault();
  const i = parseInt(document.getElementById('n-index').value);
  const post = {
    title: document.getElementById('n-title').value.trim(),
    date: document.getElementById('n-date').value,
    content: document.getElementById('n-content').value.trim(),
  };
  if (i >= 0) news[i] = post; else news.unshift(post);
  save('bjr_news', news);
  renderNews();
  closeModal('news-modal');
}

function deleteNews(i) {
  if (!confirm('Delete this post?')) return;
  news.splice(i, 1);
  save('bjr_news', news);
  renderNews();
}

// ══════════════════════════════════════════════════════════════
// CONTACT
// ══════════════════════════════════════════════════════════════
function loadContact() {
  const c = load('bjr_contact', {});
  document.getElementById('c-address').value  = c.address  || '';
  document.getElementById('c-email').value    = c.email    || '';
  document.getElementById('c-phone').value    = c.phone    || '';
  document.getElementById('c-training').value = c.training || '';
  document.getElementById('c-facebook').value = c.facebook || '';
  document.getElementById('c-instagram').value= c.instagram|| '';
}

function saveContact(e) {
  e.preventDefault();
  save('bjr_contact', {
    address:  document.getElementById('c-address').value.trim(),
    email:    document.getElementById('c-email').value.trim(),
    phone:    document.getElementById('c-phone').value.trim(),
    training: document.getElementById('c-training').value.trim(),
    facebook: document.getElementById('c-facebook').value.trim(),
    instagram:document.getElementById('c-instagram').value.trim(),
  });
  const msg = document.getElementById('contact-saved');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 3000);
}

// ── Init ──────────────────────────────────────────────────────
renderPlayers();
renderFixtures();
renderNews();
loadContact();

// ══════════════════════════════════════════════════════════════
// GALLERY
// ══════════════════════════════════════════════════════════════
let gallery = load('bjr_gallery', []);
let galleryFilter = 'all';
let hiddenMedia = load('bjr_hidden_media', []);

const STATIC_IMAGES = [
  "images/IMG-20260321-WA0044.jpg","images/IMG-20260321-WA0045.jpg","images/IMG-20260321-WA0045 - Copy.jpg",
  "images/IMG-20260321-WA0046.jpg","images/IMG-20260321-WA0047.jpg","images/IMG-20260321-WA0048.jpg",
  "images/IMG-20260321-WA0049.jpg","images/IMG-20260321-WA0050.jpg","images/IMG-20260321-WA0051.jpg",
  "images/IMG-20260321-WA0052.jpg","images/IMG-20260321-WA0056.jpg","images/IMG-20260323-WA0003.jpg",
  "images/IMG-20260323-WA0004.jpg","images/IMG-20260323-WA0005.jpg","images/IMG-20260323-WA0006.jpg",
  "images/IMG-20260323-WA0007.jpg","images/IMG-20260323-WA0013.jpg","images/IMG-20260323-WA0014.jpg",
  "images/IMG-20260323-WA0015.jpg","images/IMG-20260323-WA0016.jpg","images/IMG-20260323-WA0017.jpg",
  "images/IMG-20260323-WA0018.jpg","images/IMG-20260323-WA0024.jpg","images/IMG-20260323-WA0025.jpg",
  "images/IMG-20260323-WA0026.jpg","images/IMG-20260323-WA0028.jpg","images/IMG-20260323-WA0029.jpg",
  "images/IMG-20260323-WA0031.jpg"
];

const STATIC_VIDEOS = [
  "images/VID-20260227-WA0003.mp4","images/VID-20260313-WA0001.mp4","images/VID-20260318-WA0056.mp4",
  "images/VID-20260319-WA0066.mp4","images/VID-20260319-WA0070.mp4","images/VID-20260319-WA0071.mp4",
  "images/VID-20260319-WA0084.mp4","images/VID-20260319-WA0086.mp4","images/VID-20260319-WA0087.mp4",
  "images/VID-20260319-WA0088.mp4","images/VID-20260319-WA0089.mp4","images/VID-20260319-WA0115.mp4",
  "images/VID-20260321-WA0053.mp4","images/VID-20260323-WA0008.mp4","images/VID-20260323-WA0011.mp4",
  "images/VID-20260323-WA0023.mp4","images/VID-20260323-WA0034.mp4","images/VID-20260323-WA0035.mp4",
  "images/VID-20260323-WA0043.mp4","images/VID-20260323-WA0044.mp4","images/VID-20260323-WA0070.mp4",
  "images/VID-20260323-WA0082.mp4","images/VID-20260323-WA0085.mp4","images/VID-20260323-WA0087.mp4",
  "images/VID-20260323-WA0088.mp4","images/VID-20260323-WA0089.mp4","images/VID-20260323-WA0090.mp4",
  "images/VID-20260323-WA0091.mp4","images/VID-20260323-WA0092.mp4","images/VID-20260323-WA0093.mp4",
  "images/VID-20260323-WA0094.mp4","images/VID-20260323-WA0095.mp4","images/VID-20260323-WA0096.mp4",
  "images/VID-20260323-WA0097.mp4","images/VID-20260323-WA0098.mp4","images/VID-20260323-WA0099.mp4",
  "images/VID-20260323-WA0100.mp4","images/VID-20260323-WA0101.mp4","images/VID-20260323-WA0110.mp4",
  "images/VID-20260323-WA0119.mp4","images/VID-20260323-WA0123.mp4","images/VID-20260323-WA0125.mp4",
  "images/VID-20260323-WA0126.mp4","images/VID-20260323-WA0127.mp4","images/VID-20260323-WA0128.mp4",
  "images/VID-20260323-WA0129.mp4","images/VID-20260323-WA0130.mp4","images/VID-20260323-WA0131.mp4",
  "images/VID-20260323-WA0132.mp4","images/VID-20260323-WA0133.mp4","images/VID-20260323-WA0134.mp4",
  "images/VID-20260323-WA0135.mp4","images/VID-20260323-WA0136.mp4","images/VID-20260323-WA0137.mp4",
  "images/VID-20260323-WA0138.mp4"
];

function toggleGalleryInputs() {
  const type = document.getElementById('g-type').value;
  document.getElementById('g-upload-wrap').style.display = type === 'image' ? 'flex' : 'none';
  document.getElementById('g-url-wrap').style.display   = type === 'video' ? 'flex' : 'none';
}

function previewFile() {
  const file = document.getElementById('g-file').files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const wrap = document.getElementById('g-preview-wrap');
    document.getElementById('g-preview').src = e.target.result;
    wrap.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function openGalleryModal() {
  document.getElementById('g-type').value = 'image';
  document.getElementById('g-file').value = '';
  document.getElementById('g-url').value = '';
  document.getElementById('g-caption').value = '';
  document.getElementById('g-preview-wrap').style.display = 'none';
  toggleGalleryInputs();
  openModal('gallery-modal');
}

function saveGalleryItem(e) {
  e.preventDefault();
  const type = document.getElementById('g-type').value;
  const caption = document.getElementById('g-caption').value.trim();

  if (type === 'image') {
    const file = document.getElementById('g-file').files[0];
    if (!file) { alert('Please select an image.'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      gallery.unshift({ type: 'image', src: ev.target.result, caption });
      save('bjr_gallery', gallery);
      renderGalleryAdmin();
      closeModal('gallery-modal');
    };
    reader.readAsDataURL(file);
  } else {
    const url = document.getElementById('g-url').value.trim();
    if (!url) { alert('Please enter a video URL.'); return; }
    gallery.unshift({ type: 'video', src: url, caption });
    save('bjr_gallery', gallery);
    renderGalleryAdmin();
    closeModal('gallery-modal');
  }
}

// Delete admin-added item
function deleteGalleryItem(i) {
  if (!confirm('Remove this item?')) return;
  gallery.splice(i, 1);
  save('bjr_gallery', gallery);
  renderGalleryAdmin();
}

// Hide/show static file
function hideStaticItem(src) {
  if (!confirm('Hide this item from the public gallery?')) return;
  if (!hiddenMedia.includes(src)) hiddenMedia.push(src);
  save('bjr_hidden_media', hiddenMedia);
  renderGalleryAdmin();
}

function restoreStaticItem(src) {
  hiddenMedia = hiddenMedia.filter(h => h !== src);
  save('bjr_hidden_media', hiddenMedia);
  renderGalleryAdmin();
}

function filterGallery(type, btn) {
  galleryFilter = type;
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGalleryAdmin();
}

function renderGalleryAdmin() {
  const grid = document.getElementById('gallery-admin-grid');

  // Build full list: admin items + static items
  const adminItems = gallery.map((item, i) => ({ ...item, adminIndex: i, isStatic: false }));
  const staticImgs = STATIC_IMAGES.map(src => ({ type: 'image', src, caption: '', isStatic: true }));
  const staticVids = STATIC_VIDEOS.map(src => ({ type: 'video', src, caption: '', isStatic: true }));
  const all = [...adminItems, ...staticImgs, ...staticVids];

  const filtered = galleryFilter === 'all' ? all : all.filter(i => i.type === galleryFilter);

  if (!filtered.length) {
    grid.innerHTML = '<p class="empty-state">No media found.</p>';
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isHidden = item.isStatic && hiddenMedia.includes(item.src);
    const thumb = item.type === 'image'
      ? `<img src="${item.src}" alt="" loading="lazy" style="opacity:${isHidden ? 0.3 : 1}" />`
      : `<div class="video-thumb" style="opacity:${isHidden ? 0.3 : 1}">▶<br><small>${item.src.split('/').pop()}</small></div>`;

    const actions = item.isStatic
      ? isHidden
        ? `<button class="btn-edit" style="width:100%" onclick="restoreStaticItem('${item.src}')">Restore</button>`
        : `<button class="btn-delete" style="width:100%" onclick="hideStaticItem('${item.src}')">Hide</button>`
      : `<button class="btn-delete" style="width:100%" onclick="deleteGalleryItem(${item.adminIndex})">Remove</button>`;

    return `
      <div class="gallery-item" style="${isHidden ? 'opacity:0.5' : ''}">
        ${thumb}
        <div class="gallery-item-info">
          <span>${item.caption || (item.type === 'video' ? 'Video' : 'Photo')}</span>
          <span class="gallery-type-badge ${item.type}">${item.type === 'image' ? '📷' : '🎬'}</span>
        </div>
        <div class="card-actions" style="padding:0 0.8rem 0.8rem">${actions}</div>
      </div>`;
  }).join('');
}

// init gallery
renderGalleryAdmin();
  document.getElementById('g-type').value = 'image';
  document.getElementById('g-file').value = '';
  document.getElementById('g-url').value = '';
  document.getElementById('g-caption').value = '';
  document.getElementById('g-preview-wrap').style.display = 'none';
  toggleGalleryInputs();
  openModal('gallery-modal');
}

function saveGalleryItem(e) {
  e.preventDefault();
  const type = document.getElementById('g-type').value;
  const caption = document.getElementById('g-caption').value.trim();

  if (type === 'image') {
    const file = document.getElementById('g-file').files[0];
    if (!file) { alert('Please select an image.'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      gallery.unshift({ type: 'image', src: ev.target.result, caption });
      save('bjr_gallery', gallery);
      renderGalleryAdmin();
      closeModal('gallery-modal');
    };
    reader.readAsDataURL(file);
  } else {
    const url = document.getElementById('g-url').value.trim();
    if (!url) { alert('Please enter a video URL.'); return; }
    gallery.unshift({ type: 'video', src: url, caption });
    save('bjr_gallery', gallery);
    renderGalleryAdmin();
    closeModal('gallery-modal');
  }
}

function deleteGalleryItem(i) {
  if (!confirm('Remove this item?')) return;
  gallery.splice(i, 1);
  save('bjr_gallery', gallery);
  renderGalleryAdmin();
}

function filterGallery(type, btn) {
  galleryFilter = type;
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGalleryAdmin();
}

function renderGalleryAdmin() {
  const grid = document.getElementById('gallery-admin-grid');
  const items = galleryFilter === 'all' ? gallery : gallery.filter(g => g.type === galleryFilter);

  if (!items.length) {
    grid.innerHTML = '<p class="empty-state">No media yet. Add your first photo or video.</p>';
    return;
  }

  // map back to original index for deletion
  grid.innerHTML = gallery
    .map((item, realIndex) => ({ item, realIndex }))
    .filter(({ item }) => galleryFilter === 'all' || item.type === galleryFilter)
    .map(({ item, realIndex }) => `
      <div class="gallery-item">
        ${item.type === 'image'
          ? `<img src="${item.src}" alt="${item.caption || 'Gallery image'}" loading="lazy" />`
          : `<div class="video-thumb">▶</div>`
        }
        <div class="gallery-item-info">
          <span title="${item.caption || item.src}">${item.caption || (item.type === 'video' ? 'Video' : 'Photo')}</span>
          <span class="gallery-type-badge ${item.type}">${item.type === 'image' ? '📷' : '🎬'}</span>
        </div>
        <div class="card-actions" style="padding:0 0.8rem 0.8rem">
          <button class="btn-delete" style="width:100%" onclick="deleteGalleryItem(${realIndex})">Remove</button>
        </div>
      </div>
    `).join('');
}

// init gallery
renderGalleryAdmin();
