function validateProfileForm() {
  const profileTitleInput = document.getElementById("profile-title-input");
  const profileDescriptionInput = document.getElementById(
    "profile-description-input"
  );
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const titleValue = profileTitleInput.value.trim();
  const descriptionValue = profileDescriptionInput.value.trim();

  if (titleValue.length < 2 || titleValue.length > 40) {
    const titleError = document.querySelector(".profile-title-input-error");
    titleError.textContent = "Title must be between 2 and 40 characters";
    return;
  }

  if (descriptionValue.length < 2 || descriptionValue.length > 200) {
    const descriptionError = document.querySelector(
      ".profile-description-input-error"
    );
    descriptionError.textContent =
      "Description must be between 2 and 200 characters";
    return;
  }

  profileTitle.textContent = titleValue;
  profileDescription.textContent = descriptionValue;

  const profileEditModal = document.getElementById("profile-edit-modal");
  closeModal(profileEditModal);
}

function validateAddPlaceForm() {
  const placeTitleInput = document.getElementById("place-title-input");
  const placeLinkInput = document.getElementById("place-link-input");

  const titleValue = placeTitleInput.value.trim();
  const linkValue = placeLinkInput.value.trim();

  if (titleValue.length < 1 || titleValue.length > 30) {
    const titleError = document.querySelector(".place-title-input-error");
    titleError.textContent = "Title must be between 1 and 30 characters";
    return;
  }

  if (!isValidUrl(linkValue)) {
    const linkError = document.querySelector(".place-link-input-error");
    linkError.textContent = "Please enter a valid URL";
    return;
  }

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

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
