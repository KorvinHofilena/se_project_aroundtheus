import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  userProfileSelectors,
  cardTemplateSelector,
  containerSelector,
} from "../utils/constants.js";

const profileEditButton = document.getElementById("profile-edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const profileEditForm = document.getElementById("profile-edit-form");
const addPlaceForm = document.getElementById("add-place-form");
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);
const placeTitleInput = document.getElementById("place-title-input");
const placeLinkInput = document.getElementById("place-link-input");

const userInfo = new UserInfo(userProfileSelectors);

const profilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo(formData);
  profilePopup.close();
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm("#add-place-modal", (formData) => {
  const cardElement = createCard(formData);
  cardSection.addItem(cardElement);
  cardPopup.close();
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-view-modal");
imagePopup.setEventListeners();

function createCard(data) {
  console.log("Creating card:", data);
  const card = new Card(data, cardTemplateSelector, () => {
    imagePopup.open(data);
  });
  const cardElement = card.generateCard();
  console.log("Generated card element:", cardElement);
  return cardElement;
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      console.log("Rendering item:", item);
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  containerSelector
);

cardSection.renderItems();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profilePopup.open();
});

addPlaceButton.addEventListener("click", () => {
  cardPopup.open();
});

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, addPlaceForm);
addPlaceFormValidator.enableValidation();
