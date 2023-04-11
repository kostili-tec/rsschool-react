import { rest } from 'msw';
import { TUnsplashResultsArray } from '../interfaces';

const unsplashResultsArray: TUnsplashResultsArray = [
  {
    id: 'abc123',
    created_at: '2022-03-01',
    promoted_at: '2022-03-05',
    color: '#FFFFFF',
    description: 'A beautiful mountain landscape',
    alt_description: 'Snowy mountains',
    links: {
      download: 'https://example.com/image1/download',
      download_location: 'https://example.com/image1/download/location',
      html: 'https://example.com/image1',
      self: 'https://api.example.com/image1',
    },
    likes: 100,
    tags: [
      { type: 'landscape', title: 'mountains' },
      { type: 'nature', title: 'snow' },
    ],
    urls: {
      full: 'https://example.com/image1/full',
      raw: 'https://example.com/image1/raw',
      regular: 'https://example.com/image1/regular',
      small: 'https://example.com/image1/small',
      small_s3: 'https://example.com/image1/small/s3',
      thumb: 'https://example.com/image1/thumb',
    },
    user: {
      name: 'John Smith',
      links: {
        portfolio: 'https://example.com/johnsmith/portfolio',
        html: 'https://example.com/johnsmith',
      },
      profile_image: {
        large: 'https://example.com/johnsmith/large',
        medium: 'https://example.com/johnsmith/medium',
        small: 'https://example.com/johnsmith/small',
      },
    },
    height: 1200,
    width: 1600,
  },
  {
    id: 'def456',
    created_at: '2022-03-02',
    promoted_at: '2022-03-06',
    color: '#000000',
    description: null,
    alt_description: null,
    links: {
      download: 'https://example.com/image2/download',
      download_location: 'https://example.com/image2/download/location',
      html: 'https://example.com/image2',
      self: 'https://api.example.com/image2',
    },
    likes: 50,
    tags: [
      { type: 'architecture', title: 'city' },
      { type: 'urban', title: 'buildings' },
    ],
    urls: {
      full: 'https://example.com/image2/full',
      raw: 'https://example.com/image2/raw',
      regular: 'https://example.com/image2/regular',
      small: 'https://example.com/image2/small',
      small_s3: 'https://example.com/image2/small/s3',
      thumb: 'https://example.com/image2/thumb',
    },
    user: {
      name: 'Jane Doe',
      links: {
        portfolio: 'https://example.com/janedoe/portfolio',
        html: 'https://example.com/janedoe',
      },
      profile_image: {
        large: 'https://example.com/janedoe/large',
        medium: 'https://example.com/janedoe/medium',
        small: 'https://example.com/janedoe/small',
      },
    },
    height: 800,
    width: 1200,
  },
  {
    id: 'ghi789',
    created_at: '2022-03-03',
    promoted_at: '2022-03-07',
    color: '#FF0000',
    description: 'A beautiful sunset over the ocean',
    alt_description: 'Red sky over the sea',
    links: {
      download: 'https://example.com/image3/download',
      download_location: 'https://example.com/image3/download/location',
      html: 'https://example.com/image3',
      self: 'https://api.example.com/image3',
    },
    likes: 200,
    tags: [
      { type: 'nature', title: 'sunset' },
      { type: 'landscape', title: 'ocean' },
    ],
    urls: {
      full: 'https://example.com/image3/full',
      raw: 'https://example.com/image3/raw',
      regular: 'https://example.com/image3/regular',
      small: 'https://example.com/image3/small',
      small_s3: 'https://example.com/image3/small/s3',
      thumb: 'https://example.com/image3/thumb',
    },
    user: {
      name: 'Alex Johnson',
      links: {
        portfolio: 'https://example.com/alexjohnson/portfolio',
        html: 'https://example.com/alexjohnson',
      },
      profile_image: {
        large: 'https://example.com/alexjohnson/large',
        medium: 'https://example.com/alexjohnson/medium',
        small: 'https://example.com/alexjohnson/small',
      },
    },
    height: 900,
    width: 1600,
  },
];

const handlers = [
  rest.get('https://api.unsplash.com/photos/random?count=30', (req, res, context) => {
    return res(context.status(200), context.json({ unsplashResultsArray }));
  }),
  rest.get('https://api.unsplash.com/photos/random?count=1', (req, res, context) => {
    return res(context.status(200));
  }),
];

export default handlers;
