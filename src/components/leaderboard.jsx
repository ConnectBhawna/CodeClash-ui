"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const Card = dynamic(() => import('pixel-retroui').then(mod => mod.Card), { ssr: false });
const Button = dynamic(() => import('pixel-retroui').then(mod => mod.Button), { ssr: false });

const mockLeaderboardData = [
  { id: 1, name: "Alice", score: 1200 },
  { id: 2, name: "Bob", score: 1100 },
  { id: 3, name: "Charlie", score: 1000 },
  { id: 4, name: "David", score: 900 },
  { id: 5, name: "Eve", score: 800 },
];

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    setLeaderboard(mockLeaderboardData);
  }, []);

  const refreshLeaderboard = () => {
    setLeaderboard(mockLeaderboardData.map(user => ({
      ...user,
      score: user.score + Math.floor(Math.random() * 100)
    })));
  };

  const getTrophyIcon = (index) => {
    if (index === 0) {
      return <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />;
    } else if (index === 1) {
      return <FontAwesomeIcon icon={faTrophy} className="text-gray-500" />;
    } else if (index === 2) {
      return <FontAwesomeIcon icon={faTrophy} className="text-yellow-700" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Leaderboard</h1>
        <div className="mb-6">
          {leaderboard.map((user, index) => (
            <div key={user.id} className="flex justify-between items-center p-2 border-b border-gray-700 text-white">
              <div className="flex items-center space-x-2">
                {getTrophyIcon(index)}
                <span>{user.name}</span>
              </div>
              <span>{user.score}</span>
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-white hover:bg-gray-200 text-black font-semibold transition-colors duration-200"
          onClick={refreshLeaderboard}
        >
          Refresh Leaderboard
        </Button>
      </Card>
    </div>
  );
}