const {D, NAVY, P, H1, H2, H3, box, fill, T, SP, BREAK} = require('./lib.js');
const {AlignmentType} = D;
const b = [];

/* ---------------- COVER ---------------- */
b.push(SP(2000));
b.push(P("TECHNICAL ENGINEERING DOCUMENT", {bold: true, size: 40, color: NAVY, align: AlignmentType.CENTER, after: 120}));
b.push(P("(TED)", {bold: true, size: 28, color: NAVY, align: AlignmentType.CENTER, after: 360}));
b.push(P("Pengembangan Screen Baru di MAAS untuk", {bold: true, size: 26, color: "2E5496", align: AlignmentType.CENTER, after: 40}));
b.push(P("Whitelist Merchant Environment Beta dan Production", {bold: true, size: 26, color: "2E5496", align: AlignmentType.CENTER, after: 600}));
b.push(T(null, [
  ["Nomor TED", "TED-#21742"],
  ["Version", "V1.0"],
  ["Document Classification", "Internal"],
  ["Document Status", "In Review"],
  ["Tanggal", "21 Agustus 2026"],
  ["Target Implementasi Production", "Sabtu, 26 September 2026"],
], [1, 2], {size: 20, zebra: false}));
b.push(SP(1400));
b.push(P("PT. Mitra Transaksi Indonesia", {bold: true, size: 20, color: "595959", align: AlignmentType.CENTER}));
b.push(BREAK());

/* ---------------- CATATAN CONTOH ---------------- */
b.push(H1("CATATAN — DOKUMEN INI ADALAH CONTOH"));
b.push(box("BACA DULU", [
  "Dokumen ini adalah CONTOH pengisian TED menggunakan template versi terbaru, memakai kasus nyata dari TED #21742 (Screen Whitelist MAAS).",
  "Tujuannya sebagai golden sample — acuan tingkat kedalaman yang diharapkan saat tim developer mengisi TED.",
  "Bagian yang datanya memang ada di TED asli: Background, Problem & Objective, High-Level Scope, Tech Stack, Code Dependency, daftar reviewer, dan skenario testing.",
  "Bagian yang di TED asli belum ada dan DI SINI DIISI SEBAGAI ILUSTRASI: detail API, struktur tabel, kontrol keamanan, runbook operasional, deployment & rollback, dan risk register. Angka, nama endpoint, nama kolom, threshold, dan kontak pada bagian tersebut adalah contoh — WAJIB diganti dengan data sebenarnya sebelum dipakai.",
], "danger"));
b.push(SP(160));
b.push(P("Asumsi yang dipakai dalam contoh ini:", {bold: true, size: 19}));
b.push(T(["No", "Asumsi", "Dampak jika asumsi salah"], [
  ["1", "Screen whitelist dibangun di atas stack MAAS existing (Java Spring Boot + PostgreSQL 15 + OpenShift) sesuai Tech Stack di TED asli.", "Bagian B.3 dan E.2 perlu disesuaikan"],
  ["2", "Common code baru untuk dropdown environment diberi kode AUT1223, mengikuti pola penamaan AUT1222 yang sudah ada.", "Ganti kode di C.5, D.1, dan E.2"],
  ["3", "Nama tabel utama TBMCLVNRTLIST diambil dari TED asli; nama tabel temp dan history adalah usulan.", "Ganti nama tabel di C.5 dan D.4"],
  ["4", "Role aplikasi MAAS mengikuti pola MAAS_WL_VIEWER / MAKER / CHECKER / ADMIN.", "Sesuaikan matriks akses di C.2 dan C.6"],
  ["5", "Maker-checker diterapkan untuk Delete dan Bulk Upload karena menyentuh routing callback production.", "Jika kebijakan berbeda, ubah C.6 dan alur di C.1"],
  ["6", "Monitoring memakai AppDynamics + ELK sesuai Tech Stack di TED asli.", "Sesuaikan D.3"],
], [0.5, 5.5, 4], {size: 16}));
b.push(BREAK());

