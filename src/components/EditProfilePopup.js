import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [farmName, setFarmName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  const [farmNameValidatorMessage, setFarmNameValidatorMessage] =
    React.useState("");
  const [cityValidatorMessage, setCityValidatorMessage] = React.useState("");
  const [stateValidatorMessage, setStateValidatorMessage] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  const regexString = /^(?=.*[a-zA-Z]).{2,50}$/;

  React.useEffect(() => {
    setFarmName(currentUser.farmName);
    setCity(currentUser.city);
    setState(currentUser.state);
  }, [currentUser]);

  function handleFarmNameChange(e) {
    setFarmName(e.target.value);

    if (!regexString.test(e.target.value)) {
      setFarmNameValidatorMessage(
        "O nome da fazenda deve ter entre 2 e 50 carácteres"
      );
    } else {
      setFarmNameValidatorMessage("");
    }
  }

  function handleCityChange(e) {
    setCity(e.target.value);

    if (!regexString.test(e.target.value)) {
      setCityValidatorMessage(
        "O nome da cidade deve ter entre 2 e 50 carácteres"
      );
    } else {
      setCityValidatorMessage("");
    }
  }

  function handleStateChange(e) {
    setState(e.target.value);

    if (!regexString.test(e.target.value)) {
      setStateValidatorMessage(
        "O nome do estado deve ter entre 2 e 50 carácteres"
      );
    } else {
      setStateValidatorMessage("");
    }
  }

  function handleSubmit(e) {
    // Impeça que o navegador navegue até o endereço do formulário
    e.preventDefault();

    // Passe os valores dos componentes gerenciados para o manipulador externo
    props.updateProfile({
      farmName,
      city,
      state,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      isEnabled={true}
      name="profile-form"
      title="Editar Perfil"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="farm-name-input"
        placeholder="Nome da fazenda"
        required
        minLength="2"
        maxLength="50"
        value={farmName}
        onChange={handleFarmNameChange}
      />
      <span className="popup__error">{farmNameValidatorMessage}</span>
      <input
        className="popup__input"
        id="about-me-input"
        placeholder="Cidade"
        required
        minLength="2"
        maxLength="50"
        value={city}
        onChange={handleCityChange}
      />
      <span className="popup__error">{cityValidatorMessage}</span>
      <input
        className="popup__input"
        id="state-input"
        placeholder="Estado"
        required
        minLength="2"
        maxLength="50"
        value={state}
        onChange={handleStateChange}
      />
      <span className="popup__error">{stateValidatorMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
