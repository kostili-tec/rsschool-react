import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { server } from './mocks/testServer';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('Api tests', () => {
  const testKey = 'valid_key';

  it('enter valid key and get random photos', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/enter your Unsplash key/i);
    const submitButton = screen.getByText(/submit/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: testKey } });
    fireEvent.click(submitButton);
    const images = await screen.findAllByRole('main-card');
    await waitFor(() => {
      expect(images).toHaveLength(30);
    });
  });
});
