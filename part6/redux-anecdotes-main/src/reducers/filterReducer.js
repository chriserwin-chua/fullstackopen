import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterText: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilterText(state, action) {
      const content = action.payload;
      return { ...state, filterText: content };
    },
  },
});
export const { addFilterText } = filterSlice.actions;
export default filterSlice.reducer;
