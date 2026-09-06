(() => {
  const initProjectNavigation = () => {
    const work = document.querySelector('#work');
    const grid = work?.querySelector('.project-grid-featured');
    if (!work || !grid) return;

    let style = document.getElementById('projects-ui-fix-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'projects-ui-fix-style';
      style.textContent = `
        .project-grid-featured {
          position: relative;
        }

        .more-project-card {
          grid-column: 1 / -1 !important;
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          min-height: 190px;
          padding: 30px;
          border: 1px solid var(--ink) !important;
          background: var(--accent) !important;
          color: var(--ink);
        }

        .more-project-card > div {
          max-width: 720px;
        }

        .more-project-card .eyebrow {
          margin-bottom: 12px;
          color: rgba(17,17,15,.58);
        }

        .more-project-card h3 {
          margin: 0 0 10px;
          font-size: clamp(28px, 4vw, 44px);
          line-height: .98;
          letter-spacing: -.05em;
        }

        .more-project-card > div > p:last-child {
          margin: 0;
          max-width: 660px;
          color: rgba(17,17,15,.66);
          font-size: 14px;
          line-height: 1.65;
        }

        .projects-home-cta {
          display: flex;
          justify-content: center;
          margin-top: 22px;
        }

        .projects-home-cta .button {
          min-width: 210px;
        }

        .projects-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        @media (max-width: 720px) {
          .project-grid-featured {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
            gap: 16px !important;
            overflow-x: auto !important;
            overflow-y: visible !important;
            width: calc(100% + 40px) !important;
            margin-inline: -20px !important;
            padding: 6px 20px 22px !important;
            scroll-snap-type: x mandatory !important;
            scroll-padding-inline: 20px !important;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            scrollbar-width: none;
            touch-action: pan-x pan-y;
          }

          .project-grid-featured::-webkit-scrollbar {
            display: none;
          }

          .project-grid-featured > .project-card,
          .project-grid-featured > .more-project-card {
            flex: 0 0 min(86vw, 390px) !important;
            width: min(86vw, 390px) !important;
            min-width: 0 !important;
            scroll-snap-align: start !important;
            scroll-snap-stop: always;
          }

          .project-grid-featured > .more-project-card {
            display: flex !important;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            gap: 22px;
            min-height: 280px;
            padding: 24px;
          }

          .projects-home-cta {
            margin-top: 6px;
          }

          .projects-home-cta .button {
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    }

    let moreCard = grid.querySelector('.more-project-card');
    if (!moreCard) {
      moreCard = document.createElement('article');
      moreCard.className = 'project-card more-project-card';
      moreCard.innerHTML = `
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> THE REST OF THE WORK</p>
          <h3>There is more behind the six.</h3>
          <p>Explore the wider project catalogue, including products, systems, collaborations, infrastructure, and experiments.</p>
        </div>
        <a class="button button-primary" href="./projects.html">View More Projects <span aria-hidden="true">↗</span></a>
      `;
      grid.appendChild(moreCard);
    }

    let cta = work.querySelector('.projects-home-cta');
    if (!cta) {
      cta = document.createElement('div');
      cta.className = 'projects-home-cta';
      cta.innerHTML = '<a class="button button-primary" href="./projects.html">View More Projects <span aria-hidden="true">↗</span></a>';
      grid.insertAdjacentElement('afterend', cta);
    }

    const nav = document.querySelector('.desktop-nav');
    if (nav && !nav.querySelector('a[href="./projects.html"]')) {
      const link = document.createElement('a');
      link.className = 'projects-nav-link';
      link.href = './projects.html';
      link.textContent = 'Projects';
      nav.appendChild(link);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectNavigation, { once: true });
  } else {
    initProjectNavigation();
  }
})();
