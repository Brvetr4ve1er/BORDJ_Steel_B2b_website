
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex items-center gap-2 p-1 rounded-full bg-background/80 backdrop-blur-sm border">
      <Sun className="h-5 w-5 text-yellow-500" />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-destructive data-[state=unchecked]:bg-gray-200"
        aria-label="Toggle theme"
      />
      <Moon className="h-5 w-5 text-gray-400" />
    </div>
  )
}
