import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';
import classes from './MyError.module.scss';

type TError = {
  errors?: FieldError;
};

const MyError: FC<TError> = ({ errors }) => {
  return (
    <div>
      {errors ? (
        <p className={classes.error}>{errors.message || 'Error'}</p>
      ) : (
        <p className={classes.errorPlug}></p>
      )}
    </div>
  );
};

export default MyError;
