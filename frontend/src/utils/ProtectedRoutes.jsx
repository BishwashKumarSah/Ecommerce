import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import STATUSES from "../store/statusEnums";

const ProtectedRoutes = () => {
  const { status, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </Fragment>
  );
};

export default ProtectedRoutes;