/* ---------------- 0. IDENTITAS ---------------- */
b.push(H1("0.  IDENTITAS DOKUMEN"));
b.push(T(["Field", "Isi"], [
  ["Document Type", "TED — Pengembangan Screen Baru di MAAS untuk Whitelist Merchant Environment Beta dan Production"],
  ["Nomor TED", "TED-#21742"],
  ["Judul", "Pengembangan Screen Baru di MAAS untuk Whitelist Merchant Environment Beta dan Production"],
  ["Aplikasi / Sistem", "MAAS (Merchant Acquiring Administration System)"],
  ["Document Classification", "Internal"],
  ["Document Status", "In Review"],
  ["Date", "21 Agustus 2026"],
  ["Owner Group", "Product Management Group"],
  ["Prepared by (Developer)", "Faiz Ihza M, Sandi G., M Taufik Hidayat — Livin Merchant 4\nArie Valiant Rindengan — Livin Merchant 2"],
  ["Tech Lead", "Andrew Tasijawa — IT Engineering (Backend)"],
  ["Version Document", "V1.0"],
  ["Target Implementasi Production", "Sabtu, 26 September 2026, pukul 22:00 – 01:00 WIB"],
], [3, 7], {size: 17}));

b.push(H2("0.1  Referensi Dokumen"));
b.push(T(["Jenis Dokumen", "Nomor / Link", "Keterangan"], [
  ["Change Request / Ticket", "#21742", "CR utama pengembangan screen whitelist"],
  ["Change Request terkait", "#22781", "Enhancement SAU06F004U (routing callback)"],
  ["BRD / PRD", "PRD-LM-2026-014", "Klasifikasi merchant Livin Merchant Beta vs Production"],
  ["Requirement (Screen)", "REQ-114-whitelist-screen", "Template 2 — Screen / UI"],
  ["Requirement (API)", "REQ-114-whitelist-api", "Template 4 — API"],
  ["Desain UI (Figma)", "figma.com/design/2UC4umHnzf9mAgGZGNTwvD/MAAS---Whitelist-Screen", "Node 0-1, sudah final per 12 Agustus 2026"],
  ["TSD sebelumnya yang digantikan", "TSD-AUT1222-v3", "Mekanisme whitelist lama via common code"],
  ["SIT Report", "QA/SIT/2026/0912-MAAS-WL", "Sign-off 12 September 2026"],
  ["UAT Report", "QA/UAT/2026/0924-MAAS-WL", "Sign-off 24 September 2026"],
  ["CAB / Change Ticket", "CHG-2026-09-0417", "Jadwal implementasi 26 September 2026"],
], [3, 3.6, 3.4], {size: 16}));

b.push(H2("0.2  Version History"));
b.push(T(["Version", "Tanggal", "Update by", "Change Description", "IT Architecture", "IT Security", "Dual Control (Dev)", "Status"], [
  ["V1.0", "26 Jun 2026", "Rifaldi Maulana", "Inisiasi pengembangan screen baru whitelist beta dan production", "☑", "☑", "☑", "Draft"],
  ["V1.1", "07 Agu 2026", "Faiz Ihza M", "Penambahan detail API, struktur tabel, dan kontrol maker-checker hasil review IT Security", "☑", "☑", "☑", "In Review"],
  ["V1.2", "21 Agu 2026", "Faiz Ihza M", "Penambahan Bagian D (Operational Handover) dan E (Deployment & Rollback) hasil review Application Support", "☑", "☑", "☑", "In Review"],
], [0.9, 1.1, 1.4, 2.9, 1.2, 1.1, 1.4, 1], {size: 14}));

