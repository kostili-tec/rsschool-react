const textRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s]{2,})$/;
const descriptionRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s:?!-]{9,})[,.\s:?!-]*$/;
const numbersRegExp = /^\d+$/;

export const validateText = (inputValue: string | undefined): boolean => {
  if (inputValue) return textRegExp.test(inputValue);
  else return false;
};

export const validateDescription = (inputValue: string | undefined): boolean => {
  if (inputValue) return descriptionRegExp.test(inputValue);
  else return false;
};

export const validateSelect = (selectValue: string | undefined) => {
  selectValue ? true : false;
};

export const validatePrice = (numberValue: string | undefined) => {
  if (numberValue) return numbersRegExp.test(numberValue);
  else return false;
};

export const validateChechBoxes = (checkboxesArr: Array<string> | []) => {
  if (checkboxesArr.length) return true;
  else return false;
};
