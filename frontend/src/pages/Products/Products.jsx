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
import ProductNotFound from "../../images/ProductNotFoundSVG.jpg";

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
    setCurrentPage(1);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get("search") || ""; // Default to empty string if not present

    const validRatings = Number(ratings);
    const validPrice = price.map((p) => Number(p));

    // Ensure ratings and price are valid numbers before dispatching the action
    if (!isNaN(validRatings) && !validPrice.some(isNaN)) {
      dispatch(
        fetchAllProducts(
          searchQuery,
          currentPage,
          validPrice,
          category,
          validRatings
        )
      );
    } else {
      console.error("Invalid number in ratings or price");
    }
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
                    <li key={index}>
                      <Product products={product} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="product_not_found">
                  <div className="product_not_found_icon">
                    <img src={ProductNotFound} alt="product_not_found_icon" />
                  </div>
                  <h3>Sorry, No Products Found!</h3>
                </div>
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
