import "./Login.css";
import headerLogo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidation";
import React, { useEffect } from "react";

export default function Login({
  loginUser,
  errorMesage,
  setErrorMessage,
  isActiveFormBtn,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  //Отправляем данные на сервер
  function handleSubmit(e) {
    e.preventDefault();
    loginUser({
      email: values.email,
      password: values.password,
    });
    setErrorMessage("");
  }

  //сброс формы
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="login">
      <div className="login__block">
        <Link to="/" className="login__logo">
          <img src={headerLogo} alt="Логотип" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">
            E-mail
            <span className="login__input-error">{errors.email}</span>
          </label>
          <input
            className="login__input"
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <label className="login__label">
            Пароль
            <span className="login__input-error">{errors.password}</span>
          </label>
          <input
            className="register__input"
            type="password"
            placeholder="пароль"
            name="password"
            id="password"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
          <span className="login__error-server">{errorMesage}</span>

          <button
            className={
              !isValid
                ? "login__buttom login__buttom-disabled"
                : "login__buttom"
            }
            type="submit"
            disabled={!isValid || !isActiveFormBtn}
          >
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
