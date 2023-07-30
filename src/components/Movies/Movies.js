import "./Movies.css";
import React, { useState, useEffect } from "react";
import { filterMovies, filterDuration } from "../../utils/utils";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import movies from "../../utils/arrayMovie";
import Footer from "../Footer/Footer";
import MoviesApi from "../../utils/MoviesApi";

export default function Movies() {
  const [cards, setCards] = useState([]); //отфильтрованный массив по запросу
  const [filteredCardsByCheckbox, setFilteredCardsByCheckbox] = useState([]); //отфильтрованный массив по запросу и чекбоксу
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены
  const [isErrorSearch, setIsErrorSearch] = useState(false); //ошибка сервера
  const [isShortMovies, setIsShortMovies] = useState(false); //переключение чекбокса
  const [isAllMovies, setIsAllMovies] = useState([]);
  //фильт массива по запросу
  function handleFilterMovies(movies, value, short) {
    const moviesList = filterMovies(movies, value, short);
    if (moviesList.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setCards(moviesList); //записываем в стейт
    setFilteredCardsByCheckbox(short ? filterDuration(moviesList) : moviesList);

    localStorage.setItem("moviesAll", JSON.stringify(movies)); //сохраняем полныймассив
    localStorage.setItem("movies", JSON.stringify(moviesList)); //сохраняем  отфильтрованныймассив
    // localStorage.setItem("value", JSON.stringify(value));
  }

  // состояние чекбокса
  function handleShortFilms(event) {
    setIsShortMovies(event.target.checked);
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      setFilteredCardsByCheckbox(filterDuration(cards));
    } else {
      setFilteredCardsByCheckbox(cards);
    }
    localStorage.setItem(`short`, !isShortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(`short`) === "true") {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  function sumbitMovies(value) {
    console.log(value);
    localStorage.setItem(`movieSearch`, value);
    localStorage.setItem(`short`, isShortMovies);

    if (isAllMovies.length === 0) {
      setIsLoading(true);
      MoviesApi.getCards()
        .then((cards) => {
          setIsAllMovies(cards);
          handleFilterMovies(cards, value, isShortMovies);
        })
        .catch((err) => {
          console.log(err);
          setIsErrorSearch(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleFilterMovies(isAllMovies, value, isShortMovies);
    }

    // setNewCards(filterMovies(cards, value));
  }

  useEffect(() => {
    console.log("hhh");
    if (localStorage.getItem(`movies`)) {
      const movies = JSON.parse(localStorage.getItem(`movies`));
      setCards(movies);
      if (localStorage.getItem(`short`) === "true") {
        setFilteredCardsByCheckbox(filterDuration(movies));
      } else {
        setFilteredCardsByCheckbox(movies);
      }
    }
  }, []);

  return (
    <section className="movies">
      <Header />
      <SearchForm
        sumbitMovies={sumbitMovies}
        handleShortFilms={handleShortFilms}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        movies={filteredCardsByCheckbox}
        isLoading={isLoading}
        isNotFound={isNotFound}
        isErrorSearch={isErrorSearch}
      />
      <Footer />
    </section>
  );
}
