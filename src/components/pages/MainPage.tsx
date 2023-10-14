import React, { Component } from 'react';
import SearchForm from '../SearchForm';
import Card from '../Card';
import { getProducts } from '../../utils/api';
import { IProductsArray } from '../../interfaces';
import reactSVG from '../../assets/react.svg';

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
      if (data) {
        const products = data.products;
        this.setState({ products });
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }
  render() {
    const { products } = this.state;
    return (
      <div className="main-page">
        <SearchForm />
        {products.length ? (
          <div className="cards-container">
            {products.map((el) => (
              <Card key={el.id} {...el} />
            ))}
          </div>
        ) : (
          <img src={reactSVG} alt="react-logo" className="logo" />
        )}
      </div>
    );
  }
}
