/**
 * ============================================================================
 * JAVASCRIPT UTAMA — EDU FAIR & CAREER EXPO 2026
 * SMKN 6 Tangerang Selatan
 *
 * Fitur:
 * 1. Supabase Client & Database Sync
 * 2. Resolusi Nama Tamu Dinamis dari Database Supabase / Dataset Lokal / URL Parameter
 * 3. Transisi Buka Sampul (Hero Cover) & Autoplay Musik Latar
 * 4. Pemutar Musik Latar (Play / Pause & Animasi Piringan Hitam)
 * 5. Countdown Timer Real-time (Hari, Jam, Menit, Detik) menuju 25 Nov 2026 07.00 WIB
 * 6. Integrasi Tautan Google Calendar
 * 7. Modal Lightbox Galeri Foto
 * 8. Formulir RSVP & Buku Tamu Persisten (Supabase Cloud + LocalStorage)
 * 9. Toggle Menu Navigasi Mobile
 * ============================================================================
 */

// DATASET LOKAL LENGKAP 34 TAMU DARI tamuedufair.csv (FALLBACK RESILIENCE)
const GUESTS_DATABASE = [
  { id: 1, code: "TM01", nama_tamu: "Universitas Pembangunan Jaya", instansi: "Universitas Pembangunan Jaya", kategori: "Universitas", display_name: "Universitas Pembangunan Jaya" },
  { id: 2, code: "TM02", nama_tamu: "Cakra Zebua", instansi: "President University", kategori: "Universitas", display_name: "Cakra Zebua - President University" },
  { id: 3, code: "TM03", nama_tamu: "Mahbub Haikal", instansi: "Universitas Multimedia Nusantara", kategori: "Universitas", display_name: "Mahbub Haikal - Universitas Multimedia Nusantara" },
  { id: 4, code: "TM04", nama_tamu: "Universitas Muhammadiyah Tangerang", instansi: "Universitas Muhammadiyah Tangerang", kategori: "Universitas", display_name: "Universitas Muhammadiyah Tangerang" },
  { id: 5, code: "TM05", nama_tamu: "Andra", instansi: "Universitas Mercubuana", kategori: "Universitas", display_name: "Andra - Universitas Mercubuana" },
  { id: 6, code: "TM06", nama_tamu: "Dyah Palupi", instansi: "UT Serang", kategori: "Universitas", display_name: "Dyah Palupi - UT Serang" },
  { id: 7, code: "TM07", nama_tamu: "Deswa", instansi: "Universitas Budi Luhur", kategori: "Universitas", display_name: "Deswa - Universitas Budi Luhur" },
  { id: 8, code: "TM08", nama_tamu: "Universitas Pradita", instansi: "Universitas Pradita", kategori: "Universitas", display_name: "Universitas Pradita" },
  { id: 9, code: "TM09", nama_tamu: "Chendri Irawan", instansi: "ITTS", kategori: "Universitas", display_name: "Chendri Irawan - ITTS" },
  { id: 10, code: "TM10", nama_tamu: "", instansi: "Pengawas SMKN 6 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Pengawas SMKN 6 Kota Tangerang Selatan" },
  { id: 11, code: "TM11", nama_tamu: "", instansi: "Kepala SMKN 1 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Kepala SMKN 1 Kota Tangerang Selatan" },
  { id: 12, code: "TM12", nama_tamu: "", instansi: "Kepala SMKN 2 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Kepala SMKN 2 Kota Tangerang Selatan" },
  { id: 13, code: "TM13", nama_tamu: "", instansi: "Kepala SMKN 3 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Kepala SMKN 3 Kota Tangerang Selatan" },
  { id: 14, code: "TM14", nama_tamu: "", instansi: "Kepala SMKN 4 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Kepala SMKN 4 Kota Tangerang Selatan" },
  { id: 15, code: "TM15", nama_tamu: "", instansi: "Kepala SMKN 5 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Kepala SMKN 5 Kota Tangerang Selatan" },
  { id: 16, code: "TM16", nama_tamu: "", instansi: "Kepala SMKN 7 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Kepala SMKN 7 Kota Tangerang Selatan" },
  { id: 17, code: "TM17", nama_tamu: "", instansi: "Kepala SMKN 8 Kota Tangerang Selatan", kategori: "Tamu", display_name: "Kepala SMKN 8 Kota Tangerang Selatan" },
  { id: 18, code: "TM18", nama_tamu: "", instansi: "Kepala Cabang Dinas Pendidikan Kotangsel", kategori: "Tamu", display_name: "Kepala Cabang Dinas Pendidikan Kotangsel" },
  { id: 19, code: "TM19", nama_tamu: "", instansi: "Disnaker", kategori: "Tamu", display_name: "Disnaker" },
  { id: 20, code: "TM20", nama_tamu: "", instansi: "BLKI", kategori: "Tamu", display_name: "BLKI" },
  { id: 21, code: "TM21", nama_tamu: "Orang Tua Murid", instansi: "Orang Tua Murid", kategori: "Tamu", display_name: "Orang Tua Murid" },
  { id: 22, code: "TM22", nama_tamu: "Alumni", instansi: "Alumni", kategori: "Alumni", display_name: "Alumni" },
  { id: 23, code: "TM23", nama_tamu: "AXIS", instansi: "AXIS", kategori: "Sponshorsip", display_name: "AXIS" },
  { id: 24, code: "TM24", nama_tamu: "Ista Widyastuti", instansi: "Yakult", kategori: "Sponshorsip", display_name: "Ista Widyastuti - Yakult" },
  { id: 25, code: "TM25", nama_tamu: "Indomaret", instansi: "Indomaret", kategori: "Sponshorsip", display_name: "Indomaret" },
  { id: 26, code: "TM26", nama_tamu: "Alfamidi", instansi: "Alfamidi", kategori: "Sponshorsip", display_name: "Alfamidi" },
  { id: 27, code: "TM27", nama_tamu: "BCA", instansi: "BCA", kategori: "Sponshorsip", display_name: "BCA" },
  { id: 28, code: "TM28", nama_tamu: "Dinas Koperasi", instansi: "Dinas Koperasi", kategori: "Sponshorsip", display_name: "Dinas Koperasi" },
  { id: 29, code: "TM29", nama_tamu: "DPRD", instansi: "DPRD", kategori: "Sponshorsip", display_name: "DPRD" },
  { id: 30, code: "TM30", nama_tamu: "Kelurahan Serpong/Polres Tangsel", instansi: "Kelurahan Serpong/Polres Tangsel", kategori: "Sponshorsip", display_name: "Kelurahan Serpong/Polres Tangsel" },
  { id: 31, code: "TM31", nama_tamu: "", instansi: "Worrie.id", kategori: "Sponshorsip", display_name: "Worrie.id" },
  { id: 32, code: "TM32", nama_tamu: "Kiki Hermawan Legowo", instansi: "PT. Pasifik Cipta Nusantara", kategori: "Industri", display_name: "Kiki Hermawan Legowo - PT. Pasifik Cipta Nusantara" },
  { id: 33, code: "TM33", nama_tamu: "Mandiri", instansi: "Mandiri", kategori: "Sponshorsip", display_name: "Mandiri" },
  { id: 34, code: "TM34", nama_tamu: "UHAMKA", instansi: "UHAMKA", kategori: "Universitas", display_name: "UHAMKA" },
];

