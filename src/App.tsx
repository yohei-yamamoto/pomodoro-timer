import React, {useState} from 'react';
import './App.css';
import timerSound from './Timer.mp3';

type Props = {
  time: number
}

const Timer:React.FC<Props> = (props) => {
  return(
    <div>{props.time}</div>
  );
}

function playSound() {
  const audio = new Audio(timerSound);
  audio.play()
}

function App() {
  const [inputTime, setInputTime] = useState(10);
  const [counter, setCounter] = useState(10);
  const [isTimerCounting, setIsTimerCounting] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [timeoutId, setTimeoutId] = useState(0);
  var interval: NodeJS.Timer
  var timeout: NodeJS.Timeout
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
          if (counter === 0 ) setCounter(inputTime)
          if(isTimerCounting === false && counter > 0) {
            interval = setInterval(() => setCounter(t => t-1), 1000)
            setIntervalId(Number(interval))
            setIsTimerCounting(true)
            timeout = setTimeout(() => {
              playSound()
              clearInterval(interval)
              setIsTimerCounting(false)
            }, counter * 1000)
            setTimeoutId(Number(timeout))
          }
        }
      }>start</button>
      <button onClick={() => {
        if(isTimerCounting === true) {
          clearInterval(intervalId)
          clearTimeout(timeoutId)
          setIsTimerCounting(false)
        }}}>stop</button>
      <Timer time={counter} />
    </div>
  );
}

export default App;
