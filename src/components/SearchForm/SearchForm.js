import React, { useState } from "react";
import "./SearchForm.css";
import icon from "../../images/icon-search.svg";
import sumbit from "../../images/icon-search2.svg";

function SearchForm({ sumbitMovies }) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    sumbitMovies();
  }
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__block">
            <div className="search__form-movie">
              <img className="search__img" src={icon} alt="иконка поиска" />
              <input
                placeholder="Фильм"
                className="search__input"
                onChange={handleChange}
                name="search"
                type="text"
              ></input>
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
