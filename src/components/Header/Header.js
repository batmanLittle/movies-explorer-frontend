import React, { useState } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import account from "../../images/icon-account.png";
import menu from "../../images/icon-menu.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  const location = useLocation();
  const [isMiniMenuOpened, setIsMiniMenuOpened] = useState(false);

  function handleClose() {
    setIsMiniMenuOpened(false);
  }

  function handleOpen() {
    setIsMiniMenuOpened(true);
  }
  return (
    <>
      {location.pathname === "/" ? (
        <header className="header header__promo">
          <div className="header__block">
            <Link to="/" className="header__logo">
              <img src={logo} alt="Логотип" />
            </Link>
            <nav className="header__container">
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>

              <Link to="/signin" className="header__button" type="button">
                Войти
              </Link>
            </nav>
          </div>
        </header>
      ) : (
        <header className="header">
          <div className="header__block">
            <Link to="/" className="header__logo">
              <img src={logo} alt="Логотип" />
            </Link>
            <nav className="header__container header__container-none">
              <div className="header__menu">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    `header__navlink ${
                      isActive ? "header__navlink_active" : "header__navlink"
                    }`
                  }
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    `header__navlink ${
                      isActive ? "header__navlink_active" : "header__navlink"
                    }`
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </div>
              <div className="header__button-container">
                <Link to="/profile" className="header__account-link">
                  Аккаунт
                </Link>
                <button className="header__account-button">
                  <img src={account} alt="аккаунт" />
                </button>
              </div>
            </nav>
            <button className="header__menu-button" onClick={handleOpen}>
              <img className="header__menu-img" src={menu} alt="меню" />
            </button>
            {isMiniMenuOpened ? <Navigation handleClose={handleClose} /> : ""}
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
