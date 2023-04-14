import React, { FC, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MainSearchForm from './MainSearchForm/MainSearchForm';
import MainCardList from './MainCardList';
import MainModal from './MainModal/MainModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import LogoutButton from '../LogoutButton/LogoutButton';
import { TUnsplashResultsArray, TValidationState } from '../../../interfaces';
import { getPhotos, getRandomPhotos } from '../../../utils/api';
import { useAppSelector } from '../../../redux/store/store';

type TMainContentProps = {
  validationState: TValidationState;
  logoutCallback: () => void;
};

export const MainPageContent: FC<TMainContentProps> = ({ validationState, logoutCallback }) => {
  const [photosData, setPhotosData] = useState<TUnsplashResultsArray>([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPhotoId, setCurrentPhotoId] = useState('');
  const { searchQuery } = useAppSelector((state) => state.searchState);

  const memoSearchPhotos = useCallback(
    async (searchValue: string) => {
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
    },
    [validationState.clientKey]
  );

  const memoGetRandomPhotos = useCallback(async () => {
    setisLoading(true);
    try {
      const randomPhotos = await getRandomPhotos(validationState.clientKey);
      if (randomPhotos) {
        setPhotosData(randomPhotos);
        setisLoading(false);
      }
    } catch (error) {
      throw error;
    }
  }, [validationState.clientKey]);

  useEffect(() => {
    if (searchQuery) memoSearchPhotos(searchQuery);
    else memoGetRandomPhotos();
  }, [memoGetRandomPhotos, memoSearchPhotos, searchQuery]);

  return (
    <div className="main-page">
      <LogoutButton logoutCallback={logoutCallback} />
      <MainSearchForm searchPhotos={memoSearchPhotos} />
      {isLoading && <LoadingSpinner />}
      {currentPhotoId &&
        createPortal(
          <MainModal
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
