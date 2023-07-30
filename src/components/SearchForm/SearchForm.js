import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import icon from "../../images/icon-search.svg";
import sumbit from "../../images/icon-search2.svg";

function SearchForm({ sumbitMovies, isShortMovies, handleShortFilms }) {
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState(false);

  function handleChange(event) {
    setValue(event.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim().length === 0) {
      setValueError(true);
    } else {
      setValueError(false);
      sumbitMovies(value);
    }
  }
  useEffect(() => {
    console.log(localStorage.getItem(`movieSearch`));
    if (localStorage.getItem(`movieSearch`)) {
      const value = localStorage.getItem(`movieSearch`);
      setValue(value);
    }
  }, []);

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
                value={value || ""}
              ></input>
              {valueError && (
                <span className="search__form-error">
                  Нужно ввести ключевое слово
                </span>
              )}
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
              onChange={handleShortFilms}
              checked={isShortMovies}
            />
            <label className="search__slider">Короткометражки</label>
          </div>
        </form>
      </div>
    </section>
  );
}
export default SearchForm;
