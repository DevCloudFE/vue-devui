
export interface IItem {
  key: string;
  value: string;
  disabled: boolean;
}

export interface ITitles {
  [index: number]: string;
}

export interface IModel {
  [index: number]: string | number;
}

export interface TState {
  data: IItem[];
  allChecked: boolean;
  checkedNum: number;
  keyword: string;
  checkedValues: string[];
  filterData: IItem[];
  disabled: boolean;
}

export interface TResult {
  model: string[];
  data: IItem[];
}


