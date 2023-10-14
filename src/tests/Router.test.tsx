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
});
