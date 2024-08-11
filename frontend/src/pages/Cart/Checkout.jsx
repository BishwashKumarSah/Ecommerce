import React from "react";
import ShippingDetails from "./CheckOutComponent/ShippingDetails";
import ConfirmOrder from "./CheckOutComponent/ConfirmOrder";
import Payment from "./CheckOutComponent/Payment";
import Stepper from "./CheckOutComponent/Stepper";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Checkout = () => {
  const CHECKOUT_STEPS = [
    {
      name: "Shipping Details",
      iconName: () => <LocalShippingIcon />,
      // component: <ShippingDetails />, <ShippingDetails /> is a JSX element that represents an instance of the ShippingDetails component. so we cannot directly pass prop to it using {ActiveComponent && <ActiveComponent handleNextForm={handleNextForm} />}
      // to do so we can either use ::::{ActiveComponent && React.cloneElement(ActiveComponent, { handleNextForm })}  OR
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
      component: (props) => <Payment {...props} />,
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
