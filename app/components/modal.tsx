"use client"

import { useEffect } from "react"
import { LiquidGlass } from "./liquid-glass"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
  autoCloseDelay?: number
}

export function Modal({ isOpen, onClose, message, autoCloseDelay = 3000 }: ModalProps) {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, autoCloseDelay])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <LiquidGlass
        variant="panel"
        intensity="strong"
        rippleEffect={false}
        flowOnHover={false}
        stretchOnDrag={false}
        className="max-w-md w-full mx-4"
        style={{ padding: "32px", borderRadius: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p className="text-white text-lg font-medium leading-relaxed">{message}</p>
        </div>
      </LiquidGlass>
    </div>
  )
}
