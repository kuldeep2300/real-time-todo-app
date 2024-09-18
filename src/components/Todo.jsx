import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import "./Todo.css";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";

export const Todo = () => {
  const [task, setTask] = useState(getLocalStorageTodoData);

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    //? 1st validation - for empty input
    if (!content) return;
    
    //? 2nd validation - this will not work coz task contain data in the form of -> array of objects.
    // if (task.includes(inputValue)) return;
    const ifTodoContentMatched = task.find(
      (curTask) => curTask.content === content
    );
    if (ifTodoContentMatched) return;

    //? Updating array data with input values
    setTask((prevTask) => [...prevTask, { id, content, checked }]);
  };

  //todo Add data to localStorage
  setLocalStorageTodoData(task);
  

  //todo handleDeleteButton function ->  For Deleting an particular item from the todo list

  const handleDeleteButton = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  //todo handleClearTodoData -> For Clearing all the data of todo list

  const handleClearTodoData = () => {
    setTask([]);
  };

  //todo handleCheckedTodo functionality
  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });

    setTask(updatedTask);
  };

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <TodoDate />
      </header>

      <TodoForm onAddTodo={handleFormSubmit} />

      <section className="myUnOrdList">
        <ul>
          {task.map((curTask) => {
            return (
              <TodoList
                key={curTask.id}
                data={curTask.content}
                checked={curTask.checked}
                onHandleDeleteTodo={handleDeleteButton}
                onHandleCheckedTodo={handleCheckedTodo}
              />
            );
          })}
        </ul>
      </section>
      <section>
        <button className="clear-btn" onClick={handleClearTodoData}>
          Clear All
        </button>
      </section>
    </section>
  );
};
