const {D, P, H1, H2, H3, box, fill, T, SP, BREAK} = require('./lib.js');
const b = [];

b.push(H1("C.  DETAIL DESIGN"));

b.push(H2("C.0  Matriks Kelengkapan Detail Design"));
b.push(T(["Pilar", "Ada?", "Jumlah item", "Bagian", "Keterangan"], [
  ["Flow Process", "☑ Ada", "2 flow", "C.1", "Flow registrasi whitelist (maker-checker) dan flow routing callback"],
  ["UI / Screen", "☑ Ada", "1 screen", "C.2", "Screen Livin Routing List"],
  ["API", "☑ Ada", "9 endpoint", "C.3", "Detail penuh untuk 2 endpoint kunci, sisanya pada katalog"],
  ["File / Batch", "☑ Ada", "2 file", "C.4", "Template bulk upload dan file hasil export. Tidak ada batch/scheduler."],
], [1.8, 1.2, 1.2, 0.9, 4.9], {size: 16}));

/* ---------- C.1 ---------- */
b.push(H2("C.1  Flow Process"));
b.push(H3("Flow 1 — Registrasi & Perubahan Data Whitelist (Maker-Checker)"));
b.push(T(["Field", "Isi"], [
  ["Ref. Requirement", "TED-21742-R02, R03, R04"],
  ["Nama Flow", "Registrasi & Perubahan Data Whitelist MID Livin Merchant"],
  ["Aktor / sistem yang terlibat", "User Maker (MAAS_WL_MAKER), User Checker (MAAS_WL_CHECKER), MAAS App Service, Merchant Inquiry Service, PostgreSQL"],
  ["Trigger (pemicu)", "User Maker membuka screen Livin Routing List dan melakukan aksi Add / Bulk Upload / Edit / Delete"],
  ["Pre-condition", "User memiliki role MAAS_WL_MAKER; MID yang didaftarkan merupakan merchant Livin Merchant dengan status Active"],
  ["Post-condition (sukses)", "Data tersimpan di TBMCLVNRTLIST dengan status APPROVED; tercatat di tabel history; routing callback membaca data baru"],
  ["Post-condition (gagal)", "Data tetap di tabel staging dengan status REJECTED; data produksi tidak berubah; alasan penolakan tercatat"],
  ["Sifat proses", "Sinkron (inquiry & simpan staging) + Asinkron ringan (commit ke tabel utama setelah approval)"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(fill("[ Sisipkan swimlane diagram Flow 1 — Lampiran 2 ]", 6));
b.push(SP(80));
b.push(P("Langkah proses:", {bold: true, size: 18}));
b.push(T(["Step", "Aktor / Komponen", "Aksi", "Input", "Output", "Kondisi / Percabangan"], [
  ["1", "User Maker", "Membuka screen dan memilih aksi", "—", "Form input / form upload", "Add satuan → step 2; Bulk upload → step 3"],
  ["2", "User Maker", "Input MID, pilih ENV Backend dan ENV Auth", "MID, ENV Backend, ENV Auth", "Baris data belum tersimpan", "Lanjut step 4"],
  ["3", "User Maker", "Download template, isi, lalu upload file Excel", "File .xlsx maks. 500 baris", "Daftar baris terbaca di layar", "File invalid → exception E-02"],
  ["4", "MAAS App Service", "Inquiry status MID ke Merchant Inquiry Service", "Daftar MID", "Nama merchant + status MID", "Timeout → exception E-01"],
  ["5", "MAAS App Service", "Validasi hasil inquiry", "Status MID", "Baris ditandai valid / invalid", "Status Terminated → baris ditolak (D-01)"],
  ["6", "User Maker", "Submit data yang valid", "Baris valid", "Data masuk tabel staging, status PENDING", "Tidak ada baris valid → exception E-03"],
  ["7", "MAAS App Service", "Mencatat pengajuan ke tabel history", "Data staging", "Record history status SUBMITTED", "—"],
  ["8", "User Checker", "Membuka daftar pengajuan dan meninjau", "Data staging PENDING", "Keputusan approve / reject", "Reject → step 10"],
  ["9", "MAAS App Service", "Commit data ke TBMCLVNRTLIST", "Data staging APPROVED", "Data aktif; history APPROVED", "Gagal commit → rollback, exception E-04"],
  ["10", "MAAS App Service", "Menandai data staging REJECTED beserta alasan", "Alasan penolakan", "History REJECTED", "Data produksi tidak berubah"],
], [0.5, 1.7, 2.3, 1.6, 1.9, 2], {size: 14}));
b.push(SP(80));
b.push(P("Decision point / business rule:", {bold: true, size: 18}));
b.push(T(["No", "Kondisi", "Jika Ya", "Jika Tidak", "Sumber Aturan"], [
  ["D-01", "Status MID = Active", "Baris boleh dilanjutkan ke proses simpan", "Baris ditolak, ditandai merah di layar, tidak ikut disubmit", "PRD-LM-2026-014 ps. 4.2"],
  ["D-02", "MID sudah pernah terdaftar di TBMCLVNRTLIST", "Baris diperlakukan sebagai update environment, bukan insert baru", "Insert baris baru", "PRD-LM-2026-014 ps. 4.3"],
  ["D-03", "Aksi = Delete atau Bulk Upload", "Wajib melalui approval Checker sebelum berlaku", "Perubahan berlaku langsung setelah simpan (Edit satuan)", "Kebijakan dual control IT Security"],
  ["D-04", "Maker = Checker (orang yang sama)", "Approval ditolak sistem", "Approval diproses", "Kebijakan dual control IT Security"],
  ["D-05", "Jumlah baris file bulk > 500", "File ditolak seluruhnya", "File diproses", "Batas kapasitas, lihat C.4"],
], [0.7, 2.4, 2.5, 2.4, 2], {size: 15}));
b.push(SP(80));
b.push(P("Exception & alur alternatif:", {bold: true, size: 18}));
b.push(T(["No", "Kondisi Gagal", "Yang Terjadi di Sistem", "Pesan ke User", "Data ter-rollback?", "Boleh retry?"], [
  ["E-01", "Timeout inquiry ke Merchant Inquiry Service (> 10 detik)", "Proses dihentikan; tidak ada data yang disimpan", "\"Gagal mengambil status merchant. Silakan coba beberapa saat lagi.\"", "Ya — tidak ada data tersimpan", "Ya"],
  ["E-02", "File upload bukan .xlsx, melebihi 2 MB, atau kolom tidak sesuai template", "File ditolak sebelum diproses", "\"Format file tidak sesuai. Gunakan template yang tersedia pada tombol Download Template.\"", "Ya", "Ya"],
  ["E-03", "Seluruh MID pada file berstatus Terminated", "Tidak ada data yang disimpan", "\"Tidak ada data yang dapat disimpan. Seluruh MID berstatus Terminated.\"", "Ya", "Ya"],
  ["E-04", "Kegagalan database saat commit dari staging ke tabel utama", "Transaksi di-rollback penuh; data staging tetap PENDING", "\"Terjadi kesalahan sistem. Data belum tersimpan, silakan ulangi persetujuan.\"", "Ya — transaksi atomik", "Ya"],
  ["E-05", "User Checker mencoba menyetujui pengajuannya sendiri", "Approval ditolak sistem", "\"Persetujuan tidak dapat dilakukan oleh pengaju yang sama.\"", "Tidak ada perubahan data", "Tidak — harus checker lain"],
], [0.7, 2.2, 2.1, 2.6, 1.4, 1], {size: 14}));
b.push(SP(80));
b.push(P("Transisi status:", {bold: true, size: 18}));
b.push(T(["Status Awal", "Event / Aksi", "Status Akhir", "Siapa yang boleh", "Reversible?"], [
  ["—", "Maker submit pengajuan", "PENDING", "MAAS_WL_MAKER", "Ya — dapat dibatalkan Maker selama masih PENDING"],
  ["PENDING", "Checker menyetujui", "APPROVED (data aktif)", "MAAS_WL_CHECKER", "Tidak — perubahan berikutnya melalui pengajuan baru"],
  ["PENDING", "Checker menolak", "REJECTED", "MAAS_WL_CHECKER", "Tidak"],
  ["PENDING", "Maker membatalkan", "CANCELLED", "MAAS_WL_MAKER (pengaju)", "Tidak"],
  ["APPROVED", "Maker mengajukan delete, Checker menyetujui", "DELETED (soft delete)", "MAKER + CHECKER", "Ya — dapat diaktifkan kembali melalui pengajuan baru"],
], [1.7, 2.4, 1.9, 2, 2], {size: 15}));
b.push(BREAK());

b.push(H3("Flow 2 — Routing Callback MTI ke Mandiri"));
b.push(T(["Field", "Isi"], [
  ["Ref. Requirement", "TED-21742-R08"],
  ["Nama Flow", "Penentuan tujuan callback berdasarkan data whitelist"],
  ["Aktor / sistem yang terlibat", "Routing Callback Service (SAU06F004U), PostgreSQL (TBMCLVNRTLIST), Common Code AUT1222, sistem Bank Mandiri"],
  ["Trigger (pemicu)", "Event callback dari proses transaksi Livin Merchant"],
  ["Pre-condition", "MID terdaftar pada TBMCLVNRTLIST dengan status APPROVED, atau masih terdaftar pada AUT1222 selama periode paralel"],
  ["Post-condition (sukses)", "Callback terkirim ke endpoint sesuai ENV Backend / ENV Auth merchant"],
  ["Post-condition (gagal)", "Callback diarahkan ke environment Production sebagai default aman; kejadian dicatat sebagai WARN di log"],
  ["Sifat proses", "Sinkron"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Langkah proses:", {bold: true, size: 18}));
b.push(T(["Step", "Aktor / Komponen", "Aksi", "Input", "Output", "Kondisi / Percabangan"], [
  ["1", "Routing Callback Service", "Menerima event callback", "MID, payload transaksi", "—", "—"],
  ["2", "Routing Callback Service", "Lookup MID pada TBMCLVNRTLIST (status APPROVED)", "MID", "ENV Backend, ENV Auth, routing URL", "Tidak ditemukan → step 3"],
  ["3", "Routing Callback Service", "Fallback lookup pada common code AUT1222", "MID", "ENV Backend, ENV Auth", "Tidak ditemukan → step 4"],
  ["4", "Routing Callback Service", "Menggunakan environment default Production", "—", "ENV = Production", "Dicatat sebagai WARN di log"],
  ["5", "Routing Callback Service", "Mengirim callback ke endpoint tujuan", "Payload", "Response Mandiri", "Timeout → exception E-06"],
], [0.5, 2, 2.6, 1.6, 1.9, 1.4], {size: 15}));
b.push(SP(80));
b.push(P("Exception:", {bold: true, size: 18}));
b.push(T(["No", "Kondisi Gagal", "Yang Terjadi di Sistem", "Data ter-rollback?", "Boleh retry?"], [
  ["E-06", "Timeout callback ke Mandiri", "Mengikuti mekanisme retry existing SAU06F004U (3x, backoff 5 detik) — tidak berubah pada pengembangan ini", "Tidak berlaku", "Ya — otomatis"],
  ["E-07", "Koneksi database gagal saat lookup", "Fallback ke common code AUT1222; jika tetap gagal, default Production", "Tidak berlaku", "Ya"],
], [0.7, 2.3, 4.5, 1.3, 1.2], {size: 15}));
b.push(SP(100));
b.push(box("CATATAN PENTING", [
  "Fallback berlapis (tabel baru → AUT1222 → default Production) dipilih agar pemindahan sumber data routing tidak berisiko menghentikan callback yang sedang berjalan.",
  "Fallback ke AUT1222 dinonaktifkan setelah migrasi data selesai (CR #22910) dan diverifikasi 0 hit fallback selama 7 hari berturut-turut.",
], "warn"));
b.push(BREAK());

/* ---------- C.2 ---------- */
b.push(H2("C.2  UI / Screen"));
b.push(H3("Screen — Livin Routing List"));
b.push(T(["Field", "Isi"], [
  ["Ref. Requirement", "TED-21742-R01 s.d. R07"],
  ["Nama Screen", "Livin Routing List"],
  ["Link Desain (Figma)", "figma.com/design/2UC4umHnzf9mAgGZGNTwvD/MAAS---Whitelist-Screen (node 0-1) — diverifikasi dapat diakses 20 Agustus 2026"],
  ["Menu / path navigasi", "MAAS > Merchant > Livin Routing List"],
  ["Jenis", "Screen baru"],
  ["Platform", "Web (desktop)"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(fill("[ Sisipkan tangkapan layar desain Figma di sini — Lampiran 3 ]", 6));
b.push(SP(80));
b.push(P("Daftar Field:", {bold: true, size: 18}));
b.push(T(["No", "Label Field", "Tipe Komponen", "Wajib?", "Sumber Data", "Validasi", "Pesan Error", "Editable"], [
  ["1", "MID", "Text", "Y", "Input user", "Numerik, tepat 15 digit", "\"MID harus 15 digit angka.\"", "Ya (saat add)"],
  ["2", "Nama Merchant", "Text (read-only)", "—", "Merchant Inquiry Service", "—", "—", "Tidak"],
  ["3", "Status MID", "Label (read-only)", "—", "Merchant Inquiry Service", "—", "—", "Tidak"],
  ["4", "ENV Backend", "Dropdown", "Y", "Common code AUT1223", "Harus salah satu value AUT1223", "\"Environment Backend wajib dipilih.\"", "Ya"],
  ["5", "ENV Auth", "Dropdown", "Y", "Common code AUT1223", "Harus salah satu value AUT1223", "\"Environment Auth wajib dipilih.\"", "Ya"],
  ["6", "Routing Endpoint", "Text (read-only)", "—", "TBMCLVNRTLIST (turunan ENV)", "—", "—", "Tidak"],
  ["7", "Tanggal Register", "Date (read-only)", "—", "TBMCLVNRTLIST", "—", "—", "Tidak"],
  ["8", "Status Data", "Label", "—", "TBMCLVNRTLIST", "—", "—", "Tidak"],
  ["9", "Filter — MID", "Text", "N", "Input user", "Numerik, maks 15 digit", "\"Filter MID harus angka.\"", "Ya"],
  ["10", "Filter — Tanggal Register", "Date range", "N", "Input user", "Rentang maks 90 hari", "\"Rentang tanggal maksimal 90 hari.\"", "Ya"],
  ["11", "File Bulk Upload", "File upload", "Y (mode bulk)", "Input user", ".xlsx, maks 2 MB, maks 500 baris", "\"Format file tidak sesuai. Gunakan template yang tersedia.\"", "Ya"],
], [0.4, 1.4, 1.3, 0.8, 1.5, 1.6, 2.1, 0.9], {size: 13}));
b.push(SP(80));
b.push(P("Daftar Aksi / Tombol:", {bold: true, size: 18}));
b.push(T(["Tombol / Aksi", "Fungsi", "API yang dipanggil (ref. C.3)", "Konfirmasi?", "Hasil Sukses", "Hasil Gagal", "Role yang boleh"], [
  ["Search", "Mencari data whitelist", "API-01 GET /whitelist", "Tidak", "Tabel terisi hasil pencarian", "Toast error, tabel kosong", "VIEWER, MAKER, CHECKER, ADMIN"],
  ["Inquiry", "Mengambil nama & status MID", "API-02 POST /whitelist/inquiry", "Tidak", "Kolom nama & status terisi", "Toast \"Gagal mengambil status merchant\"", "MAKER, ADMIN"],
  ["Add", "Menambah data satuan", "API-03 POST /whitelist", "Ya", "Pop-up sukses, status PENDING", "Pop-up berisi alasan gagal", "MAKER, ADMIN"],
  ["Download Template", "Mengunduh template bulk upload", "API-04 GET /whitelist/template", "Tidak", "File .xlsx terunduh", "Toast error", "MAKER, ADMIN"],
  ["Bulk Upload", "Mengunggah data massal", "API-05 POST /whitelist/bulk-upload", "Ya", "Ringkasan baris valid & invalid", "Pop-up alasan penolakan file", "MAKER, ADMIN"],
  ["Edit ENV", "Mengubah environment", "API-06 PUT /whitelist/{id}", "Ya", "Baris ter-update di tabel", "Pop-up alasan gagal", "MAKER, ADMIN"],
  ["Delete", "Menghapus data terpilih", "API-07 DELETE /whitelist", "Ya — sebut jumlah baris", "Pengajuan hapus status PENDING", "Pop-up alasan gagal", "MAKER, ADMIN"],
  ["Approve / Reject", "Menyetujui atau menolak pengajuan", "API-08 POST /whitelist/approval", "Ya", "Data aktif / ditolak", "Pop-up alasan gagal", "CHECKER, ADMIN"],
  ["Export", "Mengekspor data ke Excel", "API-09 GET /whitelist/export", "Tidak", "File .xlsx terunduh", "Toast error", "VIEWER, MAKER, CHECKER, ADMIN"],
  ["Change History", "Menampilkan riwayat perubahan", "API-10 GET /whitelist/{id}/history", "Tidak", "Modal riwayat perubahan", "Toast error", "VIEWER, MAKER, CHECKER, ADMIN"],
], [1.3, 1.6, 1.9, 1.1, 1.6, 1.5, 1], {size: 13}));
b.push(SP(80));
b.push(P("State Layar:", {bold: true, size: 18}));
b.push(T(["State", "Tampilan / Perilaku"], [
  ["Normal (ada data)", "Tabel menampilkan 25 baris per halaman, terurut Tanggal Register terbaru. Baris berstatus PENDING ditandai latar kuning."],
  ["Loading", "Skeleton row pada area tabel; seluruh tombol aksi non-aktif selama proses berjalan."],
  ["Empty (data kosong)", "Ilustrasi kosong dengan teks \"Belum ada data whitelist. Gunakan tombol Add atau Bulk Upload untuk menambahkan.\""],
  ["Error (gagal ambil data)", "Banner merah \"Gagal memuat data. Silakan coba lagi.\" disertai tombol Muat Ulang. Tabel tidak menampilkan data lama."],
  ["Success (setelah aksi berhasil)", "Toast hijau berisi ringkasan hasil, contoh \"12 data berhasil diajukan, menunggu persetujuan.\" Tabel otomatis di-refresh."],
  ["Read-only / tanpa hak akses", "Untuk role VIEWER: tombol Add, Bulk Upload, Edit, Delete, dan Approve disembunyikan (bukan sekadar dinonaktifkan). Jika user tanpa role membuka URL langsung, tampil halaman 403 \"Anda tidak memiliki akses ke menu ini.\""],
], [3, 7], {size: 16}));
b.push(SP(80));
b.push(P("Hak Akses per Role di Screen ini:", {bold: true, size: 18}));
b.push(T(["Role", "Lihat Menu", "Lihat Data", "Tambah", "Ubah", "Hapus", "Upload", "Export", "Approve"], [
  ["MAAS_WL_VIEWER", "☑", "☑", "☐", "☐", "☐", "☐", "☑", "☐"],
  ["MAAS_WL_MAKER", "☑", "☑", "☑", "☑", "☑", "☑", "☑", "☐"],
  ["MAAS_WL_CHECKER", "☑", "☑", "☐", "☐", "☐", "☐", "☑", "☑"],
  ["MAAS_WL_ADMIN", "☑", "☑", "☑", "☑", "☑", "☑", "☑", "☑"],
], [2.6, 1, 1, 0.9, 0.85, 0.85, 0.95, 0.95, 1], {size: 15}));
b.push(SP(80));
b.push(P("Aturan tampilan data:", {bold: true, size: 18}));
b.push(T(["Aspek", "Isi"], [
  ["Paginasi / jumlah baris per halaman", "25 baris per halaman (pilihan 25 / 50 / 100)"],
  ["Pengurutan default", "Tanggal Register menurun (terbaru di atas)"],
  ["Filter & pencarian yang tersedia", "MID, Nama Merchant, ENV Backend, ENV Auth, Status Data, rentang Tanggal Register (maks 90 hari)"],
  ["Format tampilan", "Tanggal dd-MM-yyyy HH:mm WIB; MID ditampilkan penuh tanpa pemisah"],
  ["Data yang di-masking di layar", "Tidak ada. MID dan nama merchant bukan data PII maupun data kartu (lihat C.6)"],
], [3.4, 6.6], {size: 16}));
b.push(BREAK());

/* ---------- C.3 ---------- */
b.push(H2("C.3  API Contract"));
b.push(P("Spesifikasi lengkap: Swagger MAAS — /maas-app/v3/api-docs (koleksi Postman: MAAS-Whitelist-v1.postman_collection.json, dilampirkan pada CR #21742).", {size: 17, italics: true, after: 120}));
b.push(P("Katalog API:", {bold: true, size: 18}));
b.push(T(["ID", "Method & Path", "Fungsi", "Program", "Ref. Requirement", "Role"], [
  ["API-01", "GET /api/v1/whitelist", "List & search data whitelist", "SMC03F300R", "R01", "VIEWER, MAKER, CHECKER, ADMIN"],
  ["API-02", "POST /api/v1/whitelist/inquiry", "Inquiry nama & status MID", "SMC03F301R", "R04", "MAKER, ADMIN"],
  ["API-03", "POST /api/v1/whitelist", "Simpan data satuan (staging)", "SMC03F302R", "R02", "MAKER, ADMIN"],
  ["API-04", "GET /api/v1/whitelist/template", "Unduh template bulk upload", "SMC03F300R", "R05", "MAKER, ADMIN"],
  ["API-05", "POST /api/v1/whitelist/bulk-upload", "Unggah data massal (staging)", "SMC03F302R", "R02", "MAKER, ADMIN"],
  ["API-06", "PUT /api/v1/whitelist/{id}", "Ubah environment", "SMC03F303U", "R03", "MAKER, ADMIN"],
  ["API-07", "DELETE /api/v1/whitelist", "Ajukan hapus data terpilih", "SMC03F303U", "R03", "MAKER, ADMIN"],
  ["API-08", "POST /api/v1/whitelist/approval", "Approve / reject pengajuan", "SMC03F303U", "R02, R03", "CHECKER, ADMIN"],
  ["API-09", "GET /api/v1/whitelist/export", "Export data ke Excel", "SMC03F300R", "R05", "VIEWER, MAKER, CHECKER, ADMIN"],
  ["API-10", "GET /api/v1/whitelist/{id}/history", "Riwayat perubahan data", "SMC03F300R", "R07", "VIEWER, MAKER, CHECKER, ADMIN"],
], [0.8, 2.6, 2.2, 1.2, 1.2, 2], {size: 14}));
b.push(SP(120));
b.push(P("Detail dua endpoint kunci disajikan di bawah. Endpoint lain mengikuti pola yang sama dan terdokumentasi penuh pada Swagger.", {italics: true, size: 17, color: "595959"}));

b.push(H3("API-02 — POST /api/v1/whitelist/inquiry"));
b.push(T(["Properti", "Isi"], [
  ["Ref. Requirement", "TED-21742-R04"],
  ["Method & Path", "POST /api/v1/whitelist/inquiry"],
  ["Jenis", "REST"],
  ["Consumer (pemanggil)", "MAAS Web (screen Livin Routing List)"],
  ["Provider (penyedia)", "MAAS App Service — SMC03F301R"],
  ["Autentikasi", "OAuth2 Bearer Token"],
  ["Otorisasi (role)", "MAAS_WL_MAKER, MAAS_WL_ADMIN"],
  ["Idempotent?", "Ya — operasi baca, tidak mengubah data"],
  ["Timeout", "10 detik (ke Merchant Inquiry Service: 8 detik)"],
  ["Retry policy", "Tidak ada retry otomatis; user mengulang manual dari layar"],
  ["Rate limit / TPS", "20 request/menit per user"],
  ["Sifat", "Sinkron"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Request Field:", {bold: true, size: 18}));
b.push(T(["Field", "Tipe", "Length", "Wajib?", "Validasi", "Contoh", "Keterangan"], [
  ["midList", "array of string", "1–500", "Y", "Minimal 1, maksimal 500 elemen", "[\"710012345678901\"]", "Daftar MID yang akan dicek"],
  ["midList[]", "string", "15", "Y", "Numerik, tepat 15 digit", "710012345678901", "MID merchant"],
], [1.6, 1.5, 1, 0.8, 2, 1.9, 1.2], {size: 14}));
b.push(SP(80));
b.push(P("Response Sukses (HTTP 200):", {bold: true, size: 18}));
b.push(T(["Field", "Tipe", "Length", "Keterangan"], [
  ["responseCode", "string", "4", "\"0000\" untuk sukses"],
  ["responseMessage", "string", "100", "Deskripsi hasil"],
  ["data[].mid", "string", "15", "MID yang dicek"],
  ["data[].merchantName", "string", "100", "Nama merchant; null jika MID tidak ditemukan"],
  ["data[].midStatus", "string", "12", "ACTIVE / TERMINATED / NOT_FOUND"],
  ["data[].isLivinMerchant", "boolean", "—", "true jika MID merupakan merchant Livin Merchant"],
  ["data[].eligible", "boolean", "—", "true jika MID boleh di-whitelist (ACTIVE dan merchant LM)"],
], [2.4, 1.5, 1.2, 4.9], {size: 15}));
b.push(SP(80));
b.push(P("Response Error:", {bold: true, size: 18}));
b.push(T(["HTTP Code", "Error Code", "Kondisi Pemicu", "Pesan ke User", "Aksi Application Support"], [
  ["400", "WL-4001", "midList kosong atau melebihi 500 elemen", "\"Jumlah MID melebihi batas 500 data.\"", "Tidak perlu tindakan; arahkan user memecah file"],
  ["400", "WL-4002", "Format MID bukan 15 digit numerik", "\"MID harus 15 digit angka.\"", "Tidak perlu tindakan; kesalahan input user"],
  ["401", "WL-4010", "Token tidak valid atau kedaluwarsa", "\"Sesi Anda telah berakhir. Silakan login kembali.\"", "Minta user login ulang; jika berulang, cek service OAuth2"],
  ["403", "WL-4030", "Role user tidak diizinkan", "\"Anda tidak memiliki akses untuk fungsi ini.\"", "Verifikasi role user ke tim yang mengelola akses MAAS"],
  ["504", "WL-5040", "Timeout ke Merchant Inquiry Service (> 8 detik)", "\"Gagal mengambil status merchant. Silakan coba beberapa saat lagi.\"", "Cek health Merchant Inquiry Service; lihat runbook D.4 baris 1"],
  ["500", "WL-5000", "Kegagalan tidak terduga", "\"Terjadi kesalahan sistem.\"", "Ambil correlationId dari layar, telusuri log sesuai D.3, eskalasi L2"],
], [1, 1.2, 2.3, 2.6, 2.9], {size: 14}));
b.push(SP(80));
b.push(P("Contoh Request / Response:", {bold: true, size: 18}));
b.push(fill("// Request\nPOST /api/v1/whitelist/inquiry\nAuthorization: Bearer <token>\nX-Correlation-Id: 7f3a1c92-4b8e-4d21-9c65-0a5e2b7d1f04\n{ \"midList\": [\"710012345678901\", \"710012345678902\"] }\n\n// Response Sukses\n{ \"responseCode\": \"0000\", \"responseMessage\": \"Success\",\n  \"data\": [\n    { \"mid\": \"710012345678901\", \"merchantName\": \"Toko Sinar Jaya\", \"midStatus\": \"ACTIVE\", \"isLivinMerchant\": true, \"eligible\": true },\n    { \"mid\": \"710012345678902\", \"merchantName\": \"Warung Berkah\", \"midStatus\": \"TERMINATED\", \"isLivinMerchant\": true, \"eligible\": false } ] }\n\n// Response Error\n{ \"responseCode\": \"WL-5040\", \"responseMessage\": \"Gagal mengambil status merchant. Silakan coba beberapa saat lagi.\",\n  \"correlationId\": \"7f3a1c92-4b8e-4d21-9c65-0a5e2b7d1f04\" }", 1));
b.push(BREAK());

b.push(H3("API-05 — POST /api/v1/whitelist/bulk-upload"));
b.push(T(["Properti", "Isi"], [
  ["Ref. Requirement", "TED-21742-R02"],
  ["Method & Path", "POST /api/v1/whitelist/bulk-upload"],
  ["Jenis", "REST — multipart/form-data"],
  ["Consumer / Provider", "MAAS Web  →  MAAS App Service (SMC03F302R)"],
  ["Autentikasi / Otorisasi", "OAuth2 Bearer Token; role MAAS_WL_MAKER, MAAS_WL_ADMIN"],
  ["Idempotent?", "Tidak. Wajib mengirim header X-Idempotency-Key (UUID); pengiriman ulang dengan key sama dalam 24 jam mengembalikan hasil pertama, tidak membuat pengajuan baru"],
  ["Timeout", "60 detik"],
  ["Retry policy", "Tidak ada retry otomatis. Retry manual wajib memakai X-Idempotency-Key yang sama"],
  ["Rate limit / TPS", "5 request/menit per user"],
  ["Sifat", "Sinkron, diproses per batch 100 baris"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Request:", {bold: true, size: 18}));
b.push(T(["Field", "Tipe", "Wajib?", "Validasi", "Keterangan"], [
  ["file", "multipart file", "Y", ".xlsx, maks 2 MB, maks 500 baris data", "Template sesuai C.4"],
  ["X-Idempotency-Key", "header string", "Y", "UUID v4", "Mencegah pengajuan ganda saat user menekan tombol dua kali"],
  ["X-Correlation-Id", "header string", "Y", "UUID v4", "Untuk penelusuran lintas komponen"],
], [2.2, 1.6, 0.9, 2.7, 2.6], {size: 15}));
b.push(SP(80));
b.push(P("Response Sukses (HTTP 200) — ringkasan hasil, bukan sekadar status:", {bold: true, size: 18}));
b.push(T(["Field", "Tipe", "Keterangan"], [
  ["data.totalRow", "int", "Jumlah baris terbaca dari file"],
  ["data.validRow", "int", "Jumlah baris lolos validasi dan masuk staging"],
  ["data.invalidRow", "int", "Jumlah baris ditolak"],
  ["data.submissionId", "string", "ID pengajuan untuk proses approval oleh Checker"],
  ["data.rejected[].rowNo", "int", "Nomor baris pada file"],
  ["data.rejected[].mid", "string", "MID yang ditolak"],
  ["data.rejected[].reason", "string", "Alasan penolakan, contoh \"Status MID TERMINATED\""],
], [2.6, 1.2, 6.2], {size: 15}));
b.push(SP(80));
b.push(P("Response Error:", {bold: true, size: 18}));
b.push(T(["HTTP Code", "Error Code", "Kondisi Pemicu", "Pesan ke User", "Aksi Application Support"], [
  ["400", "WL-4003", "File bukan .xlsx atau melebihi 2 MB", "\"Format file tidak sesuai. Gunakan template yang tersedia pada tombol Download Template.\"", "Tidak perlu tindakan; kesalahan input user"],
  ["400", "WL-4004", "Kolom pada file tidak sesuai template", "\"Kolom pada file tidak sesuai template.\"", "Arahkan user mengunduh ulang template; jika template resmi tetap ditolak, eskalasi L2"],
  ["400", "WL-4005", "Jumlah baris melebihi 500", "\"Jumlah data melebihi batas 500 baris per file.\"", "Arahkan user memecah file"],
  ["422", "WL-4220", "Seluruh baris ditolak (mis. seluruh MID TERMINATED)", "\"Tidak ada data yang dapat disimpan.\"", "Tidak perlu tindakan; verifikasi status MID bersama tim merchant"],
  ["409", "WL-4090", "X-Idempotency-Key sudah pernah dipakai", "\"Pengajuan ini sudah pernah diproses.\"", "Tidak perlu tindakan; tampilkan hasil pengajuan sebelumnya"],
  ["500", "WL-5000", "Kegagalan tidak terduga", "\"Terjadi kesalahan sistem.\"", "Ambil correlationId, telusuri log sesuai D.3, eskalasi L2"],
], [1, 1.2, 2.3, 2.7, 2.8], {size: 14}));
b.push(BREAK());

/* ---------- C.4 ---------- */
b.push(H2("C.4  File Interface / Batch Layout"));
b.push(P("Tidak ada interface file antar sistem maupun batch terjadwal pada pengembangan ini. Dua file di bawah adalah file yang dipertukarkan langsung dengan user melalui layar.", {italics: true, size: 17, color: "595959", after: 120}));

b.push(H3("File 1 — Template Bulk Upload (inbound, diunggah user)"));
b.push(T(["Properti", "Isi"], [
  ["Ref. Requirement", "TED-21742-R02, R05"],
  ["Arah", "Inbound — diunggah user melalui screen"],
  ["Lawan transaksi", "User operasional MAAS (role MAKER)"],
  ["Path", "Tidak disimpan permanen; diproses di memori lalu dibuang"],
  ["File name pattern", "TEMPLATE_WHITELIST_LM.xlsx (nama file bebas saat diunggah)"],
  ["File type", "Excel .xlsx (Office Open XML)"],
  ["Delimiter char", "Tidak berlaku — format Excel"],
  ["Encoding", "UTF-8"],
  ["Frekuensi / Jadwal", "Ad-hoc sesuai kebutuhan user"],
  ["Cara transfer", "Upload manual dari UI"],
  ["Encryption / PGP", "Tidak — transfer melalui HTTPS/TLS 1.2"],
  ["Ukuran & jumlah baris maksimum", "2 MB; maksimal 500 baris data (di luar baris header)"],
  ["Retention file", "File tidak disimpan. Ringkasan hasil unggah disimpan di tabel staging selama 90 hari"],
  ["Penanganan file gagal / reject", "File yang ditolak tidak disimpan. Daftar baris yang ditolak ditampilkan di layar dan dapat diunduh sebagai file hasil (REJECT_<submissionId>.xlsx). Tidak ada notifikasi otomatis — user menangani langsung di layar"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Layout Field:", {bold: true, size: 18}));
b.push(T(["Section", "Kolom", "Name", "Data Type", "Data Length", "Mandatory", "Description"], [
  ["Header", "A1–C1", "Baris judul kolom", "String", "—", "Y", "Harus persis: MID | ENV_BACKEND | ENV_AUTH"],
  ["Body", "A", "MID", "String (text)", "15", "Y", "Numerik 15 digit; sel wajib berformat Text agar angka depan tidak hilang"],
  ["Body", "B", "ENV_BACKEND", "String", "20", "Y", "Harus salah satu value pada common code AUT1223 (BETA / PRODUCTION)"],
  ["Body", "C", "ENV_AUTH", "String", "20", "Y", "Harus salah satu value pada common code AUT1223 (BETA / PRODUCTION)"],
  ["Trailer", "—", "Tidak ada", "—", "—", "—", "Jumlah baris dihitung dari baris terisi terakhir"],
], [1, 0.9, 1.5, 1.2, 1.1, 1, 3.3], {size: 14}));
b.push(SP(80));
b.push(P("Contoh isi file:", {bold: true, size: 18}));
b.push(fill("MID              | ENV_BACKEND | ENV_AUTH\n710012345678901  | BETA        | BETA\n710012345678903  | PRODUCTION  | PRODUCTION\n710012345678904  | BETA        | PRODUCTION", 1));

b.push(H3("File 2 — Export Data Whitelist (outbound, diunduh user)"));
b.push(T(["Properti", "Isi"], [
  ["Ref. Requirement", "TED-21742-R05"],
  ["Arah", "Outbound — diunduh user"],
  ["File name pattern", "WHITELIST_LM_yyyyMMdd_HHmmss.xlsx"],
  ["File type", "Excel .xlsx"],
  ["Isi", "Seluruh kolom pada tabel layar mengikuti filter aktif: MID, Nama Merchant, Status MID, ENV Backend, ENV Auth, Routing Endpoint, Tanggal Register, Status Data, Dibuat Oleh, Disetujui Oleh"],
  ["Batas maksimum", "50.000 baris per file. Melebihi batas, user diminta mempersempit filter"],
  ["Sanitasi", "Nilai sel yang diawali = + - @ diberi prefix apostrof untuk mencegah CSV/formula injection (lihat C.6)"],
  ["Retention file", "Tidak disimpan di server; langsung dikirim ke browser"],
], [3, 7], {size: 17}));
b.push(BREAK());

/* ---------- C.5 ---------- */
b.push(H2("C.5  Database Design"));
b.push(P("Ringkasan perubahan:", {bold: true, size: 18}));
b.push(T(["Object", "Tipe", "Aksi", "Ref. Requirement"], [
  ["TBMCLVNRTLIST", "Table", "Create — data whitelist aktif", "R01, R02, R08"],
  ["TBTLVNRTLIST_STG", "Table", "Create — staging pengajuan add/change/delete", "R02, R03"],
  ["TBHLVNRTLIST_HIST", "Table", "Create — riwayat perubahan (audit trail)", "R07"],
  ["AUT1223", "Common Code", "Create — daftar value dropdown environment", "R06"],
  ["IX_LVNRT_MID", "Index", "Create", "R01, R08"],
  ["IX_LVNRT_REGDATE", "Index", "Create", "R01"],
], [2.6, 1.8, 3.4, 2.2], {size: 16}));
b.push(SP(100));
b.push(P("Kamus kolom — TBMCLVNRTLIST:", {bold: true, size: 18}));
b.push(T(["Kolom", "Tipe", "Length", "Null?", "PK / FK", "Default", "Keterangan"], [
  ["ID", "bigserial", "—", "N", "PK", "auto", "Identitas baris"],
  ["MID", "varchar", "15", "N", "Unique", "—", "Merchant ID"],
  ["MERCHANT_NAME", "varchar", "100", "Y", "—", "null", "Hasil inquiry saat pendaftaran"],
  ["MID_STATUS", "varchar", "12", "Y", "—", "null", "Status MID saat terakhir di-inquiry"],
  ["ENV_BACKEND", "varchar", "20", "N", "—", "—", "Mengacu value AUT1223"],
  ["ENV_AUTH", "varchar", "20", "N", "—", "—", "Mengacu value AUT1223"],
  ["ROUTING_URL", "varchar", "255", "Y", "—", "null", "Endpoint callback turunan ENV"],
  ["DATA_STATUS", "varchar", "10", "N", "—", "'ACTIVE'", "ACTIVE / DELETED (soft delete)"],
  ["REG_DATE", "timestamp", "—", "N", "—", "now()", "Tanggal register"],
  ["CREATED_BY", "varchar", "50", "N", "—", "—", "User Maker pengaju"],
  ["APPROVED_BY", "varchar", "50", "Y", "—", "null", "User Checker penyetuju"],
  ["APPROVED_DATE", "timestamp", "—", "Y", "—", "null", "Waktu persetujuan"],
  ["UPDATED_BY", "varchar", "50", "Y", "—", "null", "User perubahan terakhir"],
  ["UPDATED_DATE", "timestamp", "—", "Y", "—", "null", "Waktu perubahan terakhir"],
], [1.9, 1.3, 0.9, 0.8, 1, 1.1, 3], {size: 14}));
b.push(SP(80));
b.push(P("Kamus kolom — TBHLVNRTLIST_HIST (audit trail):", {bold: true, size: 18}));
b.push(T(["Kolom", "Tipe", "Length", "Null?", "Keterangan"], [
  ["ID", "bigserial", "—", "N", "PK"],
  ["REF_ID", "bigint", "—", "N", "Mengacu TBMCLVNRTLIST.ID"],
  ["MID", "varchar", "15", "N", "Disimpan ulang agar riwayat tetap terbaca bila baris utama dihapus"],
  ["ACTION", "varchar", "12", "N", "ADD / EDIT / DELETE / APPROVE / REJECT"],
  ["OLD_VALUE", "jsonb", "—", "Y", "Nilai sebelum perubahan"],
  ["NEW_VALUE", "jsonb", "—", "Y", "Nilai sesudah perubahan"],
  ["ACTOR", "varchar", "50", "N", "User pelaku"],
  ["ACTOR_IP", "varchar", "45", "N", "IP address pelaku"],
  ["ACTION_DATE", "timestamp", "—", "N", "Waktu aksi"],
  ["CORRELATION_ID", "varchar", "36", "Y", "Penelusuran lintas komponen"],
], [1.9, 1.3, 0.9, 0.8, 5.1], {size: 14}));
b.push(SP(80));
b.push(P("Index:", {bold: true, size: 18}));
b.push(T(["Nama Index", "Tabel", "Kolom", "Tipe", "Justifikasi"], [
  ["IX_LVNRT_MID", "TBMCLVNRTLIST", "MID", "Unique", "Lookup routing callback per MID — jalur paling sering diakses; unique mencegah duplikasi whitelist"],
  ["IX_LVNRT_REGDATE", "TBMCLVNRTLIST", "REG_DATE DESC", "Non-unique", "Pengurutan default layar dan filter rentang tanggal"],
  ["IX_LVNRT_HIST_REF", "TBHLVNRTLIST_HIST", "REF_ID, ACTION_DATE DESC", "Non-unique", "Menampilkan change history satu baris data"],
], [2, 2.2, 2, 1.2, 2.6], {size: 15}));
b.push(SP(80));
b.push(P("Estimasi volume & retention:", {bold: true, size: 18}));
b.push(T(["Tabel", "Estimasi row awal", "Growth / bulan", "Estimasi size 12 bln", "Retention", "Purging / Archiving"], [
  ["TBMCLVNRTLIST", "±3.500 (dari AUT1222)", "±1.200 row", "±18.000 row, ±6 MB", "Permanen selama merchant aktif", "Tidak ada purging; baris DELETED dibersihkan setelah 12 bulan"],
  ["TBTLVNRTLIST_STG", "0", "±1.500 row", "±18.000 row, ±7 MB", "90 hari", "Job purging bulanan menghapus staging berstatus final > 90 hari"],
  ["TBHLVNRTLIST_HIST", "0", "±3.000 row", "±36.000 row, ±1,1 GB (kolom jsonb)", "24 bulan (mengikuti ketentuan audit)", "Archiving tahunan ke tabel arsip, lalu dihapus dari tabel aktif"],
], [1.9, 1.6, 1.3, 1.8, 1.6, 1.8], {size: 14}));
b.push(SP(80));
b.push(box("CATATAN DBA", [
  "Total tambahan storage 12 bulan: ±1,2 GB — dominan dari kolom jsonb pada tabel history. Sudah dikonfirmasi masuk kapasitas existing, tidak perlu penambahan resource.",
  "Job purging staging dan archiving history BELUM termasuk rilis ini; diusulkan pada CR terpisah sebelum bulan ke-12. Sampai job tersedia, dilakukan manual oleh DBA (lihat D.5 Known Limitation).",
], "warn"));
b.push(SP(80));
b.push(P("Script DDL (ringkas — versi lengkap pada lampiran CR #21742):", {bold: true, size: 18}));
b.push(fill("CREATE TABLE TBMCLVNRTLIST (\n  ID              bigserial     PRIMARY KEY,\n  MID             varchar(15)   NOT NULL,\n  MERCHANT_NAME   varchar(100),\n  MID_STATUS      varchar(12),\n  ENV_BACKEND     varchar(20)   NOT NULL,\n  ENV_AUTH        varchar(20)   NOT NULL,\n  ROUTING_URL     varchar(255),\n  DATA_STATUS     varchar(10)   NOT NULL DEFAULT 'ACTIVE',\n  REG_DATE        timestamp     NOT NULL DEFAULT now(),\n  CREATED_BY      varchar(50)   NOT NULL,\n  APPROVED_BY     varchar(50),\n  APPROVED_DATE   timestamp,\n  UPDATED_BY      varchar(50),\n  UPDATED_DATE    timestamp\n);\nCREATE UNIQUE INDEX IX_LVNRT_MID     ON TBMCLVNRTLIST (MID);\nCREATE INDEX        IX_LVNRT_REGDATE ON TBMCLVNRTLIST (REG_DATE DESC);", 1));
b.push(SP(80));
b.push(P("Script Rollback DB:", {bold: true, size: 18}));
b.push(fill("-- Rollback dijalankan HANYA jika keputusan rollback diambil pada malam implementasi\n-- dan belum ada data produksi yang masuk (dipastikan lewat SELECT count(*) sebelum drop).\n\nDROP INDEX IF EXISTS IX_LVNRT_HIST_REF;\nDROP INDEX IF EXISTS IX_LVNRT_REGDATE;\nDROP INDEX IF EXISTS IX_LVNRT_MID;\nDROP TABLE IF EXISTS TBHLVNRTLIST_HIST;\nDROP TABLE IF EXISTS TBTLVNRTLIST_STG;\nDROP TABLE IF EXISTS TBMCLVNRTLIST;\nDELETE FROM COMMON_CODE WHERE CODE_GROUP = 'AUT1223';\n\n-- Jika sudah ada data produksi masuk: JANGAN drop tabel.\n-- Cukup rollback artefak aplikasi; routing kembali membaca AUT1222 lewat fallback.\n-- Tabel dibiarkan ada dan dibersihkan pada window terjadwal berikutnya.", 1));
b.push(SP(80));
b.push(P("Data migration: tidak ada pada rilis ini. Migrasi data dari AUT1222 ditangani terpisah pada CR #22910 (lihat A.5 Out of Scope).", {bold: true, size: 17}));
b.push(BREAK());

/* ---------- C.6 ---------- */
b.push(H2("C.6  Security & Access Control"));
b.push(P("Access Control Matrix:", {bold: true, size: 18}));
b.push(T(["Role", "View", "Add", "Edit", "Delete", "Bulk Upload", "Export", "Approve"], [
  ["MAAS_WL_VIEWER", "☑", "☐", "☐", "☐", "☐", "☑", "☐"],
  ["MAAS_WL_MAKER", "☑", "☑", "☑", "☑ (ajukan)", "☑", "☑", "☐"],
  ["MAAS_WL_CHECKER", "☑", "☐", "☐", "☐", "☐", "☑", "☑"],
  ["MAAS_WL_ADMIN", "☑", "☑", "☑", "☑", "☑", "☑", "☑"],
], [2.6, 1, 1, 1, 1.4, 1.4, 1, 1.1], {size: 15}));
b.push(SP(60));
b.push(P("Otorisasi divalidasi di sisi server pada setiap endpoint (anotasi @PreAuthorize), bukan hanya penyembunyian tombol di UI. Role MAAS_WL_ADMIN dibatasi maksimal 2 user dan direview setiap kuartal.", {italics: true, size: 17, color: "595959"}));
b.push(SP(80));
b.push(P("Dual Control / Maker-Checker:", {bold: true, size: 18}));
b.push(T(["Aksi Berisiko", "Perlu Maker-Checker?", "Mekanisme", "Justifikasi"], [
  ["Delete data whitelist", "Ya", "Pengajuan masuk staging status PENDING; berlaku setelah disetujui Checker. Maker tidak boleh menyetujui pengajuannya sendiri.", "Penghapusan mengubah tujuan routing callback production; salah hapus menyebabkan transaksi merchant salah arah"],
  ["Bulk upload", "Ya", "Idem. Ditampilkan ringkasan jumlah baris terdampak sebelum Checker menyetujui.", "Satu file dapat mengubah hingga 500 merchant sekaligus"],
  ["Edit environment (satuan)", "Tidak", "Berlaku langsung setelah simpan; tercatat penuh di audit trail", "Dampak terbatas pada 1 merchant dan dapat segera dikembalikan; menambahkan approval di sini menghambat operasional harian tanpa manfaat setara"],
  ["Add data satuan", "Tidak", "Berlaku langsung; tercatat di audit trail", "Penambahan tidak mengubah routing merchant yang sudah berjalan"],
], [2, 1.6, 3, 3.4], {size: 14}));
b.push(SP(80));
b.push(P("Audit Trail:", {bold: true, size: 18}));
b.push(T(["Aspek", "Isi"], [
  ["Aksi yang dicatat", "ADD, EDIT, DELETE, APPROVE, REJECT, BULK_UPLOAD, EXPORT"],
  ["Data yang disimpan", "User pelaku, timestamp, IP address, nilai lama (OLD_VALUE) dan nilai baru (NEW_VALUE) dalam format JSON, ID record, correlation ID"],
  ["Tabel / lokasi penyimpanan", "TBHLVNRTLIST_HIST"],
  ["Retention audit log", "24 bulan pada tabel aktif, kemudian diarsipkan"],
  ["Bisa diakses siapa", "Seluruh role melalui fitur Change History di layar (read-only). Akses langsung ke tabel hanya untuk DBA dan IT Security"],
  ["Sifat", "Append-only. Tidak ada endpoint maupun fungsi aplikasi yang dapat mengubah atau menghapus baris history"],
], [3, 7], {size: 17}));
b.push(SP(80));
b.push(P("Klasifikasi Data:", {bold: true, size: 18}));
b.push(T(["Data", "Klasifikasi", "Masking?", "Boleh di log?", "Enkripsi"], [
  ["MID", "Internal", "Tidak", "Ya", "In transit: TLS 1.2. At rest: mengikuti enkripsi volume database"],
  ["Nama Merchant", "Internal", "Tidak", "Ya", "Idem"],
  ["ENV Backend / ENV Auth", "Internal", "Tidak", "Ya", "Idem"],
  ["Routing URL", "Confidential", "Tidak", "Tidak — hanya nama environment yang boleh di-log", "Idem"],
  ["User ID pelaku & IP address", "Internal", "Tidak", "Ya", "Idem"],
  ["OAuth2 token", "Restricted", "Ya", "Tidak — dilarang muncul di log dalam bentuk apa pun", "TLS 1.2"],
], [2.3, 1.5, 1.1, 2.5, 2.6], {size: 14}));
b.push(SP(60));
b.push(P("Pengembangan ini tidak menyentuh data kartu (PAN / CVV / track data) maupun data pribadi nasabah, sehingga tidak masuk lingkup kontrol PCI-DSS. Dikonfirmasi IT Security pada review 7 Agustus 2026.", {italics: true, size: 17, color: "595959"}));
b.push(SP(80));
b.push(P("Validasi Input & File:", {bold: true, size: 18}));
b.push(T(["Kontrol", "Diterapkan?", "Keterangan"], [
  ["Validasi tipe & ukuran file upload", "Ya", "Hanya .xlsx (dicek magic number, bukan hanya ekstensi), maksimal 2 MB"],
  ["Batas maksimum baris bulk upload", "Ya", "500 baris; melebihi batas file ditolak seluruhnya"],
  ["Proteksi SQL injection", "Ya", "Seluruh query memakai prepared statement melalui Spring Data JPA"],
  ["Proteksi XSS", "Ya", "Output encoding pada seluruh field yang berasal dari input user"],
  ["Sanitasi output export (CSV/formula injection)", "Ya", "Nilai sel yang diawali = + - @ diberi prefix apostrof"],
  ["Rate limiting", "Ya", "Per endpoint per user, lihat C.3"],
  ["File upload disimpan di luar webroot", "Tidak berlaku", "File tidak disimpan ke disk; diproses di memori lalu dibuang"],
], [3.6, 1.4, 5], {size: 15}));
b.push(BREAK());

/* ---------- C.7 ---------- */
b.push(H2("C.7  Impact Analysis"));
b.push(T(["Ref. Requirement", "Aspek", "Existing Flow", "Changes / To Be Flow", "Risiko", "Mitigasi"], [
  ["R01–R07", "Aplikasi", "Data whitelist dikelola lewat menu common code AUT1222", "Dikelola lewat screen Livin Routing List dengan maker-checker", "User terbiasa dengan menu lama", "Sosialisasi + menu lama dipertahankan 1 bulan"],
  ["R02, R03, R07", "Database", "Data disimpan sebagai key-value di common code", "3 tabel baru: TBMCLVNRTLIST, TBTLVNRTLIST_STG, TBHLVNRTLIST_HIST", "Tambahan storage 1,2 GB/tahun", "Sudah dikonfirmasi masuk kapasitas existing"],
  ["R08", "Integrasi / Interface", "Routing callback membaca AUT1222", "Routing membaca TBMCLVNRTLIST, fallback ke AUT1222, default Production", "Callback salah arah bila lookup gagal", "Fallback berlapis + monitoring hit fallback (D.3)"],
  ["—", "Batch / Scheduler", "Tidak ada", "Tidak ada job baru pada rilis ini", "Purging staging & archiving history belum otomatis", "Dilakukan manual DBA; job diusulkan pada CR terpisah (D.5)"],
  ["R06", "Konfigurasi / Parameter", "Nilai environment ditulis bebas di AUT1222", "Common code AUT1223 sebagai referensi dropdown", "Salah setting nilai AUT1223 menyebabkan dropdown kosong", "Verifikasi pada PIV (E.4) dan runbook D.4 baris 4"],
  ["—", "Report / Rekonsiliasi", "Tidak ada laporan yang membaca AUT1222 untuk whitelist", "Tidak ada perubahan", "Tidak ada", "—"],
  ["—", "Downtime", "—", "Tidak ada downtime. Deploy rolling per pod; DDL bersifat CREATE (tidak mengunci tabel existing)", "Sesi user aktif terputus saat pod restart", "Implementasi di luar jam kerja, Sabtu 22:00 WIB"],
], [1.3, 1.5, 1.9, 2.2, 1.5, 1.6], {size: 13}));
b.push(SP(120));
b.push(P("Sign-off Reviewer Lintas Unit:", {bold: true, size: 18}));
b.push(T(["Group / Department", "Impacted?", "Reviewer Notes", "Nama", "Tanggal"], [
  {__section: "IT INFRA & OPERATIONS"},
  ["Application Infrastructure & Datawarehouse", "☑ Impacted", "Tambahan storage 1,2 GB/tahun disetujui, masuk kapasitas existing. Job purging wajib diajukan sebelum bulan ke-12.", "Stevie Dwiputra", "14 Agu 2026"],
  ["System & Network", "☐ Impacted\n☑ Not Impacted", "Tidak ada perubahan topologi maupun firewall rule.", "Hasyim Kurnia", "14 Agu 2026"],
  ["IT Monitoring & DC Operations", "☑ Impacted", "Alert baru pada hit fallback routing dan kegagalan bulk upload sudah didaftarkan di AppDynamics.", "Ferry Sulistiyanto", "18 Agu 2026"],
  ["Application Support", "☑ Impacted", "Bagian D sudah diverifikasi. Akses log dan dashboard sudah diuji 19 Agu 2026. Knowledge transfer terjadwal 18 Sep 2026.", "Tangkas Prio Semobodo", "19 Agu 2026"],
  {__section: "IT INFORMATION SECURITY"},
  ["Security Services", "☑ Impacted", "Maker-checker untuk Delete dan Bulk Upload wajib. Audit trail append-only disetujui. Tidak masuk lingkup PCI-DSS.", "I Gusti Agung A. S", "07 Agu 2026"],
  {__section: "IT ENGINEERING"},
  ["Front End", "☑ Impacted", "Screen baru; seluruh state termasuk empty dan no-access sudah diimplementasi sesuai C.2.", "Inti", "12 Agu 2026"],
  ["Middleware", "☐ Impacted\n☑ Not Impacted", "Tidak ada perubahan pada layer ESB.", "Christopherus Ray'onaldo", "12 Agu 2026"],
  ["Backend", "☑ Impacted", "7 program terdampak, lihat C.8. Fallback berlapis pada SAU06F004U sudah diuji.", "Andrew Tasijawa", "12 Agu 2026"],
  ["Improvement & IT Architecture", "☑ Impacted", "Pemindahan data dari common code ke tabel relasional sejalan dengan arahan arsitektur.", "Ade Iskandar", "13 Agu 2026"],
  {__section: "COMPLIANCE REVIEW"},
  ["IT Governance, Risk & Compliance", "☑ Impacted", "Audit trail 24 bulan memenuhi ketentuan. Dual control pada aksi berisiko sesuai kebijakan.", "Dian Ramadan", "15 Agu 2026"],
], [2.6, 1.5, 3.4, 1.5, 1], {size: 14, zebra: false}));
b.push(BREAK());

/* ---------- C.8 ---------- */
b.push(H2("C.8  Code Dependency"));
b.push(T(["Program / Module", "Jenis Program", "Changes Type", "Ref. Req.", "Related Project", "Repository & Branch", "Rollback Impact", "Prod", "Test", "Dev"], [
  ["SAU06F004U", "Online Service", "Enhancement", "R08", "#22781", "mti-routing / release/2026.09", "Wajib rollback bersama SMC03F300R–SMC03F303U. Jika hanya program ini yang di-rollback, routing kembali membaca AUT1222 sementara screen tetap menulis ke tabel baru — data whitelist baru tidak akan terpakai.", "47", "50", "52"],
  ["SMC03F300R", "Online Service", "New", "R01, R05, R07", "#21742", "maas-app / release/2026.09", "Aman di-rollback sendiri. Screen tidak dapat menampilkan data; fungsi lain tidak terdampak.", "—", "—", "1"],
  ["SMC03F301R", "Online Service", "New", "R04", "#21742", "maas-app / release/2026.09", "Aman di-rollback sendiri. Fungsi inquiry tidak tersedia; user tidak dapat menambah data baru.", "—", "—", "1"],
  ["SMC03F302R", "Online Service", "New", "R02", "#21742", "maas-app / release/2026.09", "Wajib rollback bersama SMC03F303U karena berbagi struktur tabel staging.", "—", "—", "1"],
  ["SMC03F303U", "Online Service", "New", "R02, R03", "#21742", "maas-app / release/2026.09", "Wajib rollback bersama SMC03F302R. Tanpa program ini, pengajuan tidak dapat disetujui dan data menggantung di staging.", "—", "—", "1"],
  ["SMC04V001U", "Online Service", "Enhancement", "R06", "#21742", "maas-app / release/2026.09", "Aman di-rollback sendiri. Dropdown environment kembali membaca nilai lama.", "16", "16", "17"],
  ["SMC15V002U", "Online Service", "Enhancement", "R01", "#21742", "maas-web / release/2026.09", "Wajib rollback bersama seluruh SMC03F30x. Screen memanggil endpoint yang tidak lagi tersedia jika hanya backend yang di-rollback.", "24", "24", "26"],
], [1.2, 1.1, 1.1, 1, 0.9, 1.4, 2.6, 0.45, 0.45, 0.45], {size: 12}));

/* ---------- C.9 ---------- */
b.push(H2("C.9  Security Code Review"));
b.push(P("Diisi dan diverifikasi IT Information Security — I Gusti Agung A. S, 07 Agustus 2026 (review ulang 19 Agustus 2026).", {italics: true, size: 17, color: "595959", after: 100}));
b.push(T(["No", "Area Review", "Checking Item", "Status", "Catatan"], [
  ["1", "Authentication", "Endpoint tidak dapat diakses tanpa token / sesi valid", "Pass", ""],
  ["2", "Authorization", "Otorisasi divalidasi di sisi server per role, bukan hanya di UI", "Pass", "@PreAuthorize pada seluruh endpoint"],
  ["3", "Input Validation", "Seluruh input divalidasi di server (tipe, panjang, format)", "Pass", ""],
  ["4", "Input Validation", "Proteksi SQL injection (prepared statement) & XSS", "Pass", "Spring Data JPA + output encoding"],
  ["5", "Secure Coding", "Tidak ada credential / secret hardcoded di source & config", "Pass", "Seluruh secret dari OpenShift Secret"],
  ["6", "Encryption", "Data sensitif terenkripsi at-rest & in-transit (TLS)", "Pass", "TLS 1.2; tidak ada data kartu"],
  ["7", "API Security", "Rate limiting, timeout, dan pembatasan payload diterapkan", "Pass", "Lihat C.3"],
  ["8", "Dependency Security", "Library bebas CVE kritikal (hasil scan dilampirkan)", "Pass", "Scan 19 Agu 2026: 0 critical, 2 medium (accepted, tidak pada jalur eksekusi)"],
  ["9", "Error Handling", "Pesan error tidak membocorkan stack trace / detail internal", "Pass", "Temuan awal 07 Agu (stack trace pada 500) sudah diperbaiki"],
  ["10", "Session Security", "Timeout sesi, invalidasi saat logout, proteksi CSRF", "Pass", "Timeout 15 menit idle"],
  ["11", "File Handling", "Validasi tipe & ukuran file, penyimpanan di luar webroot", "Pass", "Dicek magic number; file tidak disimpan ke disk"],
  ["12", "Access Control", "Tidak ada IDOR / akses langsung ke object milik user lain", "Pass", ""],
  ["13", "Logging & Audit", "Aksi sensitif tercatat; data sensitif tidak ikut ter-log", "Pass", "Routing URL dan token dipastikan tidak masuk log"],
], [0.5, 1.7, 3.9, 0.9, 3], {size: 14}));
b.push(BREAK());

module.exports = b;
