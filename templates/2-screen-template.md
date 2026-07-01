<!--
  TEMPLATE 2 — SCREEN / UI
  Diisi oleh: Product / Business Analyst (BA)
  Gunakan untuk mendeskripsikan sebuah HALAMAN / LAYAR.
  Buat satu file per screen (atau satu file berisi beberapa screen terkait).
  Bagian (WAJIB) tidak boleh kosong. Jika tidak relevan tulis "N/A" + alasan.
-->

# 🖥️ REQ-XXX (Screen) — <Nama Layar>

## 0. Metadata (WAJIB)

| Field | Isi |
|-------|-----|
| **ID** | REQ-XXX-SCR |
| **Nama layar** | <mis. Halaman Detail Transaksi> |
| **Dibuat oleh (PIC)** | <Product/BA> |
| **Tanggal** | YYYY-MM-DD |
| **Prioritas** | 🔴/🟠/🟡/🟢 |
| **Platform** | Web / Mobile Web / Android / iOS |
| **Link design (Figma)** | <URL — WAJIB jika ada UI> |
| **Terkait Flow/API** | <ID template lain> |
| **Status** | Draft / In Review / Ready |

---

## ⛔ Minimum Requirements — Prasyarat Wajib dari Product/BA

> Template ini **tidak akan diterima** developer jika salah satu di bawah belum tersedia. Semua harus ✅ sebelum masuk review.

- [ ] **Desain UI/UX** (link Figma/mockup/prototype) yang bisa diakses — **WAJIB, tidak boleh hanya deskripsi**.
- [ ] **Semua state di desain**: normal, loading, empty, error, success (jangan hanya happy state).
- [ ] **Daftar field & komponen** lengkap dengan **sumber datanya** (dari API mana / statis).
- [ ] **Aturan validasi + pesan error** untuk setiap input.
- [ ] **Mapping setiap tombol/aksi** ke tujuannya (API mana / navigasi ke mana).
- [ ] **Copywriting final** (judul, label, placeholder, pesan) — bukan "lorem ipsum".
- [ ] **Perilaku responsif** (desktop & mobile) dijelaskan.
- [ ] **Hak akses** per role ditentukan.

---

## 1. Tujuan Layar (WAJIB)
- **Fungsi utama layar:** <apa yang bisa dilakukan user di sini>
- **Siapa penggunanya:** <persona/role>

## 2. Cara Mengakses (WAJIB)
- **Navigasi menuju layar:** <dari mana user sampai ke sini>
- **Hak akses/permission:** <role yang boleh mengakses; jika tidak berhak → perilaku>

## 3. Elemen / Field di Layar (WAJIB)

> Daftar semua field & komponen yang ditampilkan. **Ini bagian utama.**

| No | Label / Komponen | Tipe | Sumber data | Wajib? | Editable? | Keterangan |
|----|------------------|------|-------------|--------|-----------|------------|
| 1 | Nama Pelanggan | Text | GET /order/{id} | - | Tidak | Read-only |
| 2 | Nominal | Input number | - | Ya | Ya | Format Rupiah |
| 3 | Metode Bayar | Dropdown | GET /payment-methods | Ya | Ya | - |
| 4 | Tombol Simpan | Button | - | - | - | Aksi lihat bagian 5 |

## 4. Validasi Input (WAJIB jika ada input)

| Field | Aturan | Pesan error |
|-------|--------|-------------|
| Nominal | Min Rp10.000, angka saja | "Nominal minimal Rp10.000" |
| Metode Bayar | Wajib dipilih | "Pilih metode pembayaran" |

## 5. Aksi & Tombol (WAJIB)

| Tombol/Aksi | Kondisi aktif | Yang terjadi saat diklik | Tujuan navigasi/API |
|-------------|---------------|--------------------------|---------------------|
| Simpan | Semua field valid | Kirim data, tampilkan loading | POST /order (API-XXX) |
| Batal | Selalu | Kembali tanpa menyimpan | ke layar sebelumnya |

## 6. State Layar (WAJIB)

> Jangan lupakan state selain "normal" — sering menyebabkan tampilan kosong/bug.

| State | Kondisi | Tampilan |
|-------|---------|----------|
| **Loading** | Sedang ambil data | Skeleton / spinner |
| **Empty** | Tidak ada data | Ilustrasi + teks "Belum ada data" |
| **Error** | Gagal ambil data | Pesan + tombol "Coba lagi" |
| **Success** | Aksi berhasil | Toast "Berhasil disimpan" |
| **No access** | User tanpa izin | Halaman 403 / sembunyikan konten |

## 7. Perilaku Responsif
- **Desktop:** <layout>
- **Mobile:** <layout, mis. tabel jadi card, modal full-screen>

## 8. Interaksi & Kondisi Dinamis
- <mis. field "Alasan" muncul hanya jika status = "Ditolak">
- <mis. tombol Simpan disable sampai form valid>

## 9. Copywriting / Teks
- **Judul halaman:** <teks>
- **Placeholder, label, pesan:** <daftar teks final atau link ke sheet copy>
- **Bahasa/lokalisasi:** <ID/EN?>

## 10. Acceptance Criteria (WAJIB)
- [ ] **AC-1:** Given user membuka layar dengan data valid, Then semua field bagian 3 tampil sesuai sumbernya.
- [ ] **AC-2:** Given field wajib kosong, When klik Simpan, Then muncul pesan validasi & data tidak terkirim.
- [ ] **AC-3:** Given API gagal, When memuat layar, Then tampil state Error dengan tombol coba lagi.

## 11. Lampiran
- <link Figma frame, screenshot, prototype>

## 12. Sign-off
- [ ] Product/BA — Approved
- [ ] UI/UX — Approved
- [ ] Tech Lead — Reviewed & Ready
