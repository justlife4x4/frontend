import React, { useState, useRef } from "react"
import { Routes, Route, NavLink } from "react-router-dom"
import { Sliders } from "react-feather"

import Navbar from "./NavbarLogin"
import Footer from "./FooterLogin"

import { useStateContext } from "../contexts/ContextProvider"
import Dashboard from "../pages/Dashboard"
import AccessLevels from "../pages/AccessLevels"
import Employees from "../pages/Employees"
import Plans from "../pages/Plans"
import RoomCategories from "../pages/RoomCategories"
import Rooms from "../pages/Rooms"
import IDDocuments from "../pages/IDDocuments"
// import BookingAgents from '../pages/BookingAgents'

import Support from "../pages/Support"
import Help from "../pages/Help"
import Privacy from "../pages/Privacy"
import Terms from "../pages/Terms"
import Error404 from "../pages/Error404"

const ContainerLogin = ({ pEmployeeId, pEmployeeName, pEmployeeRoles }) => {
  const contextValues = useStateContext()
  const [menuState, setMenuState] = useState(contextValues.showMenu)
  const [menuSelected, setMenuSelected] = useState(null)
  const navRef =  useRef(null)
  const employeeRef = useRef(null)

  const handleShowHideSideBar = (s) => {
    setMenuState(s)
  }

  const handelMenuClick = (page) => {
    navRef.current.changePage(page)
    setMenuSelected(page)
  }

  const handleSearch = (text) => {
    if (menuSelected === "Employees") {
      employeeRef && employeeRef.current.changeSearch(text)
    }
  }

  const handleAdd = () => {
    if (menuSelected === "Employees") {
        employeeRef && employeeRef.current.openAdd()
    }
  }

  const handleEdit = () => {
    if (menuSelected === "Employees") {
        employeeRef && employeeRef.current.openEdit()
    }
  }

  const handleDel = () => {
    if (menuSelected === "Employees") {
        employeeRef && employeeRef.current.openDelete()
    }
  }


  return ( 
    <>
      { menuState && 
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
                  <li className={ `sidebar-item ${ menuSelected === 'Roles' ? 'active' : null }` } 
                      onClick = { () => { handelMenuClick('Roles') } }>
                      <NavLink to="/accesslevel" className="sidebar-link">Role</NavLink>
                  </li>
                  <li className={ `sidebar-item ${ menuSelected === 'ID documents' ? 'active' : null }` } 
                      onClick = { () => { handelMenuClick('ID documents') } }>
                      <NavLink to="/iddocument" className="sidebar-link">ID document</NavLink>
                  </li>
                  {/* <li className={`sidebar-item ${menuSelected === 'bookingagent' ? 'active' : ''}`} onClick={() => {handelMenuClick('bookingagent')}}>
                      <NavLink to="/bookingagent" className="sidebar-link">Booking agent</NavLink>
                  </li> */}
                  <li className={ `sidebar-item ${ menuSelected === 'Employees' ? 'active' : null }` } 
                      onClick = { () => { handelMenuClick('Employees') } }>
                      <NavLink to="/employee" className="sidebar-link">Employee</NavLink>
                  </li>
                  <li className={ `sidebar-item ${ menuSelected === 'Plans' ? 'active' : null }` } 
                      onClick={ () => { handelMenuClick('Plans') } }>
                      <NavLink to="/plan" className="sidebar-link">Plan</NavLink>
                  </li>
                  <li className={ `sidebar-item ${ menuSelected === 'Room categories' ? 'active' : null }` } 
                      onClick={ () => { handelMenuClick('Room categories') } }>
                      <NavLink to="/roomcategory" className="sidebar-link">Room category</NavLink>
                  </li>
                  <li className={ `sidebar-item ${ menuSelected === 'Rooms' ? 'active' : null }` } 
                      onClick = { () => { handelMenuClick('Rooms') } }>
                      <NavLink to="/room" className="sidebar-link">Room</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav> }

        <div className="main">
          <Navbar
              pEmployeeId = { pEmployeeId }
              pEmployeeName = { pEmployeeName }
              pSelectedPage = { menuSelected }
              onShowHideSideBar = { (s) => handleShowHideSideBar(s) }
              onChangeSearch = { (s) => handleSearch(s) } 
              onClickAdd = { handleAdd } 
              onClickEdit = { handleEdit }
              onClickDel = { handleDel }
              ref = { navRef } />

          <main className="content">
            <div className="container-fluid p-0">
              <Routes>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/accesslevel" element={<AccessLevels />} />
                <Route exact path="/employee" element={<Employees ref = { employeeRef } />} />
                <Route exact path="/plan" element={<Plans />} />
                <Route exact path="/roomcategory" element={<RoomCategories />} />
                <Route exact path="/room" element={<Rooms />} />
                <Route exact path="/iddocument" element={<IDDocuments />} />
                {/* <Route exact path="/bookingagent" element={<BookingAgents />} /> */}
                <Route exact path="/support" element={<Support />} />
                <Route exact path="/help" element={<Help />} />
                <Route exact path="/privacy" element={<Privacy />} />
                <Route exact path="/terms" element={<Terms />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
    </>
  );
}

export default ContainerLogin