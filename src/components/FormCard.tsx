import React, { Component } from 'react';
import { ICreatorFormState } from '../interfaces';

export default class FormCard extends Component<ICreatorFormState> {
  constructor(props: ICreatorFormState) {
    super(props);
  }
  render() {
    return (
      <div className="form-card">
        <h1>{this.props.inputTitle}</h1>
        <p>{this.props.textAreaDescription}</p>
        <p>{this.props.inputDate}</p>
        <p>{this.props.selectValue}</p>
        <p>{`checkbox1: ${this.props.checkboxValue1}`}</p>
        <p>{`checkbox2: ${this.props.checkboxValue2}`}</p>
        <p>{`radio1: ${this.props.radioButton1}`}</p>
        <p>{`radio2: ${this.props.radioButton2}`}</p>
        <img src={this.props.inputFileUrl} alt="uzver-image" className="form-card__image" />
      </div>
    );
  }
}
