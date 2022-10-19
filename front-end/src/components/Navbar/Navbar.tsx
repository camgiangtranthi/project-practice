import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Column from "../Column/Column";

interface NavbarProps {
  title: string;
  description: string;
  id: string;
}

const Navbar = () => {
  const [isPopupProfile, setIsPopupProfile] = useState(false);

  const addColumn = () => {
    const newColumn = {
      title: "New Column",
      description: "New Description",
      id: "1",
    };
    console.log(newColumn);
  };

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
          <button onClick={addColumn} className={"btn__create"}>
            Create column
          </button>
        </div>
        <div className={"nav__profile"}>
          <span className={"nav_profile-avatar"} onClick={handlePopupProfile}>
            Avatar
          </span>
        </div>
      </div>
      <Column addColumn={addColumn} />
    </nav>
  );
};

export default Navbar;
