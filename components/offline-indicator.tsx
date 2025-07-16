"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WifiOff, Wifi } from "lucide-react"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
    }

    // Set initial state
    setIsOnline(navigator.onLine)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showOfflineMessage && isOnline) {
    return null
  }

  return (
    <div className="fixed top-16 left-4 right-4 z-40 md:left-auto md:right-4 md:max-w-sm">
      <Alert className={`${isOnline ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}>
        {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-orange-600" />}
        <AlertDescription className={isOnline ? "text-green-700" : "text-orange-700"}>
          {isOnline
            ? "Koneksi internet tersambung kembali"
            : "Tidak ada koneksi internet. Beberapa fitur mungkin tidak tersedia."}
        </AlertDescription>
      </Alert>
    </div>
  )
}
