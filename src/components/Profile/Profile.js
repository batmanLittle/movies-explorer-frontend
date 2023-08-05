import "./Profile.css";
import { currentUserContext } from "../../contexts/CurrentUserContext.js";
import React, { useContext, useEffect } from "react";
import { useFormValidation } from "../hooks/useFormValidation";

function Profile({ logOut, updateUser, errorMesage, setErrorMessage }) {
  const currentUser = useContext(currentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  //Отправляем данные на сервер
  function handleSubmit(e) {
    e.preventDefault();
    updateUser({
      name: values.name,
      email: values.email,
    });
    setErrorMessage("");
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const requireValidity =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);
  return (
    <section className="profile">
      <div className="profile__block">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form className="profile__form" noValidate onSubmit={handleSubmit}>
          <label className="profile__label profile__label_border">
            Имя
            <input
              className="profile__input"
              type="name"
              name="name"
              id="name"
              value={values.name || ""}
              onChange={handleChange}
              required
              pattern="[a-zA-ZА-яёЁ\-\s]*"
              minLength="2"
              maxLength="30"
              // defaultValue={currentUser.name}
            />
            <span className="profile___input-error">{errors.name}</span>
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              value={values.email || ""}
              onChange={handleChange}
              minLength="2"
              maxLength="40"
              required
              // defaultValue={currentUser.email}
            />
            <span className="profile___input-email">{errors.email}</span>
          </label>
          <span className="profile__error-server">{errorMesage}</span>
          <button
            className={
              requireValidity
                ? "profile__buttom profile__buttom-disabled"
                : "profile__buttom"
            }
            type="submit"
            disabled={requireValidity ? true : false}
          >
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
