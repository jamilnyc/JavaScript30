/** @type {Element} */
const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav() {
  console.log(topOfNav, window.scrollY);
  // If you scroll lower than the top of the nav
  if (window.scrollY >= topOfNav) {
    // When the nav becomes fixed, it is not part of the body's space anymore
    // Add this padding to fill that space up again so the content doesn't jump in.
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);
