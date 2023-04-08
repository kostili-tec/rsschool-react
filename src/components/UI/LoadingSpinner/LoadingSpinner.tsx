import React, { FC } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import classes from './spinner.module.scss';

export const LoadingSpinner: FC = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#ffa500"
      wrapperStyle={{}}
      wrapperClass={classes.spinner}
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};

export default LoadingSpinner;
