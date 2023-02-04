import {React, useState} from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import {Sliders} from 'react-feather';

import Navbar from './Navbar';
import Footer from './Footer';

import {useStateContext} from '../contexts/ContextProvider';
import Dashboard from '../pages/Dashboard';
import AccessLevels from '../pages/AccessLevels';
import Employees from '../pages/Employees';
import Plans from '../pages/Plans';
import RoomCategories from '../pages/RoomCategories';
import Rooms from '../pages/Rooms';
import IDDocuments from '../pages/IDDocuments';
import BookingAgents from '../pages/BookingAgents';

import Support from '../pages/Support';
import Help from '../pages/Help';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Error404 from '../pages/Error404';

const ContainerSidebar = ({pEmployeeId, pEmployeeName, pEmployeeRoles}) => {
  const contextValues = useStateContext();
  const [menuState, setMenuState] = useState(contextValues.showMenu);
  const [selected, setSelected] = useState('');
  
  const handleShowHide = (s) => {
    setMenuState(s);
  }

  const handelClick = (page) => {
    setSelected(page);
  }

  return ( 
    <>
      {menuState && 
        <nav id="sidebar" className="sidebar mt-5">
          <div className="sidebar-content">
            <ul className="sidebar-nav">
              <li className="sidebar-header">{pEmployeeRoles}</li>
              <li className="sidebar-item">
                <a href="#masters" data-toggle="collapse" className="sidebar-link collapsed">
                  <Sliders size={16}/>
                  <span className="align-middle">Master</span>
                </a>
                <ul id="masters" className="sidebar-dropdown list-unstyled collapse" data-parent="#sidebar">
                  <li className={`sidebar-item ${selected === 'accesslevel' ? 'active' : ''}`} onClick={() => {handelClick('accesslevel')}}>
                      <NavLink to="/accesslevel" className="sidebar-link">Access level</NavLink>
                  </li>
                  <li className={`sidebar-item ${selected === 'iddocument' ? 'active' : ''}`} onClick={() => {handelClick('iddocument')}}>
                      <NavLink to="/iddocument" className="sidebar-link">ID document</NavLink>
                  </li>
                  <li className={`sidebar-item ${selected === 'bookingagent' ? 'active' : ''}`} onClick={() => {handelClick('bookingagent')}}>
                      <NavLink to="/bookingagent" className="sidebar-link">Booking agent</NavLink>
                  </li>
                  <li className={`sidebar-item ${selected === 'employee' ? 'active' : ''}`} onClick={() => {handelClick('employee')}}>
                      <NavLink to="/employee" className="sidebar-link">Employee</NavLink>
                  </li>
                  <li className={`sidebar-item ${selected === 'plan' ? 'active' : ''}`} onClick={() => {handelClick('plan')}}>
                      <NavLink to="/plan" className="sidebar-link">Plan</NavLink>
                  </li>
                  <li className={`sidebar-item ${selected === 'roomcategory' ? 'active' : ''}`} onClick={() => {handelClick('roomcategory')}}>
                      <NavLink to="/roomcategory" className="sidebar-link">Room category</NavLink>
                  </li>
                  <li className={`sidebar-item ${selected === 'room' ? 'active' : ''}`} onClick={() => {handelClick('room')}}>
                      <NavLink to="/room" className="sidebar-link">Room</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>}

      <div className="main">
        <Navbar 
          pEmployeeId={pEmployeeId}
          pEmployeeName={pEmployeeName}
          onClicked={(s) => handleShowHide(s)}/>

        <main className="content">
          <div className="container-fluid p-0">
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/accesslevel" element={<AccessLevels />} />
              <Route exact path="/employee" element={<Employees />} />
              <Route exact path="/plan" element={<Plans />} />
              <Route exact path="/roomcategory" element={<RoomCategories />} />
              <Route exact path="/room" element={<Rooms />} />
              <Route exact path="/iddocument" element={<IDDocuments />} />
              <Route exact path="/bookingagent" element={<BookingAgents />} />
              <Route exact path="/support" element={<Support />} />
              <Route exact path="/help" element={<Help />} />
              <Route exact path="/privacy" element={<Privacy />} />
              <Route exact path="/terms" element={<Terms />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </main>

        <Footer/>
      </div>
    </>
  );
}

export default ContainerSidebar;