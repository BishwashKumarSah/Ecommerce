import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./PageNotFound.css";

import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default PageNotFound;
