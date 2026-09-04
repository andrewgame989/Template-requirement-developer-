<!--
  TEMPLATE 5 — TED (Technical Engineering Document)
  Pengganti TSD. Diisi oleh: Developer / Tech Lead.
  Pembaca: Internal Developer + Application Support + reviewer lintas unit.
  Fungsi: dokumen serah terima teknis saat project naik PRODUCTION.

  ATURAN:
  - Bagian bertanda (WAJIB) tidak boleh kosong. Jika benar-benar tidak relevan,
    tulis "N/A" DISERTAI alasan singkat. "N/A" tanpa alasan = dokumen dikembalikan.
  - Gunakan ID requirement TED-<no>-Rnn secara konsisten di SELURUH bagian
    (Scope -> API -> DB -> Test -> Code Dependency -> Runbook).
  - Bagian D (Operational Handover) adalah syarat mutlak serah terima ke App Support.
-->

# 📘 Technical Engineering Document (TED)

## 0. Identitas Dokumen (WAJIB)

| Field | Isi |
|-------|-----|
| **Nomor TED** | TED-#XXXXX |
| **Judul** | `<nama pengembangan>` |
| **Aplikasi / Sistem** | `<mis. MAAS, EDC Management, Settlement>` |
| **Document Classification** | Internal / **Confidential** / Restricted — *pilih Confidential jika memuat detail infrastruktur, IP, atau data sensitif* |
| **Document Status** | Draft / In Review / Approved / Released |
| **Tanggal** | YYYY-MM-DD |
| **Owner Group** | `<group pemilik produk>` |
| **Prepared by (Dev)** | `<nama + unit>` |
| **Tech Lead** | `<nama>` |
| **Version** | V1.0 |
| **Target Implementasi Production** | YYYY-MM-DD |

### 0.1 Referensi Dokumen (WAJIB)

| Jenis | Nomor / Link | Keterangan |
|-------|--------------|------------|
| Change Request / Ticket | `#XXXXX` | |
| BRD / PRD | `<link>` | |
| Requirement (Flow/Screen/Report/API) | `REQ-XXX` | template 1–4 di repo ini |
| Desain UI (Figma) | `<link>` | |
| TSD / TED sebelumnya yang digantikan | `<nomor>` | |
| SIT / UAT Report | `<link>` | |
| CAB / Change Ticket | `<nomor>` | |

### 0.2 Version History (WAJIB)

| Version | Tanggal | Update by | Change Description | IT Architecture | IT Security | Dual Control (Dev) | Status |
|---------|---------|-----------|--------------------|-----------------|-------------|--------------------|--------|
| V1.0 | YYYY-MM-DD | | Inisiasi | ☐ | ☐ | ☐ | Draft |

### 0.3 Daftar Istilah / Singkatan (WAJIB)

> Wajib diisi. Dokumen ini dibaca App Support & unit lain yang tidak familiar dengan singkatan internal tim.

| Singkatan | Kepanjangan / Arti |
|-----------|--------------------|
| MID | Merchant ID |
| | |

---

# A. Executive Summary

## A.1 Background (WAJIB)
`<kondisi saat ini, 1–2 paragraf. Faktual, tanpa opini.>`

## A.2 Problem Statement & Objective (WAJIB)

**Problem Statement:**
1. `<masalah 1 — sedapat mungkin dengan angka: berapa lama, berapa sering, berapa kali error>`
2.

**Objective:**
1. `<hasil yang ingin dicapai — terukur>`
2.

## A.3 Solution Summary (WAJIB — BARU)
> Ringkasan solusi teknis dalam **maksimal 5 kalimat**, untuk pembaca manajemen & App Support yang tidak membaca detail teknis.

`<apa yang dibangun, menyentuh komponen apa, dampak utamanya apa>`

## A.4 High-Level Scope (WAJIB)

