import { React, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from '../pages/Login';

const Container = () => {
  const navigate = useNavigate();

  useEffect(() => {
      navigate("/");
  }, []);

  return ( 
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
  );
}

export default Container;