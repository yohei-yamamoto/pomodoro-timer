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
  const [time, setTime] = useState(100);
  const [isTimerCounting, setIsTimerCounting] = useState(false);
  const [timerId, setTimerId] = useState(0);
  var interval: NodeJS.Timer
  return (
    <div className="App">
      <input type="number"
      value={time}
      onChange={(event) => setTime(Number(event.target.value))}/>
      <button onClick={
        () => {
          if(isTimerCounting === false) {
            interval = setInterval(() => setTime(t => t-1), 1000)
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
      <Timer time={time} />
    </div>
  );
}

export default App;
