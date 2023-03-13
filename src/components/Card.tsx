import React, { Component } from 'react';
import BuyButton from './UI/BuyButton/BuyButton';
import { IProduct } from '../interfaces';

export default class Card extends Component<IProduct> {
  constructor(props: IProduct) {
    super(props);
  }
  render() {
    return (
      <div className="card">
        <img src={this.props.thumbnail} alt={this.props.title} />
        <div className="card-description__container">
          <h4>{this.props.title}</h4>
          <p>{this.props.description}</p>
          <p>Brand: {this.props.brand}</p>
          <p>Caregory: {this.props.category}</p>
          <p>Rating: {this.props.rating}</p>
          <p>In Stock: {this.props.stock}</p>
          <p>$ {this.props.price}</p>
        </div>
        <BuyButton />
      </div>
    );
  }
}
