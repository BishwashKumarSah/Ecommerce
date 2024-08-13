import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from './statusEnums'
import axios from 'axios'


const userSlice = createSlice({
    name: 'User',
    initialState: {
        isAuthenticated: false,
        errorMessage: null,
        status: STATUSES.IDLE,
        isUpdated: false,
        user: {}
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user
            state.isAuthenticated = action.payload.isAuthenticated
        },
        setIsUpdate(state, action) {
            state.isUpdated = action.payload
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

export const { setUser, setStatus, setErrorMessage, clearErrorMessage, setIsUpdate } = userSlice.actions;

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
            dispatch(clearErrorMessage());
            dispatch(setStatus(STATUSES.IDLE))
            dispatch(setUser({ user: data.user, isAuthenticated: true }))
            dispatch(loadUser())

        } catch (error) {

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
            dispatch(loadUser())
        } catch (error) {
            dispatch(setUser({ user: {}, isAuthenticated: false }));
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};
export const updateUser = (formData) => {
    return async function updateUserThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            const { data } = await axios.put('http://localhost:8000/api/v1/user/updateUserProfile', formData, config);
            dispatch(clearErrorMessage());
            dispatch(setStatus(STATUSES.IDLE));
            dispatch(setUser({ user: data.user, isAuthenticated: true }));
            dispatch(setIsUpdate(true))
            dispatch(loadUser())
        } catch (error) {
            console.log("errorUpate", error);
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    };
};

export const updateUserPassword = (formData) => {
    return async function updateUserPasswordThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { headers: { 'Content-Type': "application/json" }, withCredentials: true }
            const { data } = await axios.put('http://localhost:8000/api/v1/user/updatePassword', formData, config);
            dispatch(clearErrorMessage());
            dispatch(setStatus(STATUSES.IDLE));
            dispatch(setUser({ user: data.user, isAuthenticated: true }));
            dispatch(setIsUpdate(true))
            dispatch(loadUser())


        } catch (error) {
            console.log("errorUpdatePassword", error);
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

export const forgotPassword = (formData) => {
    return async function forgotPasswordThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { headers: { 'Content-Type': "application/json" }, withCredentials: true }
            const { data } = await axios.post('http://localhost:8000/api/v1/user/password/reset', formData, config);
            dispatch(clearErrorMessage());
            dispatch(setIsUpdate(true))
            dispatch(setStatus(STATUSES.IDLE));

        } catch (error) {
            console.log("errorUpdatePassword", error);
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}
export const resetPassword = (token, formData) => {
    return async function resetPasswordThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = { headers: { 'Content-Type': "application/json" }, withCredentials: true }
            const { data } = await axios.put(`http://localhost:8000/api/v1/user/password/reset/${token}`, formData, config);
            console.log("data", data);
            dispatch(clearErrorMessage());
            dispatch(setIsUpdate(true))
            dispatch(setStatus(STATUSES.IDLE));

        } catch (error) {
            console.log("errorUpdatePassword", error);
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}


export const loadUser = () => {
    return async function loadUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/me', { withCredentials: true })
            dispatch(setUser({ user: data.user, isAuthenticated: true }))
            dispatch(clearErrorMessage())
            dispatch(setStatus(STATUSES.IDLE));
            

        } catch (error) {
            dispatch(setUser({ user: null, isAuthenticated: false }))
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}

export const logOut = () => {
    return async function (dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await axios.post('http://localhost:8000/api/v1/user/logout', {}, { withCredentials: true })
            console.log("logout successfully");
            dispatch(clearErrorMessage())
            dispatch(setStatus(STATUSES.IDLE));
            dispatch(setUser({ user: null, isAuthenticated: false }))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setErrorMessage(error.response?.data?.message || error.message));
        }
    }
}