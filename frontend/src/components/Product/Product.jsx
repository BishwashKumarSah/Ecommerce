import React from "react";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import Img from "../../images/pexels-photo-2783873.webp";
import "./Product.css";

const Product = ({ products}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
  };
  return (
    <Link to={`product/${products._id}`} className="product-card">
      <div className="product-image">
        <img src={Img} alt={products.name} />
      </div>

      <div className="card-content">
        <p>{products.name}</p>
        <div className="react-stars">
          <ReactStars {...options} /> <span>(100 reivews)</span>
        </div>
        <div className="product_price">${products.price}</div>
      </div>
    </Link>
  );
};

export default Product;
