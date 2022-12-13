import { IChars } from "../../types/string";

export const swap = (j: number, i: number, arr: IChars[]) => {
    const arrTemp = [...arr];
    const temp = arrTemp[j].chars;
    arrTemp[j].chars = arrTemp[i].chars;
    arrTemp[i].chars = temp;
    return arrTemp;
  };