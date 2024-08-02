import React, { Fragment, useCallback, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  fetchProductDetails,
  newReview,
} from "../../store/productSlice";
import { useParams } from "react-router-dom";
import { STATUSES } from "../../store/statusEnums";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Rating } from "@mui/lab";
import ReviewCard from "./ReviewCard";
import ProductDescription from "../../components/productDescriptionMemo/productDescription";
import { ClassNames } from "@emotion/react";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, status, errorMessage } = useSelector(
    (state) => state.products
  );
  const { id } = useParams();

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    setOpenReviewDialog(!openReviewDialog);
  };

  const reviewSubmitHandler = () => {
    const myForm = { rating, comment, productId: id };
    dispatch(newReview(myForm, id));
    setOpenReviewDialog(false);
  };

  const showPrevImages = () => {
    setImageIndex((prev) =>
      prev === 0 ? product.data.images.length - 1 : prev - 1
    );
  };

  const showNextImages = useCallback(() => {
    setImageIndex((prev) =>
      prev === product.data.images.length - 1 ? 0 : prev + 1
    );
  }, [product?.data?.images]);

  const handleRemoveProducts = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddProducts = () => {
    if (quantity < product.data.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    var val = e.target.value;
    if (val === "") {
      setQuantity("");
    } else {
      var parseVal = parseInt(e.target.value, 10);
      if (parseVal >= 0 && parseVal <= product.data.stock) {
        setQuantity(parseVal);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === "") {
      setQuantity(1);
    }
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.data?.images?.length) {
      const interval = setInterval(() => {
        showNextImages();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showNextImages, product?.data?.images]);

  useEffect(() => {
    if (errorMessage) {
      window.alert(errorMessage);
      setTimeout(dispatch(clearErrorMessage(null)), 1000);
    }
  }, [errorMessage, dispatch]);

  if (status === STATUSES.LOADING) {
    return <h1>Loading...</h1>;
  }

  if (!product?.data) {
    return <h1>No Products</h1>;
  }

  return (
    <Fragment>
      <div className="product_details_component">
        <div className="product_details_images">
          {product.data.images.length > 0 ? (
            <>
              {product.data.images.map((image, ind) => (
                <img
                  key={ind}
                  src={image.url}
                  alt={`Product ${ind + 1}`}
                  className="product_details_image"
                  style={{ transform: `translateX(${-100 * imageIndex}%)` }}
                />
              ))}
              <button
                onClick={showPrevImages}
                className="btn_prev btn_show"
                aria-label="Previous Image"
              >
                <IoIosArrowBack className="btn_prev_icon" size={56} />
              </button>
              <button
                onClick={showNextImages}
                className="btn_next btn_show"
                aria-label="Next Image"
              >
                <IoIosArrowForward className="btn_next_icon" size={56} />
              </button>
              <div className="circle-slider">
                {product.data.images.map((_, index) => (
                  <button
                    key={index}
                    className="circle-icon-btn"
                    onClick={() => setImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <BsCircleFill
                      className="icon-circle"
                      color={index === imageIndex ? "white" : "grey"}
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>

        <ProductDescription
          product={product}
          quantity={quantity}
          handleRemoveProducts={handleRemoveProducts}
          handleAddProducts={handleAddProducts}
          handleInputChange={handleInputChange}
          handleBlur={handleBlur}
          onOpenReviewDialog={submitReviewToggle} // Pass handler function
        />
      </div>
      <div className="reviews_section">
        <div className="reviewsHeading">
          <h3>REVIEWS</h3>
        </div>

        {product.data.reviews && product.data.reviews.length > 0 ? (
          <div className="section_review">
            <div className="reviews">
              {product.data.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={openReviewDialog}
        onClose={submitReviewToggle}
        PaperProps={{ className: "custom_dialog" }}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <Rating
            onChange={(e, newValue) => setRating(newValue)}
            value={rating}
            size="large"
          />
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ProductDetails;
