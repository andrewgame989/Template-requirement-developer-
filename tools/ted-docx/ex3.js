const {D, P, H1, H2, H3, box, fill, T, SP, BREAK} = require('./lib.js');
const {AlignmentType} = D;
const b = [];

/* ---------------- D ---------------- */
b.push(H1("D.  OPERATIONAL HANDOVER"));
b.push(P("Bagian ini diverifikasi Application Support (Tangkas Prio Semobodo) pada 19 Agustus 2026.", {italics: true, size: 17, color: "595959", after: 120}));

b.push(H2("D.1  Konfigurasi & Parameter per Environment"));
b.push(T(["Parameter / Config", "Lokasi", "Nilai Dev", "Nilai Test", "Nilai Prod", "Boleh diubah runtime?", "Efek jika salah"], [
  ["AUT1223 — value dropdown environment", "Tabel COMMON_CODE, CODE_GROUP='AUT1223'", "BETA, PRODUCTION", "BETA, PRODUCTION", "BETA, PRODUCTION", "Ya — tanpa restart", "Dropdown environment kosong; user tidak dapat menambah data"],
  ["maas.whitelist.bulk.max-row", "ConfigMap maas-app-config", "500", "500", "500", "Tidak — perlu restart pod", "Batas baris tidak sesuai; file besar diterima dan membebani service"],
  ["maas.whitelist.inquiry.timeout-ms", "ConfigMap maas-app-config", "8000", "8000", "8000", "Tidak — perlu restart pod", "Terlalu kecil: inquiry sering timeout. Terlalu besar: layar menggantung"],
  ["maas.whitelist.export.max-row", "ConfigMap maas-app-config", "50000", "50000", "50000", "Tidak — perlu restart pod", "Export data besar membebani memori pod"],
  ["routing.fallback.aut1222.enabled", "ConfigMap mti-routing-config", "true", "true", "true", "Ya — refresh config 60 detik", "Jika di-false sebelum migrasi selesai, MID yang belum termigrasi diarahkan ke Production default"],
  ["routing.default.environment", "ConfigMap mti-routing-config", "PRODUCTION", "PRODUCTION", "PRODUCTION", "Ya — refresh config 60 detik", "Jika diisi BETA, callback merchant yang tidak ditemukan salah arah ke Beta"],
], [1.8, 1.7, 1, 1, 1, 1.4, 2.1], {size: 13}));
b.push(SP(80));
b.push(box("PERINGATAN", [
  "routing.default.environment WAJIB bernilai PRODUCTION. Nilai ini adalah pengaman terakhir saat lookup gagal — mengarahkan ke Beta berarti transaksi merchant production diproses di environment uji.",
], "danger"));

b.push(H2("D.2  Batch / Scheduler / Job"));
b.push(P("Tidak ada job batch maupun scheduler baru pada rilis ini.", {bold: true, size: 18, after: 80}));
b.push(P("Dua pekerjaan berikut untuk sementara dilakukan MANUAL oleh DBA sampai job otomatisnya tersedia (lihat D.5 dan C.5):", {size: 17, after: 80}));
b.push(T(["Pekerjaan", "Fungsi", "Frekuensi", "Pelaksana", "Cara Menjalankan", "Aman diulang?"], [
  ["Purging staging", "Menghapus baris TBTLVNRTLIST_STG berstatus final berusia > 90 hari", "Bulanan", "DBA", "Script purge_stg.sql, dijalankan pada window maintenance", "Ya — idempotent"],
  ["Archiving history", "Memindahkan TBHLVNRTLIST_HIST berusia > 24 bulan ke tabel arsip", "Tahunan (mulai bulan ke-24)", "DBA", "Script archive_hist.sql", "Ya — idempotent"],
], [1.6, 2.6, 1.4, 1, 2.2, 1.2], {size: 14}));

