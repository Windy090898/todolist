import React, { Component } from "react";

export default class TodoItem extends Component {
  render() {
    const { todos, handleItem, editIndex } = this.props;
    return todos.map((todo, index) => {
      return (
        <li
          className={`${todo.completed && "completed"} ${
            editIndex === index && "editing"
          }`}
          key={index}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                handleItem.toggleComplete(index);
              }}
            />
            <label onDoubleClick={() => handleItem.startEdit(index)}>{todo.title}</label>
            <button
              className="destroy"
              onClick={() => {
                handleItem.deleteItem(index);
              }}
            />
          </div>
          <input
            className="edit"
            defaultValue={todo.title}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleItem.endEdit(index, e.target.value);
              }
            }}
            onBlur={(e) => {
              handleItem.endEdit(index, e.target.value);
            }}
          />
        </li>
      );
    });
  }
}
