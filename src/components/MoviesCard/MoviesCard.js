import "./MoviesCard.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ title, duration, link }) {
  const [isCardLiked, setIsCardLiked] = useState(false);
  const location = useLocation();

  const handleOnClick = () => {
    setIsCardLiked(!isCardLiked);
  };

  return (
    <section className="movies-card">
      <img src={link} alt={title} className="movies-card__image" />
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
            // onClick={handleOnClick}
          ></button>
        )}
      </div>
      <div className="movies-card__duration">{duration}</div>
    </section>
  );
}
