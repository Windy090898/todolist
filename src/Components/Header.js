import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              this.props.addTask(e.target.value.trim())
              e.target.value = ""
            }
          }}
        />
      </header>
    );
  }
}
