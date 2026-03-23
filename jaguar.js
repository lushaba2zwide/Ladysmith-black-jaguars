(function createJaguar() {

  const overlay = document.createElement('div');
  overlay.id = 'jaguar-overlay';
  overlay.innerHTML = `
    <canvas id="jaguar-canvas" width="520" height="640"></canvas>
    <div class="jaguar-roar-text" id="jaguar-roar-text">ROAR!</div>
    <p class="jaguar-tagline"><span>Ladysmith</span> Black Jaguars</p>
    <button class="jaguar-enter" id="jaguar-enter">Enter Site ▶</button>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const canvas = document.getElementById('jaguar-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  let t = 0;
  let eyePulse = 0, eyeDir = 1;
  let mouthOpen = 0, mouthDir = 1;
  let roaring = false, roarCycles = 0;
  let breathe = 0;


  function spot(x, y, rx, ry, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot || 0);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.82)';
    ctx.fill();
    ctx.restore();
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;
    breathe = Math.sin(t * 0.7) * 2.5;
    eyePulse += 0.02 * eyeDir;
    if (eyePulse > 1) eyeDir = -1;
    if (eyePulse < 0.2) eyeDir = 1;

    // ── BLACK BACKGROUND ──
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // ── FACE BASE — fills most of canvas, close-up ──
    // Neck/chest bottom
    const chestGrad = ctx.createLinearGradient(260, 480, 260, 640);
    chestGrad.addColorStop(0, '#2a2a2a');
    chestGrad.addColorStop(1, '#000');
    ctx.beginPath();
    ctx.ellipse(260, 600, 200, 120, 0, 0, Math.PI * 2);
    ctx.fillStyle = chestGrad;
    ctx.fill();

    // Main face — large, close-up, fills frame
    const faceGrad = ctx.createRadialGradient(260, 280, 20, 260, 300, 280);
    faceGrad.addColorStop(0,   '#d8d8d8');
    faceGrad.addColorStop(0.3, '#b8b8b8');
    faceGrad.addColorStop(0.6, '#888');
    faceGrad.addColorStop(0.85,'#444');
    faceGrad.addColorStop(1,   '#000');
    ctx.beginPath();
    ctx.ellipse(260, 300 + breathe * 0.4, 230, 270, 0, 0, Math.PI * 2);
    ctx.fillStyle = faceGrad;
    ctx.fill();

    // ── EARS ──
    // Left
    ctx.beginPath();
    ctx.moveTo(60, 180);
    ctx.bezierCurveTo(30, 80, 100, 20, 170, 80);
    ctx.bezierCurveTo(155, 120, 100, 160, 60, 180);
    ctx.fillStyle = '#555';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(75, 168);
    ctx.bezierCurveTo(52, 90, 105, 38, 158, 88);
    ctx.bezierCurveTo(144, 118, 98, 152, 75, 168);
    ctx.fillStyle = '#222';
    ctx.fill();

    // Right
    ctx.beginPath();
    ctx.moveTo(460, 180);
    ctx.bezierCurveTo(490, 80, 420, 20, 350, 80);
    ctx.bezierCurveTo(365, 120, 420, 160, 460, 180);
    ctx.fillStyle = '#555';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(445, 168);
    ctx.bezierCurveTo(468, 90, 415, 38, 362, 88);
    ctx.bezierCurveTo(376, 118, 422, 152, 445, 168);
    ctx.fillStyle = '#222';
    ctx.fill();


    // ── SPOTS / ROSETTES — dense, realistic ──
    const spots2 = [
      // forehead
      [200,95,12,8,0.2],[260,80,14,9,0],[320,95,12,8,-0.2],
      [175,125,10,7,0.3],[230,115,11,7,0.1],[290,115,11,7,-0.1],[345,125,10,7,-0.3],
      [155,158,9,6,0.4],[210,148,10,6,0.2],[260,142,11,7,0],[310,148,10,6,-0.2],[365,158,9,6,-0.4],
      // cheeks
      [100,200,9,6,0.5],[140,185,8,5,0.3],[365,185,8,5,-0.3],[420,200,9,6,-0.5],
      [90,235,8,5,0.4],[125,220,7,5,0.3],[390,220,7,5,-0.3],[430,235,8,5,-0.4],
      [80,270,7,5,0.3],[110,258,7,4,0.2],[400,258,7,4,-0.2],[440,270,7,5,-0.3],
      // sides of muzzle
      [115,310,8,5,0.2],[145,295,7,4,0.1],[375,295,7,4,-0.1],[405,310,8,5,-0.2],
      [105,345,7,5,0.3],[130,330,6,4,0.1],[390,330,6,4,-0.1],[415,345,7,5,-0.3],
      // above eyes
      [185,175,9,6,0.1],[260,168,10,6,0],[335,175,9,6,-0.1],
    ];
    spots2.forEach(([x,y,rx,ry,rot]) => spot(x, y + breathe*0.15, rx, ry, rot));

    // ── FOREHEAD STRIPE LINES ──
    [[230,90,225,145],[260,85,260,145],[290,90,295,145]].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1 + breathe*0.1);
      ctx.lineTo(x2, y2 + breathe*0.1);
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    });

    // ── HEAVY BROW SCOWL ──
    ctx.beginPath();
    ctx.moveTo(140, 210);
    ctx.bezierCurveTo(170, 192, 205, 198, 220, 210);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(380, 210);
    ctx.bezierCurveTo(350, 192, 315, 198, 300, 210);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 9;
    ctx.stroke();

    // Brow shadow depth
    ctx.beginPath();
    ctx.moveTo(135, 215);
    ctx.bezierCurveTo(168, 196, 208, 202, 225, 215);
    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    ctx.lineWidth = 16;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(385, 215);
    ctx.bezierCurveTo(352, 196, 312, 202, 295, 215);
    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    ctx.lineWidth = 16;
    ctx.stroke();


    // ── EYES — piercing blue, close-up ──
    [[185, 228], [335, 228]].forEach(([ex, ey], i) => {
      const ey2 = ey + breathe * 0.25;
      const rot = i === 0 ? -0.12 : 0.12;

      // Deep socket shadow
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 42, 28, rot, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fill();

      // Outer blue glow halo
      const halo = ctx.createRadialGradient(ex, ey2, 0, ex, ey2, 48);
      halo.addColorStop(0,   `rgba(80,160,255,${0.5 + eyePulse * 0.4})`);
      halo.addColorStop(0.4, `rgba(40,100,220,${0.25 + eyePulse * 0.2})`);
      halo.addColorStop(1,   'transparent');
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 48, 32, rot, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Iris — deep blue
      const irisG = ctx.createRadialGradient(ex - 4, ey2 - 4, 1, ex, ey2, 22);
      irisG.addColorStop(0,   `rgba(140,210,255,${0.95})`);
      irisG.addColorStop(0.3, `rgba(60,140,255,0.95)`);
      irisG.addColorStop(0.7, `rgba(20,70,200,0.95)`);
      irisG.addColorStop(1,   `rgba(5,20,80,1)`);
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 24, 16, rot, 0, Math.PI * 2);
      ctx.fillStyle = irisG;
      ctx.fill();

      // Pupil — vertical slit
      ctx.beginPath();
      ctx.ellipse(ex, ey2, roaring ? 2 : 5, 13, rot, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();

      // Catchlights
      ctx.beginPath();
      ctx.ellipse(ex - 7, ey2 - 5, 5, 3, rot - 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(ex + 7, ey2 - 2, 2.5, 1.5, rot, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fill();

      // Eye rim
      ctx.beginPath();
      ctx.ellipse(ex, ey2, 24, 16, rot, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100,180,255,${0.4 + eyePulse * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // ── NOSE BRIDGE ──
    ctx.beginPath();
    ctx.moveTo(245, 240);
    ctx.bezierCurveTo(250, 265, 270, 265, 275, 240);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // ── NOSE — large, prominent ──
    const noseY = 320 + breathe * 0.4;
    ctx.beginPath();
    ctx.moveTo(260, noseY + 5);
    ctx.bezierCurveTo(235, noseY + 5, 220, noseY - 8, 225, noseY - 20);
    ctx.bezierCurveTo(230, noseY - 30, 260, noseY - 22, 260, noseY - 22);
    ctx.bezierCurveTo(260, noseY - 22, 290, noseY - 30, 295, noseY - 20);
    ctx.bezierCurveTo(300, noseY - 8, 285, noseY + 5, 260, noseY + 5);
    ctx.fillStyle = '#111';
    ctx.fill();
    ctx.strokeStyle = 'rgba(80,80,80,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Nose highlight
    ctx.beginPath();
    ctx.ellipse(248, noseY - 16, 6, 4, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(120,120,120,0.5)';
    ctx.fill();

    // ── MUZZLE PADS ──
    const muzzleY = 350 + breathe * 0.3;
    // Left pad
    const lpG = ctx.createRadialGradient(185, muzzleY, 5, 185, muzzleY, 55);
    lpG.addColorStop(0, 'rgba(200,200,200,0.5)');
    lpG.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.ellipse(185, muzzleY, 55, 42, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = lpG;
    ctx.fill();
    // Right pad
    const rpG = ctx.createRadialGradient(335, muzzleY, 5, 335, muzzleY, 55);
    rpG.addColorStop(0, 'rgba(200,200,200,0.5)');
    rpG.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.ellipse(335, muzzleY, 55, 42, -0.1, 0, Math.PI * 2);
    ctx.fillStyle = rpG;
    ctx.fill();

    // Whisker dots
    [[155,338],[165,350],[155,362],[365,338],[355,350],[365,362]].forEach(([x,y]) => {
      ctx.beginPath();
      ctx.arc(x, y + breathe*0.2, 2.5, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fill();
    });


    // ── MOUTH / ROAR — wide open, dominant ──
    if (roaring) {
      mouthOpen += 0.1 * mouthDir;
      if (mouthOpen >= 1) mouthDir = -1;
      if (mouthOpen <= 0) {
        mouthDir = 1; roarCycles--;
        if (roarCycles <= 0) { roaring = false; mouthOpen = 0; }
      }
    }

    const mY = 368 + breathe * 0.3;
    const mo = mouthOpen;

    // Upper lip
    ctx.beginPath();
    ctx.moveTo(175, mY);
    ctx.bezierCurveTo(200, mY + 12, 230, mY + 8, 260, mY + 10);
    ctx.bezierCurveTo(290, mY + 8, 320, mY + 12, 345, mY);
    ctx.strokeStyle = 'rgba(60,60,60,0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();

    if (mo > 0.04) {
      const oh = mo * 120;

      // Throat — dark void
      const throatG = ctx.createRadialGradient(260, mY + oh * 0.5, 8, 260, mY + oh * 0.5, 80);
      throatG.addColorStop(0,   '#050000');
      throatG.addColorStop(0.5, '#120505');
      throatG.addColorStop(1,   '#1e0808');
      ctx.beginPath();
      ctx.moveTo(175, mY);
      ctx.bezierCurveTo(165, mY + oh * 0.4, 175, mY + oh, 260, mY + oh + 10);
      ctx.bezierCurveTo(345, mY + oh, 355, mY + oh * 0.4, 345, mY);
      ctx.bezierCurveTo(320, mY + 12, 290, mY + 8, 260, mY + 10);
      ctx.bezierCurveTo(230, mY + 8, 200, mY + 12, 175, mY);
      ctx.fillStyle = throatG;
      ctx.fill();

      // Upper fangs — long, sharp
      [[205, mY + 5, 196, mY + oh * 0.65, 218],
       [315, mY + 5, 324, mY + oh * 0.65, 302]].forEach(([x1,y1,xt,yt,x3]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(xt, yt);
        ctx.lineTo(x3, y1);
        ctx.closePath();
        const fg = ctx.createLinearGradient(x1, y1, xt, yt);
        fg.addColorStop(0, '#f5f5f0');
        fg.addColorStop(0.6, '#d8d0b8');
        fg.addColorStop(1, '#a09070');
        ctx.fillStyle = fg;
        ctx.fill();
        ctx.strokeStyle = 'rgba(160,140,100,0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Upper teeth row
      for (let i = 0; i < 8; i++) {
        const tx = 222 + i * 12;
        const th = oh * (0.18 + Math.sin(i * 0.8) * 0.04);
        ctx.beginPath();
        ctx.moveTo(tx, mY + 6);
        ctx.lineTo(tx + 5, mY + 6 + th);
        ctx.lineTo(tx + 10, mY + 6);
        ctx.closePath();
        ctx.fillStyle = 'rgba(235,230,215,0.85)';
        ctx.fill();
      }

      // Lower jaw
      const ljY = mY + oh;
      ctx.beginPath();
      ctx.ellipse(260, ljY + 15, 90, 25, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a1a';
      ctx.fill();

      // Lower fangs
      [[228, ljY, 222, ljY - oh * 0.45, 240],
       [292, ljY, 298, ljY - oh * 0.45, 280]].forEach(([x1,y1,xt,yt,x3]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(xt, yt);
        ctx.lineTo(x3, y1);
        ctx.closePath();
        ctx.fillStyle = '#e8e5d8';
        ctx.fill();
      });

      // Lower teeth
      for (let i = 0; i < 6; i++) {
        const tx = 232 + i * 12;
        ctx.beginPath();
        ctx.moveTo(tx, ljY);
        ctx.lineTo(tx + 5, ljY - oh * 0.15);
        ctx.lineTo(tx + 10, ljY);
        ctx.closePath();
        ctx.fillStyle = 'rgba(220,215,200,0.8)';
        ctx.fill();
      }

      // Tongue
      if (mo > 0.35) {
        const tY = mY + oh * 0.55;
        ctx.beginPath();
        ctx.ellipse(260, tY, 35, 18, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#7a1515';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(260, tY - 10);
        ctx.lineTo(260, tY + 14);
        ctx.strokeStyle = 'rgba(50,5,5,0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // ── WHISKERS — long, fine, radiating ──
    const wSets = [
      [200,340, 30,318, 0.15], [200,348, 28,345, 0],   [200,356, 32,372, -0.15],
      [200,340, 50,325, 0.1],  [200,348, 48,348, 0],
      [320,340, 490,318,-0.15],[320,348, 492,345, 0],  [320,356, 488,372, 0.15],
      [320,340, 470,325,-0.1], [320,348, 472,348, 0],
    ];
    wSets.forEach(([x1,y1,x2,y2,c]) => {
      ctx.beginPath();
      const mx = (x1+x2)/2, my = (y1+y2)/2 + c*30;
      ctx.moveTo(x1, y1 + breathe*0.2);
      ctx.quadraticCurveTo(mx, my + breathe*0.1, x2, y2);
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // ── EDGE VIGNETTE — fade to black at edges ──
    const vig = ctx.createRadialGradient(260, 300, 150, 260, 300, 320);
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, 'rgba(0,0,0,0.75)');
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.fillStyle = vig;
    ctx.fill();

    // ── EYE GLOW RAYS when roaring ──
    if (roaring && mouthOpen > 0.25) {
      [[185, 228], [335, 228]].forEach(([ex, ey]) => {
        for (let r = 0; r < 10; r++) {
          const ang = (r / 10) * Math.PI * 2 + t * 0.5;
          const len = 25 + mouthOpen * 30;
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(ex + Math.cos(ang) * len, ey + Math.sin(ang) * len);
          ctx.strokeStyle = `rgba(80,160,255,${0.08 + mouthOpen * 0.12})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(drawFrame);
  }

  drawFrame();


  function triggerRoar() {
    roaring = true;
    roarCycles = 3;
    mouthOpen = 0;
    mouthDir = 1;

    const rt = document.getElementById('jaguar-roar-text');
    rt.classList.remove('show');
    void rt.offsetWidth;
    rt.classList.add('show');
    setTimeout(() => rt.classList.remove('show'), 1500);

    // Screen shake
    overlay.classList.remove('shaking');
    void overlay.offsetWidth;
    overlay.classList.add('shaking');
    setTimeout(() => overlay.classList.remove('shaking'), 500);

    try { const a = new Audio('roar.mp3'); a.volume = 0.6; a.play().catch(()=>{}); } catch(e) {}
  }

  setTimeout(triggerRoar, 800);
  setTimeout(triggerRoar, 3500);

  document.getElementById('jaguar-enter').addEventListener('click', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 700);
  });

  setTimeout(() => {
    overlay.addEventListener('click', (e) => {
      if (!e.target.closest('#jaguar-enter')) {
        overlay.classList.add('fade-out');
        setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 700);
      }
    });
  }, 4500);

})();