| ID | Requirement / EPIC | Deskripsi | Existing Condition | Proposed (To Be) | Impact Area | Ref. Requirement | Status |
|----|--------------------|-----------|--------------------|------------------|-------------|------------------|--------|
| TED-XXXXX-R01 | | | | | App / DB / Infra / Security / External | REQ-XXX | Not Started / In Progress / Done |

> **Aturan:** kolom `Proposed`, `Impact Area`, dan `Status` **tidak boleh kosong**.
> `Impact Area` pilih dari: `App` / `DB` / `Infra` / `Network` / `Security` / `External Party` / `Batch`.

## A.5 Out of Scope (WAJIB — BARU)
> Nyatakan eksplisit apa yang **tidak** dikerjakan. Bagian ini mencegah sengketa saat UAT & serah terima.

1. `<mis. tidak mencakup migrasi data whitelist lama dari common code AUT1222>`
2.

## A.6 External / Third-Party Dependency (WAJIB — BARU)

| Pihak | Bentuk Dependency | Perlu Koordinasi? | Perlu Notifikasi? | PIC | Status |
|-------|-------------------|-------------------|-------------------|-----|--------|
| `<bank acquirer / switching / partner / vendor>` | `<API, file, sertifikat, konfigurasi>` | Ya/Tidak | Ya/Tidak | | |

> Tulis **"Tidak ada dependency eksternal"** secara eksplisit jika memang tidak ada.

---

# B. Technical Solution

## B.1 Non-Functional Requirement (WAJIB — MENGGANTIKAN "Technology Vision")

> Tabel ini **wajib berisi angka**. Tanpa angka, tidak ada dasar capacity planning dan App Support tidak bisa membedakan bug vs kapasitas habis.

| Aspek | Target | Cara Ukur / Sumber | Kondisi Saat Ini |
|-------|--------|--------------------|------------------|
| Volume harian | `<n transaksi/record per hari>` | | |
| TPS peak & jam peak | `<n TPS, jam HH:MM–HH:MM>` | | |
| Response time (p95) | `< n ms` | APM | |
| Response time (p99) | `< n ms` | APM | |
| Concurrent user | `<n user>` | | |
| Availability target | `<99.x%>` | | |
| RTO / RPO | `<n menit / n menit>` | | |
| Proyeksi pertumbuhan data 12 bln | `<n row, n GB>` | | |
| Retention & archiving | `<n bulan aktif, lalu archive/purge>` | | |
| Batas maksimum (bulk upload / export) | `<n baris per file, n MB>` | | |

## B.2 Topology / High Level Architecture (WAJIB)

`<diagram>`

**Penjelasan komponen & alur data (WAJIB):**

| No | Komponen | Peran | Berubah? | Keterangan |
|----|----------|-------|----------|------------|
| 1 | | | Baru / Diubah / Tidak berubah | |

## B.3 Tech Stack / Platform (WAJIB)

| Type | Category | Technology | Version | EOS Date | Baru/Existing |
|------|----------|------------|---------|----------|---------------|
| Code Base | Programming Language | | | | |
| Database | Database | | | | |
| Infrastructure | Container Platform | | | | |
| Security Management | Authentication | | | | |
| Monitoring | APM | | | | |

## B.4 Infrastructure Design (WAJIB)

> ⚠️ **Aturan keamanan:** cantumkan **hanya komponen/server yang terdampak**. **Jangan** menyalin seluruh daftar server production beserta IP ke dalam dokumen ini — rujuk ke CMDB / asset register. Jika detail IP benar-benar diperlukan, klasifikasi dokumen **wajib** dinaikkan menjadi `Confidential`/`Restricted`.

**Komponen terdampak:**

| Komponen / Server (role) | Fungsi | Perubahan | Ref. CMDB | Perlu resource tambahan? |
|--------------------------|--------|-----------|-----------|--------------------------|
| `<mis. APP-MAAS (2 node)>` | | Baru / Config change / Restart saja | `<id>` | Ya `<CPU/RAM/Storage>` / Tidak |

**Kebutuhan resource baru (jika ada):**

| Kebutuhan | Spesifikasi | Justifikasi | Status Pengadaan |
|-----------|-------------|-------------|------------------|
| | | | |

