"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User, AlertCircle } from "lucide-react"

interface LoginProps {
  setIsLoggedIn: (status: boolean) => void
  setUserRole: (role: string) => void
}

export function Login({ setIsLoggedIn, setUserRole }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        setIsLoggedIn(true)
        setUserRole("admin")
        setError("")
      } else if (username === "user" && password === "user123") {
        setIsLoggedIn(true)
        setUserRole("user")
        setError("")
      } else {
        setError("Username atau password salah!")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-green-700" />
              </div>
              <CardTitle className="text-2xl text-green-800">Masuk Sistem</CardTitle>
              <p className="text-gray-600">Silakan masuk untuk mengakses sistem</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-green-800">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Masukkan username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-green-800">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Demo Login:</h4>
                <p className="text-sm text-blue-700">
                  <strong>Admin:</strong> username: admin, password: admin123
                </p>
                <p className="text-sm text-blue-700">
                  <strong>User:</strong> username: user, password: user123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
