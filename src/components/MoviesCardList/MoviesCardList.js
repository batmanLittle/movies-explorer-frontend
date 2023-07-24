import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies }) {
  return (
    <section
      className={`${
        movies.length < 5
          ? "movies-card-list movies-card-list__buttom"
          : "movies-card-list"
      }`}
    >
      <div className="movies-card-list__container">
        {movies.map((card, id) => {
          return (
            <div key={id}>
              <MoviesCard
                title={card.title}
                duration={card.duration}
                link={card.link}
                isLiked={card.isLiked}
              />
            </div>
          );
        })}
      </div>
      <button
        className={`${
          movies.length > 3
            ? "movies-card-list__button"
            : "movies-card-list__button-inactive"
        }`}
      >
        Ещё
      </button>
    </section>
  );
}
