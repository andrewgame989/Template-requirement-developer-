# ✅ Definition of Ready (DoR)

**Definition of Ready** adalah daftar syarat yang harus dipenuhi sebuah requirement **sebelum boleh masuk ke sprint / mulai dikerjakan developer**.

Gunakan checklist ini saat sesi **refinement / grooming** bersama Product, BA, dan Developer. Jika ada satu item pun yang **tidak** tercentang, requirement dikembalikan ke Product/BA untuk dilengkapi.

---

## Checklist Definition of Ready

### 📌 Kejelasan
- [ ] Masalah & tujuan jelas (bagian 1 & 2 terisi).
- [ ] Metrik keberhasilan terukur.
- [ ] Scope (In & Out) sudah didefinisikan.

### 📝 Detail Kebutuhan
- [ ] User story ditulis dengan format yang benar.
- [ ] Kebutuhan fungsional lengkap dan diberi ID.
- [ ] Alur/flow (happy path + alternatif) tersedia.
- [ ] Business rules & validasi field lengkap beserta contoh.
- [ ] Edge case & skenario error sudah ditulis.

### 🔗 Ketergantungan
- [ ] Data & source of truth teridentifikasi.
- [ ] Integrasi/dependency & kontrak API tersedia (jika ada).
- [ ] Dependency ke tim/fitur lain sudah dipetakan.

### 🎨 Desain (untuk fitur ber-UI)
- [ ] Link Figma/mockup terlampir.
- [ ] State loading/empty/error/success dijelaskan.
- [ ] Copywriting final tersedia.

### 🎯 Kriteria & Kesepakatan
- [ ] Acceptance Criteria terukur (Given–When–Then).
- [ ] Asumsi & batasan ditulis.
- [ ] Semua Pertanyaan Terbuka berstatus **Closed**.
- [ ] Estimasi effort sudah didiskusikan tim dev.
- [ ] Sign-off Product/BA & Tech Lead sudah "Approved/Ready".

---

## Aturan

> Sebuah requirement **hanya boleh masuk sprint** jika **seluruh** item DoR tercentang.

Ini melindungi tim dari:
- Development dimulai dengan asumsi yang salah.
- Rework karena requirement berubah di tengah jalan.
- Bug akibat business rule atau edge case yang tidak dijelaskan.

---

## Bonus: Definition of Done (DoD)

Sebagai pelengkap, berikut acuan **Definition of Done** — kapan pekerjaan dianggap selesai (diisi/disepakati tim dev):

- [ ] Semua Acceptance Criteria lulus.
- [ ] Code review selesai & di-approve.
- [ ] Unit/integration test ditulis & lulus.
- [ ] Tidak ada bug blocker/critical terbuka.
- [ ] Sudah diuji QA sesuai Acceptance Criteria.
- [ ] Dokumentasi/README diperbarui bila perlu.
- [ ] Di-deploy ke staging & disetujui Product.
