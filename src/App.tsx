import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.css';
import timerSound from './Timer.mp3';

type Props = {
  time: number
}

const Timer:React.FC<Props> = (props) => {
  return(
    <div className="Timer">{Math.floor(props.time / 60)}:{(props.time % 60).toString().padStart(2, "0")}</div>
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
      <div>
        <TextField type="number"
        value={inputTimeMinites}
        onChange={(event) => {
          setInputTimeMinites(Number(event.target.value))
          setCounter(Number(event.target.value) * 60 + inputTimeSeconds)
          if (isTimerCounting) {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
            setIsTimerCounting(false)
          }
        }}
        variant="standard"
        label="分"/>
        <TextField type="number"
        value={inputTimeSeconds}
        onChange={(event) => {
          setInputTimeSeconds(Number(event.target.value))
          setCounter(inputTimeMinites * 60 + Number(event.target.value))
          if (isTimerCounting) {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
            setIsTimerCounting(false)
          }
        }}
        variant="standard"
        label="秒"/>
      </div>
      <Button onClick={
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
      }
      variant="outlined">start</Button>
      <Button onClick={() => {
        if(isTimerCounting === true) {
          clearInterval(intervalId)
          clearTimeout(timeoutId)
          setIsTimerCounting(false)
        }}}
        variant="outlined">stop</Button>
      <Timer time={counter} />
    </div>
  );
}

export default App;
