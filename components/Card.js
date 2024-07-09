function Card(data, cardSelector, handleImageClick) {
  this._data = data;
  this._cardSelector = cardSelector;
  this._handleImageClick = handleImageClick;
}

Card.prototype._getTemplate = function () {
  const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector(".card")
    .cloneNode(true);

  return cardElement;
};

Card.prototype._setEventListeners = function () {
  const _this = this;

  this._element
    .querySelector(".card__image")
    .addEventListener("click", function () {
      _this._handleImageClick(_this._data);
    });

  this._element
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      _this._element.remove();
    });

  this._element
    .querySelector(".card__like-button")
    .addEventListener("click", function () {
      _this._element
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    });
};

Card.prototype.generateCard = function () {
  this._element = this._getTemplate();
  this._element.querySelector(".card__image").src = this._data.link;
  this._element.querySelector(".card__image").alt = this._data.name;
  this._element.querySelector(".card__title").textContent = this._data.name;

  this._setEventListeners();

  return this._element;
};
