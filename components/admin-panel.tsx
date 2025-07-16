"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Users,
  Trophy,
  Building,
  GraduationCap,
  Info,
  Home,
  ArrowLeft,
  BarChart3,
  FileText,
  Database,
} from "lucide-react"

interface AdminPanelProps {
  setShowAdminPanel: (show: boolean) => void
}

export function AdminPanel({ setShowAdminPanel }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalSantri: 156,
    totalGuru: 24,
    totalKelas: 12,
    totalPrestasi: 45,
    pelanggaranBerat: 3,
    pelanggaranSedang: 8,
    pelanggaranKecil: 12,
    santriAktif: 148,
  }

  const recentActivities = [
    { id: 1, action: "Santri baru ditambahkan", user: "Ahmad Fauzi", time: "2 jam lalu", type: "add" },
    { id: 2, action: "Prestasi diupdate", user: "Fatimah Zahra", time: "4 jam lalu", type: "edit" },
    { id: 3, action: "Pelanggaran dicatat", user: "Ali Akbar", time: "6 jam lalu", type: "warning" },
    { id: 4, action: "Guru baru ditambahkan", user: "Ust. Rahman", time: "1 hari lalu", type: "add" },
    { id: 5, action: "Biaya pendidikan diupdate", user: "Admin", time: "2 hari lalu", type: "edit" },
  ]

  const quickActions = [
    {
      id: 1,
      title: "Tambah Santri Baru",
      description: "Daftarkan santri baru ke sistem",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Input Prestasi",
      description: "Catat prestasi santri terbaru",
      icon: Trophy,
      color: "bg-yellow-500",
    },
    {
      id: 3,
      title: "Kelola Guru",
      description: "Tambah atau edit data guru",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Update Fasilitas",
      description: "Perbarui informasi fasilitas",
      icon: Building,
      color: "bg-purple-500",
    },
    { id: 5, title: "Laporan Bulanan", description: "Generate laporan bulanan", icon: FileText, color: "bg-red-500" },
    { id: 6, title: "Backup Data", description: "Backup database sistem", icon: Database, color: "bg-gray-500" },
  ]

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">Panel Admin</h1>
            <p className="text-lg text-gray-600">
              Dashboard untuk mengelola seluruh sistem Pondok Pesantren DARUL HIKAM
            </p>
          </div>
          <Button
            onClick={() => setShowAdminPanel(false)}
            variant="outline"
            className="border-green-700 text-green-700 hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Website
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Kelola Konten</TabsTrigger>
            <TabsTrigger value="users">Kelola User</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Santri</p>
                      <p className="text-3xl font-bold text-blue-800">{stats.totalSantri}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Total Guru</p>
                      <p className="text-3xl font-bold text-green-800">{stats.totalGuru}</p>
                    </div>
                    <GraduationCap className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Total Prestasi</p>
                      <p className="text-3xl font-bold text-yellow-800">{stats.totalPrestasi}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Total Kelas</p>
                      <p className="text-3xl font-bold text-purple-800">{stats.totalKelas}</p>
                    </div>
                    <Building className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-green-800">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickActions.map((action) => {
                    const IconComponent = action.icon
                    return (
                      <Button
                        key={action.id}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-md transition-shadow bg-transparent"
                      >
                        <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-800">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "add"
                              ? "bg-green-500"
                              : activity.type === "edit"
                                ? "bg-blue-500"
                                : activity.type === "warning"
                                  ? "bg-red-500"
                                  : "bg-gray-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-600">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Status Sistem</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">Server Status</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">Database</span>
                      <Badge className="bg-blue-100 text-blue-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-yellow-800">Backup Terakhir</span>
                      <Badge className="bg-yellow-100 text-yellow-800">2 hari lalu</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-800">Pelanggaran Berat</span>
                      <Badge className="bg-red-100 text-red-800">{stats.pelanggaranBerat} kasus</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Home className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Kelola Home</h3>
                      <p className="text-sm text-gray-600">Edit sejarah dan timeline</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-yellow-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-800">Kelola Prestasi</h3>
                      <p className="text-sm text-gray-600">Tambah/edit prestasi santri</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800">Kelola Organisasi</h3>
                      <p className="text-sm text-gray-600">Edit struktur organisasi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Kelola Santri</h3>
                      <p className="text-sm text-gray-600">Manajemen data santri</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Info className="w-6 h-6 text-red-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800">Kelola Info</h3>
                      <p className="text-sm text-gray-600">Edit biaya dan kontak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Pengaturan</h3>
                      <p className="text-sm text-gray-600">Konfigurasi sistem</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Manajemen User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Admin Utama</h3>
                      <p className="text-sm text-gray-600">admin@darulhikam.ac.id</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Super Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Staff Akademik</h3>
                      <p className="text-sm text-gray-600">akademik@darulhikam.ac.id</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Wali Santri</h3>
                      <p className="text-sm text-gray-600">156 akun terdaftar</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">User</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Laporan Santri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Santri Aktif</span>
                      <span className="font-semibold">{stats.santriAktif}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pelanggaran Berat</span>
                      <span className="font-semibold text-red-600">{stats.pelanggaranBerat}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pelanggaran Sedang</span>
                      <span className="font-semibold text-orange-600">{stats.pelanggaranSedang}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pelanggaran Kecil</span>
                      <span className="font-semibold text-yellow-600">{stats.pelanggaranKecil}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Laporan Akademik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Prestasi</span>
                      <span className="font-semibold">{stats.totalPrestasi}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Prestasi Nasional</span>
                      <span className="font-semibold text-green-600">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Prestasi Provinsi</span>
                      <span className="font-semibold text-blue-600">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Prestasi Kabupaten</span>
                      <span className="font-semibold text-purple-600">15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-green-800">Export Laporan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="bg-green-700 hover:bg-green-800">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Data Santri
                  </Button>
                  <Button className="bg-blue-700 hover:bg-blue-800">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Export Laporan Prestasi
                  </Button>
                  <Button className="bg-purple-700 hover:bg-purple-800">
                    <Database className="w-4 h-4 mr-2" />
                    Export Semua Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
