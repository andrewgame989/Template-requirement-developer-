<!--
  TEMPLATE REQUIREMENT — MAAS
  Salin file ini untuk setiap requirement baru: requirements/REQ-XXX-nama-fitur.md
  Diisi oleh: Product / Business Analyst (BA)
  Bagian bertanda (WAJIB) tidak boleh dikosongkan. Jika tidak relevan tulis "N/A" + alasan.
-->

# REQ-XXX — <Judul Requirement>

## 0. Metadata (WAJIB)

| Field | Isi |
|-------|-----|
| **ID Requirement** | REQ-XXX |
| **Judul** | <nama fitur/perubahan> |
| **Tanggal dibuat** | YYYY-MM-DD |
| **Dibuat oleh (PIC)** | <nama Product/BA> |
| **Stakeholder / Requester** | <siapa yang minta / divisi> |
| **Prioritas** | 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low |
| **Target rilis** | <sprint / tanggal> |
| **Status** | Draft / In Review / Ready / In Development / Done |
| **Tipe** | Fitur baru / Enhancement / Bugfix / Tech-debt / Riset |
| **Link terkait** | <Jira/Trello, Figma, PRD, dokumen lain> |

---

## 1. Latar Belakang & Masalah (WAJIB)

> Jelaskan **konteks** dan **masalah yang ingin diselesaikan**. Fokus pada "kenapa", bukan "bagaimana".

- **Masalah/Peluang:** <apa yang terjadi saat ini? apa yang salah/kurang?>
- **Siapa yang terdampak:** <user/segmen/tim mana>
- **Dampak jika tidak dikerjakan:** <biaya/risiko/kerugian>
- **Data pendukung:** <angka, keluhan user, hasil riset, tiket support>

---

## 2. Tujuan & Metrik Keberhasilan (WAJIB)

> Apa yang ingin dicapai dan bagaimana kita tahu ini **berhasil**?

- **Tujuan (Goal):** <hasil bisnis yang diharapkan>
- **Metrik keberhasilan (terukur):**
  - <contoh: konversi checkout naik dari 60% → 70% dalam 1 bulan>
  - <contoh: waktu proses turun dari 5 menit → 1 menit>
- **Non-goals (yang TIDAK ingin dicapai):** <supaya scope tidak melebar>

---

## 3. Ruang Lingkup (Scope) (WAJIB)

### ✅ Termasuk (In Scope)
- <hal yang dikerjakan>

### ❌ Tidak Termasuk (Out of Scope)
- <hal yang eksplisit TIDAK dikerjakan sekarang>

---

## 4. User Story & Persona (WAJIB)

> Format: **Sebagai** <peran>, **saya ingin** <aksi>, **agar** <manfaat>.

| No | User Story | Persona/Role |
|----|------------|--------------|
| US-1 | Sebagai ..., saya ingin ..., agar ... | <mis. Pelanggan, Admin, Merchant> |
| US-2 | | |

---

## 5. Kebutuhan Fungsional (Functional Requirements) (WAJIB)

> Detail **apa** yang harus dilakukan sistem. Nomori agar mudah dirujuk saat testing.

| ID | Deskripsi kebutuhan | Prioritas (Must/Should/Could) |
|----|---------------------|-------------------------------|
| FR-1 | Sistem harus ... | Must |
| FR-2 | Sistem harus ... | Should |
| FR-3 | | |

---

## 6. Alur / Flow (WAJIB)

> Jelaskan langkah demi langkah. Boleh diagram (lampirkan) atau numbered list.

**Happy Path (alur normal):**
1. User membuka ...
2. User mengisi ...
3. Sistem memvalidasi ...
4. Sistem menampilkan ...

**Alternatif / Cabang:**
- Jika <kondisi>, maka <apa yang terjadi>

---

## 7. Business Rules & Validasi (WAJIB)

> Aturan bisnis dan validasi yang harus dipatuhi sistem. **Ini bagian paling sering menimbulkan bug — isi sedetail mungkin.**

| ID | Aturan | Contoh |
|----|--------|--------|
| BR-1 | <mis. Nominal transaksi minimal Rp10.000> | Input Rp5.000 → tolak dengan pesan "..." |
| BR-2 | <mis. 1 user hanya boleh punya 1 akun aktif> | |
| BR-3 | | |

**Validasi field:**

| Field | Wajib? | Tipe/Format | Batasan | Pesan error |
|-------|--------|-------------|---------|-------------|
| <email> | Ya | string, format email | max 100 char | "Format email tidak valid" |
| | | | | |

