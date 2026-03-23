(function createJaguar() {

  const overlay = document.createElement('div');
  overlay.id = 'jaguar-overlay';
  overlay.innerHTML = `
    <div class="jaguar-particles" id="jaguar-particles"></div>
    <div class="jaguar-wrap">
      <div class="jaguar-roar-text" id="jaguar-roar-text">ROAR!</div>
      <canvas id="jaguar-canvas" width="480" height="480"></canvas>
      <p class="jaguar-tagline"><span>Ladysmith</span> Black Jaguars</p>
      <button class="jaguar-enter" id="jaguar-enter">Enter Site ▶</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Particles
  const pContainer = document.getElementById('jaguar-particles');
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'jag-particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${1+Math.random()*3}px;
      height:${1+Math.random()*3}px;
      animation-delay:${Math.random()*6}s;
      animation-duration:${4+Math.random()*6}s;
      opacity:${0.1+Math.random()*0.5};
    `;
    pContainer.appendChild(p);
  }

  const canvas = document.getElementById('jaguar-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  let t = 0;
  let eyeGlow = 0.5;
  let eyeDir = 1;
  let mouthOpen = 0;
  let mouthDir = 1;
  let roaring = false;
  let roarCycles = 0;
  let breathe = 0;

  function lerp(a, b, n) { return a + (b - a) * n; }

  function drawFur(x, y, w, h, color, angle = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, w);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawJaguar() {
    ctx.clearRect(0, 0, W, H);
    t += 0.018;
    breathe = Math.sin(t * 0.8) * 3;

    // ── Background glow behind head ──
    const bgGlow = ctx.createRadialGradient(240, 240, 20, 240, 240, 200);
    bgGlow.addColorStop(0, `rgba(201,168,76,${0.06 + eyeGlow * 0.08})`);
    bgGlow.addColorStop(0.5, `rgba(10,5,30,0.4)`);
    bgGlow.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.ellipse(240, 240, 200, 200, 0, 0, Math.PI * 2);
    ctx.fillStyle = bgGlow;
    ctx.fill();

    // ── Neck / chest ──
    const neckGrad = ctx.createLinearGradient(240, 340, 240, 480);
    neckGrad.addColorStop(0, '#111');
    neckGrad.addColorStop(1, '#050505');
    ctx.beginPath();
    ctx.moveTo(160, 380);
    ctx.bezierCurveTo(160, 460, 320, 460, 320, 380);
    ctx.bezierCurveTo(310, 350, 170, 350, 160, 380);
    ctx.fillStyle = neckGrad;
    ctx.fill();

    // Chest fur texture
    for (let i = 0; i < 12; i++) {
      const fx = 190 + i * 5 + Math.sin(i) * 8;
      const fy = 390 + i * 4;
      ctx.beginPath();
      ctx.ellipse(fx, fy, 3, 8, Math.sin(i) * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,30,30,0.6)';
      ctx.fill();
    }

    // ── Main head ──
    const headGrad = ctx.createRadialGradient(240, 220, 10, 240, 230, 150);
    headGrad.addColorStop(0, '#1a1a1a');
    headGrad.addColorStop(0.5, '#0f0f0f');
    headGrad.addColorStop(1, '#050505');

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.ellipse(240, 230 + breathe * 0.3, 145, 155, 0, 0, Math.PI * 2);
    ctx.fillStyle = headGrad;
    ctx.fill();
    ctx.restore();

    // ── Forehead ──
    ctx.beginPath();
    ctx.ellipse(240, 130 + breathe * 0.2, 100, 80, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0d0d0d';
    ctx.fill();

    // ── Fur detail — layered strokes ──
    const furLines = [
      // forehead stripes
      {x1:220,y1:100,x2:215,y2:140,w:2.5},
      {x1:240,y1:95,x2:240,y2:138,w:2.5},
      {x1:260,y1:100,x2:265,y2:140,w:2.5},
      // cheek fur
      {x1:115,y1:200,x2:140,y2:220,w:2},
      {x1:110,y1:215,x2:138,y2:230,w:2},
      {x1:112,y1:230,x2:140,y2:240,w:2},
      {x1:365,y1:200,x2:340,y2:220,w:2},
      {x1:370,y1:215,x2:342,y2:230,w:2},
      {x1:368,y1:230,x2:340,y2:240,w:2},
    ];
    furLines.forEach(l => {
      ctx.beginPath();
      ctx.moveTo(l.x1, l.y1 + breathe * 0.2);
      ctx.lineTo(l.x2, l.y2 + breathe * 0.2);
      ctx.strokeStyle = 'rgba(40,40,40,0.9)';
      ctx.lineWidth = l.w;
      ctx.lineCap = 'round';
      ctx.stroke();
    });

    // ── Rosette spots (jaguar pattern) ──
    const rosettes = [
      {x:175,y:155,rx:14,ry:10,rot:0.3},
      {x:305,y:155,rx:14,ry:10,rot:-0.3},
      {x:155,y:200,rx:11,ry:8,rot:0.5},
      {x:325,y:200,rx:11,ry:8,rot:-0.5},
      {x:170,y:250,rx:10,ry:7,rot:0.2},
      {x:310,y:250,rx:10,ry:7,rot:-0.2},
      {x:200,y:290,rx:9,ry:6,rot:0.1},
      {x:280,y:290,rx:9,ry:6,rot:-0.1},
      {x:195,y:130,rx:8,ry:6,rot:0.4},
      {x:285,y:130,rx:8,ry:6,rot:-0.4},
    ];
    rosettes.forEach(r => {
      // outer ring
      ctx.beginPath();
      ctx.ellipse(r.x, r.y + breathe * 0.15, r.rx, r.ry, r.rot, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(5,5,5,0.95)';
      ctx.lineWidth = 3;
      ctx.stroke();
      // inner dot
      ctx.beginPath();
      ctx.ellipse(r.x, r.y + breathe * 0.15, r.rx * 0.4, r.ry * 0.4, r.rot, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8,8,8,0.9)';
      ctx.fill();
    });

    // ── Ears ──
    // Left ear outer
    ctx.beginPath();
    ctx.moveTo(105, 145);
    ctx.bezierCurveTo(90, 80, 130, 50, 165, 95);
    ctx.bezierCurveTo(150, 110, 120, 130, 105, 145);
    ctx.fillStyle = '#0a0a0a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Left ear inner
    ctx.beginPath();
    ctx.moveTo(112, 138);
    ctx.bezierCurveTo(100, 90, 128, 65, 155, 100);
    ctx.bezierCurveTo(143, 112, 122, 128, 112, 138);
    ctx.fillStyle = 'rgba(80,20,20,0.25)';
    ctx.fill();

    // Right ear outer
    ctx.beginPath();
    ctx.moveTo(375, 145);
    ctx.bezierCurveTo(390, 80, 350, 50, 315, 95);
    ctx.bezierCurveTo(330, 110, 360, 130, 375, 145);
    ctx.fillStyle = '#0a0a0a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Right ear inner
    ctx.beginPath();
    ctx.moveTo(368, 138);
    ctx.bezierCurveTo(380, 90, 352, 65, 325, 100);
    ctx.bezierCurveTo(337, 112, 358, 128, 368, 138);
    ctx.fillStyle = 'rgba(80,20,20,0.25)';
    ctx.fill();

    // ── Brow ridge — dominant scowl ──
    ctx.beginPath();
    ctx.moveTo(155, 175);
    ctx.bezierCurveTo(175, 162, 200, 168, 210, 175);
    ctx.strokeStyle = 'rgba(5,5,5,0.95)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(325, 175);
    ctx.bezierCurveTo(305, 162, 280, 168, 270, 175);
    ctx.strokeStyle = 'rgba(5,5,5,0.95)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Brow shadow
    ctx.beginPath();
    ctx.moveTo(150, 178);
    ctx.bezierCurveTo(175, 165, 205, 170, 215, 178);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(330, 178);
    ctx.bezierCurveTo(305, 165, 275, 170, 265, 178);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 10;
    ctx.stroke();

    // ── Eyes ──
    eyeGlow += 0.025 * eyeDir;
    if (eyeGlow > 1) eyeDir = -1;
    if (eyeGlow < 0.3) eyeDir = 1;

    const glowPulse = 0.5 + eyeGlow * 0.5;

    [[185, 195], [295, 195]].forEach(([ex, ey], i) => {
      const rot = i === 0 ? -0.15 : 0.15;
      const ey2 = ey + breathe * 0.2;

      // Outer glow halo
      const halo = ctx.createRadialGradient(ex, ey2, 0, ex, ey2, 38);
      halo.addColorStop(0, `rgba(201,168,76,${glowPulse * 0.5})`);
      halo.addColorStop(0.5, `rgba(180,120,20,${glowPulse * 0.2})`);
      halo.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 38, 28, rot, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Eye socket shadow
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 26, 18, rot, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fill();

      // Iris — amber/gold
      const irisGrad = ctx.createRadialGradient(ex - 3, ey2 - 3, 1, ex, ey2, 18);
      irisGrad.addColorStop(0, `rgba(255,210,80,${0.9 + glowPulse * 0.1})`);
      irisGrad.addColorStop(0.4, `rgba(201,140,20,${0.85})`);
      irisGrad.addColorStop(0.8, `rgba(140,80,10,0.9)`);
      irisGrad.addColorStop(1, `rgba(60,30,5,1)`);
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 20, 14, rot, 0, Math.PI * 2);
      ctx.fillStyle = irisGrad;
      ctx.fill();

      // Pupil — vertical slit, narrows when roaring
      const pupilW = roaring ? 2 : 5;
      ctx.beginPath();
      ctx.ellipse(ex, ey2, pupilW, 12, rot, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();

      // Catchlight
      ctx.beginPath();
      ctx.ellipse(ex - 6, ey2 - 5, 4, 3, rot - 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(ex + 5, ey2 - 3, 2, 1.5, rot, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();

      // Eye rim
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 20, 14, rot, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,168,76,${0.3 + glowPulse * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // ── Nose bridge ──
    ctx.beginPath();
    ctx.moveTo(230, 195);
    ctx.bezierCurveTo(235, 215, 245, 215, 250, 195);
    ctx.strokeStyle = 'rgba(30,30,30,0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // ── Nose ──
    const noseY = 268 + breathe * 0.3;
    ctx.beginPath();
    ctx.moveTo(240, noseY);
    ctx.bezierCurveTo(222, noseY - 8, 215, noseY - 18, 220, noseY - 22);
    ctx.bezierCurveTo(226, noseY - 26, 240, noseY - 20, 240, noseY - 20);
    ctx.bezierCurveTo(240, noseY - 20, 254, noseY - 26, 260, noseY - 22);
    ctx.bezierCurveTo(265, noseY - 18, 258, noseY - 8, 240, noseY);
    ctx.fillStyle = '#1a0808';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Nose highlight
    ctx.beginPath();
    ctx.ellipse(233, noseY - 18, 4, 2.5, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(80,40,40,0.6)';
    ctx.fill();

    // ── Muzzle area ──
    ctx.beginPath();
    ctx.ellipse(240, 295 + breathe * 0.3, 55, 40, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(20,15,15,0.5)';
    ctx.fill();

    // Muzzle dots (whisker pads)
    [[205,285],[215,295],[205,305],[275,285],[265,295],[275,305]].forEach(([x,y]) => {
      ctx.beginPath();
      ctx.arc(x, y + breathe * 0.3, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(60,40,40,0.8)';
      ctx.fill();
    });

    // ── Mouth / Roar ──
    if (roaring) {
      mouthOpen += 0.12 * mouthDir;
      if (mouthOpen >= 1) { mouthDir = -1; }
      if (mouthOpen <= 0) {
        mouthDir = 1;
        roarCycles--;
        if (roarCycles <= 0) { roaring = false; mouthOpen = 0; }
      }
    }

    const mouthY = 278 + breathe * 0.3;
    const mo = mouthOpen;

    // Upper lip line
    ctx.beginPath();
    ctx.moveTo(200, mouthY);
    ctx.bezierCurveTo(215, mouthY + 8, 225, mouthY + 5, 240, mouthY + 6);
    ctx.bezierCurveTo(255, mouthY + 5, 265, mouthY + 8, 280, mouthY);
    ctx.strokeStyle = 'rgba(80,40,40,0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (mo > 0.05) {
      const openH = mo * 70;

      // Throat darkness
      const throatGrad = ctx.createRadialGradient(240, mouthY + openH * 0.5, 5, 240, mouthY + openH * 0.5, 50);
      throatGrad.addColorStop(0, '#0a0000');
      throatGrad.addColorStop(0.5, '#1a0505');
      throatGrad.addColorStop(1, '#2a0808');

      ctx.beginPath();
      ctx.moveTo(200, mouthY);
      ctx.bezierCurveTo(195, mouthY + openH * 0.3, 200, mouthY + openH, 240, mouthY + openH);
      ctx.bezierCurveTo(280, mouthY + openH, 285, mouthY + openH * 0.3, 280, mouthY);
      ctx.bezierCurveTo(265, mouthY + 8, 255, mouthY + 5, 240, mouthY + 6);
      ctx.bezierCurveTo(225, mouthY + 5, 215, mouthY + 8, 200, mouthY);
      ctx.fillStyle = throatGrad;
      ctx.fill();

      // Upper fangs
      [[215, mouthY + 2, 210, mouthY + openH * 0.55, 220],
       [265, mouthY + 2, 270, mouthY + openH * 0.55, 260]].forEach(([x1,y1,x2,y2,x3]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y1);
        ctx.closePath();
        const fangGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        fangGrad.addColorStop(0, '#f0f0f0');
        fangGrad.addColorStop(1, '#c0b090');
        ctx.fillStyle = fangGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(180,160,100,0.4)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Lower fangs
      const lowerY = mouthY + openH;
      [[222, lowerY, 218, lowerY - openH * 0.4, 228],
       [258, lowerY, 262, lowerY - openH * 0.4, 252]].forEach(([x1,y1,x2,y2,x3]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y1);
        ctx.closePath();
        ctx.fillStyle = '#e8e8e8';
        ctx.fill();
      });

      // Tongue
      if (mo > 0.4) {
        const tongueY = mouthY + openH * 0.6;
        ctx.beginPath();
        ctx.ellipse(240, tongueY, 22, 12, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#8b1a1a';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(240, tongueY - 5);
        ctx.lineTo(240, tongueY + 10);
        ctx.strokeStyle = 'rgba(60,10,10,0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Teeth row
      for (let i = 0; i < 6; i++) {
        const tx = 210 + i * 14;
        ctx.beginPath();
        ctx.rect(tx, mouthY + 2, 10, openH * 0.25);
        ctx.fillStyle = 'rgba(220,215,200,0.7)';
        ctx.fill();
      }
    }

    // ── Whiskers ──
    const whiskerSets = [
      // Left whiskers
      [[200,282, 100,265, 0.3]], [[200,288, 95,285, 0]], [[200,294, 98,302, -0.2]],
      [[200,282, 105,272, 0.2]], [[200,288, 100,290, 0]],
      // Right whiskers
      [[280,282, 380,265, -0.3]], [[280,288, 385,285, 0]], [[280,294, 382,302, 0.2]],
      [[280,282, 375,272, -0.2]], [[280,288, 380,290, 0]],
    ];

    whiskerSets.forEach(([[x1,y1,x2,y2,curve]]) => {
      ctx.beginPath();
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 + curve * 20;
      ctx.moveTo(x1, y1 + breathe * 0.2);
      ctx.quadraticCurveTo(mx, my + breathe * 0.2, x2, y2 + breathe * 0.1);
      ctx.strokeStyle = 'rgba(220,210,180,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // ── Gold outline ──
    ctx.beginPath();
    ctx.ellipse(240, 230 + breathe * 0.3, 147, 157, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(201,168,76,${0.08 + eyeGlow * 0.12})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // ── Eye light rays when roaring ──
    if (roaring && mouthOpen > 0.3) {
      [[185, 195], [295, 195]].forEach(([ex, ey]) => {
        for (let r = 0; r < 8; r++) {
          const angle = (r / 8) * Math.PI * 2 + t;
          const len = 30 + Math.random() * 20;
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(ex + Math.cos(angle) * len, ey + Math.sin(angle) * len);
          ctx.strokeStyle = `rgba(255,200,50,${0.1 + mouthOpen * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(drawJaguar);
  }

  drawJaguar();

  // Trigger roar
  function triggerRoar() {
    roaring = true;
    roarCycles = 3;
    mouthOpen = 0;
    mouthDir = 1;

    const roarText = document.getElementById('jaguar-roar-text');
    roarText.classList.add('show');
    setTimeout(() => roarText.classList.remove('show'), 1400);

    // Screen shake
    const wrap = document.querySelector('.jaguar-wrap');
    wrap.classList.remove('shaking');
    void wrap.offsetWidth; // reflow
    wrap.classList.add('shaking');
    setTimeout(() => wrap.classList.remove('shaking'), 400);

    try {
      const audio = new Audio('roar.mp3');
      audio.volume = 0.6;
      audio.play().catch(() => {});
    } catch(e) {}
  }

  setTimeout(triggerRoar, 900);
  // Second roar
  setTimeout(triggerRoar, 3200);

  document.getElementById('jaguar-enter').addEventListener('click', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 700);
  });

  setTimeout(() => {
    overlay.addEventListener('click', (e) => {
      if (!e.target.closest('.jaguar-enter')) {
        overlay.classList.add('fade-out');
        setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 700);
      }
    });
  }, 4000);

})();
