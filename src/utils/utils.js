export function filterMovies(movies, value) {
  const moviesByQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = value.toLowerCase().trim();
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    );
  });
  return moviesByQuery;
}

//фильтр по длительности
export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration <= 40);
}
