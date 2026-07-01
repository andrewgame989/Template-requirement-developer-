# 📖 Panduan Pengisian Template Requirement

Dokumen ini membantu tim **Product** dan **BA** mengisi ke-4 template dengan benar sehingga developer tidak perlu menebak. **Aturan emas: kalau developer bisa salah menafsirkan, berarti bagian itu belum cukup jelas.**

---

## Prinsip Umum (berlaku untuk semua template)

1. **Tulis untuk orang yang tidak ikut meeting.** Developer mungkin membaca ini seminggu setelah diskusi. Jangan mengandalkan konteks lisan.
2. **Spesifik & terukur.** Hindari kata ambigu: "cepat", "banyak", "kadang-kadang", "user-friendly". Ganti dengan angka/kondisi konkret.
3. **Satu template = satu artefak.** Satu Flow, satu Screen, satu Report, atau satu endpoint API per file.
4. **Rujuk antar template.** Isi kolom **"Terkait"** di metadata agar Flow ↔ Screen ↔ Report ↔ API saling terhubung.
5. **Tulis semua asumsi & edge case.** Asumsi yang tidak ditulis adalah sumber bug nomor satu.

---

## Memilih Template yang Tepat

| Kebutuhan | Template |
|-----------|----------|
| Ada **alur/proses bisnis** dengan banyak langkah & percabangan | **1 — Flow / Process** |
| Ada **halaman/layar** yang dilihat & diinteraksi user | **2 — Screen / UI** |
| Ada **laporan, export, dashboard, angka rekap** | **3 — Report** |
| Ada **endpoint / integrasi antar sistem** | **4 — API** |

> Satu fitur sering butuh **beberapa** template sekaligus. Contoh "Export Transaksi": Flow (proses) + Screen (tombol & modal) + Report (kolom & rumus) + API (endpoint data).

---

## Tips Per Template

### 🔄 Template 1 — Flow / Process
- **Titik Keputusan (bag. 6)** dan **Alur Alternatif & Exception (bag. 7)** adalah inti. Setiap "jika... maka..." harus ditulis.
- Jika entitas punya **status** (Draft/Disetujui/dll), isi tabel **transisi status** — transisi yang tidak ditulis dianggap tidak diizinkan.
- Sertakan **diagram** (flowchart/BPMN/swimlane) bila prosesnya kompleks.
> ❌ "Admin verifikasi lalu selesai."
> ✅ "Admin verifikasi → jika dokumen lengkap → status 'Disetujui' + notifikasi; jika tidak → status 'Perlu Perbaikan' + alasan dikirim ke merchant."

### 🖥️ Template 2 — Screen / UI
- **Tabel field (bag. 3)** wajib menyebut **sumber data** tiap field (dari API mana / statis) dan apakah **editable**.
- **State (bag. 6)** paling sering terlupa. Selalu isi loading / empty / error / success / no-access.
- **Aksi & tombol (bag. 5)**: sebutkan kondisi tombol aktif dan API/navigasi tujuannya.
- Lampirkan **link Figma** — mockup mengurangi ratusan pertanyaan.

### 📊 Template 3 — Report
- **Kolom & rumus (bag. 3)** adalah yang paling kritikal. Setiap kolom harus punya **sumber data atau rumus** yang jelas.
- **Aturan perhitungan (bag. 7)**: jelaskan data mana yang dihitung/dikecualikan (mis. transaksi gagal tidak dihitung), pembulatan, dan penanganan refund.
- Tegaskan **zona waktu** dan apakah data **real-time atau batch**.
> ❌ "Tampilkan total penjualan."
> ✅ "Total Penjualan = SUM(amount) untuk status='Sukses' saja, dalam Rupiah, zona waktu WIB."

### 🔌 Template 4 — API
- **Response Error (bag. 5)** wajib lengkap — daftarkan semua kode error, kapan terjadi, dan pesannya. Ini penyebab utama bug integrasi.
- Tegaskan **validasi tiap field** request (bag. 3) dan **business rule** (bag. 6).
- Jelaskan **idempotency, rate limit, pagination** bila relevan.
- Lampirkan **Swagger/OpenAPI atau Postman collection**.

---

## ⚠️ Kata-kata Ambigu yang Harus Dihindari

| Hindari | Ganti dengan |
|---------|--------------|
| "cepat" | "< 2 detik" |
| "banyak data" | "hingga 10.000 baris" |
| "beberapa kali" | "maksimal 3 kali" |
| "seharusnya" | "harus" / "wajib" |
| "user-friendly" | kriteria konkret / mockup |
| "dan lain-lain", "dsb" | daftar lengkap semua kasus |
| "nanti", "menyusul" | jadikan Pertanyaan Terbuka dengan deadline & PIC |

---

## Bagian yang Ada di Semua Template

Apa pun templatenya, pastikan bagian ini kuat:

- **Metadata** — ID, PIC, prioritas, dan kolom "Terkait" terisi.
- **Business Rules** — aturan + contoh konkret.
- **Acceptance Criteria** — format Given–When–Then, bisa dijawab **LULUS/TIDAK LULUS**. Jika sebuah requirement tidak punya AC terukur, requirement itu **belum siap**.
- **Sign-off** — tidak ada development sebelum semua pihak approve.

---

## Checklist Cepat Sebelum Submit

- [ ] Template yang dipilih sesuai jenis kebutuhan.
- [ ] Semua bagian **(WAJIB)** terisi (atau ditandai N/A + alasan).
- [ ] Kolom **"Terkait"** merujuk template lain yang berhubungan.
- [ ] Tidak ada kata ambigu dari tabel di atas.
- [ ] Setiap Acceptance Criteria bisa dijawab lulus/tidak lulus.
- [ ] Business rule & edge case sudah ditulis dengan contoh.
- [ ] Mockup / diagram / kontrak API sudah dilampirkan (jika relevan).

Lihat juga: [Definition of Ready](definition-of-ready.md).
