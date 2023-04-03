import React, { FC } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import MyFormInput from './FormInput/MyFormInput';
import MyFormSelect from './FormSelect/MyFormSelect';
import MyError from './FormError/MyError';
import {
  getCurrentDate,
  textRegExp,
  dateRegExp,
  descriptionRegExp,
  numbersRegExp,
} from '../../../utils/utils';
import { ICreateFormProps, IFormInputsData, IFormCardData } from '../../../interfaces';
import classes from './form.module.scss';

const FormFields: FC<ICreateFormProps> = ({ create }) => {
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
            hookFormRegister={register('title', {
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
            hookFormRegister={register('select', {
              required: 'You must select a category',
            })}
            errors={errors.select}
            id={'form-select'}
          />

          <MyFormInput
            hookFormRegister={register('price', {
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
            hookFormRegister={register('date', {
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
            <div>
              <label htmlFor="checkSticker">Sticker</label>
              <input
                type="checkbox"
                id="checkSticker"
                value="Sticker"
                className={classes.checkBox}
                {...register('checkboxes', {
                  required: 'You have to choose a gift',
                })}
              />
            </div>

            <div>
              <label htmlFor="checkTrinket">Trinket</label>
              <input
                type="checkbox"
                id="checkTrinket"
                value="Trinket"
                className={classes.checkBox}
                {...register('checkboxes', {
                  required: 'You have to choose a gift',
                })}
              />
            </div>
          </div>
          <MyError errors={errors.checkboxes as FieldError} />

          <hr />

          <p className={classes.paragraphInput}>Select condition</p>
          <div className={classes.checkContainer}>
            <div>
              <label htmlFor="radioUsed">Used</label>
              <input
                type="radio"
                id="radioUsed"
                value="Used"
                className={classes.checkBox}
                {...register('radio', {
                  required: 'You have to choose a condition',
                })}
              />
            </div>

            <div>
              <label htmlFor="radioUnused">Unused</label>
              <input
                type="radio"
                id="radioUnused"
                value="Unused"
                className={classes.checkBox}
                {...register('radio', {
                  required: 'You have to choose a condition',
                })}
              />
            </div>
          </div>

          <MyError errors={errors.radio} />
          <hr />
          <MyFormInput
            hookFormRegister={register('file', {
              required: 'You have to choose an image',
            })}
            errors={errors.file}
            type={'file'}
            id={'file-input'}
            accept="image/jpeg,image/png,image/gif"
            className={classes.inputFile}
          />

          <label htmlFor="form-textarea">Description:</label>
          <textarea
            id="form-textarea"
            {...register('description', {
              required: 'You must fill in the description',
              pattern: {
                value: descriptionRegExp,
                message: 'Minimum of 10 characters including letters, numbers and symbols ?, !, -',
              },
            })}
          ></textarea>
          <MyError errors={errors.description} />

          <input type="submit" value="Submit" />
        </div>
      </div>
    </form>
  );
};

export default FormFields;
