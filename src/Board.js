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
    };
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    let board = []; //weil hier row auch kommt, das Value wird hier x&y also zwei
    // TODO: create array-of-arrays of true/false values
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

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    console.log("FLIPPING!", coord);
    let { ncols, nrows } = this.props; // nochmal .this eindeutiger machen.
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    //Flip initial cell
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    // let hasWon = false; //für hasWon ist das Wert benötigt //aber hier ist hardcoding, also ändere ich das
    let hasWon = board.every((row) => row.every((cell) => !cell)); //=false
    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    // warum hier: wenn der Benutzer Board hat, wird diese Message nicht angezeigt.
    // TODO
    if (this.state.hasWon) {
      return <h1>YOU WON!!!</h1>;
    }
    // make table board
    // TODO
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
        <div className='Board-title'>
          <div className='neon-orange'>Lights</div>
          <div className='neon-blue'>Out</div>
        </div>
        <table className='Board'>
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
