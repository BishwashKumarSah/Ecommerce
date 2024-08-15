import React, { memo, useRef } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RateReviewIcon from "@mui/icons-material/RateReview";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link } from "react-router-dom";

const SideNav = memo(() => {
  return (
    <div className="dashboard_side_nav">
      <Link to="">
        <div className="dashbord_icon">
          <DashboardIcon />
          <p>Dashboard</p>
        </div>
      </Link>
      <details className="products_container">
        <summary>Products</summary>
        <Link to="addProduct" className="link_products_actions">
          <div className="dashbord_icon">
            <AddIcon />
            <p>Create</p>
          </div>
        </Link>
        <Link to="allProducts">
          <div className="dashbord_icon">
            <PostAddIcon />
            <p>All</p>
          </div>
        </Link>
      </details>
      <Link to="orders">
        <div className="dashbord_icon">
          <ListAltIcon />
          <p>Orders</p>
        </div>
      </Link>
      <Link to="users">
        <div className="dashbord_icon">
          <GroupIcon />
          <p>Users</p>
        </div>
      </Link>
      <Link to="reviews">
        <div className="dashbord_icon">
          <RateReviewIcon />
          <p>Reviews</p>
        </div>
      </Link>
    </div>
  );
});

export default SideNav;
