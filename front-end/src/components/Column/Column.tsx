import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import "./Column.scss";
import {columnCreateRequest} from "../../shared/models/column";
import Card from "../Card/Card";
import {card, cardCreateRequest} from "../../shared/models/card";
import cardApi from "../../api/cardApi";
import columnApi from "../../api/columnApi";


interface IColumnProps {
	columnTitle: string;
	columns: columnCreateRequest[];
	addColumn: (column: columnCreateRequest) => void;
	handleDeleteColumn: (id: string) => void;
	handleUpdateColumn: (id: string, title: string) => void;
}

const Column = (props: IColumnProps) => {
	const [title,  setTitle] = useState<string>("");
	const titleInputRef = useRef<HTMLInputElement>(null);
	// @ts-ignore
	const [card, setCard] = useState<Card>("");
	const [cards, setCards] = useState([]);

	const resetColumnTitle = () => {
		titleInputRef.current?.focus();
	}
	
	const onDeleteColumn = (id: any) => {
		props.handleDeleteColumn(id);
	}

	const onUpdateColumn = (column: any) => {
		props.handleUpdateColumn(column, title);
	}

	const retrieveCards = async () => {
		const response = await cardApi.getCards();
		return response.data;
	}

	const handleAddCardByColumnId = async (columnid: string) => {
		// @ts-ignore
		const response = await cardApi.createCardByColumnId({title: card}, columnid);
		const {id, title} = response.data;
		// @ts-ignore
		setCards([...cards, response.data]);
		setCard({id, title});
	}

	const handleDeleteCard = async (id: string) => {
		await cardApi.deleteCard(id);
		// @ts-ignore
		const newCards = cards.filter((card) => card.id !== id);
		// @ts-ignore
		setCards(newCards);
	}

	useEffect(() => {
		const getCardByColumnId = async () => {
			const cards = await retrieveCards();
			const cardByColumnId = cards.filter((card: any) => card.columnId === props.columnTitle);
			// @ts-ignore
			setCards(cardByColumnId);
		}
		getCardByColumnId();
	}, []);
	
	return (
		<div className={"column"}>
			{
				props.columns.map((column, id) => {
					// @ts-ignore
					return (
						<div className={"column__container"} key={id}>
							<div className={"column__header"}>
								<input
									ref={resetColumnTitle}
									className={"column__title"}
									placeholder={"Enter column title"}
									onChange={(e) => setTitle(e.target.value)}
									defaultValue={column.title}
								/>
								<button onClick={() => onUpdateColumn(column.id)} className={"column__header-icon"}>
									Save
								</button>
								<div className={"column__delete-icon"} onClick={() => onDeleteColumn(column.id)}>
									<DeleteOutlined/>
								</div>
							</div>
							<div className={"column__body"}>
								<Card
									cards={cards}
									columnId={column.id}
									handleDeleteCard={handleDeleteCard}
								/>
							</div>
							<div className={"column__addnew"}>
								<div>
									<PlusOutlined/>
									<button onClick={() => handleAddCardByColumnId(column.id)} className={"btn__add-task"}>Add a card</button>
								</div>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default Column;