b.push(H2("0.3  Daftar Istilah / Singkatan"));
b.push(T(["Singkatan", "Kepanjangan / Arti"], [
  ["MAAS", "Merchant Acquiring Administration System — aplikasi administrasi merchant di MTI"],
  ["LM", "Livin Merchant — aplikasi merchant milik Bank Mandiri"],
  ["MID", "Merchant ID — identitas unik merchant"],
  ["MTI", "PT. Mitra Transaksi Indonesia"],
  ["Whitelist", "Daftar MID yang diizinkan diarahkan ke environment routing tertentu"],
  ["ENV Backend", "Environment tujuan routing callback ke sistem backend (Beta / Production)"],
  ["ENV Auth", "Environment tujuan routing proses autentikasi (Beta / Production)"],
  ["AUT1222", "Common code existing tempat data whitelist disimpan sebelum pengembangan ini"],
  ["AUT1223", "Common code baru berisi daftar value dropdown environment (asumsi penamaan)"],
  ["TBMCLVNRTLIST", "Tabel baru penyimpan data MID whitelist beserta routing environment"],
  ["Maker-Checker", "Kontrol dual control: satu user mengajukan, user lain menyetujui"],
  ["PIV", "Post Implementation Verification — verifikasi setelah implementasi production"],
], [2.2, 7.8], {size: 16}));
b.push(BREAK());

/* ---------------- A ---------------- */
b.push(H1("A.  EXECUTIVE SUMMARY"));

b.push(H2("A.1  Background"));
b.push(P("Merchant yang terdaftar pada aplikasi Livin Merchant memiliki dua kategori environment, yaitu environment Beta dan environment Production. Saat ini mekanisme registrasi merchant untuk kedua environment tersebut dilakukan melalui menu common code AUT1222 di MAAS.", {size: 18, after: 100}));
b.push(P("Registrasi dilakukan satu per satu secara manual. Berdasarkan data operasional Juni 2026, rata-rata terdapat 40 MID baru per hari dengan waktu pengerjaan ±3 menit per MID, sehingga menghabiskan ±2 jam kerja per hari. Untuk kondisi data yang perlu di-unwhitelist (penghapusan data), tim operasional tidak dapat melakukannya sendiri dan harus mengajukan patching ke tim development, dengan waktu penyelesaian rata-rata 2 hari kerja.", {size: 18, after: 100}));
b.push(P("Seiring pertumbuhan merchant Livin Merchant, mekanisme ini menjadi penghambat. Diperlukan mekanisme baru yang mendukung pengklasifikasian merchant ke dalam kategori Beta atau Production secara mandiri oleh tim operasional.", {size: 18}));

b.push(H2("A.2  Problem Statement & Objective"));
b.push(P("Problem Statement:", {bold: true, size: 18, before: 100}));
b.push(T(["No", "Problem Statement", "Data Pendukung"], [
  ["1", "Proses maintenance data whitelist pada common code AUT1222 lambat karena harus dilakukan satu per satu", "±3 menit per MID; rata-rata 40 MID/hari = ±2 jam kerja/hari"],
  ["2", "Penghapusan data whitelist (unwhitelist) tidak dapat dilakukan tim operasional dan harus melalui patching oleh tim development", "Rata-rata 2 hari kerja per permintaan; 11 permintaan pada Juni 2026"],
  ["3", "Risiko human error tinggi karena data di-handle satu per satu tanpa validasi status merchant", "3 insiden salah input MID pada Q2 2026"],
  ["4", "Tim operasional tidak dapat mengetahui apakah suatu MID termasuk merchant Livin Merchant atau bukan sebelum melakukan registrasi", "Pengecekan manual ke tim lain, rata-rata 1 hari"],
], [0.5, 5.5, 4], {size: 16}));
b.push(SP(100));
b.push(P("Objective:", {bold: true, size: 18}));
b.push(T(["No", "Objective", "Ukuran Keberhasilan"], [
  ["1", "User dapat menambahkan dan mengurangi whitelist MID Livin Merchant secara mandiri melalui screen, tanpa patching", "0 permintaan patching untuk unwhitelist setelah go-live"],
  ["2", "Mempermudah operasional dalam pencarian data yang dapat di-whitelist, serta melihat apakah MID termasuk merchant Livin Merchant atau bukan", "Pengecekan status MID selesai dalam 1 layar, tanpa koordinasi antar tim"],
  ["3", "Pendaftaran MID dapat dilakukan secara massal melalui bulk upload", "Mampu memproses 500 MID dalam satu file upload"],
  ["4", "Menurunkan waktu kerja registrasi whitelist harian", "Dari ±2 jam/hari menjadi < 20 menit/hari"],
], [0.5, 5.5, 4], {size: 16}));

