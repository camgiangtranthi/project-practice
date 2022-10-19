import { useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./Column.scss";
import PopupConfirm from "../PopupConfirm/PopupConfirm";

interface ColumnProps {
  addColumn: () => void;
}

const Column = (props: ColumnProps) => {
  const [isPopupConfirm, setIsPopupConfirm] = useState(false);

  const handlePopupConfirm = () => {
    setIsPopupConfirm(!isPopupConfirm);
  };

  return (
    <div className={"column"}>
      <div className={"column__container"}>
        <div className={"column__header"}>
          <input
            type={"text"}
            id={"title"}
            value={"Column title"}
            placeholder={"Title"}
            autoFocus
            required
          />
          <div className={"column__header-icon"}>
            <DeleteOutlined onClick={handlePopupConfirm} />
            {isPopupConfirm && <PopupConfirm />}
          </div>
        </div>
        <div className={"column__addnew"}>
          <PlusOutlined />
          <span>Add a card</span>
        </div>
      </div>
    </div>
  );
};

export default Column;
