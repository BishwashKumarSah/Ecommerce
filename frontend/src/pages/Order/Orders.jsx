import "./Orders.css";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getMyOrders } from "../../store/orderSlice";
import { STATUSES } from "../../store/statusEnums";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader/Loader";
import { Typography } from "@mui/material";
import MetaData from "../../utils/MetaData";
import ListAltIcon from "@mui/icons-material/ListAlt";

const columns = [
  { field: "id", headerName: "ID", minWidth: 300, flex: 1 },
  {
    field: "orderStatus",
    headerName: "Order Status",
    minWidth: 150,
    flex: 0.4,
    cellClassName: (params) => {
      return params.value === "Processing" ? "redColor" : "greenColor";
    },
  },
  { field: "itemQuantity", headerName: "Quantity", minWidth: 150, flex: 0.2 },
  {
    field: "amountPaid",
    headerName: "Amount Paid($)",
    type: "number",
    minWidth: 150,
    flex: 0.5,
  },
  {
    field: "actions",
    headerName: "Actions",
    type: "number",
    sortable: false,
    minWidth: 270,
    renderCell: (params) => {
      return (
        <Link to={`/order/${params.id}`}>
          <LaunchOutlinedIcon />
        </Link>
      );
    },
  },
];

export default function DataTable() {
  const { myOrders, status, errorMessage } = useSelector(
    (state) => state.order
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  }, [status, errorMessage]);

  // Update rows when myOrders changes
  useEffect(() => {
    if (myOrders && myOrders.length > 0) {
      // Create a new array to avoid mutating state directly
      const newRows = [];
      myOrders.forEach((order) => {
        newRows.push({
          id: order._id,
          orderStatus: order.orderStatus,
          itemQuantity: order.orderItems.length,
          amountPaid: order.totalPrice,
        });
      });
      setRows(newRows); // Set the new array to state
    } else {
      setRows([]); // Clear rows if no orders
    }
  }, [myOrders]);

  return (
    <div style={{ width: "100%" }}>
      <MetaData title={`${user.name} - Orders`} />
      {status === STATUSES.LOADING ? (
        <Loader />
      ) : myOrders.length > 0 ? (
        <>
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </>
      ) : (
        <div className="emptyCart">
          <ListAltIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      )}
    </div>
  );
}
