"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);

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

  const handleStart = () => {
    setIsRunning(true);
    localStorage.setItem("timerIsRunning", "true");
  };

  const handlePause = () => {
    setIsRunning(false);
    localStorage.setItem("timerIsRunning", "false");
  };

  const handleReset = () => {
    setTimeLeft(20);
    setIsRunning(false);
    localStorage.setItem("timerTime", "20");
    localStorage.setItem("timerIsRunning", "false");
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-bold mb-4">{timeLeft} seconds</h2>
        <div className="flex space-x-4">
          {!isRunning && timeLeft > 0 && (
            <Button onClick={handleStart}>Start</Button>
          )}
          {isRunning && <Button onClick={handlePause}>Pause</Button>}
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}
