class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);

    console.log("UserName Element:", this._userNameElement);
    console.log("UserJob Element:", this._userJobElement);
  }

  getUserInfo() {
    return {
      name: this._userNameElement
        ? this._userNameElement.textContent
        : "No user name",
      job: this._userJobElement
        ? this._userJobElement.textContent
        : "No job description",
    };
  }

  setUserInfo({ name, job }) {
    if (this._userNameElement) this._userNameElement.textContent = name;
    if (this._userJobElement) this._userJobElement.textContent = job;
  }
}

export default UserInfo;
