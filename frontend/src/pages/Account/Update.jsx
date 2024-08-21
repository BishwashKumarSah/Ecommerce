import React, { useEffect } from "react";
import "../Login/LoginSignUp.css";
import SignUp from "../Login/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsUpdate } from "../../store/userSlice";
import MetaData from "../../utils/MetaData";

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUpdated, user, isAuthenticated, status, errorMessage } =
    useSelector((state) => state.user);
  useEffect(() => {
    if (isUpdated) {
      navigate("/account");
      dispatch(setIsUpdate(false));
    }
  }, [isUpdated, navigate, dispatch]);
  return (
    <div className="login_signUp_container">
      <MetaData title="Update Profile" />
      <div className="login_signUp_section">
        <div className="title">
          <div className="login_signUp_title">
            <p>Update Profile</p>
          </div>
        </div>
        <div className="login_sign_up">
          <div className="sign_up_section">
            <SignUp
              isLoggedInUser={user}
              isAuthenticated={isAuthenticated}
              status={status}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
