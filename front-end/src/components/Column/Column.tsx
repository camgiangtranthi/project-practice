import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {ChangeEvent, useRef, useState} from "react";
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

	const titleInputRef = useRef<HTMLInputElement>(null);

	const resetColumnTitle = () => {
		titleInputRef.current?.focus();
	}
	
	const onDeleteColumn = (id: any) => {
		props.handleDeleteColumn(id);
	}

	const onUpdateColumn = () => {
		// @ts-ignore
		console.log(titleInputRef.current?.value);
	}
	
	return (
		<div className={"column"}>
			{
				props.columns.map((column, id) => {
					// @ts-ignore
					return (
						<div className={"column__container"} key={id}>
							<div className={"column__header"}>

									<textarea
										ref={resetColumnTitle}
										className={"column__title"}
										placeholder={"Enter column title"}
									>
									</textarea>
									<button onClick={onUpdateColumn} className={"column__header-icon"}>
										Save
									</button>
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

function onUpdateColumn(id: string): void {
    throw new Error("Function not implemented.");
}
