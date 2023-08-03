// import "./Movies.css";
// import React, { useState, useEffect, useContext } from "react";
// import { filterMovies, filterDuration } from "../../utils/utils";
// import Header from "../Header/Header";
// import SearchForm from "../SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// // import movies from "../../utils/arrayMovie";
// import Footer from "../Footer/Footer";
// import MoviesApi from "../../utils/MoviesApi";
// import { currentUserContext } from "../../contexts/CurrentUserContext.js";

// export default function Movies() {
//   const currentUser = useContext(currentUserContext);
//   const [cards, setCards] = useState([]); //отфильтрованный массив по запросу
//   const [filteredCardsByCheckbox, setFilteredCardsByCheckbox] = useState([]); //отфильтрованный массив по запросу и чекбоксу
//   const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
//   const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены
//   const [isErrorSearch, setIsErrorSearch] = useState(false); //ошибка сервера
//   const [isShortMovies, setIsShortMovies] = useState(false); //переключение чекбокса
//   const [isAllMovies, setIsAllMovies] = useState([]); //все фильмы изначально

//   //Функция фильтра фильмов!
//   function handleFilterMovies(movies, value, short) {
//     const moviesList = filterMovies(movies, value, short); //фильтруем фильмы по запросу
//     if (moviesList.length === 0) {
//       //если массив фильмов по запросу меньше нуля, то отобразиться 'Ничего не найдено'
//       setIsNotFound(true);
//     } else {
//       setIsNotFound(false);
//     }
//     setCards(moviesList); //записываем в стейт что найдем
//     setFilteredCardsByCheckbox(short ? filterDuration(moviesList) : moviesList); //фильтрация фильмов по времени

//     // localStorage.setItem(`${currentUser}-moviesAll`, JSON.stringify(movies)); //сохраняем полный массив
//     localStorage.setItem(`${currentUser}-movies`, JSON.stringify(moviesList)); //сохраняем  отфильтрованный массив
//     // localStorage.setItem(`${currentUser}-value`, JSON.stringify(value));
//     // console.log(value);
//   }

//   // состояние чекбокса
//   function handleShortFilms(event) {
//     setIsShortMovies(event.target.checked); //переключение чекбокса
//     setIsShortMovies(!isShortMovies);
//     console.log(!isShortMovies);
//     if (!isShortMovies) {
//       setFilteredCardsByCheckbox(filterDuration(cards)); //переключаем на короткометражки
//     } else {
//       setFilteredCardsByCheckbox(cards); // все фильмы, чекбокс выключен
//     }
//     localStorage.setItem(`${currentUser}-short`, !isShortMovies); //сохраняем состояние чекбокса
//   }

//   //эффект, который при входе вытаскивает состояние чекбокса +
//   useEffect(() => {
//     if (localStorage.getItem(`${currentUser}-short`) === "true") {
//       setIsShortMovies(true);
//     } else {
//       setIsShortMovies(false);
//     }
//   }, [currentUser]);

//   //функция самбита формы поиска
//   function sumbitMovies(value) {
//     localStorage.setItem(`${currentUser}-movieSearch`, value); //состояние импута поиска сохраняем
//     if (isAllMovies.length === 0) {
//       setIsLoading(true); //загрузка
//       MoviesApi.getCards()
//         .then((movies) => {
//           setIsAllMovies(movies);
//           handleFilterMovies(movies, value, isShortMovies); //фильтруем полный массив по запросу и чекбоксу
//         })
//         .catch((err) => {
//           setIsErrorSearch(true);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       handleFilterMovies(isAllMovies, value, isShortMovies);
//     }

//     // setNewCards(filterMovies(cards, value));
//   }

//   useEffect(() => {
//     if (localStorage.getItem(`${currentUser}-movies`)) {
//       const movies = JSON.parse(localStorage.getItem(`${currentUser}-movies`));
//       setCards(movies);
//       if (localStorage.getItem(`${currentUser}-short`) === "true") {
//         setFilteredCardsByCheckbox(filterDuration(movies));
//       } else {
//         setFilteredCardsByCheckbox(movies);
//       }
//     } else {
//       MoviesApi.getCards().then((movies) => {
//         setIsAllMovies(movies);
//       });
//     }
//   }, [currentUser]);

//   return (
//     <section className="movies">
//       <Header />
//       <SearchForm
//         sumbitMovies={sumbitMovies}
//         handleShortFilms={handleShortFilms}
//         isShortMovies={isShortMovies}
//       />
//       <MoviesCardList
//         movies={filteredCardsByCheckbox}
//         isLoading={isLoading}
//         isNotFound={isNotFound}
//         isErrorSearch={isErrorSearch}
//       />
//       <Footer />
//     </section>
//   );
// }

// useEffect(() => {
//   // эффект, который берет все фильмы из API
//   MoviesApi.getCards()
//     .then((movies) => {
//       setIsAllMovies(movies);
//     })
//     .catch(() => {
//       console.log("ошибка");
//     });
// }, []);

import "./Movies.css";
import React, { useState, useEffect, useContext } from "react";
import { filterMovies, filterDuration } from "../../utils/utils";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import movies from "../../utils/arrayMovie";
import Footer from "../Footer/Footer";
import MoviesApi from "../../utils/MoviesApi";
import { currentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Movies({ loggedIn }) {
  const currentUser = useContext(currentUserContext);
  const [cards, setCards] = useState([]); //отфильтрованный массив по запросу
  const [filteredCardsByCheckbox, setFilteredCardsByCheckbox] = useState([]); //отфильтрованный массив по запросу и чекбоксу
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены
  const [isErrorSearch, setIsErrorSearch] = useState(false); //ошибка сервера
  const [isShortMovies, setIsShortMovies] = useState(false); //переключение чекбокса
  const [isAllMovies, setIsAllMovies] = useState([]); //все фильмы изначально

  const value = JSON.parse(localStorage.getItem("value")) || "";

  const short = JSON.parse(localStorage.getItem("short")) || false;

  useEffect(() => {
    handleAllMovies();
  }, []);

  function handleAllMovies() {
    setIsLoading(true);
    return MoviesApi.getCards()
      .then((res) => {
        setIsAllMovies(res);
        localStorage.setItem("allMovies", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        setIsErrorSearch(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearch(value, short) {
    localStorage.setItem("short", JSON.stringify(short));
    localStorage.setItem("value", JSON.stringify(value));
    console.log("Происходит поиск фильмов");
    const moviesByQuery = isAllMovies.filter((movie) => {
      const movieRu = String(movie.nameRU)
        .toLowerCase()
        .trim()
        .includes(value.toLowerCase());
      const movieEn = String(movie.nameEN)
        .toLowerCase()
        .trim()
        .includes(value.toLowerCase());

      const isShort = movie.duration <= 40;
      if (value == "") {
        return 0;
      }
      if (short) {
        return (movieRu || movieEn) && isShort;
      } else {
        return movieRu || movieEn;
      }
    });
    if (moviesByQuery.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    localStorage.setItem("moviesByQuery", JSON.stringify(moviesByQuery));
    setCards(moviesByQuery);
  }

  return (
    <section className="movies">
      <Header />
      <SearchForm onSearch={handleSearch} value={value} checkBox={short} />
      <MoviesCardList
        movies={JSON.parse(localStorage.getItem("moviesByQuery")) || cards}
        isLoading={isLoading}
        isNotFound={isNotFound}
        isErrorSearch={isErrorSearch}
      />
      <Footer />
    </section>
  );
}
