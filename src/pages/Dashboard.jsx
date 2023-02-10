import React, { useContext } from "react";
import { HotelId } from "../App";

const Dashboard = () => {
    const hotelId = useContext(HotelId);
    
    return ( 
        <div className="mt-5">
            Dashboard  Hotel Id : {hotelId}
        </div> 
    );
}
 
export default Dashboard;