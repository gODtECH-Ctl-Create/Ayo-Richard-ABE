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
        transform: rotate(0deg);
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
      }
    `;
    document.head.appendChild(style);
  };

  const init = () => {
    replaceArrowText();
    injectInteractionStyles();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
