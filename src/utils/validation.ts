const textRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s]{2,})$/;
const descriptionRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s:?!-]{9,})[,.\s:?!-]*$/;
const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
const numbersRegExp = /^\d+$/;

export const validateText = (inputValue: string | undefined): boolean => {
  if (inputValue) return textRegExp.test(inputValue);
  else return false;
};

export const validateDescription = (inputValue: string | undefined): boolean => {
  if (inputValue) return descriptionRegExp.test(inputValue);
  else return false;
};

export const validateSelect = (selectValue: string | undefined): boolean => {
  if (selectValue) return true;
  else return false;
};

export const validateDate = (inputValue: string | undefined) => {
  if (inputValue) return dateRegExp.test(inputValue);
  else return false;
};

export const validatePrice = (numberValue: string | undefined) => {
  if (numberValue) return numbersRegExp.test(numberValue);
  else return false;
};

export const validateCheckBoxes = (checkboxesArr: Array<string> | []) => {
  if (checkboxesArr.length) return true;
  else return false;
};

export const validateRadioButtons = (radioValue: string) => {
  if (radioValue.length >= 4) return true;
  else return false;
};

export const validateFileInput = (file: FileList | null | undefined): boolean => {
  let result = false;
  const valideExt = ['jpg', 'jpeg', 'png', 'gif'];
  if (file && file.length) {
    const fileExt = file[0].name.split('.').pop();
    if (fileExt) {
      result = valideExt.includes(fileExt);
    }
  }
  return result;
};
