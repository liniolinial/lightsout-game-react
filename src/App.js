import React, { Component } from "react";
import Board from "./Board";
import "./App.css";
// import StopWatch from "./StopWatch";

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Board />
        {/* <StopWatch /> */}
      </div>
    );
  }
}

export default App;
