# 🔍 Gap Analysis — Template TED (Technical Engineering Document)

Review atas `TED_#21742` (Pengembangan Screen Whitelist MAAS, V1.0) sebagai **template** dan **contoh**.

**Konteks penilaian:** TED ini menggantikan TSD dan menjadi **dokumen serah terima ke Internal Developer + Application Support saat naik production**. Jadi kriteria utamanya bukan "apakah dokumen ini menjelaskan desain", tapi:

> **Bisakah App Support yang tidak ikut development menangani insiden jam 2 pagi hanya dengan dokumen ini?**

Dengan kriteria itu, template saat ini **belum lulus**.

---

## 📊 Ringkasan Penilaian

| Bagian | Status | Catatan |
|--------|--------|---------|
| A. Executive Summary | 🟡 Cukup | Background & objective OK, tapi tidak ada solution summary & out-of-scope |
| B. Technology Vision | 🔴 Kosong | 4 baris tanpa angka — tidak ada nilai |
| B. Topology / HLA | 🟡 Cukup | Ada, tapi tanpa penjelasan komponen & alur data |
| B. Tech Stack | 🟢 Baik | Format sudah rapi, EOS date bagus |
| B. Infrastructure Design | 🔴 Salah fokus | Dump 28 server + IP production, tapi tidak menunjuk mana yang terdampak |
| C. API Documentation | 🔴 Salah isi | Isinya layout file batch, bukan kontrak API |
| C. Database Schema | 🔴 Kosong | Hanya "lampiran diagram" — tabel baru tidak dispesifikasi |
| C. Impact Analysis | 🟡 Cukup | Struktur ada, tapi test scenario menumpuk jadi 1 sel |
| C. Reviewer Sign-off | 🟢 Baik | Impacted/Not Impacted per unit — ini kekuatan template |
| C. Code Dependency | 🟢 Baik | Versi Prod/Test/Dev per program — sangat berguna |
| C. Security Code Review | 🟡 Cukup | Area review ada, tapi checking item kosong semua |
| **Operasional / Runbook** | ⛔ **TIDAK ADA** | **Ini gap terbesar** |

---

## 🚨 GAP KRITIS — 5 Hal yang Harus Ditambahkan Sekarang

### 1. ⛔ Tidak ada bagian Operasional / Runbook (App Support tidak bisa pakai dokumen ini)

Dokumen ini dikirim ke Application Support, tapi **tidak ada satu pun** informasi yang dibutuhkan App Support:

| Yang dibutuhkan App Support | Ada di TED? |
|-----------------------------|-------------|
| Di mana lognya, pola log apa yang dicari | ❌ |
| Error code → penyebab → langkah penanganan | ❌ |
| Alert & threshold apa yang dipasang | ❌ |
| Job/batch/scheduler baru, jam jalan, apa efeknya kalau gagal | ❌ |
| Parameter/config per environment yang harus di-set | ❌ |
| Cara verifikasi sistem sehat setelah deploy | ❌ |
| Eskalasi ke siapa, jam berapa, nomor siapa | ❌ |
| Known limitation & workaround | ❌ |

**Dampak:** Setiap insiden akan tetap lari ke developer. Tujuan serah terima gagal total.

**Aksi:** Tambah **Bagian D — Operational Handover** (lihat template baru).

---

### 2. ⛔ "API Documentation" isinya bukan API

Template C.1 berisi kolom: `Path`, `File name`, `File type`, `Delimiter char`, `Header Field`, `Body Field`, `Trailer Field`.

Itu **spesifikasi layout file batch**, bukan kontrak API. Tidak ada tempat untuk menulis: method, endpoint, auth, request/response JSON, HTTP error code, timeout, retry, idempotency.

Akibatnya di contoh dokumen, section ini **dikosongkan seluruhnya** — padahal pengembangan ini jelas punya API (inquiry MID, save whitelist, bulk upload, export).

**Aksi:** Pecah menjadi dua sub-bagian terpisah:
- **C.1 API Contract** — untuk service online (REST/SOAP/ISO 8583)
- **C.2 File Interface / Batch Layout** — untuk file (pakai format lama, sudah benar untuk kasus file)

