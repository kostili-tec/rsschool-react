import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { server } from './testServer';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Api tests', () => {
  const testKey = 'UjaKotcSxWlYeY_ei3APf9ukbH1TmeSxoUr6LdzSuoA';

  it('test', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/enter your Unsplash key/i);
    const submit = screen.getByText(/submit/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { value: testKey });
    fireEvent.click(submit);
    await waitFor(() => {
      const form = screen.getByText(/form/i);
      expect(form).toBeInTheDocument();
    });
    await act(async () => {
      await waitFor(() => {
        expect(screen.getAllByAltText(/image-/i)).toBeInTheDocument();
      });
    });
  });
});
