import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateFormProps, IFormInputsData, IFormCardData } from '../interfaces';
import classes from '../styles/form.module.scss';

const CardForm: FC<ICreateFormProps> = ({ create }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputsData>();

  const onSubmit = (data: IFormInputsData) => {
    const cardData: IFormCardData = { fileUrl: URL.createObjectURL(data.file[0]), ...data };
    console.log(data);
    console.log(cardData);

    create(cardData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title:
        <input
          {...register('title', {
            required: 'Поле обязательно',
          })}
        />
      </label>
      <div>{errors?.title && <p>{errors?.title.message || 'Error'}</p>}</div>
      <label htmlFor="">
        Description:
        <textarea
          {...register('description', {
            required: 'Минимум 10 символов',
          })}
        ></textarea>
      </label>
      <div>{errors?.description && <p>{errors?.description.message || 'Error'}</p>}</div>
      <label>
        Category:
        <select
          role={'select'}
          defaultValue={''}
          {...register('select', {
            required: 'select',
          })}
        >
          <option disabled value="">
            Chose category
          </option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="another">Another</option>
        </select>
      </label>
      <div>{errors?.select && <p>{errors?.select.message || 'Error'}</p>}</div>
      <label htmlFor="">
        Price:
        <input
          type="number"
          {...register('price', {
            required: 'Price',
          })}
        />
      </label>
      <div>{errors?.price && <p>{errors?.price.message || 'Error'}</p>}</div>
      <label htmlFor="">
        Date:
        <input
          type="date"
          {...register('date', {
            required: 'Date',
          })}
        />
      </label>
      <div>{errors?.price && <p>{errors?.price.message || 'Error'}</p>}</div>

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

      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        {...register('file', {
          required: true,
        })}
      />
      <div>{errors?.file && <p>{errors?.file.message || 'Error'}</p>}</div>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default CardForm;
