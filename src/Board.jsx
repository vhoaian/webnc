import React from "react";
import Square from "./Square";

export default function Board(props) {
  const renderSquare = i => {
    return (
      <Square
        value={props.squares[i]}
        highlight={props.highlight[i]}
        onClick={() => props.onClick(i)}
        key={i}
      />
    );
  }

  const rows = [];
  for (let i = 0; i < 3; i++) {
    const squares = [];
    for (let j = 0; j < 3; j++) {
      squares.push(renderSquare(i*3 + j))
    }
    rows.push(<div className="board-row" key={i}>{squares}</div>);
  }
  return (
    <div>{rows}</div>
  );
}
