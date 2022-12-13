import { ElementStates } from "../../types/element-states";

export interface IInProcess {
    add: boolean;
    remove: boolean;
  }
  
 export type TStackContainer<T> = Array<T>;
  
 export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    elements: TStackContainer<T>
  }
  
  export class Stack<T> implements IStack<T> {
    private container: TStackContainer<T> = [];
  
    push = (item: T) => {
      this.container.push(item);
    }
  
    pop = () => {
      this.container.pop();
    }
  
    clear = () => {
      this.container = [];
    }
  
    get elements() {
      return [...this.container];
    }

    get size() {
      return this.container.length
    }
  }
  
  export interface IElement<T> {
    element: T;
    state: ElementStates;
  }