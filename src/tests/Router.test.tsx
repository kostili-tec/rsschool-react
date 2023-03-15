import { describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import { IHeaderLinks } from '../interfaces';
import { MemoryRouter } from 'react-router-dom';

describe('Router test', () => {
  it('Error page', () => {
    render(
      <MemoryRouter initialEntries={['/aboba']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
