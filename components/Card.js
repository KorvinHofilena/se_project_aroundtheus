class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    // Retrieves the card template from the DOM
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleDelete = () => {
    // Removes the card element from the DOM
    this._element.remove();
    this._element = null;
  };

  _handleLikeButton = () => {
    // Toggles the like button state
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _setEventListeners() {
    // Adds necessary event listeners for the card
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
    this._deleteButton.addEventListener("click", this._handleDelete);
    this._likeButton.addEventListener("click", this._handleLikeButton);
  }

  generateCard() {
    // Constructs the card element with data and listeners
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._element.querySelector(".card__title").textContent = this._data.name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
