import React from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";

import Header from "./Header";
// import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
// import ProtectedRoute from "./ProtectedRoute";

import Api from "../utils/api";
import { authorize, authenticate } from "../utils/auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App(props) {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [farmName, setFarmName] = React.useState("");
  const [InfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [token, setToken] = React.useState(localStorage.getItem("jwt"));

  const history = useHistory();

  function onSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setFarmName("");
    setIsLoggedIn(false);
  }

  function closeAllPopups() {
    setImagePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard("");
  }

  function authenticateWithToken(token) {
    return authenticate(token)
      .then((res) => {
        setFarmName(res.user.farmName);
        setIsLoggedIn(true);
        return res;
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function onLogin(email, password) {
    return authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        return res;
      })
      .then((res) => {
        return authenticateWithToken(res.token);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function handleAuthResponse() {
    setInfoTooltipOpen(true);
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setFarmName("");
    setIsLoggedIn(false);
  }

  React.useEffect(() => {
    authenticateWithToken(token)
      .then((res) => {
        if (res.user.email) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header farmName={farmName} onSignOut={onSignOut} />
      <Switch>
        <Route exact path="/signup">
          <Register
            isOpen={InfoTooltipOpen}
            closeAllPopups={closeAllPopups}
            handleAuthResponse={handleAuthResponse}
          />
        </Route>
        <Route exact path="/signin">
          <Login
            onLogin={onLogin}
            isOpen={InfoTooltipOpen}
            closeAllPopups={closeAllPopups}
            handleAuthResponse={handleAuthResponse}
          />
        </Route>
      </Switch>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
