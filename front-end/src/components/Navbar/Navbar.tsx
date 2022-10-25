import {useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./Navbar.scss";
import PopupProfile from "../PopupProfle/PopupProfile";
import Column from "../Column/Column";
import columnApi from "../../api/columnApi";
import {UserResponse} from "../../shared/models/user";

interface INavbarProps {
	userResponse: UserResponse;
}

const Navbar = () => {
	const [isPopupProfile, setIsPopupProfile] = useState(false);
	// @ts-ignore
	const [column, setColumn] = useState<Column>({title: ""});
	const [columns, setColumns] = useState([]);
	
	const retrieveColumns = async () => {
		const response = await columnApi.getColumns();
		return response.data;
	};
	
	const handlePopupProfile = () => {
		setIsPopupProfile(!isPopupProfile);
	};
	
	// @ts-ignore
	const addColumnHandler = async (column) => {
		const request = {
			...column,
		};

		const response = await columnApi.createColumn(request);
		const {id, title} = response.data;
		// @ts-ignore
		setColumns([...columns, response.data]);
		setColumn({id, title});
	};
	
	const handleDeleteColumn = async (id: any) => {
		await columnApi.deleteColumn(id);
		// @ts-ignore
		const newColumns = columns.filter((column) => column.id !== id);
		// @ts-ignore
		setColumns(newColumns);
	}
	
	const handleUpdateColumn = async (column: any) => {
		const response = await columnApi.updateColumn(column.id, column);
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
			if (allColumns) { // @ts-ignore
				setColumns(allColumns);
			}
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
						<PopupProfile userResponse={JSON.parse(
							localStorage.getItem("current_user") || ""
						)}/>
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
