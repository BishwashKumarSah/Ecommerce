import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import userReducer from './userSlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'

export const  store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        cart: cartReducer,
        order: orderReducer
    }
})
