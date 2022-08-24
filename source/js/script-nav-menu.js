let navMain = document.querySelector('.navigation-menu');
let navToggle = document.querySelector('.navigation-menu__toggle');

// navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('navigation-menu--close')) {
    navMain.classList.remove('navigation-menu--close');
    navMain.classList.add('navigation-menu--open');
  } else {
    navMain.classList.add('navigation-menu--close');
    navMain.classList.remove('navigation-menu--open');
  }
});
