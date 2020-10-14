import React from "react";

export default function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.highlight ? {background: "yellow", color: "red"} : null}>
      {props.value}
    </button>
  );
}
