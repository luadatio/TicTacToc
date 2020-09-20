import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      //each time a player makes move, xIsNext determines which player goes next and save the state of the game
      stepNumber: 0,
        xIsNext: true,
    };
  }

  //handleClick method
  handleClick(i) {
    // slice: create a copy of the squares array after every move; immutable objects are easier to detect changes
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = this.state.squares.slice();
    // ignores a click whenever some player has won the game
    if (calcaulateWinner(square) || squares[i]) {
      return;
    }
    // true: 'X'; false: 'O'
    square[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      //use concat because it does not change the existing arrays, but returns a new array
      history: history:concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo() {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 ) === 0;,
    });
  }

  render() {
    const history = this.state.history;
    // render the currently selected move
    const current = history[history.state.stepNumber];
    // calling the winner function to the Board's render function
    const winner = calcaulateWinner(current.squares);

    // represent the history of moves
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key ={move}>
          <button onClick()={()=> this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    }

    );

    let status;
    if(winner) {
      status = 'winner: ' + winner;
    } else {
      // displays which player has the next turn
      status = 'Next player: ' + (this.state.xIsNext? 'X': 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div> {}</div>
          <ol> {}</ol>
        </div>
      </div>
    );
  }

}

class Board extends React.Component{

  // state is stored in the Board component instead of square
  renderSquare(i) {
    return (
      <Square
      // receive squares and onClick props from the Game component
      value={this.props.squares[i]}
      onClick={() => this.props.handleClick(i)}
      />
    );
  }

  render() {
    return (
    <div>
      <div className = "status">{status}</div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
    </div>
  );
  }
}

// Square -> controlled component
// change from class to function component
function Square(props) {

// Square no longer keeps track of the game's state
// Square receives valeus from the Board and informt the Board when they're clicked
/*
  constructor(props) {
    super(props); // br
    this.props = {
      value: null,
    };
  }
*/


    return(
      <button
        className="square"
        // re-render Square whenever button is clicked;
        // replace the numbers with "X"
        // 'onClick' calls the function provided by the Board; onClick prop is specified by the board
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

//helper function for determining the winner of the game
function calcaulateWinner(squares) {
  // Winning combinations
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [6,7,8],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i <= lines.length-1; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] ===squares[c]) {
      return squares[a];
    }
  }
  return null;
}
