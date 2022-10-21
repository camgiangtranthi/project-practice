import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import PopupProfile from "../PopupProfle/PopupProfile";
import { UserResponse } from "../../shared/models/user";

interface INavbarProps {
  userResponse: UserResponse;
}

const Navbar = (props: INavbarProps) => {
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
            <img
              className={"profile__avatar"}
              src={props.userResponse.user.avatar}
            />
          </span>
          {isPopupProfile && (
            <PopupProfile
              userResponse={JSON.parse(
                localStorage.getItem("current_user") || ""
              )}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
