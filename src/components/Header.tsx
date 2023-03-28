import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../styles/header.module.scss';
import { IStateHeader, IHeaderProps } from '../interfaces';

const Header: FC<IHeaderProps> = (props) => {
  const [header, setHeader] = useState<IStateHeader>({ title: 'Main Page' });

  const changePageTitle = (name: string) => {
    setHeader({ title: name });
  };
  return (
    <header className={classes.header}>
      <h1>{header.title}</h1>
      <nav className={classes.nav}>
        {props.headerLinks.map((value, index) => (
          <NavLink
            key={index}
            to={value.linkTo}
            className={classes['header-link']}
            onClick={() => changePageTitle(value.linkName)}
          >
            {value.linkName}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
