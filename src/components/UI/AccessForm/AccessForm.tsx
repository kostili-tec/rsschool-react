import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useLazyCheckAccesKeyQuery } from '../../../redux/store/api/api';
import classes from './AccessForm.module.scss';
import { useAppDispatch } from '../../../redux/store/store';
import { setToken } from '../../../redux/store/favorites/auth.slice';

interface IUseFormAcces {
  inputKey: string;
}

const AccessForm: FC = () => {
  const { register, handleSubmit } = useForm<IUseFormAcces>();
  const dispatch = useAppDispatch();
  const [checkAccess] = useLazyCheckAccesKeyQuery();

  const onSubmit = async (data: IUseFormAcces) => {
    dispatch(setToken({ token: data.inputKey, isValid: true }));
    localStorage.setItem('kostili-client_key', data.inputKey); // temporarily
    await checkAccess('');
  };

  return createPortal(
    <>
      <div className={classes.image}></div>
      <div className={classes.access}>
        <form className={classes.accessForm} onSubmit={handleSubmit(onSubmit)}>
          <h3>
            To use this app you need to get your developer key on
            <a href="https://unsplash.com"> Unsplash</a>
          </h3>
          <input
            type="text"
            placeholder="Enter your Unsplash key here..."
            {...register('inputKey')}
          />
          <input className={classes.submit} type="submit" value="Submit" />
        </form>
      </div>
    </>,
    document.body
  );
};

export default AccessForm;
