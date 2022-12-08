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
  var timer: number;
  timer = 1000;
  var timerId: NodeJS.Timer;
  return (
    <div className="App">
      <input type="number"
      value={time}
      onChange={(event) => setTime(Number(event.target.value))}/>
      <button onClick={
        () => {
          timer = time;
          timerId = setInterval(() => {
          setTime(t => t-1) }, 1000)}}>start</button>
      <button onClick={() => clearInterval(timerId)}>stop</button>
      <Timer time={time} />
    </div>
  );
}

export default App;
