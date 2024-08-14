import React, { Fragment, useEffect } from "react";
import "./OrderDetail.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MetaData from "../../utils/MetaData";
import { STATUSES } from "../../store/statusEnums";
import { toast } from "react-hot-toast";
import Loader from "../../utils/Loader/Loader";
import { getOrderDetails } from "../../store/orderSlice";
import { Typography } from "@mui/material";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { myOrderDetails, errorMessage, status } = useSelector(
    (state) => state.order
  );

  const { id } = useParams();

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  }, [errorMessage, status]);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {status === STATUSES.LOADING ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{myOrderDetails && myOrderDetails._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{myOrderDetails.user && myOrderDetails.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {myOrderDetails.shippingInfo &&
                      myOrderDetails.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {myOrderDetails.shippingInfo &&
                      `${myOrderDetails.shippingInfo.address}, ${myOrderDetails.shippingInfo.city}, ${myOrderDetails.shippingInfo.state}, ${myOrderDetails.shippingInfo.pinCode}, ${myOrderDetails.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      myOrderDetails.paymentInfo &&
                      myOrderDetails.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {myOrderDetails.paymentInfo &&
                    myOrderDetails.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>
                    ${myOrderDetails.totalPrice && myOrderDetails.totalPrice}
                  </span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      myOrderDetails.orderStatus &&
                      myOrderDetails.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {myOrderDetails.orderStatus && myOrderDetails.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {myOrderDetails.orderItems &&
                  myOrderDetails.orderItems.map((item) => (
                    <Link
                      to={`/product/${item.product_id}`}
                      key={item.product}
                      className="orderItemLink"
                    >
                      <img src={item.image} alt="Product" />
                      <div className="orderItemContent">
                        <p>{item.name}</p>
                        <span>
                          {item.quantity} X ${item.price} ={" "}
                          <b>${item.price * item.quantity}</b>
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
