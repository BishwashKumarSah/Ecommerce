import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from './statusEnums'
import axios from 'axios'


const userSlice = createSlice({
    name: 'User',
    initialState: {
        isAuthenticated: false,
        errorMessage: null,
        status: STATUSES.IDLE,
        user: {}
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user
            state.isAuthenticated = action.payload.isAuthenticated
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
})

export const { setUser, setStatus, setErrorMessage, clearErrorMessage } = userSlice.actions;

export default userSlice.reducer;


// Thunks

export const setUserLogin = (email, password) => {
    return async function setUserLoginThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true // Ensure cookies are sent with requests
            };
            const { data } = await axios.post('http://localhost:8000/api/v1/user/login', { email, password }, config)
            console.log("userData", data);


            dispatch(clearErrorMessage());
            dispatch(setStatus(STATUSES.IDLE))
            dispatch(setUser({ user: data.user, isAuthenticated: true }))

        } catch (error) {
            console.log("userLoginError", error);
            dispatch(setUser({ user: {}, isAuthenticated: false }))
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));

        }
    }
}

export const registerUser = (formData) => {
    return async function registerUserThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            const { data } = await axios.post('http://localhost:8000/api/v1/user/register', formData, config);
            dispatch(clearErrorMessage());
            dispatch(setStatus(STATUSES.IDLE));
            dispatch(setUser({ user: data.user, isAuthenticated: true }));
        } catch (error) {
            dispatch(setUser({ user: {}, isAuthenticated: false }));
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

export const loadUser = () => {
    return async function (dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/me', { withCredentials: true })
            dispatch(clearErrorMessage())
            dispatch(setStatus(STATUSES.IDLE));
            dispatch(setUser({ user: data.user, isAuthenticated: true }))
        } catch (error) {
            dispatch(setUser({ user: null, isAuthenticated: false }))
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}