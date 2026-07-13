import { APK_DOWNLOAD_PATH, APK_FILENAME } from "@/lib/download-config";

export const siteConfig = {
  name: "Sakura School Simulator",
  shortName: "Sakura School",
  version: "v1.048.03",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sakuraschoolsimulator.net",
  description:
    "Unduh Sakura School Simulator APK gratis untuk Android. Jelajahi dunia sekolah terbuka, kustomisasi karakter, dan petualangan seru — aman, cepat, dan tanpa registrasi.",
  locale: "id_ID",
  mainKeyword: "sakura school simulator APK",
  downloadFile: APK_DOWNLOAD_PATH,
  downloadFileName: "Sakura School Simulator APK",
  downloadSaveName: APK_FILENAME,
  downloadFileSizeBytes: 265978841,
  downloadFileSizeLabel: "254 MB",
} as const;

export const heroCopy = {
  kicker: "Unduh APK Resmi · Gratis",
  headline: "Sakura School Simulator APK — Petualangan Sekolah Tanpa Batas",
  subhead:
    "Unduh Sakura School Simulator APK terbaru untuk Android. Jelajahi kampus, kustomisasi karakter, berteman, dan nikmati simulasi sekolah open-world yang seru — gratis dan aman.",
  ctaPrimary: "Unduh APK Sekarang",
  ctaSecondary: "Pelajari Lebih Lanjut",
  stats: [
    { value: "Gratis", label: "Unduh APK" },
    { value: "Open", label: "World Sandbox" },
    { value: "Android", label: "Didukung Penuh" },
  ],
  trust: [
    { label: "APK aman & resmi" },
    { label: "Tanpa registrasi" },
    { label: "Gratis selamanya" },
  ],
} as const;

export const downloadGuideCopy = {
  id: "unduh",
  kicker: "Panduan Unduh APK",
  title: "Cara Mengunduh Sakura School Simulator APK",
  description:
    "Ikuti tiga langkah mudah untuk mengunduh dan menginstal Sakura School Simulator APK di perangkat Android Anda — cepat, aman, dan tanpa keahlian teknis.",
  steps: [
    {
      number: "01",
      icon: "Smartphone" as const,
      title: "Siapkan Perangkat Android",
      description:
        "Pastikan perangkat Anda menjalankan Android 7.0 atau lebih baru dengan ruang penyimpanan yang cukup untuk menginstal Sakura School Simulator APK.",
    },
    {
      number: "02",
      icon: "Download" as const,
      title: "Unduh File APK",
      description:
        'Klik tombol "Unduh APK Sekarang" untuk mengunduh Sakura School Simulator APK versi terbaru secara langsung dari server kami — tanpa perantara pihak ketiga.',
    },
    {
      number: "03",
      icon: "Sparkles" as const,
      title: "Instal & Mainkan",
      description:
        "Buka file APK, aktifkan \"Instal dari sumber tidak dikenal\" di pengaturan, lalu instal. Dalam hitungan detik, Sakura School Simulator siap dimainkan.",
    },
  ],
} as const;

export const aboutCopy = {
  id: "tentang",
  kicker: "Tentang Game",
  title: "Tentang Sakura School Simulator",
  subtitle:
    "Simulasi sekolah open-world yang memungkinkan Anda menjelajahi, berinteraksi, dan menciptakan cerita sendiri di dalam kampus Sakura.",
  paragraphs: [
    "Sakura School Simulator adalah game simulasi sekolah open-world yang populer di kalangan penggemar game sandbox. Pemain dapat menjelajahi lingkungan sekolah yang luas, berinteraksi dengan karakter lain, menyelesaikan misi, dan mengekspresikan kreativitas melalui kustomisasi karakter yang mendalam.",
    "Situs ini menyediakan Sakura School Simulator APK terbaru untuk pengguna Android yang ingin mengunduh dan menginstal game dengan aman. Kami memastikan setiap file APK berasal dari sumber terpercaya, diperbarui secara rutin, dan dapat diinstal tanpa proses registrasi yang rumit.",
    "Sebagai game simulasi sekolah, Sakura School Simulator menawarkan pengalaman yang berbeda dari game mobile pada umumnya. Alih-alih mengikuti alur linier, Anda bebas menentukan apa yang ingin dilakukan — bersekolah, bersosialisasi, berpetualang, atau sekadar menjelajahi dunia virtual yang hidup.",
    "Mengunduh Sakura School Simulator APK dari situs resmi kami memberi Anda akses langsung ke versi terbaru tanpa menunggu update di toko aplikasi. Cocok untuk pengguna yang ingin bermain segera dengan file instalasi yang aman dan terpercaya.",
  ],
  features: [
    "Dunia sekolah open-world yang luas dan interaktif",
    "Kustomisasi karakter, pakaian, dan gaya unik",
    "Berteman, berpetualang, dan jelajahi kampus",
    "Sakura School Simulator APK gratis tanpa biaya",
    "Kompatibel dengan mayoritas perangkat Android",
  ],
  stats: [
    { value: "Gratis", label: "Unduh APK" },
    { value: "Open", label: "World Game" },
    { value: "Android", label: "Platform" },
  ],
  cta: "Unduh APK Sekarang",
} as const;

