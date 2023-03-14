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

  componentDidUpdate(prevState: IInputState): void {
    if (this.state.inputState !== prevState.inputState) {
      localStorage.setItem('inputQuery', this.state.inputState);
    }
  }

  componentDidMount(): void {
    const inputQuery = localStorage.getItem('inputQuery');
    if (inputQuery) {
      this.setState({ inputState: inputQuery });
    }
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
