import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {ChangeEvent, useState, useCallback} from "react";
import "./Column.scss";
import {column, columnCreateRequest, columnUpdateRequest} from "../../shared/models/column";
import {api} from "../../api/column";

import AutoSave from "../AutoSave/AutoSave";


interface IColumnProps {
	columns: columnCreateRequest[];
	setColumns: (columns: columnCreateRequest[]) => void;
	addColumn: (column: columnCreateRequest) => void;
}

export const LOCAL_STORAGE_KEY = "columns";

export type Column = { title: string };

const Column = (props: IColumnProps, Column : Column) => {
	const [columnTitle, setColumnTitle] = useState<Column>(
		() => ({title : window.localStorage.getItem(LOCAL_STORAGE_KEY) || ""})
	);
	
	const handleUpdateColumn = async (column: columnUpdateRequest) => {
		const response = await api.put(`/columns/${column.id}`, column);
		const {id, title} = response.data;
		props.setColumns(
			props.columns.map((column) => {
				return column.id === id ? {...response.data} : column;
			})
		);
	}
	
	const handleDeleteColumn = async (id: any) => {
		await api.delete(`/columns/${id}`);
		const newColumns = props.columns.filter((column) => column.id !== id);
		// props.setColumns(newColumns);
	}
	
	const onColumnTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		event.preventDefault();
		handleUpdateColumn({id: event.target.id, title: event.target.value});
		// @ts-ignore
		setColumnTitle("");
	}
	
	const onDeleteColumn = (id: any) => {
		handleDeleteColumn(id);
	}
	
	return (
		<div className={"column"}>
			{
				props.columns.map((column, id) => {
					return (
						<div className={"column__container"} key={id}>
							<div className={"column__header"}>
								<form>
									<input
										type="text"
										className={"column__title"}
										placeholder={"Enter column title"}
										onChange={onColumnTitleChange}
										value={columnTitle.title}
									/>
									<AutoSave column={column}/>
								</form>
								<div className={"column__header-icon"} onClick={() => onDeleteColumn(id)}>
									<DeleteOutlined/>
								</div>
							</div>
							<div className={"column__addnew"}>
								<PlusOutlined/>
								<button className={"btn__add-task"}>Add a card</button>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default Column;