---

### 3. ⛔ Tidak ada Non-Functional Requirement dengan angka

`Technology Vision` hanya tabel 4 baris: Stability / Scalability / Security / Good User Experience — **semuanya kosong di contoh**.

Untuk payment processor, dokumen tanpa angka NFR tidak bisa dipakai untuk capacity planning maupun untuk menilai apakah insiden itu bug atau memang kapasitas habis.

**Yang wajib ada angkanya:**
- Volume transaksi/hari & TPS peak (+ jam peak)
- Target response time (p95/p99) per endpoint
- Concurrent user
- Proyeksi pertumbuhan data 12 bulan
- Target availability & RTO/RPO
- Retention & archiving data

**Aksi:** Ganti tabel "Technology Vision" menjadi **tabel NFR terukur** — kolom `Aspek | Target | Cara Ukur | Kondisi Saat Ini`.

---

### 4. ⛔ Database Schema kosong padahal ada tabel baru

Impact Analysis menyebut *"Membuat table baru untuk menyimpan data whitelist"* dan *"table temp"*, serta menyebut nama tabel `TBMCLVNRTLIST` di bagian testing. Tapi **struktur tabelnya tidak ada di mana pun** — hanya tertulis "Lampiran: Database Schema Diagram".

**Dampak:** App Support tidak bisa query manual saat insiden. DBA tidak bisa review index & growth. Tidak ada dasar untuk sizing storage.

**Aksi:** Wajibkan **DDL + kamus kolom + index + estimasi growth + retention policy** langsung di dokumen, bukan lampiran.

---

### 5. ⛔ Kontrol keamanan untuk fitur sensitif tidak dispesifikasi

Fitur ini mengizinkan user **menambah, mengubah, dan menghapus MID whitelist yang menentukan routing callback ke Mandiri** — termasuk **bulk upload** dan **delete**. Ini kontrol berisiko tinggi: salah routing = transaksi merchant nyasar.

Tapi dokumen tidak menyatakan:
- Role apa yang boleh add / edit / delete / bulk upload (access control matrix)
- Apakah ada **maker–checker / dual control** untuk delete & bulk upload
- Spesifikasi **audit trail**: fitur "change history" disebut sebagai fitur UI, tapi tidak ada spek apa yang disimpan (siapa, kapan, nilai lama → nilai baru, IP)
- Klasifikasi data (MID = data merchant, apakah masuk kategori sensitif)
- Batas maksimum baris bulk upload & validasi file (proteksi upload)

Section "Security Code Review" ada, tapi **kolom `Checking Item` kosong semua** dan diisi belakangan oleh IT Security — artinya developer tidak tahu standar yang harus dipenuhi saat coding.

**Aksi:** Tambah **Bagian Security & Access Control** yang diisi developer di awal (bukan IT Security di akhir), plus isi baku `Checking Item` sebagai checklist tetap.

---

## ⚠️ GAP PENTING — Perlu Ditambahkan

### 6. Tidak ada Deployment & Rollback Plan
`Downtime Required: Y/N` satu baris tidak cukup. Yang hilang: urutan deploy (DB script → backend → frontend → config → restart), estimasi durasi tiap langkah, **prosedur rollback yang dapat dieksekusi** (termasuk rollback DB — apakah tabel baru di-drop atau ditinggal?), titik *point of no return*, dan siapa yang mengeksekusi.

Kolom `Rollback Impact` di Code Dependency diisi `N/A` semua — itu tanda bagian ini belum dipikirkan.

### 7. Tidak ada Post-Implementation Verification (PIV)
Tidak ada checklist smoke test setelah deploy production: apa yang dicek, siapa yang cek, berapa lama monitoring intensif, kriteria "sukses" vs "trigger rollback". Untuk payment, ini wajib.

### 8. Test scenario menumpuk dalam satu sel tabel
Impact Analysis poin 6 berisi ~7 skenario testing dalam satu sel paragraf panjang tanpa struktur. Tidak bisa di-track, tidak bisa dijadikan bukti SIT/UAT.

