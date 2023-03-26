import React, { Component } from 'react';
import CreateCardForm from '../CreateCardForm';
import FormCard from '../FormCard';
import { ICreatorFormRefs, IFormPageState } from '../../interfaces';

export default class FormPage extends Component<Partial<IFormPageState>> {
  state: IFormPageState = {
    cardsData: [],
    isVisibleMessage: false,
  };

  createCard = (newCardData: Partial<ICreatorFormRefs>) => {
    const { cardsData } = this.state;
    this.setState({ cardsData: [...cardsData, newCardData] });
    this.setState({ isVisibleMessage: true });
    setTimeout(() => this.setState({ isVisibleMessage: false }), 2000);
  };

  render() {
    const { cardsData, isVisibleMessage } = this.state;
    return (
      <>
        <CreateCardForm create={this.createCard} />
        {isVisibleMessage && <p>Card added</p>}
        {cardsData.length ? (
          <div className="form-page__container">
            {cardsData.map((el, ind) => (
              <FormCard key={`my-card-${ind + 1}`} {...el} />
            ))}
          </div>
        ) : (
          <div>No Cards</div>
        )}
      </>
    );
  }
}
