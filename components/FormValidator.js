function FormValidator(settings) {
  this._settings = settings;
  this._formElement = document.querySelector(this._settings.formSelector);

  if (!this._formElement) {
    console.error(
      `Form element not found for selector: ${this._settings.formSelector}`
    );
    return;
  }
}

FormValidator.prototype._showInputError = function (
  inputElement,
  errorMessage
) {
  const errorElement = this._formElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.add(this._settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._settings.errorClass);
};

FormValidator.prototype._hideInputError = function (inputElement) {
  const errorElement = this._formElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.remove(this._settings.inputErrorClass);
  errorElement.classList.remove(this._settings.errorClass);
  errorElement.textContent = "";
};

FormValidator.prototype._checkInputValidity = function (inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

FormValidator.prototype._setEventListeners = function () {
  const _this = this;

  const inputList = Array.from(
    this._formElement.querySelectorAll(this._settings.inputSelector)
  );
  const buttonElement = this._formElement.querySelector(
    this._settings.submitButtonSelector
  );

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      _this._checkInputValidity(inputElement);
      _this._toggleButtonState(inputList, buttonElement);
    });
  });

  this._toggleButtonState(inputList, buttonElement);
};

FormValidator.prototype._hasInvalidInput = function (inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

FormValidator.prototype._toggleButtonState = function (
  inputList,
  buttonElement
) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

FormValidator.prototype.resetValidation = function () {
  const inputList = Array.from(
    this._formElement.querySelectorAll(this._settings.inputSelector)
  );
  inputList.forEach(function (inputElement) {
    this._hideInputError(inputElement);
  }, this);
  const buttonElement = this._formElement.querySelector(
    this._settings.submitButtonSelector
  );
  this._toggleButtonState(inputList, buttonElement);
};

FormValidator.prototype.enableValidation = function () {
  const _this = this;

  this._formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  this._setEventListeners();
};
