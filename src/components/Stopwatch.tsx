import { FC, useRef, useState } from "react";

const Stopwatch: FC = () => {
  const [startTime, setStartTime] = useState<number>(0);
  const [nowTime, setNowTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const [lap, setLap] = useState<number>(0);

  const handleStart = () => {
    setStartTime(Date.now());
    setNowTime(Date.now());

    if (intervalRef !== null) clearInterval(intervalRef.current!);

    intervalRef.current = setInterval(() => {
      setNowTime(Date.now());
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
  };

  const handleClear = () => {
    if (intervalRef.current === null) {
      setStartTime(Date.now());
      setNowTime(Date.now());
    } else {
      alert("Please stop before clearing!");
    }
  };

  const handleLap = () => {
    setLap(Number(((nowTime - startTime) / 1000).toFixed(1)));
  };

  let runningTime: number = 0;
  if (startTime && nowTime) runningTime = (nowTime - startTime) / 1000;

  return (
    <div>
      <span>Running Time: {runningTime.toFixed(1)} </span>
      <div>Lap: {lap}</div>
      <div>
        <button onClick={handleStart}>Start</button>{" "}
        <button onClick={handleStop}>Stop</button>{" "}
        <button onClick={handleClear}>Clear</button>{" "}
        <button onClick={handleLap}>Lap</button>
      </div>
    </div>
  );
};

export default Stopwatch;
