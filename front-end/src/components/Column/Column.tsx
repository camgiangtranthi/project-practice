import { useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./Column.scss";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import {
  columnUpdateRequest,
  columnResponse,
} from "../../shared/models/column";

interface IColumn {
  columns: columnResponse[];
  handleUpdateColumn: (column: columnResponse) => void;
  handleDeleteColumn: (column: columnResponse) => void;
  resetColumn: () => void;
}

const Column = (props: IColumn) => {
  const [isPopupConfirm, setIsPopupConfirm] = useState(false);

  const handlePopupConfirm = () => {
    setIsPopupConfirm(!isPopupConfirm);
  };

  // @ts-ignore
  return (
    <div className={"column"}>
      {props.columns.map((column) => {
        return (
          <div key={column.id} className={"column__container"}>
            <div className={"column__header"}>
              <input
                type="text"
                value={column.title}
                onChange={(e) => {
                  column.title = e.target.value;
                  props.handleUpdateColumn(column);
                }}
              />
              <div className={"column__header-icon"}>
                <DeleteOutlined
                  onClick={() => {
                    props.handleDeleteColumn(column);
                  }}
                />
              </div>
            </div>
            <div className={"column__addnew"}>
              <PlusOutlined />
              <button className={"btn__add-task"}>Add a card</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Column;
