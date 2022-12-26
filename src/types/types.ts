import { ElementStates } from "./element-states"

export type TChar = string | number;

export type TCharArr<T> = {
  chars: T;
  state: ElementStates;
};

export enum SortType {
  Asc = "Asc",
  Desc = "Desc",
}

export enum SortMethod {
  Choise = "Choise",
  Bubble = "Bubble",
}