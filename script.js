  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  document.querySelectorAll('#navMenu a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));