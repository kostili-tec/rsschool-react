import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MainSearchForm from '../UI/MainSearchForm/MainSearchForm';
import MainCardList from '../MainCardList';
import MyMainModal from '../UI/MainModal/MyMainModal';
import { getJson, getPhotos } from '../../utils/api';
import { TUnsplashResultsArray, TValidationState } from '../../interfaces';
import AccessForm from '../UI/AccessForm/AccessForm';

const MainPage: FC = () => {
  const [photosData, setPhotosData] = useState<TUnsplashResultsArray>([]);
  const [currentPhotoId, setCurrentPhotoId] = useState('');
  const [validationState, setValidationState] = useState<TValidationState>({
    clientKey: '',
    isValid: false,
  });

  const searchPhotos = async (searchValue: string) => {
    const data = await getPhotos(validationState.clientKey, searchValue);
    setPhotosData(data.results);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await getJson();
        console.log(json);
        if (json) {
          setPhotosData(json.results);
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main-page">
      {!validationState.isValid && <AccessForm setValidation={setValidationState} />}
      <MainSearchForm searchPhotos={searchPhotos} />
      {currentPhotoId &&
        createPortal(
          <MyMainModal
            clientKey={validationState.clientKey}
            id={currentPhotoId}
            setId={setCurrentPhotoId}
          />,
          document.body
        )}
      {validationState.isValid && (
        <MainCardList cardsArray={photosData} setCurrentId={setCurrentPhotoId} />
      )}
      {/*  {{photosData.length ? (
        <MainCardList cardsArray={photosData} setCurrentId={setCurrentPhotoId} />
      ) : (
        <img src={reactSVG} alt="react-logo" className="logo" />
      )}} */}
    </div>
  );
};

export default MainPage;
