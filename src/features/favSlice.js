import { createSlice } from '@reduxjs/toolkit';

export const favSlice = createSlice({
  name: 'fav',
  initialState: {
    fav: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleFav: (state, action) => {
      state.fav = action.payload;
    },
  },  
});

export const { toggleFav } = favSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFav = (state) => state.fav.fav;

export default favSlice.reducer;
