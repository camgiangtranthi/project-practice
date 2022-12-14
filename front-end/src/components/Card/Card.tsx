import "./Card.scss";
import { DeleteOutlined, InfoOutlined} from "@ant-design/icons";
// @ts-ignore
import {card, cardCreateRequest} from "../../shared/models/card";
import {useState} from "react";
import PopupCardDetail from "../PopupCardDetail/PopupCardDetail";


interface ICardProps {
	cards: cardCreateRequest[];
	columnId: string;
	handleDeleteCard: (id: string) => void;
	handleUpdateCard: (id: string, title: string, columnId: string) => void;
}

const Card = (props: ICardProps) => {
	const [title, setTitle] = useState<string>("");
	const [detailVisible, setDetailVisible] = useState(false);
	
	const onDeleteCard = (id: any) => {
		props.handleDeleteCard(id);
	}
	
	const onUpdateCard = (card: any) => {
		props.handleUpdateCard(card.id, title, card.column_id);
	}

	const showDetail = () => {
		setDetailVisible(true);
	}

	const closeDetail = () => {
		setDetailVisible(false);
	}
	
	return (
		<>
			{
				props.cards.filter((item) => item.column_id === props.columnId).map((card, id) => {
					return (
						<div className={"card__container"} key={id}>
							<form className={"card"}>
								<div className={"card__title"}>
									<input
										type="text"
										className="card__title"
										placeholder="Enter a title for this card..."
										defaultValue={card.title}
										onChange={(e) => setTitle(e.target.value)}
									/>

									<InfoOutlined
										onClick={() => showDetail()}
									/>
									{detailVisible && <PopupCardDetail
										onClose={closeDetail}
										card={card}
                                        onUpdateCard={props.handleUpdateCard}
									/>}
								</div>
								
								<div className={"card__footer"}>
									<button className={"card__button-add"} type="submit" onClick={() => onUpdateCard(card)}>Save</button>
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
