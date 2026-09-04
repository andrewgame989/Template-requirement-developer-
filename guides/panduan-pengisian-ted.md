# 📖 Panduan Pengisian TED — Untuk Tim Developer

Panduan ini menjelaskan **cara mengisi** [`templates/5-ted-template.md`](../templates/5-ted-template.md) agar seluruh developer menghasilkan dokumen yang **seragam, rapi, dan benar**.

Baca ini **sebelum** mulai mengisi. Waktu baca: ±15 menit. Menghemat 2 putaran revisi.

---

## 1. Prinsip Dasar — Hafalkan 6 Aturan Ini

| # | Aturan | Artinya |
|---|--------|---------|
| 1 | **Tulis untuk orang yang tidak ikut project** | Pembacanya App Support & developer lain 6 bulan lagi. Bukan Anda hari ini. |
| 2 | **Fakta, bukan opini** | "Response 3–5 detik" ✅ — "agak lambat" ❌ |
| 3 | **Tidak boleh kosong** | Tidak relevan → tulis `N/A` **beserta alasannya**. `N/A` polos = dikembalikan. |
| 4 | **Satu ide satu baris** | Jangan menumpuk 7 skenario dalam satu sel tabel. |
| 5 | **Bukan hanya happy path** | Setiap flow, API, dan test wajib punya kondisi gagal. |
| 6 | **ID konsisten dari atas ke bawah** | Satu requirement dilacak dari Scope sampai Runbook pakai ID yang sama. |

> **Uji akhir sebelum submit:** *Bisakah App Support menangani insiden jam 2 pagi hanya dengan dokumen ini, tanpa menelepon saya?*
> Kalau jawabannya "tidak", dokumen belum selesai.

---

## 2. Siapa Mengisi Apa (RACI)

| Bagian | Pengisi | Reviewer | Approver |
|--------|---------|----------|----------|
| 0. Identitas & Referensi | Developer | Tech Lead | — |
| A. Executive Summary | Developer + Product/BA | Tech Lead | Product Mgmt |
| B. Technical Solution | Tech Lead | IT Architecture | IT Architecture |
| B.4 Infrastructure | Developer + Infra | IT Infra & Ops | IT Infra & Ops |
| C.1 Flow Process | Developer | Tech Lead | — |
| C.2 UI / Screen | Frontend Dev | Tech Lead + Product | — |
| C.3 API Contract | Backend Dev | Tech Lead | — |
| C.4 File / Batch | Developer | Tech Lead | — |
| C.5 Database Design | Developer | DBA | DBA |
| C.6 Security & Access Control | **Developer** (bukan IT Security) | IT Security | IT Security |
| C.7 Impact Analysis | Tech Lead | Semua unit terdampak | — |
| C.8 Code Dependency | Developer | Tech Lead | — |
| C.9 Security Code Review | **IT Security** | — | IT Security |
| D. Operational Handover | Developer | **Application Support** | **Application Support** |
| E. Deployment & Rollback | Tech Lead + Infra | IT Infra & Ops | Tech Lead |
| F. Testing | Developer + QA | QA Lead | User (UAT) |
| G. Risk & Mitigation | Tech Lead | GRC | Tech Lead |
| H. Approval | — | — | Semua unit |

> ⚠️ **C.6 diisi developer di awal, bukan IT Security di akhir.** IT Security me-*review*, bukan mengarang. Kalau developer tidak menuliskan kontrol keamanannya, artinya kontrol itu memang belum dipikirkan saat coding.

---

## 3. Kapan Diisi (Timeline)

```
Saat development dimulai   -> Bagian 0, A, B, C   (isi sambil coding, jangan ditunda)
Development selesai        -> Bagian F (Testing), C.8 (Code Dependency versi)
H-14 sebelum production    -> Submit draft, Tech Lead cek Gate 1-3
H-10                       -> Review lintas unit (C.7 sign-off Impacted/Not Impacted)
H-7                        -> Handover session, App Support cek Bagian D
H-5                        -> Finalisasi Bagian E (Deployment & Rollback)
H-3                        -> SIT/UAT sign-off masuk ke Bagian F
H-2                        -> Keputusan APPROVED / HOLD
H-0                        -> Implementasi + PIV (E.4)
H+3                        -> TED difinalkan ke versi final, distribusi
```

**Kesalahan paling umum:** TED baru ditulis H-3 sebagai formalitas. Hasilnya asal isi, dan App Support menolak menerima. **Isi sambil coding.**

---

## 4. Konvensi Wajib

