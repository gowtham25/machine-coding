import { useEffect, useState, useRef } from "react";
import './App.css';

const colorDetails = {
  red: {
    next: "yellow",
    duration: 10,
  },
  yellow: {
    next: "green",
    duration: 5,
  },
  green: {
    next: "red",
    duration: 15,
  },
};

export default function App() {
  const [activeColor, setActiveColor] = useState("red");
  const [colorInfo, setColorInfo] = useState(colorDetails);
  const [timeLeft, setTimeLeft] = useState(colorDetails.red.duration);

  let timerId = useRef();
  let intervalId = useRef();

  console.log(timerId.current, activeColor);
  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      clearTimeout(intervalId.current);
      timerId.current = null;
    }

    const duration = colorInfo[activeColor]?.duration || 0;
    setTimeLeft(duration);

    // Countdown interval
    intervalId.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId.current);
        }
        return prev - 1;
      });
    }, 1000);

    timerId.current = setTimeout(() => {
      setActiveColor(colorInfo?.[activeColor]?.next);
    }, duration * 1000);

    return () => clearTimeout(timerId.current);
  }, [activeColor, colorInfo]);

  const increaseTimer = (color) => {
    setColorInfo((prev) => {
      return {
        ...prev,
        [color]: {
          ...prev?.[color],
          duration: prev?.[color]?.duration + 1,
        },
      };
    });
  };

  const activateColor = (color) => {
    setActiveColor(color);
  };

  return (
    <div className="traffic-container">
      <div className="App">
        <div className={activeColor === "red" ? "light red" : "light"}>
          {" "}
          {activeColor === "red" ? timeLeft : ""}
        </div>
        <div className={activeColor === "yellow" ? "light yellow" : "light"}>
          {activeColor === "yellow" ? timeLeft : ""}
        </div>
        <div className={activeColor === "green" ? "light green" : "light"}>
          {activeColor === "green" ? timeLeft : ""}
        </div>
      </div>
      <div className="button-container">
        <button onClick={() => increaseTimer("red")}>Increase Red Timer</button>
        <button onClick={() => increaseTimer("yellow")}>
          Increase Yellow Timer
        </button>
        <button onClick={() => increaseTimer("green")}>
          Increase Green Timer
        </button>
      </div>

      <div className="button-container">
        <button onClick={() => activateColor("red")}>Activate Red</button>
        <button onClick={() => activateColor("yellow")}>Activate Yellow</button>
        <button onClick={() => activateColor("green")}>Activate Green</button>
      </div>
    </div>
  );
}

