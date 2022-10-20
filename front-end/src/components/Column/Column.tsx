import { useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./Column.scss";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import { columnUpdateRequest, column } from "../../shared/models/column";

interface IColumn {
  columnToShow: string;
  setActiveColumn: (column: column) => void;
  onUpdateColumn: (columnData: columnUpdateRequest) => void;
  onDeleteColumn: (columnId: string) => void;
  columns: column[];
  titleInput: any;
}

const Column = (props: IColumn) => {
  const [isPopupConfirm, setIsPopupConfirm] = useState(false);

  const handlePopupConfirm = () => {
    setIsPopupConfirm(!isPopupConfirm);
  };

  const handleUpdateColumn = (columnId: string) => {
    props.onUpdateColumn({
      title: props.titleInput.current.value,
    });
    props.titleInput.current.value = "";
  };

  const handleDeleteColumn = (columnId: string) => {
    props.onDeleteColumn(columnId);
  };

  const handleOnChange = (e: any) => {
    props.onUpdateColumn({
      title: e.target.value,
    });
  };

  // @ts-ignore
  return (
    <div className={"column"}>
      <div className={"column__container"}>
        <div className={"column__header"}>
          <input
            type={"text"}
            id={"title"}
            value={"Column title"}
            placeholder={"Title"}
            onChange={handleOnChange}
            ref={props.titleInput}
            autoFocus
            required
          />
          <div className={"column__header-icon"}>
            <DeleteOutlined onClick={handlePopupConfirm} />
            {isPopupConfirm && (
              <PopupConfirm handleDeleteColumn={handleDeleteColumn} />
            )}
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
