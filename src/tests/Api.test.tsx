import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPageContent from '../components/UI/MainComponents/MainPageContent';
import App from '../App';
import { server } from './mocks/testServer';
import { store } from '../redux/store/store';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('Api tests', async () => {
  const testKey = 'valid_key';
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });
    const input = screen.getByPlaceholderText(/enter your Unsplash key/i);
    const submitButton = screen.getByText(/submit/i);
    expect(input).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(input, { target: { value: testKey } });
    });
    await act(async () => {
      fireEvent.click(submitButton);
    });
  });

  it('enter valid key and get random photos', async () => {
    const images = await screen.findAllByRole('main-card');
    await waitFor(() => {
      expect(images).toHaveLength(30);
    });
  });
});

describe('Main page content test', () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <MainPageContent />
      </Provider>
    );
  });
  it('should upload images by search query', async () => {
    const searchInput = await screen.findByRole('search-input');
    const submitSearch = await screen.findByRole('submit-input');
    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
      fireEvent.change(searchInput, { target: { value: 'stockings' } });
      fireEvent.click(submitSearch);
    });
    const firstImageHeader = await screen.findByText(/reading/i);
    const foundImages = await screen.findAllByRole('main-card');
    await waitFor(() => {
      expect(firstImageHeader).toBeInTheDocument();
      expect(foundImages).toHaveLength(30);
    });
  });
});
