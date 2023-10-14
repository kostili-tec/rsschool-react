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
  it('Main Page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByAltText('react-logo')).toBeInTheDocument();
  });
});
