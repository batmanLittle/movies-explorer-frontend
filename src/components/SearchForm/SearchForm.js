import React, { useState, useEffect, useContext } from "react";
import "./SearchForm.css";
import icon from "../../images/icon-search.svg";
import sumbit from "../../images/icon-search2.svg";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearch, value, checkBox }) {
  const [valueInput, setValueInput] = useState(value || ""); //состояние импута
  const [valueError, setValueError] = useState(false); //состояние ошибки импута
  const [isChecked, setIsChecked] = useState(checkBox || false);
  // const currentUser = useContext(currentUserContext);
  const location = useLocation();
  const locationSavedMovies = location.pathname === "/saved-movies";

  const handleCheckboxChange = (evt) => {
    setIsChecked(evt.target.checked);
    submit(evt.target.checked);
  };

  function handleChange(event) {
    setValueInput(event.target.value);
  }

  const submit = (checked) => {
    if (locationSavedMovies) {
      onSearch(valueInput, checked);
    } else {
      valueInput < 1 && setValueError(true);
      onSearch(valueInput, checked);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(isChecked);
  };

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
                value={valueInput}
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
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
            <label className="search__slider">Короткометражки</label>
          </div>
        </form>
      </div>
    </section>
  );
}
export default SearchForm;
