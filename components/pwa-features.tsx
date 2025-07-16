"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, BellOff, Download, Smartphone } from "lucide-react"

export function PWAFeatures() {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default")
  const [isOnline, setIsOnline] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Check notification permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission)
    }

    // Check online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)

      if (permission === "granted") {
        new Notification("DARUL HIKAM", {
          body: "Notifikasi berhasil diaktifkan! Anda akan mendapat update terbaru.",
          icon: "/icons/icon-192x192.png",
        })
      }
    }
  }

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      setDeferredPrompt(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Install App Card */}
      {deferredPrompt && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Install Aplikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              Install aplikasi DARUL HIKAM untuk pengalaman yang lebih baik dan akses offline.
            </p>
            <Button onClick={installApp} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Install Sekarang
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notification Card */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            {notificationPermission === "granted" ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            Notifikasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notificationPermission === "granted" ? (
            <p className="text-green-700">✅ Notifikasi aktif. Anda akan mendapat update terbaru dari pesantren.</p>
          ) : (
            <div>
              <p className="text-gray-700 mb-4">
                Aktifkan notifikasi untuk mendapat update terbaru tentang kegiatan pesantren dan informasi santri.
              </p>
              <Button onClick={requestNotificationPermission} className="bg-green-700 hover:bg-green-800">
                <Bell className="w-4 h-4 mr-2" />
                Aktifkan Notifikasi
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Online Status */}
      <Card className={`border-2 ${isOnline ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-orange-500"}`} />
            <span className={`font-medium ${isOnline ? "text-green-700" : "text-orange-700"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
          <p className={`text-sm mt-2 ${isOnline ? "text-green-600" : "text-orange-600"}`}>
            {isOnline
              ? "Semua fitur tersedia dan data akan tersinkronisasi."
              : "Mode offline aktif. Beberapa fitur mungkin terbatas."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
