import React, { FC, useState } from 'react';
import FormCardView from '../UI/FormComponents/FormCardView';
import FormFileds from '../UI/FormComponents/FormFields';
import { IFormCardData } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { setCard } from '../../redux/store/favorites/form.slice';

const FormPage: FC = () => {
  const { formCards } = useAppSelector((state) => state.formState);
  const dispatch = useAppDispatch();
  const [hasMessageCreated, setHasMessageCreated] = useState(false);
  const removeMessageDelay = 2000;

  const createCard = (newCard: IFormCardData) => {
    dispatch(setCard(newCard));
    setHasMessageCreated(true);
    setTimeout(() => setHasMessageCreated(false), removeMessageDelay);
  };
  return (
    <>
      <FormFileds create={createCard} />
      {hasMessageCreated && <p>Card added</p>}
      {formCards.length ? (
        <div className="form-page__container">
          {formCards.map((el) => (
            <FormCardView key={el.id} {...el} />
          ))}
        </div>
      ) : (
        <div>No Cards</div>
      )}
    </>
  );
};

export default FormPage;
