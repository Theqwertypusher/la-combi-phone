"use client"

import { Instagram, Github } from "lucide-react"
import { LiquidGlass } from "./liquid-glass"

interface FooterProps {
  showLabels: boolean
  direction: "row" | "col"
}

export function Footer({ showLabels, direction }: FooterProps) {
  const appTiles = [
    {
      id: "instagram",
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/nomad_alacarte/",
      bgColor: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    {
      id: "github",
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Theqwertypusher/la-combi-phone",
      bgColor: "linear-gradient(135deg, rgba(36, 41, 46, 0.7) 0%, rgba(27, 31, 35, 0.7) 100%)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  ]

  return (
    <div className={`flex gap-4 ${direction === "col" ? "flex-col" : "flex-row"} items-center`}>
      {appTiles.map((tile) => {
        const IconComponent = tile.icon
        return (
          <a
            key={tile.id}
            href={tile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center text-white no-underline"
          >
            <LiquidGlass
              variant="card"
              intensity="strong"
              rippleEffect={true}
              flowOnHover={true}
              stretchOnDrag={false}
              className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: tile.bgColor,
                borderColor: tile.borderColor,
              }}
            >
              <IconComponent size={32} color="white" />
            </LiquidGlass>
            {showLabels && <span className="mt-2 text-sm font-medium">{tile.label}</span>}
          </a>
        )
      })}
    </div>
  )
}