### 4.1 Penamaan file
```
TED-<nomor CR>-<nama-singkat>-V<versi>.docx
Contoh: TED-21742-whitelist-routing-maas-V1.0.docx
```

### 4.2 ID Requirement — kunci traceability
Format: **`TED-<nomor>-R<nn>`** → contoh `TED-21742-R01`

ID ini dibuat di **A.4 High-Level Scope**, lalu **dipakai ulang** di:

```
A.4 Scope  ->  C.1 Flow  ->  C.2 UI  ->  C.3 API  ->  C.4 File
           ->  C.5 DB    ->  C.7 Impact  ->  C.8 Code Dependency  ->  F.1 Test
```

**Kenapa penting:** saat insiden, App Support melihat error di program `SMC03F300R` dan harus bisa langsung tahu itu melayani requirement yang mana, screen mana, dan test case mana. Tanpa ID, penelusuran ini mustahil.

### 4.3 Versi dokumen

| Versi | Kapan |
|-------|-------|
| V1.0 | Draft pertama |
| V1.1, V1.2 | Revisi hasil review (isi Version History + tanggal) |
| V2.0 | Perubahan scope/desain yang signifikan |
| V-Final | Setelah production + PIV selesai |

**Setiap perubahan wajib menambah baris di Version History.** Jangan menimpa dokumen tanpa jejak.

### 4.4 Klasifikasi dokumen

| Isi dokumen | Klasifikasi |
|-------------|-------------|
| Desain aplikasi biasa | `Internal` |
| Memuat hostname / IP / detail server / topologi jaringan | **`Confidential`** |
| Memuat data kartu, kunci enkripsi, kredensial | **`Restricted`** |

> Aturan praktis: **jangan** menyalin daftar server production beserta IP ke dalam TED. Cantumkan hanya komponen terdampak dan rujuk CMDB. Kalau memang harus, naikkan klasifikasinya.

---

## 5. Cara Mengisi Per Bagian

### A.1 Background
**Isi:** kondisi saat ini secara faktual, 1–2 paragraf.
**Jangan:** menceritakan solusi di sini. Solusi tempatnya di A.3.

| ❌ Salah | ✅ Benar |
|---------|---------|
| "Proses whitelist sekarang ribet dan bikin repot tim ops." | "Registrasi MID whitelist saat ini dilakukan via common code AUT1222, satu per satu. Rata-rata 40 MID/hari, ±3 menit per MID. Penghapusan data memerlukan patching oleh tim development." |

### A.2 Problem Statement & Objective
**Isi:** masalah **dengan angka**, lalu objective yang **terukur**.

| ❌ Salah | ✅ Benar |
|---------|---------|
| "Proses lambat" | "Registrasi 40 MID memakan ±2 jam kerja/hari" |
| "Mempermudah user" | "User dapat mendaftarkan 500 MID sekaligus via bulk upload, tanpa patching untuk penghapusan" |

### A.3 Solution Summary
**Isi:** maksimal **5 kalimat**. Ini yang dibaca manajemen dan App Support yang tidak membaca detail teknis.
**Rumus:** *apa yang dibangun* + *menyentuh komponen apa* + *dampak utamanya apa*.

### A.4 High-Level Scope
Satu baris = satu requirement. Kolom `Proposed`, `Impact Area`, `Status` **tidak boleh kosong** — ini kesalahan yang paling sering terjadi di dokumen lama.

`Impact Area` pilih dari daftar baku: `App` / `DB` / `Infra` / `Network` / `Security` / `External Party` / `Batch`.

### A.5 Out of Scope
**Isi apa yang TIDAK dikerjakan.** Bagian ini yang menyelamatkan Anda saat UAT.

Contoh: *"Tidak mencakup migrasi data whitelist existing dari AUT1222 — akan ditangani terpisah pada CR #XXXXX."*

### A.6 External Dependency
Kalau tidak ada, tulis eksplisit **"Tidak ada dependency eksternal"**. Jangan dikosongkan.

Untuk kasus payment, cek dulu: apakah perubahan ini menyentuh bank acquirer, switching (Jalin/Rintis/Artajasa), principal, atau partner? Kalau ya, **koordinasi dan notifikasi harus dijadwalkan sebelum implementasi.**

---

### B.1 Technology Vision
Empat aspek, jawab singkat dan konkret — bukan kalimat normatif.

| ❌ Salah | ✅ Benar |
|---------|---------|
| Stability: "Sistem harus stabil" | Stability: "Menggunakan 2 node aktif di belakang load balancer; kegagalan 1 node tidak menghentikan layanan" |

