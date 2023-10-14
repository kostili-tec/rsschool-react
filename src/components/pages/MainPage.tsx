import React, { FC } from 'react';
import MainPageContent from '../UI/MainComponents/MainPageContent';
import AccessForm from '../UI/AccessForm/AccessForm';
import { useAppSelector } from '../../redux/store/store';

const MainPage: FC = () => {
  const { isValid } = useAppSelector((state) => state.authState);

  return <>{!isValid ? <AccessForm /> : <MainPageContent />}</>;
};

export default MainPage;
