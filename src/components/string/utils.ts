import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TItem, TItemArr } from "../../types/string";

export const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export const swap = (
  arr: Array<TItemArr<TItem>>,
  i: number,
  k: number
): void => {
  const temp = arr[i];
  arr[i] = arr[k];
  arr[k] = temp;
};

export const reverseString = async (
  chars: Array<TItemArr<TItem>>,
  setCharsArr: Function,
  i: number = 0,
  k: number = chars.length - 1
) => {
  const newArr: Array<TItemArr<TItem>> = JSON.parse(JSON.stringify(chars));
  const middle = newArr.length / 2;

  while (i < middle) {
    newArr[i].state = ElementStates.Changing;
    newArr[k].state = ElementStates.Changing;
    setCharsArr([...newArr]);

    await delay(DELAY_IN_MS);

    newArr[i].state = ElementStates.Modified;
    newArr[k].state = ElementStates.Modified;
    swap(newArr, i, k);
    setCharsArr([...newArr]);

    await delay(DELAY_IN_MS);

    i++;
    k--;
  }
  return newArr;
};