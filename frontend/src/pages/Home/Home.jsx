import React from "react";
import BannerImage from "../../components/BannerImage/BannerImage";
import "./Home.css";
import Product from "../../components/Product/Product";
import WatchImage from "../../images/pexels-photo-2783873.webp";
import MetaData from "../../utils/MetaData";

const Home = () => {
  const products = {
    name: "Classic Watch",
    images: [{ url: WatchImage }],
    price: "$200",
    _id: "watchId",
  };
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
        <div className="product_container">
          <Product products={products} />
          <Product products={products} />
          <Product products={products} />
          <Product products={products} />

          <Product products={products} />
          <Product products={products} />
          <Product products={products} />
          <Product products={products} />
        </div>
      </div>
    </>
  );
};

export default Home;
