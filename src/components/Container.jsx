import { React, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from '../pages/Login';
import Error404 from '../pages/Error404';

const Container = () => {
  const navigate = useNavigate();

  useEffect(() => {
      navigate("/login");
  }, []);

  return ( 
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route element={<Error404 />} />
      </Routes>
  );
}

export default Container;