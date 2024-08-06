import { Fragment, useEffect, useRef, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../store/statusEnums";
import { registerUser, setUserLogin } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status, errorMessage } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  const switchTabRef = useRef(null);
  const login_section = useRef(null);
  const sign_up_section = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // console.log("first", { name, email, password });

  const switchTab = (e, tab) => {
    if (tab === "Login") {
      switchTabRef.current.classList.add("moveToLeft");
      switchTabRef.current.classList.remove("moveToRight");

      login_section.current.classList.add("shiftToNeutral");
      login_section.current.classList.remove("shiftToRight");
      sign_up_section.current.classList.add("shiftToNeutral");
      sign_up_section.current.classList.remove("shiftToLeft");
    } else if (tab === "Sign Up") {
      switchTabRef.current.classList.add("moveToRight");
      switchTabRef.current.classList.remove("moveToLeft");
      sign_up_section.current.classList.add("shiftToLeft");
      login_section.current.classList.add("shiftToRight");
      login_section.current.classList.remove("shiftToNeutral");
    }
  };

  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleSubmitLoginForm = (e) => {
    e.preventDefault();

    dispatch(setUserLogin(loginEmail, loginPassword));
  };

  const handleSignUpDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setAvatar(fileReader.result);
          setAvatarPreview(fileReader.result);
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
    formData.set("avatar", avatar);

    /* WE CANNOT DIRECTLY SEE THE FORM DATA IN BROWSER SO.console.log("formData", formData); doesnot work.
    TO SEE THE FORMDATA WE NEED TO LOOP THE FORMDATA AND STORE IN OBJECT. BY USING FORMDATA FOREACH METHOD
    const formObjData = {};
    formData.forEach((value, key) => {
      formObjData[key] = value;
    });
    console.log(formObjData);*/
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      console.log("error", errorMessage);
    }
    if (isAuthenticated) {
      return navigate("/account");
    }
  }, [status, errorMessage, isAuthenticated, navigate]);

  return (
    <Fragment>
      <div className="login_signUp_container">
        <div className="login_signUp_section">
          <div className="title">
            <div className="login_signUp_title">
              <p onClick={(e) => switchTab(e, "Login")}>LOGIN</p>
              <p onClick={(e) => switchTab(e, "Sign Up")}>SIGN UP</p>
              <button ref={switchTabRef}></button>
            </div>
          </div>
          <div className="login_sign_up">
            <div className="login_section" ref={login_section}>
              <form className="login_form" onSubmit={handleSubmitLoginForm}>
                <div className="login_email">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => handleLoginEmail(e)}
                  />
                  <MailOutlineIcon className="login_signUp_logo" />
                </div>
                <div className="login_password">
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    name="password"
                    value={loginPassword}
                    onChange={(e) => handleLoginPassword(e)}
                  />
                  <LockOpenIcon className="login_signUp_logo" />
                </div>
                <Link className="forgot_password">Forgot Password?</Link>
                <button className="login_btn" type="submit">
                  Login
                </button>
              </form>
            </div>
            <div className="sign_up_section" ref={sign_up_section}>
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
                    onChange={(e) => handleSignUpDataChange(e)}
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
                    onChange={(e) => handleSignUpDataChange(e)}
                  />
                  <MailOutlineIcon className="login_signUp_logo" />
                </div>
                <div className="sign_up_password">
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => handleSignUpDataChange(e)}
                  />
                  <LockOpenIcon className="login_signUp_logo" />
                </div>
                <div className="sign_up_file">
                  <div className="sign_up_user_image">
                    <img src={avatarPreview} alt="userAvatar" />
                  </div>

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => handleSignUpDataChange(e)}
                  />
                </div>
                <Link className="forgot_password">Forgot Password?</Link>
                <button className="sign_up_btn" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
