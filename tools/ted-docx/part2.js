const {D, P, H1, H2, H3, guide, warn, danger, fill, T, SP, BREAK} = require('./lib.js');
const b = [];
const E2 = ["", ""], E3 = ["", "", ""];
const rep = (n, cols) => Array.from({length: n}, () => Array(cols).fill(""));

b.push(H1("C.  DETAIL DESIGN"));
b.push(danger([
  "Bagian C WAJIB memuat KEEMPAT PILAR di bawah — sepanjang hal itu ada pada pengembangan Anda:",
  {t: "Ada alur proses / langkah bisnis yang berubah?  →  WAJIB isi C.1 Flow Process"},
  {t: "Ada layar yang dilihat user?  →  WAJIB isi C.2 UI / Screen"},
  {t: "Ada endpoint / service online?  →  WAJIB isi C.3 API Contract"},
  {t: "Ada file yang dikirim, diterima, atau di-upload?  →  WAJIB isi C.4 File / Batch"},
  "Jika salah satu tidak ada, tulis \"Tidak ada\" BESERTA alasannya di matriks C.0. Kosong tanpa keterangan = dokumen dikembalikan.",
]));
b.push(SP(80));
b.push(P("Satu pengembangan biasanya punya lebih dari satu pilar. Contoh fitur \"Whitelist Routing\": Flow (proses registrasi & routing) + UI (screen whitelist) + API (inquiry, save, bulk, export) + File (template bulk upload Excel). Keempatnya harus ada.", {italics: true, size: 17, color: "595959"}));

b.push(H2("C.0  Matriks Kelengkapan Detail Design"));
b.push(guide(["Isi matriks ini LEBIH DULU sebelum mengisi C.1–C.4. Matriks ini yang dicek reviewer pertama kali."]));
b.push(T(["Pilar", "Ada?", "Jumlah item", "Bagian", "Keterangan / alasan jika \"Tidak ada\""], [
  ["Flow Process", "☐ Ada    ☐ Tidak ada", "", "C.1", ""],
  ["UI / Screen", "☐ Ada    ☐ Tidak ada", "", "C.2", ""],
  ["API", "☐ Ada    ☐ Tidak ada", "", "C.3", ""],
  ["File / Batch", "☐ Ada    ☐ Tidak ada", "", "C.4", ""],
], [1.8, 2.2, 1.2, 0.9, 3.9], {size: 16}));

