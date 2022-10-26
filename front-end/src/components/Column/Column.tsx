import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {ChangeEvent, useRef, useState} from "react";
import "./Column.scss";
import {columnCreateRequest} from "../../shared/models/column";


interface IColumnProps {
	columnTitle: string;
	columns: columnCreateRequest[];
	addColumn: (column: columnCreateRequest) => void;
	handleDeleteColumn: (id: any) => void;
	handleUpdateColumn: (id: string, title: string) => void;
}

const Column = (props: IColumnProps) => {
	
	const [title,  setTitle] = useState<string>("");
	const titleInputRef = useRef<HTMLInputElement>(null);
	
	const resetColumnTitle = () => {
		titleInputRef.current?.focus();
	}
	
	const onDeleteColumn = (id: any) => {
		props.handleDeleteColumn(id);
	}
	
	const onUpdateColumn = (column: any) => {
		props.handleUpdateColumn(column, title);
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
									onChange={(e) => setTitle(e.target.value)}
									defaultValue={column.title}
								>
								</textarea>
								<button onClick={() => onUpdateColumn(column.id)} className={"column__header-icon"}>
									Save
								</button>
								<div className={"column__delete-icon"} onClick={() => onDeleteColumn(column.id)}>
									<DeleteOutlined/>
								</div>
							</div>
							<div className={"column__addnew"}>
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

function onUpdateColumn(id: string): void {
	throw new Error("Function not implemented.");
}
