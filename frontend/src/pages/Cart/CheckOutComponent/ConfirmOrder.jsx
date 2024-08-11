import React, { Fragment } from "react";
import MetaData from "../../../utils/MetaData";
import { useSelector } from "react-redux";
import { h3 } from "@mui/material";
import { Link } from "react-router-dom";
import "./ConfirmOrder.css";

const ConfirmOrder = ({ handleNextForm }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const Address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const SubTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = SubTotal > 1000 ? 0 : 200;

  const tax = SubTotal * 0.18;

  const totalPrice = SubTotal + tax + shippingCharges;

  const handleCheckOut = () => {
    const data = {
      SubTotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    handleNextForm();
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <div className="confirm_order_page">
        <div className="shipping_info">
          <div className="user_shipping_details">
            <h3>Shipping Info</h3>
            <div className="user_detail">
              <div className="user user_name">
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div className="user user_phoneNo">
                <p>PhoneNo:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="user user_email">
                <p>Email:</p>
                <span>{user.email}</span>
              </div>
              <div className="user user_address">
                <p>Address:</p>
                <span>{Address}</span>
              </div>
            </div>
          </div>
          <div className="user_shipping_cart_items">
            <h3>Your Cart Items</h3>
            <div className="user_shipping_cart_items">
              {cartItems &&
                cartItems.map((item) => (
                  <Link
                    to={`/product/${item.product_id}`}
                    className="shipping_item_card"
                    key={item.product_id}
                  >
                    <div>
                      <img src={item.image} alt="your cart" />
                      <p>{item.name}</p>
                    </div>
                    <span>
                      {`${item.quantity} X $${item.price} = `}
                      <strong>${item.quantity * item.price}</strong>
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="order_summary">
          <h3>Order Summary</h3>
          <div className="charges">
            <div className="subTotal">
              <p>SubTotal:</p>
              <span>${SubTotal}</span>
            </div>
            <div className="shippingCharges">
              <p>shippingCharges:</p>
              <span>${shippingCharges}</span>
            </div>
            <div className="GST">
              <p>GST:</p>
              <span>${tax}</span>
            </div>
            <div className="Total">
              <p>Total:</p>
              <span>${totalPrice}</span>
            </div>
            <button className="checkOut_btn" onClick={handleCheckOut}>
              Proceed To CheckOut
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
