"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Edit, Plus, Save, Trash2, Upload, X } from "lucide-react"

const TEMP_ID_MIN = 10_000_000_000

// ─── Default fallback data (same as landing page) ────────────────────────────

const defaultHeroSlides = [
  { id: 100000000001, title: "Kehidupan & Karakter Santri", subtitle: "Membentuk pribadi santri yang mandiri, disiplin, berakhlak mulia, dan berlandaskan Al-Qur'an.", image: "/images/banner1.png" },
  { id: 100000000002, title: "Kajian Kitab Kuning & Syariat", subtitle: "Mendalami ilmu-ilmu agama klasik Islam bersama para Ustadz dan Ustadzah pengampu.", image: "/images/banner2.png" },
  { id: 100000000003, title: "Pembiasaan Ibadah & Shalat Berjamaah", subtitle: "Menanamkan nilai spiritualitas tinggi melalui shalat berjamaah 5 waktu di Masjid Utama.", image: "/images/banner4.png" },
  { id: 100000000004, title: "Pendidikan Formal & Keterampilan Modern", subtitle: "Menyeimbangkan ilmu syariat dengan sains, matematika, serta teknologi informasi modern.", image: "/images/banner5.png" },
  { id: 100000000005, title: "Lingkungan Asrama yang Asri & Nyaman", subtitle: "Suasana belajar dan beristirahat yang kondusif bagi tumbuh kembang santri putra dan putri.", image: "/images/banner3.png" },
  { id: 100000000006, title: "Kemandirian & Kebersamaan Ukhuwah", subtitle: "Menumbuhkan jiwa kepemimpinan, kepedulian sosial, dan gotong royong antar sesama santri.", image: "/images/sejarah1.png" },
]

const defaultPelajaranSlides = [
  { id: 100000000001, title: "Pendidikan PAUD & RA Islami", subtitle: "Pembentukan dasar akhlak mulia dan pengenalan huruf hijaiyah usia dini.", image: "/images/banner1.png" },
  { id: 100000000002, title: "Pelajaran SD / MI Terpadu", subtitle: "Pendidikan dasar membaca Al-Qur'an, matematika, dan ilmu pengetahuan alam.", image: "/images/banner2.png" },
  { id: 100000000003, title: "Pembelajaran MTs (Menengah Pertama)", subtitle: "Pendalaman Bahasa Arab, Bahasa Inggris, Matematika, IPA, dan Fiqih Islam.", image: "/images/banner5.png" },
  { id: 100000000004, title: "Pembelajaran MA (Menengah Atas)", subtitle: "Penjurian IPA, IPS, dan Keagamaan untuk persiapan perguruan tinggi nasional/timur tengah.", image: "/images/banner3.png" },
  { id: 100000000005, title: "Pembelajaran SMK Kejuruan", subtitle: "Penguasaan keahlian vokasi, teknik komputer jaringan, dan rekayasa perangkat lunak.", image: "/images/sejarah4.png" },
  { id: 100000000006, title: "Praktik Laboratorium Sains & Komputer", subtitle: "Fasilitas eksperimen fisika, biologi, dan komputer berteknologi modern.", image: "/images/banner5.png" },
  { id: 100000000007, title: "Bimbingan Olimpiade Sains & Keagamaan", subtitle: "Pembinaan khusus bagi santri bertalenta tinggi untuk ajang kompetisi.", image: "/images/sejarah3.png" },
  { id: 100000000008, title: "Pembelajaran Bahasa Foreign Language", subtitle: "Penguasaan percakapan Bahasa Arab dan Inggris harian (Muhadatsah).", image: "/images/banner2.png" },
  { id: 100000000009, title: "Studi Literasi & Perpustakaan Digital", subtitle: "Penyediaan ribuan koleksi buku referensi agama dan pengetahuan umum.", image: "/images/sejarah5.png" },
  { id: 100000000010, title: "Integrasi Kurikulum Kemendikbud & Kemenag", subtitle: "Ijazah resmi terakreditasi nasional yang diakui secara luas.", image: "/images/banner4.png" },
]

