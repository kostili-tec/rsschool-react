import {
  IApiGetRequest,
  IUnsplashRequestData,
  IUnsplashResults,
  IUnsplashGetPhoto,
} from '../interfaces';

const key = 'UjaKotcSxWlYeY_ei3APf9ukbH1TmeSxoUr6LdzSuoA';
const baseUrl = 'https://api.unsplash.com/';
const additionSearh = 'search/photos?';
const additionGetPhoto = 'photos/';

export async function getProducts(limit = 20) {
  try {
    const res: Response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    const data: IApiGetRequest = await res.json();
    return data;
  } catch {
    return null;
  }
}

export const getPhotos = async () => {
  const obj = {
    client_id: key,
    query: 'legs',
    page: '1',
    per_page: '3',
  };
  const query = new URLSearchParams(obj);
  const fullQuery = baseUrl + additionSearh + query;
  const res = await fetch(fullQuery);
  return await res.json();
};

export const getPhotoById = async (id: string): Promise<IUnsplashGetPhoto> => {
  const queryPhoto = `${baseUrl}${additionGetPhoto}${id}?client_id=${key}`;
  const res = await fetch(queryPhoto);
  return res.json();
};

export const getJson = async (): Promise<IUnsplashRequestData> => {
  const res = await fetch('./unsplash.json');
  const data = await res.json();
  return data;
};
