import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import { STATUSES } from "../store/statusEnums";

const ProtectedRoutes = ({ isAdmin }) => {
  const { isAuthenticated, status, user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === STATUSES.IDLE) {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading || status === STATUSES.LOADING) {
    return <Loader />;
  }
  if (
    isAuthenticated === false ||
    (isAdmin === true && user.role !== "admin")
  ) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated) {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
