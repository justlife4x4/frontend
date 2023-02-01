import {React, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';

const EmployeeSearch = forwardRef((props, ref) => {
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
                    className="form-control"
                    placeholder="search" 
                    maxLength={"100"}
                    autoComplete="off"
                    ref={inputRef}
                    onKeyUp={handleSearchChange} />

            </form>
        </div>
    );
})
 
export default EmployeeSearch;