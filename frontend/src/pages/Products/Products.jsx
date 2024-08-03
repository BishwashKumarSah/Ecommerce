import React, { useEffect } from "react";
import "./Products.css";
import MetaData from "../../utils/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../store/productSlice";
import { useLocation } from "react-router-dom";
import { STATUSES } from "../../store/statusEnums";
import Product from "../../components/Product/Product";
import NewSlider from "./MinimumDistanceSlider";
import MinimumDistanceSlider from "./MinimumDistanceSlider";
import { Slider, Typography } from "@mui/material";

const Products = () => {
  const categories = [
    "Laptops",
    "Smartphones",
    "Camera",
    "Footwear",
    "Gadgets",
    "Bottom",
    "Attire",
  ];
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { products, errorMessage, status } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get("search") || ""; // Default to empty string if not present
    dispatch(fetchAllProducts(searchQuery));
  }, [dispatch, search]);

  return (
    <>
      <MetaData title="Products" />
      <div className="product_section">
        {status === STATUSES.LOADING ? (
          <>
            <h1>Loading</h1>
          </>
        ) : (
          <div className="products_wrapper_grid">
            <div className="filters">
              <div className="price_slider">
                <Typography>Price:</Typography>
                <MinimumDistanceSlider />
              </div>
              <div className="product_categories">
                <Typography>Categories:</Typography>
                <ul className="category_box">
                  {categories.map((category, ind) => (
                    <li className="category_link" key={ind}>
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <fieldset className="product_ratings">
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  size="small"
                  defaultValue={0}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  max={5}
                  min={0}
                />
              </fieldset>
            </div>
            <div className="products_wrapper_main">
              <div className="hero_title">
                <p>Products</p>
              </div>
              {products ? (
                <ul className="products_wrapper">
                  {products.map((product, index) => (
                    <li key={index}>
                      <Product products={product} />
                    </li>
                  ))}
                </ul>
              ) : (
                <h1>No Products</h1>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