### B.2 Topology
**Diagram wajib disertai tabel penjelasan komponen.** Gambar tanpa narasi tidak diterima — pembaca tidak tahu mana yang baru dan mana yang tidak berubah.

### B.4 Infrastructure Design
Cantumkan **hanya komponen terdampak**. Kalau butuh resource/firewall baru, tulis beserta **status pengadaannya** — supaya ketahuan sejak awal kalau itu akan jadi penghambat jadwal.

---

### C. Detail Design — Bagian Terpenting

**Bagian C wajib memuat 4 pilar sepanjang hal itu ada** pada pengembangan Anda:

```
Ada alur proses / langkah bisnis yang berubah?  -> WAJIB isi C.1 Flow Process
Ada layar yang dilihat user?                    -> WAJIB isi C.2 UI / Screen
Ada endpoint / service online?                  -> WAJIB isi C.3 API Contract
Ada file yang dikirim / diterima / diupload?    -> WAJIB isi C.4 File / Batch
```

**Isi dulu matriks C.0.** Setiap pilar dinyatakan `Ada` atau `Tidak ada` **beserta alasannya**. Kosong tanpa keterangan = dokumen dikembalikan.

> Satu pengembangan biasanya punya **lebih dari satu** pilar. Contoh fitur "Whitelist Routing": Flow (proses registrasi & routing) + UI (screen whitelist) + API (inquiry, save, bulk, export) + File (template bulk upload Excel). Keempatnya harus ada.

#### C.1 Flow Process
- **Diagram wajib** (flowchart/BPMN/swimlane/sequence). Diagram tanpa narasi ❌, narasi tanpa diagram ❌.
- Tabel langkah: satu baris satu step.
- **Decision point** ditulis eksplisit: "jika … maka …".
- **Exception wajib minimal 3**: timeout ke service lain, data tidak ditemukan, validasi gagal. Untuk tiap exception jawab: data ter-rollback atau tidak, boleh retry atau tidak.
- Kalau ada status, isi tabel transisi status — termasuk siapa yang boleh mengubah dan apakah reversible.

#### C.2 UI / Screen
- **Link Figma wajib aktif dan bisa diakses.** Link yang expired = dokumen dikembalikan.
- Daftar field: setiap field harus punya **sumber data**, **validasi**, dan **pesan error**.
- Setiap tombol dipetakan ke **API mana** (rujuk ID di C.3). Tombol tanpa mapping = celah requirement.
- **Semua state harus dijelaskan** — normal, loading, empty, error, success, tanpa hak akses. State yang paling sering dilupakan: *empty* dan *tanpa hak akses*.
- Hak akses per role wajib diisi, walaupun semua role sama.

#### C.3 API Contract
- Satu blok untuk **setiap** endpoint.
- **Response error wajib lengkap**, bukan hanya 200. Minimal: 400 (validasi), 401/403 (auth), 404, 500, dan timeout.
- Kolom **"Aksi App Support"** pada tabel error adalah yang paling berharga — isi dengan apa yang harus dilakukan support kalau error ini muncul di production.
- Lampirkan **Swagger/Postman**. Tabel di dokumen adalah ringkasan, bukan pengganti spesifikasi.
- Jangan lupa: timeout, retry policy, idempotency. Tiga hal ini yang bikin insiden double-posting di dunia payment.

#### C.4 File / Batch
- Tulis **arah** (inbound/outbound) dan **lawan transaksi**.
- **Pattern nama file** harus pasti (`WHITELIST_YYYYMMDD.csv`), bukan "nama file bebas".
- Wajib jelaskan **penanganan file gagal/reject**: dipindah ke folder mana, siapa yang dinotifikasi.
- Sertakan **contoh isi file 3 baris** (header, body, trailer). Ini menghemat berjam-jam debugging.

#### C.5 Database Design
- **DDL wajib ada di dalam dokumen**, bukan "lampiran diagram". App Support butuh ini untuk query manual saat insiden.
- Kamus kolom lengkap: tipe, panjang, null, PK/FK, default, keterangan.
- Setiap index wajib punya **justifikasi** — index tanpa alasan biasanya index yang salah.
- **Estimasi growth + retention + purging wajib diisi.** Tabel yang tumbuh tanpa purging adalah insiden yang dijadwalkan.
- **Script rollback DB wajib ada.** Kalau tabel baru tidak di-drop saat rollback, tulis alasannya.

