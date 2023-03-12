import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/header.module.scss';
import { IStateHeader, IHeaderProps } from '../interfaces';

export default class Header extends Component<IHeaderProps, IStateHeader> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = { title: 'Main Page' };
  }
  changePageTitle(name: string) {
    this.setState({ title: name });
  }
  render() {
    return (
      <header className={classes.header}>
        <h1>{this.state.title}</h1>
        <nav className={classes.nav}>
          {this.props.headerLinks.map((value, index) => (
            <Link
              key={index}
              to={value.linkTo}
              onClick={() => this.changePageTitle(value.linkName)}
            >
              {value.linkName}
            </Link>
          ))}
        </nav>
      </header>
    );
  }
}
