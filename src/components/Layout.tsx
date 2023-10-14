import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { IHeaderLinks } from '../interfaces';

const headerLinks: Array<IHeaderLinks> = [
  { linkName: 'Main Page', linkTo: '/' },
  { linkName: 'About Us', linkTo: '/about' },
  { linkName: 'Form', linkTo: '/form' },
];

const Layout: FC = () => {
  return (
    <>
      <Header headerLinks={headerLinks} />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
