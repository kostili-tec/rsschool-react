import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('Router test', () => {
  it('Error page', () => {
    render(
      <MemoryRouter initialEntries={['/aboba']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByAltText('error-image')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
  it('Main Page with modal authrization', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const header = screen.getByText(/to use this app/i);
    const inputText = screen.getByPlaceholderText(/enter your unsplash/i);
    const inputSumbit = screen.getByText(/submit/i);
    expect(header).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(inputSumbit).toBeInTheDocument();
  });
});
