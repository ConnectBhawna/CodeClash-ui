"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Gamepad2, Zap } from "lucide-react";
import { useEffect } from "react";

export function RetroQuizList({ socket, currentGames, setProgressState }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ type: "LIST_GAMES" }));
    }
  }, []);

  const joinGame = (id) => {
    socket.send(JSON.stringify({ type: "JOIN_GAME", quizId: id }));
    setProgressState("waiting");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-yellow-300 mb-8 retro-shadow">
          Retro Quiz Arena
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentGames?.map((game) => (
            <Card
              key={game.quizId}
              className={`retro-card transform transition-all duration-300 ${
                hoveredCard === game.quizId ? "scale-105 rotate-1" : ""
              }`}
              onMouseEnter={() => setHoveredCard(game.quizId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-300 retro-text">
                  {game.quizName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <Gamepad2 className="w-5 h-5 mr-2 text-green-400" />
                  <span className="text-green-400">
                    Admin: {game.admin.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="text-blue-400">
                    Players: {game.players?.length}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full retro-button"
                  onClick={() => joinGame(game.quizId)}
                >
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