**Firewall / Network request (jika ada):**

| Source | Destination | Port | Protocol | Justifikasi | Status |
|--------|-------------|------|----------|-------------|--------|
| | | | | | |

---

# C. Detail Design

## C.1 API Contract (WAJIB — jika ada service online)

> Isi bagian ini untuk **setiap** endpoint/service. Untuk interface berbasis **file**, gunakan C.2.
> Lampirkan **OpenAPI/Swagger atau Postman collection** — link wajib.

**Ref. Requirement:** `TED-XXXXX-Rnn` &nbsp;&nbsp; **Spesifikasi:** `<link Swagger/Postman>`

### `<API Name>`

| Properti | Isi |
|----------|-----|
| Method & Path | `POST /api/v1/...` |
| Jenis | REST / SOAP / ISO 8583 / gRPC |
| Consumer | `<siapa yang memanggil>` |
| Provider | `<service penyedia>` |
| Autentikasi | `<OAuth2 / API Key / mTLS>` |
| Otorisasi (role) | |
| Idempotent? | Ya (key: `<header>`) / Tidak |
| Timeout | `<n detik>` |
| Retry policy | `<n kali, backoff, atau tidak ada>` |
| Rate limit / TPS | |
| Sifat | Sinkron / Asinkron |

**Request Field:**

| Field | Tipe | Length | Wajib? | Validasi | Contoh | Keterangan |
|-------|------|--------|--------|----------|--------|------------|
| | | | Y/N | | | |

**Response Sukses:**

| Field | Tipe | Length | Keterangan |
|-------|------|--------|------------|
| | | | |

**Response Error (WAJIB lengkap, bukan hanya happy path):**

| HTTP Code | Error Code | Kondisi Pemicu | Pesan ke User | Aksi App Support |
|-----------|------------|----------------|---------------|------------------|
| 400 | | | | |
| 401 | | | | |
| 500 | | | | |

**Contoh Request / Response:**
```json
// Request

// Response Sukses

// Response Error
```

## C.2 File Interface / Batch Layout (WAJIB — jika ada interface file)

### `<File Name>`

| Properti | Isi |
|----------|-----|
| Path | |
| File name pattern | `<mis. WHITELIST_YYYYMMDD.csv>` |
| File type | |
| Delimiter char | |
| Encoding | |
| Frekuensi / Jadwal | |
| Encryption / PGP | Ya/Tidak |
| Retention file | |

**Header Field / Body Field / Trailer Field:**

| Section | Name | Data Type | Data Length | Mandatory | Description |
|---------|------|-----------|-------------|-----------|-------------|
| Header | | | | | |
| Body | | | | | |
| Trailer | | | | | |

## C.3 Database Design (WAJIB — jika ada perubahan skema)

> ⚠️ **DDL dan kamus kolom WAJIB ada di dalam dokumen ini**, bukan hanya "lampiran diagram". App Support perlu ini untuk query manual saat insiden.

**Ringkasan perubahan:**

| Object | Tipe | Aksi | Ref. Requirement |
|--------|------|------|------------------|
| `<TBXXXXX>` | Table / Index / View / Sequence | Create / Alter / Drop | TED-XXXXX-Rnn |

**Kamus kolom — `<nama tabel>`:**

| Kolom | Tipe | Length | Null? | PK/FK | Default | Keterangan |
|-------|------|--------|-------|-------|---------|------------|
| | | | | | | |

**Index:**

| Nama Index | Kolom | Tipe | Justifikasi |
|------------|-------|------|-------------|
| | | Unique / Non-unique | |

**Estimasi volume & retention (WAJIB):**

| Tabel | Estimasi row awal | Growth/bulan | Estimasi size 12 bln | Retention | Purging/Archiving |
|-------|-------------------|--------------|----------------------|-----------|-------------------|
| | | | | | Ada/Tidak — jelaskan |

**Script DDL:**
```sql
-- CREATE / ALTER
```

