import React, { Component } from "react";
import TodoItem from "./TodoItem";

export default class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={this.props.toggleAll}
          checked={this.props.todos.every(todo => todo.completed)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          <TodoItem
            todos={this.props.todos}
            editIndex={this.props.editIndex}
            handleItem={this.props.handleItem}
          />
        </ul>
      </section>
    );
  }
}
