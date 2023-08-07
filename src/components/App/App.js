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

import * as MainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [errorMesage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false); //фильмы не найдены

  const [savedResult, setSavedResult] = useState([]);

  const [isValue, setIsValue] = useState("");

  const [isShort, setIsShort] = useState(false);

  function handleSearch(isValue, isShort) {
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
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    localStorage.setItem(
      "moviesByQuerySavedMovies",
      JSON.stringify(moviesByQuery)
    );

    setSavedResult(moviesByQuery);
    // getSavedMovies();
    console.log("8");
    console.log(savedResult);
  }

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
        console.log("4.Cмотрим обновления");
        console.log(savedMovies);
        console.log(JSON.parse(localStorage.getItem("savedMovie")));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getSavedMovies();
    // localStorage.setItem("savedMovie", JSON.stringify(savedMovies));
  }, []);

  function handleCardAdd(card) {
    const token = localStorage.getItem("token");
    MainApi.addNewMovie(card, token)
      .then((newMovie) => {
        const ver = [...savedMovies, newMovie];
        setSavedMovies(ver);
        setSavedResult(ver);
        localStorage.setItem("savedMovie", JSON.stringify(ver));
        console.log("2. Формирую обновленный масив сохраненных фильмов");
        console.log(savedMovies);
        console.log(JSON.parse(localStorage.getItem("savedMovie")));
      })
      .catch((err) => {
        console.log("работает");
      });
  }

  function getSavedMovies() {
    const token = localStorage.getItem("token");
    return MainApi.getSavedMovies(token)
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem("savedMovie", JSON.stringify(res));
        setSavedResult(res);
        console.log("1. Получаю текущий масив сохраненных фильмов");
        console.log(savedMovies);
        console.log(JSON.parse(localStorage.getItem("savedMovie")));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        // localStorage.setItem("savedMovie", JSON.stringify(newMoviesList));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateUser({ name, email }) {
    const token = localStorage.getItem("token");
    console.log(token);
    MainApi.updateUser(name, email, token)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);

        console.log(data.token);
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
    navigate("/signin");
    console.log("происходит logOut");
    setCurrentUser({});
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
        // console.log(res);
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

  const loginUser = ({ email, password }) => {
    MainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setCurrentUser(data);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setErrorMessage("Вы ввели неправильный логин или пароль");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.getUserData(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      MainApi.getUserData(token)
        .then((user) => {
          setCurrentUser(user);
          console.log(user);
          console.log("Происходит useEffect");
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
                <Header />
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
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                savedResult={savedResult}
                handleSearch={handleSearch}
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                handleDeleteMovie={handleDeleteMovie}
                value={isValue}
                checkBox={isShort}
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
