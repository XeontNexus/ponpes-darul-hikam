"use client"

import { Button } from "@/components/ui/button"
import { Settings, LogOut, Database, Sparkles } from "lucide-react"
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
    { id: "prestasi", label: "PENCAPAIAN" },
    { id: "organisasi", label: "PENGAJAR" },
    { id: "santri", label: "SANTRI" },
    { id: "pendaftaran", label: "PENDAFTARAN", isCta: true },
  ]

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole("")
    setActiveSection("home")
    setShowAdminPanel(false)
  }

  return (
    <header className="bg-gradient-to-r from-green-950 via-green-900 to-green-950 text-white sticky top-0 z-50 shadow-xl border-b border-green-700/40 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <div
            onClick={() => {
              setActiveSection("home")
              setShowAdminPanel(false)
            }}
            className="flex items-center gap-3 cursor-pointer group min-w-0 flex-1 sm:flex-initial"
          >
            <div className="relative p-1.5 bg-white rounded-xl shadow-md ring-2 ring-emerald-400/40 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <Image
                src="/images/logo-darul-hikam.png"
                alt="Logo Pondok Pesantren DARUL HIKAM"
                width={48}
                height={48}
                className="object-contain w-9 h-9 sm:w-11 sm:h-11"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-white leading-tight truncate group-hover:text-emerald-300 transition-colors">
                  PONPES DARUL HIKAM
                </h1>
              </div>
              <p className="text-emerald-300/90 text-[11px] sm:text-xs font-medium tracking-wide leading-tight hidden xs:flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Membentuk Generasi Qur'ani
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 bg-green-950/60 p-1.5 rounded-2xl border border-green-700/30">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id
                if (item.isCta) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id)
                        setShowAdminPanel(false)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className={`px-4 py-2 rounded-xl text-xs xl:text-sm font-bold tracking-wide transition-all duration-300 shadow-md ${
                        isActive
                          ? "bg-emerald-400 text-green-950 shadow-emerald-400/20 scale-105"
                          : "bg-emerald-500 hover:bg-emerald-400 text-green-950 hover:scale-105"
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setShowAdminPanel(false)
                    }}
                    className={`relative px-3.5 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-wider transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-green-700/90 text-white shadow-md ring-1 ring-emerald-400/40"
                        : "text-green-100/80 hover:text-white hover:bg-green-800/60"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Admin Controls Dropdown (If logged in) */}
            {isLoggedIn && userRole === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-green-500/50 hover:bg-green-800 bg-green-900/60 text-xs rounded-xl h-9"
                  >
                    <Settings className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    <span className="hidden sm:inline font-semibold">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border-green-200 rounded-xl shadow-xl">
                  <DropdownMenuItem onClick={() => setShowAdminPanel(true)} className="cursor-pointer font-medium text-gray-700">
                    <Settings className="w-4 h-4 mr-2 text-green-700" />
                    Panel Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveSection("database")} className="cursor-pointer font-medium text-gray-700">
                    <Database className="w-4 h-4 mr-2 text-green-700" />
                    Database Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-medium text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Nav Button Drawer */}
            <MobileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </div>
      </div>
    </header>
  )
}
