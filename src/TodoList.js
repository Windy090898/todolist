import React, { useContext } from "react";
import {
  StoreContext,
  changeEditIndex,
  deleteTodo,
  setTodo,
  toggleComplete,
  updateTodo,
} from "./store";

export default function TodoList() {
  const [state, dispatch] = useContext(StoreContext);
  const { todos, editIndex } = state;
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            className={`${todo.completed ? "completed" : undefined} ${
              editIndex === index ? "editing" : undefined
            }`}
            key={index}
          >
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                defaultChecked={todo.completed}
                onClick={() => {
                  dispatch(toggleComplete(index));
                }}
              />
              <label onDoubleClick={() => dispatch(changeEditIndex(index))}>
                {todo.value[0].toUpperCase() + todo.value.slice(1)}
              </label>
              <button
                onClick={() => dispatch(deleteTodo(index))}
                className="destroy"
              />
            </div>
            <input
              onKeyUp={(e) => e.key === 'Enter' && dispatch(updateTodo(e.target.value))}
              className="edit"
              defaultValue={todo.value[0].toUpperCase() + todo.value.slice(1)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
