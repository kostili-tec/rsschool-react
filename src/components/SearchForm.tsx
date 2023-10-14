import React, { Component } from 'react';
import SearchInput from './UI/SearchInput/SearchInput';
import searchSVG from '../assets/search.svg';

export default class SearchForm extends Component {
  render() {
    return (
      <form className="search-form">
        <SearchInput />
        <button className="search-button" onClick={(e) => e.preventDefault()}>
          <img src={searchSVG} className="search-svg" />
        </button>
      </form>
    );
  }
}
