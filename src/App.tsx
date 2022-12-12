import React, {useState} from 'react';
import './App.css';

type Props = {
  time: number
}

const Timer:React.FC<Props> = (props) => {
  return(
    <div>{props.time}</div>
  );
}

function App() {
  const [inputTime, setInputTime] = useState(100);
  const [counter, setCounter] = useState(100);
  const [isTimerCounting, setIsTimerCounting] = useState(false);
  const [timerId, setTimerId] = useState(0);
  var interval: NodeJS.Timer
  return (
    <div className="App">
      <input type="number"
      value={inputTime}
      onChange={(event) => {
        setInputTime(Number(event.target.value))
        setCounter(Number(event.target.value))
      }}/>
      <button onClick={
        () => {
          if(isTimerCounting === false) {
            interval = setInterval(() => setCounter(t => t-1), 1000)
            setTimerId(Number(interval))
            setIsTimerCounting(true)
          }
        }
      }>start</button>
      <button onClick={() => {
        if(isTimerCounting === true) {
          clearInterval(timerId)
          setIsTimerCounting(false)
        }}}>stop</button>
      <Timer time={counter} />
    </div>
  );
}

export default App;
