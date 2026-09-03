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

  const style = document.createElement('style');
  style.textContent = `
    .hero-card[data-flip-ready="true"] {
      position: relative;
      min-height: 520px !important;
      height: 520px !important;
      padding: 0 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      perspective: 1200px;
      isolation: isolate;
      cursor: pointer;
      overflow: visible !important;
    }

    .hero-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 0 !important;
      transform: none !important;
      transform-style: preserve-3d;
    }

    .hero-card-face {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
      margin: 0 !important;
      overflow: hidden;
      border: 1px solid var(--ink);
      border-radius: 30px;
      backface-visibility: hidden !important;
      -webkit-backface-visibility: hidden !important;
      transform-origin: center center;
      transform-style: flat;
      will-change: transform, opacity;
      transition: transform .78s cubic-bezier(.2,.7,.2,1), opacity .28s ease;
    }

    .hero-card-front {
      z-index: 2;
      opacity: 1;
      transform: rotateY(0deg) translateZ(1px) !important;
      padding: 22px;
      background: var(--ink);
      color: #fff;
      box-shadow: var(--shadow);
      pointer-events: auto;
    }

    .hero-card-back {
      z-index: 1;
      opacity: 0;
      transform: rotateY(-180deg) translateZ(1px) !important;
      display: flex;
      flex-direction: column;
      padding: 24px;
      background: var(--accent);
      color: var(--ink);
      pointer-events: none;
    }

    .hero-card.is-flipped .hero-card-front {
      z-index: 1;
      opacity: 0;
      transform: rotateY(180deg) translateZ(1px) !important;
      pointer-events: none;
    }

    .hero-card.is-flipped .hero-card-back {
      z-index: 2;
      opacity: 1;
      transform: rotateY(0deg) translateZ(1px) !important;
      pointer-events: auto;
    }

    .hero-card-top,
    .hero-card-bottom {
      position: relative;
      z-index: 2;
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
      flex: 0 0 auto;
    }

    .flip-back-photo,
    .flip-back-fallback {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .flip-back-photo {
      display: block;
      object-fit: cover;
    }

    .flip-back-fallback {
      display: none;
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

    .card-arrow {
      position: relative;
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 50%;
      font-size: 0 !important;
    }

    .card-arrow::before {
      content: "";
      width: 11px;
      height: 11px;
      border-top: 2px solid currentColor;
      border-right: 2px solid currentColor;
      transform: translate(-2px, 2px);
    }

    .card-arrow::after {
      content: "";
      position: absolute;
      width: 15px;
      height: 2px;
      background: currentColor;
      transform: rotate(-45deg);
    }

    .button span,
    .project-link span,
    .nav-github span {
      font-family: Arial, sans-serif !important;
      font-variant-emoji: text;
    }

    @media (max-width: 720px) {
      .hero-card[data-flip-ready="true"] {
        min-height: 460px !important;
        height: 460px !important;
      }

      .hero-card-face {
        border-radius: 24px;
      }

      .hero-card-back {
        padding: 20px;
      }

      .flip-back-photo-wrap {
        width: 150px;
        height: 150px;
        margin: 28px auto 22px;
      }

      .flip-back-content h3 {
        font-size: 31px;
      }

      .flip-back-content > p:last-of-type {
        max-width: 280px;
        font-size: 12px;
      }

      .flip-back-tags {
        margin-top: 14px;
      }
    }
  `;
  document.head.appendChild(style);

  const photo = back.querySelector('.flip-back-photo');
  const fallback = back.querySelector('.flip-back-fallback');
  photo.addEventListener('error', () => {
    if (photo.dataset.fallbackTried === 'true') {
      photo.style.display = 'none';
      fallback.style.display = 'grid';
      return;
    }
    photo.dataset.fallbackTried = 'true';
    photo.src = 'https://raw.githubusercontent.com/gODtECH-Ctl-Create/Ayo-Richard-ABE/main/assets/gODtECH.png';
  });

  const cardArrow = front.querySelector('.card-arrow');
  if (cardArrow) cardArrow.textContent = '';

  let flipped = false;
  const setFlipped = (value) => {
    flipped = value;
    card.classList.toggle('is-flipped', flipped);
  };

  const toggleFlip = () => setFlipped(!flipped);

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

  window.setInterval(toggleFlip, 3000);
};

const initProjectSlideshows = () => {
  const visuals = [...document.querySelectorAll('.project-visual[data-project-assets]')];
  if (!visuals.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const filenames = ['01.jpg', '02.jpg', '03.jpg'];

  visuals.forEach((visual) => {
    const slidesContainer = visual.querySelector('.project-slides');
    const basePath = visual.dataset.projectAssets;
    if (!slidesContainer || !basePath) return;

    const loadedSlides = [];
    let currentIndex = 0;
    let intervalId = null;

    const showSlide = (slide) => {
      loadedSlides.forEach((item) => item.classList.toggle('is-active', item === slide));
      currentIndex = Math.max(0, loadedSlides.indexOf(slide));
    };

    const startRotation = () => {
      if (reduceMotion || intervalId || loadedSlides.length < 2) return;
      intervalId = window.setInterval(() => {
        if (loadedSlides.length < 2) return;
        currentIndex = (currentIndex + 1) % loadedSlides.length;
        showSlide(loadedSlides[currentIndex]);
      }, 1800);
    };

    filenames.forEach((filename, index) => {
      const img = document.createElement('img');
      img.className = 'project-slide';
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.dataset.index = String(index);

      img.addEventListener('load', () => {
        loadedSlides.push(img);
        loadedSlides.sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
        visual.classList.add('has-project-images');

        if (loadedSlides.length === 1) {
          showSlide(img);
        } else {
          showSlide(loadedSlides[currentIndex]);
        }

        startRotation();
      });

      img.addEventListener('error', () => {
        img.remove();
      });

      img.src = `${basePath}/${filename}`;
      slidesContainer.appendChild(img);
    });
  });
};

const init = () => {
  initProfileFlip();
  initProjectSlideshows();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
