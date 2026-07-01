<!--
  TEMPLATE 3 — REPORT
  Diisi oleh: Product / Business Analyst (BA)
  Gunakan untuk mendeskripsikan LAPORAN / REPORT / EXPORT / DASHBOARD.
  Bagian (WAJIB) tidak boleh kosong. Jika tidak relevan tulis "N/A" + alasan.
-->

# 📊 REQ-XXX (Report) — <Nama Laporan>

## 0. Metadata (WAJIB)

| Field | Isi |
|-------|-----|
| **ID** | REQ-XXX-RPT |
| **Nama laporan** | <mis. Laporan Transaksi Harian> |
| **Dibuat oleh (PIC)** | <Product/BA> |
| **Tanggal** | YYYY-MM-DD |
| **Prioritas** | 🔴/🟠/🟡/🟢 |
| **Format** | Tabel di layar / Excel / CSV / PDF / Dashboard |
| **Terkait Flow/Screen/API** | <ID template lain> |
| **Status** | Draft / In Review / Ready |

---

## ⛔ Minimum Requirements — Prasyarat Wajib dari Product/BA

> Template ini **tidak akan diterima** developer jika salah satu di bawah belum tersedia. Semua harus ✅ sebelum masuk review.

- [ ] **Contoh file dummy** hasil laporan (`.xlsx` / `.csv` / `.pdf` / mockup dashboard) — **WAJIB, agar developer tahu bentuk akhir persis**.
- [ ] **Definisi setiap kolom** lengkap dengan **sumber data / rumus**.
- [ ] **Parameter / filter** yang tersedia beserta default & batasannya.
- [ ] **Aturan perhitungan** jelas: data yang **dihitung vs dikecualikan**, pembulatan, penanganan refund/negatif.
- [ ] **Agregasi / ringkasan** (total, subtotal, rata-rata) & letaknya ditentukan.
- [ ] **Sumber data & zona waktu** disebutkan (real-time atau batch).
- [ ] **Batas jumlah baris** & pola **nama file** ditentukan.
- [ ] **Hak akses** (siapa boleh lihat/unduh data apa).

---

## 1. Tujuan Laporan (WAJIB)
- **Untuk apa laporan ini:** <keputusan/kebutuhan yang didukung>
- **Pembaca/pengguna:** <mis. Finance, Manajemen, Merchant>
- **Frekuensi penggunaan:** <harian/mingguan/on-demand>

## 2. Parameter / Filter (WAJIB)

> Input yang bisa dipilih pengguna untuk menyaring laporan.

| Parameter | Tipe | Wajib? | Default | Batasan |
|-----------|------|--------|---------|---------|
| Periode (dari–sampai) | Date range | Ya | 30 hari terakhir | Maks 1 tahun |
| Status | Multi-select | Tidak | Semua | Sukses/Gagal/Pending |
| Merchant | Dropdown | Tidak | Semua | - |

## 3. Kolom / Field Laporan (WAJIB)

> Definisikan **tiap kolom**: sumber data & rumus. Bagian paling penting agar angka tidak salah.

| No | Nama Kolom | Sumber / Rumus | Format | Contoh |
|----|-----------|----------------|--------|--------|
| 1 | Tanggal | transactions.created_at | DD/MM/YYYY | 01/07/2026 |
| 2 | ID Transaksi | transactions.id | string | TRX-00123 |
| 3 | Nominal | transactions.amount | Rupiah, tanpa desimal | Rp1.500.000 |
| 4 | Fee (2%) | amount × 0.02 | Rupiah | Rp30.000 |
| 5 | Nominal Bersih | amount − fee | Rupiah | Rp1.470.000 |
| 6 | Status | transactions.status | teks | Sukses |

## 4. Pengelompokan & Urutan (WAJIB)
- **Grouping:** <mis. dikelompokkan per merchant, per tanggal>
- **Sorting default:** <mis. tanggal terbaru di atas>
- **Subtotal per grup:** <ada? kolom apa yang dijumlahkan>

## 5. Agregasi / Ringkasan (WAJIB jika ada)

| Ringkasan | Rumus | Letak |
|-----------|-------|-------|
| Total Transaksi | COUNT(id) | Footer |
| Total Nominal | SUM(amount) | Footer |
| Rata-rata Nominal | AVG(amount) | Footer |

## 6. Sumber Data (WAJIB)
- **Tabel/service sumber:** <mis. transactions, merchants>
- **Source of truth:** <sistem mana yang jadi acuan>
- **Zona waktu:** <mis. WIB / UTC+7>
- **Real-time atau batch?** <data update tiap kapan>

## 7. Aturan Bisnis Perhitungan (WAJIB)

| ID | Aturan | Contoh |
|----|--------|--------|
| BR-1 | Transaksi "Gagal" tidak dihitung dalam Total Nominal | Status=Gagal → amount tidak dijumlahkan |
| BR-2 | Fee dibulatkan ke bawah (floor) | Rp30.499 → Rp30.000 |
| BR-3 | Pembatalan (refund) tampil nominal negatif | -Rp100.000 |

## 8. Format & Tampilan
- **Header/footer:** <judul, periode, tanggal cetak, logo>
- **Batas jumlah baris:** <mis. maks 50.000 baris per export>
- **Halaman/paginasi (PDF):** <ada nomor halaman?>
- **Nama file export:** <pola, mis. `Laporan_Transaksi_YYYYMMDD.xlsx`>

## 9. Hak Akses
- **Siapa yang boleh melihat/mengunduh:** <role>
- **Data yang disembunyikan per role:** <mis. merchant hanya lihat datanya sendiri>

## 10. Non-Functional
- **Performa:** <mis. laporan 10.000 baris siap < 5 detik>
- **Beban:** <jumlah request bersamaan>

## 11. Acceptance Criteria (WAJIB)
- [ ] **AC-1:** Given periode & filter dipilih, When generate, Then laporan berisi hanya data yang sesuai filter.
- [ ] **AC-2:** Given ada transaksi Gagal, Then transaksi tersebut tidak masuk Total Nominal (BR-1).
- [ ] **AC-3:** Kolom & rumus sesuai bagian 3; Total di footer = SUM kolom Nominal.
- [ ] **AC-4:** Given data melebihi batas baris, Then muncul peringatan sesuai bagian 8.

## 12. Lampiran
- <contoh file output / mockup laporan / query>

## 13. Sign-off
- [ ] Product/BA — Approved
- [ ] Data/Finance (verifikasi rumus) — Approved
- [ ] Tech Lead — Reviewed & Ready
