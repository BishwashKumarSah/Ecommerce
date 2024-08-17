import React, { useEffect, useState } from "react";
import "./Products.css";
import MetaData from "../../utils/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../store/productSlice";
import { useLocation } from "react-router-dom";
import { STATUSES } from "../../store/statusEnums";
import Product from "../../components/Product/Product";
import MinimumDistanceSlider from "./MinimumDistanceSlider";
import { Slider, Typography } from "@mui/material";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../utils/Loader/Loader";
import toast from "react-hot-toast";
import categories from "../../utils/Categories";

const Products = () => {
  

  const { search } = useLocation();
  const dispatch = useDispatch();
  const { products, errorMessage, status } = useSelector(
    (state) => state.products
  );
  const { totalProductsCount } = useSelector((state) => state.products);
  const productsPerPage = 10;
  const totalButtons = Math.ceil(totalProductsCount / productsPerPage);
  const [price, setPrice] = useState([0, 100000]);
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleRatingChange = (event, newValue) => {
    setRatings(newValue);
  };

  const handleCategoryFilter = (category) => {
    setCategory(category);
    setActiveCategory(category);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get("search") || ""; // Default to empty string if not present
    dispatch(
      fetchAllProducts(searchQuery, currentPage, price, category, ratings)
    );
  }, [dispatch, currentPage, search, price, category, ratings]);

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  }, [status, errorMessage]);

  return (
    <>
      <MetaData title="Products" />
      <div className="products_wrapper_grid">
        <div className="filters">
          <div className="price_slider">
            <Typography>Price:</Typography>
            <MinimumDistanceSlider price={price} setPrice={setPrice} />
          </div>
          <div className="product_categories">
            <Typography>Categories:</Typography>
            <ul className="category_box">
              {categories.map((category, ind) => (
                <li
                  className="category_link"
                  key={ind}
                  style={{ color: activeCategory === category ? "red" : "" }}
                  onClick={() => handleCategoryFilter(category)}
                >
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
              value={ratings}
              onChange={handleRatingChange}
              max={5}
              min={0}
            />
          </fieldset>
        </div>
        <div className="product_section">
          {status === STATUSES.LOADING ? (
            <Loader />
          ) : (
            <div className="products_wrapper_main">
              <div className="hero_title">
                <p>Products</p>
              </div>
              {products && products.length > 0 ? (
                <ul className="products_wrapper">
                  {products.map((product, index) => (
                    <li key={index} className="products_li">
                      <Product products={product} />
                    </li>
                  ))}
                </ul>
              ) : (
                <h1>No Products Found</h1>
              )}
            </div>
          )}
        </div>
      </div>
      {totalButtons > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalButtons={totalButtons}
          productsPerPage={productsPerPage}
          totalProductsCount={totalProductsCount}
        />
      )}
    </>
  );
};

export default Products;
