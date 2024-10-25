"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSocket } from "@/hooks/useSocket";
import { GameDashboard } from "@/components/game-dashboard";
import { LandingPage } from "@/components/landing-page";

const avatars = [
  { id: 1, src: "/placeholder.svg?height=64&width=64", alt: "Avatar 1" },
  { id: 2, src: "/placeholder.svg?height=64&width=64", alt: "Avatar 2" },
  { id: 3, src: "/placeholder.svg?height=64&width=64", alt: "Avatar 3" },
  { id: 4, src: "/placeholder.svg?height=64&width=64", alt: "Avatar 4" },
];

const techInterests = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "nodejs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "tailwind", label: "Tailwind CSS" },
];

export function GamePage({ socket, setGameState }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [logos, setLogos] = useState([]);
  const [hoveredAvatar, setHoveredAvatar] = useState(null);

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

  const handleAvatarSelect = (id) => {
    setSelectedAvatar(id);
  };

  const handleInterestToggle = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const createGame = () => {
    console.log("create", socket);
    const create_game_message = {
      type: "CREATE_GAME",
      quizName: "QUIZZZ",
      questions: [
        {
          id: "1",
          text: "What is 2+2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1,
        },
        {
          id: "2",
          text: "What is 5+5?",
          options: ["10", "11", "12", "13"],
          correctAnswer: 0,
        },
        {
          id: "3",
          text: "What is 10+10?",
          options: ["24", "21", "20", "23"],
          correctAnswer: 2,
        },
      ],
    };
    if (socket) {
      socket.send(JSON.stringify(create_game_message));
    } else {
      console.log("msg not sent", create_game_message);
    }
  };

  const handleStartQuiz = () => {
    if (selectedAvatar === null) {
      console.log("Please select an avatar");
      return;
    }
    if (selectedInterests.length === 0) {
      console.log("Please select at least one tech interest");
      return;
    }
    createGame();
    setGameStateNew("InProgress");
  };

  const renderDashboardPage = () => {
    return (
      <GameDashboard
        socket={socket}
        setGameState={setGameState}
        gameState={gameStateNew}
      />
    );
  };

  const renderSelectPage = () => {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto p-4 max-w-2xl relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Select Your Avatar and Tech Interests
          </h1>

          <div className="mb-8 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Choose Your Avatar</h2>
            <div className="grid grid-cols-4 gap-4">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className="relative"
                  onMouseEnter={() => setHoveredAvatar(avatar.id)}
                  onMouseLeave={() => setHoveredAvatar(null)}
                >
                  <Avatar
                    className={`cursor-pointer w-16 h-16 transition-all duration-200 ${
                      selectedAvatar === avatar.id
                        ? "bg-primary text-white"
                        : hoveredAvatar === avatar.id
                        ? "bg-gray-700"
                        : "bg-gray-600"
                    }`}
                    onClick={() => handleAvatarSelect(avatar.id)}
                  >
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                    <AvatarFallback>{avatar.id}</AvatarFallback>
                  </Avatar>
                  {selectedAvatar === avatar.id && (
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3 text-primary"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">
              Select Your Tech Interests
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {techInterests.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={interest.id}
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={() => handleInterestToggle(interest.id)}
                    className="border-gray-400"
                  />
                  <Label htmlFor={interest.id} className="text-gray-200">
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-white hover:bg-gray-200 text-black font-semibold transition-colors duration-200"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    );
  };

  const renderLoginPage = () => {
    return <LandingPage session={session} setGameState={setGameState} />;
  };

  const renderGameContent = () => {
    switch (gameStateNew) {
      case "waiting":
        return renderSelectPage();
      case "InProgress":
        return renderDashboardPage();
      case "Finished":
        return (
          <>
            <h2>Game Over!</h2>
            {renderLeaderboard()}
          </>
        );
      default:
        return renderLoginPage();
    }
  };

  return <div>{renderGameContent()}</div>;
}
