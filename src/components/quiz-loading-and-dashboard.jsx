'use client'

import { useEffect, useState } from 'react'
import { GameDashboard } from './game-dashboard';

const logoUrls = [
  "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
  "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png",
  "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/angular/angular.png",
  "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png",
  "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png",
  "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/tailwind/tailwind.png",
]

export function QuizLoadingAndDashboardComponent() {
  const [logos, setLogos] = useState([])
  const [dots, setDots] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const newLogos = logoUrls.map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.3 + Math.random() * 0.5,
      size: 30 + Math.random() * 40,
    }))
    setLogos(newLogos)

    const moveLogos = () => {
      setLogos(prevLogos =>
        prevLogos.map(logo => ({
          ...logo,
          y: (logo.y + logo.speed) % 100,
        })))
    }

    const logoInterval = setInterval(moveLogos, 50)

    const updateDots = () => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }

    const dotsInterval = setInterval(updateDots, 500)

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsLoading(false)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      clearInterval(logoInterval)
      clearInterval(dotsInterval)
      clearInterval(timer)
    };
  }, [])

  if (isLoading) {
    return (
      (<div
        className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex items-center justify-center">
        {logos.map(logo => (
          <img
            key={logo.id}
            src={logoUrls[logo.id]}
            alt={`Tech logo ${logo.id + 1}`}
            className="absolute opacity-10 transition-all duration-1000 ease-in-out"
            style={{
              left: `${logo.x}%`,
              top: `${logo.y}%`,
              transform: 'translate(-50%, -50%)',
              width: `${logo.size}px`,
              height: `${logo.size}px`,
            }} />
        ))}
        <div className="z-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Preparing Your Quiz</h1>
          <p className="text-xl mb-4">
            Questions are getting ready by the AI to assess your knowledge{dots}
          </p>
          <p className="text-lg mb-8">Redirecting to dashboard in {timeLeft} seconds</p>
          <div className="inline-block">
            <svg
              className="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>)
    );
  }

  return (
    (<div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto mt-8 p-4">
        <GameDashboard/>
      </main>
    </div>)
  );
}
export default QuizLoadingAndDashboardComponent;