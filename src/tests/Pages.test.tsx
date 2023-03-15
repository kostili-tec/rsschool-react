import { describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import MainPage from '../components/pages/MainPage';
import SearchForm from '../components/SearchForm';

describe('Main Page', () => {
  it('have something', () => {
    render(<MainPage />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
});
