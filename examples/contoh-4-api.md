<!-- CONTOH terisi — Template 4 (API). Fitur: Export Transaksi. -->

# 🔌 REQ-014 (API) — Ambil Riwayat Transaksi

## 0. Metadata

| Field | Isi |
|-------|-----|
| **ID** | REQ-014-API |
| **Nama endpoint** | Ambil Riwayat Transaksi Merchant |
| **Dibuat oleh (PIC)** | Sinta (BA) + Bagus (Tech Lead) |
| **Tanggal** | 2026-06-20 |
| **Prioritas** | 🟠 High |
| **Konsumen** | Web & Mobile Web (fitur Export) |
| **Terkait Flow/Screen/Report** | REQ-014-FLOW, REQ-014-SCR, REQ-014-RPT |
| **Status** | Ready |

---

## 1. Tujuan
- **Fungsi:** Mengambil daftar transaksi milik merchant dalam rentang tanggal untuk di-export.
- **Kebutuhan bisnis:** Menyediakan data mentah bagi file Excel (REQ-014-RPT).

## 2. Ringkasan Endpoint
| Field | Isi |
|-------|-----|
| **Method** | GET |
| **Path** | `/api/v1/merchants/{id}/transactions` |
| **Autentikasi** | Bearer Token |
| **Otorisasi** | Merchant hanya boleh akses `id` miliknya sendiri |
| **Idempotent?** | Ya (GET, tanpa efek samping) |

## 3. Request
**Headers:**
| Header | Wajib? | Contoh |
|--------|--------|--------|
| Authorization | Ya | Bearer <token> |

**Path / Query Parameter:**
| Nama | Di | Tipe | Wajib? | Batasan | Keterangan |
|------|----|------|--------|---------|------------|
| id | path | string | Ya | - | ID merchant |
| from | query | date | Tidak | ≤ to | default: 30 hari lalu |
| to | query | date | Tidak | ≤ hari ini | default: hari ini |

**Body:** N/A (GET).

## 4. Response Sukses
**HTTP 200:**
```json
{
  "status": "success",
  "data": {
    "total": 3,
    "transactions": [
      {
        "transaction_id": "TRX-00123",
        "created_at": "2026-07-01T10:00:00+07:00",
        "amount": 1500000,
        "payment_method": "VA_BCA",
        "status": "SUCCESS"
      }
    ]
  }
}
```
| Field | Tipe | Keterangan |
|-------|------|------------|
| total | int | jumlah baris |
| transactions[].amount | int | Rupiah, tanpa desimal |
| transactions[].status | enum | SUCCESS / FAILED / PENDING / REFUNDED |
| created_at | ISO-8601 | zona WIB |

## 5. Response Error
| HTTP | Kode | Kondisi | Pesan |
|------|------|---------|-------|
| 400 | VALIDATION_ERROR | from > to, atau rentang > 365 hari | "Rentang maksimal 1 tahun" |
| 401 | UNAUTHORIZED | Token salah/kadaluarsa | "Sesi berakhir, login ulang" |
| 403 | FORBIDDEN | id bukan milik merchant | "Akses ditolak" |
| 413 | TOO_MANY_ROWS | Data > 50.000 baris | "Data terlalu banyak, perkecil rentang" |
| 500 | INTERNAL_ERROR | Kesalahan server | "Terjadi kesalahan" |

```json
{ "status": "error", "code": "VALIDATION_ERROR", "message": "Rentang maksimal 1 tahun" }
```

## 6. Business Rules
| ID | Aturan |
|----|--------|
| BR-1 | Hanya mengembalikan transaksi milik merchant pada token |
| BR-2 | Rentang maksimal 365 hari |
| BR-3 | Maksimal 50.000 baris; jika lebih → 413 |

## 7. Perilaku Khusus
- **Rate limit:** 200 request/menit per merchant.
- **Pagination:** N/A untuk export (ambil sekaligus, dibatasi 50.000 baris).
- **Efek samping:** mencatat log akses (merchant_id, rentang, jumlah baris).

## 8. Dependency / Integrasi
- Endpoint filter `from`/`to` di Transaction Service (dikonfirmasi tersedia 2026-06-18).

## 9. Non-Functional
- **Latensi:** p95 < 300 ms untuk ≤ 10.000 baris.
- **Timeout:** 10 detik.
- **Keamanan:** tidak mengembalikan data kartu/PII sensitif.

## 10. Contoh cURL
```bash
curl -X GET "https://api.maas.example/api/v1/merchants/MER-01/transactions?from=2026-06-01&to=2026-07-01" \
  -H "Authorization: Bearer <token>"
```

## 11. Acceptance Criteria
- [ ] AC-1: Given token valid & rentang valid, When GET, Then 200 dengan struktur bagian 4.
- [ ] AC-2: Given from > to, Then 400 VALIDATION_ERROR.
- [ ] AC-3: Given merchant akses id lain, Then 403 FORBIDDEN.
- [ ] AC-4: Given hasil > 50.000 baris, Then 413 TOO_MANY_ROWS.

## 12. Lampiran
- Postman collection: MAAS-Transactions.

## 13. Sign-off
- [x] Product/BA — Approved (Sinta)
- [x] Tech Lead — Approved (Bagus)
- [x] Konsumen API (FE) — Reviewed
