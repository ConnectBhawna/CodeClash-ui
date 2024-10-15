"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { User, Code, FileJson, Database, Globe, Server, Lock } from "lucide-react"

const avatars = [
  { id: 1, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 1" },
  { id: 2, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 2" },
  { id: 3, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 3" },
  { id: 4, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 4" },
  { id: 5, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 5" },
  { id: 6, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 6" },
]

const techInterests = [
  { id: "javascript", label: "JavaScript", icon: Code },
  { id: "typescript", label: "TypeScript", icon: FileJson },
  { id: "react", label: "React", icon: Code },
  { id: "nodejs", label: "Node.js", icon: Server },
  { id: "databases", label: "Databases", icon: Database },
  { id: "webdev", label: "Web Development", icon: Globe },
  { id: "security", label: "Cybersecurity", icon: Lock },
  { id: "api", label: "API Development", icon: Server },
]

export function AvatarInterestSelectionComponent() {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [selectedInterests, setSelectedInterests] = useState([])

  const handleAvatarSelect = (id) => {
    setSelectedAvatar(id)
  }

  const handleInterestToggle = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Selected Avatar:", selectedAvatar)
    console.log("Selected Tech Interests:", selectedInterests)
    // In a real application, you would send this data to your backend
    // and then redirect to the main quiz page or show a success message
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-8">
      <div className="container mx-auto max-w-2xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Customize Your Tech Quiz Experience</CardTitle>
            <CardDescription className="text-center">Choose your avatar and tech interests</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Select Your Avatar</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {avatars.map((avatar) => (
                      <Avatar
                        key={avatar.id}
                        className={`w-20 h-20 cursor-pointer transition-all ${
                          selectedAvatar === avatar.id
                            ? "ring-4 ring-indigo-500 ring-offset-2"
                            : "hover:ring-2 hover:ring-indigo-300 hover:ring-offset-1"
                        }`}
                        onClick={() => handleAvatarSelect(avatar.id)}>
                        <AvatarImage src={avatar.src} alt={avatar.alt} />
                        <AvatarFallback>
                          <User className="w-8 h-8 text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Select Your Tech Interests</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {techInterests.map((interest) => (
                      <div
                        key={interest.id}
                        className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => handleInterestToggle(interest.id)}>
                        <Checkbox
                          id={interest.id}
                          checked={selectedInterests.includes(interest.id)}
                          onCheckedChange={() => handleInterestToggle(interest.id)} />
                        <Label
                          htmlFor={interest.id}
                          className="flex items-center cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <interest.icon className="w-4 h-4 mr-2" />
                          {interest.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={!selectedAvatar || selectedInterests.length === 0}>
                  Start Tech Quizzing!
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}
export default AvatarInterestSelectionComponent;