const defaultKitabSlides = [
  { id: 100000000001, title: "Kajian Kitab Fiqih Safinatun Najah", subtitle: "Dasar-dasar tata cara bersuci, shalat, dan ibadah fardhu harian santri pemula.", image: "/images/banner2.png" },
  { id: 100000000002, title: "Kajian Kitab Fathul Qorib", subtitle: "Pendalaman hukum fiqih muamalah, munakahat, dan ibadah tingkat menengah.", image: "/images/sejarah2.png" },
  { id: 100000000003, title: "Kajian Nahwu Kitab Matan Al-Jurumiyah", subtitle: "Kaidah tata bahasa Arab tata kata dan tata kalimat dasar.", image: "/images/banner4.png" },
  { id: 100000000004, title: "Kajian Kitab Nadhom Al-Imrithi & Alfiyah", subtitle: "Hafalan bait-bait tata bahasa Arab tingkat lanjut bagi santri senior.", image: "/images/sejarah1.png" },
  { id: 100000000005, title: "Kajian Hadits Bulughul Maram", subtitle: "Himpunan hadits-hadits hukum fiqih perbandingan dalil shahih.", image: "/images/banner3.png" },
  { id: 100000000006, title: "Kajian Akhlak Ta'lim Muta'allim", subtitle: "Pedoman adab ilmu, menghormati guru, dan etika penuntut ilmu syariat.", image: "/images/banner1.png" },
  { id: 100000000007, title: "Kajian Tafsir Al-Qur'an Jalalain", subtitle: "Pemahaman makna ayat Al-Qur'an secara ilmiah dan mendalam.", image: "/images/sejarah3.png" },
  { id: 100000000008, title: "Kajian Hadits Arbain Nawawiyah", subtitle: "Pelajaran 42 hadits pokok ajaran agama Islam karya Imam An-Nawawi.", image: "/images/banner5.png" },
  { id: 100000000009, title: "Kajian Aqidah Aqidatul Awam", subtitle: "Penanaman rukun iman dan aqidah Ahli Sunnah Wal Jama'ah (Aswaja).", image: "/images/sejarah5.png" },
  { id: 100000000010, title: "Kajian Tasawuf Riyadhus Shalihin", subtitle: "Pembersihan jiwa, penataan hati, dan tazkiyatun nufus dalam ibadah.", image: "/images/banner4.png" },
]

const defaultEkskulSlides = [
  { id: 100000000001, title: "Seni Hadroh & Qasidah Rebana", subtitle: "Grup sholawat santri penampil acara resmi dan festival keagamaan.", image: "/images/sejarah1.png" },
  { id: 100000000002, title: "Pencak Silat Pagar Nusa / Tapak Suci", subtitle: "Seni bela diri tradisional pembentuk fisik tangguh dan kedisiplinan.", image: "/images/sejarah4.png" },
  { id: 100000000003, title: "Olahraga Sunnah Panahan (Archery)", subtitle: "Latihan konsentrasi, ketepatan, dan pembentukan fokus mental santri.", image: "/images/banner1.png" },
  { id: 100000000004, title: "Jam'iyyah Qira'ah & Tilawatil Qur'an", subtitle: "Bimbingan seni membaca Al-Qur'an berlagu (Lagam Mujawwad).", image: "/images/banner2.png" },
  { id: 100000000005, title: "Public Speaking & Muhadhoroh 3 Bahasa", subtitle: "Latihan pidato dan dakwah dalam Bahasa Indonesia, Arab, dan Inggris.", image: "/images/banner3.png" },
  { id: 100000000006, title: "Gerakan Pramuka Pesantren", subtitle: "Pramuka bernuansa islami melatih keorganisasian dan kemandirian lapangan.", image: "/images/banner5.png" },
  { id: 100000000007, title: "Seni Kaligrafi Islam (Khat Al-Qur'an)", subtitle: "Keterampilan seni menulis indah ayat Al-Qur'an naskhi, tsuluts, dan diwani.", image: "/images/sejarah3.png" },
  { id: 100000000008, title: "Klub Olahraga Futsal & Bola Voli", subtitle: "Kegiatan kebugaran fisik dan kejuaraan antar pesantren kabupaten.", image: "/images/banner4.png" },
  { id: 100000000009, title: "Jurnalistik & Media Santri", subtitle: "Pelatihan fotografi, videografi, dan penulisan buletin pesantren.", image: "/images/sejarah5.png" },
  { id: 100000000010, title: "Klub Komputer & Coding Robotik", subtitle: "Pengembangan bakat pemograman web dan teknologi informasi masa kini.", image: "/images/banner5.png" },
]

