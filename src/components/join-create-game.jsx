"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Users } from "lucide-react"

export function JoinCreateGame() {
  const [progressState, setProgressState] = useState("idle")

  return (
    (<Card className="w-full max-w-md overflow-hidden">
      <CardContent
        className="p-6 bg-gradient-to-br from-violet-500 to-purple-700 text-white">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-3xl font-bold text-center mb-2">Join or Create a Game</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Button
              variant="secondary"
              size="lg"
              className="w-full bg-white text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setProgressState("create")}>
              <Gamepad2 className="mr-2 h-5 w-5" />
              Create a Game
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full bg-white text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setProgressState("join")}>
              <Users className="mr-2 h-5 w-5" />
              Join a Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>)
  );
}