b.push(H2("A.3  Solution Summary"));
b.push(P("Dibangun satu screen baru di MAAS bernama \"Livin Routing List\" yang menampilkan seluruh MID Livin Merchant yang di-whitelist beserta environment routing-nya (Backend dan Auth). Screen menyediakan fungsi search, inquiry status merchant, penambahan data secara satuan maupun bulk upload Excel, edit environment, delete, export Excel, dan change history. Data whitelist dipindahkan dari common code AUT1222 ke tabel baru TBMCLVNRTLIST, dan proses routing callback dari MTI ke Mandiri selanjutnya membaca tabel tersebut. Karena perubahan ini menyentuh routing callback production, aksi Delete dan Bulk Upload diberi kontrol maker-checker. Dampak utama: tim operasional dapat mengelola whitelist secara mandiri tanpa patching, dengan jejak audit yang lengkap.", {size: 18}));

b.push(H2("A.4  High-Level Scope"));
b.push(T(["ID", "Requirement / EPIC", "Deskripsi", "Existing Condition", "Proposed (To Be)", "Impact Area", "Status"], [
  ["TED-21742-R01", "Screen baru Livin Routing List", "Screen berisi informasi MID yang didaftarkan dan routing endpoint tiap merchant, dilengkapi fungsi search sesuai kebutuhan user", "Tidak ada screen; data dikelola via common code AUT1222", "Screen baru di menu MAAS > Merchant > Livin Routing List", "App", "Done"],
  ["TED-21742-R02", "Penambahan data whitelist satuan & bulk", "Fungsi tambah data merchant secara satuan maupun bulk upload Excel, termasuk download template bulk", "Input manual satu per satu di common code", "Form input + upload Excel maksimum 500 baris", "App, DB, Security", "Done"],
  ["TED-21742-R03", "Edit & delete data whitelist", "Fungsi ubah environment dan hapus data merchant yang di-whitelist", "Penghapusan harus melalui patching tim development", "Edit & delete mandiri dengan kontrol maker-checker", "App, DB, Security", "Done"],
  ["TED-21742-R04", "Inquiry status merchant", "Fungsi inquiry status MID hasil pencarian, menampilkan nama merchant dan status aktif/terminated", "Pengecekan manual ke tim lain", "Inquiry realtime ke service merchant existing", "App", "Done"],
  ["TED-21742-R05", "Export data & download template", "Export data whitelist ke Excel dan download template bulk upload", "Tidak ada", "Export .xlsx dan template .xlsx", "App", "Done"],
  ["TED-21742-R06", "Dropdown environment Auth/Backend", "Common code baru untuk menentukan value dropdown pilihan environment", "Nilai environment ditulis bebas di common code AUT1222", "Common code AUT1223 sebagai referensi dropdown", "App, DB", "Done"],
  ["TED-21742-R07", "Change history per data", "Fungsi change history untuk masing-masing data yang dipilih", "Tidak ada jejak perubahan", "Tabel history + tampilan change history di screen", "App, DB, Security", "Done"],
  ["TED-21742-R08", "Proses routing callback dari tabel baru", "Proses routing callback dari MTI ke Mandiri ditentukan dari data pada tabel baru, bukan common code", "Routing membaca common code AUT1222", "Routing membaca tabel TBMCLVNRTLIST", "App, DB, External Party", "Done"],
], [1.3, 1.5, 2.3, 1.5, 1.6, 1, 0.8], {size: 14}));

