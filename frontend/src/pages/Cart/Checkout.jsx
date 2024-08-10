import React from "react";
import ShippingDetails from "./CheckOutComponent/ShippingDetails";
import ConfirmOrder from "./CheckOutComponent/ConfirmOrder";
import Payment from "./CheckOutComponent/Payment";
import Stepper from "./CheckOutComponent/Stepper";

const Checkout = () => {
  const CHECKOUT_STEPS = [
    {
      name: "Shipping Details",
      component: <ShippingDetails />,
    },
    {
      name: "Confirm Order",
      component: <ConfirmOrder />,
    },
    {
      name: "Payment",
      component: <Payment />,
    },
  ];
  return (
    <>
      <h3>CheckOut</h3>
      <Stepper steps={CHECKOUT_STEPS} />
    </>
  );
};

export default Checkout;

