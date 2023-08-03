import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({ logOut }) {
  return (
    <section className="profile">
      <div className="profile__block">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <label className="profile__label profile__label_border">
            Имя
            <input
              className="profile__input"
              type="name"
              placeholder=""
              name="name"
              id="name"
              defaultValue="Виталий"
              required
            />
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              placeholder=""
              name="email"
              id="email"
              defaultValue="pochta@yandex.ru"
              required
            />
          </label>
          <button className="profile__buttom" type="submit">
            Редактировать
          </button>

          <button className="profile__link" onClick={logOut}>
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
