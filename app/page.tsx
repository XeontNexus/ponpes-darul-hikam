"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Home } from "@/components/home"
import { Prestasi } from "@/components/prestasi"
import { Organisasi } from "@/components/organisasi"
import { Santri } from "@/components/santri"
import { InfoLainnya } from "@/components/info-lainnya"
import { Login } from "@/components/login"
import { Footer } from "@/components/footer"
import { AdminPanel } from "@/components/admin-panel"
import { Pendaftaran } from "@/components/pendaftaran"
import { DatabaseManager } from "@/components/database-manager"

export default function Page() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  const renderSection = () => {
    if (showAdminPanel && userRole === "admin") {
      return <AdminPanel setShowAdminPanel={setShowAdminPanel} />
    }

    switch (activeSection) {
      case "home":
        return <Home isAdmin={userRole === "admin"} />
      case "prestasi":
        return <Prestasi isAdmin={userRole === "admin"} />
      case "organisasi":
        return <Organisasi isAdmin={userRole === "admin"} />
      case "santri":
        return <Santri isAdmin={userRole === "admin"} />
      case "info-lainnya":
        return <InfoLainnya isAdmin={userRole === "admin"} />
      case "masuk":
        return <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
      case "pendaftaran":
        return <Pendaftaran isAdmin={userRole === "admin"} />
      case "database":
        return <DatabaseManager isAdmin={userRole === "admin"} />
      default:
        return <Home isAdmin={userRole === "admin"} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        setIsLoggedIn={setIsLoggedIn}
        setUserRole={setUserRole}
        setShowAdminPanel={setShowAdminPanel}
      />
      {renderSection()}
      <Footer />
    </div>
  )
}