export const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Gameplay", href: "#gameplay" },
  { label: "Fitur", href: "#fitur" },
  { label: "Tentang", href: "#tentang" },
  { label: "Unduh", href: "#unduh" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
] as const;

export const gameplayCopy = {
  id: "gameplay",
  kicker: "Cara Bermain",
  title: "Panduan Gameplay Sakura School Simulator APK",
  description:
    "Pelajari dasar-dasar bermain Sakura School Simulator setelah mengunduh APK — dari membuat karakter hingga menjelajahi dunia sekolah terbuka.",
  steps: [
    {
      title: "Buat & Kustomisasi Karakter",
      description:
        "Setelah menginstal Sakura School Simulator APK, buat karakter Anda dengan memilih gender, gaya rambut, pakaian seragam, dan aksesori. Kustomisasi ini menjadi identitas unik Anda di dalam kampus Sakura.",
    },
    {
      title: "Jelajahi Kampus & Kota",
      description:
        "Berjalan bebas di sekitar sekolah, masuk ke ruang kelas, perpustakaan, kantin, dan area kota. Temukan lokasi tersembunyi, kendaraan, dan interaksi yang hanya tersedia di game simulasi sekolah open-world ini.",
    },
    {
      title: "Berinteraksi dengan NPC",
      description:
        "Bicara dengan karakter lain, bangun hubungan sosial, dan ikuti situasi yang muncul secara dinamis. Setiap sesi bermain dapat menghasilkan cerita berbeda — inti dari pengalaman sandbox Sakura School Simulator.",
    },
    {
      title: "Selesaikan Aktivitas & Misi",
      description:
        "Ikuti alur cerita, temukan misi opsional, dan coba berbagai aktivitas sekolah. Dari belajar di kelas hingga petualangan di luar kampus, Sakura School Simulator APK menawarkan kebebasan bermain tanpa batas.",
    },
    {
      title: "Simpan Progres & Lanjutkan",
      description:
        "Progres Anda tersimpan secara lokal di perangkat. Kembali kapan saja dan lanjutkan petualangan dari titik terakhir — tanpa perlu login atau koneksi internet yang konstan.",
    },
  ],
} as const;

export const requirementsCopy = {
  id: "persyaratan",
  kicker: "Persyaratan Sistem",
  title: "Spesifikasi Perangkat untuk Sakura School Simulator APK",
  description:
    "Pastikan perangkat Android Anda memenuhi persyaratan minimum sebelum mengunduh dan menginstal Sakura School Simulator APK agar game berjalan lancar.",
  minimum: [
    { label: "Sistem Operasi", value: "Android 7.0 (Nougat)+", icon: "Smartphone" as const },
    { label: "RAM", value: "Minimal 2 GB", icon: "Cpu" as const },
    { label: "Penyimpanan", value: "500 MB ruang kosong", icon: "Download" as const },
    { label: "Prosesor", value: "Quad-core 1.5 GHz", icon: "Zap" as const },
  ],
  recommended: [
    { label: "Sistem Operasi", value: "Android 10 atau lebih baru", icon: "Smartphone" as const },
    { label: "RAM", value: "4 GB atau lebih", icon: "Cpu" as const },
    { label: "Penyimpanan", value: "1 GB ruang kosong", icon: "Download" as const },
    { label: "Grafis", value: "Adreno 506 / Mali-G71+", icon: "Star" as const },
  ],
  note:
    "Sakura School Simulator APK dioptimalkan untuk perangkat menengah ke atas. Tutup aplikasi latar belakang sebelum bermain untuk performa terbaik.",
} as const;

