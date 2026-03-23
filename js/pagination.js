export const initPagination = () => {
  const pets = [
    { name: 'Katrine', img: 'images/pets-katrine.jpg' },
    { name: 'Jennifer', img: 'images/pets-jennifer.jpg' },
    { name: 'Woody', img: 'images/pets-woody.jpg' },
    { name: 'Sophia', img: 'images/pets/4.jpg' },
    { name: 'Timmy', img: 'images/pets/pets-timmy.png' },
    { name: 'Charly', img: 'images/pets/pets-charly.jpg' },
    { name: 'Scarlett', img: 'images/pets/pets-scarlet.jpg' },
    { name: 'Freddie', img: 'images/pets/8.jpg' },
  ];

  const grid = document.querySelector('[data-js-pets-grid]');
  const pager = document.querySelector('.pagination__list');
  if (!grid || !pager) return;

  const btnFirst = pager.querySelector('.pagination__item:nth-child(1) .pagination__link');
  const btnPrev = pager.querySelector('.pagination__item:nth-child(2) .pagination__link');
  const badge = pager.querySelector('.pagination__item:nth-child(3) .pagination__link');
  const btnNext = pager.querySelector('.pagination__item:nth-child(4) .pagination__link');
  const btnLast = pager.querySelector('.pagination__item:nth-child(5) .pagination__link');

  const DIS = 'pagination__link--disable';
  const CUR = 'pagination__link--current';

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function cardsPerPage() {
    const w = window.innerWidth;
    if (w >= 1280) return 8;
    if (w >= 768) return 6;
    return 3;
  }

  function setDisabled(el, disabled) {
    if (!el) return;
    el.classList.toggle(DIS, disabled);
    if (disabled) el.removeAttribute('href');
    else el.setAttribute('href', '#');
  }

  function cardHTML(pet) {
    return `
      <a class="friends-item" href="#">
        <div class="friends-item__image-container">
          <img src="${pet.img}" alt="">
        </div>
        <div class="friends-item__title">${pet.name}</div>
        <div class="friends-item__button button button--round">Learn more</div>
      </a>
    `;
  }

  function build48() {
    const result = [];
    for (let k = 0; k < 6; k++) {
      result.push(...shuffle(pets));
    }
    return result;
  }

  const store = {
    seq48: build48(),
    per: cardsPerPage(),
    page: 1,
  };

  function totalPages() {
    return Math.ceil(store.seq48.length / store.per);
  }

  function renderPage(n) {
    const pages = totalPages();
    store.page = Math.min(Math.max(1, n), pages);

    const start = (store.page - 1) * store.per;
    const slice = store.seq48.slice(start, start + store.per);

    grid.innerHTML = slice.map(cardHTML).join('');

    badge.classList.add(CUR);
    badge.textContent = String(store.page);

    setDisabled(btnFirst, store.page === 1);
    setDisabled(btnPrev, store.page === 1);
    setDisabled(btnNext, store.page === pages);
    setDisabled(btnLast, store.page === pages);
  }

  function onClick(el, handler) {
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (el.classList.contains(DIS)) return;
      handler();
    });
  }

  onClick(btnFirst, () => renderPage(1));
  onClick(btnPrev, () => renderPage(store.page - 1));
  onClick(btnNext, () => renderPage(store.page + 1));
  onClick(btnLast, () => renderPage(totalPages()));

  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      const nextPer = cardsPerPage();
      if (nextPer === store.per) return;
      store.per = nextPer;

      renderPage(store.page);
    }, 150);
  });

  renderPage(1);
};