import React from "react";
import editButtonImg from "../images/profile/edit_button.svg";
import editImageButton from "../images/profile/edit-picture.svg";

function Profile(props) {
  const { currentFarm } = props;

  return (
    <>
      <section className="profile">
        <div className="profile__image">
          <div className="profile__picture-overlay"></div>
          <img
            className="profile__edit-picture"
            alt="Logo"
            src={editImageButton}
          />
          <img
            className="profile__picture"
            alt="User profile"
            src={currentFarm.farmPhoto}
          />
        </div>
        <div className="profile__info">
          <h3 className="profile__name">{currentFarm.farmName}</h3>
          <h5 className="profile__about-me">{`${currentFarm.city} - ${currentFarm.state}`}</h5>
          <button>
            <img
              className="profile__edit-button"
              alt="Edit Button logo"
              src={editButtonImg}
            />
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