b.push(H2("D.3  Monitoring & Alert"));
b.push(T(["Yang Dipantau", "Tool / Dashboard", "Metric", "Threshold Warning", "Threshold Critical", "Notifikasi ke"], [
  ["Error rate endpoint whitelist", "AppDynamics — MAAS Whitelist", "% response 5xx", "> 2% dalam 10 menit", "> 5% dalam 10 menit", "L1 App Support, L2 Backend"],
  ["Response time inquiry", "AppDynamics — MAAS Whitelist", "p95 response time", "> 3 detik", "> 8 detik", "L1 App Support"],
  ["Hit fallback routing ke AUT1222", "AppDynamics — MTI Routing", "Jumlah hit/jam", "> 50/jam", "> 200/jam", "L1 App Support, L2 Backend"],
  ["Routing memakai default Production", "ELK — query WARN routing", "Jumlah kejadian/jam", "> 10/jam", "> 50/jam", "L1 App Support, L2 Backend"],
  ["Kegagalan bulk upload", "ELK — error code WL-4xxx", "Jumlah kegagalan/jam", "> 10/jam", "> 30/jam", "L1 App Support"],
  ["Pengajuan menggantung di staging", "AppDynamics custom metric", "Jumlah PENDING > 24 jam", "> 20 pengajuan", "> 50 pengajuan", "L1 App Support, Product"],
  ["Pertumbuhan tabel history", "Dashboard DBA", "Size tabel", "> 1,5 GB", "> 2,5 GB", "DBA, L2 Backend"],
], [2.2, 1.9, 1.6, 1.5, 1.5, 1.8], {size: 13}));
b.push(SP(80));
b.push(P("Lokasi Log:", {bold: true, size: 18}));
b.push(T(["Komponen", "Path / Index Log", "Pola pencarian umum", "Retention"], [
  ["MAAS App Service", "ELK index maas-app-*  (path pod: /apps/maas/logs/maas-app.log)", "logger:\"WhitelistService\" AND level:ERROR", "30 hari"],
  ["MAAS Web", "ELK index maas-web-*", "url:\"/whitelist\" AND status:>=400", "30 hari"],
  ["Routing Callback Service", "ELK index mti-routing-*  (path pod: /apps/routing/logs/routing.log)", "message:\"ROUTING_FALLBACK\" atau message:\"ROUTING_DEFAULT_USED\"", "90 hari"],
  ["Audit trail aplikasi", "Tabel TBHLVNRTLIST_HIST (bukan file log)", "SELECT berdasarkan MID / ACTOR / ACTION_DATE", "24 bulan"],
], [1.8, 3.1, 3.2, 1.1], {size: 14}));
b.push(SP(80));
b.push(P("Correlation / Trace ID:", {bold: true, size: 18}));
b.push(P("Setiap request dari layar membawa header X-Correlation-Id (UUID v4) yang diteruskan ke seluruh service dan dicatat pada setiap baris log serta pada kolom CORRELATION_ID di tabel history. Correlation ID ditampilkan pada pop-up error di layar, sehingga user dapat menyebutkannya saat melapor.", {size: 17, after: 60}));
b.push(P("Cara menelusuri satu transaksi lintas komponen di Kibana:", {bold: true, size: 17, after: 40}));
b.push(fill("index: maas-app-*,maas-web-*,mti-routing-*\nquery: correlationId:\"7f3a1c92-4b8e-4d21-9c65-0a5e2b7d1f04\"\nsort: @timestamp asc", 1));

b.push(H2("D.4  Troubleshooting Guide"));
b.push(T(["No", "Gejala / Error", "Kemungkinan Penyebab", "Cara Verifikasi", "Langkah Penanganan", "App Support sendiri?", "Eskalasi ke"], [
  ["1", "WL-5040 — \"Gagal mengambil status merchant\" saat user menekan Inquiry", "Merchant Inquiry Service lambat atau tidak merespons", "Cek health endpoint Merchant Inquiry Service; cek AppDynamics apakah p95 service tersebut naik", "Jika service memang bermasalah, informasikan user untuk mencoba 15 menit lagi dan buka insiden ke tim pemilik service. Tidak ada data yang rusak — proses tidak menyimpan apa pun saat timeout", "Ya", "Tim pemilik Merchant Inquiry Service; jika tidak jelas → L2 Backend"],
  ["2", "WL-4004 — \"Kolom pada file tidak sesuai template\" padahal user memakai template resmi", "Template lama masih tersimpan di komputer user, atau kolom tergeser saat diedit", "Minta user mengunduh ulang template dari tombol Download Template, lalu bandingkan judul kolom baris 1", "Arahkan user memakai template terbaru. Jika template baru tetap ditolak, ambil file dan correlationId lalu eskalasi", "Ya", "L2 Backend"],
  ["3", "Alert \"Hit fallback routing ke AUT1222\" melampaui threshold", "Banyak MID belum ada di TBMCLVNRTLIST — normal sebelum migrasi CR #22910 selesai; tidak normal jika terjadi setelah migrasi", "Kibana: index mti-routing-*, query message:\"ROUTING_FALLBACK\", kelompokkan per MID. Cek apakah MID tersebut ada di TBMCLVNRTLIST", "Sebelum migrasi selesai: catat saja, tidak perlu tindakan. Setelah migrasi selesai: ini indikasi data hilang atau gagal commit — eskalasi segera", "Ya (pencatatan)", "L2 Backend — segera, jika terjadi setelah migrasi"],
  ["4", "Dropdown ENV Backend / ENV Auth kosong di layar", "Common code AUT1223 terhapus, non-aktif, atau salah CODE_GROUP", "SELECT * FROM COMMON_CODE WHERE CODE_GROUP='AUT1223'. Harus mengembalikan minimal 2 baris aktif (BETA, PRODUCTION)", "Jika kosong, aktifkan kembali data AUT1223 sesuai nilai pada D.1. Tidak perlu restart pod", "Ya", "L2 Backend jika data tidak dapat dikembalikan"],
  ["5", "Pengajuan menggantung — status PENDING lebih dari 24 jam", "Tidak ada Checker yang menindaklanjuti, atau seluruh user Checker sedang tidak aktif", "SELECT count(*) FROM TBTLVNRTLIST_STG WHERE STATUS='PENDING' AND SUBMIT_DATE < now() - interval '24 hours'", "Informasikan Product / user owner agar Checker menindaklanjuti. Tidak ada dampak ke data produksi selama menggantung", "Ya", "Product Management (bukan masalah teknis)"],
  ["6", "Alert \"Routing memakai default Production\" naik tajam", "Lookup ke tabel dan fallback ke AUT1222 sama-sama gagal — kemungkinan koneksi database bermasalah", "Kibana: message:\"ROUTING_DEFAULT_USED\". Cek juga koneksi pool database pada AppDynamics", "Ini kondisi serius: merchant Beta berpotensi diarahkan ke Production. Eskalasi segera tanpa menunggu, sambil mengecek status database", "Tidak", "L2 Backend + DBA — segera"],
  ["7", "User melaporkan data whitelist yang dihapus muncul kembali", "Data masih ada di common code AUT1222 dan terbaca melalui fallback", "Cek TBMCLVNRTLIST (harus DATA_STATUS='DELETED') dan cek keberadaan MID di AUT1222", "Selama periode paralel, penghapusan wajib dilakukan di kedua tempat. Hapus juga entri di AUT1222", "Ya", "L2 Backend jika entri AUT1222 tidak dapat dihapus"],
], [0.4, 1.6, 1.6, 1.9, 2.3, 0.9, 1.3], {size: 12}));

