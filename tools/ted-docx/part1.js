const {D, W, NAVY, P, H1, H2, H3, guide, warn, danger, fill, T, SP, BREAK} = require('./lib.js');
const {AlignmentType, BorderStyle} = D;
const b = [];
const X = "<< isi di sini >>";

/* ================= COVER ================= */
b.push(SP(2400));
b.push(P("TECHNICAL ENGINEERING DOCUMENT", {bold: true, size: 44, color: NAVY, align: AlignmentType.CENTER, after: 120}));
b.push(P("(TED)", {bold: true, size: 30, color: NAVY, align: AlignmentType.CENTER, after: 400}));
b.push(P("<< Judul Pengembangan >>", {italics: true, size: 26, color: "595959", align: AlignmentType.CENTER, after: 800}));
b.push(T(null, [
  ["Nomor TED", "TED-#XXXXX"],
  ["Version", "V1.0"],
  ["Document Classification", "Internal  /  Confidential  /  Restricted"],
  ["Document Status", "Draft"],
  ["Tanggal", "DD MMMM YYYY"],
], [1, 2], {size: 20, zebra: false}));
b.push(SP(2000));
b.push(P("Dokumen ini menggantikan TSD dan merupakan dokumen serah terima teknis", {italics: true, size: 17, color: "595959", align: AlignmentType.CENTER, after: 20}));
b.push(P("kepada Internal Developer dan Application Support saat project naik Production.", {italics: true, size: 17, color: "595959", align: AlignmentType.CENTER}));
b.push(BREAK());

/* ============ PETUNJUK UMUM PENGISIAN ============ */
b.push(H1("PETUNJUK UMUM PENGISIAN"));
b.push(P("Halaman ini adalah panduan. Boleh dihapus setelah dokumen selesai diisi.", {italics: true, color: "595959", size: 17, after: 160}));

b.push(H2("1. Enam Prinsip Dasar"));
b.push(T(["#", "Aturan", "Artinya"], [
  ["1", "Tulis untuk orang yang tidak ikut project", "Pembacanya App Support dan developer lain 6 bulan lagi — bukan Anda hari ini."],
  ["2", "Fakta, bukan opini", "\"Response 3–5 detik\" BENAR. \"Agak lambat\" SALAH."],
  ["3", "Tidak boleh kosong", "Tidak relevan → tulis \"N/A\" BESERTA alasannya. \"N/A\" polos = dokumen dikembalikan."],
  ["4", "Satu ide satu baris", "Jangan menumpuk 7 skenario dalam satu sel tabel."],
  ["5", "Bukan hanya happy path", "Setiap flow, API, dan test wajib punya kondisi gagal."],
  ["6", "ID konsisten dari atas ke bawah", "Satu requirement dilacak dari Scope sampai Runbook memakai ID yang sama."],
], [0.5, 3, 6.5], {size: 17}));

b.push(SP(120));
b.push(danger([
  "UJI AKHIR SEBELUM SUBMIT:",
  "Bisakah Application Support menangani insiden jam 2 pagi hanya dengan dokumen ini, tanpa menelepon Anda?",
  "Kalau jawabannya \"tidak\", dokumen belum selesai — perbaiki BAGIAN D dulu.",
]));

b.push(H2("2. Kapan Diisi"));
b.push(T(["Waktu", "Yang dikerjakan"], [
  ["Saat development dimulai", "Isi Bagian 0, A, B, C — diisi SAMBIL CODING, jangan ditunda"],
  ["Development selesai", "Isi Bagian F (Testing) dan C.8 (versi Code Dependency)"],
  ["H-14 sebelum production", "Submit draft ke Tech Lead"],
  ["H-10", "Review lintas unit — sign-off Impacted / Not Impacted di C.7"],
  ["H-7", "Handover session; Application Support memverifikasi Bagian D"],
  ["H-5", "Finalisasi Bagian E (Deployment & Rollback)"],
  ["H-3", "SIT/UAT sign-off dimasukkan ke Bagian F"],
  ["H-2", "Keputusan APPROVED / HOLD"],
  ["H-0", "Implementasi + Post Implementation Verification (E.4)"],
  ["H+3", "Dokumen difinalkan ke versi final dan didistribusikan"],
], [2.2, 7.8], {size: 17}));
b.push(SP(80));
b.push(warn(["Kesalahan paling umum: TED baru ditulis H-3 sebagai formalitas. Hasilnya asal isi, dan Application Support menolak menerima serah terima. Isi sambil coding."]));

