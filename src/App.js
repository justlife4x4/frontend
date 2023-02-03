import { React, createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {toast} from 'react-toastify';
import jwt_decode from 'jwt-decode';

import { ContextProvider } from './contexts/ContextProvider';
import Container from './components/Container';
import ContainerSidebar from './components/ContainerSidebar';
import useFetchWithAuth from './components/useFetchWithAuth';

const HotelId = createContext();

function App() {
  const hotelId = '1';  
  const [pEmployeeId, setPEmployeeId] = useState(null);
  const [pEmployeeName, setPEmployeeName] = useState(null);
  const [pEmployeeRoles, setPEmployeeRoles] = useState(null);
  const {data, loading, error, doFetch} = useFetchWithAuth({
    url: `/employees/${hotelId}/${pEmployeeId}`
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const employeeInfo = jwt_decode(localStorage.getItem('token'));

      setPEmployeeId(employeeInfo.UserInfo.userid);
      setPEmployeeName(employeeInfo.UserInfo.username);

      pEmployeeId && doFetch();
    }
  }, [pEmployeeId]);

  useEffect(() => {
    error && toast.error(error);

    let roles = '';
    !loading && data && data.accessLevels.map(role => {
      if (roles.length === 0){
        roles = role.name; 
      } else {
        roles = roles + "," + role.name; 
      }
    });

    setPEmployeeRoles(roles);
  }, [data, error, loading]);

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