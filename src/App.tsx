import React from 'react';
import './App.css';

class Timer extends React.Component {
  render() {
    const timer = 1000;
    return(
    <div>{timer}</div>
  );
  }
}

function App() {
  return (
    <div className="App">
      <input></input>
      <button onClick={() => console.log('click')}>start</button>
      <button>stop</button>
      <Timer />
    </div>
  );
}

export default App;