b.push(H2("3. Konvensi Wajib"));
b.push(H3("3.1 Penamaan file"));
b.push(P("TED-<nomor CR>-<nama-singkat>-V<versi>.docx", {bold: true, size: 18}));
b.push(P("Contoh: TED-21742-whitelist-routing-maas-V1.0.docx", {italics: true, size: 17, color: "595959"}));
b.push(H3("3.2 ID Requirement — kunci traceability"));
b.push(P("Format: TED-<nomor>-R<nn>   →  contoh: TED-21742-R01", {bold: true, size: 18}));
b.push(P("ID dibuat di A.4 (High-Level Scope), lalu DIPAKAI ULANG di seluruh bagian berikut:", {size: 17}));
b.push(P("A.4 Scope → C.1 Flow → C.2 UI → C.3 API → C.4 File → C.5 DB → C.7 Impact → C.8 Code Dependency → F.1 Test", {bold: true, size: 17, color: "2E5496"}));
b.push(P("Kenapa penting: saat insiden, Application Support melihat error di sebuah program dan harus bisa langsung tahu itu melayani requirement yang mana, screen mana, dan test case mana. Tanpa ID, penelusuran ini mustahil.", {size: 17}));
b.push(H3("3.3 Klasifikasi dokumen"));
b.push(T(["Isi dokumen", "Klasifikasi"], [
  ["Desain aplikasi biasa", "Internal"],
  ["Memuat hostname / IP / detail server / topologi jaringan", "Confidential"],
  ["Memuat data kartu, kunci enkripsi, atau kredensial", "Restricted"],
], [7, 3], {size: 17}));
b.push(SP(60));
b.push(warn(["Jangan menyalin daftar server production beserta IP ke dalam TED. Cantumkan hanya komponen terdampak dan rujuk ke CMDB. Kalau memang harus dicantumkan, naikkan klasifikasi dokumennya."]));

b.push(H2("4. Kata & Frasa Terlarang"));
b.push(P("Kata di bawah ambigu dan wajib diganti dengan angka atau kondisi konkret.", {size: 17}));
b.push(T(["Terlarang", "Ganti dengan"], [
  ["\"cepat\", \"lambat\"", "angka dalam detik / milidetik"],
  ["\"banyak\", \"sedikit\"", "jumlah record"],
  ["\"sesuai kebutuhan\"", "sebutkan kebutuhannya"],
  ["\"seperti biasa\", \"seperti existing\"", "jelaskan seperti apa persisnya"],
  ["\"kurang lebih\", \"sekitar\"", "rentang pasti (minimum–maksimum)"],
  ["\"jika diperlukan\"", "siapa yang menentukan, kapan"],
  ["\"akan disesuaikan nanti\"", "tentukan sekarang, atau tulis sebagai Open Item + PIC + deadline"],
  ["\"user tinggal klik saja\"", "tuliskan langkahnya"],
  ["\"sudah aman\"", "sebutkan kontrol keamanan spesifiknya"],
  ["\"N/A\" tanpa alasan", "N/A — <alasan>"],
], [4.5, 5.5], {size: 17}));

b.push(H2("5. Sepuluh Kesalahan yang Paling Sering Terjadi"));
b.push(T(["#", "Kesalahan", "Yang benar"], [
  ["1", "TED ditulis H-3 sebagai formalitas", "Isi sambil coding"],
  ["2", "Kolom Status / Impact Area / Proposed dikosongkan", "Semua kolom wajib terisi"],
  ["3", "Rollback Impact diisi \"N/A\" semua", "Jelaskan dampaknya per program"],
  ["4", "Skenario testing ditumpuk jadi satu paragraf", "Satu baris satu skenario"],
  ["5", "Menyalin seluruh daftar server production beserta IP", "Hanya komponen terdampak, rujuk CMDB"],
  ["6", "DB schema hanya ditulis \"lampiran diagram\"", "DDL + kamus kolom wajib di dalam dokumen"],
  ["7", "Hanya menulis happy path", "Exception, error code, dan regresi wajib ada"],
  ["8", "Bagian D dikosongkan atau diisi asal", "Justru inilah alasan utama TED dibuat"],
  ["9", "Link Figma / Swagger sudah expired", "Cek ulang semua link sebelum submit"],
  ["10", "Copy-paste TED project lain tanpa disesuaikan", "Nama tabel, nomor CR, dan nama orang wajib diganti"],
], [0.5, 5, 4.5], {size: 17}));

