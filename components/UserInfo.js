class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    if (name) {
      this._userNameElement.textContent = name;
    }
    if (job) {
      this._userJobElement.textContent = job;
    }
    console.log("Updated User Info:", { name, job });
  }
}

export default UserInfo;