b.push(H2("D.5  Known Limitation & Workaround"));
b.push(T(["No", "Limitasi", "Dampak ke User", "Workaround Sementara", "Rencana Perbaikan"], [
  ["1", "Selama periode paralel, penghapusan data harus dilakukan di screen baru DAN di common code AUT1222", "Jika hanya dihapus di screen, data masih terbaca melalui fallback dan merchant tetap diarahkan ke environment lama", "Prosedur operasional: hapus di kedua tempat. Tercantum pada runbook D.4 baris 7", "Selesai setelah migrasi CR #22910 dan fallback dinonaktifkan — target Oktober 2026"],
  ["2", "Purging staging dan archiving history belum otomatis", "Tidak ada dampak langsung ke user; tabel history tumbuh ±1,1 GB per 12 bulan", "Dijalankan manual oleh DBA (lihat D.2)", "Job otomatis diusulkan pada CR terpisah, target sebelum bulan ke-12"],
  ["3", "Bulk upload dibatasi 500 baris per file", "User dengan kebutuhan lebih dari 500 MID harus memecah file", "Pecah menjadi beberapa file", "Evaluasi setelah 3 bulan berdasarkan data pemakaian nyata"],
  ["4", "Tidak ada notifikasi otomatis ke Checker saat ada pengajuan baru", "Pengajuan berpotensi menggantung; termonitor lewat alert D.3", "Koordinasi manual antara Maker dan Checker", "Enhancement notifikasi pada backlog Q4 2026"],
  ["5", "Status MID tidak diperbarui otomatis setelah data tersimpan", "Jika merchant menjadi Terminated setelah didaftarkan, kolom status di layar masih menampilkan nilai saat pendaftaran", "Gunakan tombol Inquiry untuk menyegarkan status", "Sinkronisasi berkala diusulkan pada backlog Q4 2026"],
], [0.4, 2.4, 2.4, 2.4, 2.4], {size: 13}));

b.push(H2("D.6  Matriks Eskalasi"));
b.push(T(["Level", "Kondisi", "PIC / Tim", "Nama", "Kontak", "SLA Respon", "Jam Layanan"], [
  ["L1", "Seluruh laporan awal; kasus 1, 2, 4, 5, 7 pada runbook D.4", "Application Support", "Tangkas Prio Semobodo", "<< ext / nomor HP / grup >>", "15 menit", "24/7"],
  ["L2", "Kasus 3 dan 6 pada runbook; seluruh error WL-5000; kegagalan yang tidak ada di runbook", "IT Engineering — Backend", "Andrew Tasijawa", "<< ext / nomor HP >>", "30 menit (jam kerja)\n60 menit (di luar jam kerja)", "On-call"],
  ["L2", "Masalah tampilan layar, state tidak sesuai, tombol tidak berfungsi", "IT Engineering — Front End", "Inti", "<< ext / nomor HP >>", "60 menit", "Jam kerja"],
  ["L2", "Masalah database: koneksi, performa query, pertumbuhan tabel", "IT Infra & Operations — DBA", "Stevie Dwiputra", "<< ext / nomor HP >>", "30 menit", "On-call"],
  ["L3", "Masalah pada sisi Bank Mandiri (callback tidak diterima)", "Bank Mandiri — tim Livin Merchant", "melalui Arie Valiant Rindengan", "<< kanal koordinasi >>", "Sesuai SLA kerja sama", "Jam kerja"],
], [0.7, 2.6, 1.9, 1.6, 1.4, 1.5, 1.1], {size: 13}));
b.push(SP(60));
b.push(box("CATATAN", ["Kolom Kontak sengaja dikosongkan pada dokumen contoh ini. Pada dokumen sebenarnya, kolom ini WAJIB terisi nama dan nomor yang dapat dihubungi — bukan hanya nama tim."], "warn"));