b.push(H2("6. Cek Cepat Sebelum Submit"));
b.push(T(["☐", "Item"], [
  ["☐", "Tidak ada placeholder << ... >> yang tersisa"],
  ["☐", "Tidak ada teks sisa dari project lain (nama tabel, nomor CR, nama orang)"],
  ["☐", "Semua link (Figma, Swagger, evidence) sudah dicoba dan bisa dibuka"],
  ["☐", "Matriks C.0 terisi — 4 pilar dinyatakan Ada / Tidak ada"],
  ["☐", "Bagian D sudah dibaca ulang dengan sudut pandang Application Support"],
  ["☐", "Version History bertambah satu baris"],
  ["☐", "Klasifikasi dokumen sudah sesuai isi"],
  ["☐", "Ejaan dan typo sudah dicek"],
], [0.5, 9.5], {size: 17}));
b.push(BREAK());

/* ================= 0. IDENTITAS ================= */
b.push(H1("0.  IDENTITAS DOKUMEN"));
b.push(guide([
  "Diisi oleh Developer, diverifikasi Tech Lead.",
  {t: "Document Classification: pilih Confidential jika dokumen memuat detail infrastruktur, IP, atau data sensitif."},
  {t: "Document Status: Draft → In Review → Approved → Released."},
  {t: "Target Implementasi Production diisi sejak awal, bukan menunggu H-3."},
]));
b.push(T(["Field", "Isi"], [
  ["Document Type", "TED — << judul pengembangan >>"],
  ["Nomor TED", "TED-#XXXXX"],
  ["Judul", X],
  ["Aplikasi / Sistem", "<< mis. MAAS, EDC Management, Settlement >>"],
  ["Document Classification", "Internal  /  Confidential  /  Restricted"],
  ["Document Status", "Draft  /  In Review  /  Approved  /  Released"],
  ["Date", "DD MMMM YYYY"],
  ["Owner Group", X],
  ["Prepared by (Developer)", "<< nama + unit >>"],
  ["Tech Lead", X],
  ["Version Document", "V1.0"],
  ["Target Implementasi Production", "DD MMMM YYYY"],
], [3, 7], {size: 18}));

b.push(H2("0.1  Referensi Dokumen"));
b.push(guide([
  "Wajib diisi. Tanpa referensi, pembaca tidak bisa menelusuri asal-usul kebutuhan.",
  {t: "Cantumkan nomor CR/ticket di sini — bukan hanya muncul di Code Dependency."},
  {t: "Semua link wajib dicoba dulu; link expired = dokumen dikembalikan."},
]));
b.push(T(["Jenis Dokumen", "Nomor / Link", "Keterangan"], [
  ["Change Request / Ticket", "#XXXXX", ""],
  ["BRD / PRD", "", ""],
  ["Requirement (Flow / Screen / Report / API)", "REQ-XXX", ""],
  ["Desain UI (Figma)", "", ""],
  ["TSD / TED sebelumnya yang digantikan", "", ""],
  ["SIT / UAT Report", "", ""],
  ["CAB / Change Ticket", "", ""],
], [3.5, 4, 2.5], {size: 17}));

b.push(H2("0.2  Version History"));
b.push(guide([
  "Setiap perubahan dokumen WAJIB menambah satu baris. Jangan menimpa dokumen tanpa jejak.",
  {t: "V1.0 draft pertama · V1.x revisi hasil review · V2.0 perubahan scope signifikan · V-Final setelah production + PIV."},
]));
b.push(T(["Version", "Tanggal", "Update by", "Change Description", "IT Architecture", "IT Security", "Dual Control (Dev)", "Status"],
  [["V1.0", "", "", "Inisiasi", "☐", "☐", "☐", "Draft"], ["", "", "", "", "☐", "☐", "☐", ""], ["", "", "", "", "☐", "☐", "☐", ""]],
  [1, 1.2, 1.5, 2.6, 1.3, 1.1, 1.5, 1], {size: 15}));

b.push(H2("0.3  Daftar Istilah / Singkatan"));
b.push(guide([
  "Wajib diisi. Dokumen ini dibaca Application Support dan unit lain yang tidak familiar dengan singkatan internal tim.",
  {t: "Isi semua singkatan yang muncul di dokumen — termasuk nama modul dan kode program."},
]));
b.push(T(["Singkatan", "Kepanjangan / Arti"], [["MID", "Merchant ID"], ["", ""], ["", ""], ["", ""]], [2, 8], {size: 17}));
b.push(BREAK());

/* ================= A. EXECUTIVE SUMMARY ================= */
b.push(H1("A.  EXECUTIVE SUMMARY"));

