import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as searchReducer } from './favorites/search.slice';
import { reducer as formReducer } from './favorites/form.slice';
import { reducer as authReducer } from './favorites/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { api } from './api/api';
import type { TypedUseSelectorHook } from 'react-redux';

const reducers = combineReducers({
  searchState: searchReducer,
  formState: formReducer,
  authState: authReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
