import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { IHeaderLinks } from '../interfaces';

const headerLinks: Array<IHeaderLinks> = [
  { linkName: 'Main Page', linkTo: '/', 'data-testid': 'main-link' },
  { linkName: 'About Us', linkTo: '/about' },
  { linkName: 'Form', linkTo: '/form' },
];

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header headerLinks={headerLinks} />
        <main className="container">
          <Outlet />
        </main>
      </>
    );
  }
}
