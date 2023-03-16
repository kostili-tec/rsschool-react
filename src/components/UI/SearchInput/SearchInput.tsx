import React, { Component } from 'react';
import classes from './input.module.scss';

interface IInputState {
  inputState: string;
}

export default class SearchInput extends Component<Partial<IInputState>> {
  state: IInputState = {
    inputState: '',
  };

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputState: e.target.value });
  };

  componentDidMount(): void {
    const inputQuery = localStorage.getItem('inputQuery');
    if (inputQuery) {
      this.setState({ inputState: inputQuery });
    }
  }

  componentWillUnmount(): void {
    localStorage.setItem('inputQuery', this.state.inputState);
  }

  render() {
    return (
      <input
        onChange={this.changeHandler}
        value={this.state.inputState}
        className={classes.input}
        placeholder="Search here"
      />
    );
  }
}
