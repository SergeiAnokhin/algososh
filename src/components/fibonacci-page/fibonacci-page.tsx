import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import style from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {

  const [value, setValue] = React.useState(0);
  const [fibArray, setFibArray] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const MIN_VALUE = 1;
  const MAX_VALUE = 19;

  const addFibNumbers = (n: number): number[] => {
    const arr = [0, 1];
    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const addFibArr = (arr: number[]): void => {
    let i = 0;
    function recursion() {
      setTimeout(() => {
        if (i >= arr.length) {
          setIsLoading(false);
          return;
        } else {
          setFibArray((prev) => [...prev, arr[i]]);
          i++;
          recursion();
        }
      }, SHORT_DELAY_IN_MS);
    }
    recursion();
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFibArray([]);
    const fibSequence = addFibNumbers(value);
    addFibArr(fibSequence);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setValue(value);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={submitHandler} name={"fibonacci-form"}>
        <Input
          type="number"
          extraClass={style.input}
          max={MAX_VALUE}
          isLimitText={true}
          onChange={inputHandler}
          placeholder="Введите число"
          name="fibonacci-input"
        />
        <Button
          type="submit"
          text="Рассчитать"
          disabled={value < MIN_VALUE || value > MAX_VALUE}
          isLoader={isLoading}
        />
      </form>
      <div
        className={`${style.circle_wrapper} ${style.circle_wrapper_fib}`}
      >
        {fibArray.map((item, index) => {
          return <Circle letter={item.toString()} key={index} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
