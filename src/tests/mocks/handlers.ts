import { rest } from 'msw';
import accessJson from './access.json';
import unsplashData from '../../../public/unsplash.json';
import searchData from './searchData.json';

const baseUrl = 'https://api.unsplash.com/';

const handlers = [
  rest.get(`${baseUrl}photos/random`, (req, res, context) => {
    localStorage.setItem('kostili-isValid', 'true');
    const count = req.url.searchParams.get('count');
    if (count === '30') {
      return res(context.status(200), context.delay(100), context.json(unsplashData.results));
    }
    if (count === '1') {
      return res(
        context.status(200),
        context.set({ Authorization: `Client-ID valid_key` }),
        context.delay(100),
        context.json(accessJson)
      );
    }
  }),
  rest.get(`${baseUrl}search/photos`, (req, res, context) => {
    const query = req.url.searchParams.get('query');
    if (query) return res(context.status(200), context.delay(100), context.json(searchData));
  }),
];

export default handlers;
