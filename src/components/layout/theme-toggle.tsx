"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Terang", icon: Sun },
  { value: "dark", label: "Gelap", icon: Moon },
  { value: "system", label: "Sistem", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const effective = resolvedTheme === "light" ? "light" : "dark";

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        className="size-9"
        aria-label="Ubah tema"
        disabled
      >
        <Sun className="size-4 opacity-0" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="theme-toggle-btn relative size-9 overflow-hidden"
          aria-label={`Tema saat ini: ${theme === "system" ? "sistem" : theme === "light" ? "terang" : "gelap"}. Klik untuk mengubah.`}
        >
          <Sun
            className={cn(
              "absolute size-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              effective === "dark"
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            )}
            aria-hidden="true"
          />
          <Moon
            className={cn(
              "absolute size-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              effective === "light"
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            )}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[9.5rem]">
        {themes.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "gap-2.5",
              theme === value && "bg-primary/10 text-primary"
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
            {theme === value && (
              <span className="ml-auto size-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
