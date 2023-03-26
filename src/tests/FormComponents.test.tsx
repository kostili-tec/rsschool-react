import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { fn } from '@vitest/spy';
import FormCard from '../components/FormCard';
import FormInput from '../components/UI/FormComponents/FormInput';
import FormSelect from '../components/UI/FormComponents/FormSelect';
import CreateCardForm from '../components/CreateCardForm';
import image from './defaultImage.jpg';

import { IFormPageState } from '../interfaces';

describe('Form Card tests', () => {
  it('render card', () => {
    const Data: IFormPageState = {
      cardsData: [
        {
          inputTitle: 'title',
          textAreaDescription: 'Description',
          inputDate: '2022-12-12',
          inputPrice: '300',
          selectValue: 'laptops',
          checkboxValues: ['sticker', 'big floppa'],
          radioButtonValue: 'used',
          inputFile: null,
          inputFileUrl: image,
        },
      ],
    };
    render(
      <>
        {Data.cardsData.map((el, id) => (
          <FormCard key={id} {...el} />
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
  const refTest = React.createRef<HTMLInputElement>();
  it('render valid form text input', () => {
    render(
      <>
        <FormInput type="text" isValid={true} refValue={refTest} placeholder="big floppa" />
      </>
    );
    const textInput = screen.getByPlaceholderText(/big floppa/i);
    const errorSpan = screen.queryByText(/error/i);
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveValue('');
    expect(textInput).toHaveAttribute('type', 'text');
    expect(errorSpan).toBeNull();
  });
  it('render invalid form date input', () => {
    render(
      <FormInput
        type="date"
        isValid={false}
        refValue={refTest}
        max="2022-12-12"
        placeholder="date floppa"
      />
    );
    const dateInput = screen.getByPlaceholderText(/date floppa/i);
    const errorSpan = screen.getByText(/error/i);
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('max', '2022-12-12');
    expect(errorSpan).toBeInTheDocument();
  });
});

describe('Form select tests', () => {
  const refTest = React.createRef<HTMLSelectElement>();
  it('render valid form select', () => {
    render(<FormSelect isValid={true} refValue={refTest} />);
    expect(screen.getByText(/chose category/i)).toBeInTheDocument();
    expect(screen.getByText(/chose category/i)).toBeDisabled();
    expect(screen.queryByText(/error/i)).toBeNull();
  });
  it('render invalid form select', () => {
    render(<FormSelect isValid={false} refValue={refTest} />);
    expect(screen.getByText(/chose category/i)).toBeInTheDocument();
    expect(screen.getByText(/chose category/i)).toBeDisabled();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});

describe('Create Card form tests', () => {
  const create = fn();
  it('should be return 7 errors after click on submit', () => {
    render(<CreateCardForm create={create} />);
    const button = screen.getByText(/submit/i);
    expect(screen.queryByText(/error/i)).toBeNull();
    fireEvent.click(button);
    expect(screen.getAllByText(/error/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/error/i)[1]).toBeInTheDocument();
    expect(screen.getAllByText(/error/i)[2]).toBeInTheDocument();
    expect(screen.getAllByText(/error/i)[3]).toBeInTheDocument();
    expect(screen.getAllByText(/error/i)[4]).toBeInTheDocument();
    expect(screen.getAllByText(/error/i)[5]).toBeInTheDocument();
    expect(screen.getAllByText(/error/i)[6]).toBeInTheDocument();
    expect(screen.getAllByText(/error/i)[7]).toBeInTheDocument();
  });
  it('test', () => {
    render(<CreateCardForm create={create} />);
    const titleInput = screen.getByPlaceholderText(/title/i);
    const descriptionText = screen.getByPlaceholderText(/description/i);
    const select = screen.getByRole('select');
    const option = screen.getByText(/smartphones/i);
    const dateInput = screen.getByRole('datebox');
    const priceInput = screen.getByPlaceholderText(/price/i);
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
