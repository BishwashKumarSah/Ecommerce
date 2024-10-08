import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './statusEnums';
import axios from 'axios';

const productSlice = createSlice({
    name: 'Products',
    initialState: {
        featuredProducts: [],
        products: [],
        totalProductsCount: 0,
        product: null,
        status: STATUSES.IDLE,
        errorMessage: null,
    },
    reducers: {
        setFeaturedProducts(state, action) {
            state.featuredProducts = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload.products
            state.totalProductsCount = action.payload.totalProductsCount

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

export const { setFeaturedProducts, setProducts, setStatus, setErrorMessage, setSingleProduct, updateProductReviews, clearErrorMessage } = productSlice.actions;
export default productSlice.reducer;

// Thunks
export const fetchFeaturedProducts = () => {
    return async function fetchProductsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await axios.get('/api/v1/products');
            dispatch(setFeaturedProducts(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

export const fetchAllProducts = (search, currentPage = 1, price = [0, 10000], category, ratings = 0) => {
    return async function fetchAllProducts(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            let URI = `products?search=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${+ratings}`;
            if (category) {
                if (category === "All") {
                    URI = `products?search=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${+ratings}`;
                } else {
                    URI = `products?search=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${+ratings}&category=${category}`;
                }
            }

            const { data } = await axios.get(`/api/v1/${URI}`)


            dispatch(setProducts({ products: data.data, totalProductsCount: data.totalProductsCount }))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}


export const fetchProductDetails = (id) => {
    return async function fetchProductDetailsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch(setSingleProduct(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

export const newReview = (myForm, productId) => {
    return async function newReviewThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await axios.put('/api/v1/review', myForm, {
                withCredentials: true,
                headers: { "Content-Type": 'application/json' }
            });
            dispatch(updateProductReviews({
                productId,
                reviews: data.reviews.reviews,
                numOfReviews: data.reviews.reviews.numOfReviews,
                rating: data.reviews.reviews.ratings,
            }));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};
