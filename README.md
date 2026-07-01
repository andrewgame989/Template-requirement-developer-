# 📋 Template Requirement — MAAS

Repositori ini berisi **template requirement** yang wajib diisi oleh tim **Product** dan **Business Analyst (BA)** sebelum sebuah kebutuhan diteruskan ke tim **Development**.

Tujuannya sederhana:

> **Mengurangi miskomunikasi** antara Product/BA dan Developer, sehingga development menjadi **lebih akurat, lebih cepat, dan minim rework.**

## 🎯 Kenapa template ini ada?

Banyak bug dan keterlambatan development bukan berasal dari kode yang salah, tapi dari **requirement yang tidak jelas**: skenario yang tidak dijelaskan, business rule yang ambigu, atau acceptance criteria yang tidak terukur. Template ini memaksa semua informasi penting dituliskan **di depan**, sebelum satu baris kode ditulis.

## 📂 Struktur Repositori

| File | Kegunaan |
|------|----------|
| [`templates/requirement-template.md`](templates/requirement-template.md) | **Template utama** — salin file ini untuk setiap requirement baru. |
| [`templates/requirement-template-lite.md`](templates/requirement-template-lite.md) | Versi ringkas untuk perubahan kecil / bugfix / minor enhancement. |
| [`guides/panduan-pengisian.md`](guides/panduan-pengisian.md) | Penjelasan tiap bagian + tips mengisi agar tidak ambigu. |
| [`guides/definition-of-ready.md`](guides/definition-of-ready.md) | Checklist "Definition of Ready" — kapan requirement dianggap siap dikerjakan. |
| [`examples/contoh-requirement-terisi.md`](examples/contoh-requirement-terisi.md) | Contoh nyata template yang sudah diisi dengan benar. |

## 🔄 Alur Penggunaan

```
Product/BA                          Developer / Tech Lead
   │                                        │
   │  1. Salin requirement-template.md      │
   │  2. Isi semua bagian wajib             │
   │  3. Lampirkan mockup / data / kontrak  │
   │                                        │
   ├──────── 4. Review bersama ────────────►│
   │                                        │  5. Cek Definition of Ready
   │◄─────── 6. Tanya bagian ambigu ────────┤
   │                                        │
   │  7. Perbaiki & lengkapi                │
   │                                        │
   └──────── 8. Approved → masuk sprint ───►│  9. Development
```

## ✅ Aturan Main

1. **Tidak ada requirement tanpa template.** Development tidak dimulai jika template belum diisi & di-approve.
2. **Bagian bertanda `(WAJIB)` tidak boleh dikosongkan.** Jika benar-benar tidak relevan, tulis `N/A` beserta alasannya.
3. **Setiap asumsi harus ditulis.** Asumsi yang tidak ditulis = risiko bug.
4. **Acceptance Criteria harus terukur** (bisa dijawab lulus/tidak lulus), bukan kalimat opini.
5. **Semua pertanyaan terbuka** harus terjawab sebelum requirement masuk sprint.

## 🚀 Cara Mulai

```bash
# Salin template untuk fitur baru
cp templates/requirement-template.md requirements/REQ-XXX-nama-fitur.md
```

Lalu isi sesuai [panduan pengisian](guides/panduan-pengisian.md).
