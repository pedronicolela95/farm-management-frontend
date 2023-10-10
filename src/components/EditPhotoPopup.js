import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditPhotoPopup(props) {
  const { onUpdatePhoto, isOpen, onClose } = props;

  const [farmPhoto, setFarmPhoto] = React.useState("");
  const [farmPhotoValidatorMessage, setFarmPhotoValidatorMessage] =
    React.useState("");

  const regexURL =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!-)[A-Z\d-]{1,63}(?<!-)\.?)+(?:[A-Z]{2,6}\.?|[A-Z\d-]{2,}\.?)?(?::\d+)?(?:[/?#]\S*)?$/i;

  function handleFarmPhotoChange(e) {
    setFarmPhoto(e.target.value);

    if (!regexURL.test(e.target.value)) {
      setFarmPhotoValidatorMessage("Coloque uma URL válida");
    } else {
      setFarmPhotoValidatorMessage("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePhoto(farmPhoto);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isEnabled={true}
      name="profile-image"
      title="Alterar a foto do perfil"
      onSubmit={handleSubmit}
    >
      <input
        value={farmPhoto}
        onChange={handleFarmPhotoChange}
        className="popup__input"
        id="image-input"
        placeholder="Link da imagem"
        type="url"
        required
      />
      <span className="popup__error">{farmPhotoValidatorMessage}</span>
    </PopupWithForm>
  );
}

export default EditPhotoPopup;
