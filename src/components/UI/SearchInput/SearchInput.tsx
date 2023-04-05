import React, { FC, useEffect, useRef, useState } from 'react';
import classes from './input.module.scss';

const SearchInput: FC = () => {
  const [searchField, setSearchField] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeInput = () => {
    if (inputRef.current) setSearchField(inputRef.current.value);
  };

  useEffect(() => {
    const inputQuery = localStorage.getItem('inputQuery');
    if (inputQuery) {
      setSearchField(inputQuery);
    }
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    return () => {
      if (input) {
        localStorage.setItem('inputQuery', input.value);
      }
    };
  }, []);

  return (
    <input
      onChange={handleChangeInput}
      ref={inputRef}
      value={searchField}
      className={classes.input}
      placeholder="Search here"
    />
  );
};

export default SearchInput;
