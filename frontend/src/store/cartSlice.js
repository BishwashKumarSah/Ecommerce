import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
    reducers: {
        setCartItems(state, action) {
            state.cartItems = action.payload;
        },
        removeCartItem(state, action) {
            state.cartItems = state.cartItems.filter(item => item.product_id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        setShippingInfo(state, action) {
            state.shippingInfo = action.payload
        }
    }
});

export const { setCartItems, removeCartItem, setShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;

export const addToCartItems = (product_id, quantity) => {
    return async function addToCartItemsThunk(dispatch, getState) {
        const { data } = await axios.get(`/api/v1/product/${product_id}`);
        const newItem = {
            product_id: data.data._id,
            name: data.data.name,
            price: data.data.price,
            image: data.data.images[0].url,
            stock: data.data.stock,
            quantity: quantity
        };

        const { cartItems } = getState().cart;

        const isItemExists = cartItems.find((item) => item.product_id === data.data._id);
        let updatedCartItems;
        if (isItemExists) {
            updatedCartItems = cartItems.map((item) =>
                item.product_id === data.data._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updatedCartItems = [...cartItems, newItem];
        }

        dispatch(setCartItems(updatedCartItems));
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
};

export const removeFromCartItems = (product_id, quantity) => {
    return function removeFromCartThunk(dispatch, getState) {
        const { cartItems } = getState().cart;
        const itemToRemove = cartItems.find((item) => item.product_id === product_id);


        if (itemToRemove) {

            let updatedCartItems;
            if (itemToRemove.quantity - quantity <= 0) {
                updatedCartItems = cartItems.filter((item) => item.product_id !== product_id);
                dispatch(setCartItems(updatedCartItems)); // Update state
            } else {
                updatedCartItems = cartItems.map((item) =>
                    item.product_id === product_id ? { ...item, quantity: item.quantity - quantity } : item
                );
                dispatch(setCartItems(updatedCartItems)); // Update state
            }
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
    };
};

export const removeFromCartItemsThunk = (product_id) => {
    return function removeFromCartItemsThunk(dispatch, getState) {
        dispatch(removeCartItem(product_id));
        return Promise.resolve(); // Return a resolved promise so that .then() works
    };
};

export const saveShippingInfo = (formData) => {
    return function saveShippingInfoThunk(dispatch, getState) {
        dispatch(setShippingInfo(formData))
        localStorage.setItem("shippingInfo", JSON.stringify(formData));

    };
};


