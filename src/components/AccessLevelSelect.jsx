import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useStateContext } from "../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const AccessLevelSelect = ({ onChange, name, value, disabled = false }) => {
	const contextValues = useStateContext();
	const [accesslevelList, setAccesslevelList] = useState([]);
	const [selectedList, setSelectedList] = useState(value);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.accessLevelAPI}`
    });
	let defaultList = [];

	const onSelect = (selectedList) => {
		let list = [];

		for (const item of selectedList) {
			list.push({id: item.value, name: item.label});
		}

		setSelectedList(list);
	}

	useEffect(() => {
        (async () => {
            try {
                await doFetch();

				if (value !== null) {
					for (const item of value) {
						defaultList.push({ value: item.id, label: item.name });
					}
				}
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, [value, doFetch]);		// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
		let list = [];

		if (data !== null) {
			for (const item of data) {
				list.push({ value: item._id, label: item.name });
			}
		}

		setAccesslevelList(list);
    }, [data, loading, error]);

	useEffect(() => {
        onChange(selectedList);
    }, [selectedList]);		// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Select 
			autoFocus
			name = { name }
			options = { accesslevelList } 
			defaultValue = { defaultList }
			isDisabled = { disabled }
			onChange = { onSelect }
			isMulti />
    )
}
 
export default AccessLevelSelect;