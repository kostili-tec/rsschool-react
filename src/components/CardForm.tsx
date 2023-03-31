import React, { FC } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import MyFormInput from './UI/FormComponents/FormInput/MyFormInput';
import MyFormSelect from './UI/FormComponents/FormSelect/MyFormSelect';
import MyError from './UI/FormComponents/FormError/MyError';
import {
  getCurrentDate,
  textRegExp,
  dateRegExp,
  descriptionRegExp,
  numbersRegExp,
} from '../utils/utils';
import { ICreateFormProps, IFormInputsData, IFormCardData } from '../interfaces';
import classes from '../styles/form.module.scss';

const CardForm: FC<ICreateFormProps> = ({ create }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInputsData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldUseNativeValidation: false,
  });

  const onSubmit = (data: IFormInputsData) => {
    const cardData: IFormCardData = { fileUrl: URL.createObjectURL(data.file[0]), ...data };
    create(cardData);
    reset();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formInputsContaner}>
        <div className={classes.inputsContaner}>
          <MyFormInput
            register={register('title', {
              required: 'You must specify the name',
              pattern: {
                value: textRegExp,
                message: 'Only letters and numbers.\nmin of 3 characters',
              },
            })}
            id={'title-input'}
            type="text"
            errors={errors.title}
          />

          <MyFormSelect
            register={register('select', {
              required: 'You must select a category',
            })}
            errors={errors.select}
            id={'form-select'}
          />

          <MyFormInput
            register={register('price', {
              required: 'You must specify the price',
              pattern: {
                value: numbersRegExp,
                message: 'Only numbers',
              },
            })}
            errors={errors.price}
            type={'number'}
            id={'price-input'}
          />

          <MyFormInput
            register={register('date', {
              required: 'You must specify the production date',
              pattern: {
                value: dateRegExp,
                message: 'In the forman YYYY-MM-DD',
              },
            })}
            errors={errors.date}
            type={'date'}
            id={'date-input'}
            max={getCurrentDate()}
          />
        </div>

        <div className={classes.inputsContaner}>
          <p className={classes.paragraphInput}>Select a gift</p>
          <div className={classes.checkContainer}>
            <label htmlFor="checkInput1">
              Sticker
              <input
                type="checkbox"
                id="checkInput1"
                value="Sticker"
                className={classes.checkBox}
                {...register('checkboxes', {
                  required: 'You have to choose a gift',
                })}
              />
            </label>

            <label htmlFor="checkInput1">
              Trinket
              <input
                type="checkbox"
                id="checkInput2"
                value="Trinket"
                className={classes.checkBox}
                {...register('checkboxes', {
                  required: 'You have to choose a gift',
                })}
              />
            </label>
          </div>
          <MyError errors={errors.checkboxes as FieldError} />

          <hr />

          <p className={classes.paragraphInput}>Select condition</p>
          <div className={classes.checkContainer}>
            <label htmlFor="radio1">
              Used
              <input
                type="radio"
                id="radio1"
                value="Used"
                className={classes.checkBox}
                {...register('radio', {
                  required: 'You have to choose a condition',
                })}
              />
            </label>

            <label htmlFor="radio2">
              Unused
              <input
                type="radio"
                id="radio2"
                value="Unused"
                className={classes.checkBox}
                {...register('radio', {
                  required: 'You have to choose a condition',
                })}
              />
            </label>
          </div>

          <MyError errors={errors.radio} />
          <hr />
          <MyFormInput
            register={register('file', {
              required: 'You have to choose an image',
            })}
            errors={errors.file}
            type={'file'}
            id={'file-input'}
            accept="image/jpeg,image/png,image/gif"
            className={classes.inputFile}
          />

          <label htmlFor="form-textarea">
            Description:
            <textarea
              id="form-textarea"
              {...register('description', {
                required: 'You must fill in the description',
                pattern: {
                  value: descriptionRegExp,
                  message:
                    'Minimum of 10 characters including letters, numbers and symbols ?, !, -',
                },
              })}
            ></textarea>
          </label>
          <MyError errors={errors.description} />

          <input type="submit" value="Submit" />
        </div>
      </div>
    </form>
  );
};

export default CardForm;
