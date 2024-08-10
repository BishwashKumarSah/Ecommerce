import { Fragment, useEffect, useRef, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./LoginSignUp.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../store/statusEnums";
import { setUserLogin } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status, errorMessage } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  // To check if /login?redirect=checkout if so redirect to /checkout or else redirect to /account(this was default behaviour but we also want to check if there is queryparams with redirect=checkout)
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const redirect = queryParams.get("redirect") || "account";
  const path = redirect.startsWith("/") ? redirect : `/${redirect}`;

  const switchTabRef = useRef(null);
  const login_section = useRef(null);
  const sign_up_section = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      console.log("error", errorMessage);
    }
    if (isAuthenticated) {
      return navigate(path);
    }
  }, [status, errorMessage, isAuthenticated, navigate, redirect, path]);

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
              <SignUp
                errorMessage={errorMessage}
                isAuthenticated={isAuthenticated}
                status={status}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
