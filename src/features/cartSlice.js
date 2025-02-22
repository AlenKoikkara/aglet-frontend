import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCart: (state, action) => {
      state.cart = action.payload;
    },
    removeCart: (state, action)  => {
      state.cart = action.payload;
    }
  },  
});

export const { addCart, removeCart } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
