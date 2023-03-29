import React, { FC, useState } from 'react';
import CreateCardForm from '../CreateCardForm';
import FormCard from '../FormCard';
import { ICreatorFormRefs } from '../../interfaces';

const FormPage: FC = () => {
  const [cards, setCards] = useState<Array<ICreatorFormRefs> | []>([]);
  const [message, setMessage] = useState(false);

  const createCard = (newCard: ICreatorFormRefs) => {
    setCards([...cards, newCard]);
    setMessage(true);
    setTimeout(() => setMessage(false), 2000);
  };
  return (
    <>
      <CreateCardForm create={createCard} />
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
