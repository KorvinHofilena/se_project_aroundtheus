const profileEditButton = document.getElementById("profile-edit-button");
const profileEditModal = document.getElementById("profile-edit-modal");
const profileCloseModal = document.getElementById("profile-close-modal");
const addPlaceButton = document.querySelector(".profile__add-button");
const addPlaceModal = document.getElementById("add-place-modal");
const addPlaceCloseModal = document.getElementById("add-place-close-modal");
const profileEditForm = document.getElementById("profile-edit-form");
const addPlaceForm = document.getElementById("add-place-form");
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);
const placeTitleInput = document.getElementById("place-title-input");
const placeLinkInput = document.getElementById("place-link-input");
const cardsList = document.querySelector(".cards__list");
const imageViewModal = document.getElementById("image-view-modal");
const imageViewCloseButton = document.getElementById("image-view-close-button");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("mousedown", handleOutsideClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOutsideClick);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleOutsideClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeTitleInput.value,
    link: placeLinkInput.value,
  };
  renderCard(newCard);
  addPlaceForm.reset();
  closeModal(addPlaceModal);
}

function renderCard(card) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardImage.addEventListener("click", () => {
    modalImage.src = card.link;
    modalImage.alt = card.name;
    modalCaption.textContent = card.name;
    openModal(imageViewModal);
  });

  cardsList.prepend(cardElement);
}

profileEditButton.addEventListener("click", () => openModal(profileEditModal));
profileCloseModal.addEventListener("click", () => closeModal(profileEditModal));
addPlaceButton.addEventListener("click", () => openModal(addPlaceModal));
addPlaceCloseModal.addEventListener("click", () => closeModal(addPlaceModal));
imageViewCloseButton.addEventListener("click", () =>
  closeModal(imageViewModal)
);

profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
addPlaceForm.addEventListener("submit", handleAddPlaceFormSubmit);

initialCards.forEach(renderCard);
