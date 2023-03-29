import React, { FC } from 'react';

interface ISelectProps {
  refValue: React.RefObject<HTMLSelectElement>;
  isValid: boolean;
}
const FormSelect: FC<ISelectProps> = (props) => {
  const { refValue, isValid } = props;
  return (
    <div className="form-input__container">
      <select role={'select'} ref={refValue} defaultValue={''}>
        <option disabled value="">
          Chose category
        </option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
        <option value="skincare">Skincare</option>
        <option value="another">Another</option>
      </select>
      {!isValid && <span className="error-span">Error</span>}
    </div>
  );
};

export default FormSelect;
