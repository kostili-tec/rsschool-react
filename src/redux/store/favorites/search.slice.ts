import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TSeacthSlice = {
  searchQuery: string;
  skip?: boolean;
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
    skip: true, // костыль
  } as TSeacthSlice,
  reducers: {
    setSearch: (state, { payload: { searchQuery, skip } }: PayloadAction<TSeacthSlice>) => {
      (state.searchQuery = searchQuery), (state.skip = skip);
    },
  },
});

export const { actions, reducer } = searchSlice;
