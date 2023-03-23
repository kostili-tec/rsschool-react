import React, { Component } from 'react';
import { ICreatorFormRefs } from '../interfaces';

interface ICreateFormProps {
  create: (value: Partial<ICreatorFormRefs>) => void;
}

export default class CreateCardForm extends Component<ICreateFormProps> {
  private inputTitleRef = React.createRef<HTMLInputElement>();
  private teaxtAreaRef = React.createRef<HTMLTextAreaElement>();
  private inputDateRef = React.createRef<HTMLInputElement>();
  private selectValueRef = React.createRef<HTMLSelectElement>();
  private checkbox1ref = React.createRef<HTMLInputElement>();
  private checkbox2ref = React.createRef<HTMLInputElement>();
  private radioButton1ref = React.createRef<HTMLInputElement>();
  private radioButton2ref = React.createRef<HTMLInputElement>();
  private inputFileRef = React.createRef<HTMLInputElement>();
  constructor(props: ICreateFormProps) {
    super(props);
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardData: ICreatorFormRefs = {
      inputTitle: this.inputTitleRef.current?.value ?? '',
      inputDate: this.inputDateRef.current?.value ?? '',
      textAreaDescription: this.teaxtAreaRef.current?.value ?? '',
      selectValue: this.selectValueRef.current?.value ?? '',
      checkboxValue1: this.checkbox1ref.current?.checked ?? false,
      checkboxValue2: this.checkbox2ref.current?.checked ?? false,
      radioButton1: this.radioButton1ref.current?.checked ?? false,
      radioButton2: this.radioButton2ref.current?.checked ?? false,
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
            <input type="text" ref={this.inputTitleRef} />
            <textarea ref={this.teaxtAreaRef} placeholder="Description here..."></textarea>
            <select defaultValue="china" ref={this.selectValueRef}>
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
            <input type="date" ref={this.inputDateRef} />
          </div>

          <div className="create-card__container card-container__right">
            <fieldset>
              <legend>Chose your</legend>
              <div>
                <input type="checkbox" id="checkInput1" ref={this.checkbox1ref} />
                <label htmlFor="checkInput1">label1</label>
              </div>
              <div>
                <input type="checkbox" id="checkInput2" ref={this.checkbox2ref} />
                <label htmlFor="checkInput2">Label2</label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Chose 2</legend>

              <div>
                <input type="radio" id="radioInput1" name="chose2" ref={this.radioButton1ref} />
                <label htmlFor="radioInput1">radio1</label>
              </div>
              <div>
                <input type="radio" id="radioInput2" name="chose2" ref={this.radioButton2ref} />
                <label htmlFor="radioInput2">radio2</label>
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
