// ===== ТЕМА =====
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark-mode');

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// ===== ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ =====
const fades = document.querySelectorAll('.fade-in');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
fades.forEach(el => fadeObs.observe(el));

// ===== КНОПКА "ВВЕРХ" =====
const toTopBtn = document.getElementById('toTopBtn');
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      if (window.scrollY > 300) toTopBtn.classList.add('show');
      else toTopBtn.classList.remove('show');
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ =====
const sections = document.querySelectorAll('main section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');
const linkById = new Map([...menuLinks].map(a => [a.getAttribute('href').slice(1), a]));

function setActive(id){
  menuLinks.forEach(a => a.classList.remove('active'));
  const link = linkById.get(id);
  if (link) link.classList.add('active');
  const targetHash = `#${id}`;
  if (location.hash !== targetHash) history.replaceState(null, '', targetHash);
}

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(sec => spy.observe(sec));

// Активный пункт на старте
window.addEventListener('load', () => {
  const hash = location.hash.replace('#','');
  if (hash && linkById.has(hash)) {
    setActive(hash);
    document.getElementById(hash)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  } else if (sections[0]) {
    setActive(sections[0].id);
  }
});

// ===== ПЛАВНЫЕ ЯКОРЯ =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
