import { useEffect, useState } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { getRandomArr } from "./utils";

export const SortingPage: React.FC = () => {

  const [arr, setArr] = useState<number[]>([]);
  const [isBubble, setIsBubble] = useState(false);
  const [isDesc, setIsDesc] = useState(false);
  const [step, setStep] = useState(-1);
  const [internalStep, setInternalStep] = useState(-1);
  const [minNumInd, setMinNumInd] = useState(-1);
  const [minNum, setMinNum] = useState(-1);
  const [maxNumInd, setMaxNumInd] = useState(-1);
  const [maxNum, setMaxNum] = useState(-1);
  const [candidateInd, setCandidateInd] = useState(-1);
  const [candidatesInd, setCandidatesInd] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeout = 2500;

  const handleAsc = (event: React.UIEvent<HTMLElement>) => {
    setIsLoading(true);
    setIsDesc(false);
    setStep(0);
  }

  const handleDesc = (event: React.UIEvent<HTMLElement>) => {
    setIsLoading(true);
    setIsDesc(true);
    setStep(0);
  }

  const handleRefresh = (event: React.UIEvent<HTMLElement>) => {
    setStep(-1);
    setCandidateInd(-1);
    setCandidatesInd([]);
    setArr(getRandomArr());
  }

  const sortInternal = () => {
    if (internalStep < 0) {
      return;
    }

    if (isBubble) {
      if (internalStep === arr.length - step - 1) {
        setCandidatesInd([0, 1]);
        setStep(step+1);
        return;
      }

      let array = [...arr];

      if ((isDesc && arr[internalStep+1] > arr[internalStep]) || (!isDesc && arr[internalStep+1] < arr[internalStep])) {
        const value = arr[internalStep];
        array[internalStep] = array[internalStep+1];
        array[internalStep+1] = value;

        setArr(array);
      }

      setCandidatesInd([internalStep, internalStep + 1]);

    } else {
      
      if (internalStep >= arr.length) {
        
        let array = [...arr];
        
        const value = array[step];               

        if (isDesc) {
          array[step] = array[maxNumInd];
          array[maxNumInd] = value;
        } else {
          array[step] = array[minNumInd];
          array[minNumInd] = value;
        }

        setArr(array);
        setCandidateInd(-1);
        setStep(step+1);

        return;
      }         

      if (isDesc) {
        if (arr[internalStep] > maxNum) {
          setMaxNum(arr[internalStep]);
          setMaxNumInd(internalStep);
        }
      } else {
        if (arr[internalStep] < minNum) {
          setMinNum(arr[internalStep]);
          setMinNumInd(internalStep);
        }
      }
    }

    setInternalStep(internalStep+1);
  }

  const sort = () => {
    if (step < 0) {
      return;
    }

    if (step === arr.length-1) {
      setStep(step+1);
      return;
    } 

    if (step > arr.length-1) {
      setInternalStep(-1);
      setIsLoading(false);
      return;
    }

    const firstNum = arr[step];
    const secondNum = arr[step+1];

    if (isBubble) {
      setInternalStep(0);
    } else {
      if (isDesc){
        setMaxNum(firstNum > secondNum ? firstNum : secondNum);
        const maxNumInd = firstNum > secondNum ? step : step+1;
        setMaxNumInd(maxNumInd);
        setCandidateInd(maxNumInd);
      } else {
        setMinNum(firstNum < secondNum ? firstNum : secondNum);
        const minNumInd = firstNum < secondNum ? step : step+1;        
        setMinNumInd(minNumInd);
        setCandidateInd(minNumInd);
      }
      
      
      setCandidatesInd([step, step + 1]);
    }
  }

  const isSortedColumn = (index: number) => {
    return isBubble
      ? index > arr.length - step - 1
      : index < step;
  }

  const isCandidateColumn = (index: number) => {
    return isBubble
      ? candidatesInd.includes(index)
      : index === step || index === internalStep;
  }

  useEffect(() => {
    setTimeout(() => sort(), timeout);
  }, [step]);

  useEffect(() => {
    setTimeout(() => {
      setCandidatesInd([]);
      setInternalStep(candidateInd);
    }, timeout);
  }, [candidateInd]);

  useEffect(() => {
    setTimeout(() => sortInternal(), timeout);
  }, [internalStep]);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.controlsWrapper}`}>
        <div className={`${styles.inputsWrapper}`}>
          <RadioInput label="Выбор" checked={!isBubble} disabled={isLoading} onChange={() => setIsBubble(false)} />
          <RadioInput label="Пузырёк" checked={isBubble} disabled={isLoading} onChange={() => setIsBubble(true)} />
        </div>
        <div className={`${styles.buttonsWrapper}`}>
          <div className={`${styles.sortButtonsWrapper}`}>
            <Button text="По возрастанию" sorting={Direction.Ascending} extraClass={`${styles.button}`} isLoader={isLoading && !isDesc} disabled={arr.length === 0 || (isLoading && isDesc)} onClick={handleAsc} />
            <Button text="По убыванию" sorting={Direction.Descending} extraClass={`${styles.button}`} isLoader={isLoading && isDesc} disabled={arr.length === 0 || (isLoading && !isDesc)} onClick={handleDesc} />
          </div>
          <Button text="Новый массив" extraClass={`${styles.button}`} disabled={isLoading} onClick={handleRefresh} />
        </div>
      </div>
      <div className={`${styles.histogramWrapper}`}>
        {arr.map((item, index) => <Column key={index} index={item} extraClass={isSortedColumn(index) ? `${styles.sorted}` : isCandidateColumn(index) ? `${styles.candidate}` : '' } />)}
      </div>
    </SolutionLayout>
  );
};