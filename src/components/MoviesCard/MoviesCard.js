import "./MoviesCard.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard(movies) {
  const [isCardLiked, setIsCardLiked] = useState(false);
  const location = useLocation();

  const handleOnClick = () => {
    setIsCardLiked(!isCardLiked);
    console.log(movies);
  };

  function transformDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }
  return (
    <section className="movies-card">
      <a
        className="movies-card__trailer"
        target="_blank"
        rel="noreferrer"
        href={movies.trailerLink}
      >
        <img
          src={movies.link}
          alt={movies.title}
          className="movies-card__image"
        />
      </a>
      <div className="movies-card__element">
        <h3 className="movies-card__title">{movies.title}</h3>
        {location.pathname === "/movies" ? (
          <button
            type="button"
            className={`movies-card__like_${
              !isCardLiked ? "inactive" : "active"
            }`}
            onClick={handleOnClick}
          ></button>
        ) : (
          <button
            type="button"
            className="movies-card__like_delete"
            // onClick={handleOnClick}
          ></button>
        )}
      </div>
      <div className="movies-card__duration">
        {transformDuration(movies.duration)}
      </div>
    </section>
  );
}
