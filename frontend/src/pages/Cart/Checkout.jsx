import React from "react";
import ShippingDetails from "./CheckOutComponent/ShippingDetails";
import ConfirmOrder from "./CheckOutComponent/ConfirmOrder";
import Payment from "./CheckOutComponent/Payment";
import Stepper from "./CheckOutComponent/Stepper";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../../utils/Loader/Loader";

const Checkout = ({ stripePublishableKey }) => {
  const stripePromise = loadStripe(stripePublishableKey);

  const CHECKOUT_STEPS = [
    {
      name: "Shipping Details",
      iconName: () => <LocalShippingIcon />,
      component: (props) => <ShippingDetails {...props} />,
    },
    {
      name: "Confirm Order",
      iconName: () => <LibraryAddCheckIcon />,
      component: (props) => <ConfirmOrder {...props} />,
    },
    {
      name: "Payment",
      iconName: () => <AccountBalanceIcon />,
      component: (props) =>
        stripePublishableKey ? (
          <Elements stripe={stripePromise}>
            <Payment {...props} />
          </Elements>
        ) : (
          <Loader />
        ),
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
