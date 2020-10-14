import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        highlight={this.props.highlight[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  render() {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const squares = [];
      for (let j = 0; j < 3; j++) {
        squares.push(this.renderSquare(i*3 + j))
      }
      rows.push(<div className="board-row" key={i}>{squares}</div>);
    }
    return (
      <div>{rows}</div>
    );
  }
}
