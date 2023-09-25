import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import React, { useEffect } from "react";

export default function SavedMovies({
  savedMovies,
  handleDeleteMovie,
  handleSearch,
  savedResult,
  isShort,
  isLoading,
  isSavedNotFound,
  isErrorSearch,
  shortDurationSM,
  setShortDurationSM,
  getSavedMovies,
  setIsSavedIsNotFound,
  valueMoviesSaved,
  setValueMoviesSaved,
}) {
  useEffect(() => {
    getSavedMovies();
    setValueMoviesSaved("");
    setShortDurationSM(false);
    setIsSavedIsNotFound(false);
  }, []);

  return (
    <section className="movies">
      <Header />
      <SearchForm
        onSearch={handleSearch}
        value={valueMoviesSaved}
        setValue={setValueMoviesSaved}
        checkBox={isShort}
        isChecked={shortDurationSM}
        setIsChecked={setShortDurationSM}
      />
      <MoviesCardList
        movies={savedResult}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        isLoading={isLoading}
        isSavedNotFound={isSavedNotFound}
        isErrorSearch={isErrorSearch}
      />
      <Footer />
    </section>
  );
}
