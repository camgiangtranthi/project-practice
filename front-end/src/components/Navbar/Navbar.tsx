import {useState, useEffect, ChangeEvent} from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import "./Navbar.scss";
import PopupProfile from "../PopupProfle/PopupProfile";
import Column from "../Column/Column";
import { api } from "../../api/column";


const Navbar = () => {
  const [isPopupProfile, setIsPopupProfile] = useState(false);
  const [title, setTitle] = useState("");
  // @ts-ignore
  const [column, setColumn] = useState<Column>({title: ""});
  const [columns, setColumns] = useState([]);
  
  const retrieveColumns = async () => {
    const response = await api.get("/columns");
    return response.data;
  };

  const handlePopupProfile = () => {
    setIsPopupProfile(!isPopupProfile);
  };
  
  // @ts-ignore
  const addColumnHandler = async (column) => {
    console.log(column);
    const request = {
      id: uuid(),
      ...column,
    };
    
    const response = await api.post("/columns", request);
    const {id, title} = response.data;
    // @ts-ignore
    setColumns([...columns, response.data]);
    setColumn({id, title});
  };
  
  useEffect(() => {
    const getAllColumns = async () => {
        const allColumns = await retrieveColumns();
        if (allColumns) setColumns(allColumns);
    }
    
    getAllColumns();
  }, []);
  
  // @ts-ignore
  const addColumn = () => {
    addColumnHandler(column);
  }

  return (
    <nav>
      <div className={"nav__header"}>
        <div className={"nav__content"}>
          <Link to="/">
            <img src="/logo.webp" alt="logo" />
          </Link>
          <button className={"btn__create"} onClick={addColumn}>Create column</button>
        </div>
        <div className={"nav__profile"}>
          <span className={"nav_profile-avatar"} onClick={handlePopupProfile}>
            <img
              className={"profile__avatar"}
            />
          </span>
          {isPopupProfile && (
            <PopupProfile
              // userResponse={JSON.parse(
              //   localStorage.getItem("current_user") || ""
              // )}
            />
          )}
        </div>
      </div>
      <Column
          columns={columns}
          column={column}
          // @ts-ignore
          setColumns={setColumns}
          addColumn={addColumn}
      />
    </nav>
  );
};

export default Navbar;
