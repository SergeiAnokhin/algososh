import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TChar, TCharArr } from "../../types/types";
import { delay, swap } from "../../utils";

export const reverseString = async (
  chars: Array<TCharArr<TChar>>,
  setCharsArr: Function,
  i: number = 0,
  k: number = chars.length - 1
) => {
  const newArr: Array<TCharArr<TChar>> = JSON.parse(JSON.stringify(chars));
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