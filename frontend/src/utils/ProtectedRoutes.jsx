import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {isAuthenticated && isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </Fragment>
  );
};

export default ProtectedRoutes;