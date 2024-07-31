import React, { useEffect } from "react";
import BannerImage from "../../components/BannerImage/BannerImage";
import "./Home.css";
import Product from "../../components/Product/Product";
import WatchImage from "../../images/pexels-photo-2783873.webp";
import MetaData from "../../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status, errorMessage } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // const products = {
  //   name: "Classic Watch",
  //   images: [{ url: WatchImage }],
  //   price: "$200",
  //   _id: "watchId",
  // };
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
        {console.log(status)}
        <div className="product_container">
          {products.data && products.data.length > 0 ? (
            products.data.map((product, index) => {
              <Product products={products} />;
            })
          ) : (
            <h1>No Products</h1>
          )}
          {/* <Product products={products} */}
        </div>
      </div>
    </>
  );
};

export default Home;
