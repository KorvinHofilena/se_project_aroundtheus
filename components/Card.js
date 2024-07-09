export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._element.remove();
      });
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._element
          .querySelector(".card__like-button")
          .classList.toggle("card__like-button_active");
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector(".card__image");
    this._element.querySelector(".card__title").textContent = this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;

    this._setEventListeners();
    return this._element;
  }
}
