import React from "react";
import { useEffect, useState } from "react";
import "./index.css";


const getPadTimes = (time) => time.toString().padStart(2, '0');

function App () {
  const [timeLeft, setTimeLeft] = useState(2 *60);
  const [isCounting, setIsCounting] = useState(false);

  const minutes = getPadTimes(Math.floor(timeLeft / 60));
  const seconds= getPadTimes(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
       setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft -1 : 0));
    },1000);
    if (timeLeft === 0) setIsCounting(false);
    return () => {
      clearInterval(interval);
    }
  },[timeLeft, isCounting]);

  const handleStart = () => {
    if (timeLeft === 0) setTimeLeft(2 *60);
    setIsCounting(true);
  };

  const handleStop = () => {
    setIsCounting(false);
  };

  const handleReset = () => {
    setIsCounting(false);
    setTimeLeft(2 *60)
  };


  return (
    <div className="app">
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="button">
        {isCounting ? 
          (<button onClick={handleStop}>stop</button>) 
            : 
          (<button onClick={handleStart}>start</button>) 
        }
        
        <button onClick={handleReset}>reset</button>
        
      </div>
    </div>
  )

}

export default App;