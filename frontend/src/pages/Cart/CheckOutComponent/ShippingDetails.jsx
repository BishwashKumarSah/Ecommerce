import React, { Fragment } from "react";
import "./ShippingDetails.css";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const ShippingDetails = () => {
  return (
    <div className="login_signUp_container">
      <div className="login_signUp_section">
        <div className="title">
          <div className="login_signUp_title">
            <p>Shipping Details</p>
          </div>
        </div>
        <div className="login_sign_up">
          <div className="sign_up_section">
            <form
              action=""
              className="sign_up_form"
              encType="multipart/form-data"
              // onSubmit={updatePassword ? updatePasswordSubmit : signUpSubmit}
            >
              <div className="checkout_shipping">
                <input
                  type="text"
                  placeholder="Address"
                  required
                  // value={name}
                  // name="name"
                  // onChange={handleSignUpDataChange}
                />
                <HomeIcon className="login_signUp_logo" />
              </div>
              <div className="checkout_shipping">
                <input
                  type="text"
                  placeholder="City"
                  required
                  // value={name}
                  // name="name"
                  // onChange={handleSignUpDataChange}
                />
                <LocationCityIcon className="login_signUp_logo" />
              </div>
              <div className="checkout_shipping">
                <input
                  type="text"
                  placeholder="Pin Code"
                  required
                  // value={name}
                  // name="name"
                  // onChange={handleSignUpDataChange}
                />
                <LocationOnIcon className="login_signUp_logo" />
              </div>
              <div className="checkout_shipping">
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  // value={name}
                  // name="name"
                  // onChange={handleSignUpDataChange}
                />
                <PhoneIcon className="login_signUp_logo" />
              </div>
              <div className="checkout_shipping">
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  // value={name}
                  // name="name"
                  // onChange={handleSignUpDataChange}
                />
                <PhoneIcon className="login_signUp_logo" />
              </div>
              <div className="checkout_shipping">
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  // value={name}
                  // name="name"
                  // onChange={handleSignUpDataChange}
                />
                <PhoneIcon className="login_signUp_logo" />
              </div>
              <button className={`sign_up_btn `} type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
