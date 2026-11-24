/**
 * ============================================================================
 * KONFIGURASI SUPABASE & EVENT — EDU FAIR & CAREER EXPO 2026
 * SMKN 6 Tangerang Selatan
 * ============================================================================
 */

const APP_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. PENGATURAN SUPABASE (DATABASE CLOUD)
  // --------------------------------------------------------------------------
  // Dapatkan URL dan ANON KEY dari Dashboard Supabase Anda:
  // Masuk ke: https://supabase.com/dashboard -> Project Anda
  // Buka menu: Project Settings -> API
  // Salin "Project URL" dan "Project API Keys (anon public)" ke bawah ini:
  supabase: {
    enabled: true, // Otomatis aktif ketika URL dan anonKey diisi
    url: "https://worjezcxopcnqfmvqdgo.supabase.co",       // Contoh: "https://abcdefghijkl.supabase.co"
    anonKey: "sb_publishable_TEzVsujI8wR0JoKRwvhC1g_B33UcArc",   // Contoh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    tables: {
      guests: "guests", // Tabel data tamu dari tamuedufair.csv
      rsvps: "rsvps",   // Tabel konfirmasi kehadiran & ucapan
    },
  },

  // --------------------------------------------------------------------------
  // 2. KUSTOMISASI MUSIK (AUDIO SESUAI TEMA EDU FAIR & CAREER EXPO 2026)
  // --------------------------------------------------------------------------
  music: {
    autoplay: true,
    // Musik tema: Corporate Motivational & Uplifting Instrumental (Elegan & Inspiratif)
    src: "audio/corporate-motivational.mp3",
    fallbackSrc: "https://archive.org/download/jamendo-638441/01-2326347-Megis-Corporate%20Motivational%20Music%202.mp3",
  },

  // --------------------------------------------------------------------------
  // 3. INFORMASI ACARA
  // --------------------------------------------------------------------------
  event: {
    name: "Edu Fair & Career Expo 2026",
    theme: "Connecting Competence to Future : Bekerja, Melanjutkan, Berwirausaha",
    school: "SMKN 6 Tangerang Selatan",
    targetDate: "2026-11-25T07:00:00+07:00",
  },

  // --------------------------------------------------------------------------
  // 4. AUTENTIKASI KHUSUS PANITIA (ADMIN PANEL GATE)
  // --------------------------------------------------------------------------
  admin: {
    // Kata sandi / PIN resmi untuk akses panitia pelaksana:
    passcodes: [
      "panitia2026",   // Kode akses utama Panitia
      "edufair2026",   // Kode akses cadangan Sekretariat
      "smkn6tangsel"   // Kode akses SMKN 6 Tangsel
    ],
    sessionKey: "edufair2026_admin_authenticated",
    maxAttempts: 5,
    lockoutDurationMinutes: 1,
  },
};
