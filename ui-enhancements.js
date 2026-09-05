(() => {
  const ARROW_ICONS = {
    '↗': 'ui-icon-external',
    '→': 'ui-icon-right',
    '←': 'ui-icon-left',
    '↑': 'ui-icon-up',
    '↓': 'ui-icon-down'
  };

  const replaceArrowText = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return Object.keys(ARROW_ICONS).some((arrow) => node.nodeValue.includes(arrow))
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });

    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    textNodes.forEach((textNode) => {
      const source = textNode.nodeValue || '';
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      const pattern = /[↗→←↑↓]/g;
      let match;

      while ((match = pattern.exec(source))) {
        if (match.index > cursor) {
          fragment.appendChild(document.createTextNode(source.slice(cursor, match.index)));
        }

        const icon = document.createElement('span');
        icon.className = `ui-icon ${ARROW_ICONS[match[0]]}`;
        icon.setAttribute('aria-hidden', 'true');
        fragment.appendChild(icon);
        cursor = match.index + match[0].length;
      }

      if (cursor < source.length) {
        fragment.appendChild(document.createTextNode(source.slice(cursor)));
      }

      textNode.parentNode.replaceChild(fragment, textNode);
    });
  };

  const injectInteractionStyles = () => {
    const style = document.createElement('style');
    style.id = 'portfolio-interaction-enhancements';
    style.textContent = `
      .ui-icon {
        position: relative;
        display: inline-block;
        width: .92em;
        height: .92em;
        margin-left: .16em;
        vertical-align: -.06em;
        flex: 0 0 auto;
      }

      .ui-icon::before,
      .ui-icon::after {
        content: "";
        position: absolute;
        display: block;
        pointer-events: none;
      }

      .ui-icon-external::before,
      .ui-icon-right::before {
        width: .7em;
        height: 1.5px;
        left: .04em;
        top: .58em;
        background: currentColor;
        transform-origin: right center;
      }

      .ui-icon-external::after,
      .ui-icon-right::after {
        width: .36em;
        height: .36em;
        right: .03em;
        top: .16em;
        border-top: 1.7px solid currentColor;
        border-right: 1.7px solid currentColor;
      }

      .ui-icon-left::before {
        width: .7em;
        height: 1.5px;
        right: .04em;
        top: .58em;
        background: currentColor;
        transform-origin: left center;
      }

      .ui-icon-left::after {
        width: .36em;
        height: .36em;
        left: .03em;
        top: .16em;
        border-left: 1.7px solid currentColor;
        border-bottom: 1.7px solid currentColor;
      }

      .ui-icon-up::before,
      .ui-icon-down::before {
        width: 1.5px;
        height: .7em;
        left: .58em;
        top: .1em;
        background: currentColor;
      }

      .ui-icon-up::after,
      .ui-icon-down::after {
        width: .36em;
        height: .36em;
        left: .40em;
        border-top: 1.7px solid currentColor;
        border-left: 1.7px solid currentColor;
      }

      .ui-icon-up::after { top: .02em; transform: rotate(45deg); }
      .ui-icon-down::after { bottom: .02em; transform: rotate(225deg); }

      @keyframes projectCtaBounce {
        0%, 72%, 100% {
          transform: translateY(0);
          text-shadow: 0 2px 0 rgba(17,17,15,.10), 0 7px 16px rgba(17,17,15,.07);
        }
        78% {
          transform: translateY(-3px);
          text-shadow: 0 5px 0 rgba(17,17,15,.18), 0 12px 18px rgba(17,17,15,.10);
        }
        84% {
          transform: translateY(0);
          text-shadow: 0 2px 0 rgba(17,17,15,.10), 0 7px 16px rgba(17,17,15,.07);
        }
      }

      @keyframes attentionPulse {
        0%, 68%, 100% {
          transform: translateY(0) scale(1);
          text-shadow: 0 2px 0 rgba(17,17,15,.12), 0 8px 18px rgba(17,17,15,.08);
        }
        74% {
          transform: translateY(-2px) scale(1.025);
          text-shadow: 0 4px 0 rgba(17,17,15,.16), 0 12px 22px rgba(17,17,15,.12);
        }
        80% {
          transform: translateY(0) scale(1);
        }
      }

      @keyframes buttonBreath {
        0%, 70%, 100% {
          transform: translateY(0);
          box-shadow: 0 3px 0 rgba(17,17,15,.18), 0 10px 18px rgba(17,17,15,.07);
        }
        76% {
          transform: translateY(-2px);
          box-shadow: 0 5px 0 rgba(17,17,15,.20), 0 14px 24px rgba(17,17,15,.12);
        }
        82% {
          transform: translateY(0);
        }
      }

      .project-link {
        position: relative;
        transform-origin: center bottom;
        animation: projectCtaBounce 2.8s ease-in-out infinite !important;
        will-change: transform, text-shadow;
      }

      .project-link:nth-of-type(2n) { animation-delay: .35s !important; }
      .project-link:nth-of-type(3n) { animation-delay: .65s !important; }
      .project-link:hover,
      .project-link:focus-visible {
        animation-play-state: paused !important;
        transform: translateY(-4px) scale(1.01);
      }

      .nav-github {
        transform-origin: center;
        animation: attentionPulse 2.6s ease-in-out infinite !important;
        will-change: transform, text-shadow;
      }

      .button-primary,
      .button-secondary,
      .text-link {
        transform-origin: center;
      }

      .button-primary,
      .button-secondary {
        animation: buttonBreath 3.2s ease-in-out infinite !important;
        will-change: transform, box-shadow;
      }

      .text-link {
        animation: projectCtaBounce 3s ease-in-out infinite !important;
      }

      .button:hover,
      .button:focus-visible,
      .text-link:hover,
      .text-link:focus-visible,
      .nav-github:hover,
      .nav-github:focus-visible {
        animation-play-state: paused !important;
      }

      .project-link .ui-icon,
      .text-link .ui-icon,
      .nav-github .ui-icon,
      .button .ui-icon {
        transition: transform .25s ease;
      }

      .project-link:hover .ui-icon-external,
      .project-link:focus-visible .ui-icon-external,
      .text-link:hover .ui-icon-right,
      .text-link:focus-visible .ui-icon-right,
      .nav-github:hover .ui-icon-external,
      .nav-github:focus-visible .ui-icon-external,
      .button:hover .ui-icon-external,
      .button:focus-visible .ui-icon-external {
        transform: translate(2px, -2px);
      }

      .button:hover .ui-icon-down,
      .button:focus-visible .ui-icon-down { transform: translateY(2px); }
      .button:hover .ui-icon-up,
      .button:focus-visible .ui-icon-up { transform: translateY(-2px); }

      .project-card:hover .project-link {
        animation-play-state: paused !important;
        transform: translateY(-4px);
      }

      .project-visual[data-project-assets]::after {
        content: "";
        position: absolute;
        right: 14px;
        bottom: 14px;
        width: 9px;
        height: 9px;
        border-radius: 999px;
        border: 1px solid currentColor;
        opacity: .28;
        animation: attentionPulse 2.2s ease-in-out infinite !important;
      }

      .experience-section {
        border-top: 1px solid var(--line);
        background: rgba(255,255,255,.26);
      }

      .experience-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(300px, .8fr);
        gap: 18px;
      }

      .experience-column,
      .certification-panel {
        border: 1px solid var(--line);
        background: rgba(255,255,255,.52);
      }

      .experience-column {
        padding: 10px 24px;
      }

      .experience-item {
        display: grid;
        grid-template-columns: 98px minmax(0,1fr);
        gap: 24px;
        padding: 28px 0;
        border-bottom: 1px solid var(--line);
      }

      .experience-item:last-child {
        border-bottom: 0;
      }

      .experience-meta {
        color: var(--muted);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .12em;
        text-transform: uppercase;
      }

      .experience-item h3 {
        margin: 0 0 8px;
        font-size: 24px;
        letter-spacing: -.04em;
      }

      .experience-item p {
        margin: 0;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.7;
      }

      .experience-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 14px;
      }

      .experience-tags span {
        padding: 6px 8px;
        border: 1px solid rgba(17,17,15,.11);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .certification-panel {
        position: relative;
        overflow: hidden;
        padding: 28px;
        background: var(--ink);
        color: #fff;
      }

      .certification-panel::after {
        content: "";
        position: absolute;
        width: 220px;
        height: 220px;
        right: -70px;
        top: -70px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(183,255,60,.35), transparent 67%);
        pointer-events: none;
      }

      .certification-panel .eyebrow {
        color: rgba(255,255,255,.52);
      }

      .certification-panel h3 {
        position: relative;
        z-index: 1;
        margin: 0;
        max-width: 420px;
        font-size: 38px;
        line-height: .98;
        letter-spacing: -.055em;
      }

      .certification-intro {
        position: relative;
        z-index: 1;
        margin: 18px 0 26px;
        max-width: 430px;
        color: rgba(255,255,255,.62);
        font-size: 13px;
        line-height: 1.7;
      }

      .certification-placeholder {
        position: relative;
        z-index: 1;
        padding: 16px;
        border: 1px solid rgba(255,255,255,.12);
        background: rgba(255,255,255,.05);
      }

      .certification-placeholder strong {
        display: block;
        margin-bottom: 5px;
        font-family: "Space Grotesk", Arial, sans-serif;
        font-size: 14px;
      }

      .certification-placeholder span {
        color: rgba(255,255,255,.48);
        font-size: 11px;
        line-height: 1.6;
      }

      .certification-note {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 18px;
        color: var(--accent);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .12em;
        text-transform: uppercase;
      }

      .certification-note::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: currentColor;
        box-shadow: 0 0 0 4px rgba(183,255,60,.12);
      }

      .mobile-project-hint {
        display: none;
      }

      @media (max-width: 720px) {
        .nav-github {
          animation-duration: 2.2s !important;
        }

        .project-link {
          animation-duration: 2.5s !important;
        }

        .button-primary,
        .button-secondary {
          animation-duration: 2.8s !important;
        }

        .project-grid {
          display: flex !important;
          flex-direction: row !important;
          align-items: stretch;
          gap: 16px !important;
          overflow-x: auto !important;
          overflow-y: visible !important;
          width: calc(100% + 40px) !important;
          margin-inline: -20px !important;
          padding: 6px 20px 22px !important;
          scroll-snap-type: x mandatory;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y;
          scrollbar-width: none;
        }

        .project-grid::-webkit-scrollbar {
          display: none;
        }

        .project-card,
        .project-card.featured,
        .project-card.more-card {
          flex: 0 0 min(86vw, 390px) !important;
          width: min(86vw, 390px) !important;
          min-width: 0 !important;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .project-card.featured {
          display: block !important;
        }

        .project-card:hover {
          transform: none;
        }

        .mobile-project-hint {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          margin: -18px 0 24px;
          color: var(--muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .mobile-project-hint::after {
          content: "";
          width: 22px;
          height: 1px;
          background: currentColor;
          box-shadow: 8px 0 0 currentColor;
          animation: attentionPulse 1.8s ease-in-out infinite;
        }

        .experience-layout {
          grid-template-columns: 1fr;
        }

        .experience-column {
          padding: 8px 20px;
        }

        .experience-item {
          grid-template-columns: 1fr;
          gap: 10px;
          padding: 22px 0;
        }

        .experience-item h3 {
          font-size: 22px;
        }

        .certification-panel {
          padding: 24px;
        }

        .certification-panel h3 {
          font-size: 34px;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const addExperienceNav = () => {
    const nav = document.querySelector('.desktop-nav');
    if (!nav || nav.querySelector('[data-experience-link]')) return;

    const contact = nav.querySelector('a[href="#contact"]');
    const link = document.createElement('a');
    link.href = '#experience';
    link.dataset.experienceLink = 'true';
    link.textContent = 'CERT & EXP';

    if (contact) nav.insertBefore(link, contact);
    else nav.appendChild(link);
  };

  const addExperienceSection = () => {
    if (document.querySelector('#experience')) return;

    const about = document.querySelector('#about');
    if (!about) return;

    const section = document.createElement('section');
    section.className = 'section experience-section';
    section.id = 'experience';
    section.innerHTML = `
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span class="eyebrow-dot"></span> CERTIFICATIONS & EXPERIENCE</p>
            <h2>Where the <em>work</em> comes together.</h2>
          </div>
          <p>A growing record of the product, engineering, systems, and leadership work behind the projects on this site.</p>
        </div>

        <div class="experience-layout">
          <div class="experience-column">
            <article class="experience-item">
              <div class="experience-meta">01 · Product</div>
              <div>
                <h3>Product Development & Management</h3>
                <p>Working across product definition, user experience, requirements, delivery, and software implementation to turn real problems into useful products.</p>
                <div class="experience-tags"><span>Product Strategy</span><span>Roadmaps</span><span>Delivery</span></div>
              </div>
            </article>
            <article class="experience-item">
              <div class="experience-meta">02 · Engineering</div>
              <div>
                <h3>Software & Systems Building</h3>
                <p>Building web products, internal systems, automations, and developer-facing tools that reduce friction and make complex workflows easier to run.</p>
                <div class="experience-tags"><span>Web Apps</span><span>Automation</span><span>Developer Systems</span></div>
              </div>
            </article>
            <article class="experience-item">
              <div class="experience-meta">03 · Leadership</div>
              <div>
                <h3>Product Operations & Collaboration</h3>
                <p>Helping teams organize product work, connect technical decisions to user needs, and move from scattered ideas to a shippable system.</p>
                <div class="experience-tags"><span>Product Operations</span><span>Collaboration</span><span>Systems Thinking</span></div>
              </div>
            </article>
          </div>

          <aside class="certification-panel">
            <p class="eyebrow"><span class="eyebrow-dot"></span> CERTIFICATIONS</p>
            <h3>A dedicated place for the credentials behind the work.</h3>
            <p class="certification-intro">Certification names, issuing bodies, dates, and verification links can be added here as the portfolio grows.</p>
            <div class="certification-placeholder">
              <strong>Certification record</strong>
              <span>Add your certification details and verification links here.</span>
            </div>
            <div class="certification-note">Ready for your certification list</div>
          </aside>
        </div>
      </div>
    `;

    about.parentNode.insertBefore(section, about);
  };

  const addMobileProjectHint = () => {
    if (document.querySelector('.mobile-project-hint')) return;

    const work = document.querySelector('#work');
    const grid = work?.querySelector('.project-grid');
    if (!work || !grid) return;

    const hint = document.createElement('div');
    hint.className = 'mobile-project-hint';
    hint.textContent = 'Swipe to explore projects';
    grid.parentNode.insertBefore(hint, grid);
  };

  const init = () => {
    replaceArrowText();
    injectInteractionStyles();
    addExperienceNav();
    addExperienceSection();
    addMobileProjectHint();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
