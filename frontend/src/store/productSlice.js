import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from './statusEnums'
import axios from 'axios'

const productSlice = createSlice({
    name: 'Products',
    initialState: {
        products: [],
        status: STATUSES.IDLE,
        errorMessage: null
    },
    reducers: {
        setProducts(state, actions) {
            state.products = actions.payload
        },
        setStatus(state, actions) {
            state.status = actions.payload

        },
        setErrorMessage(state, actions) {
            state.errorMessage = actions.payload
        }
    }
})

export const { setProducts, setStatus, setErrorMessage } = productSlice.actions;
export default productSlice.reducer;

// Thunks
export const fetchProducts = () => {
    return async function fetchProductsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const products = await (await axios.get('http://localhost:8000/api/v1/products')).data
            console.log(products);
            dispatch(setProducts(products))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            // console.log("error", error);
            dispatch(setStatus(STATUSES.ERROR))
            dispatch(setErrorMessage(error.response.data))

        }
    }
}