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
  const { isUpdated, isAuthenticated, status, errorMessage } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isUpdated) {
      navigate("/account");
      dispatch(setIsUpdate(false));
    }
  }, [isUpdated, navigate, dispatch]);

  const updatePassword = true;
  return (
    <div className="login_signUp_container">
      <MetaData title="Update Password" />
      <div className="login_signUp_section">
        <div className="title">
          <div className="login_signUp_title">
            <p>Update Password</p>
          </div>
        </div>
        <div className="login_sign_up">
          <div className="sign_up_section">
            <SignUp
              updatePassword={updatePassword}
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
