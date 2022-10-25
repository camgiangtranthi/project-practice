import {useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {v4 as uuid} from 'uuid';
import "./Navbar.scss";
import PopupProfile from "../PopupProfle/PopupProfile";
import Column from "../Column/Column";
import {api} from "../../api/column";


const Navbar = () => {
	const [isPopupProfile, setIsPopupProfile] = useState(false);
	// @ts-ignore
	const [column, setColumn] = useState<Column>({title: ""});
	const [columns, setColumns] = useState([]);
	
	const retrieveColumns = async () => {
		const response = await api.get("/columns");
		return response.data;
	};
	
	const handlePopupProfile = () => {
		setIsPopupProfile(!isPopupProfile);
	};
	
	// @ts-ignore
	const addColumnHandler = async (column) => {
		const request = {
			id: uuid(),
			...column,
		};
		
		const response = await api.post("/columns", request);
		const {id, title} = response.data;
		// @ts-ignore
		setColumns([...columns, response.data]);
		setColumn({id, title});
	};
	
	const handleDeleteColumn = async (id: any) => {
		await api.delete(`/columns/${id}`);
		// @ts-ignore
		const newColumns = columns.filter((column) => column.id !== id);
		// @ts-ignore
		setColumns(newColumns);
	}
	
	const handleUpdateColumn = async (column: any) => {
		const response = await api.put(`/columns/${column.id}`, column);
		const { id } = response.data;
		// @ts-ignore
		setColumns(columns.map((column) => {
			// @ts-ignore
			return column.id === id ? { ...response.data } : column;
		}));
	}
	
	useEffect(() => {
		const getAllColumns = async () => {
			const allColumns = await retrieveColumns();
			if (allColumns) setColumns(allColumns);
		}
		
		getAllColumns();
	}, []);
	
	// @ts-ignore
	const addColumn = () => {
		addColumnHandler(column);
	}
	
	return (
		<nav>
			<div className={"nav__header"}>
				<div className={"nav__content"}>
					<Link to="/">
						<img src="/logo.webp" alt="logo"/>
					</Link>
					<button className={"btn__create"} onClick={addColumn}>Create column</button>
				</div>
				<div className={"nav__profile"}>
          <span className={"nav_profile-avatar"} onClick={handlePopupProfile}>
            <img
	            className={"profile__avatar"}
            />
          </span>
					{isPopupProfile && (
						<PopupProfile/>
					)}
				</div>
			</div>
			<Column
				columns={columns}
				addColumn={addColumn}
				handleDeleteColumn={handleDeleteColumn}
				handleUpdateColumn={handleUpdateColumn}
			/>
		</nav>
	);
};

export default Navbar;