b.push(H2("D.7  Serah Terima Akses & Aset"));
b.push(T(["Item", "Diserahkan ke", "Status", "Tanggal", "Keterangan"], [
  ["Akses aplikasi MAAS role MAAS_WL_VIEWER", "Application Support", "☑ Selesai", "19 Agu 2026", "Sudah diuji login dan membuka screen"],
  ["Akses dashboard AppDynamics MAAS Whitelist", "Application Support", "☑ Selesai", "19 Agu 2026", "Sudah diuji membuka dashboard dan melihat metric"],
  ["Akses Kibana index maas-app-*, mti-routing-*", "Application Support", "☑ Selesai", "19 Agu 2026", "Sudah diuji dengan query correlationId"],
  ["Akses read-only database untuk query runbook", "Application Support", "☑ Selesai", "19 Agu 2026", "Terbatas SELECT pada 3 tabel whitelist"],
  ["Kredensial service account", "—", "Tidak berlaku", "—", "Seluruh secret dikelola OpenShift Secret; App Support tidak memerlukan akses"],
  ["Dokumen TED versi final", "Developer & App Support", "☐ Menunggu", "Target 25 Sep 2026", "Didistribusikan setelah UAT sign-off"],
  ["Sesi knowledge transfer", "Application Support", "☐ Terjadwal", "18 Sep 2026", "Agenda: demo screen, walkthrough runbook D.4, simulasi 3 skenario insiden"],
], [3.2, 2.1, 1.2, 1.4, 2.1], {size: 14}));
b.push(BREAK());

/* ---------------- E ---------------- */
b.push(H1("E.  DEPLOYMENT & ROLLBACK"));

b.push(H2("E.1  Rencana Implementasi"));
b.push(T(["Field", "Isi"], [
  ["Tanggal & jam implementasi", "Sabtu, 26 September 2026, pukul 22:00 – 01:00 WIB"],
  ["Estimasi durasi total", "±2 jam 15 menit (termasuk smoke test)"],
  ["Downtime diperlukan?", "Tidak. Deploy rolling per pod; DDL bersifat CREATE sehingga tidak mengunci tabel existing"],
  ["Dampak ke layanan", "Sesi user MAAS yang sedang aktif akan terputus saat pod restart dan perlu login ulang. Routing callback tidak terputus karena rolling per pod"],
  ["Perlu notifikasi ke merchant / bank / partner?", "Ya — notifikasi ke tim Livin Merchant Bank Mandiri, dikirim H-7 (19 September 2026) oleh Arie Valiant Rindengan. Tidak ada notifikasi ke merchant karena tidak ada dampak yang terlihat merchant"],
  ["Executor", "Deploy: IT Infra & Operation (Reza Prasetya). Script DB: DBA (Stevie Dwiputra). Verifikasi: Faiz Ihza M + Tangkas Prio Semobodo"],
  ["Approver on-site", "Andrew Tasijawa (Tech Lead)"],
  ["CAB / Change Ticket", "CHG-2026-09-0417"],
], [3.4, 6.6], {size: 17}));

b.push(H2("E.2  Urutan Deployment"));
b.push(T(["Step", "Aksi", "Komponen", "Executor", "Estimasi", "Cara Verifikasi Step Berhasil", "PONR?"], [
  ["1", "Backup database (schema + data 3 tabel terkait) dan simpan artefak versi lama", "PostgreSQL, OpenShift", "DBA + Infra", "20 menit", "File backup ada dan lolos verifikasi restore-test; tag artefak lama tercatat", "Tidak"],
  ["2", "Jalankan script DDL (3 tabel + 3 index)", "PostgreSQL", "DBA", "5 menit", "SELECT dari ketiga tabel berhasil; \\d menampilkan index sesuai C.5", "Tidak"],
  ["3", "Insert data common code AUT1223 (BETA, PRODUCTION)", "PostgreSQL", "DBA", "3 menit", "SELECT COUNT(*) FROM COMMON_CODE WHERE CODE_GROUP='AUT1223' = 2", "Tidak"],
  ["4", "Deploy backend MAAS App Service (SMC03F300R–SMC03F303U, SMC04V001U) — rolling", "OpenShift", "Infra", "20 menit", "Seluruh pod Running dan Ready; endpoint /actuator/health mengembalikan UP", "Tidak"],
  ["5", "Deploy Routing Callback Service (SAU06F004U) — rolling", "OpenShift", "Infra", "15 menit", "Pod Ready; log menampilkan \"Routing source: TBMCLVNRTLIST (fallback AUT1222 enabled)\"", "Ya — mulai titik ini routing membaca sumber baru"],
  ["6", "Deploy frontend MAAS Web (SMC15V002U) — rolling", "OpenShift", "Infra", "15 menit", "Menu Livin Routing List tampil; screen terbuka tanpa error konsol", "Ya"],
  ["7", "Verifikasi konfigurasi ConfigMap sesuai D.1", "OpenShift", "Infra", "5 menit", "Seluruh 6 parameter pada D.1 sesuai nilai kolom Prod", "Ya"],
  ["8", "Smoke test (PIV E.4)", "End-to-end", "Dev + App Support", "30 menit", "Seluruh 8 item PIV berstatus Pass", "Ya"],
], [0.5, 2.4, 1.1, 1.1, 0.9, 2.7, 0.8], {size: 12}));
b.push(SP(60));
b.push(P("PONR = Point of No Return. Setelah step 5, rollback tidak lagi sederhana karena routing production sudah membaca sumber data baru — lihat E.3.", {italics: true, size: 17, color: "595959"}));

