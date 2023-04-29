const getCenterX = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.left + rect.width / 2;
};

const onNavClick = (buttonName) => {
  const blockElement = document.querySelector('.carousel');
  const items = blockElement.querySelectorAll(':scope > div');
  const wrapperElement = document.querySelector('.carousel-wrapper');
  const wrapperRect = wrapperElement.getBoundingClientRect();
  let visibleCount = 0;
  let offsideItemsNeeded = 0;
  items.forEach((item, index) => {
    if (getCenterX(item) > wrapperRect.left && getCenterX(item) < wrapperRect.right) {
      visibleCount += 1;
      if (buttonName === 'prev') {
        offsideItemsNeeded = (2 * visibleCount) - (index + 1);
      } else {
        offsideItemsNeeded = visibleCount - items.length + (index + 1);
      }
    }
  });
  const scrollX = visibleCount * (getCenterX(items.item(1)) - getCenterX(items.item(0)));
  for (let i = 0; i < offsideItemsNeeded; i++) {
    if (buttonName === 'prev') {
      blockElement.prepend(blockElement.removeChild(blockElement.lastElementChild));
    } else {
      blockElement.append(blockElement.removeChild(blockElement.firstElementChild));
    }
  }
  wrapperElement.scrollBy({
    left: buttonName === 'prev' ? -scrollX : scrollX,
    top: 0,
    behavior: 'smooth',
  });
};

const createNavigationControls = () => {
  const arrows = document.createElement('div');
  arrows.classList.add('carousel-nav');
  const prev = document.createElement('div');
  prev.innerHTML = `<svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          color="#222222"
          stroke="currentColor"
          stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>`;
  const next = document.createElement('div');
  next.innerHTML = `<svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          color="#222222"
          stroke="currentColor"
          stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>`;
  prev.classList.add('prev', 'carousel-nav-button');
  next.classList.add('next', 'carousel-nav-button');
  prev.addEventListener('click', () => {
    onNavClick('prev');
  });
  next.addEventListener('click', () => {
    onNavClick('next');
  });
  arrows.append(prev);
  arrows.append(next);
  document.querySelector('.carousel')
    .parentElement
    .parentElement
    .append(arrows);
};

export default function decorate(block) {
  block.querySelectorAll('a')
    .forEach((el) => {
      el.removeAttribute('class');
    });
  createNavigationControls();
}
