import React, { FC, useEffect, useRef, useState } from 'react';
import classes from './input.module.scss';

const SearchInput: FC = () => {
  const [inputState, setInputState] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeInput = () => {
    if (inputRef.current) setInputState(inputRef.current.value);
  };

  useEffect(() => {
    const inputQuery = localStorage.getItem('inputQuery');
    if (inputQuery) {
      setInputState(inputQuery);
    }
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    return () => {
      if (input) {
        localStorage.setItem('inputQuery', input.value);
        console.log(input.value);
      }
    };
  }, []);

  return (
    <input
      onChange={handleChangeInput}
      ref={inputRef}
      value={inputState}
      className={classes.input}
      placeholder="Search here"
    />
  );
};

export default SearchInput;
