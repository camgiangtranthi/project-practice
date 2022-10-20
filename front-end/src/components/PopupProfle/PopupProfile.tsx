import { useContext, useState } from "react";
import "./PopupProfile.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const PopupProfile = () => {
  const currentUserContext = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    currentUserContext?.setUserResponse(
      JSON.parse(localStorage.getItem("current_user") || "")
    );
  };

  return (
    <div className={"profile"}>
      <div className={"profile__container"}>
        <div className={"profile__account"}>
          <p>Account</p>
        </div>
        <div className={"profile__details"}>
          <div className={"profile__avatar"}>Avatar</div>
          <div className={"profile__username"}>Le Thai Phuc Bao</div>
        </div>
        <div className={"profile__button"} onClick={handleLogout}>
          <Link to={"/signin"}>Log out</Link>
        </div>
      </div>
    </div>
  );
};

export default PopupProfile;
