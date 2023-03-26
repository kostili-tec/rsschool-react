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
    const titleCard = await screen.findByText(/iPhone 9/i);
    const descriptionCard = await screen.findByText(/An apple mobile/i);
    expect(titleCard).toBeInTheDocument();
    expect(descriptionCard).toBeInTheDocument();
  });
  it('test list of cards', () => {
    const productsArray: IProductsArray = [
      {
        id: 1,
        thumbnail: 'https://example.com/product1.jpg',
        title: 'Product 1',
        description: 'This is a first description',
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
        description: 'This is a second description',
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

    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/this is a first description/i)).toBeInTheDocument();
    expect(screen.getByText(/Brand: Brand 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Category 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating: 4.5/i)).toBeInTheDocument();
    expect(screen.getByText(/In Stock: 10/i)).toBeInTheDocument();
    expect(screen.getByText('$ 100')).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/this is a second description/i)).toBeInTheDocument();
    expect(screen.getByText(/Brand: Brand 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Category 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating: 2.3/i)).toBeInTheDocument();
    expect(screen.getByText(/In Stock: 300/i)).toBeInTheDocument();
    expect(screen.getByText('$ 300')).toBeInTheDocument();
  });
});
