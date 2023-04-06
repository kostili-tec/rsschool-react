import React, { FC, useEffect, useState } from 'react';
import SearchForm from '../SearchForm';
import MainCardList from '../MainCardList';
import MyMainModal from '../UI/MainModal/MyMainModal';
import { getJson } from '../../utils/api';
import { TUnsplashResultsArray } from '../../interfaces';
import reactSVG from '../../assets/react.svg';

const MainPage: FC = () => {
  const [photosData, setPhotosData] = useState<TUnsplashResultsArray>([]);
  const [currentPhotoId, setCurrentPhotoId] = useState('');

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
      <SearchForm />
      {currentPhotoId && <MyMainModal id={currentPhotoId} setId={setCurrentPhotoId} />}

      {photosData.length ? (
        <MainCardList cardsArray={photosData} setCurrentId={setCurrentPhotoId} />
      ) : (
        <img src={reactSVG} alt="react-logo" className="logo" />
      )}
    </div>
  );
};

export default MainPage;
