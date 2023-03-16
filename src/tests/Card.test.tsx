import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('Card test', () => {
  it('render card', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const cardEl = await screen.findByTestId('card-1');
    const titleCard = await screen.findByText(/iPhone 9/i);
    const descriptionCard = await screen.findByText(/An apple mobile/i);
    expect(cardEl).toBeTruthy();
    expect(titleCard).toBeInTheDocument();
    expect(descriptionCard).toBeInTheDocument();
  });
});
