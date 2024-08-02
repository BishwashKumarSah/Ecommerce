import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './statusEnums';
import axios from 'axios';

const productSlice = createSlice({
    name: 'Products',
    initialState: {
        products: [],
        product: null,
        status: STATUSES.IDLE,
        errorMessage: null,
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
        },
        setSingleProduct(state, action) {
            state.product = action.payload;
        },
        updateProductReviews(state, action) {
            
            state.product.data.reviews = action.payload.reviews;
            state.product.data.ratings = action.payload.ratings;
            state.product.data.numOfReviews = action.payload.numOfReviews;
            

        },
        clearErrorMessage(state, action) {
            state.errorMessage = action.payload;
        }
    },
});

export const { setProducts, setStatus, setErrorMessage, setSingleProduct, updateProductReviews, clearErrorMessage } = productSlice.actions;
export default productSlice.reducer;

// Thunks
export const fetchProducts = () => {
    return async function fetchProductsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/products');
            dispatch(setProducts(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

export const fetchProductDetails = (id) => {
    return async function fetchProductDetailsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/${id}`);
            dispatch(setSingleProduct(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

export const newReview = (myForm, productId) => {
    return async function newReviewThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await axios.put('http://localhost:8000/api/v1/review', myForm, {
                withCredentials: true
            });
            const { product } = getState().products;
            
          
            dispatch(updateProductReviews({
                productId,
                reviews:data.reviews.reviews,
                numOfReviews:data.reviews.reviews.numOfReviews,
                rating:data.reviews.reviews.ratings,
            }));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};
