import "./Card.scss";
import { DeleteOutlined } from "@ant-design/icons";


const Card = () => {

    const onDeleteCard = () => {
        console.log("delete card");
    }

    return (
        <div className={"card__container"}>
            <form className={"card"}>
                <input
                    type="text"
                    className="card__title"
                    placeholder="Enter a title for this card..."
                    value="title"
                />

                <div className={"card__footer"}>
                    <button className={"card__button-add"} type="submit">Add</button>
                    <div className={"card__delete-icon"} onClick={() => onDeleteCard()}>
                        <DeleteOutlined/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Card;