**Aksi:** Pindah ke tabel terstruktur: `ID | Skenario | Precondition | Langkah | Expected | Env | Status | Link Evidence`, dan tambah referensi ke SIT/UAT report + sign-off UAT.

### 9. Tidak ada Risk & Mitigation table
Perubahan yang menyentuh routing callback production tanpa daftar risiko eksplisit. Perlu: `Risiko | Likelihood | Impact | Mitigasi | Contingency | Owner`.

### 10. Traceability terputus
`Requirement / EPIC` di High-Level Scope tidak punya ID unik. Impact Analysis punya placeholder `<<Epic/Requirement Code>>` tapi di contoh diisi angka `1..7` (nomor urut, bukan ID requirement).

**Dampak:** Saat insiden, App Support tidak bisa menelusuri "error di program SMC03F300R ini melayani requirement yang mana".

**Aksi:** Terapkan ID konsisten `TED-21742-R01` yang dipakai ulang di seluruh bagian: Scope → API → DB → Test → Code Dependency.

### 11. Tidak ada Out of Scope
Tidak ada pernyataan apa yang **tidak** dikerjakan. Ini sumber sengketa klasik saat UAT dan saat serah terima.

### 12. Tidak ada External / Third-Party Dependency
Perubahan routing callback berpotensi menyentuh pihak luar (bank acquirer, switching, partner). Tidak ada bagian yang menanyakan: apakah ada dependency eksternal, apakah butuh koordinasi/notifikasi, apakah ada perubahan kontrak/SLA.

### 13. Referensi dokumen tidak terhubung
Nomor CR `#22781` muncul di Code Dependency tapi tidak ada di header dokumen. Tidak ada link ke BRD/PRD, Jira epic, TSD lama yang digantikan, atau TED sebelumnya.

**Aksi:** Tambah tabel **Referensi Dokumen** di depan.

---

## 🔐 CATATAN RISIKO — Klasifikasi Dokumen

Dokumen diberi label **"Internal"**, tapi memuat:
- Daftar lengkap 28 server production
- **Hostname + IP address production**
- OS beserta versi rilis spesifik (mis. RHEL 9.3, 9.6, 9.8, HP-UX B.11.31)
- Fungsi tiap server (FEP, ESB, DB, WEB, APP)

Ini praktis adalah **peta serangan infrastruktur**, dan dokumen ini akan diedarkan luas sebagai dokumen serah terima.

**Rekomendasi tegas — 2 aksi:**
1. **Naikkan klasifikasi** menjadi `Confidential` / `Restricted` untuk dokumen yang memuat detail infrastruktur.
2. **Lebih baik lagi:** jangan dump seluruh server. Cantumkan **hanya komponen yang terdampak**, tanpa IP — dan rujuk ke CMDB/asset register untuk detailnya. Untuk pengembangan screen seperti contoh ini, daftar 28 server tidak memberi nilai apa pun.

---

## 📝 CATATAN KUALITAS — Dokumen Contoh Perlu Dibersihkan

Karena dokumen ini akan dipakai sebagai **contoh baku**, kesalahan di dalamnya akan direplikasi oleh 23 orang tim. Yang ditemukan:

| Tertulis | Seharusnya |
|----------|-----------|
| "agar dapat mendukung dapat mendukung" | duplikasi kata |
| "menjadi menjadi lambat" | duplikasi kata |
| "Exisitng" | Existing |
| "Code Depedency" | Code Dependency |
| "<<Epic / Requrement Code>>" | Requirement |
| "terlabih dahulu", "Masukin", "satu pesatu" | bahasa tidak formal / typo |
| "dalam pencairan data" | kemungkinan maksudnya "pencarian" |
| Penomoran `1, 3, 4, 5...` di Security Code Review | nomor 2 hilang |
| Penomoran `1, 2, 3, 3, 3, 3, 3` di Code Dependency | penomoran berulang |
| Baris `PRDESB05` muncul 2× di tabel server | duplikat data |
| Kolom `Proposed`, `Impact Area`, `Status` di High-Level Scope | kosong seluruhnya |
| Tanggal dokumen `26 Juni 2026` | perlu dicek (tanggal masa depan?) |

