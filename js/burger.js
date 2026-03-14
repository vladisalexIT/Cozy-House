const headerBurgerButton = document.querySelector('[data-js-header__burger]')
const menuList = document.querySelector('[data-js-menu__list]')
const menuOverlay = document.querySelector('[data-js-menu-overlay]');

headerBurgerButton.addEventListener('click', () => {
  headerBurgerButton.classList.toggle('active');
  menuList.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.style.overflow = menuList.classList.contains('active') ? 'hidden' : '';
});

menuOverlay.addEventListener('click', () => {
  headerBurgerButton.classList.remove('active');
  menuList.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

document.querySelectorAll('.main-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    headerBurgerButton.classList.remove('active');
    menuList.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});







