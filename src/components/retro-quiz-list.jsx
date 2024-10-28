"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "pixel-retroui";
import { Users, Gamepad2, Zap } from "lucide-react";

export function RetroQuizList({ socket, currentGames, setProgressState }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ type: "LIST_GAMES" }));
    }
  }, [socket]);

  const joinGame = (id) => {
    socket.send(JSON.stringify({ type: "JOIN_GAME", quizId: id }));
    setProgressState("waiting");
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Select a Quiz to Join
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
          {currentGames?.map((game) => (
            <Card
              key={game.quizId}
              className={`retro-card transform transition-all duration-300 ${
                hoveredCard === game.quizId ? "scale-105 rotate-1" : ""
              }`}
              onMouseEnter={() => setHoveredCard(game.quizId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-4 flex flex-col items-center gap-1">
                <h2 className="text-2xl font-bold text-purple-300 retro-text">
                  {game.quizName}
                </h2>
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
                <Button
                  className="w-fit flex px-2 items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 mt-4"
                  onClick={() => joinGame(game.quizId)}
                >
                  Join Game
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
