"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Gamepad2, Zap } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";

// Simulated quiz game data
const quizGames = [
  { id: 1, admin: "PixelMaster", participants: 4, topic: "80s Pop Culture" },
  { id: 2, admin: "RetroGuru", participants: 6, topic: "Classic Video Games" },
  { id: 3, admin: "SynthWave", participants: 3, topic: "Retro Music" },
  { id: 4, admin: "NeonNinja", participants: 5, topic: "90s Movies" },
  { id: 5, admin: "ByteBoss", participants: 2, topic: "Computer History" },
];

export function RetroQuizList({ socket, setGameState }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [msg, setMsg] = useState([]);
  const [gameStateNew, setGameStateNew] = useState("waiting");

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log(message);
      // if (message.gameState) {
      //   // setGameState(message.gameState);
      //   if (message.gameState[0]?.questions.length > 0) {
      //     setQuestions(message.gameState[0].questions);
      //   }
      // }

      setMsg((prev) => [...prev, message]);
    };
    console.log(msg);
    console.log("socket", socket);

    return () => {
      socket.onmessage = null; // Clean up the previous handler
    };
  }, [socket]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-yellow-300 mb-8 retro-shadow">
          Retro Quiz Arena
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizGames.map((game) => (
            <Card
              key={game.id}
              className={`retro-card transform transition-all duration-300 ${
                hoveredCard === game.id ? "scale-105 rotate-1" : ""
              }`}
              onMouseEnter={() => setHoveredCard(game.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-300 retro-text">
                  {game.topic}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <Gamepad2 className="w-5 h-5 mr-2 text-green-400" />
                  <span className="text-green-400">Admin: {game.admin}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="text-blue-400">
                    Players: {game.participants}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full retro-button">
                  <Zap className="w-4 h-4 mr-2" />
                  Join Game
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
