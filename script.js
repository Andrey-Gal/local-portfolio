// ===== Тема =====
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark-mode');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
}

// ===== Плавное появление секций =====
(() => {
  const fades = document.querySelectorAll('.fade-in');
  if (!fades.length) return;

  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
      }, { threshold: 0.1 })
    : null;

  fades.forEach(el => io && io.observe(el));

  const revealAbove = () => {
    fades.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
    });
  };
  window.addEventListener('load', revealAbove);
  window.addEventListener('scroll', revealAbove, { passive: true });
})();

// ===== Подсветка активного пункта меню =====
(() => {
  const sections = document.querySelectorAll('main section[id]');
  const menuLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !menuLinks.length) return;

  const linkById = new Map([...menuLinks].map(a => [a.getAttribute('href').slice(1), a]));
  function setActive(id){
    menuLinks.forEach(a => a.classList.remove('active'));
    const link = linkById.get(id);
    if (link) link.classList.add('active');
  }

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id));
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(sec => spy.observe(sec));

  window.addEventListener('load', () => {
    const hash = location.hash.replace('#','');
    if (hash && linkById.has(hash)) {
      setActive(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      setActive(sections[0].id);
    }
  });

  // Плавные якоря
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ===== Полоса прогресса + кнопка «Наверх» =====
(() => {
  const progress = document.getElementById('scrollProgress');
  const toTopBtn = document.getElementById('toTopBtn');

  const onScroll = () => {
    const doc = document.documentElement;
    const y = doc.scrollTop || document.body.scrollTop;
    const h = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = Math.max(0, Math.min(100, (y / h) * 100));
    if (progress) progress.style.width = pct + '%';
    if (toTopBtn) toTopBtn.classList.toggle('show', y > 300);
  };

  window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  window.addEventListener('load', onScroll);

  if (toTopBtn) {
    toTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }
})();
