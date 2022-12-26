import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { SortMethod, SortType, TChar, TCharArr } from "../../types/types";
import { bubbleSort, selectionSort } from "../../components/sorting-page/utils";
import { getRandomArr } from "../../utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [methodSort, setMethodSort] = useState<SortMethod>(SortMethod.Choise);
  const [array, setArray] = useState<Array<TCharArr<TChar>>>([]);

  const [isLoadingAsc, setIsLoadingAsc] = useState<boolean>(false);
  const [isLoadingDesc, setIsLoadingDesc] = useState<boolean>(false);

  const getNewArr = () => {
    setArray(
      getRandomArr(0, 100).map((chars: number) => {
        return {
          chars,
          state: ElementStates.Default,
        };
      })
    );
  };

  useEffect(() => {
    getNewArr();
  }, []);

  const handlerSort = async (
    array: Array<TCharArr<TChar>>,
    sortType: SortType,
    sortMethod: SortMethod
  ) => {
    setDisabled(true);
    sortType === SortType.Asc ? setIsLoadingAsc(true) : setIsLoadingDesc(true);
    if (sortMethod === SortMethod.Choise) {
      await selectionSort(array, sortType, setArray);
    } else {
      await bubbleSort(array, sortType, setArray);
    }
    setDisabled(false);
    setIsLoadingAsc(false);
    setIsLoadingDesc(false);
  };

  const handlerMethodSort = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const method = e.currentTarget.value;
    if (method === SortMethod.Choise) {
      setMethodSort(method);
    } else if (method === SortMethod.Bubble) {
      setMethodSort(method);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <div className={style.radioButtons}>
          <RadioInput
            label="Выбор"
            defaultChecked
            defaultValue={SortMethod.Choise}
            name="radio"
            disabled={disabled}
            onClick={handlerMethodSort}
          />
          <RadioInput
            label="Пузырёк"
            defaultValue={SortMethod.Bubble}
            name="radio"
            disabled={disabled}
            onClick={handlerMethodSort}
          />
        </div>
        <div className={style.buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            disabled={disabled}
            isLoader={isLoadingAsc}
            onClick={() => handlerSort(array, SortType.Asc, methodSort)}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            disabled={disabled}
            isLoader={isLoadingDesc}
            onClick={() => handlerSort(array, SortType.Desc, methodSort)}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={getNewArr}
          disabled={disabled}
        />
      </div>
      <div className={style.array}>
        {array?.map((item, index) => (
          <Column index={+item.chars} state={item.state} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};