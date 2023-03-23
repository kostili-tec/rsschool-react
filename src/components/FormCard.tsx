import React, { Component } from 'react';
import { ICreatorFormRefs } from '../interfaces';

export default class FormCard extends Component<ICreatorFormRefs> {
  constructor(props: ICreatorFormRefs) {
    super(props);
  }
  render() {
    return (
      <div className="form-card">
        <img src={this.props.inputFileUrl} alt="uzver-image" className="form-card__image" />
        <div className="card-description__container">
          <h1>{this.props.inputTitle}</h1>
          <p>{this.props.textAreaDescription}</p>
          <p>{`Category: ${this.props.selectValue}`}</p>
          <p>{`Extra present: ${this.props.checkboxValues?.join(', ')}`}</p>
          <p>{`Сondition: ${this.props.radioButtonValue}`}</p>
          <p>{`Production date: ${this.props.inputDate}`}</p>
          <p>{`$ ${this.props.inputPrice}`}</p>
        </div>
      </div>
    );
  }
}
