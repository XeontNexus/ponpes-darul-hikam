"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Trophy, Users, GraduationCap, FileText, Sparkles } from "lucide-react"
import Image from "next/image"

interface MobileNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MobileNavigation({ activeSection, setActiveSection }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "HOME", icon: Home },
    { id: "prestasi", label: "PENCAPAIAN", icon: Trophy },
    { id: "organisasi", label: "PENGAJAR", icon: Users },
    { id: "santri", label: "SANTRI", icon: GraduationCap },
    { id: "pendaftaran", label: "PENDAFTARAN", icon: FileText, isCta: true },
  ]

  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsOpen(false)
    // Scroll ke atas halaman setelah menu dipilih
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 80)
  }

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-green-600/60 hover:bg-green-800/80 bg-green-950/70 p-2 min-w-[40px] h-10 rounded-xl shadow-md backdrop-blur-sm"
          >
            <Menu className="w-5 h-5 text-emerald-300" />
          </Button>
        </SheetTrigger>

        {/* [&>button]:hidden — sembunyikan tombol X bawaan SheetContent */}
        <SheetContent
          side="right"
          className="w-[280px] sm:w-[320px] bg-gradient-to-b from-green-950 via-green-900 to-green-950 text-white border-green-800 p-0 flex flex-col justify-between shadow-2xl [&>button]:hidden"
        >
          <div>
            <SheetHeader className="p-5 border-b border-green-800/80 bg-green-950/80">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white rounded-xl shadow-md ring-2 ring-emerald-400/40 flex-shrink-0">
                  <Image
                    src="/images/logo-darul-hikam.png"
                    alt="Logo"
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <SheetTitle className="text-white text-left text-base font-extrabold tracking-tight leading-tight">
                    DARUL HIKAM
                  </SheetTitle>
                  <p className="text-emerald-300 text-xs font-medium leading-tight flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Membentuk Generasi Qur'ani
                  </p>
                </div>
              </div>
            </SheetHeader>

            <nav className="p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                const isActive = activeSection === item.id

                if (item.isCta) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-bold transition-all duration-200 shadow-md ${
                        isActive
                          ? "bg-emerald-400 text-green-950 shadow-emerald-400/30 scale-[1.02]"
                          : "bg-emerald-500 hover:bg-emerald-400 text-green-950"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm tracking-wide">{item.label}</span>
                    </button>
                  )
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 sm:py-3.5 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? "bg-green-800 text-white font-bold shadow-md ring-1 ring-emerald-400/40"
                        : "text-green-100/80 hover:bg-green-800/50 hover:text-white"
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-emerald-400" : "text-green-300/70"}`} />
                    <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-5 border-t border-green-800/80 bg-green-950/90">
            <div className="text-center text-green-200/80 text-xs">
              <p className="font-medium text-emerald-300">Pondok Pesantren DARUL HIKAM</p>
              <p className="mt-1 text-[11px] text-gray-400">© 2025 Yayasan Darul Hikam</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
