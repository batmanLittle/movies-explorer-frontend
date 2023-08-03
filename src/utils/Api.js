class Api {
  constructor(basePath) {
    this._basePath = basePath;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCurrentUser() {
    return fetch(`${this._basePath}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._getJson(res));
  }
}

const api = new Api("https://batman.nomoreparties.sbs");
export default api;
