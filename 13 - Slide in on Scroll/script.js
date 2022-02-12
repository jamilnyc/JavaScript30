console.log('Exercise 13 | Slide in on Scroll');

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');
function checkSlide(e) {
  sliderImages.forEach((sliderImage, index) => {
    // Half way through the image
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;

    // Bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    const values = {
      index,
      slideInAt,
      sliderImageOffsetTop: sliderImage.offsetTop,
      windowScrollY: window.scrollY,
      imageBottom,
      isHalfShown,
      isNotScrolledPast,
    };
    // if (index === 0) console.table(values);
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide, 20));
