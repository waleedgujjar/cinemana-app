export const siteConfig = {
  name: "Sakura School Simulator",
  shortName: "Sakura School",
  version: "v1.042.20",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thecinemana.org",
  description:
    "Unduh Sakura School Simulator APK gratis untuk Android. Jelajahi dunia sekolah terbuka, kustomisasi karakter, dan petualangan seru — aman, cepat, dan tanpa registrasi.",
  locale: "id_ID",
  mainKeyword: "sakura school simulator APK",
  downloadFile: "/downloads/cinemana-shabakaty.apk",
  downloadFileName: "Sakura School Simulator APK",
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
  { label: "Fitur", href: "#fitur" },
  { label: "Tentang", href: "#tentang" },
  { label: "Unduh", href: "#unduh" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
] as const;

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
    { label: "Fitur", href: "#fitur" },
    { label: "Tentang", href: "#tentang" },
    { label: "Unduh", href: "#unduh" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;
