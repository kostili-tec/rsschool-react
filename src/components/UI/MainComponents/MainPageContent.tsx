import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import MainSearchForm from './MainSearchForm/MainSearchForm';
import MainCardList from './MainCardList';
import MainModal from './MainModal/MainModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useAppSelector } from '../../../redux/store/store';
import { useGetRandomPhotosQuery, useSearchPhotosQuery } from '../../../redux/store/api/api';

export const MainPageContent: FC = () => {
  const [currentPhotoId, setCurrentPhotoId] = useState('');
  const { searchQuery, skip } = useAppSelector((state) => state.searchState);
  const randomPhotosRequest = useGetRandomPhotosQuery(30);
  const searchPhotosRequest = useSearchPhotosQuery(
    {
      query: searchQuery,
      page: 1,
      per_page: 30,
    },
    {
      skip,
    }
  );

  return (
    <div className="main-page">
      <MainSearchForm />
      {(randomPhotosRequest.isFetching || searchPhotosRequest.isFetching) && <LoadingSpinner />}
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
