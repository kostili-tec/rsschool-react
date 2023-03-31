import React, { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import MyError from './MyError';

interface ISelectProps {
  register: UseFormRegisterReturn;
  id: string;
  errors: FieldError | undefined;
}

const MyFormSelect: FC<ISelectProps> = (props) => {
  const { register, id, errors } = props;
  return (
    <>
      <label htmlFor={id}>
        Category:
        <select id={id} defaultValue={''} {...register}>
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