b.push(H2("E.3  Rollback Plan"));
b.push(T(["Field", "Isi"], [
  ["Kriteria trigger rollback", "Salah satu terpenuhi:\n(a) Error rate endpoint whitelist > 5% selama 10 menit berturut-turut\n(b) Alert \"Routing memakai default Production\" > 50 kejadian/jam\n(c) Callback ke Bank Mandiri gagal > 1% dari baseline harian\n(d) Item PIV nomor 1, 2, atau 5 berstatus Fail dan tidak selesai dalam 30 menit"],
  ["Siapa yang berwenang memutuskan", "Andrew Tasijawa (Tech Lead). Jika tidak dapat dihubungi: Ahmad Tirmidzi (IT Engineering)"],
  ["Estimasi durasi rollback", "±45 menit"],
  ["Batas waktu keputusan rollback", "Maksimal Minggu, 27 September 2026 pukul 03:00 WIB. Lewat batas ini, perbaikan dilakukan lewat hotfix, bukan rollback"],
  ["Apakah ada data baru yang akan hilang?", "Ya. Data whitelist yang dibuat setelah go-live tersimpan di TBMCLVNRTLIST dan akan hilang jika tabel di-drop. Karena itu tabel TIDAK di-drop saat rollback — lihat langkah 5 di bawah. Data tetap tersimpan dan dapat dipakai ulang saat deploy ulang"],
], [3.4, 6.6], {size: 17}));
b.push(SP(80));
b.push(P("Langkah Rollback:", {bold: true, size: 18}));
b.push(T(["Step", "Aksi", "Komponen", "Executor", "Verifikasi"], [
  ["1", "Set routing.fallback.aut1222.enabled = true dan pastikan routing.default.environment = PRODUCTION", "ConfigMap mti-routing", "Infra", "Config ter-refresh dalam 60 detik; log menampilkan nilai baru"],
  ["2", "Rollback frontend MAAS Web ke versi 24", "OpenShift", "Infra", "Menu Livin Routing List tidak lagi tampil"],
  ["3", "Rollback Routing Callback Service SAU06F004U ke versi 47", "OpenShift", "Infra", "Log menampilkan \"Routing source: AUT1222\"; callback uji berhasil"],
  ["4", "Rollback backend MAAS App Service ke versi sebelumnya (SMC04V001U ke 16; SMC03F30x dinonaktifkan)", "OpenShift", "Infra", "Seluruh pod Ready; endpoint whitelist mengembalikan 404"],
  ["5", "JANGAN drop tabel. Jalankan SELECT COUNT(*) FROM TBMCLVNRTLIST terlebih dahulu — jika 0 baris, boleh jalankan script rollback DB pada C.5. Jika ada data, biarkan tabel dan bersihkan pada window terjadwal berikutnya", "PostgreSQL", "DBA", "Jumlah baris tercatat pada berita acara implementasi"],
  ["6", "Verifikasi callback berjalan normal melalui menu AUT1222", "End-to-end", "Dev + App Support", "3 transaksi uji callback berhasil ke environment yang benar"],
  ["7", "Notifikasi ke tim Livin Merchant Bank Mandiri bahwa implementasi dibatalkan", "—", "Arie Valiant Rindengan", "Konfirmasi diterima"],
], [0.5, 4.2, 1.4, 1.2, 2.7], {size: 13}));

b.push(H2("E.4  Post-Implementation Verification (PIV)"));
b.push(T(["No", "Item Verifikasi", "Cara Cek", "Expected", "Hasil", "PIC"], [
  ["1", "Service up & health check OK", "GET /actuator/health pada seluruh pod MAAS App dan Routing", "Seluruh pod UP", "☐ Pass  ☐ Fail", "Reza Prasetya"],
  ["2", "Callback end-to-end ke Bank Mandiri berhasil", "3 transaksi uji: 1 MID Beta, 1 MID Production, 1 MID tidak terdaftar", "Beta ke Beta; Production ke Production; tidak terdaftar ke Production (default) dan tercatat WARN", "☐ Pass  ☐ Fail", "Faiz Ihza M + tim QA Mandiri"],
  ["3", "Screen terbuka dan menampilkan data", "Buka menu Livin Routing List, lakukan search", "Tabel tampil, tidak ada error konsol", "☐ Pass  ☐ Fail", "Tangkas Prio Semobodo"],
  ["4", "Inquiry, Add, dan Approve berjalan", "Daftarkan 1 MID uji, setujui dengan user Checker berbeda", "Data berpindah dari PENDING ke aktif; tercatat di change history", "☐ Pass  ☐ Fail", "Faiz Ihza M"],
  ["5", "Fungsi existing tidak terdampak (regresi)", "Buka menu common code AUT1222 dan 3 menu MAAS lain yang sering dipakai", "Seluruh menu berfungsi seperti sebelumnya", "☐ Pass  ☐ Fail", "Tangkas Prio Semobodo"],
  ["6", "Log tidak ada error baru", "Kibana: index maas-app-*, level:ERROR, rentang 30 menit setelah deploy", "Tidak ada error baru di luar yang sudah dikenal", "☐ Pass  ☐ Fail", "Tangkas Prio Semobodo"],
  ["7", "Metric AppDynamics dalam batas normal", "Dashboard MAAS Whitelist dan MTI Routing", "p95 < 3 detik; error rate < 2%", "☐ Pass  ☐ Fail", "Ferry Sulistiyanto"],
  ["8", "Data tersimpan benar di tabel baru", "SELECT pada TBMCLVNRTLIST dan TBHLVNRTLIST_HIST untuk MID uji", "Data sesuai input; history mencatat OLD_VALUE dan NEW_VALUE", "☐ Pass  ☐ Fail", "Stevie Dwiputra"],
], [0.5, 2.4, 2.6, 2.4, 1.1, 1], {size: 13}));
b.push(SP(80));
b.push(T(["Aspek", "Isi"], [
  ["Periode monitoring intensif", "3 hari kalender setelah go-live (26–29 September 2026). Dipantau bersama oleh Developer (Faiz Ihza M) dan Application Support (Tangkas Prio Semobodo), dengan pengecekan metric dan log setiap 4 jam pada hari pertama"],
  ["Kriteria dinyatakan stabil", "Tidak ada insiden severity 1 atau 2, error rate < 2%, dan alert fallback routing tidak melampaui threshold critical selama 3 hari"],
], [2.6, 7.4], {size: 17}));
b.push(BREAK());