b.push(H2("A.5  Out of Scope"));
b.push(T(["No", "Yang tidak dikerjakan", "Keterangan"], [
  ["1", "Migrasi data whitelist existing dari common code AUT1222 ke tabel TBMCLVNRTLIST", "Ditangani terpisah pada CR #22910; sampai migrasi selesai, routing membaca kedua sumber (lihat C.7)"],
  ["2", "Penghapusan menu common code AUT1222", "Menu dipertahankan sebagai fallback selama periode paralel 1 bulan"],
  ["3", "Perubahan pada aplikasi Livin Merchant (sisi Bank Mandiri)", "Tidak ada perubahan kontrak; hanya nilai routing yang berubah sumbernya"],
  ["4", "Notifikasi otomatis ke merchant saat environment berubah", "Diusulkan sebagai enhancement pada backlog Q4 2026"],
  ["5", "Approval berjenjang lebih dari dua level pada maker-checker", "Hanya satu level checker pada rilis ini"],
], [0.5, 4.5, 5], {size: 16}));

b.push(H2("A.6  External / Third-Party Dependency"));
b.push(T(["Pihak", "Bentuk Dependency", "Perlu Koordinasi?", "Perlu Notifikasi?", "PIC", "Status"], [
  ["Bank Mandiri — tim Livin Merchant", "Penerima callback routing dari MTI. Sumber data routing berubah dari common code ke tabel baru, kontrak callback tidak berubah.", "Ya", "Ya — H-7 sebelum implementasi", "Arie Valiant Rindengan", "Sudah dikonfirmasi 14 Agu 2026"],
  ["Bank Mandiri — tim QA Livin Merchant", "Pendampingan pengujian callback di environment Beta dan Production", "Ya", "Tidak", "Arie Valiant Rindengan", "Terjadwal 12 Sep 2026"],
], [1.8, 3.2, 1.2, 1.6, 1.3, 0.9], {size: 15}));
b.push(SP(80));
b.push(P("Tidak ada dependency ke switching (Jalin / Rintis / Artajasa) maupun principal, karena pengembangan ini tidak menyentuh jalur transaksi maupun proses settlement.", {italics: true, size: 17, color: "595959"}));
b.push(BREAK());

/* ---------------- B ---------------- */
b.push(H1("B.  TECHNICAL SOLUTION"));

b.push(H2("B.1  Technology Vision"));
b.push(T(["Aspect", "Description"], [
  ["Stability", "Service berjalan pada 2 pod OpenShift di belakang service load balancer; kegagalan 1 pod tidak menghentikan layanan. Routing callback tetap dapat membaca common code AUT1222 sebagai fallback selama periode paralel 1 bulan."],
  ["Scalability", "Data whitelist dipindahkan dari common code (bertipe key-value dan tidak ter-index) ke tabel relasional ber-index pada kolom MID, sehingga pencarian tetap cepat saat data tumbuh. Bulk upload dibatasi 500 baris per file dan diproses per batch 100 baris agar tidak memblokir service."],
  ["Security", "Otorisasi per role di sisi server (MAAS_WL_VIEWER / MAKER / CHECKER / ADMIN), kontrol maker-checker untuk Delete dan Bulk Upload, audit trail nilai lama dan nilai baru pada setiap perubahan, serta validasi tipe dan ukuran file upload."],
  ["Good User Experience", "Seluruh proses (cek status MID, daftar, ubah, hapus, export) selesai dalam satu layar tanpa koordinasi antar tim. Status merchant dan nama merchant terisi otomatis setelah inquiry, sehingga user tidak perlu mengetik ulang."],
], [2.3, 7.7], {size: 17}));