---

## 8. Edge Cases & Skenario Error (WAJIB)

> Kondisi tidak normal yang HARUS ditangani. Jangan biarkan developer menebak.

| Skenario | Perilaku yang diharapkan |
|----------|--------------------------|
| Data kosong / tidak ditemukan | <tampilkan empty state "..."> |
| Koneksi timeout / API gagal | <retry? pesan? rollback?> |
| Input duplikat | <tolak? update? > |
| User tidak punya akses/permission | <tampilkan 403 / sembunyikan tombol> |
| Nilai batas (0, negatif, maksimum) | <perilaku> |

---

## 9. Kebutuhan Data (WAJIB jika ada data)

- **Data input:** <field apa saja, dari mana sumbernya>
- **Data output:** <apa yang ditampilkan/disimpan/dikirim>
- **Sumber data (source of truth):** <DB, API pihak ketiga, file, dll>
- **Retensi & privasi:** <ada data sensitif/PII? berapa lama disimpan?>
- **Migrasi data:** <perlu migrasi data lama? N/A jika tidak>

---

## 10. Integrasi & Dependency (WAJIB jika ada)

| Sistem/Service | Arah | Detail kontrak / endpoint | Owner |
|----------------|------|---------------------------|-------|
| <mis. Payment Gateway> | Outbound | POST /charge — lampirkan spec | <tim/vendor> |
| | | | |

- **Dependency ke tim/fitur lain:** <apa yang harus selesai duluan>
- **Lampiran kontrak API / Swagger / Postman:** <link>

---

## 11. Kebutuhan UI/UX (WAJIB untuk fitur ber-UI)

- **Link design (Figma/mockup):** <URL>
- **Komponen baru?** <ya/tidak — jelaskan>
- **Responsive (mobile/desktop):** <perilaku di tiap breakpoint>
- **State yang harus ada:** loading / empty / error / success
- **Copywriting/teks:** <siapa yang menyediakan teks final>
- **Aksesibilitas:** <kebutuhan a11y jika ada>

---

## 12. Kebutuhan Non-Fungsional (NFR)

| Aspek | Kebutuhan |
|-------|-----------|
| **Performa** | <mis. response < 2 detik untuk 95% request> |
| **Skala/Beban** | <mis. mendukung 1.000 request/menit> |
| **Keamanan** | <auth, enkripsi, role/permission> |
| **Kompatibilitas** | <browser/OS/versi app minimum> |
| **Audit/Logging** | <apa yang perlu dicatat> |
| **Compliance** | <regulasi/kebijakan yang harus dipatuhi> |

---

## 13. Acceptance Criteria (WAJIB)

> Kriteria **terukur** yang menentukan requirement selesai. Format Given–When–Then disarankan. Setiap poin harus bisa dijawab **LULUS / TIDAK LULUS**.

- [ ] **AC-1:** Given <kondisi awal>, When <aksi>, Then <hasil yang diharapkan>.
- [ ] **AC-2:** Given ..., When ..., Then ...
- [ ] **AC-3:** ...

---

## 14. Asumsi & Batasan

- **Asumsi:** <hal yang dianggap benar tanpa konfirmasi — mis. "user sudah login">
- **Batasan (constraint):** <keterbatasan teknis/waktu/regulasi>

---

## 15. Risiko

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| <mis. API vendor belum siap> | Development terhambat | Siapkan mock/stub |
| | | |

---

## 16. Pertanyaan Terbuka (Open Questions)

> Semua pertanyaan di sini **harus terjawab** sebelum masuk sprint.

| No | Pertanyaan | Ditujukan ke | Jawaban | Status |
|----|------------|--------------|---------|--------|
| Q-1 | | | | ⏳ Open / ✅ Closed |

---

## 17. Lampiran

- <mockup, diagram, contoh data, spreadsheet, dokumen kontrak, dll>

---

## 18. Sign-off (WAJIB sebelum development)

| Peran | Nama | Status | Tanggal |
|-------|------|--------|---------|
| Product Owner | | ☐ Approved | |
| Business Analyst | | ☐ Approved | |
| Tech Lead / Developer | | ☐ Reviewed & Ready | |
| QA | | ☐ Reviewed | |

> ⚠️ Development **tidak dimulai** sebelum semua sign-off "Approved/Ready" dan seluruh Pertanyaan Terbuka berstatus Closed.
