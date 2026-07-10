export const siteConfig = {
  name: "Cinemana Shabakaty",
  shortName: "Cinemana",
  version: "v5.3.3",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thecinemana.org",
  description:
    "Platform hiburan generasi berikutnya — akses 250.000+ film, serial, anime, dan siaran olahraga langsung.",
  locale: "id_ID",
  downloadFile: "/downloads/cinemana-shabakaty.apk",
  downloadFileName: "Cinemana Shabakaty v5.3.3 (APK)",
} as const;

export const heroCopy = {
  kicker: "Platform Hiburan Premium",
  headline: "Hiburan Tanpa Batas, Dirancang untuk Anda",
  subhead:
    "Akses 250.000+ film, serial, anime, dan siaran olahraga langsung — pengalaman streaming kelas dunia dalam satu platform.",
  ctaPrimary: "Unduh Sekarang",
  ctaSecondary: "Pelajari Lebih Lanjut",
  stats: [
    { value: "250K+", label: "Film & Serial" },
    { value: "Live", label: "Siaran Olahraga" },
    { value: "Gratis", label: "Tanpa Langganan" },
  ],
  trust: [
    { label: "Resmi & aman" },
    { label: "Tanpa registrasi" },
    { label: "Gratis selamanya" },
  ],
} as const;

export const downloadGuideCopy = {
  id: "unduh",
  kicker: "Panduan Instalasi",
  title: "Cara Mengunduh",
  description:
    "Tiga langkah sederhana untuk mengunduh dan menginstal aplikasi di perangkat Anda. Prosesnya cepat, aman, dan tidak memerlukan keahlian teknis.",
  steps: [
    {
      number: "01",
      icon: "Smartphone" as const,
      title: "Pilih Perangkat Anda",
      description:
        "Tentukan platform yang Anda gunakan — Android, Smart TV, atau perangkat kompatibel lainnya — agar pengalaman streaming optimal sesuai layar Anda.",
    },
    {
      number: "02",
      icon: "Download" as const,
      title: "Unduh Aplikasi",
      description:
        'Klik tombol "Unduh Sekarang" untuk mengunduh versi terbaru aplikasi secara aman. File APK resmi langsung dari server kami, tanpa perantara pihak ketiga.',
    },
    {
      number: "03",
      icon: "Sparkles" as const,
      title: "Instal & Nikmati",
      description:
        "Buka file yang diunduh, izinkan instalasi dari sumber tepercaya, dan aplikasi siap digunakan dalam hitungan detik. Nikmati hiburan tanpa batas segera.",
    },
  ],
} as const;

export const aboutCopy = {
  id: "tentang",
  kicker: "Tentang Kami",
  title: "About Us",
  subtitle:
    "Platform hiburan yang dirancang untuk memberikan pengalaman streaming terbaik — cepat, aman, dan selalu terbaru.",
  paragraphs: [
    "Cinemana Shabakaty lahir dari komitmen untuk menghadirkan akses hiburan berkualitas tinggi kepada semua orang, tanpa hambatan langganan atau registrasi yang rumit. Kami percaya setiap pengguna berhak menikmati film, serial, anime, dan siaran olahraga langsung dalam satu platform yang mudah digunakan.",
    "Tim kami terus memperbarui katalog konten dan mengoptimalkan performa aplikasi agar streaming tetap lancar di berbagai perangkat. Keamanan pengguna menjadi prioritas — setiap unduhan berasal dari server resmi kami, dan pembaruan rutin memastikan pengalaman yang stabil serta terpercaya.",
  ],
  features: [
    "Pembaruan konten dan versi aplikasi secara berkala",
    "Streaming lancar di Android, Smart TV, dan perangkat kompatibel",
    "Unduhan aman langsung dari server resmi",
    "Tanpa registrasi — langsung nikmati hiburan",
    "Antarmuka modern yang mudah dipahami",
  ],
  stats: [
    { value: "250K+", label: "Judul Konten" },
    { value: "5.3", label: "Versi Terbaru" },
    { value: "24/7", label: "Akses Tanpa Batas" },
  ],
  cta: "Mulai Sekarang",
} as const;

