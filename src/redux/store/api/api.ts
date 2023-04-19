import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TUnsplashResultsArray,
  IUnsplashRequestData,
  IUnsplashGetPhoto,
} from '../../../interfaces';

const baseUrl = 'https://api.unsplash.com/';
const additionSearh = 'search/photos?';
const additionGetPhoto = 'photos/';

type RandomPhotosRequest = {
  query: string;
  page: number | string;
  per_page: number | string;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = 'FYdN3NPqRZfJlZqP-pOElRcZ95ARwjpFvreQ-1zSBOM';
      if (token) {
        headers.set('Authorization', `Client-ID ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRandomPhotos: builder.query<TUnsplashResultsArray, number>({
      query: (count) => `photos/random?count=${count}`,
    }),
    searchPhotos: builder.query<IUnsplashRequestData, RandomPhotosRequest>({
      query: ({ query, page, per_page }) => ({
        url: additionSearh,
        params: {
          query,
          page,
          per_page,
        },
      }),
    }),
    getPhotoById: builder.query<IUnsplashGetPhoto, string>({
      query: (id) => `${additionGetPhoto}${id}`,
    }),
    checkAccesKey: builder.query({
      query: () => `${additionGetPhoto}random?count=1`,
    }),
  }),
});

export const {
  useGetRandomPhotosQuery,
  useSearchPhotosQuery,
  useGetPhotoByIdQuery,
  useLazyCheckAccesKeyQuery,
} = api;