b.push(H2("A.1  Background"));
b.push(guide([
  "Isi kondisi SAAT INI secara faktual, 1–2 paragraf. Jangan menceritakan solusi di sini — solusi tempatnya di A.3.",
  {t: "SALAH: \"Proses whitelist sekarang ribet dan bikin repot tim ops.\"", i: true},
  {t: "BENAR: \"Registrasi MID whitelist saat ini dilakukan via common code AUT1222, satu per satu. Rata-rata 40 MID/hari, ±3 menit per MID. Penghapusan data memerlukan patching oleh tim development.\"", i: true},
]));
b.push(fill("<< kondisi saat ini — faktual, dengan angka jika ada >>", 4));

b.push(H2("A.2  Problem Statement & Objective"));
b.push(guide([
  "Problem Statement: tulis masalahnya DENGAN ANGKA — berapa lama, berapa sering, berapa kali error.",
  "Objective: tulis hasil yang ingin dicapai secara TERUKUR, bukan kalimat normatif.",
  {t: "SALAH: \"Proses lambat\" → BENAR: \"Registrasi 40 MID memakan ±2 jam kerja per hari\"", i: true},
  {t: "SALAH: \"Mempermudah user\" → BENAR: \"User dapat mendaftarkan 500 MID sekaligus via bulk upload, tanpa patching untuk penghapusan\"", i: true},
]));
b.push(P("Problem Statement:", {bold: true, size: 18}));
b.push(fill("1. << masalah 1 — dengan angka >>\n2.\n3.", 3));
b.push(SP(60));
b.push(P("Objective:", {bold: true, size: 18}));
b.push(fill("1. << hasil yang ingin dicapai — terukur >>\n2.\n3.", 3));

b.push(H2("A.3  Solution Summary"));
b.push(guide([
  "Maksimal 5 kalimat. Ini bagian yang dibaca manajemen dan Application Support yang tidak membaca detail teknis.",
  {t: "Rumus: apa yang dibangun + menyentuh komponen apa + dampak utamanya apa."},
]));
b.push(fill("<< ringkasan solusi teknis, maksimal 5 kalimat >>", 3));

