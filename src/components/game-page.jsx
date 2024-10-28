"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card , Button  } from 'pixel-retroui';

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

export function GamePage({ socket, setProgressState }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [hoveredAvatar, setHoveredAvatar] = useState(null);

  const handleAvatarSelect = (id) => {
    setSelectedAvatar(id);
  };

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
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto p-4 max-w-2xl relative z-10">
          <Card className="mb-8 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Select Your Avatar and Tech Interests
            </h1>
    
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Choose Your Avatar</h2>
              <div className="grid grid-cols-4 gap-4">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className="relative"
                    onMouseEnter={() => setHoveredAvatar(avatar.id)}
                    onMouseLeave={() => setHoveredAvatar(null)}
                    onClick={() => handleAvatarSelect(avatar.id)}
                    className={`cursor-pointer w-16 h-16 transition-all duration-200 ${
                      selectedAvatar === avatar.id
                        ? "bg-primary text-white"
                        : hoveredAvatar === avatar.id
                        ? "bg-gray-700"
                        : "bg-gray-600"
                    }`}
                  >
                    <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover rounded-full" />
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
    
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Select Your Tech Interests
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {techInterests.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-3">
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