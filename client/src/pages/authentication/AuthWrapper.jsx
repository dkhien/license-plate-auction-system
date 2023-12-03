import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function AuthWrapper({ allowedRoles }) {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');
  const userLogged = JSON.parse(localStorage.getItem('userId'));

  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  } if (userLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default AuthWrapper;
