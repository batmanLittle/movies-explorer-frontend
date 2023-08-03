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
import Api from "../../utils/Api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  // const [errorMesage, setErrorMessage] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [loggedIn, setLoggedIn] = useState(false);

  // выход из аккаунта
  function logOut() {
    navigate("/signin");
    console.log("происходит logOut");
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
  }

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       // проверим токен
  //       MainApi.getUserData(token)
  //         .then((res) => {
  //           if (res) {
  //             // авторизуем пользователя
  //             setLoggedIn(true);
  //             Api.getCurrentUser()
  //               .then((res) => {
  //                 setCurrentUser(res);
  //                 console.log(res);
  //               })
  //               .catch((err) => {
  //                 console.log(`Ошибка ${err}`);
  //               });
  //             navigate("/movies");
  //           }
  //           return res;
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // }, []);

  //получение информации о пользователе
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (loggedIn) {
  //     MainApi.getUserData()
  //       .then((res) => {
  //         setCurrentUser(res);
  //         console.log("dddd");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);

  // очистка ошибок при переходе на другие страницы
  useEffect(() => {
    setErrorMessage("");
  }, [location]);

  // получение информации о пользователе
  // useEffect(() => {
  //   if (loggedIn) {
  //     MainApi.getUserData()
  //       .then((res) => {
  //         console.log("fff");
  //         setCurrentUser(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [loggedIn]);
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
            element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
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
