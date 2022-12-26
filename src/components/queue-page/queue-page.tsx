import React, { useState } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Circle } from "../ui/circle/circle"
import { Button } from "../ui/button/button"
import { Input } from "../ui/input/input"
import style from "./queue-page.module.css"
import { ElementStates } from "../../types/element-states"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { IListItemProps, IQueue, Queue } from "./queue"
import { delay } from "../../utils"

export const QueuePage: React.FC = () => {
  const newQueue = new Queue<string>(6)
  const basicState: IListItemProps[] = Array.from({ length: 6 }, () => ({
    char: "",
    state: ElementStates.Default,
  }))

  const [inputValue, setInputValue] = useState<string>("")
  const [arrLetters, setArrLetters] = useState<IListItemProps[]>(basicState)
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [queue, setQueue] = useState<IQueue<string>>(newQueue)
  const [headIndex, setheadIndex] = useState<number | null>(null)

  const sortAndWait = async (arr: IListItemProps[]) => {
    setArrLetters([...arr])
    await delay(SHORT_DELAY_IN_MS)
  }

  const enqueue = async () => {
    setAdding(true)

    setInputValue("")

    const copyArr = [...arrLetters]
    queue.enqueue(inputValue)
    const newHead = queue.getHead()
    const newTail = queue.getTail()
    copyArr[newHead.index].char = newHead.value!
    copyArr[newHead.index].head = "head"

    setheadIndex(newHead.index)
    
    if (newTail.index > 0) copyArr[newTail.index - 1].tail = ""
    copyArr[newTail.index].char = newTail.value!
    copyArr[newTail.index].tail = "tail"
    copyArr[newTail.index].state = ElementStates.Changing

    await sortAndWait(copyArr)
    copyArr[newTail.index].state = ElementStates.Default

    setAdding(false)
  }

  const dequeue = async () => {
    setDeleting(true)

    const copyArr = [...arrLetters]
    const head = queue.getHead()
    const tail = queue.getTail()

    copyArr[head.index].state = ElementStates.Changing
    await sortAndWait(copyArr)
    copyArr[head.index].state = ElementStates.Default

    if (head.index === tail.index) {
      const newQueue = new Queue<string>(6)
      setQueue(newQueue)
      copyArr[head.index].head = "head"
      copyArr[head.index].char = ""
      copyArr[tail.index].tail = ""
    }
    else {
      queue.dequeue()
      const newHead = queue.getHead()
      const newTail = queue.getTail()

      if (newHead.index > 0) {
        copyArr[newHead.index - 1].head = ""
        copyArr[newHead.index - 1].char = ""
      }

      copyArr[newHead.index].char = newHead.value!
      copyArr[newHead.index].head = "head"
    }

    setDeleting(false)
  }

  const clearQueue = () => {
    const newQueue = new Queue<string>(6)
    setQueue(newQueue)
    setheadIndex(null)
    setArrLetters([...basicState])
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handlerFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  
  return (
    <SolutionLayout title="Очередь">
        <form className={style.form} onSubmit={handlerFormSubmit}>
          <Input
            placeholder="Введите значение"
            min={1}
            value={inputValue || ""}
            maxLength={4}
            isLimitText={true}
            onChange={handleInput}
          />
          <Button
            disabled={
              !inputValue ||
              deleting ||
              arrLetters[arrLetters.length - 1].char !== "" ||
              arrLetters[arrLetters.length - 1].head === "head"
            }
            isLoader={adding}
            text="Добавить"
            type="button"
            onClick={() => enqueue()}
            data-cy="addBtn"
          />
          <Button
            isLoader={deleting}
            disabled={adding || headIndex === null}
            text="Удалить"
            type="button"
            onClick={() => dequeue()}
            data-cy="deleteBtn"
          />
          <Button
            extraClass={style.clearButton}
            disabled={adding || deleting || headIndex === null}
            text="Очистить"
            type="button"
            onClick={() => clearQueue()}
            data-cy="resetBtn"
          />
        </form>
        <ul className={style.circleList}>
          {arrLetters.map((char, index) => {
            return (
              <Circle
                state={char.state}
                letter={char.char}
                index={index}
                key={index}
                head={char.head}
                tail={char.tail}
              />
            )
          })}
        </ul>
    </SolutionLayout>
  )
}