**Script Rollback DB (WAJIB):**
```sql
-- rollback jika deployment dibatalkan
```

**Data migration (jika ada):**

| Sumber | Tujuan | Jumlah record | Cara | Verifikasi | Rollback |
|--------|--------|---------------|------|------------|----------|
| | | | | | |

## C.4 Security & Access Control (WAJIB — BARU, diisi Developer di awal)

> Bagian ini **diisi developer saat desain**, bukan diisi IT Security di akhir. IT Security me-*review*, bukan mengarang.

**Access Control Matrix:**

| Role | View | Add | Edit | Delete | Bulk Upload | Export | Approve |
|------|------|-----|------|--------|-------------|--------|---------|
| | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**Dual Control / Maker–Checker:**

| Aksi Berisiko | Perlu Maker-Checker? | Mekanisme | Justifikasi jika Tidak |
|---------------|----------------------|-----------|------------------------|
| Delete data | Ya/Tidak | | |
| Bulk upload | Ya/Tidak | | |
| Perubahan konfigurasi routing | Ya/Tidak | | |

**Audit Trail (WAJIB):**

| Aspek | Isi |
|-------|-----|
| Aksi yang dicatat | `<add/edit/delete/upload/export/login>` |
| Data yang disimpan | `<user, timestamp, IP, nilai lama → nilai baru, ID record>` |
| Tabel/lokasi penyimpanan | |
| Retention audit log | |
| Bisa diakses siapa | |

**Klasifikasi Data:**

| Data | Klasifikasi | Masking? | Boleh di log? | Enkripsi (at rest / in transit) |
|------|-------------|----------|---------------|----------------------------------|
| `<mis. MID, nama merchant, no kartu>` | Public/Internal/Confidential/PII/CHD | Ya/Tidak | Ya/Tidak | |

> ⚠️ Jika ada data kartu (PAN/CVV/track), wajib rujuk kontrol **PCI-DSS** dan koordinasi dengan IT Security sebelum coding.

**Validasi Input & File:**

| Kontrol | Diterapkan? | Keterangan |
|---------|-------------|------------|
| Validasi tipe & ukuran file upload | Ya/Tidak | |
| Batas maksimum baris bulk | Ya/Tidak | `<n>` |
| Proteksi SQL injection / XSS | Ya/Tidak | |
| Sanitasi output export (CSV injection) | Ya/Tidak | |

## C.5 Impact Analysis (WAJIB)

| Ref. Requirement | Aspek | Existing Flow | Changes / To Be Flow | Risiko | Mitigasi |
|------------------|-------|---------------|----------------------|--------|----------|
| TED-XXXXX-R01 | Aplikasi | | | | |
| | Database | | | | |
| | Integrasi / Interface | | | | |
| | Batch / Scheduler | | | | |
| | Konfigurasi / Parameter | | | | |
| | Report / Rekonsiliasi | | | | |
| | Downtime | Ya/Tidak — `<durasi>` | | | |

**Sign-off Reviewer Lintas Unit (WAJIB):**

| Group / Department | Impacted? | Reviewer Notes | Nama | Tanggal | Tanda Tangan |
|--------------------|-----------|----------------|------|---------|--------------|
| **IT Infra & Operations** | | | | | |
| Application Infrastructure & Datawarehouse | ☐ Impacted ☐ Not Impacted | | | | |
| System & Network | ☐ Impacted ☐ Not Impacted | | | | |
| IT Monitoring & DC Operations | ☐ Impacted ☐ Not Impacted | | | | |
| Application Support | ☐ Impacted ☐ Not Impacted | | | | |
| **IT Information Security** | | | | | |
| Security Services | ☐ Impacted ☐ Not Impacted | | | | |
| **IT Engineering** | | | | | |
| Front End | ☐ Impacted ☐ Not Impacted | | | | |
| Middleware | ☐ Impacted ☐ Not Impacted | | | | |
| Backend | ☐ Impacted ☐ Not Impacted | | | | |
| Improvement & IT Architecture | ☐ Impacted ☐ Not Impacted | | | | |
| **Compliance Review** | | | | | |
| IT Governance, Risk & Compliance | ☐ Impacted ☐ Not Impacted | | | | |

