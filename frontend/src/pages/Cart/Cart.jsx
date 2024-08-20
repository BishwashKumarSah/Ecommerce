import React, { Fragment } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCartItems,
  removeCartItem,
  removeFromCartItems,
  removeFromCartItemsThunk,
} from "../../store/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveProducts = (id, quantity) => {
    if (quantity > 1) {
      dispatch(removeFromCartItems(id, 1));
    } else {
      dispatch(removeCartItem(id));
    }
  };

  const handleAddProducts = (id, price, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity < stock) {
      dispatch(addToCartItems(id, 1));
    }
  };

  const handleCartProductRemove = (item) => {
    dispatch(removeFromCartItemsThunk(item.product_id)).then(() =>
      toast.success("Item Removed From Cart")
    );
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <div className="cart_container">
          <div className="cart_items">
            <div className="cart_heading">
              <p>Products</p>
              <p>Quantity</p>
              <p>Sub Total</p>
            </div>
            {cartItems.map((item, ind) => (
              <div className="cart_items_child" key={ind}>
                <div className="cart_info">
                  <div className="cart_product_image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart_product_details">
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p
                      className="remove_cart_item"
                      onClick={() => handleCartProductRemove(item)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
                <div className="cart_quantity number">
                  <button
                    className="minus"
                    onClick={() =>
                      handleRemoveProducts(item.product_id, item.quantity)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    max={item.stock}
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className="plus"
                    onClick={() =>
                      handleAddProducts(
                        item.product_id,
                        item.price,
                        item.quantity,
                        item.stock
                      )
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <div className="cart_subtotal price">
                  <div className="sub_total">Sub Total</div>
                  <p className="cart_subtotal_price">
                    ${(item.price * item.quantity).toFixed(3)}
                  </p>
                </div>
              </div>
            ))}
            <div className="cartGrossProfit price">
              <div></div>
              <p>Gross Total</p>
              <div className="cartGrossProfitBox price">
                <p>{`$${cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(3)}`}</p>
              </div>
              <div className="checkOutBtn">
                <button onClick={() => navigate("/login?redirect=checkout")}>
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
