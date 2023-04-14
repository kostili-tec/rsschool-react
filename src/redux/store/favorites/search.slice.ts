import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// const initialState = '';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
  },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { actions, reducer } = searchSlice;
