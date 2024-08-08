import React from "react";
import "../Login/LoginSignUp.css";
import SignUp from "../Login/SignUp";
import { useSelector } from "react-redux";

const Update = () => {
  const { user, isAuthenticated, status, errorMessage } = useSelector(
    (state) => state.user
  );
  return (
    <div className="login_signUp_container">
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
