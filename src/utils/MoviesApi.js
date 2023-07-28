class MoviesApi {
  constructor(basePath) {
    this._basePath = basePath;
  }
  _getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    };
  }
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._basePath}/beatfilm-movies`, {
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
}
const api = new MoviesApi(
  // "http://localhost:3001"
  "https://api.nomoreparties.co"
);
export default api;
