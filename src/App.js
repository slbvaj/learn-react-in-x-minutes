import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // const [todos, setTodos] = useState([
  //   {id: 1, name: 'Todo 1', complete: true},
  //   {id: 2, name: 'Todo 2', complete: false}
  // ])
  const [todos, setTodos] = useState([
    {id: 1, name: 'Todo 1', complete: true},
    {id: 2, name: 'Todo 2', complete: false}
  ])

  const todoNameRef = useRef()


  // Save and restore the todos to/from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Toggle the state of a todo
  // (always create a copy of the state - modify the copy - and set the new state from the copy
  function toggleTodo(id) {
    const newTodos = [...todos] // clone the todos
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Add a new todo
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name ==='') return // don't do anything if there isn't anything in the field
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos,{id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null // clear out the field after adding the todo to the list
  }

  // Clear all todos
  function handleClearCompletedTodos(e) {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearCompletedTodos}>Clear Complete</button>
    <div>{todos.filter(todo=> !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
