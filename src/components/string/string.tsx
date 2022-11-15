import {useState, useMemo, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import style from "./string.module.css";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {

  interface IChars {
    chars?: string,
    color: ElementStates
  }

  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputString, setInputString] = useState("");
  const [arrChars, setArrChars] = useState<IChars[]>([]);

  const swap = (j: number, i: number, arr: IChars[]) => {
    const arrTemp = [...arr];
    const temp = arrTemp[j].chars;
    arrTemp[j].chars = arrTemp[i].chars;
    arrTemp[i].chars = temp;
    return arrTemp;
  };

  const reverseString = (j: number, i: number, arr: IChars[]) => {
    const mid = Math.floor(arr.length / 2);
    if (j <= i) {
      arr[j].color = ElementStates.Changing;
      arr[i].color = ElementStates.Changing;
    }
    if ((j <= mid) && (j <= i))
      setTimeout(() => {
        arr = swap(j, i, arr);
        arr[j].color = ElementStates.Modified;
        arr[i].color = ElementStates.Modified;
        j++;
        i--;
        reverseString(j, i, arr);
      }, DELAY_IN_MS);
    else {
      if (j - 1 >= 0) {
      }
      setArrChars(arr);
      setIsLoader(false);
      return;
    }
    if (j - 1 >= 0) {
      arr[j - 1].color = ElementStates.Modified;
    }
    if (i - 1 < arr.length - 2) {
      arr[i + 1].color = ElementStates.Modified;
    }
    setArrChars(arr);
  };
  const wrapString = 
      (string: string) => {
      setIsLoader(true);
      const newArr: IChars[] = [];
      const arrString: string[] = string.split("");
      for (let i = 0; i <= arrString.length - 1; i++) {
        newArr[i] = { chars: arrString[i], color: ElementStates.Default };
      }
      newArr[0].color = ElementStates.Changing;
      newArr[newArr.length - 1].color = ElementStates.Changing;
      setArrChars(newArr);
      setTimeout(() => {
        reverseString(0, newArr.length - 1, newArr);
      }, DELAY_IN_MS);
    }
  const inputChange = (event: any) => {
      setInputString(event.target.value);
      if (event.target.value) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

  return (
    <SolutionLayout title="Строка">
     <div className={style.page}>
        <Input
          extraClass={style.input}
          type={"text"}
          maxLength={11}
          value={inputString}
          isLimitText
          onChange={inputChange}
        />
        <Button
          text="Развернуть"
          isLoader={isLoader}
          disabled={isDisabled}
          linkedList={"small"}
          onClick={() => wrapString(inputString)}
        />
      </div>
      <ul className={style.chars}>
        {arrChars.map((item, index) => (
          <li key={index} className={item.chars}>
            <Circle extraClass={style.char} state={item.color} letter={item.chars} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
