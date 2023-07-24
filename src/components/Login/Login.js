import "./Login.css";
import headerLogo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login">
      <div className="login__block">
        <img className="login__logo" src={headerLogo} alt="Логотип" />
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form">
          <label className="login__label">E-mail</label>
          <input
            className="login__input"
            type="email"
            placeholder="email"
            name="email"
            id="email"
            required
          />
          <label className="login__label">Пароль</label>
          <input
            className="register__input"
            type="password"
            placeholder="пароль"
            name="password"
            id="password"
            required
          />

          <button className="login__buttom" type="submit">
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link className="login__link" to="/signup">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