/* ---------------- F ---------------- */
b.push(H1("F.  TESTING"));

b.push(H2("F.1  Test Scenario"));
b.push(T(["ID", "Ref. Req.", "Skenario", "Precondition", "Expected Result", "Tipe", "Env", "Status"], [
  ["TC-01", "R02, R04", "Pendaftaran MID ke whitelist secara satuan — sukses", "MID Livin Merchant berstatus Active; ENV Backend dan Auth sudah ditentukan", "Inquiry menampilkan status Active; data tersimpan dan tampil di layar setelah pendaftaran selesai", "Positive", "SIT, UAT", "Pass"],
  ["TC-02", "R02, R04", "Pendaftaran MID satuan — gagal karena status Terminated", "MID berstatus Terminated", "Sistem menolak melanjutkan pendaftaran; pesan sesuai D-01", "Negative", "SIT, UAT", "Pass"],
  ["TC-03", "R02, R05", "Bulk upload — sukses", "Template sudah diunduh dan diisi MID, ENV Backend, ENV Auth", "Data terbaca sesuai file; setelah inquiry, nama merchant dan status terisi otomatis; data dapat disubmit dan tampil di layar", "Positive", "SIT, UAT", "Pass"],
  ["TC-04", "R02", "Bulk upload — gagal karena seluruh MID Terminated", "File berisi MID yang seluruhnya Terminated", "Tidak ada data tersimpan; muncul pop-up \"Tidak ada data yang dapat disimpan\" (WL-4220)", "Negative", "SIT, UAT", "Pass"],
  ["TC-05", "R02", "Bulk upload — file melebihi 500 baris", "File berisi 501 baris data", "File ditolak seluruhnya dengan pesan WL-4005", "Boundary", "SIT", "Pass"],
  ["TC-06", "R02", "Bulk upload — format file tidak sesuai", "File .csv atau .xlsx dengan kolom tergeser", "File ditolak dengan pesan WL-4003 / WL-4004", "Negative", "SIT", "Pass"],
  ["TC-07", "R03", "Perubahan ENV data whitelist", "Data whitelist sudah ada; user mencari berdasarkan MID atau tanggal register", "Nilai ENV dapat diubah lewat dropdown; setelah simpan, data hasil perubahan tampil di layar", "Positive", "SIT, UAT", "Pass"],
  ["TC-08", "R03", "Delete data whitelist", "Data whitelist sudah ada; user memilih baris melalui checkbox", "Muncul pop-up sukses/gagal; data yang berhasil dihapus tidak muncul lagi di layar", "Positive", "SIT, UAT", "Pass"],
  ["TC-09", "R03", "Maker tidak dapat menyetujui pengajuannya sendiri", "Pengajuan delete dibuat oleh user A", "User A tidak dapat menyetujui; pesan sesuai E-05", "Negative", "SIT, UAT", "Pass"],
  ["TC-10", "R08", "Callback merchant ENV Beta", "MID terdaftar dengan ENV Backend dan Auth = BETA", "Callback diarahkan ke endpoint Beta sesuai TBMCLVNRTLIST", "Positive", "SIT, UAT", "Pass"],
  ["TC-11", "R08", "Callback merchant ENV Production", "MID terdaftar dengan ENV = PRODUCTION", "Callback diarahkan ke endpoint Production", "Positive", "SIT, UAT", "Pass"],
  ["TC-12", "R08", "Callback MID tidak terdaftar di tabel baru", "MID hanya ada di common code AUT1222", "Fallback membaca AUT1222; callback tetap berhasil; log mencatat ROUTING_FALLBACK", "Negative", "SIT", "Pass"],
  ["TC-13", "R08", "Callback MID tidak terdaftar di mana pun", "MID tidak ada di tabel maupun AUT1222", "Callback diarahkan ke Production sebagai default; log mencatat ROUTING_DEFAULT_USED (WARN)", "Negative", "SIT", "Pass"],
  ["TC-14", "R01, R05", "Export data ke Excel", "Terdapat data whitelist sesuai filter", "File .xlsx terunduh dengan kolom dan data sesuai filter aktif", "Positive", "SIT, UAT", "Pass"],
  ["TC-15", "R07", "Change history menampilkan nilai lama dan nilai baru", "Data whitelist pernah diubah", "Modal menampilkan aksi, pelaku, waktu, nilai lama, dan nilai baru", "Positive", "SIT, UAT", "Pass"],
  ["TC-16", "R06", "Dropdown environment terisi dari common code", "Common code AUT1223 aktif", "Dropdown menampilkan BETA dan PRODUCTION", "Positive", "SIT", "Pass"],
  ["TC-17", "—", "Hak akses role VIEWER", "Login sebagai MAAS_WL_VIEWER", "Tombol Add, Bulk Upload, Edit, Delete, Approve tidak tampil; akses langsung ke URL API mengembalikan 403", "Negative", "SIT", "Pass"],
  ["TC-18", "—", "Regresi menu common code AUT1222", "Menu AUT1222 masih aktif", "Menu berfungsi seperti sebelum implementasi", "Regresi", "SIT, UAT", "Pass"],
  ["TC-19", "—", "Regresi 3 menu MAAS yang paling sering dipakai", "Aplikasi MAAS berjalan normal", "Seluruh menu berfungsi seperti sebelumnya", "Regresi", "SIT, UAT", "Pass"],
  ["TC-20", "R02", "Idempotency bulk upload — user menekan tombol dua kali", "X-Idempotency-Key sama dikirim dua kali", "Pengajuan tidak terduplikasi; respons kedua mengembalikan hasil pertama (WL-4090)", "Negative", "SIT", "Pass"],
], [0.55, 0.8, 2.1, 1.7, 2.6, 0.8, 0.7, 0.6], {size: 12}));
b.push(SP(60));
b.push(P("Link evidence: QA/SIT/2026/0912-MAAS-WL (screenshot dan log per test case) · QA/UAT/2026/0924-MAAS-WL", {italics: true, size: 17, color: "595959"}));

