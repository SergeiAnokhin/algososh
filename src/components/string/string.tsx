import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "../../components/string/utils";
import { TChar, TCharArr } from "../../types/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loaderBtn, setLoaderBtn] = useState<boolean>(false);
  const [charsArr, setCharsArr] = useState<Array<TCharArr<TChar>>>([]);
  const [inputValue, setInputValue] = useState('');

  const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length > 0 ? setDisabled(false) : setDisabled(true);
    setInputValue(e.target.value)
  };

  const handlerBtnClick = async () => {
    const newArr = inputValue.split("").map((chars: string) => {
      return {
        chars,
        state: ElementStates.Default,
      };
    })
    setLoaderBtn(true);
    await reverseString(newArr, setCharsArr);
    setLoaderBtn(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={style.container}>
        <Input
          data="input"
          onChange={handlerChangeInput}
          placeholder="Введите текст"
          maxLength={11}
          isLimitText
        />
        <Button
          onClick={handlerBtnClick}
          text="Развернуть"
          linkedList="small"
          isLoader={loaderBtn}
          disabled={disabled}
          data="button"
        />
      </div>
      <div className={style.circle}>
        {charsArr?.map((char, index) => (
          <Circle state={char.state} letter={`${char.chars}`} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};