const defaultPelajaranJenjang = [
  { id: 100000000001, jenjang: "PAUD & RA", deskripsi: "Pendidikan anak usia dini berbasis pembentukan karakter akhlakul karimah.", mapel: "Membaca Hijaiyah & Iqra'\nHafalan Surat Pendek & Doa Harian\nMewarnai & Keterampilan Motorik\nBahasa Indonesia Dasar" },
  { id: 100000000002, jenjang: "SD / MI", deskripsi: "Pendidikan dasar terpadu penguatan Al-Qur'an dan literasi sains dasar.", mapel: "Al-Qur'an Hadits\nAkidah Akhlak\nFiqih Ibadah\nMatematika & IPA\nBahasa Indonesia & Inggris" },
  { id: 100000000003, jenjang: "MTs (Menengah Pertama)", deskripsi: "Formalisasi jenjang sekolah menengah pertama dengan penguatan Bahasa Arab dan Sains.", mapel: "Bahasa Arab & Nahwu\nTahfidz Al-Qur'an\nMatematika & IPA Terpadu\nIPS & Bahasa Inggris\nInformatika / Komputer" },
  { id: 100000000004, jenjang: "MA (Menengah Atas)", deskripsi: "Jenjang pendidikan menengah atas dengan peminatan Keagamaan, IPA, dan IPS.", mapel: "Tafsir & Ulumul Qur'an\nHadits & Mustholah Hadits\nFiqih & Ushul Fiqih\nFisika, Kimia, Biologi\nEkonomi & Sosiologi" },
  { id: 100000000005, jenjang: "SMK Darul Hikam", deskripsi: "Sekolah Menengah Kejuruan vokasi berbekal keterampilan praktis dunia kerja.", mapel: "Teknik Komputer & Jaringan (TKJ)\nRekayasa Perangkat Lunak (RPL)\nDesain Grafis & Pemograman Web\nKewirausahaan Digital" },
]

const defaultKitab = [
  { id: 100000000001, namaKitab: "Safinatun Najah", pengarang: "Syekh Salim bin Sumair Al-Hadhrami", bidang: "Fiqih Ibadah", deskripsi: "Dasar hukum ibadah thaharah, shalat, zakat, dan puasa." },
  { id: 100000000002, namaKitab: "Fathul Qorib", pengarang: "Syekh Ibn Qasim Al-Ghazi", bidang: "Fiqih Syariat", deskripsi: "Pedoman hukum fiqih terpadu muamalah dan ibadah santri menengah." },
  { id: 100000000003, namaKitab: "Matan Al-Jurumiyah", pengarang: "Syekh Abu Abdillah Ash-Shanhaji", bidang: "Gramatika Nahwu", deskripsi: "Kaidah susunan kata dan kalimat dalam Bahasa Arab." },
  { id: 100000000004, namaKitab: "Nadhom Al-Imrithi", pengarang: "Syekh Syarafuddin Al-Imrithi", bidang: "Nahwu Sastra", deskripsi: "Bait syair hafalan tata bahasa Arab tingkat lanjut." },
  { id: 100000000005, namaKitab: "Bulughul Maram", pengarang: "Al-Hafizh Ibn Hajar Al-Asqalani", bidang: "Hadits Hukum", deskripsi: "Kumpulan hadits shahih dasar dalil-dalil hukum syariat." },
  { id: 100000000006, namaKitab: "Ta'lim Muta'allim", pengarang: "Syekh Burhanuddin Al-Zarnuji", bidang: "Akhlak & Adab", deskripsi: "Panduan etika penuntut ilmu, adab pada guru dan Al-Qur'an." },
  { id: 100000000007, namaKitab: "Tafsir Jalalain", pengarang: "Imam Jalaluddin Al-Mahalli & As-Suyuthi", bidang: "Tafsir Al-Qur'an", deskripsi: "Penjelasan makna ringkas dan ilmiah ayat-ayat Al-Qur'an." },
  { id: 100000000008, namaKitab: "Aqidatul Awam", pengarang: "Syekh Ahmad Al-Marzuki", bidang: "Aqidah Tauhid", deskripsi: "Nadzom tauhid pemahaman dasar iman dan rukun islam." },
]

