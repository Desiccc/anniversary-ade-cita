/* ============================================================
   KONFIGURASI — edit semua yang ada di sini.
   Setelah mengubah, tekan Ctrl+F5 di browser untuk refresh.
   ============================================================ */

const CONFIG = {

  /* ---------- Identitas ---------- */
  names: {
    a: "Ayu",          // nama orang pertama (display besar)
    b: "Hakim",        // nama orang kedua
    from: "Hakim",     // footer: dibuat oleh
    to: "Ayu"          // footer: untuk
  },

  /* ---------- Tanggal anniversary ----------
     Format: 'YYYY-MM-DD HH:MM:SS' (waktu lokal) atau 'YYYY-MM-DD'
     Contoh: '2023-08-17 19:00:00'                                        */
  anniversary: {
    date: "2023-08-17 19:00:00",
    label: "17 Agustus 2023"     // teks tanggal yang ditampilkan
  },

  /* ---------- Hero ---------- */
  hero: {
    eyebrow: "Happy Anniversary",
    tagline: "Terima kasih sudah menjadi bagian terbaik dalam hidupku."
  },

  /* ---------- Surat cinta ----------
     Gunakan \n untuk baris baru.                              */
  letter: {
    hint: "klik amplopnya untuk dibuka ✉",
    hi: "Halo sayang,",
    body: "Kalau aku ini jadi satu lagu, kamu pasti ada di setiap baitnya.\n\nTerima kasih sudah hadir di hari-hari yang biasa, dan menjadikannya hari yang luar biasa. Terima kasih untuk tawamu yang bahkan saat aku sedang serius, dan untuk diamnya yang selalu terasa aman.\n\nAku tidak akan selalu bisa melakukan segalanya dengan benar. Tapi aku selalu akan ada di sisiimu, menjemput, ke mana pun kamu butuh.\n\nTerima kasih sudah memilih aku, dan terima kasih aku memilih kamu.\n\nSelamat anniversary. Semoga ke depan kita makin dekat, bukan makin jauh.",
    sign: "— Hakim"
  },

  /* ---------- Galeri ----------
     src  : file di folder assets/photos/ (contoh: kita-1.jpg)
     cap  : keterangan di bawah foto
     type : "foto" (default) atau "video"
     Foto tambahan bisa di-upload lewat tombol “Tambah Foto”
     (tersimpan di browser, jadi di perangkat ini saja).                 */
  photos: [
    { src: "assets/photos/sample-1.svg", cap: "Hari pertama kita", type: "foto" },
    { src: "assets/photos/sample-2.svg", cap: "Liburan santai", type: "foto" },
    { src: "assets/photos/sample-3.svg", cap: "Foto bareng", type: "foto" },
    { src: "assets/photos/sample-4.svg", cap: "Momen kecil yang manis", type: "foto" }
  ],

  /* ---------- Timeline / Perjalanan ---------- */
  timeline: [
    { date: "Awalnya", icon: "👋", title: "Kenalan", text: "Mulai obrolan sederhana yang ternyata panjangnya tidak ada ujungnya." },
    { date: "Pertemuan", icon: "☕", title: "Kopi pertama", text: "Satu cangkir kopi dan obrolan yang tidak ada ujungnya." },
    { date: "Jadian", icon: "💘", title: "Resmi jadian", text: "Hari di mana semua hal terasa lebih ringan dan lebih menyenangkan." },
    { date: "Petualangan", icon: "✈️", title: "Ber-travel", text: "Banyak tempat baru, banyak cerita baru." },
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
     Ganti title dengan judul lagunya.
     (3 lagu contoh sudah tersedia: sample-1.wav s/d sample-3.wav)   */
  music: [
    { title: "Melodi Senja", src: "assets/music/sample-1.wav" },
    { title: "Kembali Padamu", src: "assets/music/sample-2.wav" },
    { title: "Hari-Hari Bersama", src: "assets/music/sample-3.wav" }
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
