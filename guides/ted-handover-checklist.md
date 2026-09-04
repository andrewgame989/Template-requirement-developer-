# ✅ TED Handover Checklist — Quality Gate Sebelum Naik Production

Checklist ini dipakai **Tech Lead** dan **Application Support** untuk memutuskan apakah TED layak diterima sebagai dokumen serah terima.

> **Aturan main:** satu item ⛔ WAJIB tidak terpenuhi → dokumen **dikembalikan**, project **tidak dijadwalkan** naik production.

---

## 🎯 Uji Utama (The One Test)

> **Bisakah App Support menangani insiden jam 2 pagi hanya dengan dokumen ini, tanpa menelepon developer?**

Jika jawabannya "tidak", berhenti di sini. Perbaiki Bagian D dulu.

---

## ⛔ Gate 1 — Kelengkapan Dasar (Tech Lead)

- [ ] Nomor TED, versi, tanggal, klasifikasi dokumen terisi
- [ ] Klasifikasi dokumen **sesuai isi** — `Confidential`/`Restricted` jika memuat IP/hostname/detail infrastruktur
- [ ] Referensi dokumen lengkap: CR/ticket, BRD/PRD, Figma, SIT/UAT report
- [ ] Daftar singkatan terisi (dokumen dibaca lintas unit)
- [ ] Version history terisi beserta tanggal & status approval
- [ ] Setiap requirement punya **ID unik** (`TED-xxxxx-Rnn`) dan ID itu dipakai konsisten di API, DB, Test, dan Code Dependency
- [ ] Tidak ada kolom wajib yang kosong
- [ ] Tidak ada `N/A` tanpa alasan
- [ ] **Out of Scope** dinyatakan eksplisit
- [ ] Bebas typo & kalimat duplikat (dokumen ini jadi rujukan baku)

## ⛔ Gate 2 — Desain Teknis

- [ ] Technology Vision terisi (Stability / Scalability / Security / UX) — bukan tabel kosong
- [ ] Diagram arsitektur ada **beserta penjelasan komponen**, bukan gambar tanpa narasi
- [ ] Hanya komponen/server **yang terdampak** yang dicantumkan (bukan dump seluruh server)
- [ ] Kebutuhan resource baru & firewall request tercatat beserta status pengadaannya
- [ ] **Matriks kelengkapan C.0 terisi** — keempat pilar (Flow / UI / API / File) dinyatakan `Ada` atau `Tidak ada` beserta alasannya
- [ ] **Flow Process**: diagram + langkah + decision point + **exception & alur alternatif** (bukan hanya happy path) + transisi status
- [ ] **UI / Screen**: link desain aktif, daftar field + validasi + pesan error, mapping tombol → API, **semua state** (normal/loading/empty/error/success/no-access), hak akses per role
- [ ] **API Contract** lengkap: endpoint, auth, request/response, **seluruh error code**, timeout, retry
- [ ] Link Swagger/Postman aktif dan bisa diakses
- [ ] **File/Batch layout** lengkap: arah, pattern nama file, layout header/body/trailer, penanganan file reject, contoh isi file
- [ ] **DDL ada di dalam dokumen**, bukan hanya "lampiran diagram"
- [ ] Kamus kolom, index, dan justifikasi index terisi
- [ ] **Estimasi growth + retention + purging policy** terisi
- [ ] **Script rollback DB** tersedia

## ⛔ Gate 3 — Keamanan (wajib untuk payment)

- [ ] **Access control matrix per role** terisi (view/add/edit/delete/bulk/export/approve)
- [ ] **Maker–checker / dual control** untuk aksi berisiko (delete, bulk upload, ubah routing) dinyatakan — jika tidak ada, ada justifikasinya
- [ ] **Spesifikasi audit trail** jelas: aksi apa, data apa (nilai lama → nilai baru), disimpan di mana, retensi berapa lama
- [ ] Klasifikasi data terisi; data sensitif dipastikan **tidak ikut ter-log**
- [ ] Jika menyentuh data kartu (PAN/CVV/track) → kontrol **PCI-DSS** dirujuk & IT Security sudah dilibatkan
- [ ] Validasi file upload & batas maksimum baris ditetapkan
- [ ] Security Code Review dinyatakan `Pass` oleh IT Security (bukan kosong)
- [ ] Hasil scan dependency (CVE) dilampirkan

## ⛔ Gate 4 — Operasional (diverifikasi oleh **Application Support**)

