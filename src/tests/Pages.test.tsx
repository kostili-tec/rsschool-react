import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainPage from '../components/pages/MainPage';
import AboutPage from '../components/pages/AboutPage';
import FormPage from '../components/pages/FormPage';

describe('Pages test', () => {
  it('render Main page', () => {
    render(<MainPage />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
  it('render About page', () => {
    render(<AboutPage />);
    expect(screen.getByText(/about us/i));
  });
  it('render Form page', () => {
    render(<FormPage />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
  });
});
