import { TChar, TCharArr } from "./types/types";

export const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export const swap = (
  arr: Array<TCharArr<TChar>>,
  i: number,
  k: number
): void => {
  const temp = arr[i];
  arr[i] = arr[k];
  arr[k] = temp;
};

export const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomArr = (
  min: number = 0,
  max: number = 100,
  sizeArray: number = getRandomNumber(3, 17)
): Array<number> => {
  const array: Array<number> = [];

  for (let i = 0; i < sizeArray; i++) {
    array.push(getRandomNumber(min, max));
  }
  return array;
};