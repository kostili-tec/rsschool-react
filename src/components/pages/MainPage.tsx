import React, { FC, useEffect, useState } from 'react';
import SearchForm from '../SearchForm';
import MainCardList from '../MainCardList';
import { getJson } from '../../utils/api';
import { TUnsplashResultsArray } from '../../interfaces';
import reactSVG from '../../assets/react.svg';

const MainPage: FC = () => {
  const [photosData, setPhotosData] = useState<TUnsplashResultsArray>([]);

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
      {photosData.length ? (
        <MainCardList cardsArray={photosData} />
      ) : (
        <img src={reactSVG} alt="react-logo" className="logo" />
      )}
    </div>
  );
};

export default MainPage;
