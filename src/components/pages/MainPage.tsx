import React, { Component } from 'react';
import SearchForm from '../SearchForm';
import Card from '../Card';
import { getProducts } from '../../API/api';
import { IProductsArray } from '../../interfaces';

interface IState {
  products: IProductsArray;
}
export default class MainPage extends Component<Partial<IState>> {
  state: IState = {
    products: [],
  };
  async componentDidMount() {
    try {
      const data = await getProducts();
      const products = data?.products;
      this.setState({ products });
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }
  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <>
        <SearchForm />
        <div className="cards-container">
          {products ? (
            products.map((el) => <Card key={`card-${el.id}`} {...el} />)
          ) : (
            <h1 style={{ color: 'black' }}>Loading</h1>
          )}
        </div>
      </>
    );
  }
}