const defaultEkskul = [
  { id: 100000000001, nama: "Seni Hadroh & Qasidah", kategori: "Kesenian Islami", deskripsi: "Grup lantunan sholawat dengan alat musik rebana tradisional." },
  { id: 100000000002, nama: "Pencak Silat Pagar Nusa / Tapak Suci", kategori: "Bela Diri", deskripsi: "Latihan bela diri fisik, ketangkasan, dan pembentukan jiwa ksatria." },
  { id: 100000000003, nama: "Panahan (Archery)", kategori: "Olahraga Sunnah", deskripsi: "Latihan melatih fokus pikiran, stabilitas tangan, dan konsentrasi." },
  { id: 100000000004, nama: "Jam'iyyah Qira'ah", kategori: "Seni Al-Qur'an", deskripsi: "Bimbingan teknik pembacaan Al-Qur'an bernada tinggi dan indah." },
  { id: 100000000005, nama: "Muhadhoroh 3 Bahasa", kategori: "Public Speaking", deskripsi: "Latihan pidato dan khutbah dalam Bahasa Indonesia, Arab, & Inggris." },
  { id: 100000000006, nama: "Pramuka Pesantren", kategori: "Organisasi", deskripsi: "Kegiatan kepanduan islami, kedisiplinan, dan survival outdoor." },
  { id: 100000000007, nama: "Khat & Kaligrafi", kategori: "Seni Rupa", deskripsi: "Seni melukis dan mengukir tulisan naskah ayat Al-Qur'an." },
  { id: 100000000008, nama: "Klub Futsal & Voli", kategori: "Olahraga Tim", deskripsi: "Pertandingan persahabatan dan kejuaraan antar pesantren daerah." },
]

const defaultKegiatan = [
  { id: 100000000001, judul: "Kajian Kitab Kuning & Syariat", penjelasan: "Pembelajaran rutin kitab-kitab klasik keislaman meliputi Fiqih, Nahwu Shorof, Aqidah, dan Hadits bersama para Ustadz.", foto: "/images/banner2.png", kategori: "Akademik Keagamaan" },
  { id: 100000000002, judul: "Setoran Tahfidz & Muraja'ah Al-Qur'an", penjelasan: "Program bimbingan hafalan Al-Qur'an yang dilaksanakan secara intensif setiap ba'da Subuh dan Maghrib.", foto: "/images/sejarah3.png", kategori: "Tahfizh Al-Qur'an" },
  { id: 100000000003, judul: "Shalat Berjamaah & Dzikir Bersama", penjelasan: "Pembiasaan ibadah shalat fardhu 5 waktu secara berjamaah di Masjid Utama Darul Hikam dilanjutkan pembacaan ratib.", foto: "/images/banner4.png", kategori: "Spiritual & Peribadatan" },
  { id: 100000000004, judul: "Praktik Laboratorium & Pembelajaran IT", penjelasan: "Santri dibekali keterampilan teknologi informasi modern melalui praktik laboratorium komputer dan desain.", foto: "/images/banner5.png", kategori: "Sains & Teknologi" },
  { id: 100000000005, judul: "Ekstrakurikuler & Olahraga Sunnah", penjelasan: "Wadah pengembangan bakat dan kesehatan fisik santri meliputi olahraga panahan, pencak silat, pramuka, dan hadroh.", foto: "/images/sejarah4.png", kategori: "Ekstrakurikuler" },
  { id: 100000000006, judul: "Kemandirian & Ro'an Gotong Royong", penjelasan: "Budaya kebersihan lingkungan pesantren dan kerja bakti harian untuk menumbuhkan jiwa kepemimpinan & kemandirian.", foto: "/images/banner1.png", kategori: "Karakter & Kemandirian" },
]

const defaultBudaya1 = "Di Pondok Pesantren DARUL HIKAM, kehidupan santri didesain secara seimbang antara pembiasaan kedisiplinan ibadah, pendalaman ilmu syariat Islam melalui kitab-kitab klasik, hafalan Al-Qur'an, serta pendidikan formal nasional."
const defaultBudaya2 = "Selama 24 jam dalam lingkungan asrama yang asri dan terpelihara, santri diajarkan kemandirian, tata krama berakhlak mulia, rasa kepedulian sosial, serta kesiapan dalam menghadapi tantangan era digital."

const defaultStatistik = [
  { jenjang: "PAUD", jumlah: 85 },
  { jenjang: "MI", jumlah: 340 },
  { jenjang: "MTs", jumlah: 415 },
  { jenjang: "MA", jumlah: 280 },
  { jenjang: "SMK", jumlah: 230 },
]

