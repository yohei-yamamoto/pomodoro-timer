import React, {useState} from 'react';
import './App.css';
import timerSound from './Timer.mp3';

type Props = {
  time: number
}

const Timer:React.FC<Props> = (props) => {
  return(
    <div>{Math.floor(props.time / 60)}:{(props.time % 60).toString().padStart(2, "0")}</div>
  );
}

function playSound() {
  const audio = new Audio(timerSound);
  audio.play()
}

function App() {
  const [inputTimeMinites, setInputTimeMinites] = useState(10);
  const [inputTimeSeconds, setInputTimeSeconds] = useState(10);
  const [counter, setCounter] = useState(610);
  const [isTimerCounting, setIsTimerCounting] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [timeoutId, setTimeoutId] = useState(0);
  var interval: NodeJS.Timer
  var timeout: NodeJS.Timeout
  return (
    <div className="App">
      <input type="number"
      value={inputTimeMinites}
      onChange={(event) => {
        setInputTimeMinites(Number(event.target.value))
        setCounter(Number(event.target.value) * 60 + inputTimeSeconds)
      }}/>分
      <input type="number"
      value={inputTimeSeconds}
      onChange={(event) => {
        setInputTimeSeconds(Number(event.target.value))
        setCounter(inputTimeMinites * 60 + Number(event.target.value))
      }}/>秒
      <button onClick={
        () => {
          if (counter === 0 ) setCounter(inputTimeMinites * 60 + inputTimeSeconds)
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