**Aksi:** Jadikan **quality gate** sebelum dokumen di-submit review (lihat `ted-handover-checklist.md`). Sebaiknya siapkan ulang satu dokumen contoh yang bersih sebagai *golden sample*.

---

## 🎯 Prioritas Eksekusi

Diurutkan berdasarkan **impact × urgency ÷ effort**:

| # | Aksi | Impact | Urgency | Effort | Prioritas |
|---|------|--------|---------|--------|-----------|
| 1 | Tambah **Bagian D — Operational Handover** (runbook, log, alert, troubleshooting, eskalasi) | 🔴 Tinggi | 🔴 Sekarang | Sedang | **P0** |
| 2 | Tambah **Deployment & Rollback Plan + PIV** | 🔴 Tinggi | 🔴 Sekarang | Rendah | **P0** |
| 3 | Perbaiki **C.1 API Contract** (pisahkan dari file layout) | 🔴 Tinggi | 🔴 Sekarang | Rendah | **P0** |
| 4 | Turunkan detail server produksi + naikkan klasifikasi dokumen | 🔴 Tinggi | 🔴 Sekarang | Rendah | **P0** |
| 5 | Wajibkan **DDL + kamus kolom** di Database Schema | 🟠 Sedang | 🔴 Sekarang | Rendah | **P1** |
| 6 | Ganti Technology Vision → **NFR terukur** | 🟠 Sedang | 🟠 Sprint ini | Rendah | **P1** |
| 7 | Tambah **Security & Access Control matrix + audit trail spec** | 🔴 Tinggi | 🟠 Sprint ini | Sedang | **P1** |
| 8 | Strukturkan **Test Scenario** ke tabel + link evidence SIT/UAT | 🟠 Sedang | 🟠 Sprint ini | Rendah | **P1** |
| 9 | Terapkan **ID traceability** `TED-xxxxx-Rnn` konsisten | 🟠 Sedang | 🟡 Bulan ini | Rendah | **P2** |
| 10 | Tambah **Risk & Mitigation**, **Out of Scope**, **External Dependency**, **Referensi Dokumen**, **Glossary**, **Daftar Isi** | 🟡 Rendah | 🟡 Bulan ini | Rendah | **P2** |
| 11 | Bersihkan typo & siapkan *golden sample* | 🟡 Rendah | 🟡 Bulan ini | Sedang | **P2** |

---

## ✅ Yang Sudah Bagus — Pertahankan

Jangan dibongkar, ini kekuatan template saat ini:

1. **Tabel Reviewer Sign-off per unit** dengan checkbox `Impacted / Not Impacted` + Notes + tanda tangan + tanggal. Ini memaksa setiap unit menyatakan posisi, bukan diam. Praktik yang bagus.
2. **Code Dependency dengan versi Prod / Test / Dev per program.** Ini yang paling sering hilang di dokumen serah terima dan sangat menolong saat rollback.
3. **Kolom EOS Date di Tech Stack.** Jarang ada, bagus untuk tech-debt tracking.
4. **Tabel Existing vs Expected** pada infrastructure & impact analysis — memaksa pembanding as-is/to-be.
5. **Version history dengan kolom Review by (IT Architecture / IT Security / Dual Control).** Sudah ada jalur kontrol, tinggal ditambah kolom tanggal & status approval.

---

## 📌 Asumsi yang Dipakai dalam Review Ini

1. TED **menggantikan TSD sepenuhnya**, bukan pelengkap — jadi seluruh kebutuhan serah terima harus tertampung di sini.
2. Pembaca utama adalah **Internal Developer + Application Support**, dengan reviewer lintas unit (Infra, Security, Architecture, GRC).
3. Perusahaan sudah punya **CMDB / asset register** terpisah, sehingga detail server tidak perlu diduplikasi di TED.
4. Sudah ada proses **Change Management / CAB** terpisah — TED menjadi lampiran teknis, bukan pengganti form CR.
5. Bukti SIT/UAT disimpan di tool terpisah (Jira/TestRail/shared drive) — TED cukup memuat **link + status**, bukan seluruh evidence.
