"use client"

import { Button } from "@/components/ui/button"
import { Settings, LogOut, Database } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileNavigation } from "./mobile-navigation"

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isLoggedIn: boolean
  userRole: string
  setIsLoggedIn: (status: boolean) => void
  setUserRole: (role: string) => void
  setShowAdminPanel: (show: boolean) => void
}

export function Header({
  activeSection,
  setActiveSection,
  isLoggedIn,
  userRole,
  setIsLoggedIn,
  setUserRole,
  setShowAdminPanel,
}: HeaderProps) {
  const menuItems = [
    { id: "home", label: "HOME" },
    { id: "prestasi", label: "PRESTASI" },
    { id: "organisasi", label: "ORGANISASI" },
    { id: "santri", label: "SANTRI" },
    { id: "pendaftaran", label: "PENDAFTARAN" },
    { id: "info-lainnya", label: "INFO LAINNYA" },
    { id: "masuk", label: "MASUK" },
  ]

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole("")
    setActiveSection("home")
    setShowAdminPanel(false)
  }

  return (
    <header className="bg-green-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Image
              src="/images/logo-darul-hikam.png"
              alt="Logo Pondok Pesantren DARUL HIKAM"
              width={50}
              height={50}
              className="object-contain bg-white rounded-lg p-1.5 sm:p-2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight truncate">
                Pondok Pesantren DARUL HIKAM
              </h1>
              <p className="text-green-200 text-xs sm:text-sm leading-tight hidden xs:block">
                Membentuk Generasi Qur'ani
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setShowAdminPanel(false)
                  }}
                  className={`hover:text-green-200 transition-colors px-2 xl:px-3 py-2 rounded text-sm xl:text-base whitespace-nowrap ${
                    activeSection === item.id ? "bg-green-700 text-white" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {isLoggedIn && userRole === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-green-700 bg-transparent text-xs sm:text-sm"
                  >
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setShowAdminPanel(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Panel Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveSection("database")}>
                    <Database className="w-4 h-4 mr-2" />
                    Database Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <MobileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </div>
      </div>
    </header>
  )
}
