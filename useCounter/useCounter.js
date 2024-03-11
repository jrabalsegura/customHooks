import { useState } from "react"


export const useCounter = (initialValue = 10) => {

  const [counter, setCounter] = useState(initialValue);

  return {
    counter,
    increment: (e, value = 1) => setCounter(counter + value),
    decrement: (e, value = 1) => setCounter(counter - value),
    reset: () => setCounter(initialValue)
  }
}