# ⛔ Minimum Requirements per Template

Ringkasan **artefak wajib** yang harus disiapkan tim **Product/BA** untuk setiap jenis template. Jika artefak wajib belum ada, requirement **dikembalikan** dan **tidak masuk sprint**.

> Aturan: setiap template punya **1 artefak "kunci"** yang paling sering hilang. Tanpa artefak kunci ini, template dianggap belum layak dibaca developer.

---

## 🔑 Artefak Kunci (yang paling sering terlupa)

| Template | Artefak KUNCI yang WAJIB ada |
|----------|------------------------------|
| 🔄 **Flow / Process** | **Diagram alur** (flowchart / BPMN / swimlane) |
| 🖥️ **Screen / UI** | **Desain UI/UX** (Figma/mockup, lengkap semua state) |
| 📊 **Report** | **Contoh file dummy** hasil laporan (`.xlsx`/`.csv`/`.pdf`) |
| 🔌 **API** | **Spesifikasi API** (OpenAPI/Swagger atau Postman collection) |

---

## 📋 Daftar Lengkap per Template

### 🔄 Flow / Process
- [ ] Diagram alur (flowchart/BPMN/swimlane) — **KUNCI**
- [ ] Daftar aktor & peran
- [ ] Trigger & pre-condition
- [ ] Semua titik keputusan ("jika…maka…")
- [ ] Alur alternatif & exception (input salah, sistem gagal, akses ditolak)
- [ ] Transisi status (jika ada status)
- [ ] Business rules + contoh
- [ ] Post-condition (sukses & gagal)

### 🖥️ Screen / UI
- [ ] Desain UI/UX (Figma/mockup/prototype) yang bisa diakses — **KUNCI**
- [ ] Semua state di desain: normal, loading, empty, error, success
- [ ] Daftar field + sumber data (API mana/statis)
- [ ] Validasi + pesan error tiap input
- [ ] Mapping tiap tombol → API/navigasi
- [ ] Copywriting final (bukan lorem ipsum)
- [ ] Perilaku responsif (desktop & mobile)
- [ ] Hak akses per role

### 📊 Report
- [ ] Contoh file dummy hasil laporan (`.xlsx`/`.csv`/`.pdf`/mockup dashboard) — **KUNCI**
- [ ] Definisi tiap kolom + sumber/rumus
- [ ] Parameter/filter + default & batasan
- [ ] Aturan perhitungan (dihitung vs dikecualikan, pembulatan, refund)
- [ ] Agregasi/ringkasan + letaknya
- [ ] Sumber data & zona waktu (real-time/batch)
- [ ] Batas jumlah baris & pola nama file
- [ ] Hak akses data

### 🔌 API
- [ ] Spesifikasi API (OpenAPI/Swagger atau Postman) — **KUNCI**
- [ ] Contoh request lengkap (headers, param, body)
- [ ] Contoh response sukses + penjelasan field
- [ ] Daftar lengkap response error (semua HTTP code & pesan)
- [ ] Aturan validasi tiap field request
- [ ] Autentikasi & otorisasi
- [ ] Business rules + contoh
- [ ] Perilaku khusus: idempotency, rate limit, pagination, efek samping

---

## Cara Pakai

1. Product/BA mengisi template + menyiapkan **artefak wajib** di atas.
2. Saat review, Tech Lead memeriksa daftar ini. **Satu item wajib tidak ada → dikembalikan.**
3. Setelah semua ✅ dan lolos [Definition of Ready](definition-of-ready.md), requirement boleh masuk sprint.