#### C.6 Security & Access Control
Diisi developer. Yang paling sering dilewatkan:
- **Access control matrix per role** — siapa boleh add/edit/delete/bulk/export.
- **Maker–checker** untuk aksi berisiko (delete, bulk upload, ubah konfigurasi routing). Kalau memutuskan tidak pakai, **tulis justifikasinya** — itu keputusan sadar, bukan kelalaian.
- **Spesifikasi audit trail**: siapa, kapan, IP, **nilai lama → nilai baru**, disimpan di tabel apa, retensi berapa lama. Fitur "change history" di UI bukan audit trail sampai speknya ditulis.
- **Klasifikasi data + masking.** Aturan mutlak: **data sensitif tidak boleh ikut ter-log.**
- Kalau menyentuh data kartu (PAN/CVV/track), rujuk kontrol **PCI-DSS** dan libatkan IT Security **sebelum** coding, bukan sesudah.

#### C.7 Impact Analysis
- Rujuk ID requirement di setiap baris.
- Aspek yang wajib dicek satu per satu: Aplikasi, Database, Integrasi, Batch, Konfigurasi, Report/Rekonsiliasi, Downtime.
- **Jangan menaruh skenario testing di sini** — tempatnya di F.1.
- Tabel sign-off lintas unit: setiap unit **wajib** memilih `Impacted` atau `Not Impacted`. Kosong = belum direview.

#### C.8 Code Dependency
- Isi versi Prod/Test/Dev per program — ini yang paling menolong saat rollback.
- Tambahkan **repository + branch/tag**.
- `Rollback Impact` **dilarang diisi `N/A` massal**. Jelaskan apa yang terjadi kalau program ini di-rollback sendirian.
  Contoh benar: *"Harus rollback bersama SMC03F300R karena kontrak request berubah."*

---

### D. Operational Handover — Bagian yang Menentukan Serah Terima Diterima atau Tidak

Bagian ini **dinilai oleh Application Support**, bukan oleh Anda. Kalau mereka bilang belum cukup, artinya belum cukup.

| Sub | Kunci pengisian |
|-----|-----------------|
| **D.1 Config** | Sebutkan **lokasi** (file/tabel/common code), nilai per environment, dan **efek kalau salah**. |
| **D.2 Batch** | Kalau tidak ada, tulis **"Tidak ada"**. Kalau ada: jadwal, durasi normal, dependency, cara rerun, **aman di-rerun atau tidak**. |
| **D.3 Monitoring** | Alert harus **sudah terpasang**, bukan rencana. Sebutkan path/index log dan **pola pencarian** konkret. |
| **D.4 Troubleshooting** | **Minimal 5 skenario.** Tiap baris menyatakan: boleh ditangani App Support sendiri, atau eskalasi. |
| **D.5 Known Limitation** | Tulis apa adanya. Limitasi yang disembunyikan akan jadi insiden tanpa penjelasan. |
| **D.6 Eskalasi** | Nama + kontak + SLA respon. Bukan hanya nama tim. |
| **D.7 Serah Terima Akses** | Akses App Support **sudah diberikan dan sudah dicoba**, bukan baru diajukan. |

**Cara menulis D.4 yang benar:**

| ❌ Salah | ✅ Benar |
|---------|---------|
| Gejala: "Error saat upload" · Penanganan: "Cek log" | Gejala: `ERR-WL-004 Invalid file format` · Penyebab: file bukan .xlsx atau kolom tidak sesuai template · Verifikasi: cek log `app-maas.log`, cari `ERR-WL-004` + correlation ID · Penanganan: minta user download ulang template dari menu, upload ulang · App Support sendiri: **Ya** · Eskalasi jika: error tetap muncul dengan template resmi → L2 Backend |

---

### E. Deployment & Rollback

- **E.2 urutan deploy**: setiap step punya executor, estimasi, dan **cara verifikasi step itu berhasil**. Tandai **point of no return**.
- **E.3 rollback plan dilarang diisi `N/A`.** Kriteria trigger harus **objektif** — contoh: *"error rate > 5% dalam 15 menit"*, bukan *"kalau bermasalah"*. Tetapkan juga **batas waktu keputusan rollback**.
- Jawab pertanyaan ini: **data yang masuk setelah deploy, bagaimana kalau rollback?** Ini pertanyaan yang paling sering terlewat dan paling mahal akibatnya.
- **E.4 PIV wajib punya PIC per item.** Checklist tanpa nama = tidak ada yang mengerjakan.

---

### F. Testing

