import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actions as authAction } from '../../../redux/store/favorites/auth.slice';
import classes from './LogoutButton.module.scss';
import logoutSvg from '../../../assets/logout.svg';

const LogoutButton: FC = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authAction.setToken({ token: '', isValid: false }));
  };
  return (
    <button className={classes.logoutButton} onClick={handleLogout}>
      <img className={classes.logoutSVG} src={logoutSvg} alt="logout" />
    </button>
  );
};

export default LogoutButton;
