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
  const [cards, setCards] = useState([]);

  function sumbitMovies() {
    MoviesApi.getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="movies">
      <Header />
      <SearchForm sumbitMovies={sumbitMovies} />
      <MoviesCardList movies={cards} />
      <Footer />
    </section>
  );
}
