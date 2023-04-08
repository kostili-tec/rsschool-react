import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MainSearchForm from '../UI/MainSearchForm/MainSearchForm';
import MainCardList from '../MainCardList';
import MyMainModal from '../UI/MainModal/MyMainModal';
import AccessForm from '../UI/AccessForm/AccessForm';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import { getJson, getPhotos } from '../../utils/api';
import { TUnsplashResultsArray, TValidationState } from '../../interfaces';

const MainPage: FC = () => {
  const [photosData, setPhotosData] = useState<TUnsplashResultsArray>([]);
  const [currentPhotoId, setCurrentPhotoId] = useState('');
  const [validationState, setValidationState] = useState<TValidationState>({
    clientKey: '',
    isValid: false,
  });
  const [isLoading, setisLoading] = useState(false);

  const searchPhotos = async (searchValue: string) => {
    setisLoading(true);
    setPhotosData([]);
    try {
      const data = await getPhotos(validationState.clientKey, searchValue);
      if (data) {
        setPhotosData(data.results);
        setisLoading(false);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setisLoading(true);
    const fetchData = async () => {
      try {
        const json = await getJson();
        console.log(json);
        if (json) {
          setPhotosData(json.results);
          setisLoading(false);
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
      {isLoading && <LoadingSpinner />}
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
    </div>
  );
};

export default MainPage;
