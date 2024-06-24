document.addEventListener("DOMContentLoaded", function () {
  const profileEditButton = document.getElementById("profile-edit-button");
  const profileCloseButton = document.getElementById("profile-close-modal");
  const profileEditModal = document.getElementById("profile-edit-modal");
  const profileEditForm = document.getElementById("profile-edit-form");
  const profileTitleInput = document.getElementById("profile-title-input");
  const profileDescriptionInput = document.getElementById(
    "profile-description-input"
  );
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const addPlaceButton = document.querySelector(".profile__add-button");
  const addPlaceModal = document.getElementById("add-place-modal");
  const addPlaceCloseButton = document.getElementById("add-place-close-modal");
  const addPlaceForm = document.getElementById("add-place-form");
  const placeTitleInput = document.getElementById("place-title-input");
  const placeLinkInput = document.getElementById("place-link-input");

  const imageViewModal = document.getElementById("image-view-modal");
  const imageViewCloseButton = document.getElementById(
    "image-view-close-button"
  );
  const modalImage = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");

  const cardTemplate = document
    .getElementById("card-template")
    .content.querySelector(".card");
  const cardList = document.querySelector(".cards__list");

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
    modal.addEventListener("click", handleClickOutsideClose);

    if (modal === profileEditModal) {
      profileTitleInput.value = profileTitle.textContent;
      profileDescriptionInput.value = profileDescription.textContent;
      validateProfileForm();
    } else if (modal === addPlaceModal) {
      addPlaceForm.reset();
      const addButton = addPlaceModal.querySelector(".modal__button");
      addButton.disabled = true;
      addButton.classList.add("modal__button_disabled");
      validateAddPlaceForm();
    }
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
    modal.removeEventListener("click", handleClickOutsideClose);
  }

  function handleEscClose(event) {
    if (event.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closeModal(openedModal);
    }
  }

  function handleClickOutsideClose(event) {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  }

  function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_active");
    });

    cardDeleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    cardImage.addEventListener("click", () => {
      modalImage.src = data.link;
      modalImage.alt = data.name;
      modalCaption.textContent = data.name;
      openModal(imageViewModal);
    });

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardList.append(cardElement);
  });

  profileEditButton.addEventListener("click", () => {
    openModal(profileEditModal);
  });

  profileCloseButton.addEventListener("click", () => {
    closeModal(profileEditModal);
  });

  profileEditForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateProfileForm()) {
      profileTitle.textContent = profileTitleInput.value;
      profileDescription.textContent = profileDescriptionInput.value;
      closeModal(profileEditModal);
    }
  });

  addPlaceButton.addEventListener("click", () => {
    openModal(addPlaceModal);
  });

  addPlaceCloseButton.addEventListener("click", () => {
    closeModal(addPlaceModal);
  });

  addPlaceForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateAddPlaceForm()) {
      const newCard = createCard({
        name: placeTitleInput.value,
        link: placeLinkInput.value,
      });
      cardList.prepend(newCard);
      closeModal(addPlaceModal);
    }
  });

  imageViewCloseButton.addEventListener("click", () => {
    closeModal(imageViewModal);
  });

  profileTitleInput.addEventListener("input", () => {
    toggleSaveButton(profileEditModal);
  });

  profileDescriptionInput.addEventListener("input", () => {
    toggleSaveButton(profileEditModal);
  });

  placeTitleInput.addEventListener("input", () => {
    toggleSaveButton(addPlaceModal);
  });

  placeLinkInput.addEventListener("input", () => {
    toggleSaveButton(addPlaceModal);
  });

  function toggleSaveButton(modal) {
    const saveButton = modal.querySelector(".modal__button");
    const isProfileForm = modal === profileEditModal;
    const isAddPlaceForm = modal === addPlaceModal;

    let isFormValid;
    if (isProfileForm) {
      isFormValid = validateProfileForm();
    } else if (isAddPlaceForm) {
      isFormValid = validateAddPlaceForm();
    }

    saveButton.disabled = !isFormValid;
    if (isFormValid) {
      saveButton.classList.remove("modal__button_disabled");
    } else {
      saveButton.classList.add("modal__button_disabled");
    }
  }
});
