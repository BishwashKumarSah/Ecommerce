import React, { useState } from "react";
import "./ShippingDetails.css";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../utils/MetaData";
import { toast } from "react-hot-toast";
import { saveShippingInfo } from "../../../store/cartSlice";

const ShippingDetails = ({ handleNextForm }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [shippingDetails, setShippingDetails] = useState({
    address: shippingInfo.address,
    city: shippingInfo.city,
    pinCode: shippingInfo.pinCode,
    phoneNo: shippingInfo.phoneNo,
    country: shippingInfo.country,
    state: shippingInfo.state,
  });

  const handleShippingDetailsChange = (e) => {
    setShippingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShippingDetailsSubmit = (e) => {
    e.preventDefault();

    if (
      shippingDetails.phoneNo.length < 10 ||
      shippingDetails.phoneNo.length > 10
    ) {
      toast.error("Phone Number should be exactly 10 digits");
      return;
    }

    dispatch(saveShippingInfo(shippingDetails));
    handleNextForm();
  };
  return (
    <>
      <MetaData title="Shipping Details" />
      <div className="login_signUp_container">
        <div className="login_signUp_section">
          <div className="title">
            <div className="login_signUp_title" id="shipping_title">
              <h3>Shipping Details</h3>
            </div>
          </div>
          <div className="login_sign_up">
            <div className="sign_up_section">
              <form
                action=""
                className="sign_up_form"                
                onSubmit={handleShippingDetailsSubmit}
              >
                <div className="checkout_shipping">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={shippingDetails.address}
                    name="address"
                    onChange={handleShippingDetailsChange}
                  />
                  <HomeIcon className="login_signUp_logo" />
                </div>
                <div className="checkout_shipping">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={shippingDetails.city}
                    name="city"
                    onChange={handleShippingDetailsChange}
                  />
                  <LocationCityIcon className="login_signUp_logo" />
                </div>
                <div className="checkout_shipping">
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={shippingDetails.pinCode}
                    name="pinCode"
                    onChange={handleShippingDetailsChange}
                  />
                  <LocationOnIcon className="login_signUp_logo" />
                </div>
                <div className="checkout_shipping">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    value={shippingDetails.phoneNo}
                    name="phoneNo"
                    onChange={handleShippingDetailsChange}
                  />
                  <PhoneIcon className="login_signUp_logo" />
                </div>
                <div className="checkout_shipping">
                  <select
                    placeholder="Country"
                    required
                    value={shippingDetails.country}
                    name="country"
                    onChange={(e) => {
                      handleShippingDetailsChange(e);
                      setShippingDetails((prev) => ({ ...prev, state: "" }));
                    }}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((Country, index) => (
                        <option value={Country.isoCode} key={Country.isoCode}>
                          {Country.name}
                        </option>
                      ))}
                  </select>
                  <PublicIcon className="login_signUp_logo" />
                </div>
                {shippingDetails.country && (
                  <div className="checkout_shipping">
                    <select
                      placeholder="State"
                      required
                      value={shippingDetails.state}
                      name="state"
                      onChange={handleShippingDetailsChange}
                      disabled={!shippingDetails.country}
                    >
                      <option value="">State</option>
                      {shippingDetails.country &&
                        State.getStatesOfCountry(shippingDetails.country).map(
                          (State, index) => (
                            <option value={State.isoCode} key={State.isoCode}>
                              {State.name}
                            </option>
                          )
                        )}
                    </select>
                    <PublicIcon className="login_signUp_logo" />
                  </div>
                )}

                <button
                  className={`shipping_details_btn`}
                  type="submit"
                  disabled={!shippingDetails.state}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingDetails;
