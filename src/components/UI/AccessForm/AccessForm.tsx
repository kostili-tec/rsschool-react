import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { checkAccessKey } from '../../../utils/api';
import {} from '../../../interfaces';
import classes from './AccessForm.module.scss';
import { TValidationState } from '../../../interfaces';

interface IUseFormAcces {
  inputKey: string;
}

interface IUseFormProps {
  setValidation: (args: TValidationState) => void;
}

const AccessForm: FC<IUseFormProps> = ({ setValidation }) => {
  const { register, handleSubmit } = useForm<IUseFormAcces>();

  const saveAuthorization = (authoriObj: TValidationState) => {
    localStorage.setItem('kostili-client_key', authoriObj.clientKey);
    localStorage.setItem('kostili-isValid', authoriObj.isValid.toString());
  };

  useEffect(() => {
    const storageClientKey = localStorage.getItem('kostili-client_key');
    const storageIsValid = localStorage.getItem('kostili-isValid');
    const isTrue = storageIsValid === 'true';
    if (storageClientKey && isTrue) {
      setValidation({ clientKey: storageClientKey, isValid: isTrue });
      /* const checkValidation = async () => {
        const validation = await checkAccessKey(storageClientKey);
        if (validation) {
          setValidation({ clientKey: storageClientKey, isValid: validation });
        }
      };
      checkValidation(); */
    }
  });

  const onSubmit = async (data: IUseFormAcces) => {
    const status = await checkAccessKey(data.inputKey);
    console.log(status);
    setValidation({ clientKey: data.inputKey, isValid: status });
    saveAuthorization({ clientKey: data.inputKey, isValid: status });
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
