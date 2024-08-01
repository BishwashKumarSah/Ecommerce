import { useCallback, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../store/productSlice";
import { useParams } from "react-router-dom";
import { STATUSES } from "../../store/statusEnums";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import ReactStars from "react-stars";

const ProductDetails = () => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
  };
  const dispatch = useDispatch();
  const { product, status, errorMessage } = useSelector(
    (state) => state.products
  );
  const { id } = useParams();

  const [imageIndex, setImageIndex] = useState(0);

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

  if (status === STATUSES.LOADING) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!product?.data) {
    return <h1>No Products</h1>;
  }

  return (
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

      <div className="product_details_description">
        <div className="product_title">
          <h3 className="product_name">{product.data.name}</h3>
          <p>{product.data._id}</p>
        </div>

        <div className="react-stars">
          <ReactStars {...options} /> <span>(100 reivews)</span>
        </div>
        <h3 className="product_price">${`${product.data.price}`}</h3>
        {/* Add more product details here */}
      </div>
    </div>
  );
};

export default ProductDetails;
