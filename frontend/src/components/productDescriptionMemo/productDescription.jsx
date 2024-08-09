import React from "react";
import ReactStars from "react-stars";
import Button from "../Button/Button";

const ProductDescription = React.memo(
  ({
    product,
    quantity,
    handleRemoveProducts,
    handleAddProducts,
    handleInputChange,
    handleBlur,
    handleAddCartItems,
    onOpenReviewDialog,
  }) => {
    var rating = product.data.ratings;
    const options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "tomato",
      size: window.innerWidth < 600 ? 20 : 25,
      value: rating,
      isHalf: true,
    };

    return (
      <div className="product_details_description">
        <div className="product_title">
          <h3 className="product_name">{product.data.name}</h3>
          <p>Product #{product.data._id}</p>
        </div>

        <div className="react_stars">
          <div>
            <ReactStars {...options} />
          </div>
          <div>({product.data.numOfReviews} reviews)</div>
        </div>
        <h3 className="product_price">Rs. {product.data.price}</h3>

        <div className="number">
          <label htmlFor="quantity">Quantity:</label>
          <button
            className="minus"
            onClick={handleRemoveProducts}
            disabled={quantity <= 1}
          >
            -
          </button>

          <input
            id="quantity"
            type="number"
            min={1}
            max={product.data.stock}
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <button
            className="plus"
            onClick={handleAddProducts}
            disabled={quantity >= product.data.stock}
          >
            +
          </button>
        </div>
        <div className="product_cart_actions">
          <Button className="add_to_cart" onClick={handleAddCartItems}>
            Add To Cart
          </Button>
          <Button className="buy_now">Buy Now</Button>
        </div>
        <div className="product_status">
          <p>
            Status:
            <b className={product.data.stock < 1 ? "redColor" : "greenColor"}>
              {product.data.stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>

        <div className="product_description">
          <h3>Description:</h3>
          <p>{product.data.description}</p>
        </div>
        <div className="submit_review">
          <Button className="submit_review_btn" onClick={onOpenReviewDialog}>
            Submit Review
          </Button>
        </div>
      </div>
    );
  }
);

export default ProductDescription;
