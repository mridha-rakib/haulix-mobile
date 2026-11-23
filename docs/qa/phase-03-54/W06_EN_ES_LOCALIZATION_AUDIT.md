# HAULIX Customer Mobile App — W06 Localization Audit (EN / ES)

## Comprehensive Bilingual Parity Analysis across 26 Active Service States

**Date:** November 23, 2026  
**Locales Tested:** English (`packages/i18n/src/locales/en.ts`), Spanish (`packages/i18n/src/locales/es.ts`)  
**Parity Result:** 100% Identical Key Structures

---

## 1. Audit Summary

Every canonical state in W06 features a dedicated dictionary block within `@haulix/i18n`. All 26 translation objects have been verified to contain identical key names, avoiding runtime missing key fallbacks or missing text strings in either language.

| #   | State                | Translation Object Key  | Key Count (EN) | Key Count (ES) | Parity Status |
| --- | -------------------- | ----------------------- | -------------- | -------------- | ------------- |
| 01  | PRE                  | `w06Pre`                | 24             | 24             | ✅ 100% Match |
| 02  | ENROUTE              | `w06EnRoute`            | 25             | 25             | ✅ 100% Match |
| 03  | ETA_PENDING          | `w06EtaPending`         | 26             | 26             | ✅ 100% Match |
| 04  | GPS_OFFLINE          | `w06GpsOffline`         | 26             | 26             | ✅ 100% Match |
| 05  | GPS_DENIED           | `w06GpsDenied`          | 26             | 26             | ✅ 100% Match |
| 06  | ARRIVED              | `w06Arrived`            | 28             | 28             | ✅ 100% Match |
| 07  | WORKING              | `w06Working`            | 31             | 31             | ✅ 100% Match |
| 08  | CHAT                 | `w06Chat`               | 24             | 24             | ✅ 100% Match |
| 09  | CHAT_EMPTY           | `w06ChatEmpty`          | 22             | 22             | ✅ 100% Match |
| 10  | CHAT_FAILED          | `w06ChatFailed`         | 25             | 25             | ✅ 100% Match |
| 11  | CHAT_SENT            | `w06ChatSent`           | 24             | 24             | ✅ 100% Match |
| 12  | MEDIA                | `w06Media`              | 25             | 25             | ✅ 100% Match |
| 13  | MEDIA_DENIED         | `w06MediaDenied`        | 23             | 23             | ✅ 100% Match |
| 14  | MEDIA_FAILED         | `w06MediaFailed`        | 24             | 24             | ✅ 100% Match |
| 15  | MEDIA_SENT           | `w06MediaSent`          | 24             | 24             | ✅ 100% Match |
| 16  | EXTRA_REQUEST        | `w06ExtraRequest`       | 33             | 33             | ✅ 100% Match |
| 17  | EXTRA_ADMIN_PENDING  | `w06ExtraAdminPending`  | 29             | 29             | ✅ 100% Match |
| 18  | EXTRA_ADMIN_REJECTED | `w06ExtraAdminRejected` | 30             | 30             | ✅ 100% Match |
| 19  | EXTRA_APPROVED       | `w06ExtraApproved`      | 32             | 32             | ✅ 100% Match |
| 20  | EXTRA_EXPIRED        | `w06ExtraExpired`       | 29             | 29             | ✅ 100% Match |
| 21  | EXTRA_ACCEPTED       | `w06ExtraAccepted`      | 33             | 33             | ✅ 100% Match |
| 22  | EXTRA_DECLINED       | `w06ExtraDeclined`      | 30             | 30             | ✅ 100% Match |
| 23  | NO_SHOW              | `w06NoShow`             | 26             | 26             | ✅ 100% Match |
| 24  | GPS_CLOSED           | `w06GpsClosed`          | 26             | 26             | ✅ 100% Match |
| 25  | SUPPORT              | `w06Support`            | 28             | 28             | ✅ 100% Match |
| 26  | W08_HANDOFF          | `w06W08Handoff`         | 30             | 30             | ✅ 100% Match |

---

## 2. Standardized Domain Copy Elements

Both languages strictly preserve core domain terms without arbitrary deviations:

- **Baseline Booking Reference:** `HX-AZ-DEMO-0042`
- **Assigned Driver:** `Mike R.` (Marcus Vance in preliminary assigned context)
- **Baseline Quote:** `$356.00 USD`
- **Confirmed Customer Inventory:** `4 pieces across 3 categories` (1 sofa, 2 mattresses, 1 dining table)
- **Scope Revision R2:** `+$40.00 USD` (1 additional chair)
- **Security PIN:** `8492`
- **Service Window:** `9:00 AM – 11:00 AM`
