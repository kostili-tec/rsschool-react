import React, { Component } from 'react';
import CreateCardForm from '../CreateCardForm';

interface IFormState {
  name: string;
  date: string;
  select: string;
  checkbox: string;
  radio: string;
}

export default class FormPage extends Component<Partial<IFormState>> {
  state: Partial<IFormState> = {};
  render() {
    return <CreateCardForm />;
  }
}
