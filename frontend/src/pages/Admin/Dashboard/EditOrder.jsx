import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Typography } from "@mui/material";
import Loader from "../../../utils/Loader/Loader";
import MetaData from "../../../utils/MetaData";
import { STATUSES } from "../../../store/statusEnums";
import { getOrderDetails } from "../../../store/orderSlice";
import { updateOrderStatus } from "../../../store/adminSlice";

const EditOrderDetails = () => {
  const dispatch = useDispatch();
  const { myOrderDetails, errorMessage, status } = useSelector(
    (state) => state.order
  );
  const [updateData, setUpdateData] = useState({
    status: myOrderDetails.orderStatus,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShippingActions = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    dispatch(updateOrderStatus(id, updateData))
      .then(() => {
        toast.success("Order Status Updated Successfully");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleShippingActionDataChange = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          <div className="orderDetailsPage" style={{padding:"1rem"}}>
            <div className="orderDetailsContainer shipping_container">
              <div
                className="order_details_info_grid"
                style={{
                  display:
                    myOrderDetails.orderStatus === "Delivered"
                      ? "block"
                      : "grid",
                }}
              >
                <Typography component="h1">
                  Order #{myOrderDetails && myOrderDetails._id}
                </Typography>
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <div>
                      <p>Name:</p>
                    </div>
                    <span>
                      {myOrderDetails.user && myOrderDetails.user.name}
                    </span>
                  </div>
                  <div>
                    <div>
                      <p>Phone:</p>
                    </div>
                    <span>
                      {myOrderDetails.shippingInfo &&
                        myOrderDetails.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <div>
                      <p>Address:</p>
                    </div>
                    <span>
                      {myOrderDetails.shippingInfo &&
                        `${myOrderDetails.shippingInfo.address}, ${myOrderDetails.shippingInfo.city}, ${myOrderDetails.shippingInfo.state}, ${myOrderDetails.shippingInfo.pinCode}, ${myOrderDetails.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <div
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
                    </div>
                  </div>

                  <div>
                    <div>Amount:</div>
                    <span>
                      ${myOrderDetails.totalPrice && myOrderDetails.totalPrice}
                    </span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <div
                      className={
                        myOrderDetails.orderStatus &&
                        myOrderDetails.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {myOrderDetails.orderStatus && myOrderDetails.orderStatus}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="shipping_actions"
                style={{
                  display:
                    myOrderDetails.orderStatus === "Delivered"
                      ? "none"
                      : "block",
                }}
              >
                <form onSubmit={handleShippingActions}>
                  <h1>Process Order</h1>
                  <div className="sign_up_password select_actions">
                    <select
                      name="status"
                      id="status"
                      required
                      value={updateData.status}
                      disabled={isProcessing}
                      onChange={handleShippingActionDataChange}
                    >
                      <option value="">Choose Action</option>
                      {myOrderDetails.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {myOrderDetails.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                    <AccountTreeIcon className="login_signUp_logo" />
                  </div>
                  <button
                    className={`sign_up_btn `}
                    type="submit"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Process"}
                  </button>
                </form>
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
                        <div>{item.name}</div>
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

export default EditOrderDetails;
