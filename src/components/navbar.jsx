"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  User,
  X,
  Home,
  Info,
  FileText,
  Video,
  Bird,
  Github,
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "About", icon: Info },
    { name: "Overview", icon: FileText },
    { name: "Introduction Video", icon: Video },
    { name: "Redpanda Overview", icon: Bird },
    { name: "Github Backend", icon: Github },
    { name: "Github Frontend", icon: Github },
  ];

  return (
    <nav className="w-full relative bg-opacity-50 flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "w-80" : "w-12"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="z-20 transition-transform duration-200 ease-in-out hover:scale-110"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>
      <div className="text-lg font-semibold">Tech Quiz App</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="transition-transform duration-200 ease-in-out hover:scale-110"
          >
            <User className="h-6 w-6" />
            <span className="sr-only">User profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-primary/20 backdrop-blur-lg border-primary/10"
        >
          <DropdownMenuItem className="focus:bg-primary/30">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Card
        className={`absolute top-full left-0 mt-2 w-72 bg-primary/20 backdrop-blur-lg border-primary/10 shadow-lg rounded-lg overflow-hidden z-10 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 ml-4"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="py-4 space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="px-3">
              <Button
                variant="ghost"
                className="w-full text-left px-4 py-2 hover:bg-primary/30 hover:text-primary-foreground transition-colors duration-200 ease-in-out rounded-md flex items-center space-x-3"
                onClick={() => {
                  console.log(`Clicked on ${item.name}`);
                  setIsOpen(false);
                }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-grow">{item.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </nav>
  );
}
