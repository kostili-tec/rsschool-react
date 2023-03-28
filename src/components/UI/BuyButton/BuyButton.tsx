import React, { FC } from 'react';
import classes from './buybutton.module.scss';

const BuyButton: FC = () => {
  return <button className={classes.button}>Add to cart</button>;
};

export default BuyButton;
