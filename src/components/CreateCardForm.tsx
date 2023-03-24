import React, { Component } from 'react';
import { validateText, validateDescription } from '../utils/validation';
import { ICreatorFormRefs } from '../interfaces';

interface ICreateFormProps {
  create: (value: Partial<ICreatorFormRefs>) => void;
}

type StateForm = { [key in keyof ICreatorFormRefs]: boolean };

export default class CreateCardForm extends Component<ICreateFormProps, StateForm> {
  private inputTitleRef = React.createRef<HTMLInputElement>();
  private teaxtAreaRef = React.createRef<HTMLTextAreaElement>();
  private inputDateRef = React.createRef<HTMLInputElement>();
  private selectValueRef = React.createRef<HTMLSelectElement>();
  private inputPriceRef = React.createRef<HTMLInputElement>();
  private checkbox1ref = React.createRef<HTMLInputElement>();
  private checkbox2ref = React.createRef<HTMLInputElement>();
  private radioButton1ref = React.createRef<HTMLInputElement>();
  private radioButton2ref = React.createRef<HTMLInputElement>();
  private inputFileRef = React.createRef<HTMLInputElement>();
  constructor(props: ICreateFormProps) {
    super(props);
    this.state = {
      inputDate: false,
      inputTitle: true,
      selectValue: false,
      inputPrice: false,
      textAreaDescription: false,
      radioButtonValue: false,
      checkboxValues: false,
      inputFile: false,
      inputFileUrl: false,
    };
  }

  checkPresents = (
    checkbox1: boolean | undefined,
    checkbox2: boolean | undefined
  ): Array<string> | [] => {
    if (checkbox1 && checkbox2) return ['sticker', 'trinket'];
    if (checkbox1) return ['sticker'];
    if (checkbox2) return ['trickent'];
    else return [];
  };

  checkConditon = (
    radioButton1: boolean | undefined,
    radioButton2: boolean | undefined
  ): string => {
    if (radioButton1) return 'used';
    else if (radioButton2) return 'unused';
    else return '';
  };

  checkValidation = () => {
    const checkTitle = validateText(this.inputTitleRef.current?.value);
    const checkDescription = validateDescription(this.teaxtAreaRef.current?.value);
    this.setState({ inputTitle: checkTitle, textAreaDescription: checkDescription });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.checkValidation();
    const cardData: ICreatorFormRefs = {
      inputTitle: this.inputTitleRef.current?.value ?? '',
      inputDate: this.inputDateRef.current?.value ?? '',
      textAreaDescription: this.teaxtAreaRef.current?.value ?? '',
      selectValue: this.selectValueRef.current?.value ?? '',
      inputPrice: this.inputPriceRef.current?.value ?? '',
      checkboxValues: this.checkPresents(
        this.checkbox1ref.current?.checked,
        this.checkbox2ref.current?.checked
      ),
      radioButtonValue: this.checkConditon(
        this.radioButton1ref.current?.checked,
        this.radioButton2ref.current?.checked
      ),
      inputFile: this.inputFileRef.current?.files ? this.inputFileRef.current.files[0] : null,
      inputFileUrl: this.inputFileRef.current?.files
        ? URL.createObjectURL(this.inputFileRef.current.files[0])
        : '',
    };
    this.props.create(cardData);
  };
  render() {
    return (
      <form className="form__create-card" onSubmit={this.handleSubmit}>
        <div className="create-components__container">
          <div className="create-card__container card-container__left">
            <div className="form-input__container">
              <label htmlFor="title-input">Title</label>
              <input id="title-input" type="text" ref={this.inputTitleRef} />
              {!this.state.inputTitle && <span>Error</span>}
            </div>
            <textarea ref={this.teaxtAreaRef} placeholder="Description here..."></textarea>
            <select ref={this.selectValueRef} defaultValue={'chose'}>
              <option disabled value="chose">
                Chose category
              </option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="another">Another</option>
            </select>
            <input type="date" max={`2023-03-24`} ref={this.inputDateRef} />
            <input type="number" ref={this.inputPriceRef} />
          </div>

          <div className="create-card__container card-container__right">
            <fieldset>
              <legend>Extra present</legend>
              <div>
                <input type="checkbox" id="checkInput1" ref={this.checkbox1ref} />
                <label htmlFor="checkInput1">Sticker</label>
              </div>
              <div>
                <input type="checkbox" id="checkInput2" ref={this.checkbox2ref} />
                <label htmlFor="checkInput2">Trinket</label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Сondition</legend>
              <div>
                <input type="radio" id="radioInput1" name="chose2" ref={this.radioButton1ref} />
                <label htmlFor="radioInput1">Used</label>
              </div>
              <div>
                <input type="radio" id="radioInput2" name="chose2" ref={this.radioButton2ref} />
                <label htmlFor="radioInput2">Unused</label>
              </div>
            </fieldset>

            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              id="file-input"
              ref={this.inputFileRef}
            />
          </div>
        </div>
        <hr />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