document.addEventListener("DOMContentLoaded", async () => {

  // --------------------------------------------------------------------------
  // 1. INISIALISASI SUPABASE DATABASE
  // --------------------------------------------------------------------------
  let supabaseClient = null;
  let isSupabaseActive = false;

  function initSupabase() {
    if (
      typeof window.supabase !== "undefined" &&
      typeof APP_CONFIG !== "undefined" &&
      APP_CONFIG.supabase &&
      APP_CONFIG.supabase.enabled &&
      APP_CONFIG.supabase.url &&
      !APP_CONFIG.supabase.url.includes("xyzcompany") &&
      APP_CONFIG.supabase.url.trim() !== "" &&
      APP_CONFIG.supabase.anonKey &&
      APP_CONFIG.supabase.anonKey.trim() !== ""
    ) {
      try {
        supabaseClient = window.supabase.createClient(APP_CONFIG.supabase.url.trim(), APP_CONFIG.supabase.anonKey.trim());
        isSupabaseActive = true;
        console.log("Supabase Client initialized successfully.");
      } catch (err) {
        console.warn("Gagal inisialisasi Supabase client:", err);
        isSupabaseActive = false;
      }
    } else {
      isSupabaseActive = false;
    }
  }

  initSupabase();


  // --------------------------------------------------------------------------
  // 2. RESOLUSI NAMA TAMU DINAMIS (SUPABASE + DATASET LOKAL + URL PARAMS)
  // --------------------------------------------------------------------------
  const guestNameElement = document.getElementById("coverGuestName");
  const guestCategoryElement = document.getElementById("coverGuestCategory");
  const rsvpNameInput = document.getElementById("rsvpName");
  let resolvedGuestTitle = "Tamu Undangan";

  function setGuestName(name, category = null) {
    resolvedGuestTitle = name;

    // 1. Tampilkan pada sampul pembuka (Cover Hero)
    if (guestNameElement) {
      guestNameElement.textContent = name;
    }

    // 2. Tampilkan kategori tamu jika ada
    if (guestCategoryElement) {
      if (category) {
        guestCategoryElement.textContent = category;
        guestCategoryElement.classList.remove("hidden");
      } else {
        guestCategoryElement.classList.add("hidden");
      }
    }

    // 3. Otomatis isi kolom nama di Formulir RSVP & Buku Tamu
    if (rsvpNameInput) {
      if (name && name !== "Tamu Undangan") {
        rsvpNameInput.value = name;
      }
    }
  }

  async function resolveGuestName() {
    const urlParams = new URLSearchParams(window.location.search);

    // Baca berbagai kemungkinan nama parameter di URL:
    const codeParam = urlParams.get("code") || urlParams.get("id");
    const toParam = urlParams.get("to") || urlParams.get("nama") || urlParams.get("name") || urlParams.get("tamu") || urlParams.get("guest");

    // Opsi 1: Jika ada parameter kode atau ID (contoh: ?code=TM02 atau ?id=2 atau ?code=2)
    if (codeParam) {
      const cleanCode = codeParam.trim();
      const numId = parseInt(cleanCode, 10);

      // Coba A: Ambil dari Supabase jika koneksi aktif
      if (isSupabaseActive) {
        try {
          let query = supabaseClient.from(APP_CONFIG.supabase.tables.guests).select("*");
          if (!isNaN(numId)) {
            query = query.or(`id.eq.${numId},code.eq.${cleanCode.toUpperCase()}`);
          } else {
            query = query.eq("code", cleanCode.toUpperCase());
          }

          const { data, error } = await query.maybeSingle();
          if (!error && data && (data.display_name || data.nama_tamu || data.instansi)) {
            const title = data.display_name || (data.nama_tamu ? `${data.nama_tamu} - ${data.instansi}` : data.instansi);
            setGuestName(title, data.kategori);
            return;
          }
        } catch (err) {
          console.warn("Kueri Supabase tamu gagal, beralih ke pencocokan dataset lokal:", err);
        }
      }

      // Coba B: Cocokkan langsung dengan dataset 34 tamu lokal tamuedufair.csv
      const match = GUESTS_DATABASE.find(g => 
        (!isNaN(numId) && g.id === numId) ||
        g.code.toUpperCase() === cleanCode.toUpperCase() ||
        g.code.replace(/^TM0*/, "") === cleanCode.replace(/^TM0*/, "")
      );

      if (match) {
        setGuestName(match.display_name, match.kategori);
        return;
      }
    }

    // Opsi 2: Jika ada parameter teks langsung (contoh: ?to=Cakra+Zebua atau ?to=TM03)
    if (toParam) {
      const cleanParam = decodeURIComponent(toParam.replace(/\+/g, " ")).trim();

      // Cek apakah parameter ?to berisi kode tamu (misal: ?to=TM05 atau ?to=5)
      const numId = parseInt(cleanParam, 10);
      const codeMatch = GUESTS_DATABASE.find(g => 
        (!isNaN(numId) && g.id === numId) ||
        g.code.toUpperCase() === cleanParam.toUpperCase() ||
        g.display_name.toLowerCase().includes(cleanParam.toLowerCase()) ||
        (g.nama_tamu && g.nama_tamu.toLowerCase().includes(cleanParam.toLowerCase())) ||
        (g.instansi && g.instansi.toLowerCase().includes(cleanParam.toLowerCase()))
      );

      if (codeMatch) {
        setGuestName(codeMatch.display_name, codeMatch.kategori);
        return;
      }

      // Jika bukan kode, gunakan teks langsung yang diberikan
      setGuestName(cleanParam);
      return;
    }

    // Opsi 3: Nilai awal default jika tidak ada parameter URL
    setGuestName("Tamu Undangan");
  }

  await resolveGuestName();


  // --------------------------------------------------------------------------
  // 3. BUKA SAMPUL UNDANGAN & AUTOPLAY AUDIO
  // --------------------------------------------------------------------------
  const heroCover = document.getElementById("heroCover");
  const btnOpen = document.getElementById("btnOpen");
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  let isPlaying = false;

  // Pastikan sumber audio menggunakan konfigurasi tema jika disetel
  if (bgMusic && typeof APP_CONFIG !== "undefined" && APP_CONFIG.music && APP_CONFIG.music.src) {
    // Set sumber utama dari config (CDN, bukan lokal) agar berfungsi di GitHub Pages
    bgMusic.src = APP_CONFIG.music.src;
    bgMusic.load();

    // Fallback ke sumber alternatif jika gagal
    bgMusic.addEventListener("error", () => {
      if (APP_CONFIG.music.fallbackSrc && bgMusic.src !== APP_CONFIG.music.fallbackSrc) {
        console.warn("Audio utama gagal, beralih ke fallback:", APP_CONFIG.music.fallbackSrc);
        bgMusic.src = APP_CONFIG.music.fallbackSrc;
        bgMusic.load();
        if (isPlaying) bgMusic.play().catch(() => {});
      }
    }, true);
  }

  function playMusic() {
    if (!bgMusic) return;
    bgMusic.play().then(() => {
      isPlaying = true;
      if (musicIcon) {
        musicIcon.setAttribute("icon", "ph:disc-bold");
        musicIcon.classList.add("spinning");
      }
    }).catch(err => {
      console.warn("Autoplay dibatasi kebijakan browser:", err);
    });
  }

  function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    isPlaying = false;
    if (musicIcon) {
      musicIcon.setAttribute("icon", "ph:speaker-simple-slash-bold");
      musicIcon.classList.remove("spinning");
    }
  }

  if (btnOpen && heroCover) {
    btnOpen.addEventListener("click", () => {
      heroCover.classList.add("-translate-y-full", "opacity-0", "pointer-events-none");
      document.body.classList.remove("overflow-hidden");
      
      // Pastikan nama tamu tetap tersinkron ke input RSVP saat tombol buka ditekan
      if (rsvpNameInput && resolvedGuestTitle && resolvedGuestTitle !== "Tamu Undangan") {
        rsvpNameInput.value = resolvedGuestTitle;
      }

      playMusic();
    });
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }


  // --------------------------------------------------------------------------
  // 4. COUNTDOWN TIMER REAL-TIME
  // Target: 25 November 2026, 07:00:00 WIB (+07:00)
  // --------------------------------------------------------------------------
  const targetDate = new Date("2026-11-25T07:00:00+07:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");
    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // --------------------------------------------------------------------------
  // 5. SIMPAN KE GOOGLE CALENDAR
  // --------------------------------------------------------------------------
  const btnSaveCalendar = document.getElementById("btnSaveCalendar");
  if (btnSaveCalendar) {
    btnSaveCalendar.addEventListener("click", () => {
      const title = encodeURIComponent("Edu Fair & Career Expo 2026 — SMKN 6 Tangsel");
      const details = encodeURIComponent("Tema: Connecting Competence to Future : Bekerja, Melanjutkan, Berwirausaha. Lokasi: SMKN 6 Tangerang Selatan. Pukul 07.00 WIB s.d Selesai.");
      const location = encodeURIComponent("SMKN 6 Tangerang Selatan, Jl. WR. Supratman No.1, Ciputat Timur, Kota Tangerang Selatan");
      const start = "20261125T000000Z"; // 07.00 WIB = 00.00 UTC
      const end = "20261125T110000Z";   // Selesai sore
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
      window.open(gcalUrl, "_blank");
    });
  }


  // --------------------------------------------------------------------------
  // 6. LIGHTBOX MODAL GALERI FOTO
  // --------------------------------------------------------------------------
  const galleryCards = document.querySelectorAll(".gallery-card");
  const galleryModal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const closeModal = document.getElementById("closeModal");

  galleryCards.forEach(card => {
    card.addEventListener("click", () => {
      const src = card.getAttribute("data-img");
      const title = card.getAttribute("data-title");
      if (modalImg) modalImg.src = src;
      if (modalCaption) modalCaption.textContent = title;
      if (galleryModal) galleryModal.classList.remove("hidden");
    });
  });

  if (closeModal && galleryModal) {
    closeModal.addEventListener("click", () => {
      galleryModal.classList.add("hidden");
    });
    galleryModal.addEventListener("click", (e) => {
      if (e.target === galleryModal) galleryModal.classList.add("hidden");
    });
  }


  // --------------------------------------------------------------------------
  // 7. TOAST NOTIFIKASI
  // --------------------------------------------------------------------------
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  let toastTimeout = null;

  function showToast(text) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = text;
    toast.classList.remove("hidden");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }


  // --------------------------------------------------------------------------
  // 8. RSVP & FORMULIR KONFIRMASI KEHADIRAN (STANDALONE / TANPA TAMPILAN PESAN)
  // --------------------------------------------------------------------------
  const rsvpForm = document.getElementById("rsvpForm");
  const STORAGE_KEY = "edufair_tangsel_rsvp_2026";

  // Bersihkan data lama jika ada di localStorage agar tidak menampilkan apa-apa
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("rsvpName").value.trim();
      const status = document.getElementById("rsvpStatus").value;
      const guests = document.getElementById("rsvpGuests").value;
      const message = document.getElementById("rsvpMessage").value.trim();
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');

      if (!name || !status || !message) {
        alert("Harap lengkapi seluruh formulir konfirmasi.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<iconify-icon icon="ph:spinner-bold" class="animate-spin text-base"></iconify-icon> <span>Mengirim...</span>`;
      }

      // Opsional simpan ke database untuk pencatatan internal panitia jika Supabase aktif
      if (isSupabaseActive) {
        try {
          await supabaseClient
            .from(APP_CONFIG.supabase.tables.rsvps)
            .insert([{
              guest_name: name,
              status: status,
              guest_count: guests,
              message: message,
            }]);
        } catch (err) {
          console.warn("Penyimpanan RSVP internal selesai:", err);
        }
      }

      // Reset input form
      document.getElementById("rsvpMessage").value = "";
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<iconify-icon icon="ph:paper-plane-tilt-fill" class="text-base"></iconify-icon> <span>Kirim Konfirmasi &amp; Ucapan</span>`;
      }
      showToast("Konfirmasi kehadiran berhasil dikirim!");
    });
  }


  // --------------------------------------------------------------------------
  // 9. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

});
