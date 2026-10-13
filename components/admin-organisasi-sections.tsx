"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BookOpen, Calendar, Edit, Plus, Save, Trash2, Upload, X } from "lucide-react"

const TEMP_ID_MIN = 10_000_000_000

const defaultPengasuh = {
  nama: "KH. Ahmad Dahlan",
  jabatan: "Pengasuh & Pimpinan Utama Pondok Pesantren",
  periode: "Mengasuh Sejak 1994",
  biografi: "Pendiri dan Pengasuh Pondok Pesantren DARUL HIKAM. Berkomitmen dalam membimbing para santri menuju keunggulan ilmu syariat, hafalan Al-Qur'an, wawasan sains, dan berakhlakul karimah.",
  foto: "/images/banner3.png",
}

const defaultGuru = [
  { id: 100000000001, nama: "Ust. Muhammad Yusuf, M.Pd.I", jabatan: "Pengajar Fiqh & Direktur Kurikulum", unitMengajar: "MA Darul Hikam", tahunMengajar: "Sejak Tahun 2008", foto: "/images/banner2.png", deskripsi: "Mengampu mata pelajaran Fiqh Ushul & Tafsir Ahkam." },
  { id: 100000000002, nama: "Ustdzah Fatimah Azzahra, S.Pd.I", jabatan: "Pengajar Tahfidz & Akhlak", unitMengajar: "Madrasah Diniyah", tahunMengajar: "Sejak Tahun 2012", foto: "/images/sejarah3.png", deskripsi: "Membimbing kelompok hafalan santri putri." },
  { id: 100000000003, nama: "Ust. Ahmad Fauzi, Lc", jabatan: "Pengajar Bahasa Arab & Hadits", unitMengajar: "MTs Darul Hikam", tahunMengajar: "Sejak Tahun 2015", foto: "/images/banner4.png", deskripsi: "Mengajar tata bahasa Nahwu Shorof dan Hadits Tematik." },
  { id: 100000000004, nama: "Ust. Abdullah Rahman, S.Ag", jabatan: "Pengajar Tajwid & Qira'ah", unitMengajar: "Madrasah Diniyah", tahunMengajar: "Sejak Tahun 2010", foto: "/images/sejarah1.png", deskripsi: "Pembina kegiatan Tilawatil Qur'an santri putra." },
  { id: 100000000005, nama: "Bapak Suryadi, S.Pd", jabatan: "Pengajar Matematika & IPA", unitMengajar: "MTs & MA Darul Hikam", tahunMengajar: "Sejak Tahun 2016", foto: "/images/banner5.png", deskripsi: "Mengajar ilmu sains terpadu dan bimbingan olimpiade." },
  { id: 100000000006, nama: "Ibu Siti Nurhaliza, S.Pd", jabatan: "Pengajar Komputer & Rekayasa Perangkat Lunak", unitMengajar: "SMK Darul Hikam", tahunMengajar: "Sejak Tahun 2018", foto: "/images/sejarah4.png", deskripsi: "Instruktur laboratorium komputer dan bahasa pemograman." },
]

