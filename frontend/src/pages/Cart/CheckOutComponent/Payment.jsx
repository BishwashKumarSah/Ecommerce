import React from "react";
import "./Payment.css";
import MetaData from "../../../utils/MetaData";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { createNewOrder } from "../../../store/orderSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const paymentBtn = useRef(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(orderInfo.SubTotal * 100), // to convert rupee to paisa cuz stripe take paisa not rupee.
    currency: "inr",
  };

  const order = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.SubTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCVC = elements.getElement(CardCvcElement);

    paymentBtn.current.disabled = true;

    if (!stripe || !elements || !cardNumber || !cardExpiry || !cardCVC) {
      return;
    }

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "/api/v1/payment/create-stripe-payment-intent",
        paymentData,
        config
      );

      const client_secret = data?.client_secret;
      // if stripe.js has not loaded yet then just return cuz we dont want the form to submit yet.

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        }
      );

      if (error) {
        paymentBtn.current.disabled = false;
        toast.error(error.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: paymentIntent.id,
            status: paymentIntent.status,
          };
          dispatch(createNewOrder(order));
          navigate("/success");
        } else {
          toast.error("There is issue in processing your payment");
        }
      }
    } catch (error) {
      toast.error(error.message);
      paymentBtn.current.disabled = false;  
    }
  };
  return (
    <>
      <MetaData title="Proceed To CheckOut"></MetaData>
      <div className="payment_container">
        <form action="" onSubmit={handlePaymentSubmit}>
          <h3>Card Info</h3>
          <div className="credit_card_number card">
            <CardNumberElement className="payment_input" />
            <CreditCardIcon />
          </div>
          <div className="credit_card_expiry card">
            <CardExpiryElement className="expiry_input" />
            <EventIcon />
          </div>
          <div className="credit_card_cvc card">
            <VpnKeyIcon />
            <CardCvcElement className="cvc_input" />
          </div>
          <input
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.SubTotal}`}
            ref={paymentBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
