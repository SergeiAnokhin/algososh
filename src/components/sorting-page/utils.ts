import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils";
import { TChar, TCharArr, SortMethod, SortType } from "../../types/types";

export const selectionSort = async (
  arr: Array<TCharArr<TChar>>,
  sortType: SortType,
  func: Function
) => {
  const newArr: Array<TCharArr<TChar>> = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < newArr.length; i++) {
    let index = i;
    newArr[index].state = ElementStates.Changing;

    for (let j = i; j < newArr.length; j++) {
      newArr[j].state = ElementStates.Changing;
      func([...newArr]);

      await delay(SHORT_DELAY_IN_MS);

      if (
        (sortType === SortType.Asc ? newArr[index].chars : newArr[j].chars) >
        (sortType === SortType.Asc ? newArr[j].chars : newArr[index].chars)
      ) {
        index = j;
        newArr[j].state = ElementStates.Changing;
        newArr[index].state =
          i === index ? ElementStates.Changing : ElementStates.Default;
      }
      if (j !== index) {
        newArr[j].state = ElementStates.Default;
      }
      func([...newArr]);
    }
    swap(newArr, i, index);
    newArr[index].state = ElementStates.Default;
    newArr[i].state = ElementStates.Modified;
    func([...newArr]);
  }
  return newArr;
};

export const bubbleSort = async (
  arr: Array<TCharArr<TChar>>,
  sortType: SortType,
  func: Function
) => {
  const newArr: Array<TCharArr<TChar>> = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length - i - 1; j++) {
      newArr[j].state = ElementStates.Changing;
      if (newArr[j + 1]) newArr[j + 1].state = ElementStates.Changing;
      func([...newArr]);

      await delay(SHORT_DELAY_IN_MS);

      if (
        (sortType === SortType.Asc ? newArr[j].chars : newArr[j + 1].chars) >
        (sortType === SortType.Asc ? newArr[j + 1].chars : newArr[j].chars)
      ) {
        swap(newArr, j, j + 1);
      }
      newArr[j].state = ElementStates.Default;
      if (newArr[j + 1]) newArr[j + 1].state = ElementStates.Default;
      func([...newArr]);
    }
    newArr[newArr.length - i - 1].state = ElementStates.Modified;
    func([...newArr]);
  }
  return newArr;
};