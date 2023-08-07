import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import React, { useState, useEffect } from "react";
import * as MainApi from "../../utils/MainApi";

export default function SavedMovies({
  savedMovies,
  handleDeleteMovie,
  handleSearch,
  savedResult,
  isValue,
  isShort,
}) {
  return (
    <section className="movies">
      <Header />
      <SearchForm onSearch={handleSearch} value={isValue} checkBox={isShort} />
      <MoviesCardList
        movies={savedResult}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
      />
      <Footer />
    </section>
  );
}
