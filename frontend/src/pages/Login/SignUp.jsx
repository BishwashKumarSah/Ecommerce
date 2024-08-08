import React, { Fragment, useEffect, useState } from "react";
import { registerUser, updateUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";

const SignUp = ({ isLoggedInUser, isAuthenticated, status, errorMessage }) => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

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
    formData.set("password", password);
    if (avatar) formData.append("avatar", avatar);

    if (isAuthenticated) {
      dispatch(updateUser(formData));
    } else {
      console.log("register formData sent");
      dispatch(registerUser(formData));
    }
  };

  useEffect(() => {
    if (isLoggedInUser) {
      setUser({
        name: isLoggedInUser.name,
        email: isLoggedInUser.email,
        password: "", // Password should remain blank for security
      });
      setAvatarPreview(isLoggedInUser.avatar.url);
      // Do not set `avatar` state to URL directly; keep it as a `File` object.
    }
  }, [isLoggedInUser]);

  return (
    <Fragment>
      <form
        action=""
        className="sign_up_form"
        encType="multipart/form-data"
        onSubmit={signUpSubmit}
      >
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
        {!isLoggedInUser && (
          <div className="sign_up_password">
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleSignUpDataChange}
            />
            <LockOpenIcon className="login_signUp_logo" />
          </div>
        )}
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
        <Link className="forgot_password">
          {isLoggedInUser ? "Reset Password?" : "Forgot Password?"}
        </Link>
        <button
          className={`sign_up_btn ${isLoggedInUser ? "submit_mb" : ""}`}
          type="submit"
        >
          {isLoggedInUser ? "Update" : "Sign Up"}
        </button>
      </form>
    </Fragment>
  );
};

export default SignUp;
