# HAULIX Driver/Worker — DW-FINAL Navigation & Interaction Matrix

**Milestone:** DW-FINAL Consolidated Frontend QA  
**Date:** November 28, 2026  

---

## 1. Master Tab Bar Navigation (Figma 1084:26)

The root tab navigator is located at `apps/driver/app/(app)/(tabs)/_layout.tsx`:
1. **Home:** `/(app)/(tabs)` — Dynamic dashboard (Driver: DW09, Helper: DW31)
2. **Jobs:** `/(app)/(tabs)/jobs` — Job offers & active bookings (DW10, DW11)
3. **Earnings:** `/(app)/(tabs)/earnings` — Wallet & earnings summary (DW26, DW52)
4. **Messages:** `/(app)/(tabs)/messages` — Active dispatch and crew chat (DW18, DW34)
5. **Profile:** `/(app)/(tabs)/profile` — Dynamic worker profile (Driver: DW28, Helper: DW55)

---

## 2. Supporting Overlays Routing & Activation Matrix

All 14 supporting overlays are accessible directly via query parameters or modal triggers:

| Overlay Code | Figma Node | Purpose | Trigger Parameter | Component |
|---|---|---|---|---|
| **OV01-EN** | `1325:1754` | Payout Method Selection (EN) | `params.overlay === 'ov01'` | `PayoutMethodOverlay` |
| **OV01-ES** | `1325:1776` | Selección de método de pago (ES) | `params.overlay === 'ov01'` | `PayoutMethodOverlay` |
| **OV02-EN** | `1305:686` | Crew Communication Options (EN) | `params.overlay === 'ov02'` | `CrewCommunicationOverlay` |
| **OV02-ES** | `1305:696` | Opciones de comunicación de equipo (ES) | `params.overlay === 'ov02'` | `CrewCommunicationOverlay` |
| **OV03-EN** | `1309:1234` | Change Profile Photo (EN) | `params.overlay === 'ov03'` | `ProfilePhotoOverlay` |
| **OV03-ES** | `1309:1256` | Cambiar foto de perfil (ES) | `params.overlay === 'ov03'` | `ProfilePhotoOverlay` |
| **OV04-EN** | `1309:1278` | Emergency Assistance 911 (EN) | `params.overlay === 'ov04'` | `EmergencyContactOverlay` |
| **OV04-ES** | `1309:1300` | Asistencia de emergencia 911 (ES) | `params.overlay === 'ov04'` | `EmergencyContactOverlay` |
| **OV05-EN** | `1286:554` | Availability Preferences (EN) | `params.overlay === 'ov05'` | `AvailabilityPreferencesOverlay` |
| **OV05-ES** | `1286:568` | Preferencias de disponibilidad (ES) | `params.overlay === 'ov05'` | `AvailabilityPreferencesOverlay` |
| **OV06-EN** | `1305:706` | Simulated Native Call Preview (EN) | `params.overlay === 'ov06'` | `NativeCallPreviewOverlay` |
| **OV06-ES** | `1305:716` | Vista previa de llamada simulada (ES) | `params.overlay === 'ov06'` | `NativeCallPreviewOverlay` |
| **OV07-EN** | `1305:726` | Live GPS Navigation Active (EN) | `params.overlay === 'ov07'` | `LiveGpsNavigationOverlay` |
| **OV07-ES** | `1305:736` | Navegación GPS activa (ES) | `params.overlay === 'ov07'` | `LiveGpsNavigationOverlay` |
