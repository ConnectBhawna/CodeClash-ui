"use client";
import { useState, useEffect } from "react";
import { Card, Button } from "pixel-retroui";
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

const techInterests = [
  { id: "javascript", label: "Javascript" },
  { id: "go", label: "Go" },
  { id: "c", label: "C" },
  { id: "rust", label: "Rust" },
  { id: "python", label: "Python" },
  { id: "csharp", label: "C#" },
];
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

export function GamePage({ socket, setProgressState }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
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

  const handleInterestToggle = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const createGame = async () => {
    console.log("create", socket);

    const questions = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: selectedInterests.join(" and "),
        count: 10,
      }),
    }).then((res) => res.json());

    console.log("ques", questions);

    const create_game_message = {
      type: "CREATE_GAME",
      quizName: "QUIZZZ",
      questions: questions.data,
    };

    if (socket) {
      socket.send(JSON.stringify(create_game_message));
      setProgressState("waiting");
    } else {
      console.log("msg not sent", create_game_message);
    }
  };

  const renderSelectPage = () => {
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 overflow-hidden">
        {floatingLogos.map((logo, index) => (
          <FloatingLogo
            key={index}
            Icon={logo.Icon}
            initialPosition={logo.position}
          />
        ))}
        <div className="max-w-lg w-full bg-gray-800 bg-opacity">
          <Card className="mb-8 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Select Your Tech Interests
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {techInterests.map((interest) => (
                  <div
                    key={interest.id}
                    className="flex items-center space-x-3"
                  >
                    <input
                      type="checkbox"
                      id={interest.id}
                      checked={selectedInterests.includes(interest.id)}
                      onChange={() => handleInterestToggle(interest.id)}
                      className="border-gray-400"
                    />
                    <label htmlFor={interest.id} className="text-gray-200">
                      {interest.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-white hover:bg-gray-200 text-black font-semibold transition-colors duration-200"
              onClick={() => createGame()}
            >
              Start Quiz
            </Button>
          </Card>
        </div>
      </div>
    );
  };

  return <div>{renderSelectPage()}</div>;
}