export const whatsNewCopy = {
  id: "versi-terbaru",
  kicker: "Versi Terbaru",
  title: "Apa yang Baru di Sakura School Simulator APK",
  description:
    "Unduh versi terbaru Sakura School Simulator APK untuk mendapatkan perbaikan bug, konten baru, dan pengalaman bermain yang lebih stabil di Android.",
  highlights: [
    "Perbaikan stabilitas dan performa di perangkat Android menengah",
    "Konten dan interaksi karakter yang diperbarui di area kampus",
    "Optimasi ukuran file APK untuk unduhan lebih cepat",
    "Dukungan gesture dan kontrol yang lebih responsif",
    "Perbaikan bug pada kustomisasi karakter dan kendaraan",
    "Kompatibilitas lebih baik dengan Android 12, 13, dan 14",
  ],
  versionNote:
    "Selalu unduh Sakura School Simulator APK terbaru dari situs ini untuk memastikan Anda mendapat versi paling aman dan lengkap.",
} as const;

export const prosConsCopy = {
  id: "kelebihan",
  kicker: "Kelebihan & Kekurangan",
  title: "Pro & Kontra Sakura School Simulator APK",
  description:
    "Pertimbangan jujur sebelum mengunduh Sakura School Simulator APK — apa yang Anda dapatkan dan apa yang perlu diketahui.",
  pros: [
    "Gratis diunduh tanpa biaya langganan atau pembayaran tersembunyi",
    "Dunia open-world luas dengan kebebasan eksplorasi penuh",
    "Kustomisasi karakter mendalam — pakaian, rambut, dan aksesori",
    "Tidak perlu akun Google Play atau registrasi untuk bermain",
    "Cocok untuk penggemar game simulasi sekolah dan sandbox",
    "Dapat diinstal di mayoritas perangkat Android modern",
    "Pembaruan rutin tersedia melalui unduhan APK terbaru",
  ],
  cons: [
    "Hanya tersedia untuk Android — tidak ada versi iOS melalui APK",
    "Perlu mengaktifkan instalasi dari sumber tidak dikenal",
    "Performa bergantung pada spesifikasi perangkat Anda",
    "Beberapa fitur mungkin membutuhkan waktu untuk dipelajari pemula",
  ],
} as const;

export const whyDownloadCopy = {
  id: "mengapa-kami",
  kicker: "Mengapa Situs Ini",
  title: "Mengapa Unduh Sakura School Simulator APK dari Sini?",
  description:
    "Banyak situs menawarkan file APK, tetapi tidak semuanya aman. Berikut alasan mengapa pengguna mempercayai sumber unduhan Sakura School Simulator APK kami.",
  reasons: [
    {
      icon: "Shield" as const,
      title: "File APK Aman & Terpercaya",
      description:
        "Setiap Sakura School Simulator APK diunduh langsung dari server kami. Tanpa modifikasi berbahaya, tanpa malware, dan tanpa bundling iklan yang tidak perlu.",
    },
    {
      icon: "Download" as const,
      title: "Unduhan Cepat & Langsung",
      description:
        "Satu klik untuk mengunduh Sakura School Simulator APK versi terbaru. Tanpa shortlink, tanpa halaman iklan berlapis, tanpa registrasi wajib.",
    },
    {
      icon: "Star" as const,
      title: "Versi Terbaru Selalu Tersedia",
      description:
        "Kami memperbarui file APK secara rutin agar Anda selalu mendapat versi Sakura School Simulator terkini dengan perbaikan dan konten terbaru.",
    },
    {
      icon: "Users" as const,
      title: "Panduan Lengkap dalam Bahasa Indonesia",
      description:
        "Situs ini menyediakan panduan instalasi, gameplay, troubleshooting, dan FAQ lengkap — semuanya dalam bahasa Indonesia untuk pengguna lokal.",
    },
    {
      icon: "Heart" as const,
      title: "100% Gratis Selamanya",
      description:
        "Unduh Sakura School Simulator APK tanpa biaya. Tidak ada langganan premium, tidak ada paywall, dan tidak ada pembatasan konten.",
    },
    {
      icon: "Zap" as const,
      title: "Instalasi dalam Hitungan Menit",
      description:
        "Ikuti panduan tiga langkah kami dan mainkan Sakura School Simulator dalam kurang dari lima menit — bahkan untuk pengguna yang baru pertama kali instal APK.",
    },
  ],
} as const;

