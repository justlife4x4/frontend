import {React, useContext} from 'react';
import {HotelId} from "../App";

const Dashboard = () => {
    const hotelId = useContext(HotelId);
    
    return ( 
        <>
            Dashboard
        </> 
    );
}
 
export default Dashboard;