// ─── Shared helpers ──────────────────────────────────────────────────────────

async function uploadImage(image: string, folder: string) {
  if (!image.startsWith("data:image/")) return image
  const response = await fetch("/api/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image, folder }) })
  const data = await response.json()
  if (!response.ok || !data.url) throw new Error(data.error || "Upload foto gagal")
  return data.url as string
}

function pickImage(setter: (img: string) => void) {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.onchange = () => {
    const file = input.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) return alert("Ukuran foto maksimal 2MB")
    const reader = new FileReader()
    reader.onload = () => setter(reader.result?.toString() || "")
    reader.readAsDataURL(file)
  }
  input.click()
}

function isTemp(id: number) { return id >= TEMP_ID_MIN }

// ─── Generic CRUD hook ───────────────────────────────────────────────────────

function useCrudList<T extends { id: number }>(api: string, defaults: T[]) {
  const [items, setItems] = useState<T[]>(defaults)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(api).then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setItems(data)
    }).finally(() => setLoading(false))
  }, [api])

  async function saveOne(id: number, payload: Partial<T>): Promise<T | null> {
    try {
      const creating = isTemp(id)
      const response = await fetch(api, {
        method: creating ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creating ? payload : { id, ...payload }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan")
      setItems((prev) => prev.map((i) => (i.id === id ? data : i)))
      return data
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan")
      return null
    }
  }

  async function remove(id: number) {
    if (!confirm("Hapus item ini?")) return
    if (isTemp(id)) return setItems((prev) => prev.filter((i) => i.id !== id))
    const response = await fetch(api, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    if (response.ok) setItems((prev) => prev.filter((i) => i.id !== id))
    else alert("Gagal menghapus")
  }

  return { items, setItems, loading, saveOne, remove }
}

// ─── 1. Slider editor (hero / pelajaran / kitab / ekskul) ───────────────────

const sliderDefaults: Record<string, any[]> = {
  hero: defaultHeroSlides,
  pelajaran: defaultPelajaranSlides,
  kitab: defaultKitabSlides,
  ekskul: defaultEkskulSlides,
}

const sliderLabels: Record<string, string> = {
  hero: "Banner Kehidupan Santri",
  pelajaran: "Banner Pelajaran Formal",
  kitab: "Banner Kajian Kitab Kuning",
  ekskul: "Banner Ekstrakurikuler",
}

export function AdminSantriSliderSection({ kategori }: { kategori: string }) {
  const { items, setItems, saveOne, remove } = useCrudList(`/api/santri-slides?kategori=${kategori}`, sliderDefaults[kategori] ?? [])
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: "", subtitle: "", image: "" })
  const [saving, setSaving] = useState(false)

  const edit = (item: any) => { setEditId(item.id); setForm({ title: item.title, subtitle: item.subtitle || "", image: item.image }) }
  const add = () => {
    const id = Date.now() * 100
    const item = { id, kategori, title: "Judul Slide Baru", subtitle: "Deskripsi singkat slide.", image: "/images/banner1.png", order: items.length }
    setItems((prev) => [...prev, item])
    edit(item)
  }

  const save = async () => {
    if (editId === null || !form.title.trim()) return alert("Judul wajib diisi")
    setSaving(true)
    try {
      const image = await uploadImage(form.image, "santri")
      const payload = { kategori, title: form.title, subtitle: form.subtitle, image, order: items.findIndex((i) => i.id === editId) }
      const saved = await saveOne(editId, payload)
      if (saved) setEditId(null)
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan slide")
    } finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{sliderLabels[kategori]}</h1>
          <p className="text-sm text-gray-500 mt-1">Edit foto, judul, dan deskripsi slide. Klik Tambah untuk slide baru.</p>
        </div>
        <button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm"><Plus className="w-4 h-4" /> Tambah Slide</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id ? (
              <div className="p-5 space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100">
                  <Image src={form.image} alt="Preview" fill className="object-cover" />
                </div>
                <button onClick={() => pickImage((img) => setForm({ ...form, image: img }))} className="flex items-center gap-2 border rounded-xl px-4 py-2 text-sm"><Upload className="w-4 h-4 text-green-600" /> Ganti Foto</button>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Judul slide" />
                <textarea value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={3} placeholder="Deskripsi singkat" />
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button>
                  <button onClick={() => setEditId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"><X className="w-4 h-4" /> Batal</button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex items-start gap-4">
                <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100"><Image src={item.image} alt={item.title} fill className="object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.subtitle}</p>
                </div>
                <button onClick={() => edit(item)} className="p-2 text-green-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => remove(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 2. Budaya & Kehidupan Santri (2 paragraf) ──────────────────────────────

export function AdminSantriBudayaSection() {
  const [form, setForm] = useState({ budaya1: defaultBudaya1, budaya2: defaultBudaya2 })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((data) => {
      if (data && !data.error) setForm({
        budaya1: data.santriBudaya1 || defaultBudaya1,
        budaya2: data.santriBudaya2 || defaultBudaya2,
      })
    })
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ santriBudaya1: form.budaya1, santriBudaya2: form.budaya2 }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan")
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan")
    } finally { setSaving(false) }
  }

  return (
    <div>
      <div className="mb-6"><h1 className="text-xl font-bold text-gray-800">Budaya & Kehidupan Santri</h1><p className="text-sm text-gray-500 mt-1">Dua paragraf penjelasan pada bagian atas halaman Santri.</p></div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Paragraf 1</label>
          <textarea rows={4} value={form.budaya1} onChange={(e) => setForm({ ...form, budaya1: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm resize-y" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Paragraf 2</label>
          <textarea rows={4} value={form.budaya2} onChange={(e) => setForm({ ...form, budaya2: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm resize-y" />
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 text-white rounded-xl px-5 py-2.5 text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan"}</button>
      </div>
    </div>
  )
}

// ─── 3. Statistik Jumlah Santri (DB-connected) ──────────────────────────────

export function AdminSantriStatistikSection() {
  const [items, setItems] = useState<any[]>(defaultStatistik)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const total = items.reduce((s: number, i: any) => s + (Number(i.jumlah) || 0), 0)

  useEffect(() => {
    fetch("/api/statistik-santri").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setItems(data)
    })
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      for (const item of items) {
        await fetch("/api/statistik-santri", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jenjang: item.jenjang, jumlah: Number(item.jumlah) || 0 }),
        })
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      alert("Gagal menyimpan statistik")
    } finally { setSaving(false) }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Statistik Jumlah Santri</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="space-y-4 mb-6">
          {items.map((item: any) => (
            <div key={item.jenjang} className="flex items-center gap-4">
              <div className="w-14 text-sm font-semibold text-gray-700">{item.jenjang}</div>
              <div className="flex-1 bg-green-50 rounded-xl p-1">
                <input type="number" min="0" className="w-full bg-transparent text-center text-sm font-bold text-green-700 outline-none" value={item.jumlah} onChange={(e) => setItems((prev) => prev.map((i: any) => i.jenjang === item.jenjang ? { ...i, jumlah: parseInt(e.target.value) || 0 } : i))} />
              </div>
              <div className="text-xs text-gray-400 w-12">santri</div>
            </div>
          ))}
        </div>
        <div className="bg-green-700 rounded-xl px-4 py-3 flex items-center justify-between mb-6">
          <span className="text-white text-sm font-medium">Total Keseluruhan</span>
          <span className="text-white text-xl font-bold">{total} Santri</span>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
          <Save className="w-4 h-4" />{saving ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  )
}

// ─── 4. Kurikulum & Pelajaran Formal (chart jenjang) ────────────────────────

export function AdminSantriPelajaranSection() {
  const { items, setItems, saveOne, remove } = useCrudList("/api/pelajaran-jenjang", defaultPelajaranJenjang)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ jenjang: "", deskripsi: "", mapel: "" })
  const [saving, setSaving] = useState(false)

  const edit = (item: any) => { setEditId(item.id); setForm({ jenjang: item.jenjang, deskripsi: item.deskripsi || "", mapel: typeof item.mapel === "string" ? item.mapel : (item.mapel || []).join("\n") }) }
  const add = () => {
    const id = Date.now() * 100
    const item = { id, jenjang: "Jenjang Baru", deskripsi: "Deskripsi jenjang.", mapel: "", order: items.length }
    setItems((prev) => [...prev, item])
    edit(item)
  }

  const save = async () => {
    if (editId === null || !form.jenjang.trim()) return alert("Jenjang wajib diisi")
    setSaving(true)
    const payload = { jenjang: form.jenjang, deskripsi: form.deskripsi, mapel: form.mapel, order: items.findIndex((i) => i.id === editId) }
    const saved = await saveOne(editId, payload)
    if (saved) setEditId(null)
    setSaving(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div><h1 className="text-xl font-bold text-gray-800">Chart Kurikulum & Pelajaran Formal</h1><p className="text-sm text-gray-500 mt-1">Kartu jenjang dan mata pelajaran. Satu mata pelajaran per baris.</p></div>
        <button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm"><Plus className="w-4 h-4" /> Tambah Jenjang</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {editId === item.id ? (
              <div className="p-5 space-y-3">
                <input value={form.jenjang} onChange={(e) => setForm({ ...form, jenjang: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Nama jenjang" />
                <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={3} placeholder="Deskripsi jenjang" />
                <textarea value={form.mapel} onChange={(e) => setForm({ ...form, mapel: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={6} placeholder="Mata pelajaran (satu per baris)" />
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button>
                  <button onClick={() => setEditId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"><X className="w-4 h-4" /> Batal</button>
                </div>
              </div>
            ) : (
              <div className="p-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{item.jenjang}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.deskripsi}</p>
                  <p className="text-xs text-green-700 mt-2 whitespace-pre-line">{typeof item.mapel === "string" ? item.mapel : (item.mapel || []).join("\n")}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => edit(item)} className="p-2 text-green-600"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => remove(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 5. Kajian Kitab Kuning (chart kitab) ───────────────────────────────────

export function AdminSantriKitabSection() {
  const { items, setItems, saveOne, remove } = useCrudList("/api/kitab-kuning", defaultKitab)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ namaKitab: "", pengarang: "", bidang: "", deskripsi: "" })
  const [saving, setSaving] = useState(false)

  const edit = (item: any) => { setEditId(item.id); setForm({ namaKitab: item.namaKitab, pengarang: item.pengarang || "", bidang: item.bidang || "", deskripsi: item.deskripsi || "" }) }
  const add = () => {
    const id = Date.now() * 100
    const item = { id, namaKitab: "Nama Kitab", pengarang: "Pengarang", bidang: "Bidang", deskripsi: "Deskripsi kitab.", order: items.length }
    setItems((prev) => [...prev, item])
    edit(item)
  }

  const save = async () => {
    if (editId === null || !form.namaKitab.trim()) return alert("Nama kitab wajib diisi")
    setSaving(true)
    const payload = { ...form, order: items.findIndex((i) => i.id === editId) }
    const saved = await saveOne(editId, payload)
    if (saved) setEditId(null)
    setSaving(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div><h1 className="text-xl font-bold text-gray-800">Chart Kajian Kitab Kuning</h1><p className="text-sm text-gray-500 mt-1">Kartu kitab: nama, pengarang, bidang, dan deskripsi.</p></div>
        <button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm"><Plus className="w-4 h-4" /> Tambah Kitab</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {editId === item.id ? (
              <div className="p-5 space-y-3">
                <input value={form.namaKitab} onChange={(e) => setForm({ ...form, namaKitab: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Nama kitab" />
                <input value={form.pengarang} onChange={(e) => setForm({ ...form, pengarang: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Pengarang" />
                <input value={form.bidang} onChange={(e) => setForm({ ...form, bidang: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Bidang kajian" />
                <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={4} placeholder="Deskripsi kitab" />
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button>
                  <button onClick={() => setEditId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"><X className="w-4 h-4" /> Batal</button>
                </div>
              </div>
            ) : (
              <div className="p-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{item.namaKitab}</p>
                  <p className="text-xs text-gray-500 italic mt-1">Karya: {item.pengarang}</p>
                  <span className="inline-block text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5 mt-2">{item.bidang}</span>
                  <p className="text-xs text-gray-500 mt-2">{item.deskripsi}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => edit(item)} className="p-2 text-green-600"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => remove(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 6. Ekstrakurikuler (chart ekskul) ──────────────────────────────────────

export function AdminSantriEkskulSection() {
  const { items, setItems, saveOne, remove } = useCrudList("/api/ekskul", defaultEkskul)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nama: "", kategori: "", deskripsi: "" })
  const [saving, setSaving] = useState(false)

  const edit = (item: any) => { setEditId(item.id); setForm({ nama: item.nama, kategori: item.kategori || "", deskripsi: item.deskripsi || "" }) }
  const add = () => {
    const id = Date.now() * 100
    const item = { id, nama: "Nama Ekstrakurikuler", kategori: "Kategori", deskripsi: "Deskripsi singkat.", order: items.length }
    setItems((prev) => [...prev, item])
    edit(item)
  }

  const save = async () => {
    if (editId === null || !form.nama.trim()) return alert("Nama wajib diisi")
    setSaving(true)
    const payload = { ...form, order: items.findIndex((i) => i.id === editId) }
    const saved = await saveOne(editId, payload)
    if (saved) setEditId(null)
    setSaving(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div><h1 className="text-xl font-bold text-gray-800">Chart Ekstrakurikuler & Pengembangan Bakat</h1><p className="text-sm text-gray-500 mt-1">Kartu ekskul: nama, kategori, dan deskripsi.</p></div>
        <button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm"><Plus className="w-4 h-4" /> Tambah Ekskul</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {editId === item.id ? (
              <div className="p-5 space-y-3">
                <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Nama ekskul" />
                <input value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Kategori" />
                <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={4} placeholder="Deskripsi ekskul" />
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button>
                  <button onClick={() => setEditId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"><X className="w-4 h-4" /> Batal</button>
                </div>
              </div>
            ) : (
              <div className="p-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{item.nama}</p>
                  <span className="inline-block text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5 mt-1">{item.kategori}</span>
                  <p className="text-xs text-gray-500 mt-2">{item.deskripsi}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => edit(item)} className="p-2 text-green-600"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => remove(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 7. Chart Foto Kegiatan & Penjelasan ────────────────────────────────────

export function AdminSantriKegiatanSection() {
  const { items, setItems, saveOne, remove } = useCrudList("/api/kegiatan-santri", defaultKegiatan)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ judul: "", penjelasan: "", foto: "", kategori: "" })
  const [saving, setSaving] = useState(false)

  const edit = (item: any) => { setEditId(item.id); setForm({ judul: item.judul, penjelasan: item.penjelasan || "", foto: item.foto, kategori: item.kategori || "" }) }
  const add = () => {
    const id = Date.now() * 100
    const item = { id, judul: "Judul Kegiatan Baru", penjelasan: "Penjelasan kegiatan.", foto: "/images/banner1.png", kategori: "Aktivitas Harian", order: items.length }
    setItems((prev) => [...prev, item])
    edit(item)
  }

  const save = async () => {
    if (editId === null || !form.judul.trim()) return alert("Judul wajib diisi")
    setSaving(true)
    try {
      const foto = await uploadImage(form.foto, "kegiatan")
      const payload = { judul: form.judul, penjelasan: form.penjelasan, foto, kategori: form.kategori, order: items.findIndex((i) => i.id === editId) }
      const saved = await saveOne(editId, payload)
      if (saved) setEditId(null)
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan kegiatan")
    } finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div><h1 className="text-xl font-bold text-gray-800">Chart Foto Kegiatan & Penjelasan</h1><p className="text-sm text-gray-500 mt-1">Kartu kegiatan: foto, judul, kategori, dan penjelasan.</p></div>
        <button onClick={add} className="flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm"><Plus className="w-4 h-4" /> Tambah Kegiatan</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id ? (
              <div className="p-5 space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100"><Image src={form.foto} alt="Preview" fill className="object-cover" /></div>
                <button onClick={() => pickImage((img) => setForm({ ...form, foto: img }))} className="flex items-center gap-2 border rounded-xl px-4 py-2 text-sm"><Upload className="w-4 h-4 text-green-600" /> Ganti Foto</button>
                <input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Judul kegiatan" />
                <input value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Kategori" />
                <textarea value={form.penjelasan} onChange={(e) => setForm({ ...form, penjelasan: e.target.value })} className="w-full border rounded-xl px-3 py-2 text-sm" rows={4} placeholder="Penjelasan kegiatan" />
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><Save className="w-4 h-4" />{saving ? "Menyimpan..." : "Simpan"}</button>
                  <button onClick={() => setEditId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"><X className="w-4 h-4" /> Batal</button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex items-start gap-4">
                <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100"><Image src={item.foto} alt={item.judul} fill className="object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{item.judul}</p>
                  <span className="inline-block text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5 mt-1">{item.kategori}</span>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.penjelasan}</p>
                </div>
                <button onClick={() => edit(item)} className="p-2 text-green-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => remove(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
