import "./Card.scss";


const Card = () => {
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
                    <button className={"card__button-delete"}>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default Card;
