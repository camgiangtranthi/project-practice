import {useState, useEffect, ChangeEvent} from "react";
import {Link} from "react-router-dom";
import "./Navbar.scss";
import PopupProfile from "../PopupProfle/PopupProfile";
import Column from "../Column/Column";
import columnApi from "../../api/columnApi";
import {UserResponse} from "../../shared/models/user";

interface INavbarProps {
	userResponse: UserResponse;
}

const Navbar = (props: INavbarProps) => {
	const [isPopupProfile, setIsPopupProfile] = useState(false);
	// @ts-ignore
	const [column, setColumn] = useState<Column>("");
	const [columns, setColumns] = useState([]);
	const [refreshData, setRefreshData] = useState(false);

	const onRefreshData = () => setRefreshData(!refreshData);
	
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
		onRefreshData();
		// @ts-ignore
		setColumns([...columns, response.data]);
		setColumn({id, title});
	};
	
	const handleDeleteColumn = async (id: string) => {
		await columnApi.deleteColumn(id);
		// @ts-ignore
		const newColumns = columns.filter((column) => column.id !== id);
		// @ts-ignore
		setColumns(newColumns);
	}
	
	const handleUpdateColumn = async (columnId: string, title: string) => {
		const response = await columnApi.updateColumn(columnId, {id: columnId, title: title});
		try {
			// @ts-ignore
			const newColumns = columns.map((column) => {
				// @ts-ignore
				if (column.id === columnId) {
					// @ts-ignore
					return {...response.data[0]};
				}
				return column;
			});
			// @ts-ignore
			setColumns(newColumns);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	useEffect(() => {
		const getAllColumns = async () => {
			const allColumns = await retrieveColumns();
			if (allColumns) { // @ts-ignore
				setColumns(allColumns);
			}
		}
		
		getAllColumns();
	}, [refreshData]);
	
	// @ts-ignore
	const addColumn = () => {
		addColumnHandler(column);
	}
	
	return (
		<>
			<nav>
				<div className={"nav__header"}>
					<div className={"nav__content"}>
						<Link to="/">
							<img src="/logo.webp" alt="logo"/>
						</Link>
						<button className={"btn__create"} onClick={addColumn}>Create column</button>
					</div>
					<div className={"nav__profile"}>
						<img
							className={"nav_profile-avatar"}
							src="/avatar.png"
							onClick={handlePopupProfile}
						/>
						{isPopupProfile && (
							<PopupProfile
								userResponse={JSON.parse(localStorage.getItem("current_user") || "")}
							/>
						)}
					</div>
				</div>
			</nav>
			<Column
				columnTitle={column}
				columns={columns}
				addColumn={addColumn}
				handleDeleteColumn={handleDeleteColumn}
				handleUpdateColumn={handleUpdateColumn}
			/>
		</>
	);
};

export default Navbar;