b.push(H2("F.2  Kebutuhan Data & Environment Testing"));
b.push(T(["Kebutuhan", "Detail", "Sudah Tersedia?", "PIC"], [
  ["Test data", "20 MID Livin Merchant: 15 Active, 5 Terminated. Ditambah 3 MID tidak terdaftar untuk uji fallback", "☑ Ya — 05 Sep 2026", "Arie Valiant Rindengan"],
  ["Environment", "SIT MAAS + SIT Routing; UAT MAAS terhubung ke environment Beta Bank Mandiri", "☑ Ya", "Reza Prasetya"],
  ["Akses / kredensial test", "4 user uji sesuai role: VIEWER, MAKER, CHECKER, ADMIN", "☑ Ya", "Faiz Ihza M"],
  ["Simulator / stub pihak ke-3", "Tidak memakai stub. Pengujian callback dilakukan langsung ke environment Beta Bank Mandiri dengan pendampingan tim QA Mandiri", "☑ Ya — 12 Sep 2026", "Arie Valiant Rindengan"],
], [2.2, 4.6, 1.7, 1.5], {size: 15}));

b.push(H2("F.3  Ringkasan Hasil & Sign-off Testing"));
b.push(T(["Tahap", "Total TC", "Pass", "Fail", "Open Defect", "Link Report", "Sign-off oleh", "Tanggal"], [
  ["SIT", "20", "20", "0", "1 (severity 4)", "QA/SIT/2026/0912-MAAS-WL", "M Taufik Hidayat (QA)", "12 Sep 2026"],
  ["UAT", "13", "13", "0", "1 (severity 4)", "QA/UAT/2026/0924-MAAS-WL", "Rika Rossyantika (Product)", "24 Sep 2026"],
], [0.9, 1, 0.8, 0.8, 1.3, 2.3, 1.9, 1.2], {size: 15}));
b.push(SP(80));
b.push(P("Open defect yang dibawa ke production:", {bold: true, size: 18}));
b.push(T(["ID Defect", "Severity", "Deskripsi", "Alasan Diterima", "Workaround", "Target Perbaikan"], [
  ["DEF-2026-0918", "4 (Low — kosmetik)", "Pada layar dengan lebar < 1280px, kolom Routing Endpoint terpotong dan harus di-scroll horizontal", "Tidak menghalangi fungsi. Seluruh user operasional memakai monitor 1920px sesuai standar perangkat kerja", "Scroll horizontal, atau gunakan fungsi Export untuk melihat data lengkap", "Sprint Oktober 2026"],
], [1.3, 1.4, 2.3, 2.2, 1.6, 1.2], {size: 14}));
b.push(BREAK());

