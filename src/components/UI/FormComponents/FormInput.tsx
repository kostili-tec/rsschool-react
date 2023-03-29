import React, { FC } from 'react';
import { IFormInputProps } from '../../../interfaces';

const FormInput: FC<IFormInputProps> = (props) => {
  const { type, id, placeholder, refValue, isValid, max, accept } = props;
  return (
    <div className="form-input__container">
      <input
        type={type}
        placeholder={placeholder}
        ref={refValue}
        id={id}
        max={max}
        accept={accept}
        role={`${type}box`}
      />
      {!isValid && <span className="error-span">Error</span>}
    </div>
  );
};

export default FormInput;
