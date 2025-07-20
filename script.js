// === Анимации при скролле ===
const fadeIns = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
  fadeIns.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});
window.dispatchEvent(new Event('scroll')); // Срабатывает при загрузке

// === Переключение темы ===
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
