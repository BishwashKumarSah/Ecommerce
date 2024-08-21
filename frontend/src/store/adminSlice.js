import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./statusEnums";
import { getOrderDetails } from "./orderSlice";

const adminSlice = createSlice({
    name: 'Admin',
    initialState: {
        profits: {},
        allOrders: {},
        newProduct: {},
        allProducts: {},
        productsArray: [],
        allUsers: [],
        userProfile: {},
        countryWiseSalesData: {},
        allReviews: [],
        ratings: 0,
        totalProfits: 0,
        totalOrders: 0,
        totalUser: 0,
        status: STATUSES.IDLE,
        errorMessage: null,
        message: null,
        success: false
    },
    reducers: {
        setTotalProfits(state, action) {
            state.profits = action.payload;
        },
        setNewProduct(state, action) {
            state.newProduct = action.payload
        },
        setAllProducts(state, action) {
            state.allProducts = action.payload.data;
            state.productsArray = action.payload.products
        },
        setAllReviews(state, action) {
            state.allReviews = action.payload.reviews;
            state.ratings = action.payload.ratings;
            state.success = action.payload.success;
            state.message = action.payload.message
        },
        setCountryWiseSalesData(state, action) {
            state.countryWiseSalesData = action.payload
        },
        setTotalProfit(state, action) {
            state.totalProfits = action.payload.totalProfits
            state.totalOrders = action.payload.totalOrders
        },
        setTotalUser(state, action) {
            state.totalUser = action.payload
        },
        setAllUsers(state, action) {
            state.allUsers = action.payload.users
            state.message = action.payload.message
        },
        setUserProfile(state, action) {
            state.userProfile = action.payload.user
            state.message = action.payload.message
            state.success = action.payload.success
        },
        setAllOrders(state, action) {
            state.allOrders = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
        },
    }
});

export const { setTotalProfits, setAllProducts, setUserProfile, setAllReviews, setAllUsers, setNewProduct, setAllOrders, setTotalProfit, setTotalUser, setCountryWiseSalesData, setStatus, setErrorMessage } = adminSlice.actions;
export default adminSlice.reducer;


//Get all the products
export const getAllProducts = () => {
    return async function getAllProductsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get('/api/v1/admin/products', { withCredentials: true });
            dispatch(setAllProducts({ data, products: data.products }))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

// Get total cumulative profits (ADMIN)
export const getTotalProfits = (year) => {
    return async function getTotalProfitsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get(`/api/v1/admin/totalProfits/${year}`, { withCredentials: true });

            dispatch(setTotalProfits({ year: data.year, totalProfits: data.totalProfit }))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

// Get Country Wise Sales Data (ADMIN)
export const getCountryWiseSalesData = () => {
    return async function getCountryWiseSalesDataThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get(`/api/v1/admin/orders`, { withCredentials: true });

            dispatch(setCountryWiseSalesData(data.salesMap))
            dispatch(setTotalProfit({ totalProfits: data.total_Amount, totalOrders: data.totalOrders }))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

export const getTotalUserCount = () => {
    return async function getTotalUserCountThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get(`/api/v1/admin/users`, { withCredentials: true });
            dispatch(setTotalUser(data.totalUser))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};


// Create a new product 

export const createNewProduct = (product) => {
    return async function createNewProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            const { data } = await axios.post('/api/v1/admin/product/new', product, config)
            dispatch(setNewProduct(data.data))
            dispatch(setStatus(STATUSES.IDLE))

        } catch (error) {
            dispatch(setNewProduct({}))
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

export const deleteProduct = (id) => {
    return async function deleteProductThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { withCredentials: true }
            await axios.delete(`/api/v1/admin/product/${id}`, config)
            dispatch(getAllProducts())
            dispatch(setStatus(STATUSES.IDLE))

        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

export const editProduct = (id, product) => {
    return async function editProductThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            // const config = { headers: { 'Content-Type': "multipart/form-data" }, withCredentials: true }
            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            await axios.put(`/admin/product/${id}`, product, config)

            dispatch(setStatus(STATUSES.IDLE))

        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

// GET ALL ORDERS (ADMIN)

export const getAllOrders = () => {
    return async function getAllOrdersThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get('/api/v1/admin/orders', { withCredentials: true });
            dispatch(setAllOrders(data.orders))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

// Update Order Status (ADMIN)

export const updateOrderStatus = (id, formData) => {
    return async function updateOrderStatusThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {

            const config = { withCredentials: true }
            const { data } = await axios.put(`/api/v1/admin/order/${id}`, formData, config);
            dispatch(getOrderDetails(id));
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}
// Update Order Status (ADMIN)

export const deleteOrder = (id, formData) => {
    return async function deleteOrderThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {

            const config = { withCredentials: true }
            const { data } = await axios.delete(`/api/v1/admin/order/${id}`, config);
            // dispatch(getAllOrders());
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

// Get All Users (ADMIN)

export const getAllUsers = () => {
    return async function getAllUsersThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {

            const config = { withCredentials: true }
            const { data } = await axios.get(`/api/v1/admin/users`, config);
            dispatch(setAllUsers({ users: data.users, message: data.message }));
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}
// Get Specific User Details (ADMIN)

export const getUserProfileDetails = (id) => {
    return async function getUserProfileDetailsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { withCredentials: true }
            const { data } = await axios.get(`/api/v1/admin/user/${id}`, config);
            dispatch(setUserProfile({ user: data.user, message: data.message, success: data.success }));
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}
// Update User Details (ADMIN)

export const updateUserDetails = (id, formData) => {
    return async function updateUserDetailsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            const { data } = await axios.put(`/api/v1/admin/user/${id}`, formData, config);
            dispatch(setUserProfile({ user: data.user, message: data.message, success: data.success }));
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}
// Delete User (ADMIN)

export const deleteUserProfile = (id) => {
    return async function deleteUserProfileThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { withCredentials: true }
            await axios.delete(`/api/v1/admin/user/${id}`, config);
            dispatch(getAllUsers());
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}


// Get All Reviews (ADMIN)
export const getAllReviews = (id) => {
    return async function getAllReviewsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { withCredentials: true }
            const { data } = await axios.get(`/api/v1/reviews?id=${id}`, config);
            dispatch(setAllReviews({ reviews: data.reviews, ratings: data.ratings, success: data.success, message: data.message }));
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

// Delete Reviews (ADMIN)
export const deleteReviews = (reviewId, productId) => {
    return async function deleteReviewsThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { withCredentials: true }
            const { data } = await axios.delete(`/api/v1/reviews?productId=${productId}&id=${reviewId}`, config);
            dispatch(setAllReviews({ reviews: data.reviews, ratings: data.ratings, success: data.success, message: data.message }));
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}