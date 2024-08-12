import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./statusEnums";
import axios from "axios";

const orderSlice = createSlice({
    name: 'Order',
    initialState: {
        order: {},
        status: STATUSES.IDLE,
        errorMessage: null
    },
    reducers: {
        setOrder(state, action) {
            state.order = action.payload
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

export const { setOrder, setStatus, setErrorMessage, clearErrorMessage } = orderSlice.actions;
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
            const { data } = await axios.post('http://localhost:8000/api/v1/order/new', order, config)
            dispatch(setOrder(data.order))
            dispatch(setStatus(STATUSES.IDLE))

        } catch (error) {
            dispatch(setOrder({}))
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}