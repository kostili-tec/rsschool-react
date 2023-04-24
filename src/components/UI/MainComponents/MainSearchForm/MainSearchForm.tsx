import React, { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './MainSearchForm.module.scss';
import { useAppSelector, useAppDispatch } from '../../../../redux/store/store';
import { setSearch } from '../../../../redux/store/favorites/search.slice';

interface IUseSearchFormProps {
  inputValue: string;
}

export const MainSearchForm: FC = () => {
  const { register, handleSubmit, setValue } = useForm<IUseSearchFormProps>({
    mode: 'onSubmit',
  });
  const { searchQuery, skip } = useAppSelector((state) => state.searchState);
  const [inputState, setInputState] = useState<string>(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleChangeInput = () => {
    if (inputRef.current) {
      setInputState(inputRef.current.value);
      setValue('inputValue', inputRef.current.value);
    }
  };

  const onSubmit = (data: IUseSearchFormProps) => {
    if (data.inputValue) {
      dispatch(setSearch({ searchQuery: inputState }));
      if (skip) dispatch(setSearch({ searchQuery: inputState, skip: false }));
    }
  };

  useEffect(() => {
    setValue('inputValue', searchQuery);
  }, [searchQuery, setValue]);

  return (
    <form className={classes.searchForm} onSubmit={handleSubmit(onSubmit)} role="search-form">
      <input
        type="text"
        {...register('inputValue')}
        onChange={handleChangeInput}
        ref={inputRef}
        value={inputState}
        className={classes.input}
        role="search-input"
      />
      <input type="submit" value="" className={classes.inputSubmit} role="submit-input" />
    </form>
  );
};

export default MainSearchForm;
