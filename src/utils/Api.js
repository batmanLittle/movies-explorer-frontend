class Api {
  constructor(basePath) {
    this._basePath = basePath;
  }
  _getHeaders() {
    return {
      "Content-type": "application/json",
      authorization: this._token,
    };
  }
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  updateUser(data) {
    return fetch(`${this._basePath}/profile`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._getJson);
  }
}

const api = new Api("https://batman.nomoreparties.sbs");
export default api;
