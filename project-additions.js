(() => {
  const projectGrid = document.querySelector('.project-grid');
  const moreCard = projectGrid?.querySelector('.more-card');

  if (!projectGrid || !moreCard || projectGrid.dataset.projectAdditionsReady === 'true') return;
  projectGrid.dataset.projectAdditionsReady = 'true';

  const projects = [
    {
      slug: 'lucid',
      index: '10',
      kind: 'RESTAURANT · POINT OF SALE',
      visualClass: 'visual-light',
      label: 'LUCID / RESTAURANT POS',
      visual: `
        <div class="mock-panel project-placeholder">
          <div class="mock-row"><span>New order</span><strong>Start</strong></div>
          <div class="mock-row"><span>Kitchen queue</span><strong>Monitor</strong></div>
          <div class="mock-row"><span>Inventory</span><strong>Track</strong></div>
        </div>
      `,
      title: 'Lucid',
      description: 'A legacy restaurant Point of Sale (POS) prototype with dashboards, order management, kitchen operations, inventory, reporting, and settings.',
      tags: ['Point of Sale', 'Restaurant Tech', 'Next.js'],
      href: 'https://github.com/gODtECH-Ctl-Create/lucid',
      linkText: 'View project repository',
    },
    {
      slug: 'sayrr',
      index: '11',
      kind: 'VOICE · DEVELOPER TOOL',
      visualClass: 'visual-green',
      label: 'SAYRR / VOICE INPUT',
      visual: `
        <div class="voice-console project-placeholder">
          <div><span class="voice-dot"></span><strong>READY</strong></div>
          <div class="voice-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div><span>Speak naturally</span><strong>INSERT</strong></div>
        </div>
      `,
      title: 'SAYRR',
      description: 'A desktop voice-input utility that captures speech, cleans the transcript, and inserts the resulting text back into the application you were using.',
      tags: ['Tauri', 'TypeScript', 'Speech Recognition'],
      href: 'https://github.com/gODtECH-Ctl-Create/Proqurement/tree/main/apps/desktop',
      linkText: 'View SAYRR prototype',
    },
  ];

  const cards = projects.map((project) => `
    <article class="project-card" data-project-slug="${project.slug}">
      <div class="project-top">
        <span class="project-index">${project.index}</span>
        <span class="project-kind">${project.kind}</span>
      </div>
      <div class="project-visual ${project.visualClass}" data-project-assets="assets/projects/${project.slug}">
        <div class="project-slides" aria-hidden="true"></div>
        <span class="visual-label">${project.label}</span>
        ${project.visual}
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
        <a href="${project.href}" target="_blank" rel="noreferrer" class="project-link">${project.linkText}</a>
      </div>
    </article>
  `).join('');

  moreCard.insertAdjacentHTML('beforebegin', cards);

  if (!document.getElementById('project-additions-style')) {
    const style = document.createElement('style');
    style.id = 'project-additions-style';
    style.textContent = `
      .voice-console {
        display: grid;
        gap: 18px;
        min-width: min(84%, 360px);
        padding: 24px;
        border: 1px solid rgba(17,17,15,.16);
        background: rgba(255,255,255,.48);
        box-shadow: 0 18px 38px rgba(17,17,15,.08);
      }
      .voice-console > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .voice-console span,
      .voice-console strong {
        font-size: 10px;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .voice-console > div:last-child span { color: rgba(17,17,15,.52); }
      .voice-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: currentColor;
        box-shadow: 0 0 0 5px rgba(17,17,15,.06);
      }
      .voice-wave {
        height: 62px;
        justify-content: center !important;
        align-items: center !important;
      }
      .voice-wave i {
        display: block;
        width: 5px;
        border-radius: 999px;
        background: currentColor;
        opacity: .72;
      }
      .voice-wave i:nth-child(1) { height: 22px; }
      .voice-wave i:nth-child(2) { height: 38px; }
      .voice-wave i:nth-child(3) { height: 50px; }
      .voice-wave i:nth-child(4) { height: 30px; }
      .voice-wave i:nth-child(5) { height: 54px; }
      .voice-wave i:nth-child(6) { height: 40px; }
      .voice-wave i:nth-child(7) { height: 25px; }
      .voice-wave i:nth-child(8) { height: 44px; }
      @media (max-width: 720px) {
        .voice-console { min-width: 0; width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }
})();
