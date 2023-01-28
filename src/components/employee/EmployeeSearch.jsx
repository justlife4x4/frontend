import { React } from 'react';
import { useForm } from 'react-hook-form';

const RoomSearch = ({ onSearchChange }) => {
    const {register, trigger} = useForm();
    const keyInpSearch = 'inputSearch';

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        onSearchChange(value);
        trigger(name);
    };

    return (
        <div className="text-right col-6 p-0">
            <form 
                className="d-flex" 
                role="search">

                <input 
                    type="search" 
                    name={keyInpSearch}
                    placeholder="search" 
                    className="form-control"
                    maxLength={100}
                    autoFocus
                    autoComplete="off"
                    onKeyUp={(e) => {handleChange(e)}} 
                    {...register(keyInpSearch)} />

            </form>
        </div>
    );
}
 
export default RoomSearch;