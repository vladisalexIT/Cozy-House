const petsData = [
  {
    name: "Jennifer",
    img: "images/pets-jennifer.jpg",
    type: "Dog",
    breed: "Labrador",
    description: "Jennifer is a sweet 2-month-old Labrador that is already training to obey simple commands. Her favorite toy is a ball. She is very friendly and loves to play with other dogs.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"]
  },
  {
    name: "Sophia",
    img: "images/pets/4.jpg",
    type: "Dog",
    breed: "Shih tzu",
    description: "Sophia is a calm and affectionate little girl. She enjoys short walks and spending time on the sofa with her humans. She's great with children.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"]
  },
  {
    name: "Woody",
    img: "images/pets-woody.jpg",
    type: "Dog",
    breed: "Golden Retriever",
    description: "Woody is a high-energy boy who loves to swim and fetch. He needs an active family who can provide him with plenty of exercise and mental stimulation.",
    age: "3 years",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["none"],
    parasites: ["none"]
  },
  {
    name: "Scarlett",
    img: "images/pets/pets-scarlet.jpg",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "Scarlett is a very smart and brave girl. Despite her small size, she has the heart of a lion and will always protect her territory and her owner.",
    age: "6 months",
    inoculations: ["parvovirus", "rabies"],
    diseases: ["none"],
    parasites: ["none"]
  },
  {
    name: "Katrine",
    img: "images/pets-katrine.jpg",
    type: "Cat",
    breed: "British Shorthair",
    description: "Katrine is a majestic and independent lady. She loves being brushed and enjoys watching the world through the window. She is quiet and very clean.",
    age: "1 year",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"]
  },
  {
    name: "Timmy",
    img: "images/pets/pets-timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Timmy is a playful young cat who gets along with everyone. He is very social and will often follow you around the house looking for attention.",
    age: "2.3 years",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["none"],
    parasites: ["none"]
  },
  {
    name: "Freddie",
    img: "images/pets/8.jpg",
    type: "Cat",
    breed: "British Shorthair",
    description: "Freddie is a little explorer. He loves climbing to high places and investigating every corner of the house. He is very curious and fun-loving.",
    age: "11 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"]
  },
  {
    name: "Charly",
    img: "images/pets/pets-charly.jpg",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "Charly is a bundle of joy. He has a lot of energy and will keep you entertained with his goofy antics. He is very loyal and affectionate.",
    age: "4 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["none"],
    parasites: ["none"]
  }
];


export function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');
  const cardsContainer = document.querySelector('[data-js-pets-container], [ data-js-pets-grid]');

  if (!cardsContainer) return;

  function openModal(petName) {
    const pet = petsData.find(p => p.name.trim() === petName.trim());
    if (!pet) return;

    modalContent.innerHTML = `
      <img class="modal-img" src="${pet.img}" alt="${pet.name}">
      <div class="modal-info">
        <h3 class="modal-name">${pet.name}</h3>
        <h4 class="modal-type-breed">${pet.type} - ${pet.breed}</h4>
        <p class="modal-descr">${pet.description}</p>
        <ul class="modal-list">
          <li><b>Age:</b> <span>${pet.age}</span></li>
          <li><b>Inoculations:</b> <span>${pet.inoculations.join(', ')}</span></li>
          <li><b>Diseases:</b> <span>${pet.diseases.join(', ')}</span></li>
          <li><b>Parasites:</b> <span>${pet.parasites.join(', ')}</span></li>
        </ul>
      </div>
    `;

    overlay.classList.add('active');
    document.body.classList.add('lock');
  }

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.classList.remove('lock');
    setTimeout(() => {
      modalContent.innerHTML = '';
    }, 300);
  };

  cardsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.friends-item');
    if (card) {
      e.preventDefault();
      const name = card.querySelector('.friends-item__title').innerText;
      openModal(name);
    }
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  overlay.addEventListener('mouseover', (e) => {
    if (e.target === overlay) closeBtn.style.backgroundColor = '#F1CDB3';
  });

  overlay.addEventListener('mouseout', (e) => {
    if (e.target === overlay) closeBtn.style.backgroundColor = 'transparent';
  });
}





