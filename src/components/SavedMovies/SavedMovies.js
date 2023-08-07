import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import React, { useState } from "react";
import * as MainApi from "../../utils/MainApi";

export default function SavedMovies() {
  const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovie"))
  );
  const [savedResult, setSavedResult] = useState(savedMovies);

  function handleDeleteMovie(movie) {
    const token = localStorage.getItem("token");
    return MainApi.removeMovie(movie._id, token)
      .then(() => {
        const newMoviesList = savedMovies.filter((res) => {
          if (movie.id === res.movieId || movie.movieId === res.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
        setSavedResult(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearch(value, short) {
    const moviesByQuery = savedMovies.filter((movie) => {
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

    setSavedResult(moviesByQuery);
  }

  return (
    <section className="movies">
      <Header />
      <SearchForm onSearch={handleSearch} />
      <MoviesCardList
        movies={savedResult}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
      />
      <Footer />
    </section>
  );
}
