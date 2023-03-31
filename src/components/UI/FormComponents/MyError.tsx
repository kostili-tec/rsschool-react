import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

type TError = {
  errors: FieldError | undefined;
};

const MyError: FC<TError> = ({ errors }) => {
  console.log(errors);
  return <div>{errors && <p>{errors.message || 'Error'}</p>}</div>;
};

export default MyError;
