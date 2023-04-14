import React, { FC, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from '../styles/header.module.scss';
export interface IHeaderLinks {
  linkName: string;
  linkTo: string;
}

const headerLinks: Array<IHeaderLinks> = [
  { linkName: 'Main Page', linkTo: '/' },
  { linkName: 'About Us', linkTo: '/about' },
  { linkName: 'Form', linkTo: '/form' },
];

const Header: FC = () => {
  const [headerTitle, setHeaderTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currenPage = headerLinks.find((page) => page.linkTo === location.pathname);
    if (currenPage) setHeaderTitle(currenPage.linkName);
  }, [location.pathname]);

  return (
    <header className={classes.header}>
      <h1>{headerTitle}</h1>
      <nav className={classes.nav}>
        {headerLinks.map((value) => (
          <NavLink key={value.linkTo} to={value.linkTo} className={classes['header-link']}>
            {value.linkName}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
