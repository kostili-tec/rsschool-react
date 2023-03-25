import React, { Component } from 'react';

interface IFormInputProps {
  type: string;
  refValue: React.RefObject<HTMLInputElement>;
  isValid: boolean;
  placeholder?: string;
  id?: string;
  max?: string;
  accept?: string;
}

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
        />
        {!isValid && <span className="error-span">Error</span>}
      </div>
    );
  }
}
