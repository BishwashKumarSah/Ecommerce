import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./Success.css";

import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../../../utils/MetaData";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <MetaData title="Order Success" />
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully 🎉 </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
