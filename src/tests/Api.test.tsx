import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import MainPageContent from '../components/UI/MainComponents/MainPageContent';
import { server } from './mocks/testServer';
import { store } from '../redux/store/store';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

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
