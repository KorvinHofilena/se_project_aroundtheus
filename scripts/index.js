const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModal = document.querySelector("#profile-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#profile-edit-form");

const addPlaceButton = document.querySelector(".profile__add-button");
const addPlaceModal = document.querySelector("#add-place-modal");
const addPlaceCloseButton = document.querySelector("#add-place-close-modal");
const addPlaceForm = document.querySelector("#add-place-form");
const placeTitleInput = document.querySelector("#place-title-input");
const placeLinkInput = document.querySelector("#place-link-input");

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

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
  document.removeEventListener("mousedown", handleOutsideClickClose);
  setTimeout(() => {
    popup.style.display = "none";
  }, 300);
}

function openPopup(popup) {
  popup.style.display = "flex";
  setTimeout(() => {
    popup.classList.add("modal_opened");
  }, 0);
  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("mousedown", handleOutsideClickClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

function handleOutsideClickClose(evt) {
  const openPopup = document.querySelector(".modal_opened");
  if (
    openPopup &&
    !openPopup.querySelector(".modal__container").contains(evt.target)
  ) {
    closePopup(openPopup);
  }
}

function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  errorElement.classList.add("modal__error_visible");
  input.classList.add("modal__input_invalid");
}

function hideError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  errorElement.classList.remove("modal__error_visible");
  input.classList.remove("modal__input_invalid");
}

function validateInput(input) {
  if (!input.validity.valid) {
    showError(input, input.validationMessage);
  } else {
    hideError(input);
  }
  toggleSubmitButtonState(input.closest("form"));
}

function toggleSubmitButtonState(form) {
  const submitButton = form.querySelector(".modal__save-button");
  const isFormValid = form.checkValidity();
  submitButton.disabled = !isFormValid;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
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
    cardDeleteButton.closest(".card").remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    openImageViewModal(cardData.link, cardData.name);
  });

  return cardElement;
}

const imageViewModal = document.querySelector("#image-view-modal");
const modalImage = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");

function openImageViewModal(link, name) {
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openPopup(imageViewModal);
}

function closeImageViewModal() {
  closePopup(imageViewModal);
}

document
  .querySelector("#image-view-close-modal")
  .addEventListener("click", closeImageViewModal);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileCloseModal.addEventListener("click", () => closePopup(profileEditModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListEl.prepend(cardElement);
});

addPlaceButton.addEventListener("click", openAddPlaceModal);
addPlaceCloseButton.addEventListener("click", closeAddPlaceModal);
addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);

function openAddPlaceModal() {
  openPopup(addPlaceModal);
  toggleSubmitButtonState(addPlaceForm);
}

function closeAddPlaceModal() {
  closePopup(addPlaceModal);
  addPlaceForm.reset();
  document.querySelectorAll(".modal__input").forEach(hideError);
}

function handleAddPlaceSubmit(e) {
  e.preventDefault();
  const name = placeTitleInput.value;
  const link = placeLinkInput.value;
  const cardElement = getCardElement({ name, link });
  cardsListEl.prepend(cardElement);
  closeAddPlaceModal();
}

document.querySelectorAll(".modal__input").forEach((input) => {
  input.addEventListener("input", () => {
    validateInput(input);
  });
});

document.querySelectorAll("form").forEach((form) => {
  toggleSubmitButtonState(form);
});
