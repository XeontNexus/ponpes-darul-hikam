"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Award, Edit, ImageIcon, Plus, Save, Trash2, Upload, X } from "lucide-react"

const TEMP_ID_MIN = 10_000_000_000

const defaultAchievements = [
  { id: 100000000001, nama: "Abdul Roni", prestasi: "Juara Tilawah Tingkat Kabupaten", tingkat: "Kabupaten" },
  { id: 100000000002, nama: "Gilang", prestasi: "Juara Qori Internasional", tingkat: "Internasional" },
  { id: 100000000003, nama: "Muhammad Irfan", prestasi: "Juara 1 Tahfidz 30 Juz", tingkat: "Provinsi" },
  { id: 100000000004, nama: "Aisyah Nur", prestasi: "Juara 1 Kaligrafi Islami", tingkat: "Nasional" },
  { id: 100000000005, nama: "Fahmi & Tim", prestasi: "Juara 1 Lomba Programming & Web Design", tingkat: "Nasional" },
  { id: 100000000006, nama: "Siti Fatimah", prestasi: "Juara 1 Pidato Bahasa Arab", tingkat: "Kabupaten" },
]

const defaultPhotos = [
  { id: 100000000101, nama: "Kegiatan Tahfidz Al-Qur'an", deskripsi: "Santri sedang mengikuti setoran dan muraja'ah hafalan Al-Qur'an harian.", foto: "/images/banner2.png" },
  { id: 100000000102, nama: "Olimpiade Sains & Keagamaan", deskripsi: "Dokumentasi keikutsertaan santri dalam olimpiade tingkat kabupaten & provinsi.", foto: "/images/banner5.png" },
  { id: 100000000103, nama: "Wisuda & Haflah Akhirussanah", deskripsi: "Prosesi wisuda kelulusan santri dan penyerahan penghargaan santri berprestasi.", foto: "/images/banner1.png" },
]

async function uploadDataImage(image: string, folder: string) {
  if (!image.startsWith("data:image/")) return image
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, folder }),
  })
  const data = await response.json()
  if (!response.ok || !data.url) throw new Error(data.error || "Upload foto gagal")
  return data.url as string
}

