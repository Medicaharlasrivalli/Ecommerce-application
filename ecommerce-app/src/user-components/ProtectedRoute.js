import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
};

export default ProtectedRoute;