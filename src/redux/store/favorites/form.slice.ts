import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormCardData } from '../../../interfaces';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    formCards: <Array<IFormCardData>>[],
  },
  reducers: {
    setCard: (state, action: PayloadAction<IFormCardData>) => {
      state.formCards.push(action.payload);
    },
  },
});

export const { setCard } = formSlice.actions;

export default formSlice.reducer;
