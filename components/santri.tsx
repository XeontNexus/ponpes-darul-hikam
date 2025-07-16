"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Users, AlertTriangle } from "lucide-react"

interface SantriData {
  id: number
  nama: string
  namaOrangTua: string
  jenisPelanggaran: "Bersih" | "Kecil" | "Sedang" | "Berat"
  pointPelanggaran: number
  kelas: string
  keterangan: string
}

interface KelasData {
  id: string
  namaKelas: string
  santri: SantriData[]
}

interface SantriProps {
  isAdmin: boolean
}

export function Santri({ isAdmin }: SantriProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKelas, setSelectedKelas] = useState<string>("all")

  const [kelasData, setKelasData] = useState<KelasData[]>([
    {
      id: "paud-a",
      namaKelas: "PAUD A",
      santri: [
        {
          id: 1,
          nama: "Ahmad Fauzi",
          namaOrangTua: "Bapak Usman",
          jenisPelanggaran: "Bersih",
          pointPelanggaran: 0,
          kelas: "PAUD A",
          keterangan: "Tidak ada pelanggaran",
        },
        {
          id: 2,
          nama: "Muhammad Rizki",
          namaOrangTua: "Bapak Ahmad",
          jenisPelanggaran: "Kecil",
          pointPelanggaran: 5,
          kelas: "PAUD A",
          keterangan: "Terlambat masuk kelas",
        },
      ],
    },
    {
      id: "sd-1a",
      namaKelas: "SD 1A",
      santri: [
        {
          id: 3,
          nama: "Abdullah Rahman",
          namaOrangTua: "Bapak Hasan",
          jenisPelanggaran: "Sedang",
          pointPelanggaran: 15,
          kelas: "SD 1A",
          keterangan: "Tidak mengerjakan PR",
        },
      ],
    },
    {
      id: "mts-2a",
      namaKelas: "MTs 2A",
      santri: [
        {
          id: 4,
          nama: "Ali Akbar",
          namaOrangTua: "Bapak Ibrahim",
          jenisPelanggaran: "Berat",
          pointPelanggaran: 25,
          kelas: "MTs 2A",
          keterangan: "Melanggar peraturan asrama",
        },
        {
          id: 5,
          nama: "Fatimah Zahra",
          namaOrangTua: "Bapak Abdullah",
          jenisPelanggaran: "Bersih",
          pointPelanggaran: 0,
          kelas: "MTs 2A",
          keterangan: "Tidak ada pelanggaran",
        },
      ],
    },
    {
      id: "ma-3b",
      namaKelas: "MA 3B",
      santri: [
        {
          id: 6,
          nama: "Khadijah Ummul",
          namaOrangTua: "Bapak Yusuf",
          jenisPelanggaran: "Kecil",
          pointPelanggaran: 5,
          kelas: "MA 3B",
          keterangan: "Terlambat sholat berjamaah",
        },
      ],
    },
    {
      id: "smk-1a",
      namaKelas: "SMK 1A",
      santri: [
        {
          id: 7,
          nama: "Ridwan Kamil",
          namaOrangTua: "Bapak Fahmi",
          jenisPelanggaran: "Sedang",
          pointPelanggaran: 15,
          kelas: "SMK 1A",
          keterangan: "Tidak mengikuti kegiatan wajib",
        },
      ],
    },
  ])

  const [newSantri, setNewSantri] = useState<Omit<SantriData, "id">>({
    nama: "",
    namaOrangTua: "",
    jenisPelanggaran: "Bersih",
    pointPelanggaran: 0,
    kelas: "",
    keterangan: "",
  })

  const [newKelas, setNewKelas] = useState({
    namaKelas: "",
  })

  const [showAddSantriForm, setShowAddSantriForm] = useState(false)
  const [showAddKelasForm, setShowAddKelasForm] = useState(false)
  const [editingSantri, setEditingSantri] = useState<SantriData | null>(null)

  // Get all santri from all classes
  const getAllSantri = (): SantriData[] => {
    return kelasData.flatMap((kelas) => kelas.santri)
  }

  // Filter santri based on search and class selection
  const getFilteredSantri = (): SantriData[] => {
    let santri = getAllSantri()

    if (selectedKelas !== "all") {
      santri = santri.filter((s) => s.kelas === selectedKelas)
    }

    if (searchTerm) {
      santri = santri.filter(
        (s) =>
          s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.namaOrangTua.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return santri
  }

  const getPelanggaranColor = (jenis: string) => {
    switch (jenis) {
      case "Bersih":
        return "bg-green-100 text-green-800"
      case "Kecil":
        return "bg-yellow-100 text-yellow-800"
      case "Sedang":
        return "bg-orange-100 text-orange-800"
      case "Berat":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPointColor = (point: number) => {
    if (point === 0) return "text-green-600 font-semibold"
    if (point <= 10) return "text-yellow-600 font-semibold"
    if (point <= 20) return "text-orange-600 font-semibold"
    return "text-red-600 font-semibold"
  }

  const handleJenisPelanggaranChange = (jenis: "Bersih" | "Kecil" | "Sedang" | "Berat") => {
    let point = 0
    switch (jenis) {
      case "Bersih":
        point = 0
        break
      case "Kecil":
        point = 5
        break
      case "Sedang":
        point = 15
        break
      case "Berat":
        point = 25
        break
    }
    setNewSantri({ ...newSantri, jenisPelanggaran: jenis, pointPelanggaran: point })
  }

  const handleAddSantri = () => {
    if (newSantri.nama && newSantri.namaOrangTua && newSantri.kelas) {
      const santriWithId = { ...newSantri, id: Date.now() }

      setKelasData((prevKelas) =>
        prevKelas.map((kelas) => {
          if (kelas.namaKelas === newSantri.kelas) {
            return {
              ...kelas,
              santri: [...kelas.santri, santriWithId],
            }
          }
          return kelas
        }),
      )

      setNewSantri({
        nama: "",
        namaOrangTua: "",
        jenisPelanggaran: "Bersih",
        pointPelanggaran: 0,
        kelas: "",
        keterangan: "",
      })
      setShowAddSantriForm(false)
    }
  }

  const handleAddKelas = () => {
    if (newKelas.namaKelas) {
      const kelasWithId: KelasData = {
        id: `kelas-${Date.now()}`,
        namaKelas: newKelas.namaKelas,
        santri: [],
      }

      setKelasData([...kelasData, kelasWithId])
      setNewKelas({ namaKelas: "" })
      setShowAddKelasForm(false)
    }
  }

  const handleDeleteSantri = (santriId: number) => {
    setKelasData((prevKelas) =>
      prevKelas.map((kelas) => ({
        ...kelas,
        santri: kelas.santri.filter((santri) => santri.id !== santriId),
      })),
    )
  }

  const handleDeleteKelas = (kelasId: string) => {
    setKelasData(kelasData.filter((kelas) => kelas.id !== kelasId))
  }

  const handleEditSantri = (santri: SantriData) => {
    setEditingSantri({ ...santri })
  }

  const handleSaveEdit = () => {
    if (editingSantri) {
      setKelasData((prevKelas) =>
        prevKelas.map((kelas) => ({
          ...kelas,
          santri: kelas.santri.map((santri) => (santri.id === editingSantri.id ? editingSantri : santri)),
        })),
      )
      setEditingSantri(null)
    }
  }

  const getStatistics = () => {
    const allSantri = getAllSantri()
    return {
      total: allSantri.length,
      bersih: allSantri.filter((s) => s.jenisPelanggaran === "Bersih").length,
      kecil: allSantri.filter((s) => s.jenisPelanggaran === "Kecil").length,
      sedang: allSantri.filter((s) => s.jenisPelanggaran === "Sedang").length,
      berat: allSantri.filter((s) => s.jenisPelanggaran === "Berat").length,
    }
  }

  const stats = getStatistics()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Data Santri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sistem monitoring dan pencatatan pelanggaran santri dengan sistem poin untuk membantu wali santri memantau
            perkembangan putra-putri mereka.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
              <div className="text-sm text-blue-600">Total Santri</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-800">{stats.bersih}</div>
              <div className="text-sm text-green-600">Bersih</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-800">{stats.kecil}</div>
              <div className="text-sm text-yellow-600">Kecil</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-800">{stats.sedang}</div>
              <div className="text-sm text-orange-600">Sedang</div>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-800">{stats.berat}</div>
              <div className="text-sm text-red-600">Berat</div>
            </CardContent>
          </Card>
        </div>

        {/* Point System Info */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Sistem Poin Pelanggaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <div className="font-bold text-green-800">BERSIH</div>
                <div className="text-sm text-green-600">0 Poin</div>
              </div>
              <div className="text-center p-3 bg-yellow-100 rounded-lg">
                <div className="font-bold text-yellow-800">KECIL</div>
                <div className="text-sm text-yellow-600">5 Poin</div>
              </div>
              <div className="text-center p-3 bg-orange-100 rounded-lg">
                <div className="font-bold text-orange-800">SEDANG</div>
                <div className="text-sm text-orange-600">15 Poin</div>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <div className="font-bold text-red-800">BERAT</div>
                <div className="text-sm text-red-600">25 Poin</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="semua-santri" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="semua-santri">Semua Santri</TabsTrigger>
            <TabsTrigger value="per-kelas">Per Kelas</TabsTrigger>
          </TabsList>

          <TabsContent value="semua-santri">
            {/* Search and Filter Section */}
            <Card className="mb-8 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Pencarian dan Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Cari nama santri atau nama orang tua..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter Kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kelas</SelectItem>
                      {kelasData.map((kelas) => (
                        <SelectItem key={kelas.id} value={kelas.namaKelas}>
                          {kelas.namaKelas}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isAdmin && (
                    <Button
                      onClick={() => setShowAddSantriForm(!showAddSantriForm)}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Santri
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Add Santri Form */}
            {showAddSantriForm && isAdmin && (
              <Card className="mb-8 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Tambah Data Santri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Nama Santri"
                      value={newSantri.nama}
                      onChange={(e) => setNewSantri({ ...newSantri, nama: e.target.value })}
                    />
                    <Input
                      placeholder="Nama Orang Tua"
                      value={newSantri.namaOrangTua}
                      onChange={(e) => setNewSantri({ ...newSantri, namaOrangTua: e.target.value })}
                    />
                    <Select
                      value={newSantri.kelas}
                      onValueChange={(value) => setNewSantri({ ...newSantri, kelas: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {kelasData.map((kelas) => (
                          <SelectItem key={kelas.id} value={kelas.namaKelas}>
                            {kelas.namaKelas}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={newSantri.jenisPelanggaran}
                      onValueChange={(value: "Bersih" | "Kecil" | "Sedang" | "Berat") =>
                        handleJenisPelanggaranChange(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Jenis Pelanggaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bersih">Bersih (0 Poin)</SelectItem>
                        <SelectItem value="Kecil">Kecil (5 Poin)</SelectItem>
                        <SelectItem value="Sedang">Sedang (15 Poin)</SelectItem>
                        <SelectItem value="Berat">Berat (25 Poin)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Keterangan"
                        value={newSantri.keterangan}
                        onChange={(e) => setNewSantri({ ...newSantri, keterangan: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <Button onClick={handleAddSantri} className="bg-green-700 hover:bg-green-800">
                        Simpan
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddSantriForm(false)}>
                        Batal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Edit Santri Form */}
            {editingSantri && isAdmin && (
              <Card className="mb-8 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Edit Data Santri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Nama Santri"
                      value={editingSantri.nama}
                      onChange={(e) => setEditingSantri({ ...editingSantri, nama: e.target.value })}
                    />
                    <Input
                      placeholder="Nama Orang Tua"
                      value={editingSantri.namaOrangTua}
                      onChange={(e) => setEditingSantri({ ...editingSantri, namaOrangTua: e.target.value })}
                    />
                    <Select
                      value={editingSantri.kelas}
                      onValueChange={(value) => setEditingSantri({ ...editingSantri, kelas: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {kelasData.map((kelas) => (
                          <SelectItem key={kelas.id} value={kelas.namaKelas}>
                            {kelas.namaKelas}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={editingSantri.jenisPelanggaran}
                      onValueChange={(value: "Bersih" | "Kecil" | "Sedang" | "Berat") => {
                        let point = 0
                        switch (value) {
                          case "Bersih":
                            point = 0
                            break
                          case "Kecil":
                            point = 5
                            break
                          case "Sedang":
                            point = 15
                            break
                          case "Berat":
                            point = 25
                            break
                        }
                        setEditingSantri({ ...editingSantri, jenisPelanggaran: value, pointPelanggaran: point })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Jenis Pelanggaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bersih">Bersih (0 Poin)</SelectItem>
                        <SelectItem value="Kecil">Kecil (5 Poin)</SelectItem>
                        <SelectItem value="Sedang">Sedang (15 Poin)</SelectItem>
                        <SelectItem value="Berat">Berat (25 Poin)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Keterangan"
                        value={editingSantri.keterangan}
                        onChange={(e) => setEditingSantri({ ...editingSantri, keterangan: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <Button onClick={handleSaveEdit} className="bg-blue-700 hover:bg-blue-800">
                        Simpan Perubahan
                      </Button>
                      <Button variant="outline" onClick={() => setEditingSantri(null)}>
                        Batal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Data Table */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Daftar Santri dan Pelanggaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-green-200">
                        <th className="text-left p-4 font-semibold text-green-800">Nama</th>
                        <th className="text-left p-4 font-semibold text-green-800">Nama Orang Tua</th>
                        <th className="text-left p-4 font-semibold text-green-800">Kelas</th>
                        <th className="text-left p-4 font-semibold text-green-800">Jenis Pelanggaran</th>
                        <th className="text-left p-4 font-semibold text-green-800">Poin Pelanggaran</th>
                        <th className="text-left p-4 font-semibold text-green-800">Keterangan</th>
                        {isAdmin && <th className="text-left p-4 font-semibold text-green-800">Aksi</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredSantri().map((santri) => (
                        <tr key={santri.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4 font-medium">{santri.nama}</td>
                          <td className="p-4">{santri.namaOrangTua}</td>
                          <td className="p-4">{santri.kelas}</td>
                          <td className="p-4">
                            <Badge className={getPelanggaranColor(santri.jenisPelanggaran)}>
                              {santri.jenisPelanggaran}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className={getPointColor(santri.pointPelanggaran)}>
                              {santri.pointPelanggaran} Poin
                            </span>
                          </td>
                          <td className="p-4">{santri.keterangan}</td>
                          {isAdmin && (
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditSantri(santri)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteSantri(santri.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {getFilteredSantri().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {searchTerm || selectedKelas !== "all"
                      ? "Tidak ada santri yang ditemukan"
                      : "Belum ada data santri"}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="per-kelas">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-800">Manajemen Kelas</h2>
              {isAdmin && (
                <Button
                  onClick={() => setShowAddKelasForm(!showAddKelasForm)}
                  className="bg-green-700 hover:bg-green-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kelas
                </Button>
              )}
            </div>

            {/* Add Kelas Form */}
            {showAddKelasForm && isAdmin && (
              <Card className="mb-8 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Tambah Kelas Baru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Input
                        placeholder="Nama Kelas (contoh: MTs 1A, MA 2B, SMK 3C)"
                        value={newKelas.namaKelas}
                        onChange={(e) => setNewKelas({ namaKelas: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddKelas} className="bg-green-700 hover:bg-green-800">
                      Tambah
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddKelasForm(false)}>
                      Batal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6">
              {kelasData.map((kelas) => (
                <Card key={kelas.id} className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-800 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {kelas.namaKelas}
                        <Badge variant="secondary" className="ml-2">
                          {kelas.santri.length} Santri
                        </Badge>
                      </CardTitle>
                      {isAdmin && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteKelas(kelas.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {kelas.santri.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left p-2 font-semibold text-gray-700">Nama</th>
                              <th className="text-left p-2 font-semibold text-gray-700">Orang Tua</th>
                              <th className="text-left p-2 font-semibold text-gray-700">Status</th>
                              <th className="text-left p-2 font-semibold text-gray-700">Poin</th>
                              <th className="text-left p-2 font-semibold text-gray-700">Keterangan</th>
                              {isAdmin && <th className="text-left p-2 font-semibold text-gray-700">Aksi</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {kelas.santri.map((santri) => (
                              <tr key={santri.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-2 font-medium">{santri.nama}</td>
                                <td className="p-2">{santri.namaOrangTua}</td>
                                <td className="p-2">
                                  <Badge className={getPelanggaranColor(santri.jenisPelanggaran)} size="sm">
                                    {santri.jenisPelanggaran}
                                  </Badge>
                                </td>
                                <td className="p-2">
                                  <span className={getPointColor(santri.pointPelanggaran)}>
                                    {santri.pointPelanggaran}
                                  </span>
                                </td>
                                <td className="p-2 text-sm">{santri.keterangan}</td>
                                {isAdmin && (
                                  <td className="p-2">
                                    <div className="flex gap-1">
                                      <Button size="sm" variant="outline" onClick={() => handleEditSantri(santri)}>
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteSantri(santri.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>Belum ada santri di kelas ini</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
