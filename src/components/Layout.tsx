import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { IHeaderLinks } from '../interfaces';

const headerLinks: Array<IHeaderLinks> = [
  { linkName: 'Main Page', linkTo: '/' },
  { linkName: 'About Us', linkTo: '/about' },
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
