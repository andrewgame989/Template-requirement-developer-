# Generator Template TED (.docx)

Script untuk menghasilkan [`templates/Template-TED.docx`](../../templates/Template-TED.docx).

Sumber kebenaran isi tetap [`templates/5-ted-template.md`](../../templates/5-ted-template.md) dan
[`guides/panduan-pengisian-ted.md`](../../guides/panduan-pengisian-ted.md); script ini menyusunnya
menjadi dokumen Word berformat korporat lengkap dengan kotak petunjuk pengisian di tiap bagian.

## Cara menjalankan

```bash
cd tools/ted-docx
npm install docx
node build.js
# hasil: Template-TED-v2.docx  ->  salin ke ../../templates/Template-TED.docx
```

## Struktur file

| File | Isi |
|------|-----|
| `lib.js` | Helper render: heading, tabel, kotak CARA MENGISI / PERHATIAN / WAJIB, area isian |
| `part1.js` | Cover, Petunjuk Umum Pengisian, Bagian 0 (Identitas), A (Executive Summary), B (Technical Solution) |
| `part2.js` | Bagian C (Detail Design) — 4 pilar: Flow, UI, API, File + DB, Security, Impact, Code Dependency, Security Code Review |
| `part3.js` | Bagian D (Operational Handover), E (Deployment & Rollback), F (Testing), G (Risk), H (Approval) |
| `build.js` | Perakitan dokumen: styles, daftar isi, header/footer, margin |

## Kalau template berubah

Ubah `.md` lebih dulu, lalu sesuaikan `part*.js`, jalankan ulang `build.js`, dan salin hasilnya ke `templates/`.
Jangan mengedit `.docx` hasil generate secara manual — perubahan akan hilang saat regenerate berikutnya.
