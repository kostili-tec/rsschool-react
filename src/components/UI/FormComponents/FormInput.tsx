import React, { Component } from 'react';
import { IFormInputProps } from '../../../interfaces';

export default class FormInput extends Component<IFormInputProps> {
  render() {
    const { type, id, placeholder, refValue, isValid, max, accept } = this.props;
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
  }
}