## C.6 Code Dependency (WAJIB)

| Program / Module | Jenis Program | Changes Type | Ref. Requirement | Related Project | Interface/API | Repository & Branch/Tag | Rollback Impact | Version Prod | Version Test | Version Dev |
|------------------|---------------|--------------|------------------|-----------------|---------------|-------------------------|-----------------|--------------|--------------|-------------|
| | Online Service / Batch / UI | New / Enhancement / Fix | TED-XXXXX-Rnn | | | | | | | |

> Kolom `Rollback Impact` **tidak boleh diisi `N/A` tanpa alasan**. Jelaskan apa yang terjadi jika program ini di-rollback sendirian (mis. "harus rollback bersama SMC03F300R karena kontrak berubah").

## C.7 Security Code Review (Diisi & diverifikasi IT Security)

> `Checking Item` sudah baku di bawah — developer wajib memastikan terpenuhi **sebelum** submit ke IT Security.

| No | Area Review | Checking Item | Status | Catatan |
|----|-------------|---------------|--------|---------|
| 1 | Authentication | Endpoint tidak dapat diakses tanpa token/sesi valid | Pass/Fail/N/A | |
| 2 | Authorization | Otorisasi divalidasi di sisi server per role, bukan hanya di UI | Pass/Fail/N/A | |
| 3 | Input Validation | Seluruh input divalidasi di server (tipe, panjang, format) | Pass/Fail/N/A | |
| 4 | Input Validation | Proteksi SQL injection (prepared statement) & XSS | Pass/Fail/N/A | |
| 5 | Secure Coding | Tidak ada credential/secret hardcoded di source & config | Pass/Fail/N/A | |
| 6 | Encryption | Data sensitif terenkripsi at-rest & in-transit (TLS) | Pass/Fail/N/A | |
| 7 | API Security | Rate limiting, timeout, dan pembatasan payload diterapkan | Pass/Fail/N/A | |
| 8 | Dependency Security | Library bebas CVE kritikal (hasil scan dilampirkan) | Pass/Fail/N/A | |
| 9 | Error Handling | Pesan error tidak membocorkan stack trace / detail internal | Pass/Fail/N/A | |
| 10 | Session Security | Timeout sesi, invalidasi saat logout, proteksi CSRF | Pass/Fail/N/A | |
| 11 | File Handling | Validasi tipe & ukuran file, penyimpanan di luar webroot | Pass/Fail/N/A | |
| 12 | Access Control | Tidak ada IDOR / akses langsung ke object milik user lain | Pass/Fail/N/A | |
| 13 | Logging & Audit | Aksi sensitif tercatat; data sensitif tidak ikut ter-log | Pass/Fail/N/A | |

---

# D. Operational Handover ⭐ (WAJIB — BAGIAN BARU, syarat mutlak serah terima)

> **Uji kelayakan bagian ini:** apakah App Support yang tidak ikut development dapat menangani insiden **jam 2 pagi** hanya dengan membaca bagian D? Jika belum, dokumen belum layak serah terima.

## D.1 Konfigurasi & Parameter per Environment (WAJIB)

| Parameter / Config | Lokasi (file/tabel/common code) | Nilai Dev | Nilai Test | Nilai Prod | Boleh diubah runtime? | Efek jika salah |
|--------------------|--------------------------------|-----------|------------|------------|-----------------------|-----------------|
| | | | | | Ya/Tidak (perlu restart) | |

## D.2 Batch / Scheduler / Job (WAJIB — isi "Tidak ada" jika memang tidak ada)

| Nama Job | Fungsi | Jadwal | Durasi Normal | Dependency | Efek jika Gagal | Cara Rerun | Aman di-rerun? |
|----------|--------|--------|---------------|------------|-----------------|------------|----------------|
| | | | | | | | Ya/Tidak (idempotent?) |