- **Satu baris satu skenario.** Jangan menumpuk paragraf panjang dalam satu sel — itu tidak bisa dilacak dan tidak sah sebagai bukti UAT.
- Wajib ada **skenario negatif** dan **regresi terhadap fungsi existing**. Yang paling sering bikin insiden bukan fitur barunya, tapi fitur lama yang ikut rusak.
- Link evidence harus bisa diakses reviewer.
- Open defect yang dibawa ke production **wajib tercatat** beserta alasan diterima dan workaround-nya.

---

### G. Risk & Mitigation
Isi minimal 3 risiko nyata. Bedakan dengan jelas:
- **Mitigasi** = apa yang dilakukan supaya risiko tidak terjadi
- **Contingency** = apa yang dilakukan kalau risiko terlanjur terjadi

Setiap risiko wajib punya **owner bernama**, bukan nama tim.

---

## 6. Kata & Frasa Terlarang

Kata-kata ini ambigu dan wajib diganti dengan angka atau kondisi konkret:

| Terlarang | Ganti dengan |
|-----------|--------------|
| "cepat", "lambat" | angka dalam detik/ms |
| "banyak", "sedikit" | jumlah record |
| "sesuai kebutuhan" | sebutkan kebutuhannya |
| "seperti biasa", "seperti existing" | jelaskan seperti apa persisnya |
| "kurang lebih", "sekitar" | rentang pasti (min–maks) |
| "jika diperlukan" | siapa yang menentukan, kapan |
| "akan disesuaikan nanti" | tentukan sekarang, atau tulis sebagai Open Item + PIC + deadline |
| "user tinggal klik saja" | tuliskan langkahnya |
| "sudah aman" | sebutkan kontrol keamanan spesifiknya |
| "N/A" tanpa alasan | `N/A — <alasan>` |

---

## 7. 10 Kesalahan yang Paling Sering Terjadi

1. **TED ditulis H-3 sebagai formalitas.** → Isi sambil coding.
2. **Kolom `Status`, `Impact Area`, `Proposed` dikosongkan.** → Semua wajib.
3. **`Rollback Impact` diisi `N/A` semua.** → Tanda bagian ini belum dipikirkan.
4. **Skenario testing ditumpuk jadi satu paragraf.** → Satu baris satu skenario.
5. **Menyalin seluruh daftar server production beserta IP.** → Hanya komponen terdampak, rujuk CMDB.
6. **DB schema hanya ditulis "lampiran diagram".** → DDL + kamus kolom wajib di dalam dokumen.
7. **Hanya happy path.** → Exception, error code, dan regresi wajib ada.
8. **Bagian D dikosongkan atau diisi asal.** → Ini justru alasan utama TED ada.
9. **Link Figma/Swagger sudah expired.** → Cek ulang sebelum submit.
10. **Copy-paste TED project lain tanpa disesuaikan.** → Nama tabel, IP, atau nomor CR project lama ikut terbawa. Ini sering terjadi dan memalukan saat review.

---

## 8. Sebelum Submit — Cek Cepat 2 Menit

- [ ] Tidak ada `<<placeholder>>` atau `<...>` yang tersisa
- [ ] Tidak ada teks sisa dari project lain (nama tabel, nomor CR, nama orang)
- [ ] Semua link (Figma, Swagger, evidence) sudah dicoba dan bisa dibuka
- [ ] Matriks C.0 terisi — 4 pilar dinyatakan `Ada`/`Tidak ada`
- [ ] Bagian D sudah dibaca ulang **dengan sudut pandang App Support**
- [ ] Version History bertambah satu baris
- [ ] Klasifikasi dokumen sesuai isi
- [ ] Ejaan & typo sudah dicek (dokumen ini jadi rujukan resmi)

Setelah semua ✅, submit ke Tech Lead dan lanjut ke [Handover Checklist](ted-handover-checklist.md).

---

## 9. Ringkasan Satu Halaman

```
ISI SAMBIL CODING, BUKAN H-3.

Bagian C wajib 4 pilar (sepanjang ada):
  C.1 Flow  |  C.2 UI  |  C.3 API  |  C.4 File
  -> isi matriks C.0 dulu, nyatakan Ada / Tidak ada + alasan

Bagian yang paling sering gagal review:
  C.5 Database  -> DDL wajib di dalam dokumen
  C.6 Security  -> diisi developer, bukan IT Security
  D. Operational -> dinilai App Support, bukan developer
  E.3 Rollback  -> dilarang N/A

ID TED-xxxxx-Rnn dipakai dari Scope sampai Runbook.

Uji akhir: bisakah App Support menangani insiden jam 2 pagi
           hanya dengan dokumen ini?
```
