import React, { Fragment, useEffect, useState } from "react";
import {
  registerUser,
  updateUser,
  updateUserPassword,
} from "../../store/userSlice";
import { useDispatch } from "react-redux";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Link } from "react-router-dom";

const SignUp = ({
  updatePassword,
  isLoggedInUser,
  isAuthenticated,  
}) => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(undefined);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  // for password update
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUpDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setAvatarPreview(fileReader.result);
          setAvatar(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    } else {
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (!isAuthenticated) formData.set("password", password);
    formData.set("avatar", avatar);

    if (isAuthenticated) {
    
      dispatch(updateUser(formData));
    } else {
    
      dispatch(registerUser(formData));
    }
  };

  // password update
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", oldPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);
    dispatch(updateUserPassword(formData));
  };

  useEffect(() => {
    if (isLoggedInUser) {
      setUser({
        name: isLoggedInUser.name,
        email: isLoggedInUser.email,
      });
      setAvatarPreview(isLoggedInUser.avatar?.url);
      // Do not set `avatar` state to URL directly; keep it as a `File` object.
    }
  }, [isLoggedInUser]);

  return (
    <Fragment>
      <form
        action=""
        className="sign_up_form"
        encType="multipart/form-data"
        onSubmit={updatePassword ? updatePasswordSubmit : signUpSubmit}
      >
        {!updatePassword && (
          <div className="sign_up_name">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              name="name"
              onChange={handleSignUpDataChange}
            />
            <PersonOutlineIcon className="login_signUp_logo" />
          </div>
        )}
        {!updatePassword && (
          <div className="sign_up_email">
            <input
              type="email"
              required
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleSignUpDataChange}
            />
            <MailOutlineIcon className="login_signUp_logo" />
          </div>
        )}

        {!isLoggedInUser && !updatePassword && (
          <div className="sign_up_password">
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleSignUpDataChange}
            />
            <VpnKeyOutlinedIcon className="login_signUp_logo" />
          </div>
        )}

        {updatePassword && (
          <div className="sign_up_password">
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <VpnKeyOutlinedIcon className="login_signUp_logo" />
          </div>
        )}

        {updatePassword && (
          <div className="sign_up_password">
            <input
              type="password"
              required
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <LockOpenIcon className="login_signUp_logo" />
          </div>
        )}

        {updatePassword && (
          <div className="sign_up_password">
            <input
              type="password"
              required
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <LockIcon className="login_signUp_logo" />
          </div>
        )}

        {!updatePassword && (
          <div className="sign_up_file">
            <div className="sign_up_user_image">
              <img src={avatarPreview} alt="userAvatar" />
            </div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleSignUpDataChange}
            />
          </div>
        )}
        <Link to="/password/forgot" className="forgot_password">
          Forgot Password?
        </Link>
        <button
          className={`sign_up_btn ${isLoggedInUser ? "submit_mb" : ""}`}
          type="submit"
        >
          {isLoggedInUser || updatePassword ? "Update" : "Sign Up"}
        </button>
      </form>
    </Fragment>
  );
};

export default SignUp;
