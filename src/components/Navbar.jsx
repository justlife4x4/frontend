import React from 'react';
import { useNavigate } from 'react-router-dom';

import {useStateContext} from '../contexts/ContextProvider';
import Profile from './auth/Profile';
import ChangePassword from './auth/ChangePassword';
import Logout from './auth/Logout';


const Navbar = ({pEmployeeId, pEmployeeName}) => {
    const contextValues = useStateContext();
    const navigate = useNavigate();

    const handleChick = () => {
        contextValues.setShowMenu(!contextValues.showMenu);
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
        <>
            <nav className="navbar navbar-expand navbar-light bg-white">
                <a className="sidebar-toggle d-flex mr-2" href="#" onClick={handleChick}
                    data-toggle="collapse" data-target="#sidebar" aria-expanded="true">
                    <i className="hamburger align-self-center"></i>
                </a>

                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                                {/* <img src="assets\img\avatars\avatar.jpg" className="avatar img-fluid rounded-circle mr-1" alt="Chris Wood" />  */}
                                <span className="text-dark fw-bold">{pEmployeeName}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">

                                <Profile 
                                    pEmployeeId={pEmployeeId}
                                    onEdited={handleChangeProfileSuccess} />

                                <ChangePassword 
                                    pEmployeeId={pEmployeeId}
                                    onChanged={handleChangePasswordSuccess}/>

                                <Logout
                                    pEmployeeId={pEmployeeId}
                                    onLogout={handleLogoutSuccess} />
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>     
        </>
    );
}

export default Navbar;