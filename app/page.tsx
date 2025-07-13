"use client"

import { useState, useRef } from "react"
import { Plane, Wifi, Moon, Share } from "lucide-react"
import { LiquidButton } from "./components/liquid-button"
import { LiquidGlass } from "./components/liquid-glass"
import { Modal } from "./components/modal"
import { Footer } from "./components/footer" // Import the new Footer component

export default function Page() {
  const [toggleStates, setToggleStates] = useState({
    airplane: false,
    airdrop: false,
    wifi: true,
    dnd: false,
  })

  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
  })

  // Track which modals have been shown this session
  const shownModals = useRef(new Set<string>())

  const buttons = [
    {
      id: "wifi",
      icon: Wifi,
      label: "Wi-Fi",
      activeBackground: "linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)",
      activeBorder: "rgba(96, 165, 250, 0.8)",
      active: toggleStates.wifi,
      modalMessage: "Get off the interwebs and touch some grass. Star link isn't connected anyways",
    },
    {
      id: "airplane",
      icon: Plane,
      label: "Airplane Mode",
      activeBackground: "linear-gradient(135deg, rgba(249, 115, 22, 0.7) 0%, rgba(234, 88, 12, 0.7) 100%)",
      activeBorder: "rgba(251, 146, 60, 0.8)",
      active: toggleStates.airplane,
      modalMessage: "You realize you're on a chicken bus, not a plane right?",
    },
    {
      id: "dnd",
      icon: Moon,
      label: "Do Not Disturb",
      activeBackground: "linear-gradient(135deg, rgba(168, 85, 247, 0.7) 0%, rgba(147, 51, 234, 0.7) 100%)",
      activeBorder: "rgba(196, 181, 253, 0.8)",
      active: toggleStates.dnd,
      modalMessage: "Probably for the best. You're out in nature",
    },
    {
      id: "share", // Renamed from airdrop
      icon: Share,
      label: "Share", // Renamed label
      activeBackground: "linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)",
      activeBorder: "rgba(96, 165, 250, 0.8)",
      active: toggleStates.airdrop, // Still uses airdrop state for consistency
      modalMessage: "This phone has been copied to your clipboard. Pass it around.",
    },
  ]

  const handleToggle = async (buttonId: string) => {
    const button = buttons.find((b) => b.id === buttonId)

    // If it's the share button and it's currently unactivated, copy to clipboard
    if (buttonId === "share" && !toggleStates.airdrop) {
      // Use toggleStates.airdrop for the state check
      try {
        await navigator.clipboard.writeText(window.location.href)
        console.log("URL copied to clipboard:", window.location.href)
      } catch (err) {
        console.error("Failed to copy URL to clipboard:", err)
        // Optionally, you could set a different modal message here for error
      }
    }

    // Toggle the state
    setToggleStates((prev) => ({
      ...prev,
      // Use 'airdrop' key for 'share' button to maintain existing state logic
      [buttonId === "share" ? "airdrop" : buttonId]:
        !prev[buttonId === "share" ? "airdrop" : (buttonId as keyof typeof prev)],
    }))

    // Show modal if it has a message and hasn't been shown this session
    if (button?.modalMessage && !shownModals.current.has(buttonId)) {
      setModalState({
        isOpen: true,
        message: button.modalMessage,
      })
      shownModals.current.add(buttonId)
    }
  }

  const closeModal = () => {
    setModalState({ isOpen: false, message: "" })
  }

  return (
    <div className="min-h-screen relative pb-[5vh]">
      <div
        className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat z-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <div className="relative z-20 pt-8 pb-4">
        <div className="text-center">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="inline-block"
            style={{ padding: "16px 32px", borderRadius: "24px" }}
          >
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">La Combi's Phone</h1>
          </LiquidGlass>
        </div>
      </div>

      {/* Mobile Layout - Horizontal controls at top, iframe below */}
      <div className="md:hidden flex flex-col relative z-20">
        {/* Controls at top in horizontal row */}
        <div className="p-4 flex justify-center">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            style={{ padding: "16px", borderRadius: "32px" }}
          >
            <div className="flex gap-3">
              {buttons.map((button) => {
                const IconComponent = button.icon
                const useStroke = button.id === "wifi" || button.id === "share" // Updated for 'share'
                return (
                  <LiquidButton
                    key={button.id}
                    variant="primary"
                    size="lg"
                    onClick={() => handleToggle(button.id)}
                    rippleEffect={false}
                    className="shadow-2xl !p-0 !rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      width: "56px",
                      height: "56px",
                      padding: "0",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: button.active ? button.activeBackground : undefined,
                      borderColor: button.active ? button.activeBorder : undefined,
                    }}
                  >
                    <IconComponent
                      className="pointer-events-none"
                      size={24}
                      color="white"
                      fill={useStroke ? "none" : "white"}
                      strokeWidth={useStroke ? 2 : 0}
                    />
                  </LiquidButton>
                )
              })}
            </div>
          </LiquidGlass>
        </div>
        {/* Iframe below controls */}
        <div className="p-4">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="w-full"
            style={{ padding: "16px", borderRadius: "24px" }}
          >
            <iframe
              src="https://share.garmin.com/lacombi"
              frameBorder="0"
              marginWidth="0"
              marginHeight="0"
              className="w-full h-[600px] rounded-2xl"
              title="Garmin Map Share"
            />
          </LiquidGlass>
        </div>
        {/* Mobile Footer */}
        <div className="p-4 flex justify-center">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="inline-block"
            style={{ padding: "16px", borderRadius: "32px" }}
          >
            <Footer showLabels={false} direction="row" />
          </LiquidGlass>
        </div>
      </div>

      {/* Tablet Layout - Sidebar with icons only, iframe to the right */}
      <div className="hidden md:flex lg:hidden relative z-20 min-h-screen">
        {/* Sidebar Controls - Icons only - Fixed width and padding */}
        <div className="w-28 p-4 flex flex-col gap-4">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="w-full"
            style={{ padding: "16px", borderRadius: "24px" }}
          >
            <div className="flex flex-col gap-3 items-center">
              {buttons.map((button) => {
                const IconComponent = button.icon
                const useStroke = button.id === "wifi" || button.id === "share" // Updated for 'share'
                return (
                  <LiquidButton
                    key={button.id}
                    variant="primary"
                    size="lg"
                    onClick={() => handleToggle(button.id)}
                    rippleEffect={false}
                    className="shadow-2xl !p-0 !rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      width: "56px",
                      height: "56px",
                      padding: "0",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: button.active ? button.activeBackground : undefined,
                      borderColor: button.active ? button.activeBorder : undefined,
                    }}
                  >
                    <IconComponent
                      className="pointer-events-none"
                      size={24}
                      color="white"
                      fill={useStroke ? "none" : "white"}
                      strokeWidth={useStroke ? 2 : 0}
                    />
                  </LiquidButton>
                )
              })}
            </div>
          </LiquidGlass>
          {/* Tablet Footer */}
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="w-full"
            style={{ padding: "16px", borderRadius: "24px" }}
          >
            <Footer showLabels={false} direction="col" />
          </LiquidGlass>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 pl-0 flex flex-col">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="w-full h-fit"
            style={{ padding: "24px", borderRadius: "32px" }}
          >
            <iframe
              src="https://share.garmin.com/lacombi"
              frameBorder="0"
              marginWidth="0"
              marginHeight="0"
              className="w-full h-[700px] rounded-2xl"
              title="Garmin Map Share"
            />
          </LiquidGlass>
        </div>
      </div>

      {/* Desktop Layout - Sidebar with icons and labels, iframe to the right */}
      <div className="hidden lg:flex relative z-20 min-h-screen">
        {/* Sidebar Controls - Icons with labels */}
        <div className="w-80 p-8 flex flex-col gap-8">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="w-full"
            style={{ padding: "24px", borderRadius: "32px" }}
          >
            <div className="flex flex-col gap-4">
              {buttons.map((button) => {
                const IconComponent = button.icon
                const useStroke = button.id === "wifi" || button.id === "share" // Updated for 'share'
                return (
                  <div key={button.id} className="flex items-center gap-4">
                    <LiquidButton
                      variant="primary"
                      size="lg"
                      onClick={() => handleToggle(button.id)}
                      rippleEffect={false}
                      className="shadow-2xl !p-0 !rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                      style={{
                        width: "64px",
                        height: "64px",
                        padding: "0",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: button.active ? button.activeBackground : undefined,
                        borderColor: button.active ? button.activeBorder : undefined,
                      }}
                    >
                      <IconComponent
                        className="pointer-events-none"
                        size={28}
                        color="white"
                        fill={useStroke ? "none" : "white"}
                        strokeWidth={useStroke ? 2 : 0}
                      />
                    </LiquidButton>
                    <span className="text-white font-medium text-lg">{button.label}</span>
                  </div>
                )
              })}
            </div>
          </LiquidGlass>
          {/* Desktop Footer */}
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="w-full flex justify-center" // Added flex justify-center here
            style={{ padding: "24px", borderRadius: "32px" }}
          >
            <Footer showLabels={true} direction="row" />
          </LiquidGlass>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 pl-0 flex flex-col">
          <LiquidGlass
            variant="panel"
            intensity="medium"
            rippleEffect={false}
            flowOnHover={false}
            stretchOnDrag={false}
            className="w-full h-fit"
            style={{ padding: "24px", borderRadius: "32px" }}
          >
            <iframe
              src="https://share.garmin.com/lacombi"
              frameBorder="0"
              marginWidth="0"
              marginHeight="0"
              className="w-full h-[800px] rounded-2xl"
              title="Garmin Map Share"
            />
          </LiquidGlass>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalState.isOpen} onClose={closeModal} message={modalState.message} />
    </div>
  )
}
