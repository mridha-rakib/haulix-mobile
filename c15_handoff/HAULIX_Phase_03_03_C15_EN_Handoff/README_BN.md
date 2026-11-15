# HAULIX — Phase 03.03 C15 Service Discovery (English) Handoff

## কী কাজ হবে

Customer App-এর C01 Home-এর পরবর্তী screen **C15 — What can we help with?** (English)। Figma node `382:126` (430×1791) অনুসরণ করে Expo React Native + NativeWind-এ implement করতে হবে। এটি Service Discovery-এর প্রথম screen—**অন্য booking screen নয়**।

আগের এক-screen-at-a-time workflow: Figma inspect → source SVG reuse → Antigravity implement → Android screenshot QA → report → hard stop → পরে Spanish C15।

## কোথায় কী আছে

- `docs/ANTIGRAVITY_PROMPT_C15_EN.md`: Agent-এর complete নির্দেশনা—এই ফাইল প্রথমে পড়বে।
- `docs/C15_EN_FIGMA_AUDIT.md`: original Figma layer IDs, exact screen layout, clickable destinations।
- `docs/C15_EN_CONTENT_AND_SERVICES.csv`: approved ৭টি service row এবং copy।
- `docs/NAVIGATION_AND_STATE_CONTRACT.md`: Home→C15 এবং honest frontend-only interaction নিয়ম।
- `docs/ANDROID_QA_C15_EN.md`: Android QA acceptance test ও screenshot list।
- `assets/original-svg/`: original Figma থেকে exported **১০টি SVG**, as-is source vectors; bundle-এ আছে।
- `ASSET_MANIFEST.csv`: SVG IDs ও origin।
- `reports/PHASE_03_03_REPORT_TEMPLATE.md`: Agent-এর final report guide।

## গুরুত্বপূর্ণ সাবধানতা

**C15-তে bottom navbar নেই।** C01 Home-এ ৮টি category থাকলেও C15-তে ৭টি; Assembly Add-on এখানে থাকবে না। English C01 থেকে C15 খুলবে; Spanish C01-তে আগের localized upcoming notice থাকবে, কারণ Spanish C15 পরের phase।

No backend login/booking, live Arizona verification, GPS, quote, payment, fake session or release-mode frontend QA restriction. Original svg paths পরিবর্তন করে guessed icon বানাবে না। পরবর্তী C15-S, C15-E, C16 ও C18 screen এখনই তৈরি করা যাবে না। No EAS APK unless separately requested. Account C10-F phase paused.

## Antigravity-এ ব্যবহার

ZIP extract করে `docs/ANTIGRAVITY_PROMPT_C15_EN.md` follow করবে। Repository inspect করে প্রয়োজনীয় assets ও docs copy করবে; পুরো handoff ZIP blindly project files-এর ওপর overwrite করবে না। শেষে real Android QA ও `PHASE_03_03_C15_EN_REPORT.md` দিয়ে hard stop।
