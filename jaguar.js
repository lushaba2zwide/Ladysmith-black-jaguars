(function createJaguar() {

  const overlay = document.createElement('div');
  overlay.id = 'jaguar-overlay';
  overlay.innerHTML = `
    <div class="jaguar-bg"></div>
    <div class="jaguar-content">
      <img src="jaguar-face.jpg" alt="Ladysmith Black Jaguars" class="jaguar-img" />
      <div class="jaguar-text-wrap">
        <p class="jaguar-club">LADYSMITH BLACK JAGUARS</p>
        <p class="jaguar-motto">Pride &nbsp;·&nbsp; Power &nbsp;·&nbsp; Purpose</p>
        <button class="jaguar-enter" id="jaguar-enter">Enter Site ▶</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  document.getElementById('jaguar-enter').addEventListener('click', dismiss);

  // Auto-dismiss after 8 seconds
  setTimeout(dismiss, 8000);

  function dismiss() {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 700);
  }

})();
