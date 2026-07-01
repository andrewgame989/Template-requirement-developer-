<!--
  TEMPLATE 1 — FLOW / PROCESS
  Diisi oleh: Product / Business Analyst (BA)
  Gunakan untuk mendeskripsikan ALUR PROSES BISNIS sebuah fitur.
  Bagian (WAJIB) tidak boleh kosong. Jika tidak relevan tulis "N/A" + alasan.
-->

# 🔄 REQ-XXX (Flow) — <Nama Proses>

## 0. Metadata (WAJIB)

| Field | Isi |
|-------|-----|
| **ID** | REQ-XXX-FLOW |
| **Nama proses** | <mis. Pendaftaran Merchant> |
| **Dibuat oleh (PIC)** | <Product/BA> |
| **Tanggal** | YYYY-MM-DD |
| **Prioritas** | 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low |
| **Terkait Screen/Report/API** | <ID template lain yang berhubungan> |
| **Status** | Draft / In Review / Ready |

---

## 1. Tujuan Proses (WAJIB)
- **Apa yang dicapai proses ini:** <hasil akhir bisnis>
- **Masalah yang diselesaikan:** <konteks>

## 2. Aktor / Pelaku (WAJIB)

| Aktor | Peran dalam proses |
|-------|--------------------|
| <mis. Merchant> | Mengajukan pendaftaran |
| <mis. Admin> | Memverifikasi & menyetujui |
| <mis. Sistem> | Validasi otomatis, kirim notifikasi |

## 3. Pemicu (Trigger) (WAJIB)
- **Kapan proses dimulai:** <mis. saat user klik "Daftar", tiap jam 00:00, saat pembayaran masuk>

## 4. Prasyarat (Pre-condition) (WAJIB)
- <kondisi yang harus terpenuhi sebelum proses jalan, mis. "user sudah login">

## 5. Alur Utama / Happy Path (WAJIB)

> Langkah demi langkah. Sebutkan **siapa** melakukan **apa**. Boleh dilengkapi diagram (lampirkan).

| No | Aktor | Aksi | Hasil / Sistem melakukan |
|----|-------|------|--------------------------|
| 1 | Merchant | Mengisi form pendaftaran | Sistem menyimpan data draft |
| 2 | Sistem | Validasi kelengkapan | Jika valid → lanjut; jika tidak → tampilkan error |
| 3 | Admin | Verifikasi dokumen | ... |
| 4 | Sistem | Kirim notifikasi hasil | ... |

## 6. Titik Keputusan (Decision Points) (WAJIB)

> Setiap percabangan "jika... maka...". Ini kunci mengurangi ambiguitas.

| Kondisi | Ya → | Tidak → |
|---------|------|---------|
| Dokumen lengkap? | Lanjut ke verifikasi | Kembalikan ke merchant, status "Perlu Perbaikan" |
| | | |

## 7. Alur Alternatif & Exception (WAJIB)

| Kode | Skenario | Perilaku yang diharapkan |
|------|----------|--------------------------|
| ALT-1 | Merchant menutup form di tengah jalan | Data tersimpan sebagai draft, bisa dilanjutkan |
| EXC-1 | Verifikasi ditolak Admin | Status "Ditolak", kirim alasan ke merchant |
| EXC-2 | Sistem eksternal (mis. cek KTP) timeout | Retry 3x, jika gagal → status "Pending", notifikasi admin |

## 8. Status / State Transisi (WAJIB jika ada status)

> Daftar status entitas & transisi yang diizinkan.

`Draft → Diajukan → Diverifikasi → Disetujui / Ditolak`

| Dari | Ke | Dipicu oleh |
|------|----|-------------|
| Draft | Diajukan | Merchant klik "Kirim" |
| Diajukan | Disetujui | Admin approve |
| Diajukan | Ditolak | Admin reject |

## 9. Business Rules (WAJIB)

| ID | Aturan | Contoh |
|----|--------|--------|
| BR-1 | <mis. Pengajuan ulang maks 3x> | Pengajuan ke-4 → tolak |
| BR-2 | | |

## 10. Hasil Akhir (Post-condition) (WAJIB)
- **Jika sukses:** <keadaan akhir, data tersimpan, notifikasi terkirim>
- **Jika gagal:** <keadaan akhir, rollback, dll>

## 11. SLA / Waktu Proses
- <mis. verifikasi maksimal 1x24 jam kerja>

## 12. Acceptance Criteria (WAJIB)
- [ ] **AC-1:** Given <kondisi>, When <aksi>, Then <hasil & status>.
- [ ] **AC-2:** Given exception <X>, When terjadi, Then sistem <perilaku>.

## 13. Diagram / Lampiran
- <link flowchart / BPMN / swimlane / diagram>

## 14. Sign-off
- [ ] Product/BA — Approved
- [ ] Tech Lead — Reviewed & Ready
