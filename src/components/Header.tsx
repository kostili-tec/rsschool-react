import React, { FC, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from '../styles/header.module.scss';
import { IStateHeader, IHeaderProps } from '../interfaces';

const Header: FC<IHeaderProps> = (props) => {
  const { headerLinks } = props;
  const [header, setHeader] = useState<IStateHeader>({ title: 'Main Page' });
  const location = useLocation();

  useEffect(() => {
    const currenPage = headerLinks.find((page) => page.linkTo === location.pathname);
    if (currenPage) setHeader({ title: currenPage.linkName });
  }, [location, headerLinks]);

  return (
    <header className={classes.header}>
      <h1>{header.title}</h1>
      <nav className={classes.nav}>
        {headerLinks.map((value, index) => (
          <NavLink key={index} to={value.linkTo} className={classes['header-link']}>
            {value.linkName}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
