import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewListIcon from "@mui/icons-material/ViewList";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { STATUSES } from "../../../store/statusEnums";
import toast from "react-hot-toast";
import categories from "../../../utils/Categories";

import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../../store/productSlice";
import Loader from "../../../utils/Loader/Loader";
import { editProduct } from "../../../store/adminSlice";
import MetaData from "../../../utils/MetaData";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { status, errorMessage } = useSelector((state) => state.admin);
  const { product, status: productStatus } = useSelector(
    (state) => state.products
  );
  const [success, setSuccess] = useState(false);

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const [productData, setProductData] = useState({});

  const handleEditProductDataChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductImageDataChange = (e) => {
    setImagePreview([]);
    setImages([]);
    setOldImages([]);
    const ImagesArray = Array.from(e.target.files);
    ImagesArray.forEach((image) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setImagePreview((prev) => [...prev, fileReader.result]);
          setImages((prev) => [...prev, fileReader.result]);
        }
      };
      fileReader.readAsDataURL(image);
    });
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const productDataWithImages = {
      ...productData,
      pImages: images,
    };

    if (!validateProductData(productDataWithImages)) {
      return;
    }
    const formData = new FormData();
    formData.append("name", productData.pName);
    formData.append("price", productData.pPrice);
    formData.append("description", productData.pDescription);
    formData.append("category", productData.pCategory);
    formData.append("stock", productData.pStock);
    for (const file of images) {
      formData.append("images", file); //we have to use formData if we are using a file/multiple files upload to avoid some bug in backend. like if i did not use then the key was a string not a object key. image:[](right) but it says 'image[]':(wrong it was in string)
    }

    dispatch(editProduct(id, formData));
    if (status === STATUSES.IDLE) {
      setSuccess(true);
    }
  };

  const validateProductData = (data) => {
    if (data.pPrice <= 0 || data.pStock <= 0) {
      toast.error("Price and Stock must be positive values");
      return false;
    }
    return true;
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.success && product.data) {
      setProductData({
        pName: product.data.name,
        pPrice: product.data.price,
        pDescription: product.data.description,
        pCategory: product.data.category,
        pStock: product.data.stock,
      });
      setOldImages(product.data.images);
      setImagePreview([]);
    }
  }, [product]);
  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    } else if (status === STATUSES.IDLE && success) {
      toast.success("Product Updated Successfully");
      navigate("/admin/dashboard");
    }
  }, [errorMessage, status, success, navigate]);

  return productStatus === STATUSES.LOADING ? (
    <Loader />
  ) : (
    <div className="create_product_container">
      <MetaData title="Edit Product" />
      <form
        action=""
        className="create_product_form"
        encType="multipart/form-data"
        onSubmit={handleEditProduct}
      >
        <h3>Update Product</h3>
        <div className="sign_up_name">
          <input
            type="text"
            placeholder="Product Name"
            required
            value={productData.pName}
            name="pName"
            onChange={handleEditProductDataChange}
            disabled={status === STATUSES.LOADING}
          />
          <SpellcheckIcon className="login_signUp_logo" />
        </div>

        <div className="sign_up_email">
          <input
            type="number"
            required
            placeholder="Price"
            name="pPrice"
            value={productData.pPrice}
            onChange={handleEditProductDataChange}
            disabled={status === STATUSES.LOADING}
          />
          <AttachMoneyIcon className="login_signUp_logo" />
        </div>

        <div className="sign_up_password add_product_textarea">
          <textarea
            cols={30}
            rows={2}
            type="text"
            required
            placeholder="Product Description"
            name="pDescription"
            value={productData.pDescription}
            onChange={handleEditProductDataChange}
            disabled={status === STATUSES.LOADING}
          />
          <DescriptionIcon className="login_signUp_logo" />
        </div>

        <div className="sign_up_password">
          <select
            name="pCategory"
            id="pCategory"
            required
            value={productData.pCategory}
            onChange={handleEditProductDataChange}
            disabled={status === STATUSES.LOADING}
          >
            <option value="">Categories</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <AccountTreeIcon className="login_signUp_logo" />
        </div>

        <div className="sign_up_password">
          <input
            type="number"
            required
            placeholder="Stock"
            name="pStock"
            value={productData.pStock}
            onChange={handleEditProductDataChange}
            disabled={status === STATUSES.LOADING}
          />
          <ViewListIcon className="login_signUp_logo" />
        </div>

        <div className="sign_up_file create_product_images">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            multiple
            onChange={handleProductImageDataChange}
            disabled={status === STATUSES.LOADING}
          />
        </div>
        <div id="createProductFormImage">
          {oldImages &&
            oldImages.map((image, index) => (
              <img src={image.url} alt="old product" key={index} />
            ))}
        </div>

        <div id="createProductFormImage">
          {imagePreview.map((image, index) => (
            <img src={image} alt="old product" key={index} />
          ))}
        </div>

        <button
          className={`sign_up_btn `}
          type="submit"
          disabled={status === STATUSES.LOADING}
        >
          {status === STATUSES.LOADING ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
