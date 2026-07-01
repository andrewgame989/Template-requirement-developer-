<!-- CONTOH terisi — Template 1 (Flow). Fitur: Export Transaksi. -->

# 🔄 REQ-014 (Flow) — Export Riwayat Transaksi ke Excel

## 0. Metadata

| Field | Isi |
|-------|-----|
| **ID** | REQ-014-FLOW |
| **Nama proses** | Export Riwayat Transaksi |
| **Dibuat oleh (PIC)** | Sinta (BA) |
| **Tanggal** | 2026-06-20 |
| **Prioritas** | 🟠 High |
| **Terkait Screen/Report/API** | REQ-014-SCR, REQ-014-RPT, REQ-014-API |
| **Status** | Ready |

---

## 1. Tujuan Proses
- **Apa yang dicapai:** Merchant mengunduh riwayat transaksinya sendiri dalam file Excel.
- **Masalah yang diselesaikan:** 30% tiket support (Mei 2026) minta rekap manual karena data tidak bisa diunduh.

## 2. Aktor / Pelaku
| Aktor | Peran |
|-------|-------|
| Merchant | Memicu export & mengunduh file |
| Sistem | Validasi, mengambil data, membuat file `.xlsx` |

## 3. Pemicu (Trigger)
- Merchant menekan tombol **Export ke Excel** di halaman Riwayat Transaksi.

## 4. Prasyarat (Pre-condition)
- Merchant sudah login & terverifikasi.
- Berada di halaman Riwayat Transaksi.

## 5. Alur Utama / Happy Path
| No | Aktor | Aksi | Sistem melakukan |
|----|-------|------|------------------|
| 1 | Merchant | Pilih rentang tanggal (opsional) | Menyimpan filter di memori |
| 2 | Merchant | Klik "Export ke Excel" | Validasi rentang & jumlah data |
| 3 | Sistem | Ambil data via API (REQ-014-API) | Menampilkan loading |
| 4 | Sistem | Susun file `.xlsx` (REQ-014-RPT) | - |
| 5 | Sistem | Kirim file ke browser | File terunduh + toast "Export berhasil" |

## 6. Titik Keputusan
| Kondisi | Ya → | Tidak → |
|---------|------|---------|
| Rentang ≤ 365 hari? | Lanjut | Tolak, pesan "Rentang maksimal 1 tahun" |
| Ada transaksi di rentang? | Buat file | Pesan "Tidak ada transaksi pada periode ini" |
| Jumlah baris ≤ 50.000? | Buat file | Pesan "Data terlalu banyak, perkecil rentang" |

## 7. Alur Alternatif & Exception
| Kode | Skenario | Perilaku |
|------|----------|----------|
| ALT-1 | Rentang kosong | Pakai default 30 hari terakhir |
| EXC-1 | API gagal / timeout | Toast "Gagal membuat file, coba lagi" + tombol retry; tidak ada file setengah jadi |
| EXC-2 | Sesi login habis | Redirect ke login, pesan "Sesi berakhir" |
| EXC-3 | Merchant klik Export berkali-kali | Tombol non-aktif selama proses (cegah request ganda) |

## 8. Status / State
- Proses bersifat sekali jalan (tidak menyimpan status entitas). N/A untuk transisi status.

## 9. Business Rules
| ID | Aturan |
|----|--------|
| BR-1 | Rentang tanggal maksimal 365 hari |
| BR-2 | Maksimal 50.000 baris per export |
| BR-3 | Hanya data milik merchant yang login |

## 10. Hasil Akhir (Post-condition)
- **Sukses:** File `.xlsx` terunduh; aksi export tercatat di log.
- **Gagal:** Tidak ada file terunduh; pesan error tampil.

## 11. SLA / Waktu Proses
- File hingga 10.000 baris siap < 5 detik (95% request).

## 12. Acceptance Criteria
- [ ] AC-1: Given rentang valid berisi transaksi, When klik Export, Then file terunduh & toast sukses muncul.
- [ ] AC-2: Given rentang > 365 hari, When klik Export, Then muncul pesan batas rentang & file tidak dibuat.
- [ ] AC-3: Given API gagal, When export, Then muncul error + retry, tanpa file rusak.

## 13. Lampiran
- Flowchart: figma.com/xxx (frame "Flow Export").

## 14. Sign-off
- [x] Product/BA — Approved (Sinta, 2026-06-24)
- [x] Tech Lead — Reviewed & Ready (Bagus, 2026-06-25)
