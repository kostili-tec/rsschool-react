import React, { Component } from 'react';

export default class CreateCardForm extends Component {
  state = {
    inputTitle: '',
    textAreaDescription: '',
    inputDate: '',
  };
  inputTitleRef = React.createRef<HTMLInputElement>();
  teaxtAreaRef = React.createRef<HTMLTextAreaElement>();
  inputDateRef = React.createRef<HTMLInputElement>();
  // inputRef = React.createRef<HTMLInputElement>();
  handleChange = () => {
    this.setState({
      inputTitle: this.inputTitleRef.current?.value,
      inputDate: this.inputDateRef.current?.value,
      textAreaDescription: this.teaxtAreaRef.current?.value,
    });
  };
  render() {
    return (
      <form className="form__create-card">
        <div className="create-components__container">
          <div className="create-card__container card-container__left">
            <input type="text" ref={this.inputTitleRef} onChange={this.handleChange} />
            <textarea
              ref={this.teaxtAreaRef}
              onChange={this.handleChange}
              placeholder="Description here..."
            ></textarea>
            <select defaultValue="china">
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
                <input type="checkbox" id="checkInput1" />
                <label htmlFor="checkInput1">label1</label>
              </div>
              <div>
                <input type="checkbox" id="checkInput2" />
                <label htmlFor="checkInput2">Label2</label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Chose 2</legend>

              <div>
                <input type="radio" id="radioInput1" name="chose2" />
                <label htmlFor="radioInput1">radio1</label>
              </div>
              <div>
                <input type="radio" id="radioInput2" name="chose2" />
                <label htmlFor="radioInput2">radio1</label>
              </div>
            </fieldset>

            <input type="file" />
          </div>
        </div>
        <hr />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
