import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({
  onLikeClick,
  savedMovies,
  handleRemoveMovie,
  isErrorSearch,
  handleSearch,
  isNotFound,
  valueMovies,
  isLoading,
  cards,
  shortDuration,
  setShortDuration,
  setValueMovies,
}) {
  return (
    <section className="movies">
      <Header />
      <SearchForm
        setValue={setValueMovies}
        onSearch={handleSearch}
        value={valueMovies}
        isChecked={shortDuration}
        setIsChecked={setShortDuration}
      />
      <MoviesCardList
        movies={JSON.parse(localStorage.getItem("moviesByQuery")) || cards}
        isLoading={isLoading}
        isNotFound={isNotFound}
        isErrorSearch={isErrorSearch}
        onLikeClick={onLikeClick}
        savedMovies={savedMovies}
        handleRemoveMovie={handleRemoveMovie}
      />
      <Footer />
    </section>
  );
}
