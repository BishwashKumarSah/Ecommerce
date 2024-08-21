import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AllReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactStars from "react-stars";
import StarIcon from "@mui/icons-material/Star";
import { deleteReviews, getAllReviews } from "../../../store/adminSlice";
import toast from "react-hot-toast";
import { STATUSES } from "../../../store/statusEnums";
import MetaData from "../../../utils/MetaData";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const { errorMessage, allReviews, ratings, status } = useSelector(
    (state) => state.admin
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    console.log("reviewId:", reviewId, "productId:", productId);
    dispatch(deleteReviews(reviewId, productId)).then(() =>
      toast.success("Product Deleted Successfully")
    );
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }

    // if (deleteError) {
    //   alert.error(deleteError);

    // }

    // if (isDeleted) {
    //   alert.success("Review Deleted Successfully");
    //   history.push("/admin/reviews");
    //   dispatch({ type: DELETE_REVIEW_RESET });
    // }
  }, [dispatch, errorMessage, status]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
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
            <Button onClick={() => deleteReviewHandler(params.id)}>
              <DeleteForeverIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: Number(ratings),
    isHalf: true,
  };

  const rows = [];

  allReviews &&
    allReviews.length > 0 &&
    allReviews?.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <ReactStars {...options} />
            </div>
            <div className="input_container">
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                status === STATUSES.LOADING
                  ? true
                  : false || productId === ""
                  ? true
                  : false
              }
            >
              Search
            </Button>
          </form>

          {allReviews && allReviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
