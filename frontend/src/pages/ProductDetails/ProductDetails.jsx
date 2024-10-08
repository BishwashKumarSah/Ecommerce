import React, { Fragment, useCallback, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, newReview } from "../../store/productSlice";
import { useNavigate, useParams } from "react-router-dom";
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
import { addToCartItems } from "../../store/cartSlice";
import toast from "react-hot-toast";
import { getMyOrders } from "../../store/orderSlice";
import Loader from "../../utils/Loader/Loader";
import MetaData from "../../utils/MetaData";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, status, errorMessage } = useSelector(
    (state) => state.products
  );
  const { myOrders, errorMessageMessage: orderErrorMessage } = useSelector(
    (state) => state.order
  );
  const { status: userStatus, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { cartItems } = useSelector((state) => state.cart);

  const { id } = useParams();

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);

  const restrictReviewToOnlyValidUsers = () => {
    if (userStatus === STATUSES.IDLE && isAuthenticated === false) {
      toast.error("You Must Purchase This Product To Review It");
      return false;
    }
    const hasProduct = myOrders.find(
      (order) =>
        order.paymentInfo.status === "succeeded" &&
        order.orderItems.find((ord) => ord.product_id === id)
    );
    return hasProduct;
  };

  const submitReviewToggle = () => {
    setOpenReviewDialog(!openReviewDialog);
  };

  const reviewSubmitHandler = () => {
    if (restrictReviewToOnlyValidUsers()) {
      const myForm = { rating, comment, productId: id };
      dispatch(newReview(myForm, id)).then(() => {
        dispatch(fetchProductDetails(id));
      });
      setOpenReviewDialog(false);
    } else {
      toast.error("You Must Purchase This Product To Review It");
    }
  };

  const showPrevImages = () => {
    setImageIndex((prev) =>
      prev === 0 ? product?.data?.images?.length - 1 : prev - 1
    );
  };

  const showNextImages = useCallback(() => {
    setImageIndex((prev) =>
      prev === product?.data?.images?.length - 1 ? 0 : prev + 1
    );
  }, [product?.data?.images]);

  const handleRemoveProducts = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddProducts = () => {
    if (quantity < product?.data?.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    var val = e.target.value;
    if (val === "" || parseInt(val, 10) < 1) {
      setQuantity(1);
    } else {
      var parseVal = parseInt(e.target.value, 10);
      if (parseVal >= 0 && parseVal <= product?.data?.stock) {
        setQuantity(parseVal);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity === 0) {
      setQuantity(1);
    }
  };

  const handleAddCartItems = () => {
    dispatch(addToCartItems(product?.data?._id, quantity)).then(() =>
      toast.success("Item Added to Cart")
    );
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleBuyNow = () => {
    dispatch(addToCartItems(product?.data?._id, quantity)).then(() => {
      navigate("/checkout");
    });
  };

  useEffect(() => {
    setAddSuccess(false);
    const val = localStorage.getItem("cartItems");
    if (val?.length > 0) {
      let isFound = cartItems.some(
        (cart) => cart.product_id === product?.data?._id
      );
      if (isFound === true) {
        setAddSuccess(true);
      }
    }
  }, [cartItems, product?.data?._id]);

  useEffect(() => {
    if (product?.data?.images?.length) {
      const interval = setInterval(() => {
        showNextImages();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showNextImages, product?.data?.images]);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(getMyOrders());
  }, [dispatch, id]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    } else if (orderErrorMessage) {
      toast.error(orderErrorMessage);
    }
  }, [errorMessage, orderErrorMessage, dispatch]);

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  return (
    <Fragment>
      {product && (
        <>
          <MetaData title={product?.data?.name} />
          <div className="product_details_component">
            <div className="product_sticky">
              <div className="product_details_images">
                {product?.data?.images?.length > 0 &&
                  product?.data?.images?.map((image, ind) => (
                    <div key={ind} className="product_images">
                      <img
                        src={image.url}
                        alt={`Product ${ind + 1}`}
                        style={{
                          transform: `translateX(${-100 * imageIndex}%)`,
                        }}
                      />
                    </div>
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
                  {product?.data?.images?.map((_, index) => (
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
              </div>
            </div>

            <ProductDescription
              status={status}
              restrictReviewToOnlyValidUsers={restrictReviewToOnlyValidUsers}
              product={product}
              quantity={quantity}
              handleRemoveProducts={handleRemoveProducts}
              handleAddProducts={handleAddProducts}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
              handleAddCartItems={handleAddCartItems}
              handleBuyNow={handleBuyNow}
              addSuccess={addSuccess}
              handleGoToCart={handleGoToCart}
              onOpenReviewDialog={submitReviewToggle}
            />
          </div>
          <div className="reviews_section">
            <div className="reviewsHeading">
              <h3>REVIEWS</h3>
            </div>

            {product?.data?.reviews && product?.data?.reviews?.length > 0 ? (
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
                onChange={(event, newValue) => setRating(newValue)}
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
        </>
      )}
    </Fragment>
  );
};

export default ProductDetails;
