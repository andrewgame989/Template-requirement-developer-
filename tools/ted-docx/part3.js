const {D, P, H1, H2, H3, guide, warn, danger, fill, T, SP, BREAK} = require('./lib.js');
const {AlignmentType} = D;
const b = [];
const rep = (n, c) => Array.from({length: n}, () => Array(c).fill(""));

/* ================= D. OPERATIONAL HANDOVER ================= */
b.push(H1("D.  OPERATIONAL HANDOVER"));
b.push(danger([
  "BAGIAN INI ADALAH SYARAT MUTLAK SERAH TERIMA KE APPLICATION SUPPORT.",
  "Bagian ini dinilai oleh Application Support, BUKAN oleh developer. Kalau mereka menyatakan belum cukup, artinya belum cukup.",
  "Uji kelayakan: apakah Application Support yang tidak ikut development dapat menangani insiden JAM 2 PAGI hanya dengan membaca bagian D? Kalau belum, dokumen belum layak diserahterimakan.",
]));

b.push(H2("D.1  Konfigurasi & Parameter per Environment"));
b.push(guide([
  "Sebutkan LOKASI parameter (file / tabel / common code), nilai per environment, dan EFEK KALAU SALAH.",
  {t: "Kolom \"Boleh diubah runtime?\" penting: kalau perlu restart, Application Support harus tahu sebelum mengubahnya."},
]));
b.push(T(["Parameter / Config", "Lokasi (file / tabel / common code)", "Nilai Dev", "Nilai Test", "Nilai Prod", "Boleh diubah runtime?", "Efek jika salah"], [
  ["", "", "", "", "", "Ya / Tidak (perlu restart)", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
], [1.7, 2, 1, 1, 1, 1.5, 1.8], {size: 14}));

b.push(H2("D.2  Batch / Scheduler / Job"));
b.push(guide([
  "Kalau tidak ada job baru, tulis eksplisit \"Tidak ada\". Jangan dikosongkan.",
  {t: "Kolom \"Aman di-rerun?\" (idempotent) wajib dijawab — ini yang menentukan boleh tidaknya Application Support menjalankan ulang job saat insiden."},
]));
b.push(T(["Nama Job", "Fungsi", "Jadwal", "Durasi Normal", "Dependency", "Efek jika Gagal", "Cara Rerun", "Aman di-rerun?"], [
  ["", "", "", "", "", "", "", "Ya / Tidak"],
  ["", "", "", "", "", "", "", ""],
], [1.4, 1.6, 1.1, 1.1, 1.2, 1.5, 1.3, 0.8], {size: 14}));

b.push(H2("D.3  Monitoring & Alert"));
b.push(guide([
  "Alert harus SUDAH TERPASANG di monitoring, bukan baru rencana.",
  {t: "Sebutkan path atau index log secara konkret, beserta POLA PENCARIAN yang dipakai."},
  {t: "Jelaskan cara menelusuri satu transaksi lintas komponen (correlation / trace ID) — ini yang paling dicari saat insiden."},
]));
b.push(T(["Yang Dipantau", "Tool / Dashboard", "Metric", "Threshold Warning", "Threshold Critical", "Notifikasi ke"], [
  ["", "", "", "", "", ""], ["", "", "", "", "", ""],
], [2, 1.8, 1.6, 1.6, 1.6, 1.4], {size: 15}));
b.push(SP(80));
b.push(P("Lokasi Log:", {bold: true, size: 18}));
b.push(T(["Komponen", "Path / Index Log", "Pola pencarian umum", "Retention"], [
  ["", "", "<< mis. keyword error, correlation ID >>", ""], ["", "", "", ""],
], [2, 2.8, 3.4, 1.8], {size: 15}));
b.push(SP(80));
b.push(P("Correlation / Trace ID — cara menelusuri satu transaksi lintas komponen:", {bold: true, size: 18}));
b.push(fill("<< jelaskan cara penelusuran >>", 3));

b.push(H2("D.4  Troubleshooting Guide"));
b.push(danger([
  "WAJIB minimal 5 skenario kegagalan yang paling mungkin terjadi.",
  "Setiap baris wajib menyatakan: boleh ditangani Application Support sendiri, atau harus eskalasi.",
]));
b.push(SP(60));
b.push(guide([
  {t: "SALAH — Gejala: \"Error saat upload\" · Penanganan: \"Cek log\"", i: true},
  {t: "BENAR — Gejala: \"ERR-WL-004 Invalid file format\" · Penyebab: file bukan .xlsx atau kolom tidak sesuai template · Verifikasi: cek log app-maas.log, cari ERR-WL-004 + correlation ID · Penanganan: minta user download ulang template dari menu, upload ulang · Ditangani sendiri: Ya · Eskalasi jika: error tetap muncul dengan template resmi → L2 Backend", i: true},
]));
b.push(T(["No", "Gejala / Error Message", "Kemungkinan Penyebab", "Cara Verifikasi", "Langkah Penanganan", "Ditangani App Support sendiri?", "Eskalasi ke"], [
  ["1", "", "", "", "", "Ya / Tidak", ""],
  ["2", "", "", "", "", "", ""],
  ["3", "", "", "", "", "", ""],
  ["4", "", "", "", "", "", ""],
  ["5", "", "", "", "", "", ""],
], [0.5, 1.8, 1.7, 1.6, 2, 1.3, 1.1], {size: 14}));

b.push(H2("D.5  Known Limitation & Workaround"));
b.push(guide([
  "Tulis apa adanya. Limitasi yang disembunyikan akan menjadi insiden yang tidak ada penjelasannya.",
]));
b.push(T(["Limitasi", "Dampak ke User", "Workaround Sementara", "Rencana Perbaikan"], rep(3, 4), [2.5, 2.3, 2.7, 2.5], {size: 16}));

b.push(H2("D.6  Matriks Eskalasi"));
b.push(guide([
  "Isi nama dan kontak orang, bukan hanya nama tim. Saat insiden malam hari, nama tim tidak bisa dihubungi.",
]));
b.push(T(["Level", "Kondisi", "PIC / Tim", "Kontak", "SLA Respon", "Jam Layanan"], [
  ["L1", "", "Application Support", "", "", "24/7"],
  ["L2", "", "Developer / Tech Lead", "", "", ""],
  ["L3", "", "Vendor / Pihak ke-3", "", "", ""],
], [0.9, 2.6, 2, 1.7, 1.4, 1.4], {size: 16}));

b.push(H2("D.7  Serah Terima Akses & Aset"));
b.push(guide([
  "Akses Application Support harus SUDAH DIBERIKAN DAN SUDAH DICOBA, bukan baru diajukan.",
  {t: "Sesi knowledge transfer wajib dilakukan — mengirim dokumen saja bukan serah terima."},
]));
b.push(T(["Item", "Diserahkan ke", "Status", "Tanggal", "Paraf Penerima"], [
  ["Akses aplikasi / role support", "Application Support", "☐ Selesai", "", ""],
  ["Akses dashboard monitoring", "Application Support", "☐ Selesai", "", ""],
  ["Akses baca log", "Application Support", "☐ Selesai", "", ""],
  ["Kredensial service account (via vault)", "", "☐ Selesai", "", ""],
  ["Dokumen TED versi final", "Developer & App Support", "☐ Selesai", "", ""],
  ["Sesi knowledge transfer", "Application Support", "☐ Selesai", "", ""],
], [3.2, 2.4, 1.4, 1.5, 1.5], {size: 16}));
b.push(BREAK());

/* ================= E. DEPLOYMENT & ROLLBACK ================= */
b.push(H1("E.  DEPLOYMENT & ROLLBACK"));

b.push(H2("E.1  Rencana Implementasi"));
b.push(guide([
  "Kalau perubahan menyentuh routing, callback, atau layanan yang dilihat merchant/bank, kebutuhan notifikasi WAJIB diidentifikasi dan dijadwalkan di sini.",
]));
b.push(T(["Field", "Isi"], [
  ["Tanggal & jam implementasi", ""],
  ["Estimasi durasi total", ""],
  ["Downtime diperlukan?", "Ya << durasi >> / Tidak"],
  ["Dampak ke layanan", "<< layanan apa yang terganggu, siapa yang terdampak >>"],
  ["Perlu notifikasi ke merchant / bank / partner?", "Ya / Tidak — << siapa, kapan, oleh siapa >>"],
  ["Executor", ""],
  ["Approver on-site", ""],
], [3.6, 6.4], {size: 17}));

b.push(H2("E.2  Urutan Deployment"));
b.push(guide([
  "Setiap step wajib punya executor, estimasi waktu, dan CARA VERIFIKASI bahwa step itu berhasil.",
  {t: "Tandai POINT OF NO RETURN — titik setelah mana rollback tidak lagi sederhana."},
]));
b.push(T(["Step", "Aksi", "Komponen", "Executor", "Estimasi", "Cara Verifikasi Step Berhasil", "Point of No Return?"], [
  ["1", "Backup (DB & artefak lama)", "", "", "", "", "Tidak"],
  ["2", "Jalankan script DDL", "", "", "", "", ""],
  ["3", "Deploy backend", "", "", "", "", ""],
  ["4", "Deploy frontend", "", "", "", "", ""],
  ["5", "Set konfigurasi / parameter", "", "", "", "", ""],
  ["6", "Restart service", "", "", "", "", ""],
  ["7", "Smoke test", "", "", "", "", ""],
], [0.6, 2, 1.3, 1.2, 1, 2.6, 1.3], {size: 14}));

b.push(H2("E.3  Rollback Plan"));
b.push(danger([
  "DILARANG diisi \"N/A\". Rollback plan harus dapat dieksekusi orang lain, bukan hanya dipahami penulisnya.",
  "Kriteria trigger rollback harus OBJEKTIF DAN TERUKUR — contoh: \"error rate lebih dari 5% dalam 15 menit\", bukan \"kalau bermasalah\".",
  "Jawab pertanyaan ini: data yang masuk SETELAH deploy, bagaimana nasibnya kalau rollback? Ini yang paling sering terlewat dan paling mahal akibatnya.",
]));
b.push(T(["Field", "Isi"], [
  ["Kriteria trigger rollback", "<< kondisi objektif dan terukur >>"],
  ["Siapa yang berwenang memutuskan", ""],
  ["Estimasi durasi rollback", ""],
  ["Batas waktu keputusan rollback", "<< mis. maksimal H+1 pukul 06:00 >>"],
  ["Apakah ada data baru yang akan hilang?", "Ya / Tidak — << bagaimana penanganannya >>"],
], [3.6, 6.4], {size: 17}));
b.push(SP(80));
b.push(P("Langkah Rollback:", {bold: true, size: 18}));
b.push(T(["Step", "Aksi", "Komponen", "Executor", "Verifikasi"], [
  ["1", "", "", "", ""], ["2", "", "", "", ""], ["3", "", "", "", ""],
], [0.7, 3.3, 2, 1.8, 2.2], {size: 16}));

b.push(H2("E.4  Post-Implementation Verification (PIV)"));
b.push(guide([
  "Setiap item WAJIB punya PIC. Checklist tanpa nama = tidak ada yang mengerjakan.",
  {t: "Sepakati periode monitoring intensif pasca go-live beserta siapa yang berjaga."},
]));
b.push(T(["No", "Item Verifikasi", "Cara Cek", "Expected", "Hasil", "PIC"], [
  ["1", "Service up & health check OK", "", "", "☐ Pass  ☐ Fail", ""],
  ["2", "Transaksi end-to-end berhasil", "", "", "☐ Pass  ☐ Fail", ""],
  ["3", "Log tidak ada error baru", "", "", "☐ Pass  ☐ Fail", ""],
  ["4", "Metric monitoring dalam batas normal", "", "", "☐ Pass  ☐ Fail", ""],
  ["5", "Fungsi existing tidak terdampak (regresi)", "", "", "☐ Pass  ☐ Fail", ""],
  ["6", "Data tersimpan benar di tabel baru", "", "", "☐ Pass  ☐ Fail", ""],
], [0.5, 3, 2.1, 1.7, 1.5, 1.2], {size: 15}));
b.push(SP(80));
b.push(T(["Aspek", "Isi"], [["Periode monitoring intensif pasca go-live", "<< mis. 3 hari setelah go-live, dipantau Developer + Application Support >>"]], [3.6, 6.4], {size: 17}));
b.push(BREAK());

/* ================= F. TESTING ================= */
b.push(H1("F.  TESTING"));

b.push(H2("F.1  Test Scenario"));
b.push(danger([
  "SATU BARIS SATU SKENARIO. Jangan menumpuk paragraf panjang dalam satu sel — skenario yang tidak terstruktur tidak bisa dilacak dan tidak sah sebagai bukti UAT.",
  "WAJIB mencakup skenario NEGATIF dan REGRESI terhadap fungsi existing. Yang paling sering menyebabkan insiden bukan fitur barunya, tapi fitur lama yang ikut rusak.",
]));
b.push(T(["ID", "Ref. Requirement", "Skenario", "Precondition", "Langkah", "Expected Result", "Tipe", "Env", "Status", "Link Evidence"], [
  ["TC-01", "TED-XXXXX-R01", "", "", "", "", "Positive", "SIT", "Pass / Fail", ""],
  ["TC-02", "", "", "", "", "", "Negative", "", "", ""],
  ["TC-03", "", "", "", "", "", "Regresi", "", "", ""],
  ["TC-04", "", "", "", "", "", "", "", "", ""],
], [0.7, 1.2, 1.5, 1.2, 1.5, 1.5, 0.8, 0.5, 0.7, 0.9], {size: 13}));

b.push(H2("F.2  Kebutuhan Data & Environment Testing"));
b.push(guide(["Isi sejak awal. Kebutuhan test data dan environment yang baru diminta H-3 adalah penyebab klasik jadwal mundur."]));
b.push(T(["Kebutuhan", "Detail", "Sudah Tersedia?", "PIC"], [
  ["Test data", "", "☐ Ya  ☐ Belum", ""],
  ["Environment", "", "☐ Ya  ☐ Belum", ""],
  ["Akses / kredensial test", "", "☐ Ya  ☐ Belum", ""],
  ["Simulator / stub pihak ke-3", "", "☐ Ya  ☐ Belum", ""],
], [2.4, 4, 1.8, 1.8], {size: 16}));

b.push(H2("F.3  Ringkasan Hasil & Sign-off Testing"));
b.push(guide(["Link evidence wajib bisa diakses reviewer. UAT wajib sudah di-sign-off user/business sebelum dokumen dinyatakan siap."]));
b.push(T(["Tahap", "Total TC", "Pass", "Fail", "Open Defect", "Link Report", "Sign-off oleh", "Tanggal"], [
  ["SIT", "", "", "", "", "", "", ""],
  ["UAT", "", "", "", "", "", "", ""],
], [1, 1, 0.8, 0.8, 1.2, 2, 1.7, 1.5], {size: 15}));
b.push(SP(80));
b.push(P("Open defect yang dibawa ke production (jika ada):", {bold: true, size: 18}));
b.push(guide(["Wajib tercatat beserta ALASAN DITERIMA dan WORKAROUND-nya. Defect yang dibawa diam-diam ke production adalah insiden yang menunggu waktu."]));
b.push(T(["ID Defect", "Severity", "Deskripsi", "Alasan Diterima", "Workaround", "Target Perbaikan"], rep(2, 6), [1.2, 1.1, 2.3, 2, 1.8, 1.6], {size: 15}));
b.push(BREAK());

/* ================= G. RISK ================= */
b.push(H1("G.  RISK & MITIGATION"));
b.push(guide([
  "Isi minimal 3 risiko nyata. Bedakan dengan jelas:",
  {t: "Mitigasi = apa yang dilakukan supaya risiko TIDAK TERJADI."},
  {t: "Contingency = apa yang dilakukan KALAU RISIKO TERLANJUR TERJADI."},
  {t: "Setiap risiko wajib punya owner BERNAMA, bukan nama tim."},
]));
b.push(T(["No", "Risiko", "Kategori", "Likelihood", "Impact", "Mitigasi (pencegahan)", "Contingency (jika terjadi)", "Owner"], [
  ["1", "", "Teknis / Operasional / Keamanan / Bisnis / Eksternal", "H / M / L", "H / M / L", "", "", ""],
  ["2", "", "", "", "", "", "", ""],
  ["3", "", "", "", "", "", "", ""],
], [0.5, 1.8, 1.7, 1, 0.9, 1.9, 1.7, 0.9], {size: 14}));
b.push(BREAK());

/* ================= H. APPROVAL ================= */
b.push(H1("H.  APPROVAL"));
b.push(danger([
  "APPLICATION SUPPORT WAJIB MENJADI SALAH SATU REVIEWER DAN PENANDATANGAN.",
  "Merekalah penerima serah terima — dokumen tidak boleh dinyatakan selesai tanpa persetujuan mereka.",
]));
b.push(SP(120));
b.push(T(["Peran", "Nama", "Unit / Department", "Tanggal", "Tanda Tangan"], [
  {__section: "PREPARED BY"},
  ["Developer", "", "", "", ""],
  ["Developer", "", "", "", ""],
  ["Tech Lead", "", "", "", ""],
  {__section: "REVIEWED BY"},
  ["IT Strategy & Governance", "", "", "", ""],
  ["IT Information Security", "", "", "", ""],
  ["IT Engineering", "", "", "", ""],
  ["IT Infra & Operation", "", "", "", ""],
  ["Application Support", "", "", "", ""],
  {__section: "ACCEPTED BY"},
  ["Product Management", "", "", "", ""],
], [2.4, 2.2, 2.4, 1.4, 1.6], {size: 16, zebra: false}));
b.push(SP(300));
b.push(P("— Akhir Dokumen —", {italics: true, size: 17, color: "808080", align: AlignmentType.CENTER}));

module.exports = b;
