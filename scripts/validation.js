document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profile-edit-form");
  const addPlaceForm = document.getElementById("add-place-form");

  if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateProfileForm()) {
      }
    });

    const profileTitleInput = document.getElementById("profile-title-input");
    const profileDescriptionInput = document.getElementById(
      "profile-description-input"
    );

    profileTitleInput.addEventListener("input", validateProfileForm);
    profileDescriptionInput.addEventListener("input", validateProfileForm);
  }

  if (addPlaceForm) {
    addPlaceForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateAddPlaceForm()) {
      }
    });

    const placeTitleInput = document.getElementById("place-title-input");
    const placeLinkInput = document.getElementById("place-link-input");

    placeTitleInput.addEventListener("input", validateAddPlaceForm);
    placeLinkInput.addEventListener("input", validateAddPlaceForm);
  }
});

function validateProfileForm() {
  const profileTitleInput = document.getElementById("profile-title-input");
  const profileDescriptionInput = document.getElementById(
    "profile-description-input"
  );

  const titleError = document.querySelector(".profile-title-input-error");
  const descriptionError = document.querySelector(
    ".profile-description-input-error"
  );

  let isValid = true;

  if (!profileTitleInput.validity.valid) {
    titleError.textContent = profileTitleInput.validationMessage;
    titleError.classList.add("modal__error_visible");
    isValid = false;
  } else {
    titleError.textContent = "";
    titleError.classList.remove("modal__error_visible");
  }

  if (!profileDescriptionInput.validity.valid) {
    descriptionError.textContent = profileDescriptionInput.validationMessage;
    descriptionError.classList.add("modal__error_visible");
    isValid = false;
  } else {
    descriptionError.textContent = "";
    descriptionError.classList.remove("modal__error_visible");
  }

  toggleSaveButton(document.getElementById("profile-edit-modal"), isValid);

  return isValid;
}

function validateAddPlaceForm() {
  const placeTitleInput = document.getElementById("place-title-input");
  const placeLinkInput = document.getElementById("place-link-input");

  const titleError = document.querySelector(".place-title-input-error");
  const linkError = document.querySelector(".place-link-input-error");

  let isValid = true;

  if (!placeTitleInput.validity.valid) {
    titleError.textContent = placeTitleInput.validationMessage;
    titleError.classList.add("modal__error_visible");
    isValid = false;
  } else {
    titleError.textContent = "";
    titleError.classList.remove("modal__error_visible");
  }

  if (!isValidUrl(placeLinkInput.value)) {
    linkError.textContent = "Please enter a valid URL.";
    linkError.classList.add("modal__error_visible");
    isValid = false;
  } else {
    linkError.textContent = "";
    linkError.classList.remove("modal__error_visible");
  }

  toggleSaveButton(document.getElementById("add-place-modal"), isValid);

  return isValid;
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function toggleSaveButton(modal, isValid) {
  const saveButton = modal.querySelector(".modal__button");
  if (isValid) {
    saveButton.classList.remove("modal__button_disabled");
    saveButton.disabled = false;
  } else {
    saveButton.classList.add("modal__button_disabled");
    saveButton.disabled = true;
  }
}
