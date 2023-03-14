import { IApiGetRequest } from '../interfaces';

export async function getProducts(limit = 20) {
  try {
    const res: Response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    const data: IApiGetRequest = await res.json();
    return data;
  } catch {
    return null;
  }
}
