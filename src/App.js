import { React, createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { ContextProvider } from './contexts/ContextProvider';
import Container from './components/Container';
import ContainerSidebar from './components/ContainerSidebar';


const HotelId = createContext();

function App() {
  const hotelId = '1';  
  const [pEmployeeId, setPEmployeeId] = useState(null);
  const [pEmployeeName, setPEmployeeName] = useState(null);
  const [pEmployeeRoles, setPEmployeeRoles] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const employeeInfo = jwt_decode(localStorage.getItem('token'));

      setPEmployeeId(employeeInfo.UserInfo.userid);
      setPEmployeeName(employeeInfo.UserInfo.username);
      setPEmployeeRoles(employeeInfo.UserInfo.roles);
    }
  }, [pEmployeeId]);

  return (
    <HotelId.Provider value={hotelId}>
      <ContextProvider>
        <BrowserRouter>
          <div className="wrapper">
            {!pEmployeeId && (<Container/>)}
            {pEmployeeId && (<ContainerSidebar 
                                  pEmployeeId={pEmployeeId}
                                  pEmployeeName={pEmployeeName}
                                  pEmployeeRoles={pEmployeeRoles}/>)}    
          </div>
        </BrowserRouter>
      </ContextProvider>
    </HotelId.Provider>
  );
}

export default App;
export { HotelId };