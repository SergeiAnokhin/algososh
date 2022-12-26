import { ElementStates } from "../../types/element-states";
import { SortType } from "../../types/types";
import { bubbleSort, selectionSort } from "./utils";
import { LONG_DELAY_IN_MS } from "../../constants/delays";

const newArr = [];
const initialOneCharArr = [{ chars: 1, state: ElementStates.Default }];
const resultOneCharArr = [{ chars: 1, state: ElementStates.Modified }];
const initialArr = [
  { chars: 1, state: ElementStates.Default },
  { chars: 9, state: ElementStates.Default },
  { chars: 8, state: ElementStates.Default },
  { chars: 5, state: ElementStates.Default },
];
const resultAscArr = [
  { chars: 1, state: ElementStates.Modified },
  { chars: 5, state: ElementStates.Modified },
  { chars: 8, state: ElementStates.Modified },
  { chars: 9, state: ElementStates.Modified },
];
const resultDescArr = [
  { chars: 9, state: ElementStates.Modified },
  { chars: 8, state: ElementStates.Modified },
  { chars: 5, state: ElementStates.Modified },
  { chars: 1, state: ElementStates.Modified },
];

describe("Сортировка массива", () => {
  it("пузырьком с пустым массивом", async () => {
    expect(await bubbleSort(newArr, SortType.Asc, () => {})).toEqual(newArr);
  });

  it("выбором с пустым массивом", async () => {
    expect(await selectionSort(newArr, SortType.Asc, () => {})).toEqual(newArr);
  });

  it("пузырьком по возрастанию с массивом из одного элемента", async () => {
    expect(await bubbleSort(initialOneCharArr, SortType.Asc, () => {})).toEqual(resultOneCharArr);
  });

  it("выбором по возрастанию с массивом из одного элемента", async () => {
    expect(await selectionSort(initialOneCharArr, SortType.Asc, () => {})).toEqual(resultOneCharArr);
  });

  it("пузырьком по убыванию с массивом из одного элемента", async () => {
    expect(await bubbleSort(initialOneCharArr, SortType.Desc, () => {})).toEqual(resultOneCharArr);
  });

  it("выбором по убыванию с массивом из одного элемента", async () => {
    expect(await selectionSort(initialOneCharArr, SortType.Desc, () => {})).toEqual(resultOneCharArr);
  });

  it("пузырьком по возрастанию с массивом из нескольких элементов", async () => {
    expect(await bubbleSort(initialArr, SortType.Asc, () => {})).toEqual(resultAscArr);
  });

  it("выбором по возрастанию с массивом из нескольких элементов", async () => {
    expect(await selectionSort(initialArr, SortType.Asc, () => {})).toEqual(resultAscArr);
  }, LONG_DELAY_IN_MS);

  it("пузырьком по убыванию с массивом из нескольких элементов", async () => {
    expect(await bubbleSort(initialArr, SortType.Desc, () => {})).toEqual(resultDescArr);
  });

  it("выбором по убыванию с массивом из нескольких элементов", async () => {
    expect(await selectionSort(initialArr, SortType.Desc, () => {})).toEqual(resultDescArr);
  }, LONG_DELAY_IN_MS);
});