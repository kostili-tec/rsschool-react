import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
  isValid: boolean;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isValid: false,
  } as AuthState,
  reducers: {
    setToken: (
      state,
      { payload: { token, isValid } }: PayloadAction<{ token: string; isValid: boolean }>
    ) => {
      state.token = token;
      state.isValid = isValid;
    },
  },
});

export const { actions, reducer } = authSlice;
