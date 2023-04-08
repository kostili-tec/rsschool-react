export interface IHeaderLinks {
  linkName: string;
  linkTo: string;
}

export interface IHeaderProps {
  headerLinks: Array<IHeaderLinks>;
}

export type TypeHeaderProps = Array<IHeaderLinks>;

export type TValidationState = { clientKey: string; isValid: boolean };

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
  html: string;
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

type photoDownloadsLinks = {
  download: string;
  download_location: string;
  html: string;
  self: string;
};

export interface IUnsplashResults {
  id: string;
  created_at: string;
  promoted_at: string;
  color: string;
  description: null | string;
  alt_description: null | string;
  links: photoDownloadsLinks;
  likes: number;
  tags?: Array<TTags>;
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

type TExifPhoto = {
  aperture: string;
  exposure_time: string;
  focal_length: string;
  iso: number;
  make: string;
  model: string;
  name: string;
};

type TLocationPhoto = {
  country: string;
  name: string;
};

export interface IUnsplashGetPhoto extends IUnsplashResults {
  downloads: number;
  exif: TExifPhoto;
  views: number;
  location: TLocationPhoto;
}

/* UNSPLASH END */
