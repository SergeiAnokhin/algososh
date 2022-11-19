import React, { FormEvent, useRef, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IStack, Stack, TStackContainer, IInProcess } from "../../types/stack";

export const StackPage: React.FC = () => {

  const { current: stack } = useRef<IStack<string>>(new Stack())
  const [ inputValue, setInputValue ] = useState<string>('');
  const [ circles, setCircles ] = useState<TStackContainer<string>>([])
  const [ inProcess, setInProcess ] = useState<IInProcess>({ add: false, remove: false });
  const isAnyProcess = inProcess.add || inProcess.remove;

  const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const shortDelay = () => delay(SHORT_DELAY_IN_MS)

  const changeInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const updateCircles = () => {
    setCircles(stack.elements);
  }

  const addCircle = async (item: string) => {
    stack.push(item);
    updateCircles();
    await shortDelay();
    setInputValue('');
  }

  const removeCircle = async () => {
    setInProcess({ add: false, remove: true });
    stack.pop();
    await shortDelay();
    updateCircles();
    setInProcess({ add: false, remove: false });
  }

  const clearCircles = () => {
    stack.clear();
    updateCircles();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInProcess({ add: true, remove: false });
    await addCircle(inputValue);
    setInProcess({ add: false, remove: false });
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={'text'}
          maxLength={4}
          isLimitText
          onChange={changeInput}
          value={inputValue}
          disabled={inProcess.add || inProcess.remove}
        />
        <Button
          type={'submit'}
          text={'Добавить'}
          disabled={inputValue.length < 1 || circles.length >= 20 || isAnyProcess}
          isLoader={inProcess.add}
          extraClass={styles.button}
        />
        <Button
          text={'Удалить'}
          onClick={removeCircle}
          disabled={circles.length < 1 || isAnyProcess}
          isLoader={inProcess.remove}
          extraClass={styles.button}
        />
        <Button
          text={'Очистить'}
          onClick={clearCircles}
          disabled={circles.length < 1 || isAnyProcess}
          extraClass={styles.button}
        />
      </form>
      {circles ?
        <div className={styles.canvas}>
          {circles.map((item, index) =>
            <Circle
              letter={item}
              key={nanoid()}
              index={index}
              head={index === circles.length - 1 ? 'top' : ''}
              state={index === circles.length - 1 && isAnyProcess ? ElementStates.Changing : ElementStates.Default}
              extraClass={styles.circle}
            />)
          }
        </div>
        : <></>
      }
    </SolutionLayout>
  );
};