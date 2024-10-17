'use client'
import Link from "next/link";
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Code, Cpu, Database, Globe, Laptop, Server, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation";

const techLogos = [Code, Cpu, Database, Globe, Laptop, Server, Smartphone]

function FloatingLogo({ Icon, initialPosition }) {
  const [position, setPosition] = useState(initialPosition)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const moveIcon = () => {
      setPosition(prev => ({
        x: (prev.x + (Math.random() - 0.5) * 10 + 100) % 100,
        y: (prev.y + (Math.random() - 0.5) * 10 + 100) % 100
      }))
      setRotation(prev => (prev + Math.random() * 60 - 30) % 360)
    }

    const intervalId = setInterval(moveIcon, 3000)
    return () => clearInterval(intervalId);
  }, [])

  return (
    (<Icon
      className="w-16 h-16 text-gray-600 opacity-20 absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        transition: 'all 3s ease-in-out'
      }} />)
  );
}

const gameInfo = [
  {
    title: "Welcome to Tech Quiz",
    content: "Test your knowledge on various tech topics with our AI-powered quiz game!"
  },
  {
    title: "How to Play",
    content: "Answer a series of multiple-choice questions. The faster you answer, the more points you earn!"
  },
  {
    title: "Topics Covered",
    content: "Programming languages, web technologies, databases, AI, and more. Challenge yourself across various tech domains!"
  },
  {
    title: "Difficulty Levels",
    content: "Choose from Beginner, Intermediate, or Expert difficulty to match your skill level."
  },
  {
    title: "Scoring",
    content: "Earn points based on correct answers and speed. Compete with others on our global leaderboard!"
  },
  {
    title: "Ready to Start?",
    content: "Click 'Start Quiz' to begin your tech adventure. Good luck and have fun!"
  }
]

export function GameInfoComponent() {
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState(0)
  const [floatingLogos, setFloatingLogos] = useState([])

  useEffect(() => {
    setFloatingLogos(techLogos.map((Icon, index) => ({
      Icon,
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100
      }
    })))
  }, [])

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % gameInfo.length)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + gameInfo.length) % gameInfo.length)
  }

  return (
    (<div
      className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 overflow-hidden">
      {floatingLogos.map((logo, index) => (
        <FloatingLogo key={index} Icon={logo.Icon} initialPosition={logo.position} />
      ))}
      <div className="w-full max-w-md">
        <Card
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm text-white border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{gameInfo[currentCard].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">{gameInfo[currentCard].content}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button variant="ghost" onClick={prevCard} disabled={currentCard === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm">
              {currentCard + 1} / {gameInfo.length}
            </span>
            <Button
              variant="ghost"
              onClick={nextCard}
              disabled={currentCard === gameInfo.length - 1}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 flex justify-center">
          <Button className="w-full" onClick={()=>router.push("/dashboard")} >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>)
  );
}
export default GameInfoComponent;