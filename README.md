# 📋 Template Requirement — MAAS

Repositori ini berisi **template requirement** yang wajib diisi oleh tim **Product** dan **Business Analyst (BA)** sebelum sebuah kebutuhan diteruskan ke tim **Development**.

Tujuannya sederhana:

> **Mengurangi miskomunikasi** antara Product/BA dan Developer, sehingga development menjadi **lebih akurat, lebih cepat, dan minim rework.**

## 🧩 4 Jenis Template

Requirement dipecah menjadi **4 template** sesuai jenis kebutuhan. Satu fitur biasanya membutuhkan **lebih dari satu** template (mis. sebuah fitur punya Flow + Screen + API), dan template-template itu saling dirujuk lewat kolom **"Terkait"** di metadata.

| # | Template | Kapan dipakai | File |
|---|----------|---------------|------|
| 1 | 🔄 **Flow / Process** | Menjelaskan **alur proses bisnis**: aktor, trigger, langkah, percabangan, status, exception. | [`templates/1-flow-process-template.md`](templates/1-flow-process-template.md) |
| 2 | 🖥️ **Screen / UI** | Menjelaskan sebuah **halaman/layar**: field, komponen, aksi, validasi, state, navigasi. | [`templates/2-screen-template.md`](templates/2-screen-template.md) |
| 3 | 📊 **Report** | Menjelaskan **laporan/export/dashboard**: parameter, kolom, rumus, agregasi, sumber data. | [`templates/3-report-template.md`](templates/3-report-template.md) |
| 4 | 🔌 **API** | Menjelaskan **kontrak API/integrasi**: method, request, response, error, business rule. | [`templates/4-api-template.md`](templates/4-api-template.md) |

### 📘 Template 5 — TED (sisi Developer)

Template 1–4 diisi **Product/BA** sebelum development. Setelah development selesai, tim **Developer** mengisi **TED (Technical Engineering Document)** — pengganti TSD — sebagai **dokumen serah terima ke Internal Developer & Application Support saat naik production**.

| # | Template | Diisi oleh | File |
|---|----------|-----------|------|
| 5 | 📘 **TED** | Developer / Tech Lead | [`templates/5-ted-template.md`](templates/5-ted-template.md) |

> **Uji kelayakan TED:** bisakah App Support menangani insiden **jam 2 pagi** hanya dengan dokumen ini, tanpa menelepon developer? Kalau belum bisa, TED belum layak diserahterimakan.

Pendukung TED:

| File | Kegunaan |
|------|----------|
| [`guides/ted-handover-checklist.md`](guides/ted-handover-checklist.md) | **Quality gate 7 tahap** sebelum naik production. Satu item wajib gagal → project ditunda. |
| [`guides/ted-gap-analysis.md`](guides/ted-gap-analysis.md) | Hasil review template TED lama + prioritas perbaikan (impact/urgency/effort). |

### 🔗 Cara memilih template

```
Ada alur/proses bisnis banyak langkah?  → pakai Template 1 (Flow)
Ada halaman/layar yang dilihat user?    → pakai Template 2 (Screen)
Ada laporan / export / angka rekap?     → pakai Template 3 (Report)
Ada endpoint / integrasi antar sistem?  → pakai Template 4 (API)
```

Contoh: fitur **"Export Transaksi"** = Flow (proses export) + Screen (tombol & modal filter) + Report (kolom & rumus file) + API (endpoint ambil data).

## 📂 Struktur Repositori

| Folder / File | Kegunaan |
|---------------|----------|
| [`templates/`](templates/) | 4 template requirement (Flow, Screen, Report, API). |
| [`guides/minimum-requirements.md`](guides/minimum-requirements.md) | **Artefak wajib per template** (API=spek, Screen=UI/UX, Report=file dummy, dst). |
| [`guides/panduan-pengisian.md`](guides/panduan-pengisian.md) | Panduan mengisi + daftar kata ambigu yang harus dihindari. |
| [`guides/definition-of-ready.md`](guides/definition-of-ready.md) | Checklist "Definition of Ready" — kapan requirement siap dikerjakan. |
| [`examples/`](examples/) | Contoh keempat template yang sudah diisi (fitur "Export Transaksi"). |
| [`requirements/`](requirements/) | Tempat menyimpan requirement aktif yang sudah diisi. |
| [`guides/ted-handover-checklist.md`](guides/ted-handover-checklist.md) | Quality gate TED sebelum serah terima production. |
| [`guides/ted-gap-analysis.md`](guides/ted-gap-analysis.md) | Review & prioritas perbaikan template TED. |

## 🔄 Alur Penggunaan

```
Product/BA                              Developer / Tech Lead
   │                                          │
   │ 1. Pilih template yang relevan (1–4)     │
   │ 2. Salin & isi semua bagian wajib        │
   │ 3. Rujuk antar template lewat "Terkait"  │
   │ 4. Lampirkan mockup / kontrak / data     │
   ├────────── 5. Review bersama ────────────►│
   │                                          │ 6. Cek Definition of Ready
   │◄───────── 7. Tanya bagian ambigu ────────┤
   │ 8. Perbaiki & lengkapi                   │
   └────────── 9. Approved → sprint ─────────►│ 10. Development
```

## ✅ Aturan Main

1. **Tidak ada requirement tanpa template.** Development tidak dimulai jika template belum diisi & di-approve.
2. **Bagian bertanda `(WAJIB)` tidak boleh dikosongkan.** Jika benar-benar tidak relevan, tulis `N/A` beserta alasannya.
3. **Setiap asumsi harus ditulis.** Asumsi yang tidak ditulis = risiko bug.
4. **Acceptance Criteria harus terukur** (bisa dijawab lulus/tidak lulus), bukan kalimat opini.
5. **Semua Pertanyaan Terbuka** harus terjawab sebelum requirement masuk sprint.
6. **Artefak wajib per template harus lengkap** (lihat [minimum-requirements](guides/minimum-requirements.md)): API wajib punya spek, Screen wajib punya desain UI/UX, Report wajib punya contoh file dummy, Flow wajib punya diagram. Tanpa itu, requirement dikembalikan.

## 🚀 Cara Mulai

```bash
# Contoh: fitur baru butuh Flow + Screen + API
cp templates/1-flow-process-template.md requirements/REQ-020-checkout-flow.md
cp templates/2-screen-template.md        requirements/REQ-020-checkout-screen.md
cp templates/4-api-template.md           requirements/REQ-020-checkout-api.md
```

Lalu isi sesuai [panduan pengisian](guides/panduan-pengisian.md) dan pastikan lolos [Definition of Ready](guides/definition-of-ready.md).
