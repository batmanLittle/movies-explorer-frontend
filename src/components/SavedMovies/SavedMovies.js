import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import React, { useState, useEffect } from "react";
import * as MainApi from "../../utils/MainApi";

export default function SavedMovies() {
  const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены

  const [savedMovies, setSavedMovies] = useState([]);
  const [savedResult, setSavedResult] = useState([]);

  useEffect(() => {
    getSavedMovies();
  }, []);

  console.log(savedResult);
  // console.log(savedMovies);
  useEffect(() => {
    localStorage.setItem("savedMovie", JSON.stringify(savedMovies));
  }, [savedMovies]);

  function getSavedMovies() {
    const token = localStorage.getItem("token");
    return MainApi.getSavedMovies(token)
      .then((res) => {
        setSavedMovies(res);
        // console.log(res);
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
        movies={savedMovies}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
      />
      <Footer />
    </section>
  );
}
