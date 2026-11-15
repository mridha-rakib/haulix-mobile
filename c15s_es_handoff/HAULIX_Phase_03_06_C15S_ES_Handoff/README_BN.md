# HAULIX Customer App — Phase 03.06

## C15-S Service Selected / Servicio elegido — Spanish ONLY

**ব্যবহার:** এই ZIP Antigravity Agent-কে দাও। Extract করে প্রথমে `docs/ANTIGRAVITY_PROMPT_C15S_ES.md` পড়তে বলবে। আগে English C15-S সম্পন্ন হয়েছে; এই phase-এ শুধু একই screen/route Spanish-এ localized হবে এবং বাস্তব Android QA হবে।

- **Spanish source Figma:** `974:8965` — C15-S-ES · Servicio elegido / W02 [LOCALIZACIÓN], 430×1015.
- **English counterpart:** `382:241` — C15-S Junk Removal selected, 430×1015.
- **C15 Spanish terminology:** `974:8843` — C15-ES Select Service.
- **App:** `haulix-mobile`, `apps/customer` (Expo Router, NativeWind, TypeScript strict, `@haulix/i18n`).
- **Existing route to reuse:** `apps/customer/app/(app)/service-selected.tsx`.
- **Assets:** নতুন PNG বা icon download বাধ্যতামূলক নয়। আগের English C15-S-এর 2টি original SVG ZIP-এ reference copy দেওয়া আছে; Agent প্রথমে existing project assets reuse করবে।

**Figma caveat:** Spanish C15-S-এর selected tile description এখনো ইংরেজি, customer chip-এ Sarah Mitchell। এগুলো source-এর অসম্পূর্ণ localization: app runtime-এ Spanish C15-এর approved description এবং Spanish fixture/editable profile (`Bryan Lopez` by default) ব্যবহার করতে হবে। এগুলো audit-এ documented, source-এর exact screenshot copy নয়।

**এখনো নয়:** C16 service-area eligibility, C18 intake, backend bookings, GPS check, pricing, payments, Driver App, Account & Profile Phase 02.15 অথবা APK rebuild।

**Deliverable:** `PHASE_03_06_C15S_ES_REPORT.md` + actual Android QA images in `docs/qa/c15s/`. Agent complete হওয়ার আগে phaseকে implemented বলবে না।
