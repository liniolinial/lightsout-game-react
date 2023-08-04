// import React, { Component } from "react";

// function Stopwatch() {
//   const [laufendeZeit, setLaufendeZeit] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setLaufendeZeit((prevZeit) => prevZeit + 1);
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   const starteStoppuhr = () => {
//     setLaufendeZeit(0);
//   };

//   return (
//     <div>
//       <div>Laufende Zeit: {laufendeZeit} Sekunden</div>
//       <button onClick={starteStoppuhr}>Neustart</button>
//     </div>
//   );
// }

// export {StopWatch};

// import React, { Component } from "react";
// class StopWatch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       sec: 0,
//       min: 0,
//     };
//     // this.componentDidMount = this.componentDidMount.bind(this);
//   }

//   componentDidMount() {
//     this.sec = setInterval(() => {
//       this.setState((prevState) => ({
//         sec: prevState.sec + 1,
//       }));
//     }, 1000);
//   }

//   render() {
//     // const { time } = this.state;
//     return (
//       <div>
//         <div>Laufende Zeit: {this.state.sec}</div>
//       </div>
//     );
//   }
// }

// export default StopWatch;
