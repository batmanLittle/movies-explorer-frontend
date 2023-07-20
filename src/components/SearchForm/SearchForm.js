import React from "react";
import "./SearchForm.css";
import icon from "../../images/search-icon.png";
import sumbit from "../../images/icon-search2.png";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__block">
            <div className="search__form-movie">
              <img className="search__img" src={icon} alt="иконка поиска" />
              <input placeholder="Фильм" className="search__input"></input>
            </div>
            <button className="search__button" type="submit">
              <img src={sumbit} alt="кнопка" />
            </button>
          </div>
          <div className="search__form-toggle">
            <input
              className="search__checkbox"
              type="checkbox"
              id="toggle-button"
            />
            <label className="search__slider">Короткометражки</label>
          </div>
        </form>
      </div>
    </section>
  );
}
export default SearchForm;
