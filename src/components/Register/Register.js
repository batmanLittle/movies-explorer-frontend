import "./Register.css";
import React, { useEffect } from "react";
import headerLogo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidation";

export default function Register({
  registerUser,
  errorMesage,
  setErrorMessage,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  //Отправляем данные на сервер
  function handleSubmit(e) {
    e.preventDefault();
    registerUser({
      name: values.name,
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
    <section className="register">
      <div className="register__block">
        <Link to="/" className="register__logo">
          <img src={headerLogo} alt="Логотип" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <label className="register__label">
            Имя
            <span className="register__input-error">{errors.name}</span>
          </label>
          <input
            className={
              errors.name
                ? "register__input register__input-color"
                : "register__input"
            }
            type="text"
            name="name"
            id="name"
            required
            value={values.name || ""}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            pattern="[a-zA-ZА-яёЁ\-\s]*"
          />

          <label className="register__label">
            E-mail
            <span className="register__input-error">{errors.email}</span>
          </label>
          <input
            className={
              errors.email
                ? "register__input register__input-color"
                : "register__input"
            }
            type="email"
            name="email"
            id="email"
            minLength="2"
            maxLength="40"
            required
            value={values.email || ""}
            onChange={handleChange}
          />

          <label className="register__label">
            Пароль
            <span className="register__input-error">{errors.password}</span>
          </label>
          <input
            className={
              errors.password
                ? "register__input register__input-color"
                : "register__input"
            }
            type="password"
            name="password"
            id="password"
            required
            value={values.password || ""}
            onChange={handleChange}
            minLength={3}
          />
          <span className="register__error-server">{errorMesage}</span>
          <button
            className={
              !isValid
                ? "register__buttom register__buttom-disabled"
                : "register__buttom"
            }
            type="submit"
            disabled={!isValid}
          >
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
