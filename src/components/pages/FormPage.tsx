import React, { Component } from 'react';
import CreateCardForm from '../CreateCardForm';
import FormCard from '../FormCard';
import { ICreatorFormState } from '../../interfaces';
interface IFormPageState {
  cardsData: Array<ICreatorFormState> | [];
}

export default class FormPage extends Component<Partial<IFormPageState>> {
  state: IFormPageState = {
    cardsData: [],
  };

  createCard = (newCardData: Partial<ICreatorFormState>) => {
    const { cardsData } = this.state;
    this.setState({ cardsData: [...cardsData, newCardData] });
  };

  render() {
    const { cardsData } = this.state;
    return (
      <>
        <CreateCardForm create={this.createCard} />
        <div className="form-page__container">
          {cardsData.length ? (
            cardsData.map((el, ind) => <FormCard key={`my-card-${ind + 1}`} {...el} />)
          ) : (
            <div>No Cards</div>
          )}
        </div>
      </>
    );
  }
}
