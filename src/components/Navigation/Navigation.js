import React from "react";
import "./Navigation.css";
import account from "../../images/icon-account.png";
import { Link, NavLink } from "react-router-dom";
import icon from "../../images/icon-closed.png";

function Navigation({ handleClose }) {
  return (
    <nav className="navigation">
      <div className="navigation__container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navigation__navlink ${
              isActive ? "navigation__navlink_active" : "navigation__navlink"
            }`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `navigation__navlink ${
              isActive ? "navigation__navlink_active" : "navigation__navlink"
            }`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `navigation__navlink ${
              isActive ? "navigation__navlink_active" : "navigation__navlink"
            }`
          }
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <div className="navigation__button-container">
        <Link to="#" className="navigation__account-link">
          Аккаунт
        </Link>
        <button className="navigation__account-button">
          <img src={account} alt="аккаунт" />
        </button>
      </div>
      <button className="navigation__close-button" onClick={handleClose}>
        <img src={icon} alt="иконка-закрытия" />
      </button>
    </nav>
  );
}

export default Navigation;
