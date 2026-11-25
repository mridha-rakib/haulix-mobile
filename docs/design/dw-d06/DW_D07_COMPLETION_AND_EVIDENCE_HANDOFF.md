# DW-D07: Completion Evidence, Proof & Review Window Handoff

## 1. Scope of Next Phase (DW-D07)

Phase DW-D07 covers the completion verification, photographic delivery proof, dispute hold prevention, and customer review window workflows (Module `DW-W07`).

---

## 2. Authoritative Screen Scope for DW-D07

| State | Canonical Screen Title | Primary Role | English Node ID | Spanish Node ID | Primary Workflow Scope |
|:---:|---|:---:|:---:|:---:|---|
| **DW21** | Completion evidence | Primary Driver | `1086:596` | `1088:925` | 2 required delivery photos, completion checklist, timestamp logging. |
| **DW22** | Job completed | Primary Driver | `1086:637` | `1088:966` | Completion confirmation, 24h review window disclosure, earnings pending state. |
| **DW64** | Helper work evidence | Crew Helper | `1309:1147` | `1309:1838` | Independent Helper labor photo check-off, individual contribution proof. |
| **DW65** | Helper work submitted | Crew Helper | `1309:1243` | `1309:1918` | Helper submission confirmation, awaiting Driver final closure. |

Total Scope: **4 Canonical States / 8 Bilingual Screen Variants**.

---

## 3. Prerequisite Alignment with Customer App

- Customer App Workflow 08 (`/completion-proof`, `/completion-confirm`, `/completion-issue`, `/completion-no-reply`) governs the 24-hour review window.
- In DW-D07, completion proof submission must not trigger immediate payment capture or instant payout settlement until the 24-hour window expires without dispute.
- Boundary: Await explicit project owner authorization before beginning Phase DW-D07.
