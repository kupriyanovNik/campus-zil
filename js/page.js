/* Общий скрипт для внутренних страниц: меню и год в подвале. */
(function () {
  'use strict';
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  // Блокировка прокрутки под открытым меню (работает и в iOS Safari)
  let scrollY = 0;
  const lockScroll = () => { scrollY = window.scrollY; document.body.style.position = 'fixed'; document.body.style.top = `-${scrollY}px`; document.body.style.left = '0'; document.body.style.right = '0'; document.body.style.width = '100%'; };
  const unlockScroll = () => { if (document.body.style.position !== 'fixed') return; document.body.style.position = ''; document.body.style.top = ''; document.body.style.left = ''; document.body.style.right = ''; document.body.style.width = ''; window.scrollTo(0, scrollY); };
  const closeNav = () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Открыть меню'); unlockScroll(); };
  burger.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    if (open) lockScroll(); else unlockScroll();
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', e => { if (e.matches) closeNav(); });
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