b.push(H2("B.2  Topology (High Level Architecture)"));
b.push(fill("[ Sisipkan diagram arsitektur as-is dan to-be di sini — Lampiran 1 ]", 6));
b.push(SP(80));
b.push(P("Penjelasan komponen & alur data:", {bold: true, size: 18}));
b.push(T(["No", "Komponen", "Peran", "Berubah?", "Keterangan"], [
  ["1", "MAAS Web (Front End)", "Menampilkan screen Livin Routing List", "Baru", "Screen baru; menu ditambahkan pada modul Merchant"],
  ["2", "MAAS App Service (Backend)", "Menyediakan API whitelist: list, inquiry, save, update, delete, bulk upload, export, history", "Baru", "Service SMC03F300R–SMC03F303U"],
  ["3", "Merchant Inquiry Service", "Menyediakan data nama merchant dan status MID", "Tidak berubah", "Dipanggil dari fungsi inquiry; kontrak existing"],
  ["4", "PostgreSQL — TBMCLVNRTLIST", "Menyimpan data MID whitelist beserta ENV Backend dan ENV Auth", "Baru", "Tabel baru; menggantikan penyimpanan di AUT1222"],
  ["5", "PostgreSQL — Common Code AUT1223", "Menyimpan daftar value dropdown environment", "Baru", "Common code baru"],
  ["6", "Routing Callback Service (SAU06F004U)", "Menentukan tujuan callback dari MTI ke Mandiri", "Diubah", "Sumber data routing berubah dari AUT1222 ke TBMCLVNRTLIST, dengan fallback ke AUT1222 selama periode paralel"],
  ["7", "Common Code AUT1222", "Penyimpanan whitelist lama", "Tidak berubah", "Dipertahankan sebagai fallback; dinonaktifkan setelah migrasi CR #22910"],
], [0.5, 2.1, 3, 1.2, 3.2], {size: 15}));

b.push(H2("B.3  Tech Stack / API Service Catalog / Platform"));
b.push(T(["Type", "Category", "Technology", "Version", "EOS Date", "Baru / Existing"], [
  ["Code Base", "Programming Language", "Java Spring Boot", "3.2", "Des 2027", "Existing"],
  ["Code Base", "Framework", "Spring Cloud", "2023.0", "Des 2027", "Existing"],
  ["Database", "Database", "PostgreSQL", "15", "Nov 2027", "Existing"],
  ["Infrastructure", "Container Platform", "OpenShift", "4.14", "Jun 2027", "Existing"],
  ["Security Management", "Authentication", "OAuth2", "—", "—", "Existing"],
  ["Security Management", "Encryption", "AES-256", "—", "—", "Existing"],
  ["Monitoring", "Log Management", "ELK Stack", "8.x", "—", "Existing"],
  ["Monitoring", "APM", "AppDynamics", "23.x", "—", "Existing"],
  ["Library", "Excel Processing", "Apache POI", "5.2.5", "—", "Baru — untuk bulk upload & export"],
], [1.7, 2.1, 1.8, 1.1, 1.2, 2.1], {size: 15}));

b.push(H2("B.4  Infrastructure Design"));
b.push(P("Pengembangan ini tidak memerlukan server baru maupun perubahan topologi jaringan. Detail server dirujuk ke CMDB; daftar lengkap server production tidak dicantumkan dalam dokumen ini sesuai ketentuan klasifikasi Internal.", {size: 18, after: 120}));
b.push(P("Komponen terdampak:", {bold: true, size: 18}));
b.push(T(["Komponen / Server (role)", "Fungsi", "Perubahan", "Ref. CMDB", "Perlu resource tambahan?"], [
  ["MAAS App Service (2 pod, OpenShift)", "Application service", "Deploy artefak baru + restart", "CI-MAAS-APP-PRD", "Tidak"],
  ["MAAS Web (2 pod, OpenShift)", "Web / Front End", "Deploy artefak baru + restart", "CI-MAAS-WEB-PRD", "Tidak"],
  ["PostgreSQL MAAS (primary + standby)", "Database", "Tambah 3 tabel baru + 1 common code", "CI-MAAS-DB-PRD", "Tidak — estimasi tambahan 1,2 GB / 12 bulan (lihat C.5)"],
  ["Routing Callback Service", "Application service", "Deploy versi baru SAU06F004U", "CI-MTI-RTG-PRD", "Tidak"],
], [2.6, 1.6, 2.2, 1.5, 2.1], {size: 15}));
b.push(SP(80));
b.push(P("Kebutuhan resource baru: tidak ada.", {bold: true, size: 17}));
b.push(P("Firewall / Network request: tidak ada. Seluruh komunikasi terjadi antar service yang sudah saling terbuka di zona yang sama.", {bold: true, size: 17}));
b.push(BREAK());

module.exports = b;
