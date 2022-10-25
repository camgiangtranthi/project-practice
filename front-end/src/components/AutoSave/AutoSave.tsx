import {useCallback, useEffect} from "react";

import {LOCAL_STORAGE_KEY, ColumnInterface } from "../Column/Column";

const DEBOUNCE_DELAY = 2000;

interface AutoSaveProps {
	column: ColumnInterface;
	// onSave: (column: React.SetStateAction<Column>) => void;
}

const AutoSave = ({column}: AutoSaveProps) => {
	
	const saveColumnData = useCallback((newColumn: () => { (): any; new(): any; title: string; }) => {
		window.localStorage.setItem(LOCAL_STORAGE_KEY, newColumn().title);
		console.log("saved");
	}, [column]);
	
	const debouceSave = useCallback((newColumn: () => { (): any; new(): any; title: string; }) => {
		const timeout = setTimeout(() => {
			saveColumnData(newColumn);
		}, DEBOUNCE_DELAY);
		
		return () => clearTimeout(timeout);
		
	}, [saveColumnData]);
	
	useEffect(() => {
		if(column.title) {
			// @ts-ignore
			debouceSave(column);
		}
	}, [column, debouceSave]);
	
	
	return null;
}

export default AutoSave;