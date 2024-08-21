import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import MetaData from "../../utils/MetaData";
import Loader from "../../utils/Loader/Loader";
import LockOpenIcon from "@mui/icons-material/Lock";
import LockIcon from "@mui/icons-material/Lock";
import { STATUSES } from "../../store/statusEnums";
import { resetPassword } from "../../store/userSlice";
import { setIsUpdate } from "../../store/userSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUpdated, status } = useSelector(
    (state) => state.user
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/account");
      dispatch(setIsUpdate(false));
    }
  }, [isUpdated, navigate, dispatch]);

  return (
    <Fragment>
      {status === STATUSES.LOADING ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
