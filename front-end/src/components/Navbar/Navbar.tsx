import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import PopupProfile from "../PopupProfle/PopupProfile";

const Navbar = () => {
  const [isPopupProfile, setIsPopupProfile] = useState(false);

  const handlePopupProfile = () => {
    setIsPopupProfile(!isPopupProfile);
  };

  return (
    <nav>
      <div className={"nav__header"}>
        <div className={"nav__content"}>
          <Link to="/">
            <img src="/logo.webp" alt="logo" />
          </Link>
          <button className={"btn__create"}>Create column</button>
        </div>
        <div className={"nav__profile"}>
          <span className={"nav_profile-avatar"} onClick={handlePopupProfile}>
            Avatar
          </span>
          {isPopupProfile && <PopupProfile />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
