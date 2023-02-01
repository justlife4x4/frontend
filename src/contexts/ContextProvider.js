import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [showMenu, setShowMenu] = useState(localStorage.getItem('menuStatus') !== null ? localStorage.getItem('menuStatus') : true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [itemPerRow, setItemPerRow] = useState(3);
  const [itemPerPage, setItemPerPage] = useState(itemPerRow * 2);
  const [itemPerRowWithoutMenu, setItemPerRowWithoutMenu] = useState(4);
  const [itemPerPageWithoutMenu, setItemPerPageWithoutMenu] = useState(itemPerRowWithoutMenu * 3);

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setMenuStatus = (status) => {
    setShowMenu(status);
    localStorage.setItem('menuStatus', status);
  };

  const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

  return (
    <StateContext.Provider value={{initialState, screenSize, setScreenSize, currentColor, setCurrentColor, 
                                  currentMode, setCurrentMode, themeSettings, setThemeSettings, 
                                  activeMenu, setActiveMenu, showMenu, setShowMenu,
                                  isClicked, setIsClicked, itemPerRow, setItemPerRow, 
                                  itemPerPage, setItemPerPage, itemPerRowWithoutMenu, setItemPerRowWithoutMenu, 
                                  itemPerPageWithoutMenu, setItemPerPageWithoutMenu,
                                  setColor, setMode, setMenuStatus, handleClick}} >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);