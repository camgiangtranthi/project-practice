import { useState } from "react";
import "./PopupConfirm.scss";

interface IPopupConfirm {
  handleDeleteColumn: (columnId: string) => void;
}

const PopupConfirm = () => {
  const [isPopupConfirm, setIsPopupConfirm] = useState(false);

  const handlePopupConfirm = () => {
    setIsPopupConfirm(!isPopupConfirm);
  };

  return (
    <>
      {isPopupConfirm && (
        <div className={"popup__confirm"}>
          <div className={"popup__confirm-container"}>
            <div className={"popup__confirm-header"}>
              <h3>Are you sure you want to delete this column?</h3>
            </div>
            <div className={"popup__confirm-footer"}>
              <button className={"btn__confirm"}>No</button>
              <button onClick={handlePopupConfirm} className={"btn__cancel"}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupConfirm;
