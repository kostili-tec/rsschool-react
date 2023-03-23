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
  private inputPriceRef = React.createRef<HTMLInputElement>();
  private checkbox1ref = React.createRef<HTMLInputElement>();
  private checkbox2ref = React.createRef<HTMLInputElement>();
  private radioButton1ref = React.createRef<HTMLInputElement>();
  private radioButton2ref = React.createRef<HTMLInputElement>();
  private inputFileRef = React.createRef<HTMLInputElement>();
  constructor(props: ICreateFormProps) {
    super(props);
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

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <input type="text" ref={this.inputTitleRef} />
            <textarea ref={this.teaxtAreaRef} placeholder="Description here..."></textarea>
            <select ref={this.selectValueRef} defaultValue="Chose country">
              <option disabled value="Chose category">
                Chose country
              </option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="another">Another</option>
            </select>
            <input type="date" ref={this.inputDateRef} />
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
