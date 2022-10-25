import { useContext, useState } from "react";
import "./PopupProfile.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { UserResponse } from "../../shared/models/user";

interface IProfileProps {
  userResponse: UserResponse;
}

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
          <img
            className={"profile__avatar"}
          />
          <div className={"profile__username"}>
          </div>
        </div>
        <div className={"profile__button"} onClick={handleLogout}>
          <Link to={"/signin"}>Log out</Link>
        </div>
      </div>
    </div>
  );
};

export default PopupProfile;
