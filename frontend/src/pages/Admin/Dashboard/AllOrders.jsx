import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { deleteOrder, getAllOrders } from "../../../store/adminSlice";
import { STATUSES } from "../../../store/statusEnums";
import Loader from "../../../utils/Loader/Loader";
import MetaData from "../../../utils/MetaData";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function DataTable() {
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
          <Fragment>
            <div className="action_button">
              <Link
                to={`/admin/dashboard/editOrder/${params.id}`}
                className="pencil"
              >
                <EditIcon />
              </Link>

              <Button onClick={() => handleOrderDelete(params.id)}>
                <DeleteForeverIcon />
              </Button>
            </div>
          </Fragment>
        );
      },
    },
  ];
  const { allOrders, status, errorMessage } = useSelector(
    (state) => state.admin
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  const handleOrderDelete = (id) => {
    dispatch(deleteOrder(id)).then(() =>
      dispatch(getAllOrders()).then(() =>
        toast.success("Order Deleted Successfully")
      )
    );
  };

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  }, [status, errorMessage]);

  // Update rows when allOrders changes
  useEffect(() => {
    if (allOrders && allOrders.length > 0) {
      // Create a new array to avoid mutating state directly
      const newRows = [];
      allOrders.forEach((order) => {
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
  }, [allOrders]);

  return (
    <div style={{ width: "100%" }}>
      <MetaData title={`${user.name} - Orders`} />
      {status === STATUSES.LOADING ? (
        <Loader />
      ) : allOrders.length > 0 ? (
        <div className="all_orders_admin" style={{ paddingLeft: "1rem" }}>
          <Typography id="myOrdersHeading">All Orders</Typography>
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
        </div>
      ) : (
        <div className="emptyCart">
          <ListAltIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/admin/dashboard">View Dashboard</Link>
        </div>
      )}
    </div>
  );
}
