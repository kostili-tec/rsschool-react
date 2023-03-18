import React, { Component } from 'react';
import classes from './buybutton.module.scss';

export default class BuyButton extends Component {
  render() {
    return <button className={classes.button}>Add to cart</button>;
  }
}
