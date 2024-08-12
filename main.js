document.addEventListener("DOMContentLoaded", () => {
  const profileEditButton = document.getElementById("profile-edit-button");
  const profileEditModal = document.getElementById("profile-edit-modal");
  const profileEditCloseButton = document.querySelector(
    "#profile-edit-modal .modal__close-button"
  );

  if (profileEditButton) {
    profileEditButton.addEventListener("click", () => {
      profileEditModal.classList.add("modal_open");
    });
  }

  if (profileEditCloseButton) {
    profileEditCloseButton.addEventListener("click", () => {
      profileEditModal.classList.remove("modal_open");
    });
  }

  const addPlaceButton = document.querySelector(".profile__add-button");
  const addPlaceModal = document.getElementById("add-place-modal");
  const addPlaceCloseButton = document.querySelector(
    "#add-place-modal .modal__close-button"
  );

  if (addPlaceButton) {
    addPlaceButton.addEventListener("click", () => {
      addPlaceModal.classList.add("modal_open");
    });
  }

  if (addPlaceCloseButton) {
    addPlaceCloseButton.addEventListener("click", () => {
      addPlaceModal.classList.remove("modal_open");
    });
  }

  const imageViewCloseButton = document.querySelector(
    "#image-view-modal .modal__close-button"
  );

  if (imageViewCloseButton) {
    imageViewCloseButton.addEventListener("click", () => {
      document
        .getElementById("image-view-modal")
        .classList.remove("modal_open");
    });
  }

  const profileEditForm = document.getElementById("profile-edit-form");

  if (profileEditForm) {
    profileEditForm.addEventListener("submit", (event) => {
      const nameInput = document.getElementById("profile-title-input");
      const aboutInput = document.getElementById("profile-description-input");

      if (nameInput.value.trim() === "" || aboutInput.value.trim() === "") {
        event.preventDefault();
        alert("Please fill in all required fields.");
      }
    });
  }

  const addPlaceForm = document.getElementById("add-place-form");

  if (addPlaceForm) {
    addPlaceForm.addEventListener("submit", (event) => {
      const titleInput = document.getElementById("place-title-input");
      const linkInput = document.getElementById("place-link-input");

      if (titleInput.value.trim() === "" || linkInput.value.trim() === "") {
        event.preventDefault();
        alert("Please fill in all required fields.");
      }
    });
  }

  const cardsList = document.querySelector(".cards__list");

  if (cardsList) {
    const cards = [
      { title: "Card 1", imageUrl: "path/to/image1.jpg" },
      { title: "Card 2", imageUrl: "path/to/image2.jpg" },
    ];

    cards.forEach((card) => {
      const cardElement = document.createElement("li");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
          <img src="${card.imageUrl}" alt="${card.title}" class="card__image" />
          <div class="card__description">
            <h2 class="card__title">${card.title}</h2>
            <button type="button" class="card__like-button"></button>
            <button type="button" class="card__delete-button"></button>
          </div>
        `;
      cardsList.appendChild(cardElement);
    });
  }
});
