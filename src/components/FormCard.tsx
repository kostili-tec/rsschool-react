import React, { FC } from 'react';
import { ICreatorFormRefs } from '../interfaces';

const FormCard: FC<ICreatorFormRefs> = (props) => {
  return (
    <div className="form-card">
      <img
        src={props.inputFileUrl}
        alt={`${props.inputTitle}-image`}
        className="form-card__image"
      />
      <div className="card-description__container">
        <h1>{props.inputTitle}</h1>
        <p>{props.textAreaDescription}</p>
        <p>{`Category: ${props.selectValue}`}</p>
        <p>{`Extra present: ${props.checkboxValues?.join(', ')}`}</p>
        <p>{`Сondition: ${props.radioButtonValue}`}</p>
        <p>{`Production date: ${props.inputDate}`}</p>
        <p>{`$ ${props.inputPrice}`}</p>
      </div>
    </div>
  );
};

export default FormCard;
