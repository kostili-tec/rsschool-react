import React, { FC } from 'react';
import SearchInput from './UI/SearchInput/SearchInput';
import searchSVG from '../assets/search.svg';

const SearchForm: FC = () => {
  return (
    <form className="search-form">
      <SearchInput />
      <button className="search-button" onClick={(e) => e.preventDefault()}>
        <img src={searchSVG} className="search-svg" />
      </button>
    </form>
  );
};
export default SearchForm;
