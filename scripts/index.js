const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalClose = document.querySelector("#profile-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector(".modal__form");
const cardsListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardDeleteButton.addEventListener("click", function () {
    this.closest(".card").remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    openImageViewModal(cardData.link, cardData.name);
  });

  return cardElement;
}

function openImageViewModal(link, name) {
  const imageViewModal = document.querySelector("#image-view-modal");
  const modalImage = document.querySelector("#modal-image");
  const modalCaption = document.querySelector("#modal-caption");
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  imageViewModal.classList.add("modal_opened");
}

function closeImageViewModal() {
  const imageViewModal = document.querySelector("#image-view-modal");
  imageViewModal.classList.remove("modal_opened");
}

document
  .querySelector("#image-view-close-modal")
  .addEventListener("click", closeImageViewModal);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalClose.addEventListener("click", closePopUp);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListEl.prepend(cardElement);
});

const addPlaceButton = document.querySelector(".profile__add-button");
const addPlaceModal = document.querySelector("#add-place-modal");
const addPlaceCloseButton = document.querySelector("#add-place-close-modal");
const addPlaceForm = document.querySelector("#add-place-form");
const placeTitleInput = document.querySelector("#place-title-input");
const placeLinkInput = document.querySelector("#place-link-input");

function openAddPlaceModal() {
  placeTitleInput.value = "";
  placeLinkInput.value = "";
  addPlaceModal.classList.add("modal_opened");
}

function closeAddPlaceModal() {
  addPlaceModal.classList.remove("modal_opened");
}

function handleAddPlaceSubmit(e) {
  e.preventDefault();
  const newCardData = {
    name: placeTitleInput.value,
    link: placeLinkInput.value,
  };
  const newCardElement = getCardElement(newCardData);
  cardsListEl.prepend(newCardElement);
  closeAddPlaceModal();
}

addPlaceButton.addEventListener("click", openAddPlaceModal);
addPlaceCloseButton.addEventListener("click", closeAddPlaceModal);
addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);
