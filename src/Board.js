import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(), // muss ich hier kein binding machen?/ func als props
      //target;,
      move: 0,
      // time:,
    };
    this.resetBtn = this.resetBtn.bind(this);
  }

  resetBtn() {
    this.setState({
      hasWon: false,
      board: this.createBoard(),
      move: 0,
      time: 0,
    });
  }

  createBoard() {
    let board = []; //weil hier row auch kommt, das Value wird hier x&y also zwei
    // wichtig hier in func: nested loop- loop in loop
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    this.setState((prevState) => ({
      move: prevState.move + 1,
    }));
    console.log("FLIPPING!", coord);
    let { ncols, nrows } = this.props; // nochmal .this eindeutiger machen.
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // let hasWon = false; //für hasWon ist das Wert benötigt //aber hier ist hardcoding, also ändere ich das
    let hasWon = board.every((row) => row.every((cell) => !cell)); //=false
    this.setState({ board: board, hasWon: hasWon });
  }

  render() {
    // warum hier: wenn der Benutzer Board hat, wird diese Message nicht angezeigt.
    if (this.state.hasWon) {
      return (
        <div className='Board-title'>
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!</span>
          </div>
        </div>
      );
    }

    // nochmal nested array & loop
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />,
        ); //hier statt this als parameter in flipcell- wegen arrow func
      }
      // console.log(row);
      tblBoard.push(<tr key={y}>{row}</tr>); //in table sollte row angezeigt werden.
    }
    return (
      <div>
        <div className='Game-container'>
          <div className='Board-title'>
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>Out</div>
          </div>
          <table className='Board'>
            <tbody>{tblBoard}</tbody>
          </table>
          <div className='Info-bar'>
            <p>Target:</p>
            <p>Moves: {this.state.move}</p>
            <p>Time:</p>
          </div>
          <div className='Intro-game'>
            <h2>How to play</h2>
            <p className='text'>
              The game consists of a 5 by 5 grid of lights. When the game
              starts, a random number or a stored pattern of these lights is
              switched on. Pressing any of the lights will toggle it and the
              adjacent lights. The goal of the puzzle is to switch all the
              lights off, preferably with as few button presses as possible.
              LightsOut is based on a deceptively simple concept. Clicking on a
              cell toggles that cell and each of its immediate neighbors. The
              goal is to turn out all the lights, ideally with the minimum
              number of clicks. There is a fairly easy method for solving the
              puzzles, but it will very rarely result in the minimum number of
              moves.
            </p>
            <button onClick={this.resetBtn}>new Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
