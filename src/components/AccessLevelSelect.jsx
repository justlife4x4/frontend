import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";

import { useStateContext } from "../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const AccessLevelSelect = ({ onChange, name, value, disabled = false }) => {
	const inputRef = useRef();
	const contextValues = useStateContext();
	const [accesslevelList, setAccesslevelList] = useState([]);
	const [selectedList, setSelectedList] = useState(value);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.accessLevelAPI}`
    });
	let defaultList = [];

	useEffect(() => {
        doFetch();
		
		value && value.map((item) => {
			defaultList.push({ value: item.id, label: item.name });
		});
    }, []);

    useEffect(() => {
		let list = [];
		data && data.map((item) => {
			list.push({ value: item._id, label: item.name });
		});

		setAccesslevelList(list);
		!loading && inputRef.current.focus();
    }, [data, loading, error]);

	useEffect(() => {
        onChange(selectedList);
    }, [selectedList]);


	const onSelect = (selectedList) => {
		let list = [];

		selectedList.map((item) => {
			list.push({id: item.value, name: item.label});
		});

		setSelectedList(list);
	}

	return (
		<Select 
			ref = { inputRef }
			name = { name }
			options = { accesslevelList } 
			defaultValue = { defaultList }
			isDisabled = { disabled }
			onChange = { onSelect }
			isMulti />
    )
}
 
export default AccessLevelSelect;