/* ---------------- G ---------------- */
b.push(H1("G.  RISK & MITIGATION"));
b.push(T(["No", "Risiko", "Kategori", "L", "I", "Mitigasi (pencegahan)", "Contingency (jika terjadi)", "Owner"], [
  ["1", "Callback merchant salah arah karena lookup ke tabel baru gagal, sehingga transaksi merchant Production diproses di environment Beta atau sebaliknya", "Teknis", "L", "H", "Fallback berlapis: tabel baru → AUT1222 → default PRODUCTION. Parameter routing.default.environment dikunci ke PRODUCTION dan diverifikasi pada PIV item 2", "Alert D.3 memicu eskalasi L2 segera (runbook D.4 baris 6). Jika tidak teratasi dalam 30 menit, jalankan rollback E.3", "Andrew Tasijawa"],
  ["2", "Data whitelist yang dihapus di screen baru masih terbaca melalui fallback AUT1222, sehingga merchant tetap diarahkan ke environment lama", "Operasional", "M", "M", "Prosedur operasional mewajibkan penghapusan di kedua tempat selama periode paralel; tercantum pada runbook D.4 baris 7 dan D.5 baris 1", "Hapus manual entri AUT1222; percepat penyelesaian migrasi CR #22910", "Tangkas Prio Semobodo"],
  ["3", "Bulk upload 500 baris memicu 500 pemanggilan inquiry sekaligus dan membebani Merchant Inquiry Service", "Teknis", "M", "M", "Pemrosesan per batch 100 baris; rate limit 5 request/menit per user; timeout inquiry 8 detik", "Turunkan maas.whitelist.bulk.max-row melalui ConfigMap (perlu restart pod), lalu evaluasi", "Andrew Tasijawa"],
  ["4", "Tabel history tumbuh melebihi perkiraan karena job archiving belum otomatis", "Operasional", "M", "L", "Monitoring pertumbuhan tabel dengan threshold 1,5 GB / 2,5 GB (D.3); archiving manual oleh DBA (D.2)", "Jalankan archiving manual lebih awal; percepat pengajuan CR job otomatis", "Stevie Dwiputra"],
  ["5", "Penyalahgunaan akses: user dengan role MAKER menghapus data whitelist dalam jumlah besar", "Keamanan", "L", "H", "Maker-checker wajib untuk Delete dan Bulk Upload; audit trail append-only mencatat pelaku, IP, nilai lama dan baru; role ADMIN dibatasi 2 user dan direview per kuartal", "Telusuri TBHLVNRTLIST_HIST untuk identifikasi pelaku dan lingkup dampak; pulihkan data dari backup; laporkan ke IT Security", "I Gusti Agung A. S"],
  ["6", "User operasional tetap memakai menu AUT1222 dan mengabaikan screen baru, sehingga data terpecah di dua tempat", "Bisnis", "M", "M", "Sosialisasi dan knowledge transfer 18 September 2026; monitoring jumlah hit fallback sebagai indikator pemakaian menu lama", "Evaluasi bersama Product; jika perlu, percepat penonaktifan menu AUT1222 setelah migrasi selesai", "Rika Rossyantika"],
  ["7", "Pengajuan menggantung karena tidak ada notifikasi otomatis ke Checker", "Operasional", "H", "L", "Alert pengajuan PENDING > 24 jam (D.3); koordinasi manual Maker–Checker; tercatat sebagai known limitation D.5 baris 4", "Eskalasi ke Product Management untuk menindaklanjuti; enhancement notifikasi masuk backlog Q4 2026", "Rika Rossyantika"],
], [0.4, 2.3, 0.9, 0.45, 0.45, 2.4, 2.2, 0.9], {size: 12}));
b.push(SP(60));
b.push(P("L = Likelihood, I = Impact (H = High, M = Medium, L = Low)", {italics: true, size: 16, color: "595959"}));
b.push(BREAK());

/* ---------------- H ---------------- */
b.push(H1("H.  APPROVAL"));
b.push(SP(160));
b.push(T(["Peran", "Nama", "Unit / Department", "Tanggal", "Tanda Tangan"], [
  {__section: "PREPARED BY"},
  ["Developer", "Faiz Ihza M", "Livin Merchant 4 — PT. Mitra Transaksi Indonesia", "", ""],
  ["Developer", "Sandi G.", "Livin Merchant 4 — PT. Mitra Transaksi Indonesia", "", ""],
  ["Developer", "M Taufik Hidayat", "Livin Merchant 4 — PT. Mitra Transaksi Indonesia", "", ""],
  ["Developer", "Arie Valiant Rindengan", "Livin Merchant 2 — PT. Mitra Transaksi Indonesia", "", ""],
  ["Tech Lead", "Andrew Tasijawa", "IT Engineering — PT. Mitra Transaksi Indonesia", "", ""],
  {__section: "REVIEWED BY"},
  ["IT Strategy & Governance", "Nofri", "PT. Mitra Transaksi Indonesia", "", ""],
  ["IT Information Security", "Edy Kusnanto", "PT. Mitra Transaksi Indonesia", "", ""],
  ["IT Engineering", "Ahmad Tirmidzi", "PT. Mitra Transaksi Indonesia", "", ""],
  ["IT Infra & Operation", "Reza Prasetya", "PT. Mitra Transaksi Indonesia", "", ""],
  ["Application Support", "Tangkas Prio Semobodo", "PT. Mitra Transaksi Indonesia", "", ""],
  {__section: "ACCEPTED BY"},
  ["Product Management", "Rika Rossyantika", "PT. Mitra Transaksi Indonesia", "", ""],
], [2.3, 2.2, 3.1, 1.2, 1.2], {size: 15, zebra: false}));
b.push(SP(200));
b.push(P("— Akhir Dokumen —", {italics: true, size: 17, color: "808080", align: AlignmentType.CENTER}));

module.exports = b;
