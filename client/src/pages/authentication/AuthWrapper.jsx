import React from 'react';
import {
  Outlet, useNavigate,
} from 'react-router-dom';

function AuthWrapper() {
  const navigate = useNavigate(); // navigation object

  const userLogged = JSON.parse(localStorage.getItem('userId'));

  return userLogged
    ? <Outlet />
    : (
      navigate('/login')
    );
}

export default AuthWrapper;
