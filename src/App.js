import "./base.css";
import "./index.css";
import { useContext, useRef } from "react";
import { StoreContext, addTodo, setTodo, storageGet } from "./store";
import TodoList from "./TodoList";
import Footer from "./Footer";

function App() {
  const [state, dispatch] = useContext(StoreContext);
  const { todos, todoItem, storageTodos } = state;
  const {value, completed} = todoItem;

  const inputRef = useRef();

  const handleAdd = (value) => {
    dispatch(addTodo({...todoItem, value}));
    dispatch(setTodo(""));
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <header className="header">
        <h1>todos</h1>
        <input
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={value}
          onChange={(e) => dispatch(setTodo(e.target.value))}
          onKeyUp={(e) => e.key === "Enter" && handleAdd(e.target.value)}
        />
      </header>

      {storageGet().length > 0 && <TodoList />}
      {storageGet().length > 0 && <Footer />}

    </div>
  );
}

export default App;
