import React, { FC, useEffect, useState } from 'react';
import MainCard from './MainCard/MainCard';
import { TUnsplashResultsArray, IUnsplashResults } from '../interfaces';

type StateArray = (IUnsplashResults[] | [])[];

type MainCardListProps = {
  cardsArray: TUnsplashResultsArray;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
};

export const MainCardList: FC<MainCardListProps> = ({ cardsArray, setCurrentId }) => {
  const [chunksArr, setChunksArr] = useState<StateArray>([]);

  const splitArrayIntoThree = <T,>(array: Array<T>): T[][] => {
    const n = Math.ceil(array.length / 3);
    const result = [array.slice(0, n), array.slice(n, 2 * n), array.slice(2 * n)];
    console.log(result);
    return result;
  };

  useEffect(() => {
    setChunksArr(splitArrayIntoThree(cardsArray));
  }, [cardsArray]);

  return (
    <>
      {!!cardsArray.length && (
        <div className="main-cards__container">
          {!!chunksArr.length &&
            chunksArr.map((array, ind) => (
              <div key={ind} className="cards-column">
                {array.map((el) => (
                  <MainCard key={el.id} photoData={el} setCurrentId={setCurrentId} />
                ))}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default MainCardList;
