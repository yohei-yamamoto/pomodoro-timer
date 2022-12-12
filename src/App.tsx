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

function playSound() {
  const audioCtx = new window.AudioContext();
  const oscillator = audioCtx.createOscillator();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.5);
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
