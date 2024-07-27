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

const profilePopup = new PopupWithForm(".popup_type_profile", (formData) => {
  userInfo.setUserInfo(formData);
  profilePopup.close();
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(".popup_type_new-card", (formData) => {
  const cardElement = createCard(formData);
  cardSection.addItem(cardElement);
  cardPopup.close();
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, () => {
    imagePopup.open(data);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
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
