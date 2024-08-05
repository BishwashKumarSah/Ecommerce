import { Fragment, useRef, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";

const LoginSignUp = () => {
  const switchTabRef = useRef(null);
  const login_section = useRef(null);
  const sign_up_section = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

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

  const handleLoginPassword = (e) => {};

  const handleSignUpEmail = (e) => {};

  const handleSignUpPassword = (e) => {};

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
              <form action="" className="login_form">
                <div className="login_email">
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={loginEmail}
                    onChange={(e) => handleLoginEmail(e)}
                  />
                  <MailOutlineIcon className="mail_login_logo" />
                </div>
                <div className="login_password">
                  <input
                    type="password"
                    required
                    placeholder="Enter Your Password"
                    name="password"
                    value={loginPassword}
                    onChange={(e) => handleLoginPassword(e)}
                  />
                  <LockOpenIcon className="mail_login_logo" />
                </div>
                <Link className="forgot_password">Forgot Password?</Link>
                <button className="login_btn">Login</button>
              </form>
            </div>
            <div className="sign_up_section" ref={sign_up_section}>
              <form action="">
                <div className="sign_up_email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    name="email"
                    value={signUpEmail}
                    onChange={(e) => handleSignUpEmail(e)}
                  />
                </div>
                <div className="sign_up_password">
                  <MailOutlineIcon />
                  <input
                    type="password"
                    required
                    placeholder="Enter Your Password"
                    name="password"
                    value={signUpPassword}
                    onChange={(e) => handleSignUpPassword(e)}
                  />
                </div>
                <Link className="forgot_password">Forgot Password?</Link>
                <button className="sign_up_btn">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
