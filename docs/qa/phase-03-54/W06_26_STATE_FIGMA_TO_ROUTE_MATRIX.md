# HAULIX Customer Mobile App — W06 26-State Figma-to-Route Matrix

## Complete Workflow 06 (Active Service) Architecture Reference

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Parent Frames:** English Section `881:5131`, Spanish Section `881:5132`  
**Total Canonical States:** 26  
**Total Bilingual Screen Variants:** 52  
**Implementation Status:** 100% Complete in Source

---

| #   | Canonical State        | Route Path                             | English Frame | Spanish Frame | Component File                            | i18n Key Object         | Status      |
| --- | ---------------------- | -------------------------------------- | ------------- | ------------- | ----------------------------------------- | ----------------------- | ----------- |
| 01  | `PRE`                  | `/active-service-awaiting-departure`   | `882:5131`    | `883:5495`    | `active-service-awaiting-departure.tsx`   | `w06Pre`                | ✅ Complete |
| 02  | `ENROUTE`              | `/active-service-en-route`             | `882:5245`    | `883:5609`    | `active-service-en-route.tsx`             | `w06EnRoute`            | ✅ Complete |
| 03  | `ETA_PENDING`          | `/active-service-eta-pending`          | `882:5356`    | `883:5720`    | `active-service-eta-pending.tsx`          | `w06EtaPending`         | ✅ Complete |
| 04  | `GPS_OFFLINE`          | `/active-service-gps-offline`          | `882:5470`    | `883:5834`    | `active-service-gps-offline.tsx`          | `w06GpsOffline`         | ✅ Complete |
| 05  | `GPS_DENIED`           | `/active-service-gps-denied`           | `882:5584`    | `883:5948`    | `active-service-gps-denied.tsx`           | `w06GpsDenied`          | ✅ Complete |
| 06  | `ARRIVED`              | `/active-service-driver-arrived`       | `882:5698`    | `883:6062`    | `active-service-driver-arrived.tsx`       | `w06Arrived`            | ✅ Complete |
| 07  | `WORKING`              | `/active-service-working`              | `882:5809`    | `883:6173`    | `active-service-working.tsx`              | `w06Working`            | ✅ Complete |
| 08  | `CHAT`                 | `/active-service-chat`                 | `882:5916`    | `883:6280`    | `active-service-chat.tsx`                 | `w06Chat`               | ✅ Complete |
| 09  | `CHAT_EMPTY`           | `/active-service-chat-empty`           | `882:6021`    | `883:6385`    | `active-service-chat-empty.tsx`           | `w06ChatEmpty`          | ✅ Complete |
| 10  | `CHAT_FAILED`          | `/active-service-chat-failed`          | `882:6126`    | `883:6490`    | `active-service-chat-failed.tsx`          | `w06ChatFailed`         | ✅ Complete |
| 11  | `CHAT_SENT`            | `/active-service-chat-sent`            | `882:6231`    | `883:6595`    | `active-service-chat-sent.tsx`            | `w06ChatSent`           | ✅ Complete |
| 12  | `MEDIA`                | `/active-service-media`                | `882:6336`    | `883:6700`    | `active-service-media.tsx`                | `w06Media`              | ✅ Complete |
| 13  | `MEDIA_DENIED`         | `/active-service-media-denied`         | `882:6443`    | `883:6807`    | `active-service-media-denied.tsx`         | `w06MediaDenied`        | ✅ Complete |
| 14  | `MEDIA_FAILED`         | `/active-service-media-failed`         | `882:6550`    | `883:6914`    | `active-service-media-failed.tsx`         | `w06MediaFailed`        | ✅ Complete |
| 15  | `MEDIA_SENT`           | `/active-service-media-sent`           | `882:6657`    | `883:7021`    | `active-service-media-sent.tsx`           | `w06MediaSent`          | ✅ Complete |
| 16  | `EXTRA_REQUEST`        | `/active-service-extra-request`        | `882:6764`    | `883:7128`    | `active-service-extra-request.tsx`        | `w06ExtraRequest`       | ✅ Complete |
| 17  | `EXTRA_ADMIN_PENDING`  | `/active-service-extra-admin-pending`  | `882:6876`    | `883:7240`    | `active-service-extra-admin-pending.tsx`  | `w06ExtraAdminPending`  | ✅ Complete |
| 18  | `EXTRA_ADMIN_REJECTED` | `/active-service-extra-admin-rejected` | `882:6993`    | `883:7357`    | `active-service-extra-admin-rejected.tsx` | `w06ExtraAdminRejected` | ✅ Complete |
| 19  | `EXTRA_APPROVED`       | `/active-service-extra-approved`       | `882:7105`    | `883:7469`    | `active-service-extra-approved.tsx`       | `w06ExtraApproved`      | ✅ Complete |
| 20  | `EXTRA_EXPIRED`        | `/active-service-extra-expired`        | `882:7222`    | `883:7586`    | `active-service-extra-expired.tsx`        | `w06ExtraExpired`       | ✅ Complete |
| 21  | `EXTRA_ACCEPTED`       | `/active-service-extra-accepted`       | `882:7339`    | `883:7703`    | `active-service-extra-accepted.tsx`       | `w06ExtraAccepted`      | ✅ Complete |
| 22  | `EXTRA_DECLINED`       | `/active-service-extra-declined`       | `882:7451`    | `883:7815`    | `active-service-extra-declined.tsx`       | `w06ExtraDeclined`      | ✅ Complete |
| 23  | `NO_SHOW`              | `/active-service-no-show`              | `882:7563`    | `883:7927`    | `active-service-no-show.tsx`              | `w06NoShow`             | ✅ Complete |
| 24  | `GPS_CLOSED`           | `/active-service-gps-closed`           | `882:7670`    | `883:8034`    | `active-service-gps-closed.tsx`           | `w06GpsClosed`          | ✅ Complete |
| 25  | `SUPPORT`              | `/active-service-support`              | `882:7784`    | `883:8148`    | `active-service-support.tsx`              | `w06Support`            | ✅ Complete |
| 26  | `W08_HANDOFF`          | `/active-service-completion-bridge`    | `882:7891`    | `883:8255`    | `active-service-completion-bridge.tsx`    | `w06W08Handoff`         | ✅ Complete |

---

## Technical Specifications

- **Framework:** Expo Router (File-based navigation under `apps/customer/app/(app)/`)
- **Tokens & Theming:** `@haulix/design-tokens` (Figma synchronized color, typography, spacing)
- **Internationalization:** `@haulix/i18n` with strict parity between `en.ts` and `es.ts`
- **Zero Route Guards:** Direct access for all routes; no auth, SMS verification, or mock Stripe barriers.
- **Physical Hardware Safety:** Explicit `BackHandler` listeners on all 26 screens supporting Android hardware back button navigation.
