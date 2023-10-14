import React, { FC } from 'react';
import BuyButton from './UI/BuyButton/BuyButton';
import { IProduct } from '../interfaces';

const Card: FC<IProduct> = (props) => {
  return (
    <div className="card">
      <img src={props.thumbnail} alt={props.title} />
      <div className="card-description__container">
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <p>Brand: {props.brand}</p>
        <p>Caregory: {props.category}</p>
        <p>Rating: {props.rating}</p>
        <p>In Stock: {props.stock}</p>
        <p>$ {props.price}</p>
      </div>
      <BuyButton />
    </div>
  );
};

export default Card;