/* ---------- C.1 FLOW ---------- */
b.push(H2("C.1  Flow Process"));
b.push(guide([
  "Salin sub-bagian ini untuk SETIAP alur proses. Diagram wajib.",
  {t: "Diagram tanpa narasi tidak diterima; narasi tanpa diagram juga tidak diterima."},
  {t: "Exception WAJIB minimal 3: timeout ke service lain, data tidak ditemukan, validasi gagal."},
  {t: "Untuk tiap exception jawab: data ter-rollback atau tidak, boleh retry atau tidak."},
]));
b.push(T(["Field", "Isi"], [
  ["Ref. Requirement", "TED-XXXXX-Rnn"],
  ["Nama Flow", ""],
  ["Aktor / sistem yang terlibat", ""],
  ["Trigger (pemicu)", "<< user klik / jadwal batch / callback masuk / event >>"],
  ["Pre-condition", ""],
  ["Post-condition (sukses)", ""],
  ["Post-condition (gagal)", ""],
  ["Sifat proses", "Sinkron / Asinkron / Batch"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Diagram alur (flowchart / BPMN / swimlane / sequence diagram):", {bold: true, size: 18}));
b.push(fill("<< sisipkan diagram alur di sini >>", 8));
b.push(SP(80));
b.push(P("Langkah proses — satu baris satu step:", {bold: true, size: 18}));
b.push(T(["Step", "Aktor / Komponen", "Aksi", "Input", "Output", "Kondisi / Percabangan"],
  [["1", "", "", "", "", ""], ["2", "", "", "", "", ""], ["3", "", "", "", "", ""]],
  [0.7, 2, 2.4, 1.6, 1.6, 1.7], {size: 16}));
b.push(SP(80));
b.push(P("Decision point / business rule — tulis eksplisit \"jika ... maka ...\":", {bold: true, size: 18}));
b.push(T(["No", "Kondisi", "Jika Ya", "Jika Tidak", "Sumber Aturan"],
  [["1", "", "", "", ""], ["2", "", "", "", ""]], [0.6, 3, 2.4, 2.4, 1.6], {size: 16}));
b.push(SP(80));
b.push(P("Exception & alur alternatif — WAJIB, bukan hanya happy path:", {bold: true, size: 18}));
b.push(T(["No", "Kondisi Gagal", "Yang Terjadi di Sistem", "Pesan ke User", "Data ter-rollback?", "Boleh retry?"], [
  ["1", "Timeout ke service lain", "", "", "Ya / Tidak", "Ya / Tidak"],
  ["2", "Data tidak ditemukan", "", "", "", ""],
  ["3", "Validasi gagal", "", "", "", ""],
  ["4", "", "", "", "", ""],
], [0.6, 2.2, 2.4, 2.2, 1.4, 1.2], {size: 16}));
b.push(SP(80));
b.push(P("Transisi status (jika ada status):", {bold: true, size: 18}));
b.push(T(["Status Awal", "Event / Aksi", "Status Akhir", "Siapa yang boleh", "Reversible?"],
  [["", "", "", "", "Ya / Tidak"], ["", "", "", "", ""]], [2, 2.4, 2, 2.4, 1.2], {size: 16}));
b.push(BREAK());

/* ---------- C.2 UI ---------- */
b.push(H2("C.2  UI / Screen"));
b.push(guide([
  "Salin sub-bagian ini untuk SETIAP screen. Link desain (Figma / mockup) WAJIB aktif dan bisa diakses — link expired = dokumen dikembalikan.",
  {t: "Setiap field harus punya sumber data, validasi, dan pesan error."},
  {t: "Setiap tombol dipetakan ke API mana (rujuk nama API di C.3). Tombol tanpa mapping = celah requirement."},
  {t: "SEMUA state wajib dijelaskan. Yang paling sering dilupakan: state Empty dan state Tanpa hak akses."},
]));
b.push(T(["Field", "Isi"], [
  ["Ref. Requirement", "TED-XXXXX-Rnn"],
  ["Nama Screen", ""],
  ["Link Desain (Figma / mockup)", ""],
  ["Menu / path navigasi", "<< mis. Merchant > Whitelist Routing >>"],
  ["Jenis", "Screen baru / Perubahan screen existing"],
  ["Platform", "Web / Mobile / Both"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Screenshot / mockup:", {bold: true, size: 18}));
b.push(fill("<< sisipkan tangkapan layar desain di sini >>", 7));
b.push(SP(80));
b.push(P("Daftar Field:", {bold: true, size: 18}));
b.push(T(["No", "Label Field", "Tipe Komponen", "Wajib?", "Sumber Data", "Validasi", "Pesan Error", "Default", "Editable"], [
  ["1", "", "Text / Dropdown / Date / Checkbox / Upload", "Y / N", "<< API / common code / statis >>", "", "", "", "Ya / Tidak"],
  ["2", "", "", "", "", "", "", "", ""],
  ["3", "", "", "", "", "", "", "", ""],
], [0.5, 1.4, 1.6, 0.7, 1.5, 1.4, 1.4, 0.8, 0.7], {size: 14}));
b.push(SP(80));
b.push(P("Daftar Aksi / Tombol:", {bold: true, size: 18}));
b.push(T(["Tombol / Aksi", "Fungsi", "API yang dipanggil (ref. C.3)", "Konfirmasi?", "Hasil Sukses", "Hasil Gagal", "Role yang boleh"], [
  ["", "", "", "Ya / Tidak", "", "", ""],
  ["", "", "", "", "", "", ""],
], [1.5, 1.7, 1.9, 1.1, 1.4, 1.3, 1.1], {size: 15}));
b.push(SP(80));
b.push(P("State Layar — semua state wajib dijelaskan:", {bold: true, size: 18}));
b.push(T(["State", "Tampilan / Perilaku"], [
  ["Normal (ada data)", ""],
  ["Loading", ""],
  ["Empty (data kosong)", ""],
  ["Error (gagal ambil data)", ""],
  ["Success (setelah aksi berhasil)", ""],
  ["Read-only / tanpa hak akses", ""],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Hak Akses per Role di Screen ini:", {bold: true, size: 18}));
b.push(T(["Role", "Lihat Menu", "Lihat Data", "Tambah", "Ubah", "Hapus", "Upload", "Export"], [
  ["", "☐", "☐", "☐", "☐", "☐", "☐", "☐"],
  ["", "☐", "☐", "☐", "☐", "☐", "☐", "☐"],
], [3, 1.1, 1.1, 1, 1, 1, 1, 1], {size: 16}));
b.push(SP(80));
b.push(P("Aturan tampilan data:", {bold: true, size: 18}));
b.push(T(["Aspek", "Isi"], [
  ["Paginasi / jumlah baris per halaman", ""],
  ["Pengurutan default", ""],
  ["Filter & pencarian yang tersedia", ""],
  ["Format tampilan (tanggal, angka, mata uang)", ""],
  ["Data yang di-masking di layar", ""],
], [3.5, 6.5], {size: 17}));
b.push(BREAK());

/* ---------- C.3 API ---------- */
b.push(H2("C.3  API Contract"));
b.push(guide([
  "Salin sub-bagian ini untuk SETIAP endpoint. Untuk interface berbasis file, gunakan C.4.",
  {t: "Lampirkan OpenAPI/Swagger atau Postman collection — link wajib. Tabel di dokumen ini ringkasan, bukan pengganti spesifikasi."},
  {t: "Response error WAJIB lengkap, bukan hanya 200. Minimal: 400, 401/403, 404, 500, dan timeout."},
  {t: "Kolom \"Aksi Application Support\" adalah yang paling berharga — isi dengan apa yang harus dilakukan support kalau error ini muncul di production."},
  {t: "Jangan lupa timeout, retry policy, dan idempotency. Tiga hal ini yang menyebabkan insiden double-posting di dunia payment."},
]));
b.push(H3("<< Nama API >>"));
b.push(T(["Properti", "Isi"], [
  ["Ref. Requirement", "TED-XXXXX-Rnn"],
  ["Spesifikasi (Swagger / Postman)", "<< link >>"],
  ["Method & Path", "POST /api/v1/..."],
  ["Jenis", "REST / SOAP / ISO 8583 / gRPC"],
  ["Consumer (pemanggil)", ""],
  ["Provider (penyedia)", ""],
  ["Autentikasi", "OAuth2 / API Key / mTLS"],
  ["Otorisasi (role)", ""],
  ["Idempotent?", "Ya (key: << header >>) / Tidak"],
  ["Timeout", "<< n detik >>"],
  ["Retry policy", "<< n kali, backoff — atau: tidak ada >>"],
  ["Rate limit / TPS", ""],
  ["Sifat", "Sinkron / Asinkron"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Request Field:", {bold: true, size: 18}));
b.push(T(["Field", "Tipe", "Length", "Wajib?", "Validasi", "Contoh", "Keterangan"],
  [["", "", "", "Y / N", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]],
  [1.8, 1.1, 1, 0.9, 1.8, 1.5, 1.9], {size: 15}));
b.push(SP(80));
b.push(P("Response Sukses:", {bold: true, size: 18}));
b.push(T(["Field", "Tipe", "Length", "Keterangan"], rep(3, 4), [2.5, 1.5, 1.5, 4.5], {size: 15}));
b.push(SP(80));
b.push(P("Response Error — wajib lengkap:", {bold: true, size: 18}));
b.push(T(["HTTP Code", "Error Code", "Kondisi Pemicu", "Pesan ke User", "Aksi Application Support"], [
  ["400", "", "", "", ""],
  ["401 / 403", "", "", "", ""],
  ["404", "", "", "", ""],
  ["500", "", "", "", ""],
  ["Timeout", "", "", "", ""],
], [1.2, 1.4, 2.4, 2.2, 2.8], {size: 15}));
b.push(SP(80));
b.push(P("Contoh Request / Response:", {bold: true, size: 18}));
b.push(fill("// Request\n\n\n// Response Sukses\n\n\n// Response Error", 8));
b.push(BREAK());

/* ---------- C.4 FILE ---------- */
b.push(H2("C.4  File Interface / Batch Layout"));
b.push(guide([
  "Salin sub-bagian ini untuk SETIAP file. Isi jika ada file yang dikirim, diterima, atau di-upload user.",
  {t: "Pattern nama file harus pasti (mis. WHITELIST_YYYYMMDD.csv), bukan \"nama file bebas\"."},
  {t: "Wajib jelaskan penanganan file gagal / reject: dipindah ke folder mana, siapa yang dinotifikasi."},
  {t: "Sertakan contoh isi file 3 baris (header, body, trailer). Ini menghemat berjam-jam debugging."},
]));
b.push(H3("<< Nama File >>"));
b.push(T(["Properti", "Isi"], [
  ["Ref. Requirement", "TED-XXXXX-Rnn"],
  ["Arah", "Inbound (diterima) / Outbound (dikirim)"],
  ["Lawan transaksi", "<< sistem / pihak pengirim atau penerima >>"],
  ["Path", ""],
  ["File name pattern", "<< mis. WHITELIST_YYYYMMDD.csv >>"],
  ["File type", ""],
  ["Delimiter char", ""],
  ["Encoding", ""],
  ["Frekuensi / Jadwal", ""],
  ["Cara transfer", "SFTP / share folder / upload manual dari UI"],
  ["Encryption / PGP", "Ya / Tidak"],
  ["Ukuran & jumlah baris maksimum", ""],
  ["Retention file", ""],
  ["Penanganan file gagal / reject", "<< dipindah ke folder mana, notifikasi ke siapa >>"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Layout Field:", {bold: true, size: 18}));
b.push(T(["Section", "Name", "Data Type", "Data Length", "Mandatory", "Description"], [
  ["Header", "", "", "", "", ""],
  ["Header", "", "", "", "", ""],
  ["Body", "", "", "", "", ""],
  ["Body", "", "", "", "", ""],
  ["Trailer", "", "", "", "", ""],
], [1.2, 2, 1.4, 1.4, 1.2, 2.8], {size: 15}));
b.push(SP(80));
b.push(P("Contoh isi file (header, body, trailer):", {bold: true, size: 18}));
b.push(fill("<< contoh 3 baris isi file >>", 4));
b.push(BREAK());

/* ---------- C.5 DB ---------- */
b.push(H2("C.5  Database Design"));
b.push(danger([
  "DDL dan kamus kolom WAJIB ADA DI DALAM DOKUMEN INI, bukan hanya \"lampiran diagram\".",
  "Application Support membutuhkannya untuk query manual saat insiden; DBA membutuhkannya untuk review index dan growth.",
]));
b.push(SP(60));
b.push(guide([
  "Setiap index wajib punya justifikasi — index tanpa alasan biasanya index yang salah.",
  {t: "Estimasi growth, retention, dan purging WAJIB diisi. Tabel yang tumbuh tanpa purging adalah insiden yang dijadwalkan."},
  {t: "Script rollback DB wajib ada. Kalau tabel baru tidak di-drop saat rollback, tulis alasannya."},
]));
b.push(P("Ringkasan perubahan:", {bold: true, size: 18}));
b.push(T(["Object", "Tipe", "Aksi", "Ref. Requirement"], [
  ["<< TBXXXXX >>", "Table / Index / View / Sequence", "Create / Alter / Drop", "TED-XXXXX-Rnn"],
  ["", "", "", ""],
], [2.6, 2.8, 2.4, 2.2], {size: 16}));
b.push(SP(80));
b.push(P("Kamus kolom — << nama tabel >>:", {bold: true, size: 18}));
b.push(T(["Kolom", "Tipe", "Length", "Null?", "PK / FK", "Default", "Keterangan"],
  rep(4, 7), [2, 1.3, 1, 0.9, 1.1, 1.1, 2.6], {size: 15}));
b.push(SP(80));
b.push(P("Index:", {bold: true, size: 18}));
b.push(T(["Nama Index", "Kolom", "Tipe", "Justifikasi"], [
  ["", "", "Unique / Non-unique", ""], ["", "", "", ""],
], [2.4, 2.4, 2, 3.2], {size: 16}));
b.push(SP(80));
b.push(P("Estimasi volume & retention:", {bold: true, size: 18}));
b.push(T(["Tabel", "Estimasi row awal", "Growth / bulan", "Estimasi size 12 bln", "Retention", "Purging / Archiving"], [
  ["", "", "", "", "", "Ada / Tidak — jelaskan"], ["", "", "", "", "", ""],
], [1.9, 1.6, 1.5, 1.8, 1.4, 1.8], {size: 15}));
b.push(SP(80));
b.push(P("Script DDL:", {bold: true, size: 18}));
b.push(fill("-- CREATE / ALTER", 6));
b.push(SP(80));
b.push(P("Script Rollback DB:", {bold: true, size: 18}));
b.push(fill("-- rollback jika deployment dibatalkan", 5));
b.push(SP(80));
b.push(P("Data migration (jika ada):", {bold: true, size: 18}));
b.push(T(["Sumber", "Tujuan", "Jumlah record", "Cara", "Verifikasi", "Rollback"], rep(2, 6), [1.7, 1.7, 1.5, 1.7, 1.7, 1.7], {size: 15}));
b.push(BREAK());

/* ---------- C.6 SECURITY ---------- */
b.push(H2("C.6  Security & Access Control"));
b.push(danger([
  "Bagian ini DIISI DEVELOPER SAAT DESAIN, bukan diisi IT Security di akhir.",
  "IT Security me-review, bukan mengarang. Kalau developer tidak menuliskan kontrol keamanannya, artinya kontrol itu memang belum dipikirkan saat coding.",
]));
b.push(SP(60));
b.push(guide([
  "Maker-Checker: kalau memutuskan TIDAK memakai untuk aksi berisiko, tulis justifikasinya — itu keputusan sadar, bukan kelalaian.",
  {t: "Audit trail: fitur \"change history\" di UI bukan audit trail sampai speknya ditulis di sini."},
  {t: "Aturan mutlak: data sensitif TIDAK BOLEH ikut ter-log."},
  {t: "Kalau menyentuh data kartu (PAN/CVV/track), rujuk kontrol PCI-DSS dan libatkan IT Security SEBELUM coding."},
]));
b.push(P("Access Control Matrix:", {bold: true, size: 18}));
b.push(T(["Role", "View", "Add", "Edit", "Delete", "Bulk Upload", "Export", "Approve"], [
  ["", "☐", "☐", "☐", "☐", "☐", "☐", "☐"],
  ["", "☐", "☐", "☐", "☐", "☐", "☐", "☐"],
  ["", "☐", "☐", "☐", "☐", "☐", "☐", "☐"],
], [3, 0.9, 0.9, 0.9, 1, 1.4, 1, 1.1], {size: 16}));
b.push(SP(80));
b.push(P("Dual Control / Maker-Checker:", {bold: true, size: 18}));
b.push(T(["Aksi Berisiko", "Perlu Maker-Checker?", "Mekanisme", "Justifikasi jika Tidak"], [
  ["Delete data", "Ya / Tidak", "", ""],
  ["Bulk upload", "Ya / Tidak", "", ""],
  ["Perubahan konfigurasi routing", "Ya / Tidak", "", ""],
  ["", "", "", ""],
], [2.6, 1.9, 2.5, 3], {size: 16}));
b.push(SP(80));
b.push(P("Audit Trail:", {bold: true, size: 18}));
b.push(T(["Aspek", "Isi"], [
  ["Aksi yang dicatat", "<< add / edit / delete / upload / export / login >>"],
  ["Data yang disimpan", "<< user, timestamp, IP, nilai lama → nilai baru, ID record >>"],
  ["Tabel / lokasi penyimpanan", ""],
  ["Retention audit log", ""],
  ["Bisa diakses siapa", ""],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Klasifikasi Data:", {bold: true, size: 18}));
b.push(T(["Data", "Klasifikasi", "Masking?", "Boleh di log?", "Enkripsi (at rest / in transit)"], [
  ["", "Public / Internal / Confidential / PII / CHD", "Ya / Tidak", "Ya / Tidak", ""],
  ["", "", "", "", ""],
], [2.2, 2.8, 1.3, 1.5, 2.2], {size: 15}));
b.push(SP(80));
b.push(P("Validasi Input & File:", {bold: true, size: 18}));
b.push(T(["Kontrol", "Diterapkan?", "Keterangan"], [
  ["Validasi tipe & ukuran file upload", "Ya / Tidak", ""],
  ["Batas maksimum baris bulk upload", "Ya / Tidak", "<< n baris >>"],
  ["Proteksi SQL injection / XSS", "Ya / Tidak", ""],
  ["Sanitasi output export (CSV injection)", "Ya / Tidak", ""],
], [4, 1.8, 4.2], {size: 16}));
b.push(BREAK());

/* ---------- C.7 IMPACT ---------- */
b.push(H2("C.7  Impact Analysis"));
b.push(guide([
  "Rujuk ID requirement di setiap baris. Cek satu per satu SEMUA aspek — jangan hanya mengisi yang mudah.",
  {t: "JANGAN menaruh skenario testing di sini — tempatnya di F.1."},
  {t: "Tabel sign-off: setiap unit WAJIB memilih Impacted atau Not Impacted. Kosong = belum direview."},
]));
b.push(T(["Ref. Requirement", "Aspek", "Existing Flow", "Changes / To Be Flow", "Risiko", "Mitigasi"], [
  ["TED-XXXXX-R01", "Aplikasi", "", "", "", ""],
  ["", "Database", "", "", "", ""],
  ["", "Integrasi / Interface", "", "", "", ""],
  ["", "Batch / Scheduler", "", "", "", ""],
  ["", "Konfigurasi / Parameter", "", "", "", ""],
  ["", "Report / Rekonsiliasi", "", "", "", ""],
  ["", "Downtime", "Ya / Tidak — << durasi >>", "", "", ""],
], [1.6, 1.8, 1.8, 2, 1.4, 1.4], {size: 15}));
b.push(SP(120));
b.push(P("Sign-off Reviewer Lintas Unit:", {bold: true, size: 18}));
b.push(T(["Group / Department", "Impacted?", "Reviewer Notes", "Nama", "Tanggal", "Tanda Tangan"], [
  {__section: "IT INFRA & OPERATIONS"},
  ["Application Infrastructure & Datawarehouse", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  ["System & Network", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  ["IT Monitoring & DC Operations", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  ["Application Support", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  {__section: "IT INFORMATION SECURITY"},
  ["Security Services", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  {__section: "IT ENGINEERING"},
  ["Front End", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  ["Middleware", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  ["Backend", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  ["Improvement & IT Architecture", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
  {__section: "COMPLIANCE REVIEW"},
  ["IT Governance, Risk & Compliance", "☐ Impacted\n☐ Not Impacted", "", "", "", ""],
], [2.8, 1.6, 2.2, 1.3, 1.1, 1], {size: 15, zebra: false}));
b.push(BREAK());

/* ---------- C.8 CODE DEPENDENCY ---------- */
b.push(H2("C.8  Code Dependency"));
b.push(guide([
  "Isi versi Prod / Test / Dev per program — inilah yang paling menolong saat rollback.",
  {t: "Kolom Rollback Impact DILARANG diisi \"N/A\" massal. Jelaskan apa yang terjadi kalau program ini di-rollback sendirian."},
  {t: "Contoh benar: \"Harus rollback bersama SMC03F300R karena kontrak request berubah.\"", i: true},
]));
b.push(T(["Program / Module", "Jenis Program", "Changes Type", "Ref. Requirement", "Related Project", "Interface / API", "Repository & Branch/Tag", "Rollback Impact", "Prod", "Test", "Dev"], [
  ["", "Online Service / Batch / UI", "New / Enhancement / Fix", "TED-XXXXX-Rnn", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
], [1.5, 1.5, 1.4, 1.3, 1, 1, 1.3, 1.4, 0.55, 0.55, 0.55], {size: 13}));

/* ---------- C.9 SECURITY CODE REVIEW ---------- */
b.push(H2("C.9  Security Code Review"));
b.push(guide([
  "Kolom Status diisi dan diverifikasi IT SECURITY.",
  {t: "Checking Item di bawah sudah baku — developer wajib memastikan seluruhnya terpenuhi SEBELUM submit ke IT Security."},
]));
b.push(T(["No", "Area Review", "Checking Item", "Status", "Catatan"], [
  ["1", "Authentication", "Endpoint tidak dapat diakses tanpa token / sesi valid", "Pass / Fail / N/A", ""],
  ["2", "Authorization", "Otorisasi divalidasi di sisi server per role, bukan hanya di UI", "", ""],
  ["3", "Input Validation", "Seluruh input divalidasi di server (tipe, panjang, format)", "", ""],
  ["4", "Input Validation", "Proteksi SQL injection (prepared statement) & XSS", "", ""],
  ["5", "Secure Coding", "Tidak ada credential / secret hardcoded di source & config", "", ""],
  ["6", "Encryption", "Data sensitif terenkripsi at-rest & in-transit (TLS)", "", ""],
  ["7", "API Security", "Rate limiting, timeout, dan pembatasan payload diterapkan", "", ""],
  ["8", "Dependency Security", "Library bebas CVE kritikal (hasil scan dilampirkan)", "", ""],
  ["9", "Error Handling", "Pesan error tidak membocorkan stack trace / detail internal", "", ""],
  ["10", "Session Security", "Timeout sesi, invalidasi saat logout, proteksi CSRF", "", ""],
  ["11", "File Handling", "Validasi tipe & ukuran file, penyimpanan di luar webroot", "", ""],
  ["12", "Access Control", "Tidak ada IDOR / akses langsung ke object milik user lain", "", ""],
  ["13", "Logging & Audit", "Aksi sensitif tercatat; data sensitif tidak ikut ter-log", "", ""],
], [0.6, 1.9, 4.5, 1.6, 1.4], {size: 15}));
b.push(BREAK());

module.exports = b;
