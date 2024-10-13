"use client"

import Link from "next/link"
import { useState } from "react"
import { BarChart2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/intro-video", label: "Introduction Video" },
    { href: "https://github.com/yourusername/frontend-repo", label: "GitHub Frontend" },
    { href: "https://github.com/yourusername/backend-repo", label: "GitHub Backend" },
  ]

  return (
    (<nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-blue-900 bg-opacity-90 backdrop-filter backdrop-blur-lg text-white border-b border-white border-opacity-20">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:text-blue-200">
            <BarChart2 className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[400px] bg-blue-900 bg-opacity-50 backdrop-filter backdrop-blur-xl text-white border-r border-white border-opacity-20">
          <SheetHeader>
            <SheetTitle className="text-white text-2xl font-bold">Menu</SheetTitle>
          </SheetHeader>
          <Card
            className="mt-6 bg-blue-800 bg-opacity-30 backdrop-filter backdrop-blur-lg text-white border border-white border-opacity-10 shadow-lg">
            <CardContent className="grid gap-4 p-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium hover:text-blue-200 transition-colors duration-200 py-2 px-4 rounded-md hover:bg-white hover:bg-opacity-10"
                  onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex justify-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-200 transition-colors duration-200">
          Your Logo
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:text-blue-200">
            <User className="h-5 w-5" />
            <span className="sr-only">Open user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-blue-900 bg-opacity-70 backdrop-filter backdrop-blur-lg text-white border border-white border-opacity-20">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white bg-opacity-20" />
          <DropdownMenuItem
            className="hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10">Profile</DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10">Settings</DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>)
  );
}