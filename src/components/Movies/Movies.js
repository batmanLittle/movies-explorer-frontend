import "./Movies.css";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoviesApi from "../../utils/MoviesApi";

export default function Movies({ onLikeClick, savedMovies }) {
  const [cards, setCards] = useState([]); //отфильтрованный массив по запросу
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены
  const [isErrorSearch, setIsErrorSearch] = useState(false); //ошибка сервера
  const [isAllMovies, setIsAllMovies] = useState([]); //все фильмы изначально
  const value = JSON.parse(localStorage.getItem("value")) || "";
  const short = JSON.parse(localStorage.getItem("short")) || false;

  useEffect(() => {
    handleAllMovies();
  }, []);

  function handleAllMovies() {
    setIsLoading(true);
    return MoviesApi.getCards()
      .then((res) => {
        setIsAllMovies(res);
        localStorage.setItem("allMovies", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        setIsErrorSearch(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearch(value, short) {
    localStorage.setItem("short", JSON.stringify(short));
    localStorage.setItem("value", JSON.stringify(value));
    console.log("Происходит поиск фильмов");
    const moviesByQuery = isAllMovies.filter((movie) => {
      const movieRu = String(movie.nameRU)
        .toLowerCase()
        .trim()
        .includes(value.toLowerCase());
      const movieEn = String(movie.nameEN)
        .toLowerCase()
        .trim()
        .includes(value.toLowerCase());

      const isShort = movie.duration <= 40;
      if (value === "") {
        return 0;
      }
      if (short) {
        return (movieRu || movieEn) && isShort;
      } else {
        return movieRu || movieEn;
      }
    });
    if (moviesByQuery.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    localStorage.setItem("moviesByQuery", JSON.stringify(moviesByQuery));
    setCards(moviesByQuery);
  }

  return (
    <section className="movies">
      <Header />
      <SearchForm onSearch={handleSearch} value={value} checkBox={short} />
      <MoviesCardList
        movies={JSON.parse(localStorage.getItem("moviesByQuery")) || cards}
        isLoading={isLoading}
        isNotFound={isNotFound}
        isErrorSearch={isErrorSearch}
        onLikeClick={onLikeClick}
        savedMovies={savedMovies}
      />
      <Footer />
    </section>
  );
}