async function uploadImage(image: string, folder: string) {
  if (!image.startsWith("data:image/")) return image
  const response = await fetch("/api/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image, folder }) })
  const data = await response.json()
  if (!response.ok || !data.url) throw new Error(data.error || "Upload foto gagal")
  return data.url as string
}

function selectImage(file: File | undefined, setter: (image: string) => void) {
  if (!file) return
  if (!file.type.startsWith("image/")) return alert("File harus berupa gambar")
  if (file.size > 2 * 1024 * 1024) return alert("Ukuran foto maksimal 2MB")
  const reader = new FileReader()
  reader.onload = () => setter(reader.result?.toString() || "")
  reader.readAsDataURL(file)
}

export function AdminPengasuhSection() {
  const [form, setForm] = useState(defaultPengasuh)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((data) => {
      if (data && !data.error) setForm({
        nama: data.pengasuhNama || defaultPengasuh.nama,
        jabatan: data.pengasuhJabatan || defaultPengasuh.jabatan,
        periode: data.pengasuhPeriode || defaultPengasuh.periode,
        biografi: data.pengasuhBiografi || defaultPengasuh.biografi,
        foto: data.pengasuhFoto || defaultPengasuh.foto,
      })
    })
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const foto = await uploadImage(form.foto, "organisasi")
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pengasuhNama: form.nama, pengasuhJabatan: form.jabatan, pengasuhPeriode: form.periode, pengasuhBiografi: form.biografi, pengasuhFoto: foto }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan profil pengasuh")
      setForm((prev) => ({ ...prev, foto }))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menyimpan profil pengasuh")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6"><h1 className="text-xl font-bold text-gray-800">Profil Pengasuh</h1><p className="text-sm text-gray-500 mt-1">Sama dengan banner pengasuh pada halaman Organisasi.</p></div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <div><div className="relative h-72 rounded-2xl overflow-hidden bg-gray-100"><Image src={form.foto} alt={form.nama} fill className="object-cover object-top" /></div><label className="mt-3 flex justify-center cursor-pointer items-center gap-2 border rounded-xl px-4 py-2 text-sm"><Upload className="w-4 h-4 text-green-600" /> Ganti Foto<input type="file" accept="image/*" className="hidden" onChange={(e) => selectImage(e.target.files?.[0], (foto) => setForm({ ...form, foto }))} /></label></div>
        <div className="space-y-4">
          <div><label className="text-sm font-medium text-gray-700">Nama Pengasuh</label><input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm" /></div>
          <div><label className="text-sm font-medium text-gray-700">Jabatan</label><input value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm" /></div>
          <div><label className="text-sm font-medium text-gray-700">Periode Mengasuh</label><input value={form.periode} onChange={(e) => setForm({ ...form, periode: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm" /></div>
          <div><label className="text-sm font-medium text-gray-700">Biografi</label><textarea rows={6} value={form.biografi} onChange={(e) => setForm({ ...form, biografi: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm resize-y" /></div>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 text-white rounded-xl px-5 py-2.5 text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan Profil"}</button>
        </div>
      </div>
    </div>
  )
}

export function AdminGuruSection() {
  const [items, setItems] = useState<any[]>(defaultGuru)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nama: "", jabatan: "", unitMengajar: "", tahunMengajar: "", foto: "", deskripsi: "" })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/guru").then((r) => r.json()).then((data) => { if (Array.isArray(data) && data.length > 0) setItems(data) })
  }, [])

  const edit = (item: any) => { setEditId(item.id); setForm({ nama: item.nama, jabatan: item.jabatan, unitMengajar: item.unitMengajar, tahunMengajar: item.tahunMengajar || "", foto: item.foto, deskripsi: item.deskripsi || "" }) }
  const add = () => { const id = Date.now() * 100; const item = { id, nama: "Nama Ustadz/Ustadzah", jabatan: "Jabatan / Mata Pelajaran", unitMengajar: "MTs Darul Hikam", tahunMengajar: "Sejak Tahun 2020", foto: "/images/banner2.png", deskripsi: "Deskripsi singkat pengajar." }; setItems((prev) => [...prev, item]); edit(item) }

  const save = async () => {
    if (editId === null || !form.nama.trim() || !form.jabatan.trim() || !form.unitMengajar.trim()) return alert("Nama, jabatan, dan unit mengajar wajib diisi")
    setSaving(true)
    try {
      const foto = await uploadImage(form.foto, "guru")
      const payload = { ...form, foto }
      const isNew = editId > TEMP_ID_MIN
      const response = await fetch("/api/guru", { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(isNew ? payload : { id: editId, ...payload }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan data pengajar")
      setItems((prev) => prev.map((item) => item.id === editId ? data : item))
      setEditId(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menyimpan data pengajar")
    } finally { setSaving(false) }
  }

  const remove = async (id: number) => {
    if (!confirm("Hapus chart pengajar ini?")) return
    if (id > TEMP_ID_MIN) return setItems((prev) => prev.filter((item) => item.id !== id))
    const response = await fetch("/api/guru", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    if (response.ok) setItems((prev) => prev.filter((item) => item.id !== id)); else alert("Gagal menghapus data pengajar")
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6"><div><h1 className="text-xl font-bold text-gray-800">Daftar Ustadz & Ustadzah</h1><p className="text-sm text-gray-500 mt-1">Edit semua isi chart atau tambah chart pengajar baru.</p></div><button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm"><Plus className="w-4 h-4" /> Tambah Chart</button></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id ? (
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-4"><div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100"><Image src={form.foto} alt="Preview" fill className="object-cover" /></div><label className="cursor-pointer border rounded-xl px-4 py-2 text-sm"><Upload className="inline w-4 h-4 mr-2 text-green-600" /> Ganti Foto<input type="file" accept="image/*" className="hidden" onChange={(e) => selectImage(e.target.files?.[0], (foto) => setForm({ ...form, foto }))} /></label></div>
                <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Nama & gelar" />
                <input value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Jabatan / mata pelajaran" />
                <input value={form.unitMengajar} onChange={(e) => setForm({ ...form, unitMengajar: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Unit mengajar" />
                <input value={form.tahunMengajar} onChange={(e) => setForm({ ...form, tahunMengajar: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Tahun mengajar" />
                <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={4} placeholder="Deskripsi singkat" />
                <div className="flex gap-2"><button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button><button onClick={() => setEditId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"><X className="w-4 h-4" /> Batal</button></div>
              </div>
            ) : (
              <div className="p-5 flex items-start gap-4"><div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0"><Image src={item.foto} alt={item.nama} fill className="object-cover" /></div><div className="flex-1 min-w-0"><p className="font-bold text-gray-800 text-sm">{item.nama}</p><p className="text-xs text-gray-500 mt-1">{item.jabatan}</p><div className="flex flex-wrap gap-2 mt-2"><span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1 flex items-center gap-1"><BookOpen className="w-3 h-3" />{item.unitMengajar}</span><span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1 flex items-center gap-1"><Calendar className="w-3 h-3" />{item.tahunMengajar}</span></div><p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.deskripsi}</p></div><button onClick={() => edit(item)} className="p-2 text-green-600"><Edit className="w-4 h-4" /></button><button onClick={() => remove(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
