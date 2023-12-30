export interface Route {
  name: string;
  href: string;
}

export type OnlyNumberOptions = {
  allowZeroFirst?: boolean;
  max?: number;
};

export type ISelectOption = {
  label: string;
  value: string | number;
};

