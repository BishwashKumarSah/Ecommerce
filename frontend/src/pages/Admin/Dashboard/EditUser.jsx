import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import { useDispatch, useSelector } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SecurityIcon from "@mui/icons-material/Security";
import { STATUSES } from "../../../store/statusEnums";
import toast from "react-hot-toast";
import {
  getUserProfileDetails,
  updateUserDetails,
} from "../../../store/adminSlice";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    userProfile,
    success: userSuccess,
    status,
    errorMessage,
  } = useSelector((state) => state.admin);

  const [userData, setUserData] = useState({});

  const handleCreateUserDataChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateUserProfile = (e) => {
    e.preventDefault();
    if (!validateProductData({ ...userData })) {
      return;
    }
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("role", userData.role);
    // formData.forEach((val) => {
    //   console.log(val);
    // });
    dispatch(updateUserDetails(id, formData)).then(() => {
      toast.success("User Updated successfully");
      navigate("/admin/dashboard/users");
    });
  };

  const validateProductData = (data) => {
    if (data.name.length <= 5 || data.name.length >= 30) {
      toast.error(
        "Name Should be greater than 5 characters and less than 30 characters"
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    dispatch(getUserProfileDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === STATUSES.IDLE && userProfile && userSuccess === true) {
      setUserData({
        name: userProfile.name,
        email: userProfile.email,
        role: userProfile.role,
      });
    }
  }, [status, userSuccess, userProfile]);

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  }, [errorMessage, status, navigate]);

  return (
    <div className="create_product_container">
      <MetaData title="Edit User" />
      <form
        action=""
        className="create_product_form"
        encType="multipart/form-data"
        onSubmit={handleUpdateUserProfile}
      >
        <h3>Update User</h3>
        <div className="sign_up_name">
          <input
            type="text"
            placeholder="Name"
            required
            value={userData.name}
            name="name"
            onChange={handleCreateUserDataChange}
            disabled={status === STATUSES.LOADING}
          />
          <PersonIcon className="login_signUp_logo" />
        </div>

        <div className="sign_up_email">
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleCreateUserDataChange}
            disabled={status === STATUSES.LOADING}
          />
          <EmailIcon className="login_signUp_logo" />
        </div>

        <div className="sign_up_password">
          <select
            name="role"
            id="role"
            required
            value={userData.role}
            onChange={handleCreateUserDataChange}
            disabled={status === STATUSES.LOADING}
          >
            <option value="">Role</option>
            <option value="admin" style={{ color: "green" }}>
              Admin
            </option>
            <option value="user" style={{ color: "red" }}>
              User
            </option>
          </select>
          <SecurityIcon className="login_signUp_logo" />
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

export default AddProduct;
