import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { currentUserContext } from "../../contexts/CurrentUserContext.js";
// import MovieApi from "../../utils/MoviesApi";
import { getCards } from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [errorMesage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedResult, setSavedResult] = useState([]);
  const [cards, setCards] = useState([]); //отфильтрованный массив по запросу
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены
  const [isErrorSearch, setIsErrorSearch] = useState(false); //ошибка сервера
  const [isAllMovies, setIsAllMovies] = useState([]); //все фильмы изначально
  const [isSavedNotFound, setIsSavedIsNotFound] = useState(false); //фильмы не найдены

  const value = JSON.parse(localStorage.getItem("value")) || "";
  const short = JSON.parse(localStorage.getItem("short")) || false;

  const isValue = "";
  const isShort = false;

  useEffect(() => {
    if (
      (!loggedIn && location.pathname === "/movies") ||
      location.pathname === "/saved-movies" ||
      location.pathname === "/profile" ||
      location.pathname === "/signup" ||
      location.pathname === "/signin"
    ) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    handleAllMovies();
  }, []);

  useEffect(() => {
    getSavedMovies();
  }, []);

  //Отрисовка фильмов
  function handleAllMovies() {
    setIsLoading(true);
    return getCards()
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

  //Поиск по всем фильмам
  function handleSearch(value, short) {
    localStorage.setItem("short", JSON.stringify(short));
    localStorage.setItem("value", JSON.stringify(value));
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
      if (value === "") {
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
    getSavedMovies();
  }

  //Поиск по сохраненным фильмам
  function handleSearchSavedMovies(isValue, isShort) {
    const moviesByQuery = savedMovies.filter((movie) => {
      const movieRu = String(movie.nameRU)
        .toLowerCase()
        .trim()
        .includes(isValue.toLowerCase());
      const movieEn = String(movie.nameEN)
        .toLowerCase()
        .trim()
        .includes(isValue.toLowerCase());
      const isMovieShort = movie.duration <= 40;
      if (isShort) {
        return (movieRu || movieEn) && isMovieShort;
      } else {
        return movieRu || movieEn;
      }
    });
    if (moviesByQuery.length === 0) {
      setIsSavedIsNotFound(true);
    } else {
      setIsSavedIsNotFound(false);
    }
    localStorage.setItem(
      "moviesByQuerySavedMovies",
      JSON.stringify(moviesByQuery)
    );
    setSavedResult(moviesByQuery);
  }

  //Удаление фильма
  function handleDeleteMovie(movie) {
    const token = localStorage.getItem("token");
    return MainApi.removeMovie(movie._id, token)
      .then(() => {
        const newMoviesList = savedMovies.filter((res) => {
          if (movie.id === res.movieId || movie.movieId === res.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedResult(newMoviesList);
        setSavedMovies(newMoviesList);
        localStorage.setItem("savedMovie", JSON.stringify(newMoviesList));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Добавление фильма
  function handleCardAdd(card) {
    const token = localStorage.getItem("token");
    MainApi.addNewMovie(card, token)
      .then((newMovie) => {
        const newSavedMovies = [...savedMovies, newMovie];
        setSavedMovies(newSavedMovies);
        setSavedResult(newSavedMovies);
        localStorage.setItem("savedMovie", JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Отрисовка сохраненных фильмов
  function getSavedMovies() {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    return MainApi.getSavedMovies(token)
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem("savedMovie", JSON.stringify(res));
        setSavedResult(res);
      })
      .catch((err) => {
        console.log(err);
        setIsErrorSearch(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Удаление лайка и соответсвенно фильма с массива сохраненных фильмов
  function handleRemoveMovie(movie) {
    const token = localStorage.getItem("token");
    const removeMovie = savedMovies.find((item) => movie.id === item.movieId);
    return MainApi.removeMovie(removeMovie._id, token)
      .then(() => {
        const newMoviesList = savedMovies.filter((res) => {
          if (movie.id === res.movieId || movie.movieId === res.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
        setSavedResult(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateUser({ name, email }) {
    const token = localStorage.getItem("token");
    MainApi.updateUser(name, email, token)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
        setErrorMessage("Данные обновлены!");
      })
      .catch((err) => {
        if (err === 409) {
          setErrorMessage("Пользователь с таким email уже существует");
        } else {
          setErrorMessage("При регистрации пользователя произошла ошибка");
        }
      });
  }

  // выход из аккаунта
  function logOut() {
    navigate("/");
    setCurrentUser(false);
    setLoggedIn(false);
    localStorage.clear();
  }

  // очистка ошибок при переходе на другие страницы
  useEffect(() => {
    setErrorMessage("");
  }, [location]);

  //Регистрация пользователя =>далее сразу авторизация => навигация на страницу фильмов
  const registerUser = ({ name, email, password }) => {
    MainApi.register(name, email, password)
      .then((res) => {
        setCurrentUser(res);
        loginUser({ email, password });
      })
      .catch((err) => {
        if (err === 409) {
          setErrorMessage("Пользователь с таким email уже существует");
        } else {
          setErrorMessage("При регистрации пользователя произошла ошибка");
        }
      });
  };

  //Авторизация
  const loginUser = ({ email, password }) => {
    MainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setCurrentUser(data);
        navigate("/movies", { replace: true });
        getSavedMovies();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setErrorMessage("Вы ввели неправильный логин или пароль");
      });
  };

  //Проверка токена
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.getUserData(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            navigate(location);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //Проверка авторизации
  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      MainApi.getUserData(token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <currentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                savedMovies={savedMovies}
                element={Movies}
                loggedIn={loggedIn}
                onLikeClick={handleCardAdd}
                handleRemoveMovie={handleRemoveMovie}
                getSavedMovies={getSavedMovies}
                handleSearch={handleSearch}
                value={value}
                checkBox={short}
                cards={cards}
                isLoading={isLoading}
                isNotFound={isNotFound}
                isErrorSearch={isErrorSearch}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                savedResult={savedResult}
                handleSearch={handleSearchSavedMovies}
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                handleDeleteMovie={handleDeleteMovie}
                value={isValue}
                checkBox={isShort}
                isLoading={isLoading}
                isSavedNotFound={isSavedNotFound}
                isErrorSearch={isErrorSearch}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Register
                  registerUser={registerUser}
                  errorMesage={errorMesage}
                  setErrorMessage={setErrorMessage}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Login
                  loginUser={loginUser}
                  errorMesage={errorMesage}
                  setErrorMessage={setErrorMessage}
                />
              </>
            }
          />

          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <ProtectedRoute
                  errorMesage={errorMesage}
                  setErrorMessage={setErrorMessage}
                  updateUser={updateUser}
                  loggedIn={loggedIn}
                  element={Profile}
                  logOut={logOut}
                />
              </>
            }
          />
        </Routes>
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
