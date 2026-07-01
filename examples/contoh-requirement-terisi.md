<!-- CONTOH template yang sudah diisi. Gunakan sebagai referensi cara mengisi. -->

# REQ-014 — Export Riwayat Transaksi ke Excel

## 0. Metadata

| Field | Isi |
|-------|-----|
| **ID Requirement** | REQ-014 |
| **Judul** | Export Riwayat Transaksi ke Excel |
| **Tanggal dibuat** | 2026-06-20 |
| **Dibuat oleh (PIC)** | Sinta (BA) |
| **Stakeholder / Requester** | Tim Operasional Merchant |
| **Prioritas** | 🟠 High |
| **Target rilis** | Sprint 24 (2026-07-14) |
| **Status** | Ready |
| **Tipe** | Fitur baru |
| **Link terkait** | Figma: figma.com/xxx · Jira: MAAS-1421 |

---

## 1. Latar Belakang & Masalah

- **Masalah/Peluang:** Merchant tidak bisa merekap transaksi dalam jumlah besar. Saat ini hanya bisa melihat di layar dengan paginasi 20 baris.
- **Siapa yang terdampak:** Merchant, terutama yang punya > 500 transaksi/bulan.
- **Dampak jika tidak dikerjakan:** ~30% tiket support bulan Mei 2026 (128 tiket) meminta rekap data manual, membebani tim support ± 40 jam/bulan.
- **Data pendukung:** Laporan tiket support Mei 2026, survei 15 merchant besar.

---

## 2. Tujuan & Metrik Keberhasilan

- **Tujuan:** Merchant bisa mengunduh riwayat transaksi mandiri tanpa hubungi support.
- **Metrik keberhasilan:**
  - Tiket support terkait rekap turun ≥ 70% dalam 1 bulan setelah rilis.
  - ≥ 40% merchant aktif menggunakan fitur export dalam 30 hari.
- **Non-goals:** Tidak membuat laporan analitik/grafik. Tidak export ke PDF (fase berikutnya).

---

## 3. Ruang Lingkup

### ✅ Termasuk
- Tombol "Export ke Excel" di halaman Riwayat Transaksi.
- Filter periode tanggal (dari–sampai) sebelum export.
- File format `.xlsx`.

### ❌ Tidak Termasuk
- Export PDF/CSV.
- Penjadwalan export otomatis (scheduled report).
- Pengiriman file via email.

---

## 4. User Story & Persona

| No | User Story | Persona |
|----|------------|---------|
| US-1 | Sebagai merchant, saya ingin mengunduh riwayat transaksi ke Excel, agar bisa merekap pembukuan tanpa input manual. | Merchant |
| US-2 | Sebagai merchant, saya ingin memilih rentang tanggal sebelum export, agar file tidak terlalu besar dan sesuai kebutuhan. | Merchant |

---

## 5. Kebutuhan Fungsional

| ID | Deskripsi | Prioritas |
|----|-----------|-----------|
| FR-1 | Sistem menampilkan tombol "Export ke Excel" di halaman Riwayat Transaksi. | Must |
| FR-2 | Sistem menyediakan filter tanggal (dari–sampai) sebelum export. | Must |
| FR-3 | Sistem menghasilkan file `.xlsx` berisi transaksi sesuai filter. | Must |
| FR-4 | Kolom file: Tanggal, ID Transaksi, Nominal, Metode Bayar, Status. | Must |
| FR-5 | Sistem menampilkan progress/loading saat file sedang disiapkan. | Should |

---

## 6. Alur / Flow

**Happy Path:**
1. Merchant membuka halaman **Riwayat Transaksi**.
2. Merchant memilih rentang tanggal (opsional; default = 30 hari terakhir).
3. Merchant klik **Export ke Excel**.
4. Sistem memvalidasi rentang tanggal & jumlah data.
5. Sistem menyiapkan file (menampilkan loading).
6. File `.xlsx` terunduh otomatis; muncul notifikasi "Export berhasil".

**Alternatif:**
- Jika tidak ada transaksi pada rentang → tombol tetap bisa diklik, tapi muncul pesan "Tidak ada transaksi pada periode ini".

---

## 7. Business Rules & Validasi

| ID | Aturan | Contoh |
|----|--------|--------|
| BR-1 | Rentang tanggal maksimal 1 tahun (365 hari). | Pilih 400 hari → tolak, pesan: "Rentang maksimal 1 tahun." |
| BR-2 | Tanggal "dari" tidak boleh setelah tanggal "sampai". | Dari 10 Jul, Sampai 1 Jul → tolak. |
| BR-3 | Maksimal 50.000 baris per export. Jika lebih, minta perkecil rentang. | 60.000 baris → pesan: "Data terlalu banyak, perkecil rentang tanggal." |
| BR-4 | Nominal ditampilkan dalam Rupiah tanpa desimal (mis. Rp1.500.000). | |

**Validasi field:**

| Field | Wajib? | Format | Batasan | Pesan error |
|-------|--------|--------|---------|-------------|
| Tanggal dari | Tidak | date (YYYY-MM-DD) | ≤ tanggal sampai | "Tanggal 'dari' harus sebelum 'sampai'." |
| Tanggal sampai | Tidak | date (YYYY-MM-DD) | ≥ tanggal dari, ≤ hari ini | "Tanggal 'sampai' tidak boleh di masa depan." |

---

