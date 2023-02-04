import { React, createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

import { ContextProvider } from './contexts/ContextProvider';
// import Container from './components/Container';
import ContainerSidebar from './components/ContainerSidebar';
import Login from './pages/Login';
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

  function getRoles(data) {
    let roles = '';
    
    data && data.accessLevels.map(role => {
      if (roles.length === 0){
        roles = role.name; 
      } else {
        roles = roles + "," + role.name; 
      }
    });

    return roles;
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const employeeInfo = jwt_decode(localStorage.getItem('token'));
      setPEmployeeId(employeeInfo.UserInfo.userid);
      setPEmployeeName(employeeInfo.UserInfo.username);

      pEmployeeId && doFetch();
    }
  }, []);

  useEffect(() => {
    error && toast.error(error);
    !error && setPEmployeeRoles(getRoles(data));
  }, [data, error, loading]);

  return (
    <HotelId.Provider value={hotelId}>
      <ContextProvider>
        <BrowserRouter>
          <div className="wrapper">
            {pEmployeeId && <ContainerSidebar 
                pEmployeeId={ pEmployeeId }
                pEmployeeName={ pEmployeeName }
                pEmployeeRoles={ pEmployeeRoles }/>}

            {!pEmployeeId && <Login/>}  
          </div>
        </BrowserRouter>
      </ContextProvider>
    </HotelId.Provider>
  );
}

export default App;
export {HotelId};