import "./Card.scss";
import {DeleteOutlined} from "@ant-design/icons";
// @ts-ignore
import {card, cardCreateRequest} from "../../shared/models/card";
import {useState} from "react";


interface ICardProps {
	cards: cardCreateRequest[];
	columnId: string;
	handleDeleteCard: (id: string) => void;
	handleUpdateCard: (id: string, title: string, columnId: string) => void;
}

const Card = (props: ICardProps) => {
	const [title,  setTitle] = useState<string>("");
	
	const onDeleteCard = (id: string) => {
		props.handleDeleteCard(id);
	}
	
	const onUpdateCard = (card: any) => {
		props.handleUpdateCard(card, title, props.columnId);
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
									defaultValue={card.title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								
								<div className={"card__footer"}>
									<button className={"card__button-add"} type="submit" onClick={() => onUpdateCard(card.id)}>Save</button>
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