Ini gate yang paling sering gagal. App Support yang menilai, bukan developer.

- [ ] **Parameter & konfigurasi per environment** terisi lengkap (Dev/Test/Prod) beserta efek jika salah
- [ ] **Batch/scheduler** terdokumentasi: jadwal, durasi normal, dependency, cara rerun, aman di-rerun atau tidak
- [ ] **Lokasi log** disebutkan konkret (path/index) beserta pola pencariannya
- [ ] Cara menelusuri satu transaksi lintas komponen (correlation/trace ID) dijelaskan
- [ ] **Alert & threshold** sudah dipasang di monitoring, bukan baru rencana
- [ ] **Troubleshooting guide minimal 5 skenario**, dengan langkah yang bisa dieksekusi App Support
- [ ] Setiap skenario menyatakan: boleh ditangani App Support sendiri atau harus eskalasi
- [ ] **Known limitation & workaround** ditulis apa adanya
- [ ] **Matriks eskalasi** lengkap dengan nama, kontak, dan SLA respon
- [ ] **Akses App Support sudah diberikan dan sudah dicoba** (aplikasi, monitoring, log)
- [ ] **Sesi knowledge transfer sudah dilakukan**, bukan sekadar kirim dokumen

## ⛔ Gate 5 — Deployment & Rollback

- [ ] Urutan deployment step-by-step dengan executor & cara verifikasi tiap step
- [ ] **Point of no return** ditandai
- [ ] **Rollback plan dapat dieksekusi** — bukan `N/A`, bukan "rollback aplikasi saja"
- [ ] Kriteria trigger rollback bersifat **objektif dan terukur**
- [ ] Batas waktu keputusan rollback ditetapkan
- [ ] Penanganan data yang masuk setelah deploy (jika rollback) dijelaskan
- [ ] **Checklist PIV** siap dengan PIC-nya
- [ ] Periode monitoring intensif pasca go-live disepakati
- [ ] Kebutuhan notifikasi ke merchant/bank/partner sudah diidentifikasi & dijadwalkan
- [ ] `Rollback Impact` di Code Dependency terisi bermakna (bukan `N/A` massal)

## ⛔ Gate 6 — Testing

- [ ] Test scenario **terstruktur satu baris satu skenario** (bukan paragraf menumpuk)
- [ ] Mencakup **skenario negatif** dan **regresi fungsi existing**
- [ ] Link evidence SIT & UAT tersedia dan bisa diakses
- [ ] **UAT sudah di-sign-off** oleh user/business
- [ ] Open defect yang dibawa ke production tercatat beserta alasan penerimaan & workaround-nya

## ⛔ Gate 7 — Approval

- [ ] Seluruh unit reviewer sudah menyatakan `Impacted` / `Not Impacted` — **tidak ada yang kosong**
- [ ] Unit yang menyatakan `Impacted` sudah mengisi Notes
- [ ] **Application Support sudah menandatangani** — mereka penerima serah terima
- [ ] IT Security sudah menandatangani
- [ ] IT Architecture sudah menandatangani
- [ ] Product Management sudah menerima (Accepted by)
- [ ] Dokumen versi final sudah didistribusikan ke Dev & App Support, dan tersimpan di repositori dokumen

---

## 📊 Keputusan

| Kondisi | Keputusan |
|---------|-----------|
| Seluruh gate ✅ | **APPROVED** — boleh dijadwalkan naik production |
| Gate 1–3 ada yang ⛔ | **RETURNED** — perbaiki, review ulang |
| Gate 4 ada yang ⛔ | **BLOCKED** — App Support belum siap menerima. Serah terima tidak sah |
| Gate 5–6 ada yang ⛔ | **HOLD** — tunda jadwal implementasi |
| Gate 7 belum lengkap | **PENDING APPROVAL** — belum boleh eksekusi |

---

## 🔁 Kapan Checklist Ini Dijalankan

```
H-14   Dev submit TED draft            -> Tech Lead cek Gate 1–3
H-10   Review lintas unit              -> Gate 7 (sign-off Impacted/Not Impacted)
H-7    Handover session ke App Support -> App Support cek Gate 4 (mereka yang menilai)
H-5    Review deployment plan          -> Gate 5
H-3    SIT/UAT selesai & sign-off      -> Gate 6
H-2    Keputusan final                 -> APPROVED / HOLD
H-0    Implementasi + PIV
H+3    Review pasca implementasi, TED difinalkan ke V-final
```
