import { ElementStates } from "./element-states"

export type TItem = string | number;

export type TItemArr<T> = {
  chars: T;
  state: ElementStates;
};