import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MainPage from '../components/pages/MainPage';
import AboutPage from '../components/pages/AboutPage';
import FormPage from '../components/pages/FormPage';
import { store } from '../redux/store/store';

describe('Pages test', () => {
  it('render Main page', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
    const form = screen.getByRole('search-form');
    expect(form).toBeInTheDocument();
  });
  it('render About page', () => {
    render(<AboutPage />);
    expect(screen.getByText(/about page/i));
  });
  it('render Form page', () => {
    render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  });
  it("form page should be doesn't have any cards on render", () => {
    render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
    expect(screen.getByText(/no cards/i)).toBeInTheDocument();
  });
});
