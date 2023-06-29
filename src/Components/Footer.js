import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        {/* This should be `0 items left` by default */}
        <span className="todo-count">
          <strong>{this.props.itemActive}</strong> item left
        </span>
        {/* Remove this if you don't implement routing */}
        <ul className="filters">
          {Object.keys(this.props.filters).map((key) => {
            return (
              <li>
                <a
                  className={this.props.filter === key && "selected"}
                  href="#"
                  onClick={this.props.filters[key]}
                >
                  {key[0].toUpperCase() + key.slice(1)}
                </a>
              </li>
            );
          })}
        </ul>
        {/* Hidden if no completed items are left ↓ */}
        {this.props.itemComplete > 0 && (
          <button
            className="clear-completed"
            onClick={this.props.clearComplete}
          >
            Clear completed
          </button>
        )}
      </footer>
    );
  }
}
