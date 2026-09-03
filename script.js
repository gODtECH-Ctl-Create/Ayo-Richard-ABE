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

  const front = document.createElement('div');
  front.className = 'hero-card-face hero-card-front';

  while (card.firstChild) {
    front.appendChild(card.firstChild);
  }

  const back = document.createElement('div');
  back.className = 'hero-card-face hero-card-back';
  back.innerHTML = `
    <div class="flip-back-top">
      <span class="micro-label">02 / PROFILE</span>
      <span class="micro-label">ABOUT ME</span>
    </div>
    <div class="flip-back-photo-wrap">
      <img src="assets/profile.jpg" alt="Ayo Richard Abe" class="flip-back-photo" />
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

  const style = document.createElement('style');
  style.textContent = `
    .hero-card[data-flip-ready="true"] {
      padding: 0 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      perspective: 1200px;
      cursor: pointer;
    }
    .hero-card-inner {
      position: relative;
      width: 100%;
      min-height: 520px;
      transform-style: preserve-3d;
      transition: transform .85s cubic-bezier(.2,.7,.2,1);
    }
    .hero-card.is-flipped .hero-card-inner {
      transform: rotateY(180deg);
    }
    .hero-card-face {
      position: absolute;
      inset: 0;
      width: 100%;
      min-height: 520px;
      overflow: hidden;
      border: 1px solid var(--ink);
      border-radius: 30px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .hero-card-front {
      padding: 22px;
      background: var(--ink);
      color: #fff;
      box-shadow: var(--shadow);
    }
    .hero-card-front::before {
      content: "";
      position: absolute;
      inset: -30% -20% auto auto;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(183,255,60,.32), transparent 66%);
      pointer-events: none;
    }
    .hero-card-back {
      display: flex;
      flex-direction: column;
      padding: 24px;
      background: var(--accent);
      color: var(--ink);
      transform: rotateY(180deg);
    }
    .flip-back-top,
    .flip-back-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .hero-card-back .micro-label {
      color: rgba(17,17,15,.48);
    }
    .flip-back-photo-wrap {
      position: relative;
      display: grid;
      place-items: center;
      width: 190px;
      height: 190px;
      margin: 38px auto 26px;
      border: 1px solid rgba(17,17,15,.2);
      border-radius: 50%;
      overflow: hidden;
      background: rgba(255,255,255,.35);
      box-shadow: 0 18px 48px rgba(17,17,15,.14);
    }
    .flip-back-photo,
    .flip-back-fallback {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .flip-back-photo {
      object-fit: cover;
    }
    .flip-back-fallback {
      display: grid;
      place-items: center;
      background: var(--ink);
      color: var(--accent);
      font-family: "Space Grotesk", Arial, sans-serif;
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -.06em;
    }
    .flip-back-content {
      text-align: center;
    }
    .flip-back-content h3 {
      margin: 6px 0 10px;
      font-family: "Space Grotesk", Arial, sans-serif;
      font-size: clamp(30px, 4vw, 42px);
      line-height: .96;
      letter-spacing: -.06em;
    }
    .flip-back-content > p:last-of-type {
      max-width: 310px;
      margin: 0 auto;
      color: rgba(17,17,15,.66);
      font-size: 13px;
      line-height: 1.6;
    }
    .flip-back-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 7px;
      margin-top: 18px;
    }
    .flip-back-tags span {
      padding: 6px 8px;
      border: 1px solid rgba(17,17,15,.14);
      font-size: 8px;
      font-weight: 800;
      letter-spacing: .08em;
    }
    .flip-back-footer {
      margin-top: auto;
      padding-top: 18px;
      border-top: 1px solid rgba(17,17,15,.16);
      font-size: 9px;
      font-weight: 800;
      letter-spacing: .12em;
    }
    @media (max-width: 720px) {
      .hero-card-inner,
      .hero-card-face { min-height: 460px; }
      .flip-back-photo-wrap { width: 150px; height: 150px; margin-top: 28px; }
      .flip-back-content h3 { font-size: 31px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .hero-card-inner { transition: none; }
    }
  `;
  document.head.appendChild(style);

  const photo = back.querySelector('.flip-back-photo');
  const fallback = back.querySelector('.flip-back-fallback');
  photo.addEventListener('error', () => {
    photo.style.display = 'none';
    fallback.style.display = 'grid';
  });

  let flipped = false;
  const toggleFlip = () => {
    flipped = !flipped;
    card.classList.toggle('is-flipped', flipped);
  };

  card.addEventListener('click', toggleFlip);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFlip();
    }
  });
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'Profile card that flips between GitHub profile and personal profile');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.setInterval(toggleFlip, 3000);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProfileFlip);
} else {
  initProfileFlip();
}