export function AdminPencapaianSection() {
  const [items, setItems] = useState<any[]>(defaultAchievements)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nama: "", prestasi: "", tingkat: "" })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/prestasi").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setItems(data)
    })
  }, [])

  const edit = (item: any) => {
    setEditId(item.id)
    setForm({ nama: item.nama, prestasi: item.prestasi, tingkat: item.tingkat || "" })
  }

  const add = () => {
    const id = Date.now() * 100
    const item = { id, nama: "Nama Santri", prestasi: "Prestasi baru", tingkat: "Kabupaten" }
    setItems((prev) => [...prev, item])
    edit(item)
  }

  const save = async () => {
    if (editId === null || !form.nama.trim() || !form.prestasi.trim()) return alert("Nama dan prestasi wajib diisi")
    setSaving(true)
    try {
      const isNew = editId > TEMP_ID_MIN
      const response = await fetch("/api/prestasi", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? form : { id: editId, ...form }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan pencapaian")
      setItems((prev) => prev.map((item) => item.id === editId ? data : item))
      setEditId(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menyimpan pencapaian")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Hapus pencapaian ini?")) return
    if (id > TEMP_ID_MIN) return setItems((prev) => prev.filter((item) => item.id !== id))
    const response = await fetch("/api/prestasi", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    if (response.ok) setItems((prev) => prev.filter((item) => item.id !== id))
    else alert("Gagal menghapus pencapaian")
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div><h1 className="text-xl font-bold text-gray-800">Pencapaian Santri</h1><p className="text-sm text-gray-500 mt-1">Data ini tampil pada bagian Beberapa Pencapaian Lainnya.</p></div>
        <button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" /> Tambah Pencapaian</button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            {editId === item.id ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" placeholder="Nama santri" />
                <input value={form.prestasi} onChange={(e) => setForm({ ...form, prestasi: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" placeholder="Prestasi" />
                <input value={form.tingkat} onChange={(e) => setForm({ ...form, tingkat: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" placeholder="Tingkat" />
                <div className="md:col-span-3 flex gap-2"><button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button><button onClick={() => setEditId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"><X className="w-4 h-4" /> Batal</button></div>
              </div>
            ) : (
              <div className="flex items-center gap-3"><Award className="w-5 h-5 text-green-600 flex-shrink-0" /><div className="flex-1 min-w-0"><p className="font-semibold text-gray-800 text-sm">{item.nama}</p><p className="text-xs text-gray-500 mt-0.5">{item.prestasi} {item.tingkat ? `— ${item.tingkat}` : ""}</p></div><button onClick={() => edit(item)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Edit className="w-4 h-4" /></button><button onClick={() => remove(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminDokumentasiSection() {
  const [items, setItems] = useState<any[]>(defaultPhotos)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nama: "", deskripsi: "", foto: "" })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/foto-kegiatan").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setItems(data)
    })
  }, [])

  const edit = (item: any) => {
    setEditId(item.id)
    setForm({ nama: item.nama, deskripsi: item.deskripsi || "", foto: item.foto })
  }

  const add = () => {
    const id = Date.now() * 100
    const item = { id, nama: "Chart Dokumentasi Baru", deskripsi: "Deskripsi dokumentasi", foto: "/images/banner1.png" }
    setItems((prev) => [...prev, item])
    edit(item)
  }

  const choosePhoto = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) return alert("File harus berupa gambar")
    if (file.size > 2 * 1024 * 1024) return alert("Ukuran foto maksimal 2MB")
    const reader = new FileReader()
    reader.onload = () => setForm((prev) => ({ ...prev, foto: reader.result?.toString() || prev.foto }))
    reader.readAsDataURL(file)
  }

  const save = async () => {
    if (editId === null || !form.nama.trim() || !form.deskripsi.trim()) return alert("Judul dan deskripsi wajib diisi")
    setSaving(true)
    try {
      const foto = await uploadDataImage(form.foto, "prestasi")
      const payload = { nama: form.nama, deskripsi: form.deskripsi, foto, kategori: "prestasi" }
      const isNew = editId > TEMP_ID_MIN
      const response = await fetch("/api/foto-kegiatan", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? payload : { id: editId, ...payload }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan dokumentasi")
      setItems((prev) => prev.map((item) => item.id === editId ? data : item))
      setEditId(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menyimpan dokumentasi")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Hapus chart dokumentasi ini?")) return
    if (id > TEMP_ID_MIN) return setItems((prev) => prev.filter((item) => item.id !== id))
    const response = await fetch("/api/foto-kegiatan", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    if (response.ok) setItems((prev) => prev.filter((item) => item.id !== id))
    else alert("Gagal menghapus dokumentasi")
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div><h1 className="text-xl font-bold text-gray-800">Dokumentasi Foto</h1><p className="text-sm text-gray-500 mt-1">Edit tulisan, foto, atau tambah chart dokumentasi baru.</p></div>
        <button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" /> Tambah Chart</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id ? (
              <div className="p-5 space-y-3">
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">{form.foto && <Image src={form.foto} alt="Preview" fill className="object-cover" />}</div>
                <label className="inline-flex cursor-pointer items-center gap-2 border rounded-lg px-4 py-2 text-sm"><Upload className="w-4 h-4 text-green-600" /> Ganti Foto<input type="file" accept="image/*" className="hidden" onChange={(e) => choosePhoto(e.target.files?.[0])} /></label>
                <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Judul chart" />
                <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={4} placeholder="Deskripsi chart" />
                <div className="flex gap-2"><button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button><button onClick={() => setEditId(null)} className="border px-4 py-2 rounded-xl text-sm">Batal</button></div>
              </div>
            ) : (
              <><div className="relative h-44"><Image src={item.foto} alt={item.nama} fill className="object-cover" /></div><div className="p-4 flex items-start gap-3"><ImageIcon className="w-5 h-5 text-green-600 mt-0.5" /><div className="flex-1"><p className="font-semibold text-gray-800 text-sm">{item.nama}</p><p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.deskripsi}</p></div><button onClick={() => edit(item)} className="p-2 text-green-600"><Edit className="w-4 h-4" /></button><button onClick={() => remove(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button></div></>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
