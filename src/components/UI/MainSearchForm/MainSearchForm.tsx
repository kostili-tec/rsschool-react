import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import SearchInput from '../SearchInput/SearchInput';

interface IUseSearchFormProps {
  inputValie: string;
}

export interface ISearchFormProps {
  searchPhotos: (value: string) => void;
}

export const MainSearchForm: FC<ISearchFormProps> = ({ searchPhotos }) => {
  const { register, handleSubmit } = useForm<IUseSearchFormProps>({ mode: 'onSubmit' });

  const onSubmit = (data: IUseSearchFormProps) => {
    console.log(data);
    searchPhotos(data.inputValie);
  };
  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <SearchInput hookFormRegister={register('inputValie')} />
      {/* <button className="search-button" onClick={(e) => e.preventDefault()}>
        <img src={searchSVG} className="search-svg" />
      </button> */}
      <input type="submit" />
    </form>
  );
};

export default MainSearchForm;
