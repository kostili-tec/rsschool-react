import React, { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import MyError from '../FormError/MyError';
import classes from './MyFormSelect.module.scss';
import inputClasses from '../FormInput/MyFormInput.module.scss';

interface ISelectProps {
  register: UseFormRegisterReturn;
  id: string;
  errors: FieldError | undefined;
}

const MyFormSelect: FC<ISelectProps> = (props) => {
  const { register, id, errors } = props;
  return (
    <>
      <label className={inputClasses.labelInput} htmlFor={id}>
        Category
        <select role="select" className={classes.select} id={id} defaultValue={''} {...register}>
          <option disabled value="">
            Chose category
          </option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="another">Another</option>
        </select>
      </label>
      <MyError errors={errors} />
    </>
  );
};

export default MyFormSelect;
