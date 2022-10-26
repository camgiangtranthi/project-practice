import "./Card.scss";
import {DeleteOutlined} from "@ant-design/icons";
import {card, cardCreateRequest} from "../../shared/models/card";


interface ICardProps {
	cards: cardCreateRequest[];
	columnId: string;
	handleDeleteCard: (id: string) => void;
}

const Card = (props: ICardProps) => {
	const onDeleteCard = (id: any) => {
		props.handleDeleteCard(id);
	}
	
	return (
		<>
			{
				props.cards.map((card, id) => {
					return (
						<div className={"card__container"} key={id}>
							<form className={"card"}>
								<input
									type="text"
									className="card__title"
									placeholder="Enter a title for this card..."
									value={card.title}
								/>
								
								<div className={"card__footer"}>
									<button className={"card__button-add"} type="submit">Save</button>
									<div className={"card__delete-icon"} onClick={() => onDeleteCard(card.id)}>
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
