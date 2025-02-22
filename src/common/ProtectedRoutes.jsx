import React from 'react'
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  let user = useSelector(selectUser) || JSON.parse(localStorage.getItem("user"));
  return user?.userId ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes