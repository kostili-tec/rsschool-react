import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MainSearchForm from './MainSearchForm/MainSearchForm';
import MainCardList from '../MainCardList';
import MyMainModal from './MainModal/MyMainModal';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import { TUnsplashResultsArray, TValidationState } from '../../interfaces';
import { getPhotos, getRandomPhotos } from '../../utils/api';

type TMainContentProps = {
  validationState: TValidationState;
};

export const MainPageContent: FC<TMainContentProps> = ({ validationState }) => {
  const [photosData, setPhotosData] = useState<TUnsplashResultsArray>([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPhotoId, setCurrentPhotoId] = useState('');

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
        const randomPhotos = await getRandomPhotos(validationState.clientKey);
        if (randomPhotos) {
          console.log(randomPhotos);
          setPhotosData(randomPhotos);
          setisLoading(false);
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    fetchData();
  }, [validationState.clientKey]);

  return (
    <div className="main-page">
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
      {!!photosData.length && (
        <MainCardList cardsArray={photosData} setCurrentId={setCurrentPhotoId} />
      )}
    </div>
  );
};

export default MainPageContent;
