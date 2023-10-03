import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [farmName, setFarmName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  // Assinatura do contexto
  const currentUser = React.useContext(CurrentUserContext);

  // Após carregar o usuário atual da API
  // seus dados serão usados em componentes gerenciados.
  React.useEffect(() => {
    setFarmName(currentUser.farmName);
    setCity(currentUser.city);
    setCity(currentUser.state);
  }, [currentUser]);

  function handleFarmNameChange(e) {
    setFarmName(e.target.value);
  }

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleStateChange(e) {
    setState(e.target.value);
  }

  function handleSubmit(e) {
    // Impeça que o navegador navegue até o endereço do formulário
    e.preventDefault();

    // Passe os valores dos componentes gerenciados para o manipulador externo
    props.onUpdateUser({
      farmName,
      city,
      state,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
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
        maxLength="40"
        value={farmName}
        onChange={handleFarmNameChange}
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input"
        id="about-me-input"
        placeholder="Cidade"
        required
        minLength="2"
        maxLength="200"
        value={city}
        onChange={handleCityChange}
      />
      <input
        className="popup__input"
        id="state-input"
        placeholder="Estado"
        required
        minLength="2"
        maxLength="200"
        value={state}
        onChange={handleStateChange}
      />
      <span className="popup__error about-me-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
