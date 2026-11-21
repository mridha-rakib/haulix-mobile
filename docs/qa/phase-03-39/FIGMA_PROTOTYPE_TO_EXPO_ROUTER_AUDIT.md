# HAULIX Mobile — Phase 03.39

## Figma Prototype to Expo Router Mapping Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.39  
**Audit Date:** 2026-11-21

---

## 1. Route Mapping Table

| Screen ID  | Canonical Name              | Figma Node                       | Expo Router Route                 | Upstream Trigger                                   | Primary CTA Action                                              |
| :--------- | :-------------------------- | :------------------------------- | :-------------------------------- | :------------------------------------------------- | :-------------------------------------------------------------- |
| **C29-3D** | Confirm card authentication | `763:676` (EN) / `766:1062` (ES) | `/confirm-card-authentication`    | `/secure-card-setup` primary CTA                   | Navigates to `/payment-authorization-pending` (C29-P)           |
| **C29-P**  | Authorizing your payment    | `763:745` (EN) / `766:1131` (ES) | `/payment-authorization-pending`  | `/confirm-card-authentication` success CTA         | Demonstration simulation options (C30-D, C30-E, success notice) |
| **C30-D**  | Authorization was declined  | `763:814` (EN) / `766:1200` (ES) | `/payment-authorization-declined` | `/payment-authorization-pending` declined demo CTA | "Try another payment method" -> `/choose-payment-method` (C29)  |
| **C30-E**  | Your card hold expired      | `763:883` (EN) / `766:1269` (ES) | `/card-hold-expired`              | `/payment-authorization-pending` expired demo CTA  | "Re-authorize payment" -> `/choose-payment-method` (C29)        |

---

## 2. Transition & Back Navigation Behavior

1. **Hardware Back Press Integration:**
   - Every screen integrates Android `BackHandler` and `FlowHeaderBack`.
   - On C29-3D: Back returns to `/secure-card-setup` (C29-M) without data loss.
   - On C29-P: Back returns safely to `/confirm-card-authentication` (C29-3D).
   - On C30-D: Back returns to `/choose-payment-method` (C29) with preserved draft scope.
   - On C30-E: Back returns to `/choose-payment-method` (C29) with preserved draft scope.
2. **Demo Navigator Registration:**
   - All 8 variants (`c29_3d-es`, `c29_3d-en`, `c29p-es`, `c29p-en`, `c30d-es`, `c30d-en`, `c30e-es`, `c30e-en`) are registered at the top of `DemoScreenNavigator.tsx`.
3. **Locale Persistence Across Navigation:**
   - Query parameter `?previewLocale=en` or `?previewLocale=es` is maintained across all pushed routes.
