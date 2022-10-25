import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import { useState} from "react";
import "./Column.scss";
import {columnCreateRequest} from "../../shared/models/column";

import AutoSave from "../AutoSave/AutoSave";


interface IColumnProps {
	columns: columnCreateRequest[];
	addColumn: (column: columnCreateRequest) => void;
	handleDeleteColumn: (id: any) => void;
	handleUpdateColumn: (column: ColumnInterface) => void;
}

export const LOCAL_STORAGE_KEY = "columns";

export type ColumnInterface = { title: string };

const Column = (props: IColumnProps) => {
	const [columnTitle, setColumnTitle] = useState<ColumnInterface>(
		() => ({title : window.localStorage.getItem(LOCAL_STORAGE_KEY) || ""})
	);
	
	const onDeleteColumn = (id: any) => {
		props.handleDeleteColumn(id);
		console.log(id);
	}
	
	const onUpdateColumn = (e: any) => {
		
		e.preventDefault();
		if (columnTitle.title === "") return;
		props.handleUpdateColumn(columnTitle);
		setColumnTitle({title: ""});
	};
	
	return (
		<div className={"column"}>
			{
				props.columns.map((column, id) => {
					// @ts-ignore
					return (
						<div className={"column__container"} key={id}>
							<div className={"column__header"}>
								<form onSubmit={() => onUpdateColumn(column.id)}>
									<input
										type="text"
										className={"column__title"}
										placeholder={"Enter column title"}
										value={columnTitle.title}
										onChange={(e) => setColumnTitle({title: e.target.value})}
									/>
									<AutoSave column={column}/>
									<button className={"column__header-icon"}>
										save
									</button>
								</form>
							</div>
							<div className={"column__addnew"}>
								<div>
									<PlusOutlined/>
									<button className={"btn__add-task"}>Add a card</button>
								</div>
								<div className={"column__delete-icon"} onClick={() => onDeleteColumn(column.id)}>
									<DeleteOutlined/>
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