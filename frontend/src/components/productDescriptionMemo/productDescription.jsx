import React, { useEffect, useState, useCallback } from "react";
import ReactStars from "react-stars";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import { STATUSES } from "../../store/statusEnums";
import Loader from "../../utils/Loader/Loader";

const ProductDescription = React.memo(
  ({
    product,
    status,
    quantity,
    handleRemoveProducts,
    handleAddProducts,
    handleInputChange,
    handleBlur,
    handleAddCartItems,
    onOpenReviewDialog,
    restrictReviewToOnlyValidUsers,
  }) => {
    const [rating, setRating] = useState(product?.data?.ratings || 0);

    useEffect(() => {
      // Update local rating when product prop changes
      setRating(product?.data?.ratings || 0);
    }, [product]);

    const options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "tomato",
      size: window.innerWidth < 600 ? 20 : 25,
      value: rating,
      isHalf: true,
    };

    const handleReviewClick = useCallback(() => {
      const canReview = restrictReviewToOnlyValidUsers();
      if (canReview) {
        onOpenReviewDialog();
      } else {
        toast.error("You must purchase this product to review it.");
      }
    }, [restrictReviewToOnlyValidUsers, onOpenReviewDialog]);

    return (
      <>
        {status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          product && (
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
              <h3 className="product_price"> ${product.data.price}</h3>

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
                  <b
                    className={
                      product.data.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {product.data.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="product_description">
                <h3>Description:</h3>
                <p>{product.data.description}</p>
              </div>
              <div className="submit_review">
                <Button
                  className="submit_review_btn"
                  onClick={handleReviewClick}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          )
        )}
      </>
    );
  }
);

export default ProductDescription;
