import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./PopupProfile.scss";
import { Link } from "react-router-dom";

const PopupProfile = () => {
  const [isPopupProfile, setIsPopupProfile] = useState(true);

  const handlePopupProfile = () => {
    setIsPopupProfile(false);
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
        <div className={"profile__button"}>
          <Link to={"/signin"}>Log out</Link>
        </div>
      </div>
    </div>
  );
};

export default PopupProfile;
