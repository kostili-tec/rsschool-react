import React, { FC } from 'react';
import { IFormCardData } from '../interfaces';

const FormCard: FC<IFormCardData> = (props) => {
  return (
    <div className="form-card">
      <img src={props.fileUrl} alt={`${props.title}-image`} className="form-card__image" />
      <div className="card-description__container">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>{`Category: ${props.select}`}</p>
        <p>{`Extra present: ${props.checkboxes?.join(', ')}`}</p>
        <p>{`Сondition: ${props.radio}`}</p>
        <p>{`Production date: ${props.date}`}</p>
        <p>{`$ ${props.price}`}</p>
      </div>
    </div>
  );
};

export default FormCard;
