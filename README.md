# 💗 Halaman Anniversary

Website kecil satu halaman untuk hadiah anniversary. Tanpa install, tanpa internet (kecuali font Google).

## 🚀 Cara pakai

Klik dua kali **`index.html`** — halaman langsung terbuka di browser.

Kalau mau versi "server" (agar bisa dibuka HP dalam satu jaringan):

```bash
cd C:\Users\Lenovo\project
python -m http.server 8000
```

Lalu di HP buka `http://<IP-KOMPUTER>:8000` (cek IP dengan `ipconfig`).

## ✏️ Edit semua isi

Semua teks, foto, tanggal, dan musik ada di satu file: **`js/config.js`**.
Setelah selesai mengedit, tekan **Ctrl + F5** di browser agar perubahan tampil.

| Yang diubah | Di mana |
|---|---|
| Nama kalian | `names` |
| Tanggal anniversary | `anniversary.date` (format `'2023-08-17 19:00:00'`) |
| Tahun anniversary | `anniversary.years` (contoh: `1` untuk anniversary ke-1) |
| Teks tanggal | `anniversary.label` |
| Kalimat di hero | `hero.eyebrow`, `hero.tagline` |
| Isi surat | `letter.body` (pakai `\n` untuk baris baru) |
| Daftar foto | `photos` |
| Perjalanan / timeline | `timeline` |
| Alasan sayang | `reasons` |
| Playlist musik | `music` |
| Tulisan penutup | `final` |
| Efek (kelopak, konfeti, hati klik) | `effects` |

## 📷 Cara ganti foto

**Cara A — pakai file di komputer (disarankan)**

1. Simpan fotonya ke folder `assets/photos/`.
2. Di `js/config.js`, bagian `photos`, ubah `src` jadi nama filenya:

```js
photos: [
  { src: "assets/photos/kita-1.jpg", cap: "Liburan di_ft", type: "foto" },
  { src: "assets/photos/kita-2.jpg", cap: "Senyum kamu", type: "foto" }
]
```

**Cara B — upload lewat browser**

Klik tombol **+ Tambah Foto** di bagian Galeri, atau drag & drop fotonya ke kotak area upload.
Foto ini **tersimpan di browser perangkat itu saja** (localStorage) — cocok untuk dipakai langsung sebelum dikirim. Kalau mau permanen, pakai Cara A.

Format foto yang bagus: portrait (4:5), minimal 800 px, file `.jpg` / `.png`.

## 🎵 Cara ganti musik

1. Simpan lagunya ke folder `assets/music/` (format `.mp3`, `.m4a`, atau `.wav`).
2. Di `js/config.js`, bagian `music`:

```js
music: [
  { title: "Judul Lagu 1", src: "assets/music/lagu1.mp3" },
  { title: "Judul Lagu 2", src: "assets/music/lagu2.mp3" }
]
```

Ketuk ikon ▶ di player bagian bawah untuk memutar, ⏭ untuk ganti lagu.

> Catatan: browser memblokir suara otomatis sebelum ada interaksi pengguna. Karena itu ada tombol "Ketuk untuk membuka" di layar awal — setelah diklik, musik baru bisa berbunyi.

## 📁 Struktur folder

```
project/
├─ index.html            ← struktur halaman
├─ README.md
├─ start.bat             ← buka cepat di browser
├─ css/style.css         ← tampilan & animasi
├─ js/
│  ├─ config.js          ← SEMUA yang perlu diedit
│  └─ main.js            ← logika (countdown, galeri, musik)
   └─ assets/
      ├─ photos/            ← foto kalian
      └─ music/             ← lagumu
```

## ✨ Fitur

- Layar pembuka + konfeti
- Hitung mundur ke hari anniversary (otomatis ke tahun depan kalau sudah lewat)
- Amplop surat cinta yang bisa dibuka
- Galeri foto dengan lightbox (panah keyboard ← →, tekan `Esc` untuk tutup)
- Timeline perjalanan kalian
- Kartu alasan sayang (hover untuk efek)
- Player musik dengan playlist
- Hujan kelopak & hati animasi, hati muncul saat klik
- Responsive — tampilannya bagus di HP maupun laptop
