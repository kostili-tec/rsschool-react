export interface IHeaderLinks {
  linkName: string;
  linkTo: string;
}

export interface IHeaderProps {
  headerLinks: Array<IHeaderLinks>;
}

export type TypeHeaderProps = Array<IHeaderLinks>;

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

interface IBaseCardData {
  id?: number;
  title: string;
  description: string;
  select: string;
  price: string;
  date: string;
  checkboxes: Array<string>;
  radio: string;
}
export interface IFormInputsData extends IBaseCardData {
  file: FileList;
}

export interface IFormCardData extends IBaseCardData {
  fileUrl: string;
}

export interface ICreateFormProps {
  create: (value: IFormCardData) => void;
}

export type StateForm = { [key in keyof ICreatorFormRefs]: boolean };

export interface IFormInputProps {
  type: string;
  refValue: React.RefObject<HTMLInputElement>;
  isValid: boolean;
  placeholder?: string;
  id?: string;
  max?: string;
  accept?: string;
}

/* UNSPLASH */

type TTags = {
  type: string;
  title: string;
};

type TUrls = {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
};

type TUrserLinks = {
  portfolio: string;
};

type TUserProfileImg = {
  large: string;
  medium: string;
  small: string;
};

interface IUser {
  name: string;
  links: TUrserLinks;
  profile_image: TUserProfileImg;
}

export interface IUnsplashResults {
  id: string;
  created_at: string;
  color: string;
  description: null | string;
  alt_description: null | string;
  likes: number;
  tags: Array<TTags>;
  urls: TUrls;
  user: IUser;
  height: number;
  width: number;
}

export type TUnsplashResultsArray = Array<IUnsplashResults>;

export interface IUnsplashRequestData {
  total: number;
  total_pages: number;
  results: TUnsplashResultsArray | [];
}

/* UNSPLASH END */
