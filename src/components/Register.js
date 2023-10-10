import React, { useState } from "react";
import { register } from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";
import { withRouter, useHistory } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [isSuccess, setSuccess] = useState(false);

  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFarmNameChange = (event) => {
    setFarmName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const onRegister = (event) => {
    event.preventDefault();
    register(email, password, farmName, city, state)
      .then((res) => {
        setEmail("");
        setPassword("");
        setSuccess(true);
      })
      .catch((error) => {
        setSuccess(false);
        console.log(error);
      })
      .finally(() => {
        props.handleAuthResponse();
      });
  };

  const handleClosePopup = () => {
    props.closeAllPopups();
    if (isSuccess) {
      history.push("/signin");
    }
  };

  return (
    <>
      <InfoTooltip
        isSuccess={isSuccess}
        isOpen={props.isOpen}
        name="register"
        isLogin={false}
        onClose={handleClosePopup}
      />
      <form className="login" onSubmit={onRegister}>
        <h1 className="login__header">Inscrever-se</h1>
        <input
          className="login__input"
          id="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={handleEmailChange}
        />
        <input
          className="login__input"
          id="password"
          placeholder="Senha"
          type="password"
          value={password}
          required
          onChange={handlePasswordChange}
        />
        <input
          className="login__input"
          id="farmName"
          placeholder="Nome da Fazenda"
          type="farmName"
          value={farmName}
          required
          onChange={handleFarmNameChange}
        />
        <input
          className="login__input"
          id="city"
          placeholder="Cidade da fazenda"
          type="city"
          value={city}
          required
          onChange={handleCityChange}
        />
        <input
          className="login__input"
          id="state"
          placeholder="Estado da fazenda"
          type="state"
          value={state}
          required
          onChange={handleStateChange}
        />
        <button className="login__button" type="submit">
          Inscrever-se
        </button>
        <a className="login__subtitle" href="/signin">
          Já é um membro? Faça o login aqui!
        </a>
      </form>
    </>
  );
}
export default withRouter(Register);
