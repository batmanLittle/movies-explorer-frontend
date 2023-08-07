import "./MoviesCard.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  trailerLink,
  link,
  title,
  duration,
  onLikeClick,
  savedMovies,
  card,
  handleDeleteMovie,
  handleRemoveMovie,
}) {
  const [isCardLiked, setIsCardLiked] = useState(false);
  const location = useLocation();
 

  useEffect(() => {
  
    const isSavedMovie = location.pathname === "/saved-movies";
    if (!isSavedMovie) {

      const result = savedMovies.some((item) => card.id === item.movieId);
      setIsCardLiked(result);
      console.log("3.Это значение внутри карточки фильма");
      console.log(savedMovies);

    }
  }, [savedMovies]);

  const handleOnClick = () => {
    if (!isCardLiked) {
      onLikeClick(card);
      setIsCardLiked(isCardLiked);
    } else {
      console.log("Удаление");
      handleRemoveMovie(card);
      setIsCardLiked(!isCardLiked);
    }
  };

  const onDeleteClick = () => {
    handleDeleteMovie(card);
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
        href={trailerLink}
      >
        <img src={link} alt={title} className="movies-card__image" />
      </a>
      <div className="movies-card__element">
        <h3 className="movies-card__title">{title}</h3>
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
            onClick={onDeleteClick}
          ></button>
        )}
      </div>
      <div className="movies-card__duration">{transformDuration(duration)}</div>
    </section>
  );
}
