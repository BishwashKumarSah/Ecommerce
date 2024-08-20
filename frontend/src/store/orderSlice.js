import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./statusEnums";
import axios from "axios";

const orderSlice = createSlice({
    name: 'Order',
    initialState: {
        order: {},
        myOrders: [],
        myOrderDetails: {},
        status: STATUSES.IDLE,
        errorMessage: null
    },
    reducers: {
        setOrder(state, action) {
            state.order = action.payload
        },
        setMyOrder(state, action) {
            state.myOrders = action.payload
        },
        setMyOrderDetails(state, action) {
            state.myOrderDetails = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
        },
        clearErrorMessage(state, action) {
            state.errorMessage = action.payload;
        }
    }
});

export const { setOrder, setMyOrder, setMyOrderDetails, setStatus, setErrorMessage, clearErrorMessage } = orderSlice.actions;
export default orderSlice.reducer;

// Create A New Order
export const createNewOrder = (order) => {
    return async function createNewOrderThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            const { data } = await axios.post('/order/new', order, config)
            dispatch(setOrder(data.order))
            dispatch(setStatus(STATUSES.IDLE))

        } catch (error) {
            dispatch(setOrder({}))
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}
// Get The User Order From DB
export const getMyOrders = () => {
    return async function getMyOrdersThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get('/orders/me', { withCredentials: true })
            dispatch(setMyOrder(data.orders))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

// Get Specific Order Details
export const getOrderDetails = (id) => {
    return async function getOrderDetailsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get(`/order/${id}`, { withCredentials: true })         
            dispatch(setMyOrderDetails(data.order))
            dispatch(setStatus(STATUSES.IDLE))

        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}


