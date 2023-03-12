export interface IHeaderLinks {
  linkName: string;
  linkTo: string;
}

export interface IHeaderProps {
  headerLinks: Array<IHeaderLinks>;
}

export type TypeHeaderProps = Array<IHeaderLinks>;

export interface IStateHeader {
  title: string;
}
