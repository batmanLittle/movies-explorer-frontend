import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
// import { useLocation } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function MoviesCardList({
  movies,
  isLoading,
  isNotFound,
  isErrorSearch,
}) {
  const [shownMovies, setShownMovies] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  // const location = useLocation();

  function displayMovies() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(16);
    } else if (display > 989) {
      setShownMovies(12);
    } else if (display > 629) {
      setShownMovies(8);
    } else if (display < 629) {
      setShownMovies(5);
    }
  }

  useEffect(() => {
    displayMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", displayMovies);
    }, 500);
  });

  function showMoreMovies() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(shownMovies + 4);
    } else if (display > 989) {
      setShownMovies(shownMovies + 3);
    } else if (display < 989) {
      setShownMovies(shownMovies + 2);
    }
  }

  return (
    <section
      className={`${
        movies.length < shownMovies
          ? "movies-card-list movies-card-list__buttom"
          : "movies-card-list"
      }`}
    >
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <InfoTooltip errorText={"Ничего не найдено"} />
      )}
      {isErrorSearch && !isLoading && !isNotFound && (
        <InfoTooltip
          errorText={
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isErrorSearch && !isLoading && (
        <>
          <div className="movies-card-list__container">
            {movies.slice(0, shownMovies).map((card, id) => {
              return (
                <div key={id}>
                  <MoviesCard
                    title={card.nameRU}
                    duration={card.duration}
                    link={`https://api.nomoreparties.co/${card.image.url}`}
                    isLiked={card.isLiked}
                    trailerLink={card.trailerLink}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={showMoreMovies}
            className={`${
              movies.length > shownMovies
                ? "movies-card-list__button"
                : "movies-card-list__button-inactive"
            }`}
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}
