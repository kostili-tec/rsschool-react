import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import MyFormInput from './UI/FormComponents/MyFormInput';
import MyFormSelect from './UI/FormComponents/MyFormSelect';
import { ICreateFormProps, IFormInputsData, IFormCardData } from '../interfaces';
import classes from '../styles/form.module.scss';

const textRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s]{2,})$/;
const descriptionRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s:?!-]{9,})[,.\s:?!-]*$/;
const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
const numbersRegExp = /^\d+$/;

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
        className={'test-input'}
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
      />

      <input
        type="checkbox"
        id="checkInput1"
        value="Sticker"
        {...register('checkboxes', {
          required: true,
        })}
      />
      <label htmlFor="checkInput1">Sticker</label>
      <input
        type="checkbox"
        id="checkInput2"
        value="Trinket"
        {...register('checkboxes', {
          required: true,
        })}
      />
      <label htmlFor="checkInput1">Trinket</label>
      <div>{errors?.checkboxes && <p>{errors?.checkboxes.message || 'Error'}</p>}</div>

      <input
        type="radio"
        id="radio1"
        value="Used"
        {...register('radio', {
          required: true,
        })}
      />
      <label htmlFor="radio1">Used</label>
      <input
        type="radio"
        id="radio2"
        value="Unused"
        {...register('radio', {
          required: true,
        })}
      />
      <label htmlFor="radio2">Unused</label>
      <div>{errors?.radio && <p>{errors?.radio.message || 'Error'}</p>}</div>

      <MyFormInput
        register={register('file', {
          required: 'You have to choose an image',
        })}
        errors={errors.file}
        type={'file'}
        id={'file-input'}
        accept="image/jpeg,image/png,image/gif"
      />

      <label htmlFor="form-textarea">
        Description:
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
      </label>
      <div>{errors?.description && <p>{errors?.description.message || 'Error'}</p>}</div>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default CardForm;
