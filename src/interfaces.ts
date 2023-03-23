export interface IHeaderLinks {
  linkName: string;
  linkTo: string;
  'data-testid'?: string;
}

export interface IHeaderProps {
  headerLinks: Array<IHeaderLinks>;
}

export type TypeHeaderProps = Array<IHeaderLinks>;

export interface IStateHeader {
  title: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type IProductsArray = Array<IProduct>;

export interface IApiGetRequest {
  products: IProductsArray;
  limit: number;
  skip: number;
  total: number;
}

export interface ICreatorFormRefs {
  inputTitle: string;
  textAreaDescription: string;
  inputDate: string;
  inputPrice: string;
  selectValue: string;
  checkboxValues?: Array<string> | [];
  radioButtonValue: string;
  inputFile: File | null;
  inputFileUrl: string;
}
