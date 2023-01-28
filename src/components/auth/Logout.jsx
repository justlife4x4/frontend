import {React, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {LogOut} from 'react-feather';

import {HotelId} from '../../App';
import useFetchWithAuth from '../useFetchWithAuth';

const Logout = ({pEmployeeId, onLogout}) => {
	const hotelId = useContext(HotelId);

	const { data, loading, error, doLogout } = useFetchWithAuth({
        url: `/logout/${hotelId}/${pEmployeeId}`
    });

	useEffect(() => {
		!error && data === "OK" && onLogout();
    }, [data]);

	const handleLogout = async (e) => {
		e.preventDefault();
		await doLogout();
    }

    return ( 
		<Link className="dropdown-item" href="#" onClick={(e)=>{loading && e.preventDefault() 
																!loading && handleLogout(e)}}>
			<LogOut size={16}/>
			&nbsp;Sign out
		</Link>
    );
}
 
export default Logout;