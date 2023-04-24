export const textRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s]{2,})$/;
export const descriptionRegExp = /^(?=\s*\S)([a-zA-Z0-9][a-zA-Z0-9\s:?!-]{9,})[,.\s:?!-]*$/;
export const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
export const numbersRegExp = /^\d+$/;

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
