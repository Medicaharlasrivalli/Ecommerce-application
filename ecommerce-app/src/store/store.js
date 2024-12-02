import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice'
import wishListReducer from './wishListSlice';
import ordersReducer from './ordersSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart:cartReducer,
        wishlist:wishListReducer,
        orders:ordersReducer
    }
});

export default store;