export const troubleshootingCopy = {
  id: "bantuan",
  kicker: "Pemecahan Masalah",
  title: "Troubleshooting Instalasi Sakura School Simulator APK",
  description:
    "Mengalami masalah saat mengunduh atau menginstal Sakura School Simulator APK? Berikut solusi untuk masalah yang paling sering dilaporkan.",
  items: [
    {
      problem: "Instalasi diblokir oleh perangkat",
      solution:
        'Buka Pengaturan → Keamanan → aktifkan "Instal dari sumber tidak dikenal" atau izinkan instalasi dari browser Anda. Coba instal ulang file Sakura School Simulator APK.',
    },
    {
      problem: "File APK tidak dapat dibuka",
      solution:
        "Pastikan unduhan selesai 100%. Hapus file yang korup dan unduh ulang Sakura School Simulator APK dari tombol unduhan di situs ini.",
    },
    {
      problem: "Aplikasi crash saat dibuka",
      solution:
        "Restart perangkat, kosongkan cache, dan pastikan RAM cukup. Jika masih crash, unduh versi APK terbaru — sering kali sudah mencakup perbaikan stabilitas.",
    },
    {
      problem: "Game lag atau patah-patah",
      solution:
        "Turunkan pengaturan grafis dalam game jika tersedia, tutup aplikasi latar belakang, dan pastikan perangkat memenuhi persyaratan minimum yang tercantum di halaman ini.",
    },
    {
      problem: "Ruang penyimpanan tidak cukup",
      solution:
        "Hapus file atau aplikasi yang tidak diperlukan hingga tersedia minimal 500 MB. Sakura School Simulator APK membutuhkan ruang untuk instalasi dan data game.",
    },
    {
      problem: "Versi lama masih terinstal",
      solution:
        "Uninstal versi lama terlebih dahulu dari Pengaturan → Aplikasi, lalu instal Sakura School Simulator APK versi terbaru dari situs ini.",
    },
  ],
} as const;

export const featuresCopy = {
  id: "fitur",
  kicker: "Fitur Utama",
  title: "Fitur Sakura School Simulator",
  description:
    "Semua yang membuat Sakura School Simulator APK menjadi game simulasi sekolah favorit jutaan pemain di seluruh dunia.",
  items: [
    {
      icon: "Film" as const,
      title: "Dunia Open-World",
      description:
        "Jelajahi kampus Sakura yang luas — dari ruang kelas, koridor, taman, hingga area kota dengan kebebasan penuh.",
    },
    {
      icon: "Radio" as const,
      title: "Simulasi Interaktif",
      description:
        "Berinteraksi dengan NPC, temukan misi tersembunyi, dan ciptakan cerita unik setiap kali bermain.",
    },
    {
      icon: "MonitorSmartphone" as const,
      title: "Kustomisasi Karakter",
      description:
        "Desain penampilan karakter Anda — pilih pakaian, aksesori, gaya rambut, dan ekspresi sesuai kreativitas.",
    },
    {
      icon: "Zap" as const,
      title: "Performa Lancar",
      description:
        "Sakura School Simulator APK dioptimalkan untuk berjalan mulus di berbagai perangkat Android dengan spesifikasi menengah.",
    },
    {
      icon: "Shield" as const,
      title: "Unduhan Aman",
      description:
        "File APK diunduh langsung dari server resmi kami. Tanpa malware, tanpa modifikasi berbahaya.",
    },
    {
      icon: "Heart" as const,
      title: "Gratis & Tanpa Batas",
      description:
        "Mainkan Sakura School Simulator tanpa biaya langganan. Unduh APK sekali, nikmati petualangan tanpa batas.",
    },
  ],
} as const;

