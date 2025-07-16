"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, CheckCircle, Clock, X, Download, Mail, User, GraduationCap } from "lucide-react"

interface PendaftaranProps {
  isAdmin: boolean
}

interface DokumenUpload {
  aktaKelahiran: File | null
  kartuKeluarga: File | null
  ktpOrangTua: File | null
  skl: File | null
  ijazah: File | null
  foto: File | null
}

interface FormData {
  // Data Pribadi
  namaLengkap: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: string
  alamat: string
  noTelepon: string
  email: string

  // Data Orang Tua
  namaAyah: string
  namaIbu: string
  pekerjaanAyah: string
  pekerjaanIbu: string
  noTeleponOrangTua: string

  // Data Pendidikan
  asalSekolah: string
  programDipilih: string
  tahunMasuk: string

  // Dokumen
  dokumen: DokumenUpload

  // Pembayaran
  pembayaran: {
    sppBulanan: boolean
    uangPendaftaran: boolean
    infaqGudang: boolean
    uangLainLain: boolean
  }
}

interface PendaftarData extends FormData {
  id: string
  tanggalDaftar: string
  status: "pending" | "diterima" | "ditolak"
  catatan?: string
}

export function Pendaftaran({ isAdmin }: PendaftaranProps) {
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    noTelepon: "",
    email: "",
    namaAyah: "",
    namaIbu: "",
    pekerjaanAyah: "",
    pekerjaanIbu: "",
    noTeleponOrangTua: "",
    asalSekolah: "",
    programDipilih: "",
    tahunMasuk: "2025/2026",
    dokumen: {
      aktaKelahiran: null,
      kartuKeluarga: null,
      ktpOrangTua: null,
      skl: null,
      ijazah: null,
      foto: null,
    },
    pembayaran: {
      sppBulanan: false,
      uangPendaftaran: false,
      infaqGudang: false,
      uangLainLain: false,
    },
  })

  const [pendaftarList, setPendaftarList] = useState<PendaftarData[]>([
    {
      id: "PSB001",
      namaLengkap: "Ahmad Fauzi Rahman",
      tempatLahir: "Jakarta",
      tanggalLahir: "2010-05-15",
      jenisKelamin: "Laki-laki",
      alamat: "Jl. Merdeka No. 123, Jakarta",
      noTelepon: "081234567890",
      email: "ahmad.fauzi@email.com",
      namaAyah: "Bapak Rahman",
      namaIbu: "Ibu Siti",
      pekerjaanAyah: "Wiraswasta",
      pekerjaanIbu: "Ibu Rumah Tangga",
      noTeleponOrangTua: "081234567891",
      asalSekolah: "SD Negeri 01 Jakarta",
      programDipilih: "MTs",
      tahunMasuk: "2025/2026",
      dokumen: {
        aktaKelahiran: null,
        kartuKeluarga: null,
        ktpOrangTua: null,
        skl: null,
        ijazah: null,
        foto: null,
      },
      pembayaran: {
        sppBulanan: true,
        uangPendaftaran: true,
        infaqGudang: true,
        uangLainLain: false,
      },
      tanggalDaftar: "2024-12-01",
      status: "pending",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: boolean }>({})
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const syaratPendaftaran = [
    { id: "form", nama: "Mengisi Formulir Pendaftaran", required: true },
    { id: "aktaKelahiran", nama: "Foto Copy Akta (5 Lembar)", required: true },
    { id: "kartuKeluarga", nama: "Foto Copy KK (5 Lembar)", required: true },
    { id: "ktpOrangTua", nama: "Foto Copy KTP Bapak/Ibu (5 Lembar)", required: true },
    { id: "skl", nama: "Foto Copy SKL (5 Lembar)", required: true },
    { id: "ijazah", nama: "Foto Copy Ijazah Terakhir Legalisir (5 Lembar)", required: true },
    { id: "foto", nama: "Foto Ukuran 3x4 background Merah (2 Lembar)", required: true },
    { id: "sppBulanan", nama: "Membayar SPP Bulanan", required: true },
    { id: "uangPendaftaran", nama: "Membayar Uang Pendaftaran", required: true },
    { id: "infaqGudang", nama: "Membayar Infaq Gudang", required: true },
    { id: "uangLainLain", nama: "Membayar Uang Lain-lain", required: false },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (dokumenType: keyof DokumenUpload, file: File) => {
    if (file && (file.type.includes("pdf") || file.type.includes("image"))) {
      setUploadProgress((prev) => ({ ...prev, [dokumenType]: true }))

      // Simulate upload process
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          dokumen: {
            ...prev.dokumen,
            [dokumenType]: file,
          },
        }))
        setUploadProgress((prev) => ({ ...prev, [dokumenType]: false }))
      }, 1000)
    }
  }

  const handlePembayaranChange = (jenis: keyof FormData["pembayaran"], checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      pembayaran: {
        ...prev.pembayaran,
        [jenis]: checked,
      },
    }))
  }

  const handleSubmit = () => {
    setSubmitStatus("loading")

    // Simulate form submission
    setTimeout(() => {
      const newPendaftar: PendaftarData = {
        ...formData,
        id: `PSB${String(pendaftarList.length + 1).padStart(3, "0")}`,
        tanggalDaftar: new Date().toISOString().split("T")[0],
        status: "pending",
      }

      setPendaftarList((prev) => [...prev, newPendaftar])
      setSubmitStatus("success")

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          namaLengkap: "",
          tempatLahir: "",
          tanggalLahir: "",
          jenisKelamin: "",
          alamat: "",
          noTelepon: "",
          email: "",
          namaAyah: "",
          namaIbu: "",
          pekerjaanAyah: "",
          pekerjaanIbu: "",
          noTeleponOrangTua: "",
          asalSekolah: "",
          programDipilih: "",
          tahunMasuk: "2025/2026",
          dokumen: {
            aktaKelahiran: null,
            kartuKeluarga: null,
            ktpOrangTua: null,
            skl: null,
            ijazah: null,
            foto: null,
          },
          pembayaran: {
            sppBulanan: false,
            uangPendaftaran: false,
            infaqGudang: false,
            uangLainLain: false,
          },
        })
        setSubmitStatus("idle")
        setShowForm(false)
      }, 2000)
    }, 2000)
  }

  const handleStatusChange = (id: string, status: "diterima" | "ditolak", catatan?: string) => {
    setPendaftarList((prev) =>
      prev.map((pendaftar) => (pendaftar.id === id ? { ...pendaftar, status, catatan } : pendaftar)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "diterima":
        return "bg-green-100 text-green-800"
      case "ditolak":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "diterima":
        return <CheckCircle className="w-4 h-4" />
      case "ditolak":
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Pendaftaran Santri Baru</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Penerimaan Santri Baru Tahun Ajaran 2025/2026 - Pondok Pesantren DARUL HIKAM
          </p>
        </div>

        {/* Syarat Pendaftaran */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Syarat Pendaftaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {syaratPendaftaran.map((syarat, index) => (
                <div key={syarat.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{syarat.nama}</span>
                  {syarat.required && (
                    <Badge variant="destructive" className="text-xs">
                      Wajib
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={() => setShowForm(!showForm)} className="bg-green-700 hover:bg-green-800" size="lg">
            {showForm ? "Tutup Form" : "Mulai Pendaftaran"}
          </Button>
          {isAdmin && (
            <Button variant="outline" className="border-green-700 text-green-700 bg-transparent" size="lg">
              Kelola Pendaftaran ({pendaftarList.length})
            </Button>
          )}
        </div>

        {/* Form Pendaftaran */}
        {showForm && (
          <Card className="mb-8 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Form Pendaftaran Santri Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitStatus === "success" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Pendaftaran berhasil dikirim! ID Pendaftaran Anda akan dikirim via email.
                  </AlertDescription>
                </Alert>
              )}

              {/* Data Pribadi */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Data Pribadi Calon Santri
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nama Lengkap"
                    value={formData.namaLengkap}
                    onChange={(e) => handleInputChange("namaLengkap", e.target.value)}
                  />
                  <Input
                    placeholder="Tempat Lahir"
                    value={formData.tempatLahir}
                    onChange={(e) => handleInputChange("tempatLahir", e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="Tanggal Lahir"
                    value={formData.tanggalLahir}
                    onChange={(e) => handleInputChange("tanggalLahir", e.target.value)}
                  />
                  <Select
                    value={formData.jenisKelamin}
                    onValueChange={(value) => handleInputChange("jenisKelamin", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="No. Telepon"
                    value={formData.noTelepon}
                    onChange={(e) => handleInputChange("noTelepon", e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Alamat Lengkap"
                      value={formData.alamat}
                      onChange={(e) => handleInputChange("alamat", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Data Orang Tua
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nama Ayah"
                    value={formData.namaAyah}
                    onChange={(e) => handleInputChange("namaAyah", e.target.value)}
                  />
                  <Input
                    placeholder="Nama Ibu"
                    value={formData.namaIbu}
                    onChange={(e) => handleInputChange("namaIbu", e.target.value)}
                  />
                  <Input
                    placeholder="Pekerjaan Ayah"
                    value={formData.pekerjaanAyah}
                    onChange={(e) => handleInputChange("pekerjaanAyah", e.target.value)}
                  />
                  <Input
                    placeholder="Pekerjaan Ibu"
                    value={formData.pekerjaanIbu}
                    onChange={(e) => handleInputChange("pekerjaanIbu", e.target.value)}
                  />
                  <Input
                    placeholder="No. Telepon Orang Tua"
                    value={formData.noTeleponOrangTua}
                    onChange={(e) => handleInputChange("noTeleponOrangTua", e.target.value)}
                  />
                </div>
              </div>

              {/* Data Pendidikan */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Data Pendidikan
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Asal Sekolah"
                    value={formData.asalSekolah}
                    onChange={(e) => handleInputChange("asalSekolah", e.target.value)}
                  />
                  <Select
                    value={formData.programDipilih}
                    onValueChange={(value) => handleInputChange("programDipilih", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Program yang Dipilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MTs">Madrasah Tsanawiyah (MTs)</SelectItem>
                      <SelectItem value="MA">Madrasah Aliyah (MA)</SelectItem>
                      <SelectItem value="SMK">SMK Darul Hikam</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Tahun Masuk"
                    value={formData.tahunMasuk}
                    onChange={(e) => handleInputChange("tahunMasuk", e.target.value)}
                  />
                </div>
              </div>

              {/* Upload Dokumen */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Dokumen
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries({
                    aktaKelahiran: "Foto Copy Akta Kelahiran",
                    kartuKeluarga: "Foto Copy Kartu Keluarga",
                    ktpOrangTua: "Foto Copy KTP Orang Tua",
                    skl: "Foto Copy SKL",
                    ijazah: "Foto Copy Ijazah Terakhir",
                    foto: "Foto 3x4 Background Merah",
                  }).map(([key, label]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">{label}</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {formData.dokumen[key as keyof DokumenUpload] ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">File berhasil diupload</span>
                          </div>
                        ) : uploadProgress[key] ? (
                          <div className="flex items-center justify-center gap-2 text-blue-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm">Mengupload...</span>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileUpload(key as keyof DokumenUpload, file)
                              }}
                              className="hidden"
                              id={`upload-${key}`}
                            />
                            <label htmlFor={`upload-${key}`} className="cursor-pointer">
                              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">Klik untuk upload</p>
                              <p className="text-xs text-gray-500">PDF, PNG, JPG (Max 5MB)</p>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Konfirmasi Pembayaran */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4">Konfirmasi Pembayaran</h3>
                <div className="space-y-3">
                  {Object.entries({
                    sppBulanan: "SPP Bulanan",
                    uangPendaftaran: "Uang Pendaftaran",
                    infaqGudang: "Infaq Gudang",
                    uangLainLain: "Uang Lain-lain",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={formData.pembayaran[key as keyof FormData["pembayaran"]]}
                        onCheckedChange={(checked) =>
                          handlePembayaranChange(key as keyof FormData["pembayaran"], checked as boolean)
                        }
                      />
                      <label
                        htmlFor={key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sudah membayar {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={submitStatus === "loading"}
                  className="bg-green-700 hover:bg-green-800 px-8 py-3"
                  size="lg"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengirim Pendaftaran...
                    </>
                  ) : (
                    "Kirim Pendaftaran"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daftar Pendaftar (Admin Only) */}
        {isAdmin && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Daftar Pendaftar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendaftarList.map((pendaftar) => (
                  <div key={pendaftar.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{pendaftar.id}</Badge>
                        <h4 className="font-semibold text-green-800">{pendaftar.namaLengkap}</h4>
                        <Badge className={getStatusColor(pendaftar.status)}>
                          {getStatusIcon(pendaftar.status)}
                          <span className="ml-1 capitalize">{pendaftar.status}</span>
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Program:</span> {pendaftar.programDipilih}
                      </div>
                      <div>
                        <span className="font-medium">Tanggal Daftar:</span> {pendaftar.tanggalDaftar}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {pendaftar.email}
                      </div>
                    </div>

                    {pendaftar.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          className="bg-green-700 hover:bg-green-800"
                          onClick={() => handleStatusChange(pendaftar.id, "diterima")}
                        >
                          Terima
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(pendaftar.id, "ditolak")}
                        >
                          Tolak
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
