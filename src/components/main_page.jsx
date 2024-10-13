'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

export function MovieQuizCard() {
  return (
    (<Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 text-center">
        <p className="text-lg text-gray-600">Welcome to</p>
        <h1 className="text-3xl font-bold mt-2 mb-4">Our Educate Detectives</h1>
        <p className="text-gray-600 mb-6">Test your movie knowledge, powered by AI</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" variant="default">Get Started</Button>
        <Button className="w-full" variant="outline">
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </CardFooter>
    </Card>)
  );
}