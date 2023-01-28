import { React, useEffect, useState, useRef } from 'react';
import Multiselect from 'multiselect-react-dropdown';

import useFetchWithAuth from './useFetchWithAuth';

const AccessLevelSelect = ({ onChange, name, value, disabled = false }) => {
	const inputRef = useRef();
	const [accesslevelList, setAccesslevelList] = useState([]);
	const [selectedList, setSelectedList] = useState(value);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/accessLevels`
    });

	useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
		var list = [];
		data && data.map((item) => {
			list.push({ id: item._id, name: item.name });
		});
		setAccesslevelList(list);
		// !loading && inputRef.current.focus();
    }, [data, loading, error]);

	useEffect(() => {
        onChange(selectedList);
    }, [selectedList]);

	const onSelect = (selectedList, selectedItem) => {
		setSelectedList(selectedList);
	};
	
	const onRemove = (selectedList, removedItem) => {
		setSelectedList(selectedList);
	};

	return (
		<>
			{data &&
				<Multiselect
					name={name}
					disabled={loading && disabled} 
					options={accesslevelList}
					selectedValues={value}
					ref={inputRef}
					onSelect={onSelect}
					onRemove={onRemove}
					showCheckbox="true"
					displayValue="name"/>}
		</>				
    );
}
 
export default AccessLevelSelect;