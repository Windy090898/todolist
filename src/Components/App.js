import React, { Component } from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import Footer from "./Footer";
import "../css/index.css";
import "../css/base.css";
import { storage } from "./Storage";

export default class App extends Component {
  state = {
    todos: storage.get(),
    filter: "all",
    editIndex: null,
  };
  addTask = (title) => {
    this.setState(
      {
        todos: [...storage.get(), { title, completed: false }],
        filter: "all",
      },
      () => storage.set(this.state.todos)
    );
  };

  handleItem = {
    toggleComplete: (index) => {
      let newTodos = storage.get();
      newTodos[index].completed = !newTodos[index].completed;
      this.setState({ todos: newTodos }, () => storage.set(this.state.todos));
    },
    deleteItem: (index) => {
      storage.get().splice(index, 1);
      this.setState({ todos: storage.get() }, () =>
        storage.set(this.state.todos)
      );
    },
    startEdit: (index) => {
      this.setState({ editIndex: index });
    },
    endEdit: (index, title) => {
      let newTodos = storage.get();
      newTodos[index].title = title;
      this.setState({ todos: newTodos, editIndex: null }, () =>
        storage.set(this.state.todos)
      );
    },
  };
  toggleAll = () => {
    let newTodos = storage.get();
    newTodos.forEach((todo) => (todo.completed = true));
    this.setState({ todos: newTodos }, () => storage.set(this.state.todos));
  };
  clearComplete = () => {
    let activeTodos = storage.get().filter((todo) => todo.completed === false);
    this.setState({ todos: activeTodos }, () => storage.set(this.state.todos));
  };

  filters = {
    all: () => {
      this.setState({ todos: storage.get(), filter: "all" });
    },
    active: () => {
      this.setState({
        todos: storage.get().filter((todo) => !todo.completed),
        filter: "active",
      });
    },
    completed: () => {
      this.setState({
        todos: storage.get().filter((todo) => todo.completed),
        filter: "completed",
      });
    },
  };
  render() {
    return (
      <div>
        <Header addTask={this.addTask} />
        {storage.get().length > 0 && (
          <TodoList
            todos={this.state.todos}
            editIndex={this.state.editIndex}
            toggleAll={this.toggleAll}
            handleItem={this.handleItem}
          />
        )}
        {storage.get().length > 0 && (
          <Footer
            itemActive={
              this.state.todos.filter((todo) => !todo.completed).length
            }
            itemComplete={
              this.state.todos.filter((todo) => todo.completed).length
            }
            filters={this.filters}
            filter={this.state.filter}
            clearComplete={this.clearComplete}
          />
        )}
      </div>
    );
  }
}
