import React, { Component } from 'react';
import { ICreatorFormState } from '../interfaces';

interface ICreateFormProps {
  create: (value: Partial<ICreatorFormState>) => void;
}

export default class CreateCardForm extends Component<
  ICreateFormProps,
  Partial<ICreatorFormState>
> {
  constructor(props: ICreateFormProps) {
    super(props);
    this.state = {
      inputTitle: '',
      textAreaDescription: '',
      inputDate: '',
      selectValue: '',
      checkboxValue1: false,
      checkboxValue2: false,
      radioButton1: false,
      radioButton2: false,
      inputFile: null,
      inputFileUrl: '',
    };
  }

  inputTitleRef = React.createRef<HTMLInputElement>();
  teaxtAreaRef = React.createRef<HTMLTextAreaElement>();
  inputDateRef = React.createRef<HTMLInputElement>();
  selectValueRef = React.createRef<HTMLSelectElement>();
  checkbox1ref = React.createRef<HTMLInputElement>();
  checkbox2ref = React.createRef<HTMLInputElement>();
  radioButton1ref = React.createRef<HTMLInputElement>();
  radioButton2ref = React.createRef<HTMLInputElement>();
  inputFileRef = React.createRef<HTMLInputElement>();
  handleChange = () => {
    this.setState({
      inputTitle: this.inputTitleRef.current?.value,
      inputDate: this.inputDateRef.current?.value,
      textAreaDescription: this.teaxtAreaRef.current?.value,
      selectValue: this.selectValueRef.current?.value,
      checkboxValue1: this.checkbox1ref.current?.checked,
      checkboxValue2: this.checkbox2ref.current?.checked,
      radioButton1: this.radioButton1ref.current?.checked,
      radioButton2: this.radioButton2ref.current?.checked,
    });
  };

  handleChangeFileInput = () => {
    if (this.inputFileRef.current && this.inputFileRef.current.files) {
      const inputFile = this.inputFileRef.current.files[0];
      if (inputFile) {
        this.setState({ inputFile, inputFileUrl: URL.createObjectURL(inputFile) });
      }
    }
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.create(this.state);
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.value = '';
      this.setState({ inputTitle: '' });
    }
  };
  render() {
    return (
      <form className="form__create-card" onSubmit={this.handleSubmit}>
        <div className="create-components__container">
          <div className="create-card__container card-container__left">
            <input type="text" ref={this.inputTitleRef} onChange={this.handleChange} />
            <textarea
              ref={this.teaxtAreaRef}
              onChange={this.handleChange}
              placeholder="Description here..."
            ></textarea>
            <select defaultValue="china" ref={this.selectValueRef} onChange={this.handleChange}>
              <option value="australia">Australia</option>
              <option value="brazil">Brazil</option>
              <option value="canada">Canada</option>
              <option value="china">China</option>
              <option value="france">France</option>
              <option value="germany">Germany</option>
              <option value="italy">Italy</option>
              <option value="japan">Japan</option>
              <option value="mexico">Mexico</option>
              <option value="russia">Russia</option>
              <option value="spain">Spain</option>
              <option value="usa">USA</option>
            </select>
            <input type="date" ref={this.inputDateRef} onChange={this.handleChange} />
          </div>

          <div className="create-card__container card-container__right">
            <fieldset>
              <legend>Chose your</legend>
              <div>
                <input
                  type="checkbox"
                  id="checkInput1"
                  ref={this.checkbox1ref}
                  onChange={this.handleChange}
                />
                <label htmlFor="checkInput1">label1</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="checkInput2"
                  ref={this.checkbox2ref}
                  onChange={this.handleChange}
                />
                <label htmlFor="checkInput2">Label2</label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Chose 2</legend>

              <div>
                <input
                  type="radio"
                  id="radioInput1"
                  name="chose2"
                  ref={this.radioButton1ref}
                  onChange={this.handleChange}
                />
                <label htmlFor="radioInput1">radio1</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="radioInput2"
                  name="chose2"
                  ref={this.radioButton2ref}
                  onChange={this.handleChange}
                />
                <label htmlFor="radioInput2">radio2</label>
              </div>
            </fieldset>

            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              id="file-input"
              ref={this.inputFileRef}
              onInput={this.handleChangeFileInput}
            />
          </div>
        </div>
        <hr />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
