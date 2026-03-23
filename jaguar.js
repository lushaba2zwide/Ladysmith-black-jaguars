// ── Jaguar Intro ─────────────────────────────────────────────
(function createJaguar() {

  // Build overlay
  const overlay = document.createElement('div');
  overlay.id = 'jaguar-overlay';
  overlay.innerHTML = `
    <div class="jaguar-wrap">
      <canvas id="jaguar-canvas" width="340" height="340"></canvas>
      <div class="jaguar-roar-text" id="jaguar-roar-text">ROAR!</div>
      <p class="jaguar-tagline">Ladysmith Black Jaguars</p>
      <button class="jaguar-enter" id="jaguar-enter">Enter Site ▶</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const canvas = document.getElementById('jaguar-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  let eyeGlow = 0;
  let eyeDir = 1;
  let roarFrame = 0;
  let roaring = false;
  let mouthOpen = 0;
  let mouthDir = 1;

  function drawJaguar(t) {
    ctx.clearRect(0, 0, W, H);

    // ── Head shape ──
    ctx.save();
    ctx.shadowColor = 'rgba(201,168,76,0.3)';
    ctx.shadowBlur = 30;

    // Main head
    ctx.beginPath();
    ctx.ellipse(170, 185, 110, 120, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0a0a';
    ctx.fill();

    // Forehead bump
    ctx.beginPath();
    ctx.ellipse(170, 100, 75, 60, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0a0a';
    ctx.fill();

    ctx.restore();

    // ── Fur texture (spots) ──
    const spots = [
      [130,130,8],[210,130,8],[150,160,6],[190,160,6],
      [120,190,7],[220,190,7],[155,220,5],[185,220,5],
      [170,250,6],[140,100,5],[200,100,5]
    ];
    spots.forEach(([x,y,r]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r*0.7, 0.3, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(30,30,30,0.8)';
      ctx.fill();
    });

    // ── Ears ──
    // Left ear
    ctx.beginPath();
    ctx.moveTo(80, 110);
    ctx.lineTo(110, 55);
    ctx.lineTo(140, 100);
    ctx.closePath();
    ctx.fillStyle = '#0d0d0d';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // inner
    ctx.beginPath();
    ctx.moveTo(92, 105);
    ctx.lineTo(112, 68);
    ctx.lineTo(132, 100);
    ctx.closePath();
    ctx.fillStyle = 'rgba(201,168,76,0.08)';
    ctx.fill();

    // Right ear
    ctx.beginPath();
    ctx.moveTo(260, 110);
    ctx.lineTo(230, 55);
    ctx.lineTo(200, 100);
    ctx.closePath();
    ctx.fillStyle = '#0d0d0d';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.3)';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(248, 105);
    ctx.lineTo(228, 68);
    ctx.lineTo(208, 100);
    ctx.closePath();
    ctx.fillStyle = 'rgba(201,168,76,0.08)';
    ctx.fill();

    // ── Eyes ──
    eyeGlow += 0.03 * eyeDir;
    if (eyeGlow > 1) eyeDir = -1;
    if (eyeGlow < 0.3) eyeDir = 1;

    const glowAlpha = 0.4 + eyeGlow * 0.6;

    // Left eye glow
    const lgL = ctx.createRadialGradient(135, 165, 2, 135, 165, 22);
    lgL.addColorStop(0, `rgba(201,168,76,${glowAlpha})`);
    lgL.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.ellipse(135, 165, 22, 16, -0.2, 0, Math.PI*2);
    ctx.fillStyle = lgL;
    ctx.fill();

    // Right eye glow
    const lgR = ctx.createRadialGradient(205, 165, 2, 205, 165, 22);
    lgR.addColorStop(0, `rgba(201,168,76,${glowAlpha})`);
    lgR.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.ellipse(205, 165, 22, 16, 0.2, 0, Math.PI*2);
    ctx.fillStyle = lgR;
    ctx.fill();

    // Eye whites/iris
    [[135,165,-0.2],[205,165,0.2]].forEach(([ex,ey,rot]) => {
      ctx.beginPath();
      ctx.ellipse(ex, ey, 16, 11, rot, 0, Math.PI*2);
      ctx.fillStyle = `rgba(201,168,76,${0.7 + eyeGlow * 0.3})`;
      ctx.fill();

      // Pupil (vertical slit)
      ctx.beginPath();
      ctx.ellipse(ex, ey, 4, 9, rot, 0, Math.PI*2);
      ctx.fillStyle = '#000';
      ctx.fill();

      // Highlight
      ctx.beginPath();
      ctx.ellipse(ex - 4, ey - 3, 3, 2, rot, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();
    });

    // ── Nose ──
    ctx.beginPath();
    ctx.moveTo(170, 215);
    ctx.lineTo(160, 205);
    ctx.lineTo(180, 205);
    ctx.closePath();
    ctx.fillStyle = '#1a0a0a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Mouth / Roar ──
    if (roaring) {
      mouthOpen += 0.15 * mouthDir;
      if (mouthOpen > 1) mouthDir = -1;
      if (mouthOpen < 0) { mouthDir = 1; roarFrame--; if(roarFrame <= 0) roaring = false; }
    }

    const mouthH = mouthOpen * 35;

    // Upper lip
    ctx.beginPath();
    ctx.moveTo(148, 222);
    ctx.quadraticCurveTo(170, 230, 192, 222);
    ctx.strokeStyle = 'rgba(201,168,76,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Open mouth
    if (mouthH > 2) {
      ctx.beginPath();
      ctx.ellipse(170, 228 + mouthH/2, 28, mouthH/2, 0, 0, Math.PI*2);
      ctx.fillStyle = '#1a0000';
      ctx.fill();

      // Fangs
      ctx.beginPath();
      ctx.moveTo(155, 228);
      ctx.lineTo(150, 228 + mouthH * 0.7);
      ctx.lineTo(160, 228);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(185, 228);
      ctx.lineTo(190, 228 + mouthH * 0.7);
      ctx.lineTo(180, 228);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
    }

    // ── Whiskers ──
    const whiskers = [
      [148,210, 80,200], [148,215, 80,215], [148,220, 80,228],
      [192,210, 260,200], [192,215, 260,215], [192,220, 260,228],
    ];
    whiskers.forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // ── Gold outline glow ──
    ctx.beginPath();
    ctx.ellipse(170, 185, 112, 122, 0, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(201,168,76,${0.1 + eyeGlow * 0.15})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Animate
  function animate() {
    drawJaguar(Date.now());
    requestAnimationFrame(animate);
  }
  animate();

  // Trigger roar on load
  setTimeout(() => {
    triggerRoar();
  }, 800);

  function triggerRoar() {
    roaring = true;
    roarFrame = 8;
    mouthOpen = 0;
    mouthDir = 1;

    const roarText = document.getElementById('jaguar-roar-text');
    roarText.classList.add('show');
    setTimeout(() => roarText.classList.remove('show'), 1200);

    // Try play roar sound if available
    try {
      const audio = new Audio('roar.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch(e) {}
  }

  // Enter button
  document.getElementById('jaguar-enter').addEventListener('click', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 600);
  });

  // Also dismiss on click anywhere after 3s
  setTimeout(() => {
    overlay.addEventListener('click', (e) => {
      if (e.target.id !== 'jaguar-enter') {
        overlay.classList.add('fade-out');
        setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 600);
      }
    });
  }, 3000);

})();
