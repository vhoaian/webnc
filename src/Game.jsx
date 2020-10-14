import React, { Component } from "react";
import Board from "./Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getWinnersSquares(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const _squares = Array(9).fill(false);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      lines[i].forEach(index => _squares[index] = true);
    }
  }
  return _squares;
}

function findLocation(prevSquares, nextSquares) {
  let diffIndex;
  console.log(prevSquares, nextSquares)
  for (let index = 0; index < 9; index++) {
    if (prevSquares.squares[index] !== nextSquares.squares[index])
      diffIndex = index;
  }
  return [Math.floor(diffIndex / 3), diffIndex % 3];
}

function isDrawnGame(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) return false;
  }
  return true;
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      movesAreAscending: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  toggleMovesOrder() {
    this.setState(
      {
        movesAreAscending: !this.state.movesAreAscending
      });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const movesAreAscending = this.state.movesAreAscending;

    const moves = history.map((step, move) => {
      const [x, y] = move !== 0 ? findLocation(history[move-1], history[move]) : [null, null];
      const desc = move ?
        'Go to move #' + move + ` (${x}, ${y})` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{move === this.state.stepNumber ? <b>{desc}</b>: desc}</button>
        </li>
      );
    });
    if (!this.state.movesAreAscending)
      moves.reverse();

    let status;
    let highlight = Array(9).fill(false);
    if (winner) {
      status = 'Winner: ' + winner;
      highlight = getWinnersSquares(current.squares);
    } else {
      if (isDrawnGame(current.squares))
        status = 'Draw';
      else
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            highlight={highlight}
          />
        </div>
        <div className="game-info">
          <div>
            {status}
          </div>
          <div>
            <button onClick={() => this.toggleMovesOrder()}>
              Toggle moves' order
            </button>
          </div>
          {movesAreAscending ? <ol>{moves}</ol> : <ol reversed>{moves}</ol>}
        </div>
      </div>
    );
  }
}
