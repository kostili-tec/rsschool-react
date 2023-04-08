import React, { FC, useState } from 'react';
import MainPageContent from '../UI/MainPageContent';
import AccessForm from '../UI/AccessForm/AccessForm';
import { TValidationState } from '../../interfaces';

const MainPage: FC = () => {
  const [validationState, setValidationState] = useState<TValidationState>({
    clientKey: '',
    isValid: false,
  });

  const handleLogout = () => {
    localStorage.clear();
    setValidationState({ clientKey: '', isValid: false });
  };

  return (
    <>
      {!validationState.isValid ? (
        <AccessForm setValidation={setValidationState} />
      ) : (
        <MainPageContent logoutCallback={handleLogout} validationState={validationState} />
      )}
    </>
  );
};

export default MainPage;
