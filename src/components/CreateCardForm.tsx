import React, { Component } from 'react';
import {
  validateText,
  validateDescription,
  validateSelect,
  validateDate,
  validatePrice,
  validateCheckBoxes,
  validateRadioButtons,
  validateFileInput,
} from '../utils/validation';
import FormInput from './UI/FormComponents/FormInput';
import FormSelect from './UI/FormComponents/FormSelect';
import { ICreatorFormRefs, ICreateFormProps, StateForm } from '../interfaces';

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
  private form: HTMLFormElement | null;
  constructor(props: ICreateFormProps) {
    super(props);
    this.state = {
      inputDate: true,
      inputTitle: true,
      selectValue: true,
      inputPrice: true,
      textAreaDescription: true,
      radioButtonValue: true,
      checkboxValues: true,
      inputFile: true,
      inputFileUrl: false,
    };
    this.form = null;
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
    const checkSelect = validateSelect(this.selectValueRef.current?.value);
    const checkDate = validateDate(this.inputDateRef.current?.value);
    const checkPrice = validatePrice(this.inputPriceRef.current?.value);
    const checkCheckBoxes = validateCheckBoxes(
      this.checkPresents(this.checkbox1ref.current?.checked, this.checkbox2ref.current?.checked)
    );
    const checkRadio = validateRadioButtons(
      this.checkConditon(
        this.radioButton1ref.current?.checked,
        this.radioButton2ref.current?.checked
      )
    );
    const checkFileInput = validateFileInput(this.inputFileRef.current?.files);

    const chacksArr = [
      checkTitle,
      checkDescription,
      checkSelect,
      checkDate,
      checkPrice,
      checkCheckBoxes,
      checkRadio,
      checkFileInput,
    ];

    this.setState({
      inputTitle: checkTitle,
      textAreaDescription: checkDescription,
      selectValue: checkSelect,
      inputDate: checkDate,
      inputPrice: checkPrice,
      checkboxValues: checkCheckBoxes,
      radioButtonValue: checkRadio,
      inputFile: checkFileInput,
      inputFileUrl: checkFileInput,
    });
    if (chacksArr.includes(false)) return false;
    else return true;
  };

  getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  resetForm = () => {
    if (this.form) this.form.reset();
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.checkValidation()) {
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
      this.resetForm();
    }
  };

  render() {
    return (
      <form
        className="form__create-card"
        onSubmit={this.handleSubmit}
        ref={(el) => (this.form = el)}
      >
        <div className="create-components__container">
          <div className="create-card__container card-container__left">
            <FormInput
              type="text"
              placeholder="Title..."
              isValid={this.state.inputTitle}
              refValue={this.inputTitleRef}
            />
            <div className="form-input__container">
              <textarea
                rows={5}
                cols={30}
                ref={this.teaxtAreaRef}
                placeholder="Description here..."
              ></textarea>
              {!this.state.textAreaDescription && <span className="error-span">Error</span>}
            </div>
            <FormSelect isValid={this.state.selectValue} refValue={this.selectValueRef} />
            <FormInput
              type="date"
              isValid={this.state.inputDate}
              refValue={this.inputDateRef}
              max={this.getCurrentDate()}
            />
            <FormInput
              type="number"
              placeholder="Price..."
              isValid={this.state.inputPrice}
              refValue={this.inputPriceRef}
            />
          </div>

          <div className="create-card__container card-container__right">
            <fieldset className="form-fieldset">
              <legend>Extra present</legend>
              <div className="legend-item">
                <div>
                  <input type="checkbox" id="checkInput1" ref={this.checkbox1ref} />
                  <label htmlFor="checkInput1">Sticker</label>
                </div>
                <div>
                  <input type="checkbox" id="checkInput2" ref={this.checkbox2ref} />
                  <label htmlFor="checkInput2">Trinket</label>
                </div>
              </div>
              <div>{!this.state.checkboxValues && <span className="error-span">Error</span>}</div>
            </fieldset>
            <fieldset className="form-fieldset">
              <legend>Сondition</legend>
              <div className="legend-item">
                <div>
                  <input type="radio" id="radioInput1" name="chose1" ref={this.radioButton1ref} />
                  <label htmlFor="radioInput1">Used</label>
                </div>
                <div>
                  <input type="radio" id="radioInput2" name="chose2" ref={this.radioButton2ref} />
                  <label htmlFor="radioInput2">Unused</label>
                </div>
              </div>
              <div>{!this.state.radioButtonValue && <span className="error-span">Error</span>}</div>
            </fieldset>
            <FormInput
              type="file"
              accept="image/jpeg,image/png,image/gif"
              isValid={this.state.inputFile}
              refValue={this.inputFileRef}
            />
            <button type="submit">Submit</button>
          </div>
        </div>
        <hr />
      </form>
    );
  }
}
