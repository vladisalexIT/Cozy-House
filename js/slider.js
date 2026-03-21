const track = document.querySelector('[data-js-track]');
const btnLeft = document.querySelector('[data-js-btn-left]');
const btnRight = document.querySelector('[data-js-btn-right]');

const ANIM_MS = 500;

const pets = [
  { id: 'katrine', name: 'Katrine', img: 'images/pets-katrine.jpg' },
  { id: 'jennifer', name: 'Jennifer', img: 'images/pets-jennifer.jpg' },
  { id: 'woody', name: 'Woody', img: 'images/pets-woody.jpg' },
  { id: 'sophia', name: 'Sophia', img: 'images/pets/4.jpg' },
  { id: 'timmy', name: 'Timmy', img: 'images/pets/pets-timmy.png' },
  { id: 'charly', name: 'Charly', img: 'images/pets/pets-charly.jpg' },
  { id: 'scarlett', name: 'Scarlett', img: 'images/pets/pets-scarlet.jpg' },
  { id: 'freddie', name: 'Freddie', img: 'images/pets/8.jpg' },
];

const state = {
  perPage: 3,
  isAnimating: false,
  prevIds: [],
  currIds: [],
  nextIds: [],
};

function calcPerPage() {
  const w = window.innerWidth;
  if (w >= 1280) return 3;
  if (w >= 768) return 2;
  return 1;
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function generatePageIds(perPage, excludeIds = []) {
  const allIds = pets.map(pet => pet.id);
  const availableIds = allIds.filter(id => !excludeIds.includes(id));

  return shuffle(availableIds).slice(0, perPage);
}

function renderCard(pet) {
  const item = document.createElement('div');
  item.className = 'slider__item';
  item.innerHTML = `
    <a class="friends-item" href="#">
      <div class="friends-item__image-container">
        <img src="${pet.img}" alt="">
      </div>
      <div class="friends-item__title">${pet.name}</div>
      <div class="friends-item__button button button--round">Learn more</div>
    </a>
  `;
  return item;
}

function renderPage(ids) {
  const page = document.createElement('div');
  page.className = 'slider__page';
  ids.forEach(id => {
    const pet = pets.find(p => p.id === id);
    page.appendChild(renderCard(pet));
  });
  return page;
}

function mountPages() {
  track.innerHTML = '';
  track.appendChild(renderPage(state.prevIds));
  track.appendChild(renderPage(state.currIds));
  track.appendChild(renderPage(state.nextIds));

  track.style.transition = 'none';
  track.style.transform = 'translateX(-100%)';
}

function slideToNext() {
  if (state.isAnimating) return;
  state.isAnimating = true;

  track.style.transition = `transform ${ANIM_MS}ms ease-in-out`;
  track.style.transform = 'translateX(-200%)';

  track.addEventListener('transitionend', () => {
    state.prevIds = state.currIds;
    state.currIds = state.nextIds;
    state.nextIds = generatePageIds(state.perPage, state.currIds);

    mountPages();
    state.isAnimating = false;
  }, { once: true });
}

function slideToPrev() {
  if (state.isAnimating) return;
  state.isAnimating = true;

  track.style.transition = `transform ${ANIM_MS}ms ease-in-out`;
  track.style.transform = 'translateX(0%)';

  track.addEventListener('transitionend', () => {
    state.nextIds = state.currIds;
    state.currIds = state.prevIds;
    state.prevIds = generatePageIds(state.perPage, state.currIds);

    mountPages();
    state.isAnimating = false;
  }, { once: true });
}

export function initSlider() {
  const sliderContainer = document.querySelector('[data-js-pets-container]');
  if (!sliderContainer) return

  state.perPage = calcPerPage();

  state.currIds = generatePageIds(state.perPage, []);
  state.nextIds = generatePageIds(state.perPage, state.currIds);
  state.prevIds = generatePageIds(state.perPage, state.currIds);

  mountPages();

  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
  btnRight.addEventListener('click', slideToNext);
  btnLeft.addEventListener('click', slideToPrev);

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      const newPerPage = calcPerPage();
      if (newPerPage === state.perPage) return;

      state.perPage = newPerPage;

      state.currIds = generatePageIds(state.perPage, []);
      state.nextIds = generatePageIds(state.perPage, state.currIds);
      state.prevIds = generatePageIds(state.perPage, state.currIds);

      mountPages();
    }, 150);
  });
}
