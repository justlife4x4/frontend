import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useNavigate, NavLink } from "react-router-dom"
import { ChevronsLeft, ChevronsRight, Paperclip, Edit3, Scissors, AtSign } from "react-feather"

import { useStateContext } from "../contexts/ContextProvider"
import Search from "../components/Search"
import ChangePassword from "./auth/ChangePassword"
import Profile from "./auth/Profile"
import Logout from "./auth/Logout"


const NavbarLogin = forwardRef(( props, ref ) => {        
    const contextValues = useStateContext()
    const [menuState, setMenuState] = useState(contextValues.showMenu)
    const [selectedPage, setSelectedPage] = useState(null)
    const [sideBarHeaderClass, setSideBarHeaderClass] = useState("sidebar")
    const [sideBarHeaderTextClass, setSideBarHeaderTextClass] = useState("")
    const searchRef = useRef(null)
    const navigate = useNavigate()


    useEffect(() => {
        menuState && setSideBarHeaderClass("sidebar")
        menuState && setSideBarHeaderTextClass("align-middle pt-4")

        !menuState && setSideBarHeaderClass("sidebar bg-white") 
        !menuState && setSideBarHeaderTextClass("align-middle pt-4 header-text")

        contextValues.setMenuStatus(menuState)
        props.onShowHideSideBar(menuState)
    }, [menuState])

    const changePage = (page) => {
        setSelectedPage(page)

        // show hide operation menu according to selected page
    }


    const handleShowHideMenu = () => {
        setMenuState(!menuState)
    }

    const handleChangeProfileSuccess = () => {
    }
    
    const handleChangePasswordSuccess = () => {
    }
        
    const handleLogoutSuccess = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')

        navigate('./', { replace: true })
        navigate(0)
    }


    {/* Start :: handle page component search/add/edit/delete */}
    // Start :: Search
    const handleSearch = (text) => {
        props.onChangeSearch(text)
    };
    // End :: Search

    // Start :: Open add modal
    const handleOpenAdd = (e) => {
        e.preventDefault()
        props.onClickAdd()
    }
    // End :: Open add modal

    // Start :: Open edit modal
    const handleOpenEdit = (e) => {
        e.preventDefault()
        props.onClickEdit()
    }
    // End :: Open edit modal

    // Start :: Open delete modal
    const handleOpenDel = (e) => {
        e.preventDefault()
        props.onClickDel()
    }
    // End :: Open delete modal
    {/*  End :: handle page component search/add/edit/delete */}

    useImperativeHandle(ref, () => {
        return {
            changePage
        }
    })

    function setName(name) {
        let smallName = null
        const names = name.split(' ')

        if (names.length > 0) {
            smallName = names[0]
        } else {
            smallName = name
        }

        return smallName
    }

    return (
        <nav className="navbar navbar-expand navbar-light fixed-top bg-white" style={{"padding":"0px"}}>
            <div className = { sideBarHeaderClass } id="header-sidebar">
                <NavLink className="sidebar-brand" to="/dashboard">
                    <i className="align-middle mr-1">
                        <span className="badge badge-light">
                            <img className="icon" src='assets/img/brands/hotelapp.png' alt="hotelapp" />                  
                        </span>
                    </i>
                    <span className = { sideBarHeaderTextClass }>Hotel App</span>
                </NavLink>
            </div>

            <a className="sidebar-toggle d-flex mx-2" href="#" onClick = { handleShowHideMenu }
                data-toggle="collapse" data-target="#sidebar" aria-expanded="true">
                { menuState ? <ChevronsLeft size={28} className="mx-1"/> : <ChevronsRight size={28} className="mx-1"/> }
            </a>

            <div className="navbar-collapse collapse">
                
                {/* if selected then only show the menu */}
                { selectedPage &&
                    <>
                        <Navbar.Brand href="#">{ selectedPage }</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto col-7">
                                <Search 
                                    onSearchChange = { handleSearch }
                                    ref = { searchRef } />

                                <OverlayTrigger
                                    placement="bottom"
                                    overlay = { <Tooltip>new</Tooltip> } >
                                    
                                    <button 
                                        className="btn btn-success ml-3 mr-1" 
                                        size="md" 
                                        onClick = { handleOpenAdd } >

                                        <Paperclip className="feather-16" />
                                    </button>

                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="bottom"
                                    overlay = { <Tooltip>edit</Tooltip> } >
                                    
                                    <button 
                                        className="btn btn-info mx-1" 
                                        size="md" 
                                        onClick = { handleOpenEdit } >

                                        <Edit3 className="feather-16" />
                                    </button>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="bottom"
                                    overlay = { <Tooltip>delete</Tooltip> } >
                                    <button 
                                        className="btn btn-danger mx-1" 
                                        size="md" 
                                        onClick = { handleOpenDel } >

                                        <Scissors className="feather-16"/>
                                    </button>
                                </OverlayTrigger>
                            </Nav>
                        </Navbar.Collapse>
                    </> }

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle d-none d-sm-inline-block" 
                            href="#" 
                            data-toggle="dropdown">
                            <span className="text-dark fw-bold mx-2">
                                <AtSign size={20} className="mx-1"/>
                                { setName(props.pEmployeeName) }
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Profile 
                                pEmployeeId = { props.pEmployeeId }
                                onEdited = { handleChangeProfileSuccess } />

                            <ChangePassword 
                                pEmployeeId = { props.pEmployeeId }
                                onChanged = { handleChangePasswordSuccess } />

                            <Logout
                                pEmployeeId = { props.pEmployeeId }
                                onLogout = { handleLogoutSuccess } />
                        </div>
                    </li>
                </ul>
            </div>
        </nav>     
    )
})

export default NavbarLogin