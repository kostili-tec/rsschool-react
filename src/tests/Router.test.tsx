import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import App from '../App';

describe('Router test', () => {
  it('Error page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/aboba']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByAltText('error-image')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
  it('Main Page with modal authrization', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const header = screen.getByText(/to use this app/i);
    const inputText = screen.getByPlaceholderText(/enter your unsplash/i);
    const inputSumbit = screen.getByText(/submit/i);
    expect(header).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(inputSumbit).toBeInTheDocument();
  });
});
