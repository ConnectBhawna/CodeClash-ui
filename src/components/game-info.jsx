"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//  Card,
//  CardContent,
//  CardFooter,
//  CardHeader,
//  CardTitle,
// } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Cpu,
  Database,
  Globe,
  Laptop,
  Server,
  Smartphone,
} from "lucide-react";

import { Button } from 'pixel-retroui';
import { Card } from 'pixel-retroui';

const techLogos = [Code, Cpu, Database, Globe, Laptop, Server, Smartphone];

function FloatingLogo({ Icon, initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const moveIcon = () => {
      setPosition((prev) => ({
        x: (prev.x + (Math.random() - 0.5) * 10 + 100) % 100,
        y: (prev.y + (Math.random() - 0.5) * 10 + 100) % 100,
      }));
      setRotation((prev) => (prev + Math.random() * 60 - 30) % 360);
    };

    const intervalId = setInterval(moveIcon, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Icon
      className="w-16 h-16 text-gray-600 opacity-20 absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        transition: "all 3s ease-in-out",
      }}
    />
  );
}

const gameInfo = [
  {
    title: "Welcome to Tech Quiz",
    content:
      "Test your knowledge on various tech topics with our AI-powered quiz game!",
  },
  {
    title: "How to Play",
    content:
      "Answer a series of multiple-choice questions. The faster you answer, the more points you earn!",
  },
  {
    title: "Topics Covered",
    content:
      "Programming languages, web technologies, databases, AI, and more. Challenge yourself across various tech domains!",
  },
  {
    title: "Difficulty Levels",
    content:
      "Choose from Beginner, Intermediate, or Expert difficulty to match your skill level.",
  },
  {
    title: "Scoring",
    content:
      "Earn points based on correct answers and speed. Compete with others on our global leaderboard!",
  },
  {
    title: "Ready to Start?",
    content:
      "Click 'Start Quiz' to begin your tech adventure. Good luck and have fun!",
  },
];

export function GameInfoComponent({ setProgressState }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [floatingLogos, setFloatingLogos] = useState([]);

  useEffect(() => {
    setFloatingLogos(
      techLogos.map((Icon, index) => ({
        Icon,
        position: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
      }))
    );
  }, []);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % gameInfo.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + gameInfo.length) % gameInfo.length);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 overflow-hidden">
      {floatingLogos.map((logo, index) => (
        <FloatingLogo
          key={index}
          Icon={logo.Icon}
          initialPosition={logo.position}
        />
      ))}
      <div className="w-full max-w-md">
        <Card className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden z-10">
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-center text-white">
              {gameInfo[currentCard].title}
            </h2>
            <p className="text-center text-white mt-4">
              {gameInfo[currentCard].content}
            </p>
            <div className="flex justify-between items-center mt-4 w-full">
              <Button
                variant="ghost"
                onClick={prevCard}
                disabled={currentCard === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <span className="text-sm text-white">
                {currentCard + 1} / {gameInfo.length}
              </span>
              <Button
                variant="ghost"
                onClick={nextCard}
                disabled={currentCard === gameInfo.length - 1}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
        <div className="mt-4 flex justify-center">
          <Button
            className="w-full"
            onClick={() => setProgressState("join_or_create")}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
