import { IUnsplashRequestData, IUnsplashGetPhoto, TUnsplashResultsArray } from '../interfaces';

const baseUrl = 'https://api.unsplash.com/';
const additionSearh = 'search/photos?';
const additionGetPhoto = 'photos/';

export const getPhotos = async (
  clientKey: string,
  searchQuery: string
): Promise<IUnsplashRequestData> => {
  const queryObj = {
    query: searchQuery,
    page: '1',
    per_page: '30',
  };
  const query = new URLSearchParams(queryObj);
  const fullQuery = baseUrl + additionSearh + query;
  const res = await fetch(fullQuery, {
    headers: {
      Authorization: `Client-ID ${clientKey}`,
    },
  });
  return await res.json();
};

export const getRandomPhotos = async (clientKey: string): Promise<TUnsplashResultsArray> => {
  const query = `${baseUrl}${additionGetPhoto}random?count=30`;
  const res = await fetch(query, {
    headers: {
      Authorization: `Client-ID ${clientKey}`,
    },
  });
  return await res.json();
};

export const getPhotoById = async (clientKey: string, id: string): Promise<IUnsplashGetPhoto> => {
  const queryPhoto = `${baseUrl}${additionGetPhoto}${id}`;
  const res = await fetch(queryPhoto, {
    headers: {
      Authorization: `Client-ID ${clientKey}`,
    },
  });
  return res.json();
};

export const checkAccessKey = async (clientKey: string) => {
  const url = `${baseUrl}${additionGetPhoto}random?count=1`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${clientKey}`,
    },
  });
  if (res.status === 200) return true;
  else return false;
};
