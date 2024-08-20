import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import {
  deleteUserProfile,  
  getAllUsers,
} from "../../../store/adminSlice";
import { STATUSES } from "../../../store/statusEnums";
import Loader from "../../../utils/Loader/Loader";
import MetaData from "../../../utils/MetaData";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function DataTable() {
  const columns = [
    { field: "id", headerName: "ID", minWidth: 250, flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Processing" ? "redColor" : "greenColor";
      },
    },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.4 },
    {
      field: "role",
      headerName: "Role",
      cellClassName: (params) => {
        return params.value === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="action_button">
              <Link
                to={`/admin/dashboard/editUser/${params.id}`}
                className="pencil"
              >
                <EditIcon />
              </Link>

              <Button onClick={() => handleUserDelete(params.id)}>
                <DeleteForeverIcon />
              </Button>
            </div>
          </Fragment>
        );
      },
    },
  ];
  const { allUsers, status, errorMessage } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  const handleUserDelete = (id) => {
    dispatch(deleteUserProfile(id)).then(() =>
      toast.success("User Deleted Successfully")
    );
  };

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  }, [status, errorMessage]);

  // Update rows when allOrders changes
  useEffect(() => {
    if (allUsers && allUsers?.length > 0) {
      // Create a new array to avoid mutating state directly
      const newRows = [];
      allUsers.forEach((user) => {
        newRows.push({
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        });
      });
      setRows(newRows); // Set the new array to state
    } else {
      setRows([]); // Clear rows if no orders
    }
  }, [allUsers]);

  return (
    <div style={{ width: "100%" }}>
      {/* {console.log(allUsers)} */}
      <MetaData title={`All Users Details`} />
      {status === STATUSES.LOADING ? (
        <Loader />
      ) : allUsers.length > 0 ? (
        <div style={{paddingLeft:"1rem"}}>
          <Typography id="myOrdersHeading">All User Details</Typography>
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
          <Typography>No Users</Typography>
          <Link to="/admin/dashboard">View Dashboard</Link>
        </div>
      )}
    </div>
  );
}
