"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send, Trophy, MessageSquare, Zap } from "lucide-react"

const generateAIQuestion = () => {
  const questions = [
    "What is the capital of France?",
    "Who wrote 'Romeo and Juliet'?",
    "What is the chemical symbol for gold?",
    "In which year did World War II end?",
    "What is the largest planet in our solar system?"
  ]
  return questions[Math.floor(Math.random() * questions.length)];
}

const leaderboardData = [
  { name: "Alice", score: 1200, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Bob", score: 1050, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Charlie", score: 900, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "David", score: 850, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Eve", score: 800, avatar: "/placeholder.svg?height=32&width=32" }
]

const initialChatMessages = [
  { user: "Alice", message: "Good luck everyone!" },
  { user: "Bob", message: "This is fun!" },
  { user: "Charlie", message: "I'm ready for the next question!" }
]

export function GameDashboardComponent() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [chatMessages, setChatMessages] = useState(initialChatMessages)
  const [chatInput, setChatInput] = useState("")

  useEffect(() => {
    setQuestion(generateAIQuestion())
  }, [])

  const handleSubmitAnswer = (e) => {
    e.preventDefault()
    setScore(score + 100)
    setAnswer("")
    setQuestion(generateAIQuestion())
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { user: "You", message: chatInput }])
      setChatInput("")
    }
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div
        className="container mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">AI Quiz Game</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Brain className="h-8 w-8 text-purple-500" />
                AI-Generated Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold mb-6 animate-pulse">{question}</p>
              <form onSubmit={handleSubmitAnswer} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Your answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="flex-grow text-lg" />
                <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                  <Zap className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </form>
              <p className="mt-6 text-2xl font-bold text-purple-600">Your Score: {score}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {leaderboardData.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={player.avatar} alt={player.name} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <span className="font-bold text-purple-600">{player.score}</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MessageSquare className="h-6 w-6 text-blue-500" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] mb-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-purple-100"
                    }`}>
                    <span className="font-semibold text-purple-700">{msg.user}: </span>
                    <span>{msg.message}</span>
                  </div>
                ))}
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow" />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>)
  );
}
export default GameDashboardComponent;