export const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fitur", href: "#fitur" },
  { label: "Tentang", href: "#tentang" },
  { label: "Unduh", href: "#unduh" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
] as const;

export const featuresCopy = {
  id: "fitur",
  kicker: "Keunggulan Platform",
  title: "Semua yang Anda Butuhkan",
  description:
    "Dari streaming HD hingga siaran langsung — setiap fitur dirancang untuk pengalaman hiburan tanpa kompromi.",
  items: [
    {
      icon: "Film" as const,
      title: "250.000+ Konten",
      description:
        "Film, serial TV, anime, dan dokumenter dari seluruh dunia dalam satu katalog yang terus diperbarui.",
    },
    {
      icon: "Radio" as const,
      title: "Siaran Olahraga Live",
      description:
        "Nikmati pertandingan langsung dengan kualitas streaming stabil dan latensi rendah.",
    },
    {
      icon: "MonitorSmartphone" as const,
      title: "Multi-Perangkat",
      description:
        "Android, Smart TV, tablet — tonton di mana saja dengan antarmuka yang responsif.",
    },
    {
      icon: "Zap" as const,
      title: "Streaming Cepat",
      description:
        "Optimasi server untuk buffering minimal dan kualitas video adaptif sesuai koneksi Anda.",
    },
    {
      icon: "Shield" as const,
      title: "Aman & Terpercaya",
      description:
        "Unduhan resmi dari server kami. Tanpa malware, tanpa iklan mengganggu.",
    },
    {
      icon: "Heart" as const,
      title: "Gratis Selamanya",
      description:
        "Tanpa langganan bulanan, tanpa biaya tersembunyi. Hiburan premium tanpa batas.",
    },
  ],
} as const;

export const faqCopy = {
  id: "faq",
  kicker: "Pertanyaan Umum",
  title: "FAQ",
  description:
    "Jawaban untuk pertanyaan yang paling sering diajukan tentang Cinemana Shabakaty.",
  items: [
    {
      question: "Apakah Cinemana Shabakaty benar-benar gratis?",
      answer:
        "Ya. Aplikasi ini sepenuhnya gratis tanpa biaya langganan atau pembayaran tersembunyi. Anda dapat mengakses seluruh katalog konten tanpa membayar.",
    },
    {
      question: "Perangkat apa saja yang didukung?",
      answer:
        "Aplikasi mendukung perangkat Android, Smart TV, tablet, dan perangkat kompatibel lainnya. Pastikan perangkat Anda memenuhi persyaratan minimum untuk pengalaman terbaik.",
    },
    {
      question: "Bagaimana cara mengunduh dan menginstal aplikasi?",
      answer:
        'Klik tombol "Unduh Sekarang", buka file APK yang diunduh, izinkan instalasi dari sumber tepercaya di pengaturan perangkat, lalu ikuti petunjuk instalasi.',
    },
    {
      question: "Apakah perlu membuat akun atau registrasi?",
      answer:
        "Tidak. Anda dapat langsung menggunakan aplikasi tanpa registrasi, login, atau verifikasi email.",
    },
    {
      question: "Seberapa sering konten diperbarui?",
      answer:
        "Katalog konten diperbarui secara berkala. Tim kami menambahkan judul baru dan memperbarui versi aplikasi untuk performa dan keamanan yang lebih baik.",
    },
    {
      question: "Apakah aman mengunduh dari situs ini?",
      answer:
        "Ya. File APK diunduh langsung dari server resmi kami. Pastikan Anda mengunduh hanya dari situs ini untuk menghindari file palsu dari pihak ketiga.",
    },
  ],
} as const;

export const conclusionCopy = {
  title: "Siap Menikmati Hiburan Tanpa Batas?",
  description:
    "Unduh Cinemana Shabakaty sekarang dan akses 250.000+ konten hiburan premium — gratis, aman, dan tanpa registrasi.",
  cta: "Unduh Sekarang",
} as const;

export const footerCopy = {
  tagline: "Platform hiburan generasi berikutnya.",
  links: [
    { label: "Beranda", href: "#beranda" },
    { label: "Fitur", href: "#fitur" },
    { label: "Tentang", href: "#tentang" },
    { label: "Unduh", href: "#unduh" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;
