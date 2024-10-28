"use client";

import { useEffect } from "react";

export default function Component({
  isRunning,
  timeLeft,
  setTimeLeft,
  setIsRunning,
}) {
  useEffect(() => {
    // Retrieve the saved time from localStorage
    const savedTime = localStorage.getItem("timerTime");
    const savedIsRunning = localStorage.getItem("timerIsRunning");

    if (savedTime) {
      setTimeLeft(parseInt(savedTime, 10));
    }

    if (savedIsRunning === "true") {
      setIsRunning(true);
    }
  }, []);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timerTime", newTime.toString());
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      localStorage.removeItem("timerTime");
      localStorage.removeItem("timerIsRunning");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  return <>{timeLeft}</>;
}
