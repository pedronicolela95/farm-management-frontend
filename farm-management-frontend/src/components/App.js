import React from "react";
// import { Route, Switch, withRouter, useHistory } from "react-router-dom";

import Header from "./Header";
// import Main from "./Main";
import Footer from "./Footer";
// import Register from "./Register";
import Login from "./Login";
// import ProtectedRoute from "./ProtectedRoute";

// import Api from "../utils/api";
// import { authorize, authenticate } from "../utils/auth";

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
  const [farmName, setFarmName] = React.useState("Fazenda Barra Grande");
  const [InfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [token, setToken] = React.useState(localStorage.getItem("jwt"));

  // const history = useHistory();

  function onSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setFarmName("");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header farmName={farmName} onSignOut={onSignOut} />
      <Login />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
