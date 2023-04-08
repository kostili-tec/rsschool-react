import React, { FC } from 'react';
import classes from './LogoutButton.module.scss';
import logoutSvg from '../../../assets/logout.svg';

interface ILogoutButtonProps {
  logoutCallback: () => void;
}

const LogoutButton: FC<ILogoutButtonProps> = ({ logoutCallback }) => {
  return (
    <div className={classes.logoutContainer}>
      <button className={classes.logoutButton} onClick={logoutCallback}>
        <img className={classes.logoutSVG} src={logoutSvg} alt="logout" />
      </button>
    </div>
  );
};

export default LogoutButton;