## D.3 Monitoring & Alert (WAJIB)

| Yang Dipantau | Tool / Dashboard | Metric | Threshold Warning | Threshold Critical | Notifikasi ke |
|---------------|------------------|--------|-------------------|--------------------|---------------|
| | APM / ELK / dsb | | | | |

**Lokasi Log:**

| Komponen | Path / Index Log | Pola pencarian umum | Retention |
|----------|------------------|---------------------|-----------|
| | | `<mis. keyword error, correlation ID>` | |

**Correlation / Trace ID:** `<bagaimana cara menelusuri satu transaksi lintas komponen>`

## D.4 Troubleshooting Guide (WAJIB)

> Minimal 5 skenario kegagalan yang paling mungkin terjadi.

| No | Gejala / Error Message | Kemungkinan Penyebab | Cara Verifikasi | Langkah Penanganan | Boleh ditangani App Support sendiri? | Eskalasi ke |
|----|------------------------|----------------------|-----------------|--------------------|--------------------------------------|-------------|
| 1 | | | | | Ya/Tidak | |

## D.5 Known Limitation & Workaround (WAJIB)

| Limitasi | Dampak ke User | Workaround Sementara | Rencana Perbaikan |
|----------|----------------|----------------------|-------------------|
| | | | |

> Tulis apa adanya. Limitasi yang disembunyikan akan jadi insiden yang tidak ada penjelasannya.

## D.6 Matriks Eskalasi (WAJIB)

| Level | Kondisi | PIC / Tim | Kontak | SLA Respon | Jam |
|-------|---------|-----------|--------|------------|-----|
| L1 | | Application Support | | | 24/7 |
| L2 | | Developer / Tech Lead | | | |
| L3 | | Vendor / Pihak ke-3 | | | |

## D.7 Serah Terima Akses & Aset (WAJIB)

| Item | Diserahkan ke | Status | Tanggal |
|------|---------------|--------|---------|
| Akses aplikasi / role support | App Support | ☐ | |
| Akses dashboard monitoring | App Support | ☐ | |
| Akses baca log | App Support | ☐ | |
| Kredensial service account (via vault) | | ☐ | |
| Dokumen TED versi final | App Support & Dev | ☐ | |
| Sesi knowledge transfer | App Support | ☐ | |

---

# E. Deployment & Rollback ⭐ (WAJIB — BAGIAN BARU)

## E.1 Rencana Implementasi (WAJIB)

| Field | Isi |
|-------|-----|
| Tanggal & jam implementasi | |
| Estimasi durasi total | |
| Downtime diperlukan? | Ya `<durasi>` / Tidak |
| Dampak ke layanan | `<layanan apa yang terganggu, siapa yang terdampak>` |
| Perlu notifikasi ke merchant/bank/partner? | Ya/Tidak — `<siapa, kapan, oleh siapa>` |
| Executor | |
| Approver on-site | |

## E.2 Urutan Deployment (WAJIB)

| Step | Aksi | Komponen | Executor | Estimasi | Cara Verifikasi Step Berhasil | Point of No Return? |
|------|------|----------|----------|----------|-------------------------------|---------------------|
| 1 | Backup (DB & artefak lama) | | | | | Tidak |
| 2 | Jalankan script DDL | | | | | |
| 3 | Deploy backend | | | | | |
| 4 | Deploy frontend | | | | | |
| 5 | Set konfigurasi/parameter | | | | | |
| 6 | Restart service | | | | | |
| 7 | Smoke test | | | | | |

## E.3 Rollback Plan (WAJIB — dilarang diisi "N/A")

| Field | Isi |
|-------|-----|
| Kriteria trigger rollback | `<kondisi objektif, mis. error rate >x% dalam y menit>` |
| Siapa yang berwenang memutuskan | |
| Estimasi durasi rollback | |
| Batas waktu keputusan rollback | `<mis. maksimal H+1 jam 06:00>` |
| Apakah ada data baru yang akan hilang? | Ya/Tidak — `<bagaimana penanganannya>` |

