import React from "react";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ products }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: products.ratings,
    isHalf: true,
  };
  return (
    <Link to={`/product/${products._id}`}>
      <div className="product-image">
        <img src={products.images[0].url} alt={products.name} />
      </div>

      <div className="card-content">
        <p>{products.name}</p>
        <div className="react-stars">
          <ReactStars {...options} />{" "}
          <span>
            ({products.numOfReviews}{" "}
            {products.numOfReviews >= 2 ? "reviews" : "review"})
          </span>
        </div>
        <div className="product_price">${products.price}</div>
      </div>
    </Link>
  );
};

export default Product;
