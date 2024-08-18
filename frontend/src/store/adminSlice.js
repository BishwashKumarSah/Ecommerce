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
        countryWiseSalesData: {},
        totalProfits: 0,
        totalOrders: 0,
        totalUser: 0,
        status: STATUSES.IDLE,
        errorMessage: null
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

export const { setTotalProfits, setAllProducts, setNewProduct, setAllOrders, setTotalProfit, setTotalUser, setCountryWiseSalesData, setStatus, setErrorMessage } = adminSlice.actions;
export default adminSlice.reducer;


//Get all the products
export const getAllProducts = () => {
    return async function getAllProductsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/admin/products', { withCredentials: true });
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
            const { data } = await axios.get(`http://localhost:8000/api/v1/admin/totalProfits/${year}`, { withCredentials: true });

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
            const { data } = await axios.get(`http://localhost:8000/api/v1/admin/orders`, { withCredentials: true });

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
            const { data } = await axios.get(`http://localhost:8000/api/v1/admin/users`, { withCredentials: true });


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
            const { data } = await axios.post('http://localhost:8000/api/v1/admin/product/new', product, config)
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
            await axios.delete(`http://localhost:8000/api/v1/admin/product/${id}`, config)

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
            await axios.put(`http://localhost:8000/api/v1/admin/product/${id}`, product, config)

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

            const { data } = await axios.get('http://localhost:8000/api/v1/admin/orders', { withCredentials: true });
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
            const { data } = await axios.put(`http://localhost:8000/api/v1/admin/order/${id}`, formData, config);
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
            const { data } = await axios.delete(`http://localhost:8000/api/v1/admin/order/${id}`, config);
            // dispatch(getAllOrders());
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}