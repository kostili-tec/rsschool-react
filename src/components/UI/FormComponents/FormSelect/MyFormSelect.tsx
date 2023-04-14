import React, { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import MyError from '../FormError/MyError';
import classes from './MyFormSelect.module.scss';
import inputClasses from '../FormInput/MyFormInput.module.scss';

interface ISelectProps {
  hookFormRegister: UseFormRegisterReturn;
  id: string;
  errors?: FieldError;
}

const MyFormSelect: FC<ISelectProps> = ({ hookFormRegister, id, errors }) => {
  return (
    <>
      <label className={inputClasses.labelInput} htmlFor={id}>
        Category
      </label>
      <select
        {...hookFormRegister}
        className={classes.select}
        id={id}
        defaultValue={''}
        role="select"
      >
        <option disabled value="">
          Chose category
        </option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
        <option value="skincare">Skincare</option>
        <option value="another">Another</option>
      </select>
      <MyError errors={errors} />
    </>
  );
};

export default MyFormSelect;