b.push(H2("A.4  High-Level Scope"));
b.push(guide([
  "Satu baris = satu requirement. Di sinilah ID requirement dibuat dan dipakai ulang di seluruh dokumen.",
  {t: "Kolom Proposed, Impact Area, dan Status TIDAK BOLEH KOSONG — ini kesalahan yang paling sering terjadi."},
  {t: "Impact Area pilih dari daftar baku: App / DB / Infra / Network / Security / External Party / Batch."},
  {t: "Status pilih dari: Not Started / In Progress / Done."},
]));
b.push(T(["ID", "Requirement / EPIC", "Deskripsi", "Existing Condition", "Proposed (To Be)", "Impact Area", "Ref. REQ", "Status"], [
  ["TED-XXXXX-R01", "", "", "", "", "", "REQ-XXX", ""],
  ["TED-XXXXX-R02", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
], [1.5, 1.6, 2.2, 1.5, 1.5, 1.1, 0.9, 0.9], {size: 15}));

b.push(H2("A.5  Out of Scope"));
b.push(guide([
  "Nyatakan eksplisit apa yang TIDAK dikerjakan. Bagian ini yang menyelamatkan Anda saat UAT dan saat serah terima.",
  {t: "Contoh: \"Tidak mencakup migrasi data whitelist existing dari AUT1222 — akan ditangani terpisah pada CR #XXXXX.\"", i: true},
]));
b.push(fill("1. << yang tidak dikerjakan >>\n2.", 3));

b.push(H2("A.6  External / Third-Party Dependency"));
b.push(guide([
  "Cek dulu: apakah perubahan ini menyentuh bank acquirer, switching (Jalin / Rintis / Artajasa), principal, atau partner?",
  {t: "Kalau ya, koordinasi dan notifikasi wajib dijadwalkan SEBELUM implementasi."},
  {t: "Kalau tidak ada, tulis eksplisit \"Tidak ada dependency eksternal\". Jangan dikosongkan."},
]));
b.push(T(["Pihak", "Bentuk Dependency", "Perlu Koordinasi?", "Perlu Notifikasi?", "PIC", "Status"], [
  ["", "", "Ya / Tidak", "Ya / Tidak", "", ""],
  ["", "", "", "", "", ""],
], [2.2, 2.8, 1.5, 1.5, 1.2, 0.8], {size: 16}));
b.push(BREAK());

/* ================= B. TECHNICAL SOLUTION ================= */
b.push(H1("B.  TECHNICAL SOLUTION"));

b.push(H2("B.1  Technology Vision"));
b.push(guide([
  "Jawab singkat dan konkret untuk keempat aspek — bukan kalimat normatif.",
  {t: "SALAH: Stability — \"Sistem harus stabil\"", i: true},
  {t: "BENAR: Stability — \"Menggunakan 2 node aktif di belakang load balancer; kegagalan 1 node tidak menghentikan layanan\"", i: true},
]));
b.push(T(["Aspect", "Description"], [
  ["Stability", "<< bagaimana solusi ini menjaga kestabilan layanan >>"],
  ["Scalability", "<< bagaimana solusi ini menangani pertumbuhan volume >>"],
  ["Security", "<< kontrol keamanan utama yang diterapkan >>"],
  ["Good User Experience", "<< bagaimana solusi ini mempermudah pengguna >>"],
], [2.5, 7.5], {size: 17}));

b.push(H2("B.2  Topology (High Level Architecture)"));
b.push(guide([
  "Diagram WAJIB disertai tabel penjelasan komponen.",
  {t: "Gambar tanpa narasi tidak diterima — pembaca tidak tahu mana yang baru dan mana yang tidak berubah."},
  {t: "Sertakan diagram as-is dan to-be jika arsitekturnya berubah."},
]));
b.push(fill("<< sisipkan diagram arsitektur di sini >>", 8));
b.push(SP(80));
b.push(P("Penjelasan komponen & alur data:", {bold: true, size: 18}));
b.push(T(["No", "Komponen", "Peran", "Berubah?", "Keterangan"], [
  ["1", "", "", "Baru / Diubah / Tidak berubah", ""],
  ["2", "", "", "", ""],
], [0.6, 2.2, 2.6, 2.2, 2.4], {size: 16}));

b.push(H2("B.3  Tech Stack / API Service Catalog / Platform"));
b.push(guide([
  "Cantumkan versi dan EOS Date — kolom EOS dipakai untuk tech-debt tracking.",
  {t: "Tandai mana yang baru dan mana yang sudah ada, agar reviewer tahu apa yang perlu di-assess."},
]));
b.push(T(["Type", "Category", "Technology", "Version", "EOS Date", "Baru / Existing"], [
  ["Code Base", "Programming Language", "", "", "", ""],
  ["Code Base", "Framework", "", "", "", ""],
  ["Database", "Database", "", "", "", ""],
  ["Infrastructure", "Container Platform", "", "", "", ""],
  ["Security Management", "Authentication", "", "", "", ""],
  ["Security Management", "Encryption", "", "", "", ""],
  ["Monitoring", "Monitoring / APM", "", "", "", ""],
], [1.7, 2.3, 2, 1.3, 1.4, 1.3], {size: 16}));

b.push(H2("B.4  Infrastructure Design"));
b.push(danger([
  "ATURAN KEAMANAN: cantumkan HANYA komponen atau server yang terdampak.",
  "JANGAN menyalin seluruh daftar server production beserta hostname dan IP ke dalam dokumen ini — rujuk ke CMDB / asset register.",
  "Jika detail IP benar-benar diperlukan, klasifikasi dokumen WAJIB dinaikkan menjadi Confidential / Restricted.",
]));
b.push(SP(60));
b.push(guide([
  "Kalau butuh resource atau firewall baru, tulis beserta STATUS PENGADAANNYA — supaya ketahuan sejak awal kalau itu akan jadi penghambat jadwal.",
]));
b.push(P("Komponen terdampak:", {bold: true, size: 18}));
b.push(T(["Komponen / Server (role)", "Fungsi", "Perubahan", "Ref. CMDB", "Perlu resource tambahan?"], [
  ["<< mis. APP-MAAS (2 node) >>", "", "Baru / Config change / Restart saja", "", "Ya << CPU/RAM/Storage >> / Tidak"],
  ["", "", "", "", ""],
], [2.4, 1.8, 2.4, 1.4, 2], {size: 16}));
b.push(SP(80));
b.push(P("Kebutuhan resource baru (jika ada):", {bold: true, size: 18}));
b.push(T(["Kebutuhan", "Spesifikasi", "Justifikasi", "Status Pengadaan"], [["", "", "", ""], ["", "", "", ""]], [2.4, 2.4, 3.2, 2], {size: 16}));
b.push(SP(80));
b.push(P("Firewall / Network request (jika ada):", {bold: true, size: 18}));
b.push(T(["Source", "Destination", "Port", "Protocol", "Justifikasi", "Status"], [["", "", "", "", "", ""], ["", "", "", "", "", ""]], [2, 2, 1, 1.3, 2.7, 1], {size: 16}));
b.push(BREAK());

module.exports = b;
