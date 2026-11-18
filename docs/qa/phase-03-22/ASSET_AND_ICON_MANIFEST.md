# Asset & Icon Manifest — Phase 03.22

## Accelerated 4-Screen Bilingual Batch: W02 Photo Management States & Access Details

- **Date:** 2026-11-18
- **Scope:** C19-P-R, C19-P-F, C19-P-E, C20 (English & Spanish)

---

### 1. Photography Assets Reused from Approved HAULIX Asset Pipeline

All photo assets in Phase 03.22 are genuine, approved photography assets located in `apps/customer/assets/images/`:

| Asset File            | Resolution / Aspect       | Description                     | Screens Used                                            |
| --------------------- | ------------------------- | ------------------------------- | ------------------------------------------------------- |
| `c18j-sofa.png`       | 110 × 81 px (rounded 9px) | Grey modular living room sofa   | C19-P-R (Selected media), C19-P-F (Saved photos item 1) |
| `c18j-mattresses.png` | 110 × 81 px (rounded 9px) | Stacked wrapped mattresses      | C19-P-F (Saved photos item 2)                           |
| `c18j-table.png`      | 110 × 81 px (rounded 9px) | Wooden dining table with chairs | C19-P-F (Saved photos item 3)                           |
| `c19p-boxes.png`      | 110 × 81 px (rounded 9px) | Moving boxes / additional item  | Reference / C19-P                                       |

_Rule adherence:_

- Zero placeholders or emojis.
- In C19-P-F, exactly 3 photos are shown as saved. The failed 4th photo (`additional-item image upload failed at 87%`) is STRICTLY omitted from the saved list.
- In C19-P-E, zero photos are shown (clean empty state).

---

### 2. Vector Icons & Badges

All icons use Lucide icons with exact Figma styling:

| Icon                            | Purpose                                 | Color Token                              | Screen Usage                       |
| ------------------------------- | --------------------------------------- | ---------------------------------------- | ---------------------------------- |
| `Check`                         | Booking context confirmation pill       | `#BAFF42` (`haulix-brand-neon-lime`)     | C19-P-R, C19-P-F, C19-P-E, C20     |
| `CheckCircle` / `Check`         | Review required context badge           | `#ADB7B1` (`text-secondary`) / `#35403B` | C19-P-R, C19-P-E, C20              |
| `AlertTriangle` / `AlertCircle` | Action required / network failure badge | `#EF4444` (`status-error` red)           | C19-P-F (Network interrupted card) |
| `MapPin`                        | Pickup access location icon             | `#BAFF42` / `#ADB7B1`                    | C20 (Pickup location row)          |
| `Home`                          | Property type row                       | `#ADB7B1`                                | C20 (Single-family residence)      |
| `Layers` / `Footprints`         | Stairs & carrying distance              | `#ADB7B1`                                | C20 (Stairs & carrying distance)   |
| `Car`                           | Parking row                             | `#ADB7B1`                                | C20 (Driveway available)           |
| `DoorClosed` / `Maximize2`      | Doorway restrictions                    | `#ADB7B1`                                | C20 (Standard residential doorway) |
| `Wrench` / `Package`            | Disassembly & Packing requests          | `#BAFF42` / `#ADB7B1`                    | C20 (Additional help rows)         |
| `ChevronRight`                  | Interactive option chevrons             | `#788580` / `#BAFF42`                    | C20, Secondary action links        |
| `ArrowLeft`                     | Flow header back navigation             | `#F6F8F6` (`text-primary`)               | All screens                        |
| `Wifi`                          | HAULIX status bar Wi-Fi indicator       | `#F6F8F6`                                | Flow header / status bar           |

---

### 3. Design Token Values Synchronized

- **Base background:** `#080B0B` (`var(--haulix-bg-base)`)
- **Surface background:** `#151A19` (`var(--haulix-bg-surface)`)
- **Elevated card background:** `#222827` (`var(--haulix-bg-elevated)`)
- **Border subtle:** `#35403B` (`var(--haulix-border-subtle)`)
- **Brand neon lime:** `#BAFF42` (`var(--haulix-brand-neon-lime)`)
- **Context booking green pill:** `#1A2510`
- **Error border / tint:** `#EF4444`
- **Text Primary:** `#F6F8F6`
- **Text Secondary:** `#ADB7B1`
- **Text Muted / Footer:** `#788580`
