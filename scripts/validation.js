function validateProfileForm(event) {
  event.preventDefault();

  const profileTitleInput = document.getElementById("profile-title-input");
  const profileDescriptionInput = document.getElementById(
    "profile-description-input"
  );

  const titleValue = profileTitleInput.value.trim();
  const descriptionValue = profileDescriptionInput.value.trim();

  const titleError = document.querySelector(".profile-title-input-error");
  const descriptionError = document.querySelector(
    ".profile-description-input-error"
  );

  let isValid = true;

  if (titleValue.length < 2 || titleValue.length > 40) {
    titleError.textContent = "Title must be between 2 and 40 characters";
    isValid = false;
  } else {
    titleError.textContent = "";
  }

  if (descriptionValue.length < 2 || descriptionValue.length > 200) {
    descriptionError.textContent =
      "Description must be between 2 and 200 characters";
    isValid = false;
  } else {
    descriptionError.textContent = "";
  }

  if (isValid) {
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = titleValue;
    profileDescription.textContent = descriptionValue;

    const profileEditModal = document.getElementById("profile-edit-modal");
    closeModal(profileEditModal);
  }
}

function validateAddPlaceForm(event) {
  event.preventDefault();

  const placeTitleInput = document.getElementById("place-title-input");
  const placeLinkInput = document.getElementById("place-link-input");

  const titleValue = placeTitleInput.value.trim();
  const linkValue = placeLinkInput.value.trim();

  const titleError = document.querySelector(".place-title-input-error");
  const linkError = document.querySelector(".place-link-input-error");

  let isValid = true;

  if (titleValue.length < 1 || titleValue.length > 30) {
    titleError.textContent = "Title must be between 1 and 30 characters";
    isValid = false;
  } else {
    titleError.textContent = "";
  }

  if (!isValidUrl(linkValue)) {
    linkError.textContent = "Please enter a valid URL";
    isValid = false;
  } else {
    linkError.textContent = "";
  }

  if (isValid) {
    const newCard = {
      name: titleValue,
      link: linkValue,
    };
    const cardElement = createCard(newCard);
    const cardList = document.querySelector(".cards__list");
    cardList.prepend(cardElement);

    const addPlaceForm = document.getElementById("add-place-form");
    addPlaceForm.reset();

    const addPlaceModal = document.getElementById("add-place-modal");
    closeModal(addPlaceModal);
  }
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
