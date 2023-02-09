import React, { useContext, useEffect, useRef } from "react"

import { HotelId } from "../App"
import useFetchWithAuth from "./useFetchWithAuth"

const RoomCategorySelect = ({ onChange, name, value, disabled = false }) => {
	const hotelId = useContext(HotelId)
	const inputRef = useRef()

    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/roomCategories/${hotelId}`
    })

	useEffect(() => {
        doFetch()
    }, []);

    useEffect(() => {
		!loading && inputRef.current.focus()
    }, [data, loading, error])

	return (
		<select 
			className="form-control"
			name = { name }
			ref = { inputRef }
			disabled = { loading && disabled } 
			value = { value } 
			onChange = { (e) => { onChange(e.target.value) } } >

			<option key="" value="">Select category</option>
			
			{ data &&
				data.map((item) => {
					return (<option key = { item._id } value = { item._id } >{ item.name }</option>)
				}) }

		</select>
    );
}
 
export default RoomCategorySelect