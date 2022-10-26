import "./Card.scss";
import {DeleteOutlined} from "@ant-design/icons";
import {card, cardCreateRequest} from "../../shared/models/card";


interface ICardProps {
	cards: cardCreateRequest[];
	columnId: string;
}

const Card = (props: ICardProps) => {
	const onDeleteCard = () => {
		console.log("delete card");
	}
	
	return (
		<>
			{
				props.cards.filter((item) => item.column_id === props.columnId).map((card, id) => {
					return (
						<div className={"card__container"} key={id}>
							<form className={"card"}>
								<input
									type="text"
									className="card__title"
									placeholder="Enter a title for this card..."
									value={card.title}
									onChange={(e) => console.log(e.target.value)}
								/>
								
								<div className={"card__footer"}>
									<button className={"card__button-add"} type="submit">Save</button>
									<div className={"card__delete-icon"} onClick={() => onDeleteCard()}>
										<DeleteOutlined/>
									</div>
								</div>
							</form>
						</div>
					)
				})
			}
		</>
	)
}

export default Card;
