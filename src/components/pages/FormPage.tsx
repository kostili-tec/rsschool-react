import React, { FC, useState } from 'react';
import FormCard from '../FormCard';
import CardForm from '../CardForm';
import { IFormCardData } from '../../interfaces';

const FormPage: FC = () => {
  const [cards, setCards] = useState<Array<IFormCardData> | []>([]);
  const [message, setMessage] = useState(false);

  const createCard = (newCard: IFormCardData) => {
    setCards([...cards, newCard]);
    setMessage(true);
    setTimeout(() => setMessage(false), 2000);
  };
  return (
    <>
      <CardForm create={createCard} />
      {message && <p>Card added</p>}
      {cards.length ? (
        <div className="form-page__container">
          {cards.map((el, ind) => (
            <FormCard key={ind + 1} {...el} />
          ))}
        </div>
      ) : (
        <div>No Cards</div>
      )}
    </>
  );
};

export default FormPage;
