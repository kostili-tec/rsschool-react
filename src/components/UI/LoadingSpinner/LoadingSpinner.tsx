import React, { FC } from 'react';
import blockskSpinner from '../../../assets/blocks-shuffle.svg';
import classes from './spinner.module.scss';

export const LoadingSpinner: FC = () => {
  return (
    <div className={classes.spinnerDiv}>
      <img src={blockskSpinner} alt="loading" className={classes.spinnerImg} />
    </div>
  );
};

export default LoadingSpinner;
