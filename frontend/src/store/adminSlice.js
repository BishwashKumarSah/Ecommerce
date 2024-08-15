import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./statusEnums";

const adminSlice = createSlice({
    name: 'Admin',
    initialState: {
        profits: {},
        status: STATUSES.IDLE,
        errorMessage: null
    },
    reducers: {
        setTotalProfits(state, action) {
            state.profits = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
        },
    }
});

export const { setTotalProfits, setStatus, setErrorMessage } = adminSlice.actions;
export default adminSlice.reducer;

export const getTotalProfits = (year) => {
    return async function getTotalProfitsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/admin/totalProfits/${year}`, { withCredentials: true });
        console.log("data",data);
            

            dispatch(setTotalProfits({ year: data.year, totalProfits: data.totalProfit }))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};


