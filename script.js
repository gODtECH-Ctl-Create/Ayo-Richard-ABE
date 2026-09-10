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
  card.setAttribute('aria-label', 'Profile card that flips between the portfolio profile and Ayo Richard Abe personal profile');

  // Restore the original September implementation: the current hero content is
  // the front face, while the personal portrait/name card is the back face.
  const front = document.createElement('div');
  front.className = 'hero-card-face hero-card-front';

  while (card.firstChild) {
    front.appendChild(card.firstChild);
  }

  const back = document.createElement('div');
  back.className = 'hero-card-face hero-card-back';
  back.setAttribute('aria-hidden', 'true');
  back.innerHTML = `
    <div class="flip-back-top">
      <span class="micro-label">02 / PROFILE</span>
      <span class="micro-label">ABOUT ME</span>
    </div>
    <div class="flip-back-photo-wrap">
      <img src="./assets/gODtECH.png?v=20260903" alt="Ayo Richard Abe" class="flip-back-photo" />
      <div class="flip-back-fallback" aria-hidden="true">AR</div>
    </div>
    <div class="flip-back-content">
      <p class="micro-label">Ayo Richard Abe</p>
      <h3>Ayo Richard Abe</h3>
      <p>Product Developer · Product Manager · Systems Builder</p>
      <div class="flip-back-tags">
        <span>PRODUCT</span><span>TECH</span><span>SYSTEMS</span>
      </div>
    </div>
    <div class="flip-back-footer">
      <span>gODtECH</span>
      <span>BUILD · SHIP · IMPROVE</span>
    </div>
  `;

  const inner = document.createElement('div');
  inner.className = 'hero-card-inner';
  inner.append(front, back);
  card.appendChild(inner);

  const photo = back.querySelector('.flip-back-photo');
  const fallback = back.querySelector('.flip-back-fallback');
  if (photo && fallback) {
    fallback.style.display = 'none';
    photo.addEventListener('error', () => {
      if (photo.dataset.fallbackTried === 'true') {
        photo.style.display = 'none';
        fallback.style.display = 'grid';
        return;
      }
      photo.dataset.fallbackTried = 'true';
      photo.src = 'https://raw.githubusercontent.com/gODtECH-Ctl-Create/Ayo-Richard-ABE/main/assets/gODtECH.png';
    });
  }

  let flipped = false;
  let timerId = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setFlipped = (next) => {
    flipped = next;
    card.classList.toggle('is-flipped', flipped);
    card.setAttribute('aria-pressed', String(flipped));
    front.setAttribute('aria-hidden', String(flipped));
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
    timerId = window.setInterval(toggleFlip, 3000);
  };

  const activateFlip = () => {
    card.classList.remove('reveal', 'delay-1');
    card.classList.add('flip-ready');
    startAutoFlip();
  };

  // Keep the existing entrance reveal, then start the original flip behavior.
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
