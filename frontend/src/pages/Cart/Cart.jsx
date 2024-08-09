import React, { Fragment } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  addToCartItems,
  removeCartItem,
  removeFromCartItems,
} from "../../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveProducts = (id, quantity) => {
    // Only decrement the quantity if it's greater than 1
    if (quantity > 1) {
      dispatch(removeFromCartItems(id, 1));
    } else {
      // Remove the item if quantity is 1 or less
      dispatch(removeCartItem(id));
    }
  };

  const handleAddProducts = (id,price, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity >= stock) {
      return;
    }
    dispatch(addToCartItems(id, 1));
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
              <p>Product</p>
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
                    <p style={{ color: "red" }}>Remove</p>
                  </div>
                </div>
                <div className="cart_quantity number">
                  <button
                    className="minus"
                    onClick={() =>
                      handleRemoveProducts(
                        item.product_id,
                        item.price,
                        item.quantity,
                        item.stock
                      )
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
                    //   onChange={handleInputChange}
                    //   onBlur={handleBlur}
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
                <div className="cart_subtotal">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
