import React, { forwardRef } from "react"

const Search = forwardRef(( props, ref ) => {
    
    const handleSearchChange = (e) => {
        const {value} = e.target
        props.onSearchChange(value)
    }

    return (
        <form 
            className="d-flex col-7" 
            role="search">

            <input 
                type="search" 
                className="form-control mr-1"
                placeholder="search" 
                autoComplete="off"
                autofocus
                maxLength = { 100 }
                onKeyUp = { handleSearchChange } />
        </form>
    )
})
 
export default Search