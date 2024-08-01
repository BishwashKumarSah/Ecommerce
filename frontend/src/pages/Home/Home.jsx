import React, { useEffect } from "react";
import BannerImage from "../../components/BannerImage/BannerImage";
import "./Home.css";
import Product from "../../components/Product/Product";
import MetaData from "../../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setStatus } from "../../store/productSlice";
import { STATUSES } from "../../store/statusEnums";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status, errorMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <MetaData title="EKart" />
      <div className="banner_section">
        <BannerImage />
      </div>
      <div className="hero_section">
        <div className="hero_title">
          <p>Featured Products</p>
        </div>
        {status === STATUSES.LOADING ? (
          <h1>Loading</h1>
        ) : (
          <div className="product_container">
            {products.data ? (
              products.data.map((products, index) => (
                <Product products={products} key={index} />
              ))
            ) : (
              <h1>No Products</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
