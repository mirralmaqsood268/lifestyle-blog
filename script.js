// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchInput = document.getElementById('searchInput');
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const cards = Array.from(document.querySelectorAll('.card'));
  const themeToggle = document.getElementById('themeToggle');
  const discoverBtn = document.getElementById('discoverBtn');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  // Helper: show/hide cards by filter/search
  function updateGrid() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const active = document.querySelector('.filter-btn.active')?.dataset.cat || 'All';

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const cat = card.dataset.cat;
      const matchesSearch = title.includes(q);
      const matchesCat = (active === 'All' || cat === active);
      card.style.display = (matchesSearch && matchesCat) ? '' : 'none';
    });
  }

  // Live search
  searchInput.addEventListener('input', updateGrid);

  // Category filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      updateGrid();
      // small visual scroll to grid
      document.getElementById('grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Read More modal open
  document.querySelectorAll('.read-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const title = btn.dataset.title;
      const img = btn.dataset.img;
      const content = btn.dataset.content;
      modalImg.src = img;
      modalImg.alt = title;
      modalTitle.textContent = title;
      modalContent.innerHTML = content;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      modalClose.focus();
    });
  });

  // Modal close
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  // Theme toggle with persistence
  const saved = localStorage.getItem('lifevibe-theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('lifevibe-theme', isDark ? 'dark' : 'light');
  });

  // Smooth scroll Discover More
  discoverBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
  });

  // Initial update (ensures visibility correct)
  updateGrid();
});