## 8. Edge Cases & Skenario Error

| Skenario | Perilaku yang diharapkan |
|----------|--------------------------|
| Tidak ada transaksi pada rentang | Tampilkan pesan "Tidak ada transaksi pada periode ini", tidak menghasilkan file. |
| Proses generate gagal / server error | Tampilkan "Gagal membuat file, coba lagi." + tombol retry. Tidak ada file setengah jadi terunduh. |
| Merchant klik Export berkali-kali cepat | Disable tombol saat proses berjalan (debounce) untuk cegah request ganda. |
| Data melebihi 50.000 baris | Tolak sesuai BR-3, arahkan perkecil rentang. |
| Sesi login habis saat export | Redirect ke login, tampilkan "Sesi berakhir, silakan login ulang." |

---

## 9. Kebutuhan Data

- **Data input:** rentang tanggal, ID merchant (dari sesi login).
- **Data output:** file `.xlsx` (kolom: Tanggal, ID Transaksi, Nominal, Metode Bayar, Status).
- **Source of truth:** tabel `transactions` di service Transaksi.
- **Retensi & privasi:** file dibuat on-demand, tidak disimpan permanen di server (hapus setelah diunduh). Tidak mengandung data kartu/PII sensitif.
- **Migrasi data:** N/A.

---

## 10. Integrasi & Dependency

| Sistem | Arah | Detail | Owner |
|--------|------|--------|-------|
| Transaction Service | Inbound | GET /merchants/{id}/transactions?from=&to= | Tim Core |

- **Dependency:** endpoint filter tanggal di Transaction Service harus sudah mendukung parameter `from`/`to` (sudah tersedia, dikonfirmasi Tim Core 2026-06-18).
- **Lampiran kontrak API:** Postman collection MAAS-Transactions (link).

---

## 11. Kebutuhan UI/UX

- **Link design:** figma.com/xxx (frame "Export Transaksi").
- **Komponen baru:** tombol Export + modal pilih tanggal.
- **Responsive:** desktop & mobile web; di mobile modal full-screen.
- **State:** loading (spinner di tombol), empty (pesan tidak ada data), error (toast merah), success (toast hijau).
- **Copywriting:** disediakan tim Product (lihat sheet copy di Figma).
- **Aksesibilitas:** tombol punya label ARIA "Export riwayat transaksi ke Excel".

---

## 12. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|-------|-----------|
| Performa | File 10.000 baris siap dalam < 5 detik untuk 95% request. |
| Beban | Mendukung 200 request export/menit. |
| Keamanan | Hanya merchant pemilik data yang bisa export; validasi ownership via token. |
| Kompatibilitas | File terbuka di Excel 2016+, Google Sheets, LibreOffice. |
| Logging | Catat setiap aksi export (merchant_id, rentang, jumlah baris, waktu). |
| Compliance | Tidak menyertakan data pribadi pelanggan akhir. |

---

## 13. Acceptance Criteria

- [ ] **AC-1:** Given merchant punya 3 transaksi dalam rentang terpilih, When klik Export, Then file `.xlsx` berisi 3 baris data + 1 baris header terunduh.
- [ ] **AC-2:** Given rentang tanggal > 365 hari, When klik Export, Then muncul pesan "Rentang maksimal 1 tahun" dan file tidak dibuat.
- [ ] **AC-3:** Given tidak ada transaksi pada rentang, When klik Export, Then muncul pesan "Tidak ada transaksi pada periode ini".
- [ ] **AC-4:** Given data > 50.000 baris, When klik Export, Then muncul pesan minta perkecil rentang.
- [ ] **AC-5:** Given proses export sedang berjalan, When merchant klik tombol lagi, Then tombol non-aktif (tidak terjadi request ganda).
- [ ] **AC-6:** Kolom file sesuai FR-4 dan nominal berformat Rupiah (BR-4).

---

## 14. Asumsi & Batasan

- **Asumsi:** Merchant sudah login dan terverifikasi. Semua nominal dalam Rupiah.
- **Batasan:** Transaction Service membatasi query maksimal 1 tahun ke belakang.

---

## 15. Risiko

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Export data besar membebani DB | Query lambat / timeout | Batasi 50.000 baris (BR-3) + query pakai index tanggal. |
| Format Excel tidak konsisten antar aplikasi | File error dibuka user | Gunakan library `.xlsx` standar & uji di 3 aplikasi. |

---

## 16. Pertanyaan Terbuka

| No | Pertanyaan | Ditujukan ke | Jawaban | Status |
|----|------------|--------------|---------|--------|
| Q-1 | Apakah kolom "Fee" perlu disertakan? | Product | Tidak untuk v1, masuk backlog. | ✅ Closed |
| Q-2 | Zona waktu tanggal di file? | Tim Core | WIB (UTC+7). | ✅ Closed |

---

## 17. Lampiran

- Figma frame "Export Transaksi".
- Contoh file output: `contoh-export.xlsx`.
- Postman collection Transaction Service.

---

## 18. Sign-off

| Peran | Nama | Status | Tanggal |
|-------|------|--------|---------|
| Product Owner | Rizal | ✅ Approved | 2026-06-24 |
| Business Analyst | Sinta | ✅ Approved | 2026-06-24 |
| Tech Lead | Bagus | ✅ Reviewed & Ready | 2026-06-25 |
| QA | Dewi | ✅ Reviewed | 2026-06-25 |
