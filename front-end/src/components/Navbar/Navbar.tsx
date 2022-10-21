import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import PopupProfile from "../PopupProfle/PopupProfile";
import Column from "../Column/Column";
import ColumnApi from "../../api/columnApi";

import {
  column,
  columnResponse,
  columnCreateRequest,
  columnDeleteRequest,
} from "../../shared/models/column";
import columnApi from "../../api/columnApi";

const Navbar = () => {
  const [isPopupProfile, setIsPopupProfile] = useState(false);
  const [columns, setColumns] = useState([]);
  const [column, setColumn] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handlePopupProfile = () => {
    setIsPopupProfile(!isPopupProfile);
  };

  const handleAddColumn = () => {
    const columnCreateRequest: columnCreateRequest = {
      title: column,
    };
    columnApi
      .createColumn(columnCreateRequest)
      .then((response) => {
        // @ts-ignore
        setColumns([...columns, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateColumn = (column: columnResponse) => {
    const columnUpdateRequest: columnCreateRequest = {
      title: column.title,
    };
    columnApi
      .updateColumn(column.id, columnUpdateRequest)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleDeleteColumn = (column: columnResponse) => {
    const columnDeleteRequest: columnDeleteRequest = {
      id: column.id,
    };
    columnApi
      .deleteColumn(column.id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  const resetColumn = () => {
    setColumn("");
    titleInputRef.current?.focus();
  };

  return (
    <nav>
      <div className={"nav__header"}>
        <div className={"nav__content"}>
          <Link to="/">
            <img src="/logo.webp" alt="logo" />
          </Link>
          <button className={"btn__create"} onClick={handleAddColumn}>
            Create column
          </button>
        </div>
        <div className={"nav__profile"}>
          <span className={"nav_profile-avatar"} onClick={handlePopupProfile}>
            Avatar
          </span>
          {isPopupProfile && <PopupProfile />}
        </div>
      </div>
      <Column
        columns={columns}
        handleUpdateColumn={handleUpdateColumn}
        handleDeleteColumn={handleDeleteColumn}
        resetColumn={resetColumn}
      />
    </nav>
  );
};

export default Navbar;
