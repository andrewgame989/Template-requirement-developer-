<!-- CONTOH terisi — Template 2 (Screen). Fitur: Export Transaksi. -->

# 🖥️ REQ-014 (Screen) — Halaman Riwayat Transaksi (Export)

## 0. Metadata

| Field | Isi |
|-------|-----|
| **ID** | REQ-014-SCR |
| **Nama layar** | Riwayat Transaksi — komponen Export |
| **Dibuat oleh (PIC)** | Sinta (BA) |
| **Tanggal** | 2026-06-20 |
| **Prioritas** | 🟠 High |
| **Platform** | Web & Mobile Web |
| **Link design (Figma)** | figma.com/xxx (frame "Export Transaksi") |
| **Terkait Flow/API** | REQ-014-FLOW, REQ-014-API |
| **Status** | Ready |

---

## 1. Tujuan Layar
- **Fungsi utama:** Memungkinkan merchant memilih rentang tanggal dan mengunduh riwayat transaksi.
- **Pengguna:** Merchant.

## 2. Cara Mengakses
- **Navigasi:** Menu utama → "Transaksi" → "Riwayat".
- **Hak akses:** Hanya merchant login; tanpa login → redirect ke halaman login.

## 3. Elemen / Field di Layar
| No | Label / Komponen | Tipe | Sumber data | Wajib? | Editable? | Keterangan |
|----|------------------|------|-------------|--------|-----------|------------|
| 1 | Tombol "Export ke Excel" | Button | - | - | - | Membuka modal filter |
| 2 | Tanggal dari | Date picker | - | Tidak | Ya | Default 30 hari lalu |
| 3 | Tanggal sampai | Date picker | - | Tidak | Ya | Default hari ini |
| 4 | Tombol "Unduh" | Button | - | - | - | Memicu export (bag. 5) |
| 5 | Tombol "Batal" | Button | - | - | - | Menutup modal |

## 4. Validasi Input
| Field | Aturan | Pesan error |
|-------|--------|-------------|
| Tanggal dari | ≤ tanggal sampai | "Tanggal 'dari' harus sebelum 'sampai'" |
| Tanggal sampai | ≤ hari ini | "Tanggal 'sampai' tidak boleh di masa depan" |
| Rentang | ≤ 365 hari | "Rentang maksimal 1 tahun" |

## 5. Aksi & Tombol
| Tombol | Kondisi aktif | Saat diklik | Tujuan |
|--------|---------------|-------------|--------|
| Export ke Excel | Selalu | Buka modal filter | - |
| Unduh | Rentang valid | Kirim request, tampilkan loading | GET transaksi (REQ-014-API) |
| Batal | Selalu | Tutup modal | - |

## 6. State Layar
| State | Kondisi | Tampilan |
|-------|---------|----------|
| Loading | Sedang menyiapkan file | Spinner di tombol Unduh, tombol non-aktif |
| Empty | Tidak ada transaksi di rentang | Toast "Tidak ada transaksi pada periode ini" |
| Error | API gagal | Toast merah "Gagal membuat file, coba lagi" + retry |
| Success | File terunduh | Toast hijau "Export berhasil" |
| No access | Belum login | Redirect ke login |

## 7. Perilaku Responsif
- **Desktop:** modal kecil di tengah.
- **Mobile:** modal full-screen; tombol Unduh melebar penuh.

## 8. Interaksi & Kondisi Dinamis
- Tombol Unduh non-aktif selama proses berjalan (cegah klik ganda).
- Jika rentang tidak valid, tombol Unduh non-aktif + pesan validasi tampil.

## 9. Copywriting / Teks
- Judul modal: "Export Riwayat Transaksi".
- Teks tombol: "Export ke Excel", "Unduh", "Batal".
- Bahasa: Indonesia.

## 10. Acceptance Criteria
- [ ] AC-1: Given merchant klik "Export ke Excel", Then modal filter tanggal muncul dengan default 30 hari.
- [ ] AC-2: Given rentang tidak valid, Then tombol Unduh non-aktif & pesan validasi tampil.
- [ ] AC-3: Given proses berjalan, When klik Unduh lagi, Then tidak terjadi request ganda.

## 11. Lampiran
- Figma frame "Export Transaksi".

## 12. Sign-off
- [x] Product/BA — Approved (Sinta)
- [x] UI/UX — Approved
- [x] Tech Lead — Reviewed & Ready (Bagus)
