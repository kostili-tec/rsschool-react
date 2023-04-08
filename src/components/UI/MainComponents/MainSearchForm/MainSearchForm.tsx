import React, { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './MainSearchForm.module.scss';

interface IUseSearchFormProps {
  inputValue: string;
}

export interface ISearchFormProps {
  searchPhotos: (value: string) => void;
}

export const MainSearchForm: FC<ISearchFormProps> = ({ searchPhotos }) => {
  const { register, handleSubmit, setValue } = useForm<IUseSearchFormProps>({
    mode: 'onSubmit',
  });
  const [inputState, setInputState] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputLocalValue = localStorage.getItem('inputQuery');
    if (inputLocalValue) {
      setInputState(inputLocalValue);
      setValue('inputValue', inputLocalValue);
    }
  }, [setValue]);

  useEffect(() => {
    const input = inputRef.current;
    return () => {
      if (input) {
        localStorage.setItem('inputQuery', input.value);
      }
    };
  }, []);

  const handleChangeInput = () => {
    if (inputRef.current) {
      setInputState(inputRef.current.value);
      setValue('inputValue', inputRef.current.value);
    }
  };

  const onSubmit = (data: IUseSearchFormProps) => {
    if (data.inputValue) searchPhotos(data.inputValue);
  };

  return (
    <form className={classes.searchForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('inputValue')}
        onChange={handleChangeInput}
        ref={inputRef}
        value={inputState}
        className={classes.input}
      />
      <input type="submit" value="" className={classes.inputSubmit} />
    </form>
  );
};

export default MainSearchForm;
