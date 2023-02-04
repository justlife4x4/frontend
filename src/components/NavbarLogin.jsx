import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { useStateContext } from '../contexts/ContextProvider';
import Profile from './auth/Profile';
import ChangePassword from './auth/ChangePassword';
import Logout from './auth/Logout';

const NavbarLogin = ({ pEmployeeId, pEmployeeName, onClicked }) => {
    const contextValues = useStateContext();
    const [menuState, setMenuState] = useState(contextValues.showMenu);
    const [sideBarHeaderClass, setSideBarHeaderClass] = useState("sidebar");
    const [sideBarHeaderTextClass, setSideBarHeaderTextClass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        menuState && setSideBarHeaderClass("sidebar")
        menuState && setSideBarHeaderTextClass("align-middle pt-4")

        !menuState && setSideBarHeaderClass("sidebar bg-white") 
        !menuState && setSideBarHeaderTextClass("align-middle pt-4 header-text")

        contextValues.setMenuStatus(menuState);
        onClicked(menuState);
    }, [menuState]);

    const handleChick = () => {
        setMenuState(!menuState);
    }

    const handleChangeProfileSuccess = () => {
    }
    
    const handleChangePasswordSuccess = () => {
    }
        
    const handleLogoutSuccess = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        navigate('./', { replace: true });
        navigate(0);
    };

    return (
        <nav className="navbar navbar-expand navbar-light fixed-top bg-white" style={{"padding":"0px"}}>
            <div className={sideBarHeaderClass} id="header-sidebar">
                <NavLink className="sidebar-brand" to="/dashboard">
                    <i className="align-middle mr-1">
                        <span className="badge badge-light">
                            <img className="icon" src='assets/img/brands/hotelapp.png' alt="hotelapp" />                  
                        </span>
                    </i>
                    <span className={sideBarHeaderTextClass}>Hotel App</span>
                </NavLink>
            </div>

            <a className="sidebar-toggle d-flex mx-2" href="#" onClick={handleChick}
                data-toggle="collapse" data-target="#sidebar" aria-expanded="true">
                <i className="hamburger align-self-center"></i>
            </a>

            <div className="navbar-collapse collapse">

                {/* if selected then only show the menu */}
                {/* <Nav>
                    <Nav.Link href="#">
                        <Paperclip className="feather-16 mr-1"/>New
                    </Nav.Link>
                    <Nav.Link href="#">
                        <Edit3 className="feather-16 mr-1"/>Edit
                    </Nav.Link>
                    <Nav.Link href="#">
                        <Scissors className="feather-16 mr-1"/>Delete
                    </Nav.Link>
                </Nav> */}

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                            {/* <img src="assets\img\avatars\avatar.jpg" className="avatar img-fluid rounded-circle mr-1" alt="Chris Wood" />  */}
                            <span className="text-dark fw-bold">{pEmployeeName}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">

                            <Profile 
                                pEmployeeId={pEmployeeId}
                                onEdited={handleChangeProfileSuccess}/>

                            <ChangePassword 
                                pEmployeeId={pEmployeeId}
                                onChanged={handleChangePasswordSuccess}/>

                            <Logout
                                pEmployeeId={pEmployeeId}
                                onLogout={handleLogoutSuccess}/>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>     
    );
}

export default NavbarLogin;