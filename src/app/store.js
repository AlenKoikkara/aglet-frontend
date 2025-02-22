import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../features/userSlice';
import cartSliceReducer from '../features/cartSlice';
import favSliceReducer from '../features/favSlice';


export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    cart: cartSliceReducer,
    fav: favSliceReducer,
  },
});