**Langkah Rollback:**

| Step | Aksi | Komponen | Executor | Verifikasi |
|------|------|----------|----------|------------|
| 1 | | | | |

## E.4 Post-Implementation Verification / PIV (WAJIB)

| No | Item Verifikasi | Cara Cek | Expected | Hasil | PIC |
|----|-----------------|----------|----------|-------|-----|
| 1 | Service up & health check OK | | | ☐ Pass ☐ Fail | |
| 2 | Transaksi end-to-end berhasil | | | ☐ Pass ☐ Fail | |
| 3 | Log tidak ada error baru | | | ☐ Pass ☐ Fail | |
| 4 | Metric APM dalam batas normal | | | ☐ Pass ☐ Fail | |
| 5 | Fungsi existing tidak terdampak (regresi) | | | ☐ Pass ☐ Fail | |
| 6 | Data tersimpan benar di tabel baru | | | ☐ Pass ☐ Fail | |

**Periode monitoring intensif:** `<mis. 3 hari setelah go-live, dipantau oleh Dev + App Support>`

---

# F. Testing ⭐ (WAJIB — BAGIAN BARU)

## F.1 Test Scenario (WAJIB — satu baris satu skenario)

> Jangan menumpuk seluruh skenario dalam satu paragraf. Skenario yang tidak terstruktur tidak bisa dilacak dan tidak bisa jadi bukti UAT.

| ID | Ref. Requirement | Skenario | Precondition | Langkah | Expected Result | Tipe | Env | Status | Link Evidence |
|----|------------------|----------|--------------|---------|-----------------|------|-----|--------|---------------|
| TC-01 | TED-XXXXX-R01 | | | | | Positive / Negative / Boundary / Regresi | SIT/UAT | Pass/Fail/Blocked | |

> Wajib mencakup **skenario negatif** dan **regresi terhadap fungsi existing**, bukan hanya happy path.

## F.2 Kebutuhan Data & Environment Testing (WAJIB)

| Kebutuhan | Detail | Sudah Tersedia? | PIC |
|-----------|--------|-----------------|-----|
| Test data | | ☐ | |
| Environment | | ☐ | |
| Akses / kredensial test | | ☐ | |
| Simulator / stub pihak ke-3 | | ☐ | |

## F.3 Ringkasan Hasil & Sign-off Testing (WAJIB)

| Tahap | Total TC | Pass | Fail | Open Defect | Link Report | Sign-off oleh | Tanggal |
|-------|----------|------|------|-------------|-------------|---------------|---------|
| SIT | | | | | | | |
| UAT | | | | | | | |

**Open defect yang dibawa ke production (jika ada):**

| ID Defect | Severity | Deskripsi | Alasan Diterima | Workaround | Target Perbaikan |
|-----------|----------|-----------|-----------------|------------|------------------|
| | | | | | |

---

# G. Risk & Mitigation ⭐ (WAJIB — BAGIAN BARU)

| No | Risiko | Kategori | Likelihood | Impact | Mitigasi (pencegahan) | Contingency (jika terjadi) | Owner |
|----|--------|----------|------------|--------|-----------------------|----------------------------|-------|
| 1 | | Teknis / Operasional / Keamanan / Bisnis / Eksternal | H/M/L | H/M/L | | | |

---

# H. Approval

| Peran | Nama | Unit | Tanggal | Tanda Tangan |
|-------|------|------|---------|--------------|
| **Prepared by** | | Development | | |
| **Prepared by** | | Development | | |
| **Reviewed by** | | IT Strategy & Governance | | |
| **Reviewed by** | | IT Information Security | | |
| **Reviewed by** | | IT Engineering | | |
| **Reviewed by** | | IT Infra & Operation | | |
| **Reviewed by** | | Application Support | | |
| **Accepted by** | | Product Management | | |

> ⚠️ **Application Support wajib menjadi salah satu reviewer & penandatangan.** Merekalah penerima serah terima — dokumen tidak boleh dinyatakan selesai tanpa persetujuan mereka.
