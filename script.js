// === Переключение темы (тёмная/светлая) ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Проверяем сохранённую тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
}

// Клик по кнопке переключает тему
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// === Плавное появление секций при скролле ===
const fadeIns = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  fadeIns.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});
window.dispatchEvent(new Event('scroll'));


// === Кнопка "вверх" ===
const toTopBtn = document.getElementById('toTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    toTopBtn.style.display = 'block';
  } else {
    toTopBtn.style.display = 'none';
  }
});

toTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// === Подсветка активного пункта меню ===
const sections = document.querySelectorAll('main section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

const linkById = new Map(
  [...menuLinks].map(a => [a.getAttribute('href').slice(1), a])
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = linkById.get(id);
    if (!link) return;

    if (entry.isIntersecting) {
      menuLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      history.replaceState(null, '', `#${id}`); // обновляет URL без прыжка
    }
  });
}, {
  rootMargin: '-40% 0px -50% 0px', // середина экрана = «активная секция»
  threshold: 0
});

sections.forEach(sec => observer.observe(sec));
