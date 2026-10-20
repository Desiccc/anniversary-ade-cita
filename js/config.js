/* ============================================================
   KONFIGURASI — edit semua yang ada di sini.
   Setelah mengubah, tekan Ctrl+F5 di browser untuk refresh.
   ============================================================ */

const CONFIG = {

  /* ---------- Identitas ---------- */
  names: {
    a: "Ade",           // nama orang pertama (display besar)
    b: "Cita",          // nama orang kedua
    from: "Ade",        // footer: dibuat oleh
    to: "Cita"          // footer: untuk
  },

  /* ---------- Tanggal anniversary ----------
     Format: 'YYYY-MM-DD HH:MM:SS' (waktu lokal) atau 'YYYY-MM-DD'
     Contoh: '2023-08-17 19:00:00'                                        */
  anniversary: {
    date: "2025-10-21 00:00:00",       // tanggal jadian — 1 tahun = 21 Oktober 2026
    label: "21 Oktober 2026",          // teks tanggal yang ditampilkan
    years: 1                           // anniversary ke-berapa
  },

  /* ---------- Hero ---------- */
  hero: {
    eyebrow: "Happy Anniversary ke-1",
    tagline: "Terima kasih sudah menjadi bagian terbaik dalam hidupku."
  },

  /* ---------- Surat cinta ----------
     Gunakan \n untuk baris baru.                              */
  letter: {
    hint: "klik amplopnya untuk dibuka ✉",
    hi: "Halo sayang,",
    body: "Kalau aku ini jadi satu lagu, kamu pasti ada di setiap baitnya.\n\nTerima kasih sudah hadir di hari-hari yang biasa, dan menjadikannya hari yang luar biasa. Terima kasih untuk tawamu yang bahkan saat aku sedang serius, dan untuk diamnya yang selalu terasa aman.\n\nAku tidak akan selalu bisa melakukan segalanya dengan benar. Tapi aku selalu akan ada di sisiimu, menjemput, ke mana pun kamu butuh.\n\nTerima kasih sudah memilih aku, dan terima kasih aku memilih kamu.\n\nSelamat anniversary. Semoga ke depan kita makin dekat, bukan makin jauh.",
    sign: "— Ade"
  },

  /* ---------- Galeri ----------
     src  : file di folder assets/photos/ (contoh: kita-1.jpg)
     cap  : keterangan di bawah foto
     type : "foto" (default) atau "video"
     Foto tambahan bisa di-upload lewat tombol “Tambah Foto”
     (tersimpan di browser, jadi di perangkat ini saja).                 */
  photos: [
    { src: "assets/photos/ruwang-kita.jpg", cap: "Ruang pertama kali 💫", type: "foto" },
    { src: "assets/photos/sanubari-coffe.jpg", cap: "Sanubari Coffee ☕", type: "foto" },
    { src: "assets/photos/villa.jpg", cap: "Villa bareng 🏡", type: "foto" },
    { src: "assets/photos/curug.jpg", cap: "Main ke Curug 🌊", type: "foto" }
  ],

  /* ---------- Timeline / Perjalanan ---------- */
  timeline: [
    { date: "Awalnya", icon: "👋", title: "Kenalan", text: "Mulai obrolan sederhana yang ternyata panjangnya tidak ada ujungnya." },
    { date: "Ruang pertama kali", icon: "💫", title: "Mulai dari satu ruang", text: "Tempat pertama di mana semua terasa mungkin." },
    { date: "21 Oktober 2025", icon: "💘", title: "Resmi jadian", text: "Hari di mana semua hal terasa lebih ringan dan lebih menyenangkan." },
    { date: "Sanubari Coffee", icon: "☕", title: "Kopi pertama", text: "Satu cangkir kopi dan obrolan yang tidak ada ujungnya." },
    { date: "Villa", icon: "🏡", title: "Weekend berdua", text: "Waktu yang pelan, tanpa plans, dan tetap menyenangkan." },
    { date: "Curug", icon: "🌊", title: "Petualangan kecil", text: "Banyak tempat baru, banyak cerita baru." },
    { date: "Sekarang", icon: "💍", title: "Terus bersama", text: "Dan aku berharap ini bukan akhir, tapi awal cerita baru." }
  ],

  /* ---------- Alasan ---------- */
  reasons: [
    { icon: "😊", title: "Tawamu", text: "Tawa itu menular, aku jadi ikut senang tanpa alasan." },
    { icon: "🌙", title: "Ketenangan", text: "Di dekat kamu, aku tidak perlu jadi siapa-siapa. Cukup jadi aku." },
    { icon: "🍲", title: "Perhatian hal kecil", text: "Kamu mengingat hal-hal kecil yang anggap aku tak penting. Aku selalu menyadari." },
    { icon: "🌧️", title: "Kamu tetap di sana", text: "Di hari terburuk pun, tangan kamu tetap digenggam dengan hangat." },
    { icon: "🎯", title: "Semangatmu", text: "Kamu mengejar apa pun yang kamu mau, dan itu membuat aku ikut ingin jadi lebih baik." },
    { icon: "🏠", title: "Rasa rumah", text: "Di mana pun kamu berada, aku ingin tempat itu bisa disebut rumah." }
  ],

  /* ---------- Musik ----------
     Taruh file .mp3 / .m4a / .wav di folder assets/music/
     Ganti title dengan judul lagunya.                                */
  music: [
    { title: "Bila Kau Tak Disampingku", src: "assets/music/bila-kau-tak-disampingku.mp3" }
  ],

  /* ---------- Penutup ---------- */
  final: {
    text: "Dan untuk semua hari berikutnya —\naku selalu pilih kamu, lagi dan lagi.",
    sign: "selamat anniversary, sayangku 💗",
    button: "Tekan untuk LOVE 💖"
  },

  /* ---------- Efek ---------- */
  effects: {
    petals: true,        // hujan kelopak / hati
    confetti: true,      // konfeti saat masuk halaman
    clickHearts: true    // hati muncul saat klik
  }
};
