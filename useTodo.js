import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || []
}
export const useTodo = (initialState = []) => {

  const[todos, dispatch] = useReducer(todoReducer, initialState, init)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleNewTodo = (todo)  => {
    console.log(todo)
    const action = {
      type: 'add',
      payload: todo
    }

    dispatch(action)
  }

  const handleDeleteTodo = (id) => {
    const action = {
      type: 'delete',
      payload: id
    }

    dispatch(action)
  }

  const handleToggleTodo = (id) => {
    console.log(id)
    const action = {
      type: 'toggle',
      payload: id
    }

    dispatch(action)
  }

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleDeleteTodo,
    handleToggleTodo,
    handleNewTodo
  }
}