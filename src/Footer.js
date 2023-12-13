import React, { useContext } from "react";
import { StoreContext, clearComplete, filterTodo } from "./store";

export default function Footer() {
  const [state, dispatch] = useContext(StoreContext);
  const { todos, filter, filters } = state;
  console.log();
  let activeItem = todos.filter((todo) => !todo.completed).length;
  return (
    <footer className="footer">
      {/* This should be `0 items left` by default */}
      <span className="todo-count">
        <strong>{activeItem}</strong> item left
      </span>
      {/* Remove this if you don't implement routing */}
      <ul className="filters">
        {Object.keys(filters).map((key) => (
          <li key={key}>
            <a
              onClick={() => dispatch(filterTodo(key))}
              className={filter === key ? "selected" : undefined}
              href={`#/${key}`}
            >
              {key[0].toUpperCase() + key.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      {/* Hidden if no completed items are left ↓ */}
      {todos.length !== activeItem && (
        <button
          onClick={() => dispatch(clearComplete())}
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}
