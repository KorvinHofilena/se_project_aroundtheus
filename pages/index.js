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

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
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
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: placeTitleInput.value, link: placeLinkInput.value };
  renderCard(newCard);
  addPlaceForm.reset();
  closeModal(addPlaceModal);
}

function createCard(card) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardImage.addEventListener("click", function () {
    modalImage.src = card.link;
    modalImage.alt = card.name;
    modalCaption.textContent = card.name;
    openModal(imageViewModal);
  });

  return cardElement;
}

function renderCard(card) {
  const cardElement = createCard(card);
  cardsList.prepend(cardElement);
}

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileCloseModal.addEventListener("click", function () {
  closeModal(profileEditModal);
});

addPlaceButton.addEventListener("click", function () {
  openModal(addPlaceModal);
});

addPlaceCloseModal.addEventListener("click", function () {
  closeModal(addPlaceModal);
});

imageViewCloseButton.addEventListener("click", function () {
  closeModal(imageViewModal);
});

profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
addPlaceForm.addEventListener("submit", handleAddPlaceFormSubmit);

initialCards.forEach(function (card) {
  renderCard(card);
});

const profileEditFormValidator = new FormValidator({
  formSelector: "#profile-edit-form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});

profileEditFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator({
  formSelector: "#add-place-form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});

addPlaceFormValidator.enableValidation();
