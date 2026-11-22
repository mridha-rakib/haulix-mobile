# HAULIX Customer Mobile App — Phase 03.47B

## Android Device Screenshot Evidence Matrix

**Document ID:** `HAULIX-QA-P03.47B-015`  
**Phase:** 03.47B  
**Target:** Physical Realme Note 60 (`RMX3930`), Android 15  
**Screen Resolution:** $720 \times 1600\text{ px}$ (Density 2.0, Viewport $360 \times 800\text{ dp}$)  
**Directory:** `docs/qa/phase-03-47b/android/`

---

### 1. W05 Search Stage Physical Screenshot Evidence (S10–S50)

| Screenshot ID | Language | State / Route                 | Hardware Screenshot File | Key Visual Features Verified                |
| ------------- | -------- | ----------------------------- | ------------------------ | ------------------------------------------- |
| `w05-s10-en`  | EN       | S10: `/searching-for-driver`  | `w05-s10-en-android.png` | 10-mi radar pulse, status dot, wordmark     |
| `w05-s10-es`  | ES       | S10: `/searching-for-driver`  | `w05-s10-es-android.png` | Localized Spanish title, 10-mi radar        |
| `w05-s20-en`  | EN       | S20: `/search-expanded-20mi`  | `w05-s20-en-android.png` | Clean mode, 0 crop, 20-mi radar rings       |
| `w05-s20-es`  | ES       | S20: `/search-expanded-20mi`  | `w05-s20-es-android.png` | Clean mode, Spanish 2-line wrap, 0 crop     |
| `w05-s30-en`  | EN       | S30: `/search-expanding-30mi` | `w05-s30-en-android.png` | Clean mode, 30-mi rings, status banner      |
| `w05-s30-es`  | ES       | S30: `/search-expanding-30mi` | `w05-s30-es-android.png` | Clean mode, Spanish 30-mi localized map     |
| `w05-s40-en`  | EN       | S40: `/search-expanded-40mi`  | `w05-s40-en-android.png` | Clean mode, 40-mi rings, status banner      |
| `w05-s40-es`  | ES       | S40: `/search-expanded-40mi`  | `w05-s40-es-android.png` | Clean mode, Spanish 40-mi localized map     |
| `w05-s50-en`  | EN       | S50: `/search-expanded-50mi`  | `w05-s50-en-android.png` | Clean mode, max 50-mi radius, full timeline |
| `w05-s50-es`  | ES       | S50: `/search-expanded-50mi`  | `w05-s50-es-android.png` | Clean mode, Spanish 50-mi max radius        |

---

### 2. W05 Dispatch Progression & Exceptions Evidence

| Screenshot ID          | Language | State / Route                           | Hardware Screenshot File           | Key Visual Features Verified          |
| ---------------------- | -------- | --------------------------------------- | ---------------------------------- | ------------------------------------- |
| `w05-matched-en`       | EN       | C32-B: `/driver-matched`                | `w05-matched-en-android.png`       | Driver match card, vehicle specs, ETA |
| `w05-matched-es`       | ES       | C32-B: `/driver-matched`                | `w05-matched-es-android.png`       | Conductor asignado, Spanish details   |
| `w05-helper-en`        | EN       | Helper: `/helper-confirmed`             | `w05-helper-en-android.png`        | 2-person crew assignment card         |
| `w05-helper-es`        | ES       | Helper: `/helper-confirmed`             | `w05-helper-es-android.png`        | Ayudante confirmado card              |
| `w05-reassigned-en`    | EN       | Reassign: `/driver-reassigned`          | `w05-reassigned-en-android.png`    | Reassigned driver notification        |
| `w05-reassigned-es`    | ES       | Reassign: `/driver-reassigned`          | `w05-reassigned-es-android.png`    | Notificación de reasignación          |
| `w05-late-en`          | EN       | Late: `/driver-late`                    | `w05-late-en-android.png`          | Delay banner, revised ETA             |
| `w05-late-es`          | ES       | Late: `/driver-late`                    | `w05-late-es-android.png`          | Conductor retrasado, nuevo ETA        |
| `w05-nodriver-en`      | EN       | No Driver: `/no-driver-available`       | `w05-nodriver-en-android.png`      | No driver found, retry CTAs           |
| `w05-nodriver-es`      | ES       | No Driver: `/no-driver-available`       | `w05-nodriver-es-android.png`      | Sin conductor disponible              |
| `w05-cancel-review-en` | EN       | Cancel Review: `/cancel-request-review` | `w05-cancel-review-en-android.png` | Cancellation terms review             |
| `w05-cancel-review-es` | ES       | Cancel Review: `/cancel-request-review` | `w05-cancel-review-es-android.png` | Revisión de cancelación               |
| `w05-canceled-en`      | EN       | Canceled: `/request-canceled`           | `w05-canceled-en-android.png`      | Fee-free cancellation confirmed       |
| `w05-canceled-es`      | ES       | Canceled: `/request-canceled`           | `w05-canceled-es-android.png`      | Cancelación sin cargo confirmada      |

---

### 3. Verification Protocol

All screenshots are captured via Android ADB screencap utility (`adb exec-out screencap -p`) directly from the physical Realme Note 60 hardware without scaling, resampling, or software emulation.
