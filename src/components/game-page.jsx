"use client";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card , Button  } from 'pixel-retroui';


const techInterests = [
  { id: "javascript", label: "Javascript" },
  { id: "go", label: "Go" },
  { id: "c", label: "C" },
  { id: "rust", label: "Rust" },
  { id: "python", label: "Python" },
  { id: "csharp", label: "C#" },
];

export function GamePage({ socket, setProgressState }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

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
      <div>
        <div className="max-w-lg w-full bg-gray-800 bg-opacity">
          <Card className="mb-8 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm">
    
            <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
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