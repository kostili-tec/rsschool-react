import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Card from '../components/Card';
import { IProductsArray } from '../interfaces';

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
  it('test list of cards', () => {
    const productsArray: IProductsArray = [
      {
        id: 1,
        thumbnail: 'https://example.com/product1.jpg',
        title: 'Product 1',
        description: 'This is a description of Product 1',
        brand: 'Brand 1',
        category: 'Category 1',
        rating: 4.5,
        stock: 10,
        price: 100,
        discountPercentage: 50,
        images: [''],
      },
      {
        id: 2,
        thumbnail: 'https://example.com/product2.jpg',
        title: 'Product 2',
        description: 'This is a description of Product 2',
        brand: 'Brand 2',
        category: 'Category 2',
        rating: 2.3,
        stock: 300,
        price: 300,
        discountPercentage: 10,
        images: [''],
      },
    ];
    render(
      <>
        {productsArray.map((card) => (
          <Card key={`card-${card.id}`} {...card} />
        ))}
      </>
    );
    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-1')).toHaveTextContent(/Product 1/i);
    expect(screen.getByTestId('card-1')).toHaveTextContent(/This is a description of Product 1/i);
    expect(screen.getByTestId('card-1')).toHaveTextContent(/Brand: Brand 1/i);
    expect(screen.getByTestId('card-1')).toHaveTextContent(/Category 1/i);
    expect(screen.getByTestId('card-1')).toHaveTextContent(/Rating: 4.5/i);
    expect(screen.getByTestId('card-1')).toHaveTextContent(/In Stock: 10/i);
    expect(screen.getByTestId('card-1')).toHaveTextContent('$ 100');
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
    expect(screen.getByTestId('card-2')).toHaveTextContent(/Product 2/i);
    expect(screen.getByTestId('card-2')).toHaveTextContent(/This is a description of Product 2/i);
    expect(screen.getByTestId('card-2')).toHaveTextContent(/Brand: Brand 2/i);
    expect(screen.getByTestId('card-2')).toHaveTextContent(/Category 2/i);
    expect(screen.getByTestId('card-2')).toHaveTextContent(/Rating: 2.3/i);
    expect(screen.getByTestId('card-2')).toHaveTextContent(/In Stock: 300/i);
    expect(screen.getByTestId('card-2')).toHaveTextContent('$ 300');
  });
});
