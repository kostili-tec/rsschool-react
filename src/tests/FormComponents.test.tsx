import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { fn } from '@vitest/spy';
import FormCardView from '../components/UI/FormComponents/FormCardView';
import MyFormInput from '../components/UI/FormComponents/FormInput/MyFormInput';
import MyFormSelect from '../components/UI/FormComponents/FormSelect/MyFormSelect';
import FormFileds from '../components/UI/FormComponents/FormFields';
import { useForm } from 'react-hook-form';
import { IFormCardData, IFormInputsData } from '../interfaces';

const FormInputWithForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputsData>();
  return (
    <MyFormInput
      type={'text'}
      errors={errors.title}
      id="title-input"
      className="violent and funky"
      hookFormRegister={register('title', {
        required: true,
      })}
    />
  );
};

const FormSelectWithForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputsData>();
  return (
    <MyFormSelect
      hookFormRegister={register('select', {
        required: 'You must select a category',
      })}
      errors={errors.select}
      id={'form-select'}
    />
  );
};

describe('Form Card tests', () => {
  it('render card', () => {
    const Data: Array<IFormCardData> = [
      {
        title: 'title',
        description: 'Description',
        date: '2022-12-12',
        price: '300',
        select: 'laptops',
        checkboxes: ['sticker', 'big floppa'],
        radio: 'used',
        fileUrl: 'image',
      },
    ];
    render(
      <>
        {Data.map((el, id) => (
          <FormCardView key={id} {...el} />
        ))}
      </>
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-12-12/i)).toBeInTheDocument();
    expect(screen.getByText(/300/i)).toBeInTheDocument();
    expect(screen.getByText(/category: laptops/i)).toBeInTheDocument();
    expect(screen.getByText(/extra present: sticker, big floppa/i)).toBeInTheDocument();
    expect(screen.getByText(/Сondition: used/i)).toBeInTheDocument();
    expect(screen.getByAltText(/title-image/i)).toBeInTheDocument();
  });
});

describe('Form input tests', () => {
  it('render MyFormInput', () => {
    render(<FormInputWithForm />);
    const textInput = screen.getByLabelText(/title/i);
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveValue('');
    expect(textInput).toHaveAttribute('type', 'text');
    expect(textInput).toHaveClass('violent');
    expect(textInput).toHaveClass('and');
    expect(textInput).toHaveClass('funky');
  });
});

describe('Form select tests', () => {
  it('render MyFormSelect', () => {
    render(<FormSelectWithForm />);
    expect(screen.getByText(/chose category/i)).toBeInTheDocument();
    expect(screen.getByText(/chose category/i)).toBeDisabled();
    expect(screen.getByText(/smartphones/i)).toBeInTheDocument();
  });
});

describe('Create Card form tests', () => {
  const create = fn();
  it('should be return 7 errors after click on submit', async () => {
    render(<FormFileds create={create} />);
    const button = screen.getByText(/submit/i);
    expect(screen.queryByText(/you must/i)).toBeNull();
    fireEvent.submit(button);

    expect(await screen.findByText(/you must specify the name/i)).toBeInTheDocument();
    expect(await screen.findByText(/you must select a category/i)).toBeInTheDocument();
    expect(await screen.findByText(/you must specify the price/i)).toBeInTheDocument();
    expect(await screen.findByText(/you must specify the production date/i)).toBeInTheDocument();
    expect(await screen.findByText(/you have to choose a gift/i)).toBeInTheDocument();
    expect(await screen.findByText(/you have to choose a condition/i)).toBeInTheDocument();
    expect(await screen.findByText(/you have to choose an image/i)).toBeInTheDocument();
    expect(await screen.findByText(/you must fill in the description/i)).toBeInTheDocument();
  });
  it('inputs should be works with correct data', () => {
    render(<FormFileds create={create} />);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionText = screen.getByLabelText(/description/i);
    const select = screen.getByRole('select');
    const option = screen.getByText(/smartphones/i);
    const priceInput = screen.getByLabelText(/price/i);
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(titleInput, { target: { value: 'White zombie' } });
    fireEvent.change(descriptionText, {
      target: {
        value:
          'Nineteen-sixty-five, yeah, wow Five, yeah, wow Demon warp is coming alive In nineteen-sixty-five-five-five',
      },
    });
    fireEvent.change(select, { target: { value: 'smartphones' } });
    fireEvent.change(dateInput, { target: { value: '2022-12-12' } });
    fireEvent.change(priceInput, { target: { value: '300' } });
    expect(titleInput).toHaveValue('White zombie');
    expect(descriptionText).toHaveValue(
      'Nineteen-sixty-five, yeah, wow Five, yeah, wow Demon warp is coming alive In nineteen-sixty-five-five-five'
    );
    expect(option).toBeTruthy();
    expect(dateInput).toHaveValue('2022-12-12');
    expect(priceInput).toHaveValue(300);
  });
});
