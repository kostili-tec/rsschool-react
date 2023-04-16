import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import MainSearchForm from './MainSearchForm/MainSearchForm';
import MainCardList from './MainCardList';
import MainModal from './MainModal/MainModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import LogoutButton from '../LogoutButton/LogoutButton';
import { TUnsplashResultsArray, TValidationState } from '../../../interfaces';
import { useAppSelector } from '../../../redux/store/store';
import { useGetRandomPhotosQuery, useSearchPhotosQuery } from '../../../redux/store/api/api';

export const MainPageContent: FC = () => {
  const [photosData, setPhotosData] = useState<TUnsplashResultsArray>([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPhotoId, setCurrentPhotoId] = useState('');
  const { searchQuery } = useAppSelector((state) => state.searchState);
  const [searchPhotosParams, setSearchPhotosParams] = useState({ query: '', page: 1, perPage: 10 });
  const randomPhotosRequest = useGetRandomPhotosQuery(30);
  const searchPhotosRequest = useSearchPhotosQuery(
    {
      query: searchPhotosParams.query,
      page: searchPhotosParams.page,
      per_page: searchPhotosParams.perPage,
    },
    {
      skip: true,
    }
  );

  return (
    <div className="main-page">
      <LogoutButton />
      <MainSearchForm />
      {(randomPhotosRequest.isLoading || searchPhotosRequest.isLoading) && <LoadingSpinner />}
      {searchPhotosRequest.data ? (
        <MainCardList
          cardsArray={searchPhotosRequest.data.results}
          setCurrentId={setCurrentPhotoId}
        />
      ) : randomPhotosRequest.data ? (
        <MainCardList cardsArray={randomPhotosRequest.data} setCurrentId={setCurrentPhotoId} />
      ) : (
        <div>No Cards</div>
      )}
      {currentPhotoId &&
        createPortal(<MainModal id={currentPhotoId} setId={setCurrentPhotoId} />, document.body)}
    </div>
  );
};

export default MainPageContent;
