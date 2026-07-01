<!--
  TEMPLATE 4 — API
  Diisi oleh: Product / BA (kebutuhan) bersama Tech Lead (kontrak teknis).
  Gunakan untuk mendeskripsikan KONTRAK API / INTEGRASI.
  Buat satu file per endpoint (atau kelompok endpoint terkait).
  Bagian (WAJIB) tidak boleh kosong. Jika tidak relevan tulis "N/A" + alasan.
-->

# 🔌 REQ-XXX (API) — <Nama Endpoint>

## 0. Metadata (WAJIB)

| Field | Isi |
|-------|-----|
| **ID** | REQ-XXX-API |
| **Nama endpoint** | <mis. Buat Transaksi> |
| **Dibuat oleh (PIC)** | <Product/BA + Tech Lead> |
| **Tanggal** | YYYY-MM-DD |
| **Prioritas** | 🔴/🟠/🟡/🟢 |
| **Konsumen (consumer)** | <siapa yang memanggil: Web, Mobile, service X, pihak ke-3> |
| **Terkait Flow/Screen/Report** | <ID template lain> |
| **Status** | Draft / In Review / Ready |

---

## 1. Tujuan (WAJIB)
- **Fungsi endpoint:** <apa yang dilakukan API ini>
- **Kebutuhan bisnis yang didukung:** <konteks>

## 2. Ringkasan Endpoint (WAJIB)

| Field | Isi |
|-------|-----|
| **Method** | GET / POST / PUT / PATCH / DELETE |
| **Path** | `/api/v1/...` |
| **Autentikasi** | Bearer Token / API Key / None |
| **Otorisasi (role)** | <role yang boleh mengakses> |
| **Idempotent?** | Ya/Tidak (butuh Idempotency-Key?) |

## 3. Request (WAJIB)

**Headers:**
| Header | Wajib? | Contoh |
|--------|--------|--------|
| Authorization | Ya | Bearer <token> |
| Content-Type | Ya | application/json |
| Idempotency-Key | Opsional | uuid |

**Path / Query Parameter:**
| Nama | Di | Tipe | Wajib? | Batasan | Keterangan |
|------|----|------|--------|---------|------------|
| id | path | string | Ya | - | ID transaksi |
| page | query | int | Tidak | ≥1, default 1 | paginasi |

**Body (untuk POST/PUT/PATCH):**
```json
{
  "amount": 150000,
  "payment_method": "VA_BCA",
  "description": "Pembayaran order #123"
}
```

**Aturan field body:**
| Field | Tipe | Wajib? | Batasan / Validasi |
|-------|------|--------|--------------------|
| amount | integer | Ya | ≥ 10000, ≤ 50000000 |
| payment_method | string (enum) | Ya | VA_BCA / VA_BNI / QRIS |
| description | string | Tidak | maks 255 char |

## 4. Response Sukses (WAJIB)

**HTTP 200 / 201:**
```json
{
  "status": "success",
  "data": {
    "transaction_id": "TRX-00123",
    "status": "PENDING",
    "amount": 150000,
    "created_at": "2026-07-01T10:00:00+07:00"
  }
}
```

**Penjelasan field response:**
| Field | Tipe | Keterangan |
|-------|------|------------|
| transaction_id | string | ID unik transaksi |
| status | enum | PENDING / SUCCESS / FAILED |
| created_at | ISO-8601 | zona waktu WIB |

## 5. Response Error (WAJIB)

> Definisikan **semua** kemungkinan error. Ini bagian yang paling sering menyebabkan bug integrasi.

| HTTP | Kode error | Kondisi | Contoh pesan |
|------|-----------|---------|--------------|
| 400 | VALIDATION_ERROR | Body tidak valid | "amount minimal 10000" |
| 401 | UNAUTHORIZED | Token salah/kadaluarsa | "Token tidak valid" |
| 403 | FORBIDDEN | Role tidak diizinkan | "Akses ditolak" |
| 404 | NOT_FOUND | Data tidak ditemukan | "Transaksi tidak ditemukan" |
| 409 | DUPLICATE | Idempotency-Key sudah dipakai | "Request duplikat" |
| 422 | BUSINESS_RULE | Melanggar aturan bisnis | "Saldo tidak cukup" |
| 429 | RATE_LIMITED | Terlalu banyak request | "Coba lagi nanti" |
| 500 | INTERNAL_ERROR | Kesalahan server | "Terjadi kesalahan" |

**Format error standar:**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "amount minimal 10000",
  "errors": [{ "field": "amount", "message": "minimal 10000" }]
}
```

## 6. Business Rules (WAJIB)

| ID | Aturan |
|----|--------|
| BR-1 | <mis. Transaksi hanya bisa dibuat jika merchant status = aktif> |
| BR-2 | <mis. amount di atas 25 juta butuh approval, status = PENDING_REVIEW> |

## 7. Perilaku Khusus
- **Idempotency:** <request dengan Idempotency-Key sama mengembalikan hasil yang sama, tidak buat data ganda>
- **Rate limit:** <mis. 100 req/menit per konsumen>
- **Pagination:** <cursor/offset, ukuran default & maksimum>
- **Efek samping:** <mis. mengirim notifikasi, memanggil service lain>

## 8. Dependency / Integrasi
- **Service yang dipanggil endpoint ini:** <mis. Payment Gateway>
- **Kontrak eksternal terkait:** <link Swagger/Postman pihak ke-3>

## 9. Non-Functional
- **Target latensi:** <mis. p95 < 300 ms>
- **Timeout:** <mis. 10 detik>
- **Logging/audit:** <apa yang dicatat; hindari mencatat data sensitif>
- **Keamanan:** <enkripsi, masking data sensitif, PII>

## 10. Contoh cURL
```bash
curl -X POST https://api.maas.example/api/v1/transactions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":150000,"payment_method":"VA_BCA"}'
```

## 11. Acceptance Criteria (WAJIB)
- [ ] **AC-1:** Given body valid, When POST, Then respons 201 dengan struktur bagian 4.
- [ ] **AC-2:** Given amount < 10000, When POST, Then 400 VALIDATION_ERROR (bagian 5).
- [ ] **AC-3:** Given Idempotency-Key sama dikirim 2x, Then hanya 1 transaksi terbuat.
- [ ] **AC-4:** Given token tidak valid, Then 401 UNAUTHORIZED.

## 12. Lampiran
- <link Swagger/OpenAPI, Postman collection, contoh payload>

## 13. Sign-off
- [ ] Product/BA — Approved (kebutuhan)
- [ ] Tech Lead — Approved (kontrak teknis)
- [ ] Konsumen API (FE/mobile/pihak ke-3) — Reviewed
