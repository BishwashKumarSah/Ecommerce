import React, { useEffect } from "react";
import BannerImage from "../../components/BannerImage/BannerImage";
import "./Home.css";
import Product from "../../components/Product/Product";
import MetaData from "../../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  fetchFeaturedProducts,
  setStatus,
} from "../../store/productSlice";
import { STATUSES } from "../../store/statusEnums";
import Loader from "../../utils/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, status, errorMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    return () => {
      dispatch(clearErrorMessage(""));
      dispatch(setStatus(STATUSES.IDLE));
    };
  }, [dispatch]);
  return (
    <>
      <MetaData title="EKart" />
      <div className="banner_section">
        <BannerImage />
      </div>
      {status === STATUSES.LOADING ? (
        <Loader />
      ) : (
        <div className="hero_section">
          <div className="hero_title">
            <p>Featured Products</p>
          </div>

          <div className="products_wrapper_main">
            {featuredProducts.data && (
              <ul className="products_wrapper">
                {featuredProducts.data.map((featuredProduct, index) => (
                  <li key={index}>
                    <Product products={featuredProduct} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
