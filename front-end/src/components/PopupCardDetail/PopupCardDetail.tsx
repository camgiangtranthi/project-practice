import './PopupCardDetail.scss';
import {CloseOutlined} from "@ant-design/icons";
import cardApi from "../../api/cardApi";
import {cardUpdateRequest} from "../../shared/models/card";
import {useState} from "react";

interface IPopupCardDetailProps {
    onClose: () => void;
    card: any;
}

const PopupCardDetail = (props: IPopupCardDetailProps) => {
    const onUpdateCardDetail = (id: string, data: cardUpdateRequest) => {
        cardApi.updateCardDetail(id, data);
    }

    return (
        <form className="popup-card-detail">
            <div className="popup-card-detail__container">
                <div className="popup-card-detail__header">
                    <div className="popup-card-detail__title">
                        <input
                            id={"title"}
                            type="text"
                            value={props.card.title}
                        />
                    </div>
                    <div className="popup-card-detail__close">
                        <CloseOutlined
                            onClick={() => props.onClose()}
                        />
                    </div>
                </div>

                <div className="popup-card-detail__body">
                    <div className="popup-card-detail__description">
                        <input
                            id={"description"}
                            type="text"
                            value={props.card.description}
                        />
                    </div>

                    <div className="popup-card-detail__time">
                        <div>
                            <label htmlFor="start-date">Start date</label>
                            <input
                                id={"start-date"}
                                type={"datetime-local"}
                                value={props.card.start_date}
                            />
                        </div>

                        <div>
                            <label htmlFor="due-date">Due date</label>
                            <input
                                id={"due-date"}
                                type={"datetime-local"}
                                value={props.card.due_date}
                            />
                        </div>
                    </div>

                    <div className="popup-card-detail__status">
                        <label htmlFor="status">Done</label>
                        <input
                            id={"status"}
                            type={"checkbox"}
                            checked={props.card.status}
                        />
                    </div>
                </div>

                <div className="popup-card-detail__footer">
                    <button
                        className="popup-card-detail__button-save"
                        type="submit"
                        onClick={() => onUpdateCardDetail(props.card.id,
                            {
                                title: (document.getElementById("title") as HTMLInputElement)?.value,
                                description: (document.getElementById("description") as HTMLInputElement)?.value,
                                start_date: (document.getElementById("start-date") as HTMLInputElement)?.value,
                                due_date: (document.getElementById("due-date") as HTMLInputElement)?.value,
                                status: (document.getElementById("status") as HTMLInputElement)?.checked
                            })}>Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PopupCardDetail;
