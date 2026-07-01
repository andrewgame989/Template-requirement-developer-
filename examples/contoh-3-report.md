<!-- CONTOH terisi — Template 3 (Report). Fitur: Export Transaksi. -->

# 📊 REQ-014 (Report) — File Excel Riwayat Transaksi

## 0. Metadata

| Field | Isi |
|-------|-----|
| **ID** | REQ-014-RPT |
| **Nama laporan** | Export Riwayat Transaksi (.xlsx) |
| **Dibuat oleh (PIC)** | Sinta (BA) |
| **Tanggal** | 2026-06-20 |
| **Prioritas** | 🟠 High |
| **Format** | Excel (.xlsx) |
| **Terkait Flow/Screen/API** | REQ-014-FLOW, REQ-014-SCR, REQ-014-API |
| **Status** | Ready |

---

## 1. Tujuan Laporan
- **Untuk apa:** Rekap pembukuan transaksi merchant.
- **Pembaca:** Merchant / staf keuangan merchant.
- **Frekuensi:** On-demand.

## 2. Parameter / Filter
| Parameter | Tipe | Wajib? | Default | Batasan |
|-----------|------|--------|---------|---------|
| Periode (dari–sampai) | Date range | Tidak | 30 hari terakhir | Maks 365 hari |

## 3. Kolom / Field Laporan
| No | Kolom | Sumber / Rumus | Format | Contoh |
|----|-------|----------------|--------|--------|
| 1 | Tanggal | transactions.created_at | DD/MM/YYYY | 01/07/2026 |
| 2 | ID Transaksi | transactions.id | string | TRX-00123 |
| 3 | Nominal | transactions.amount | Rupiah, tanpa desimal | Rp1.500.000 |
| 4 | Metode Bayar | transactions.payment_method | teks | VA BCA |
| 5 | Status | transactions.status | teks | Sukses |

## 4. Pengelompokan & Urutan
- **Grouping:** tidak ada (flat list).
- **Sorting default:** Tanggal terbaru di atas (created_at DESC).
- **Subtotal:** N/A.

## 5. Agregasi / Ringkasan
| Ringkasan | Rumus | Letak |
|-----------|-------|-------|
| Total Transaksi | COUNT(id) | Baris footer |
| Total Nominal (Sukses) | SUM(amount) WHERE status='Sukses' | Baris footer |

## 6. Sumber Data
- **Tabel sumber:** `transactions` (Transaction Service).
- **Source of truth:** Transaction Service.
- **Zona waktu:** WIB (UTC+7).
- **Real-time/batch:** real-time saat export dipicu.

## 7. Aturan Bisnis Perhitungan
| ID | Aturan | Contoh |
|----|--------|--------|
| BR-1 | Total Nominal hanya menjumlahkan status='Sukses' | Status Gagal → tidak dijumlahkan |
| BR-2 | Nominal ditampilkan tanpa desimal (dibulatkan ke bawah) | Rp1.500.499 → Rp1.500.000 |
| BR-3 | Refund tampil sebagai nominal negatif | -Rp100.000 |

## 8. Format & Tampilan
- **Header:** baris pertama = nama kolom (bold).
- **Info:** sel A1 = "Riwayat Transaksi 01/06/2026–01/07/2026".
- **Batas baris:** maksimal 50.000 baris.
- **Nama file:** `Riwayat_Transaksi_YYYYMMDD.xlsx`.

## 9. Hak Akses
- Merchant hanya bisa mengunduh datanya sendiri (difilter merchant_id dari token).

## 10. Non-Functional
- **Performa:** file 10.000 baris siap < 5 detik (95%).
- **Kompatibilitas:** terbuka di Excel 2016+, Google Sheets, LibreOffice.

## 11. Acceptance Criteria
- [ ] AC-1: Given 3 transaksi dalam rentang, Then file berisi 3 baris data + 1 baris header + baris footer total.
- [ ] AC-2: Given ada transaksi Gagal, Then transaksi itu muncul di baris tapi tidak masuk Total Nominal (BR-1).
- [ ] AC-3: Kolom & format sesuai bagian 3; nominal berformat Rupiah tanpa desimal.
- [ ] AC-4: Given data > 50.000 baris, Then export ditolak dengan pesan sesuai bagian 8.

## 12. Lampiran
- Contoh output: `contoh-export.xlsx`.

## 13. Sign-off
- [x] Product/BA — Approved (Sinta)
- [x] Finance (verifikasi rumus) — Approved
- [x] Tech Lead — Reviewed & Ready (Bagus)
