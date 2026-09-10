const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.desktop-nav a')];

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

const sections = [...document.querySelectorAll('main section[id]')];
const updateActiveNav = () => {
  const marker = window.scrollY + 120;
  let activeId = 'work';

  for (const section of sections) {
    if (marker >= section.offsetTop) activeId = section.id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

const initProfileFlip = () => {
  const card = document.querySelector('.hero-card');
  if (!card || card.dataset.flipReady === 'true') return;

  card.dataset.flipReady = 'true';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');
  card.setAttribute('aria-label', 'Ayo Richard Abe profile card. Click or press Enter to flip.');

  const hint = document.createElement('span');
  hint.className = 'flip-hint';
  hint.textContent = 'click to flip ↻';
  hint.setAttribute('aria-hidden', 'true');
  card.appendChild(hint);

  const back = document.createElement('div');
  back.className = 'hero-card-backface';
  back.setAttribute('aria-hidden', 'true');
  back.innerHTML = `
    <div class="flip-back-top">
      <span class="micro-label">02 / PROFILE</span>
      <span class="micro-label">gODtECH · NG</span>
    </div>
    <div class="flip-back-center">
      <div>
        <img src="https://avatars.githubusercontent.com/u/203571096?v=4" alt="" class="flip-back-photo" />
        <h3>Ayo Richard Abe</h3>
        <p>Product Developer · Product Manager · Systems Builder</p>
        <div class="flip-back-tags">
          <span>PRODUCT</span><span>ENGINEERING</span><span>SYSTEMS</span><span>AI</span>
        </div>
      </div>
    </div>
    <div class="flip-back-footer">
      <span>BUILD · SHIP · IMPROVE</span>
      <span>↻ FLIP BACK</span>
    </div>
  `;
  card.appendChild(back);

  let flipped = false;
  let timerId = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setFlipped = (next) => {
    flipped = next;
    card.classList.toggle('is-flipped', flipped);
    card.setAttribute('aria-pressed', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
  };

  const toggleFlip = () => setFlipped(!flipped);

  const stopAutoFlip = () => {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  };

  const startAutoFlip = () => {
    stopAutoFlip();
    if (reducedMotion || document.hidden) return;
    timerId = window.setInterval(toggleFlip, 3600);
  };

  const activateFlip = () => {
    card.classList.remove('reveal', 'delay-1');
    card.classList.add('flip-ready');
    startAutoFlip();
  };

  window.setTimeout(activateFlip, 950);

  card.addEventListener('click', () => {
    toggleFlip();
    startAutoFlip();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleFlip();
    startAutoFlip();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoFlip();
    else startAutoFlip();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProfileFlip, { once: true });
} else {
  initProfileFlip();
}
