import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect, useRef, useState} from "react";
import "./Column.scss";
import {columnCreateRequest} from "../../shared/models/column";
// @ts-ignore
import Card from "../Card/Card";
// @ts-ignore
import cardApi from "../../api/cardApi";


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
	const [refreshData, setRefreshData] = useState(false);

	const onRefreshData = () => setRefreshData(!refreshData);

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
		const request = {
			...card,
		};

		const response = await cardApi.createCardByColumnId(request, columnid);
		const { id, title } = response.data;

		onRefreshData();
	}

	const handleDeleteCard = async (id: string) => {
		await cardApi.deleteCard(id);
		// @ts-ignore
		const newCards = cards.filter((card) => card.id !== id);
		// @ts-ignore
		setCards(newCards);
	}
	
	const handleUpdateCard = async (cardId: string, title: string, columnId: string) => {
		const response = await cardApi.updateCard(cardId, {id: cardId, title: title, column_id:  columnId});
		try {
			// @ts-ignore
			const newCards = cards.map((card) => {
				// @ts-ignore
				if (card.id === cardId) {
					// @ts-ignore
					return {...response.data[0]};
				}
				return card;
			});
			// @ts-ignore
			setCards(newCards);
		} catch (e) {
			return e;
		}
	}

	useEffect(() => {
		const getCards = async () => {
			const initialCards = await retrieveCards();
			// @ts-ignore
			setCards(initialCards);
		}
		getCards();
	}, [refreshData]);
	
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
									handleUpdateCard={handleUpdateCard}
								/>
							</div>
							<div className={"column__addnew"} onClick={() => handleAddCardByColumnId(column.id)}>
								<div>
									<PlusOutlined/>
									<button className={"btn__add-task"}>Add a card</button>
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