export const faqCopy = {
  id: "faq",
  kicker: "Pertanyaan Umum",
  title: "FAQ Sakura School Simulator APK",
  description:
    "Jawaban lengkap seputar unduhan, instalasi, dan penggunaan Sakura School Simulator APK.",
  items: [
    {
      question: "Apa itu Sakura School Simulator APK?",
      answer:
        "Sakura School Simulator APK adalah file instalasi Android untuk game simulasi sekolah open-world Sakura School Simulator. APK memungkinkan Anda menginstal game langsung di perangkat Android tanpa melalui Google Play Store.",
    },
    {
      question: "Apakah Sakura School Simulator APK gratis?",
      answer:
        "Ya. Anda dapat mengunduh Sakura School Simulator APK secara gratis dari situs ini tanpa biaya langganan, pembayaran tersembunyi, atau registrasi akun.",
    },
    {
      question: "Bagaimana cara mengunduh Sakura School Simulator APK?",
      answer:
        'Klik tombol "Unduh APK Sekarang", tunggu file selesai diunduh, buka file APK, izinkan instalasi dari sumber tidak dikenal di pengaturan Android, lalu ikuti petunjuk instalasi.',
    },
    {
      question: "Perangkat apa yang mendukung Sakura School Simulator APK?",
      answer:
        "Sakura School Simulator APK mendukung perangkat Android 7.0 (Nougat) ke atas. Disarankan RAM minimal 3 GB dan ruang penyimpanan kosong minimal 500 MB untuk pengalaman optimal.",
    },
    {
      question: "Apakah Sakura School Simulator APK aman diunduh dari sini?",
      answer:
        "Ya. File APK diunduh langsung dari server resmi kami dan diperbarui secara berkala. Hindari mengunduh dari sumber tidak dikenal untuk mencegah file palsu atau berbahaya.",
    },
    {
      question: "Apakah perlu akun untuk bermain?",
      answer:
        "Tidak. Setelah menginstal Sakura School Simulator APK, Anda dapat langsung bermain tanpa registrasi, login, atau verifikasi email.",
    },
    {
      question: "Apakah Sakura School Simulator APK tersedia untuk iOS?",
      answer:
        "Tidak. File APK hanya untuk perangkat Android. Pengguna iPhone dan iPad tidak dapat menginstal Sakura School Simulator melalui format APK.",
    },
    {
      question: "Bagaimana cara memperbarui Sakura School Simulator APK?",
      answer:
        "Kunjungi situs ini dan unduh Sakura School Simulator APK versi terbaru. Uninstal versi lama jika diperlukan, lalu instal file APK yang baru diunduh.",
    },
    {
      question: "Apa perbedaan Sakura School Simulator APK dengan versi Play Store?",
      answer:
        "Versi APK memungkinkan instalasi langsung tanpa Google Play Store. Konten game sama, namun APK dari situs kami memberi akses cepat ke versi terbaru tanpa menunggu rollout regional.",
    },
    {
      question: "Apakah game ini cocok untuk anak-anak?",
      answer:
        "Sakura School Simulator dirancang sebagai simulasi sekolah dengan konten yang ditujukan untuk audiens remaja ke atas. Orang tua disarankan meninjau konten game sebelum anak di bawah umur bermain.",
    },
    {
      question: "Mengapa instalasi APK diblokir di perangkat saya?",
      answer:
        'Android memblokir instalasi dari luar Play Store secara default. Aktifkan "Instal dari sumber tidak dikenal" di pengaturan keamanan perangkat Anda, lalu coba instal ulang Sakura School Simulator APK.',
    },
  ],
} as const;

export const conclusionCopy = {
  title: "Siap Mainkan Sakura School Simulator?",
  description:
    "Unduh Sakura School Simulator APK sekarang dan mulai petualangan sekolah open-world Anda — gratis, aman, dan siap dimainkan dalam hitungan menit.",
  cta: "Unduh APK Sekarang",
} as const;

export const footerCopy = {
  tagline: "Sumber terpercaya untuk unduh Sakura School Simulator APK.",
  links: [
    { label: "Beranda", href: "#beranda" },
    { label: "Gameplay", href: "#gameplay" },
    { label: "Fitur", href: "#fitur" },
    { label: "Tentang", href: "#tentang" },
    { label: "Unduh", href: "#unduh" },
    { label: "Persyaratan", href: "#persyaratan" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;
