import React, { Fragment, useEffect, useState } from "react";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Rating } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../../../utils/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import toast from "react-hot-toast";
import { STATUSES } from "../../../store/statusEnums";
import { deleteProduct, getAllProducts } from "../../../store/adminSlice";
import { Button } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();

  const { errorMessage, productsArray, status } = useSelector(
    (state) => state.admin
  );

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleProductDelete = (id) => {
    dispatch(deleteProduct(id));
    setDeleteSuccess(true);
  };

  useEffect(() => {
    if (status === STATUSES.IDLE && deleteSuccess === true) {
      toast.success("Product Deleted Successfully");
      setDeleteSuccess(false);
    }
  }, [deleteSuccess, status]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  }, [errorMessage, status]);

  const options = {
    readOnly: true,
    precision: 0.5,
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 270, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      
    },
    {
      field: "price",
      headerName: "Price($)",
      type: "number",
      minWidth: 150,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return <Rating {...options} value={+params.row.ratings} />;
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="action_button">
              <Link
                to={`/admin/dashboard/editProduct/${params.id}`}
                className="pencil"
              >
                <EditIcon />
              </Link>

              <Button onClick={() => handleProductDelete(params.id)}>
                <DeleteForeverIcon />
              </Button>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  productsArray &&
    productsArray.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
        ratings: item.ratings,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="all_products_container">
        <div className="all_products">
          <h3 id="productListHeading">ALL PRODUCTS</h3>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="productListTable"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 50]}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
