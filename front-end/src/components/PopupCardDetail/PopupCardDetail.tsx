import './PopupCardDetail.scss';
import {CloseOutlined} from "@ant-design/icons";

const PopupCardDetail = () => {
    return (
        <form className="popup-card-detail">
            <div className="popup-card-detail__container">
                <div className="popup-card-detail__header">
                    <div className="popup-card-detail__title">
                        <h3>Card title</h3>
                    </div>
                    <div className="popup-card-detail__close">
                        <CloseOutlined/>
                    </div>
                </div>

                <div className="popup-card-detail__body">
                    <div className="popup-card-detail__description">
                        <p>Description</p>
                    </div>

                    <div className="popup-card-detail__time">
                        <label htmlFor="start-date">Start date</label>
                        <input
                            id={"start-date"}
                            type={"datetime-local"}
                        />

                        <label htmlFor="due-date">Due date</label>
                        <input
                            id={"due-date"}
                            type={"datetime-local"}
                        />
                    </div>

                    <div className="popup-card-detail__status">
                        <label htmlFor="status">Done</label>
                        <input
                            id={"status"}
                            type={"checkbox"}
                        />
                    </div>
                </div>

                <div className="popup-card-detail__footer">
                    <button className="popup-card-detail__button-save" type="submit">Save</button>
                </div>
            </div>
        </form>
    );
}

export default PopupCardDetail;
