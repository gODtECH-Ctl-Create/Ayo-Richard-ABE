// Project cards are now maintained directly in index.html and projects.html.
// This file remains as a compatibility hook because the GitHub Pages workflow
// still injects it during deployment.
(() => {
  const projectGrid = document.querySelector('.project-grid');
  if (!projectGrid) return;
})();
