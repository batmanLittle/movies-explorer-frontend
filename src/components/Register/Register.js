import "./Register.css";
import headerLogo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="register">
      <div className="register__block">
        <img className="register__logo" src={headerLogo} alt="Логотип" />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form">
          <label className="register__label">Имя</label>
          <input
            className="register__input"
            type="text"
            placeholder="name"
            name="name"
            id="name"
            required
          />
          <label className="register__label">E-mail</label>
          <input
            className="register__input"
            type="email"
            placeholder="email"
            name="email"
            id="email"
            minLength="2"
            maxLength="40"
            required
          />
          <label className="register__label">Пароль</label>
          <input
            className="register__input"
            type="password"
            placeholder="пароль"
            name="password"
            id="password"
            required
          />

          <button className="register__buttom" type="submit">
            Зарегистрироваться
          </button>
          <p className="register__text">
            Уже зарегистрированы?
            <Link className="register__link" to="/signin">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
