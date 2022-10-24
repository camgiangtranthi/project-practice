import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import { Autosave, useAutosave } from 'react-autosave';
import {ChangeEvent, useState} from "react";
import "./Column.scss";
import {columnCreateRequest, columnUpdateRequest} from "../../shared/models/column";
import {api} from "../../api/column";


interface IColumnProps {
	columns: columnCreateRequest[];
	setColumns: (columns: columnCreateRequest[]) => void;
	addColumn: (column: columnCreateRequest) => void;
}

const Column = (props: IColumnProps) => {
	const [title, setTitle] = useState((props.columns[0].title) || "");
	
	const handleUpdateColumn = async (column: columnUpdateRequest) => {
		const response = await api.post(`/columns/${column.id}`, column);
		const {id, title} = response.data;
		props.setColumns(
			props.columns.map((column) => {
				return column.id === id ? {...response.data} : column;
			})
		);
	}
	
	useAutosave({data: title, onSave: (data) => handleUpdateColumn({id: props.columns[0].id, title: data})});
	
	const updateColumn = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		handleUpdateColumn({id: event.target.id, title: event.target.value});
		setTitle("");
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
										onChange={updateColumn}
										value={title}
									/>
								</form>
								<div className={"column__header-icon"}>
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