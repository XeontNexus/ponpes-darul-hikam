"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Trophy, Users, GraduationCap, Info, LogIn, FileText } from "lucide-react"
import Image from "next/image"

interface MobileNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MobileNavigation({ activeSection, setActiveSection }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "HOME", icon: Home },
    { id: "prestasi", label: "PRESTASI", icon: Trophy },
    { id: "organisasi", label: "ORGANISASI", icon: Users },
    { id: "santri", label: "SANTRI", icon: GraduationCap },
    { id: "pendaftaran", label: "PENDAFTARAN", icon: FileText },
    { id: "info-lainnya", label: "INFO LAINNYA", icon: Info },
    { id: "masuk", label: "MASUK", icon: LogIn },
  ]

  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-green-700 bg-transparent p-2 min-w-[40px] h-10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-green-800 text-white border-green-700 p-0">
          <SheetHeader className="p-4 sm:p-6 border-b border-green-700">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-darul-hikam.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain bg-white rounded-lg p-1 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <SheetTitle className="text-white text-left text-base sm:text-lg font-bold leading-tight">
                  DARUL HIKAM
                </SheetTitle>
                <p className="text-green-200 text-xs sm:text-sm leading-tight">Membentuk Generasi Qur'ani</p>
              </div>
            </div>
          </SheetHeader>

          <nav className="p-4 sm:p-6 space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 sm:py-4 rounded-lg text-left transition-all duration-200 touch-manipulation ${
                    activeSection === item.id
                      ? "bg-green-700 text-white shadow-md"
                      : "text-green-200 hover:bg-green-700 hover:text-white active:bg-green-600"
                  }`}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="p-4 sm:p-6 border-t border-green-700 mt-auto">
            <div className="text-center text-green-200 text-xs">
              <p>© 2024 Pondok Pesantren DARUL HIKAM</p>
              <p className="mt-1">Versi Mobile App</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
