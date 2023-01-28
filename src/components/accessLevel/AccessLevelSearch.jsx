import {React, useRef, useEffect, forwardRef, useImperativeHandle} from 'react';


const AccessLevelSearch = forwardRef((props, ref) => {
    const inputRef = useRef();

    const setFocus = () => {
        inputRef.current && inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            setFocus
        }
      }, []);

    useEffect(() => {
        setFocus();
      }, []);

    const handleSearchChange = (e) => {
        const {value} = e.target;
        props.onSearchChange(value);
    };

    return (
        <div className="text-right col-6 p-0">
            <form 
                className="d-flex" 
                role="search">

                <input 
                    type="search" 
                    placeholder="search" 
                    className="form-control"
                    maxLength={"100"}
                    autoComplete="off"
                    ref={inputRef}
                    onKeyUp={handleSearchChange} />

            </form>
        </div>
    );
})
 
export default AccessLevelSearch;