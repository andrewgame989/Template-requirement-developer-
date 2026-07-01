# 📖 Panduan Pengisian Template Requirement

Dokumen ini membantu tim **Product** dan **BA** mengisi template dengan benar sehingga developer tidak perlu menebak. **Aturan emas: kalau developer bisa salah menafsirkan, berarti bagian itu belum cukup jelas.**

---

## Prinsip Umum

1. **Tulis untuk orang yang tidak ikut meeting.** Developer mungkin membaca ini seminggu setelah diskusi. Jangan mengandalkan konteks lisan.
2. **Spesifik & terukur.** Hindari kata ambigu: "cepat", "banyak", "kadang-kadang", "user-friendly". Ganti dengan angka/kondisi konkret.
3. **Satu requirement = satu tujuan.** Jangan gabungkan banyak fitur berbeda dalam satu dokumen.
4. **Tulis semua asumsi.** Asumsi yang tidak ditulis adalah sumber bug nomor satu.
5. **Gambar membantu.** Lampirkan flow diagram, mockup, atau contoh data bila memungkinkan.

---

## Penjelasan Per Bagian

### 0. Metadata
Identitas requirement. **Prioritas** dan **target rilis** membantu tim dev merencanakan sprint. Pastikan **PIC** jelas — siapa yang bisa ditanya jika ada yang ambigu.

### 1. Latar Belakang & Masalah
Jawab **"kenapa ini dikerjakan"**. Developer yang paham masalahnya akan memberi solusi lebih baik. Sertakan data nyata (keluhan user, angka, tiket).
> ❌ "User minta fitur export."
> ✅ "30% tiket support bulan ini meminta export data transaksi ke Excel karena tidak bisa rekap manual > 500 baris."

### 2. Tujuan & Metrik Keberhasilan
Definisikan **sukses secara terukur**. Tanpa metrik, tidak ada cara membuktikan fitur berhasil.
> ✅ "Waktu rekap turun dari 30 menit → < 2 menit."

**Non-goals** penting untuk mencegah scope melebar.

### 3. Ruang Lingkup
Tuliskan **Out of Scope** seeksplisit In Scope. Banyak konflik terjadi karena developer & product beda asumsi soal "apakah X termasuk".

### 4. User Story
Gunakan format **Sebagai–Saya ingin–Agar**. Fokus pada peran & manfaat, bukan solusi teknis.

### 5. Kebutuhan Fungsional
Daftar **apa** yang sistem lakukan. Beri **ID (FR-1, FR-2)** agar mudah dirujuk saat testing & QA. Gunakan prioritas **MoSCoW** (Must/Should/Could/Won't).

### 6. Alur / Flow
Tulis **happy path** langkah demi langkah, lalu cabang alternatifnya. Diagram sangat membantu di sini.

### 7. Business Rules & Validasi ⭐
**Bagian paling kritikal.** Sebagian besar bug lahir dari business rule yang ambigu. Tulis:
- Aturan bisnis + contoh konkret.
- Validasi tiap field: wajib/tidak, format, batas min/max, dan **pesan error persisnya**.
> ❌ "Validasi nominal."
> ✅ "Nominal minimal Rp10.000, maksimal Rp50.000.000. Jika di luar rentang → tolak, pesan: 'Nominal harus antara Rp10.000 dan Rp50.000.000'."

### 8. Edge Cases & Skenario Error ⭐
Isi kondisi tidak normal: data kosong, timeout, duplikat, tanpa izin, nilai batas. **Jika tidak ditulis, developer akan menebak — dan tebakan sering salah.**

### 9. Kebutuhan Data
Dari mana data datang, ke mana disimpan, siapa "source of truth". Tandai **data sensitif/PII** untuk pertimbangan keamanan & compliance.

### 10. Integrasi & Dependency
Sebutkan service/API eksternal + lampirkan **kontrak API (Swagger/Postman)**. Sebutkan dependency ke tim/fitur lain agar urutan pengerjaan jelas.

### 11. UI/UX
Lampirkan **link Figma**. Pastikan menyebut state **loading / empty / error / success** — sering terlupa dan menyebabkan tampilan "kosong" saat data belum ada.

### 12. Non-Functional Requirements (NFR)
Performa, beban, keamanan, kompatibilitas, logging, compliance. Sering diabaikan tapi menentukan arsitektur.

### 13. Acceptance Criteria ⭐
**Kontrak antara Product dan Developer.** Harus bisa dijawab **LULUS/TIDAK LULUS**. Gunakan **Given–When–Then**.
> ✅ "Given user punya 3 transaksi, When klik Export, Then file .xlsx berisi 3 baris + header terunduh."

Jika sebuah requirement tidak punya AC yang terukur, requirement itu **belum siap**.

### 14. Asumsi & Batasan
Semua yang "dianggap benar" — tulis. Mis. "user sudah login", "data selalu dalam Rupiah".

### 15. Risiko
Antisipasi hal yang bisa menghambat + mitigasinya.

### 16. Pertanyaan Terbuka
Kumpulan hal yang belum pasti. **Semua harus Closed sebelum masuk sprint.**

### 17. Lampiran
Mockup, diagram, contoh data, dokumen kontrak.

### 18. Sign-off
Persetujuan formal. Development tidak dimulai sebelum semua pihak setuju dan semua Open Question tertutup.

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
| "nanti", "menyusul" | jadikan Pertanyaan Terbuka dengan deadline |

---

## Checklist Cepat Sebelum Submit

- [ ] Semua bagian **(WAJIB)** terisi (atau ditandai N/A + alasan).
- [ ] Tidak ada kata ambigu dari tabel di atas.
- [ ] Setiap Acceptance Criteria bisa dijawab lulus/tidak lulus.
- [ ] Business rule punya contoh konkret.
- [ ] Edge case & skenario error sudah ditulis.
- [ ] Mockup/diagram/kontrak API sudah dilampirkan (jika relevan).
- [ ] Semua Pertanyaan Terbuka punya PIC.

Lihat juga: [Definition of Ready](definition-of-ready.md).
