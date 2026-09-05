// ===== Scroll Animations (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position
        const delay = Array.from(fadeEls).indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(delay, 600));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // ===== Generate GitHub Contribution Grid =====
  generateGitHubGrid();

  // ===== Dark mode is always on (matches original) =====
  document.documentElement.style.colorScheme = 'dark';
});

// ===== GitHub Contribution Grid Generator =====
function generateGitHubGrid() {
  const grid = document.getElementById('ghGrid');
  if (!grid) return;

  const weeks = 52;
  const days = 7;
  let totalContribs = 0;

  // Generate random but realistic-looking contribution data
  for (let w = 0; w < weeks; w++) {
    const col = document.createElement('div');
    col.className = 'gh-col';

    for (let d = 0; d < days; d++) {
      const cell = document.createElement('div');
      cell.className = 'gh-cell';

      // Weighted random for realistic look
      const rand = Math.random();
      let level = 0;
      if (rand > 0.55) {
        level = 1;
        totalContribs += Math.floor(Math.random() * 3) + 1;
      }
      if (rand > 0.72) {
        level = 2;
        totalContribs += Math.floor(Math.random() * 3) + 2;
      }
      if (rand > 0.85) {
        level = 3;
        totalContribs += Math.floor(Math.random() * 5) + 3;
      }
      if (rand > 0.94) {
        level = 4;
        totalContribs += Math.floor(Math.random() * 8) + 5;
      }

      if (level > 0) cell.classList.add('l' + level);
      col.appendChild(cell);
    }
    grid.appendChild(col);
  }

  // Update contribution count
  const countEl = document.getElementById('ghContribCount');
  if (countEl) {
    countEl.textContent = totalContribs + ' contributions in the last year';
  }
}

// ===== Toggle Skills =====
function toggleSkills() {
  const hidden = document.getElementById('hiddenSkills');
  const btn = document.getElementById('showMoreBtn');
  if (!hidden || !btn) return;

  if (hidden.classList.contains('show')) {
    hidden.classList.remove('show');
    btn.textContent = 'Daha fazla...';
  } else {
    hidden.classList.add('show');
    btn.textContent = 'Daha az göster';
  }
}
