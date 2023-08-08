import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies({
  savedMovies,
  handleDeleteMovie,
  handleSearch,
  savedResult,
  isValue,
  isShort,
  isLoading,
  isSavedNotFound,
  isErrorSearch,
}) {
  return (
    <section className="movies">
      <Header />
      <SearchForm onSearch={handleSearch} value={isValue} checkBox={isShort} />
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
