"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Download,
  Mail,
  Calendar,
  Users,
  FileText,
  BarChart3,
  Send,
  Archive,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface DatabaseManagerProps {
  isAdmin: boolean
}

interface MonthlyData {
  bulan: string
  tahun: number
  totalPendaftar: number
  diterima: number
  ditolak: number
  pending: number
}

interface EmailLog {
  id: string
  tanggal: string
  penerima: string
  subjek: string
  status: "terkirim" | "gagal" | "pending"
}

export function DatabaseManager({ isAdmin }: DatabaseManagerProps) {
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const [monthlyData] = useState<MonthlyData[]>([
    { bulan: "Januari", tahun: 2024, totalPendaftar: 45, diterima: 38, ditolak: 5, pending: 2 },
    { bulan: "Februari", tahun: 2024, totalPendaftar: 52, diterima: 44, ditolak: 6, pending: 2 },
    { bulan: "Maret", tahun: 2024, totalPendaftar: 38, diterima: 32, ditolak: 4, pending: 2 },
    { bulan: "April", tahun: 2024, totalPendaftar: 41, diterima: 35, ditolak: 4, pending: 2 },
    { bulan: "Mei", tahun: 2024, totalPendaftar: 47, diterima: 40, ditolak: 5, pending: 2 },
    { bulan: "Juni", tahun: 2024, totalPendaftar: 55, diterima: 48, ditolak: 5, pending: 2 },
    { bulan: "Juli", tahun: 2024, totalPendaftar: 62, diterima: 54, ditolak: 6, pending: 2 },
    { bulan: "Agustus", tahun: 2024, totalPendaftar: 58, diterima: 50, ditolak: 6, pending: 2 },
    { bulan: "September", tahun: 2024, totalPendaftar: 49, diterima: 42, ditolak: 5, pending: 2 },
    { bulan: "Oktober", tahun: 2024, totalPendaftar: 53, diterima: 46, ditolak: 5, pending: 2 },
    { bulan: "November", tahun: 2024, totalPendaftar: 44, diterima: 38, ditolak: 4, pending: 2 },
    { bulan: "Desember", tahun: 2024, totalPendaftar: 36, diterima: 30, ditolak: 4, pending: 2 },
  ])

  const [emailLogs] = useState<EmailLog[]>([
    {
      id: "1",
      tanggal: "2024-12-07",
      penerima: "admin@darulhikam.ac.id",
      subjek: "Laporan Harian Pendaftaran",
      status: "terkirim",
    },
    {
      id: "2",
      tanggal: "2024-12-06",
      penerima: "kepala@darulhikam.ac.id",
      subjek: "Laporan Mingguan",
      status: "terkirim",
    },
    {
      id: "3",
      tanggal: "2024-12-05",
      penerima: "ahmad.fauzi@email.com",
      subjek: "Konfirmasi Pendaftaran",
      status: "terkirim",
    },
    { id: "4", tanggal: "2024-12-04", penerima: "backup@darulhikam.ac.id", subjek: "Backup Database", status: "gagal" },
  ])

  const totalStats = {
    totalPendaftar: monthlyData.reduce((sum, data) => sum + data.totalPendaftar, 0),
    totalDiterima: monthlyData.reduce((sum, data) => sum + data.diterima, 0),
    totalDitolak: monthlyData.reduce((sum, data) => sum + data.ditolak, 0),
    totalPending: monthlyData.reduce((sum, data) => sum + data.pending, 0),
    totalDokumen: monthlyData.reduce((sum, data) => sum + data.totalPendaftar * 6, 0), // 6 dokumen per pendaftar
    totalEmail: emailLogs.length,
  }

  const handleDownloadData = (type: "individual" | "monthly" | "all") => {
    const data =
      type === "monthly" && selectedMonth
        ? monthlyData.filter((data) => data.bulan === selectedMonth)
        : type === "all"
          ? monthlyData
          : []

    const jsonData = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `data-pendaftaran-${type}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSendEmail = (type: "harian" | "mingguan" | "bulanan") => {
    setEmailStatus("sending")

    // Simulate email sending
    setTimeout(() => {
      setEmailStatus("sent")
      setTimeout(() => setEmailStatus("idle"), 3000)
    }, 2000)
  }

  const handleBackupDatabase = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      monthlyData,
      emailLogs,
      totalStats,
    }

    const jsonData = JSON.stringify(backupData, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `backup-database-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isAdmin) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
          <p className="text-lg text-gray-600">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Database Manager</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kelola database pendaftaran, export data, dan kirim laporan via email
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">{totalStats.totalPendaftar}</div>
              <div className="text-sm text-blue-600">Total Pendaftar</div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">{totalStats.totalDiterima}</div>
              <div className="text-sm text-green-600">Diterima</div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-800">{totalStats.totalDitolak}</div>
              <div className="text-sm text-red-600">Ditolak</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-800">{totalStats.totalPending}</div>
              <div className="text-sm text-yellow-600">Pending</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">{totalStats.totalDokumen}</div>
              <div className="text-sm text-purple-600">Total Dokumen</div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50">
            <CardContent className="p-4 text-center">
              <Mail className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-800">{totalStats.totalEmail}</div>
              <div className="text-sm text-indigo-600">Email Terkirim</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="monthly">Data Bulanan</TabsTrigger>
            <TabsTrigger value="export">Export Data</TabsTrigger>
            <TabsTrigger value="email">Email System</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Data Pendaftaran Per Bulan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex gap-4 items-center">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Pilih Bulan" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthlyData.map((data) => (
                          <SelectItem key={data.bulan} value={data.bulan}>
                            {data.bulan} {data.tahun}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => handleDownloadData("monthly")}
                      disabled={!selectedMonth}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Data Bulan
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-green-200">
                        <th className="text-left p-4 font-semibold text-green-800">Bulan</th>
                        <th className="text-left p-4 font-semibold text-green-800">Total Pendaftar</th>
                        <th className="text-left p-4 font-semibold text-green-800">Diterima</th>
                        <th className="text-left p-4 font-semibold text-green-800">Ditolak</th>
                        <th className="text-left p-4 font-semibold text-green-800">Pending</th>
                        <th className="text-left p-4 font-semibold text-green-800">Tingkat Penerimaan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyData.map((data) => (
                        <tr key={data.bulan} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4 font-medium">
                            {data.bulan} {data.tahun}
                          </td>
                          <td className="p-4">{data.totalPendaftar}</td>
                          <td className="p-4">
                            <Badge className="bg-green-100 text-green-800">{data.diterima}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className="bg-red-100 text-red-800">{data.ditolak}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className="bg-yellow-100 text-yellow-800">{data.pending}</Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-green-600">
                              {Math.round((data.diterima / data.totalPendaftar) * 100)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-blue-800 mb-2">Data Individual</h3>
                      <p className="text-sm text-blue-600 mb-4">Export data pendaftar satu per satu</p>
                      <Button
                        onClick={() => handleDownloadData("individual")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Download Individual
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-green-800 mb-2">Data Bulanan</h3>
                      <p className="text-sm text-green-600 mb-4">Export data per bulan tertentu</p>
                      <div className="mb-4">
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Bulan" />
                          </SelectTrigger>
                          <SelectContent>
                            {monthlyData.map((data) => (
                              <SelectItem key={data.bulan} value={data.bulan}>
                                {data.bulan}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={() => handleDownloadData("monthly")}
                        disabled={!selectedMonth}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Download Bulanan
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6 text-center">
                      <Database className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-purple-800 mb-2">Semua Data</h3>
                      <p className="text-sm text-purple-600 mb-4">Export seluruh database</p>
                      <Button onClick={() => handleDownloadData("all")} className="bg-purple-600 hover:bg-purple-700">
                        Download Semua
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Kirim Laporan via Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {emailStatus === "sent" && (
                    <Alert className="mb-4 border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">Email berhasil dikirim!</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => handleSendEmail("harian")}
                      disabled={emailStatus === "sending"}
                      className="bg-blue-600 hover:bg-blue-700 h-auto p-4 flex flex-col gap-2"
                    >
                      {emailStatus === "sending" ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      ) : (
                        <Mail className="w-6 h-6" />
                      )}
                      <span>Laporan Harian</span>
                    </Button>

                    <Button
                      onClick={() => handleSendEmail("mingguan")}
                      disabled={emailStatus === "sending"}
                      className="bg-green-600 hover:bg-green-700 h-auto p-4 flex flex-col gap-2"
                    >
                      {emailStatus === "sending" ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      ) : (
                        <Mail className="w-6 h-6" />
                      )}
                      <span>Laporan Mingguan</span>
                    </Button>

                    <Button
                      onClick={() => handleSendEmail("bulanan")}
                      disabled={emailStatus === "sending"}
                      className="bg-purple-600 hover:bg-purple-700 h-auto p-4 flex flex-col gap-2"
                    >
                      {emailStatus === "sending" ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      ) : (
                        <Mail className="w-6 h-6" />
                      )}
                      <span>Laporan Bulanan</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Log Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {emailLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{log.subjek}</div>
                          <div className="text-sm text-gray-600">
                            {log.penerima} • {log.tanggal}
                          </div>
                        </div>
                        <Badge
                          className={
                            log.status === "terkirim"
                              ? "bg-green-100 text-green-800"
                              : log.status === "gagal"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {log.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="backup">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Archive className="w-5 h-5" />
                  Backup Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Backup Otomatis</h3>
                    <p className="text-gray-600 mb-4">
                      Sistem akan melakukan backup otomatis setiap hari pada pukul 02:00 WIB
                    </p>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Backup terakhir: {new Date().toLocaleDateString("id-ID")}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Backup Manual</h3>
                    <p className="text-gray-600 mb-4">Lakukan backup manual untuk mengamankan data saat ini</p>
                    <Button onClick={handleBackupDatabase} className="bg-green-700 hover:bg-green-800" size="lg">
                      <Archive className="w-5 h-5 mr-2" />
                      Backup Sekarang
                    </Button>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Informasi Backup</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• File backup disimpan dalam format JSON</li>
                      <li>• Backup mencakup semua data pendaftaran dan log email</li>
                      <li>• Simpan file backup di tempat yang aman</li>
                      <li>• Lakukan backup manual sebelum update sistem</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
