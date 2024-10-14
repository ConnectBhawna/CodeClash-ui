import { BellRing, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

export function CardDemo({ className, ...props }) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-lg ">Welcome To </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-lg font-medium leading-none">
              Educate Detectives
            </p>
            <p className="text-sm text-muted-foreground">
              Test your movie knowledge, powered by AI!
            </p>
          </div>
          
        </div>
        
      </CardContent>
      <CardFooter>
        <Button className="flex gap-4 items-center flex-col sm:flex-row">
           Get Started
        </Button>
        <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md shadow hover:bg-primary/90">
           Sign in with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
export default CardDemo;
