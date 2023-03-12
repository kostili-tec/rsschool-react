import React, { Component } from 'react';
import classes from './input.module.scss';

export default class SearchInput extends Component {
  render() {
    return <input className={classes.input} placeholder="Search here" />;
  }
}
