import React, { FC, HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import classes from './MyFormInput.module.scss';
import MyError from '../FormError/MyError';

interface IInputProps {
  register: UseFormRegisterReturn;
  id: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  errors: FieldError | undefined;
  max?: string;
  accept?: string;
  className?: string;
}

const MyFormInput: FC<IInputProps> = (props) => {
  const { register, type, id, label, errors, ...rest } = props;
  const labelName = register.name.charAt(0).toUpperCase() + register.name.slice(1);
  return (
    <>
      <label className={classes.labelInput} htmlFor={id}>
        {label ? label : labelName}
        <input className={classes.inputText} id={id} type={type} {...register} {...rest} />
      </label>
      <MyError errors={errors} />
    </>
  );
};

export default MyFormInput;
