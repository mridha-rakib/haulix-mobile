# HAULIX Customer Mobile App — Phase 03.44A

## Figma Source Acquisition Log & Multi-Method Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.44A  
**TARGET FIGMA FILE:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`  
**PARENT SECTIONS:** `836:4571` (English), `836:4572` (Spanish), `111:13` (Tracking Concept)

---

### 1. Acquisition Method Assessment

In strict compliance with Section 4 of the phase prompt, all four acquisition methods were evaluated:

| Method | Target Mechanism | Execution Outcome | Status |
| :--- | :--- | :--- | :--- |
| **Method A: Normal Figma Web/Desktop Interface** | Manual inspection of live file in Figma desktop/web app | Requires user to log into Figma account or export PNGs directly | **PENDING USER EXPORT** |
| **Method B: Existing Authentic Exports** | Search repository design handoffs, assets, and cache folders | Checked all workspace directories; prior exports covered C01–C31; W05 raw child frame PNGs were not previously checked in | **EXHAUSTED** |
| **Method C: Authorized Browser Workflow** | Headless Chrome DevTools via Browser subagent | Attempted in subagent `5a89b52b-8083-42d0-84f3-71895d1e3491`. Chrome DevTools remote debugging port was not running locally (`ENOENT DevToolsActivePort`) | **BLOCKED (LOCAL CHROME)** |
| **Method D: Minimal Manual Export Handoff** | Document exact child frames for 1-click export by owner | Provided exact frame coordinates, section names, and export instructions below | **READY FOR OWNER HANDOFF** |

---

### 2. Figma MCP Plugin Status & Plugin Card Sign-In

When invoking Figma MCP tools (`get_metadata`, `whoami`), the server returned:
```
Unauthorized: The plugin "figma" needs the user to sign in.
Put <plugin-card catalog-id="figma"></plugin-card> on its own line so they can sign in from the chat.
```

Presenting this card to the user enables connecting their authorized Figma credentials, allowing direct programmatic asset extraction once authenticated.

---

### 3. Method D: Concise Manual Export Instructions for Project Owner

If the project owner prefers to export the reference PNGs manually from Figma:

1. Open Figma file: `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`
2. Navigate to **Page 1:2** (`01 — Customer App`):
   - Locate **Section `836:4571`** (`W05 — ENGLISH | Dispatch • Matching • Driver • Crew • Exceptions • W06`)
     - Select and export **C32-A** frame as `c32a-en-searching-for-driver.png`
     - Select and export **C32-B** frame as `c32b-en-driver-matched.png`
     - Select and export **C32-C** frame as `c32c-en-crew-tracking.png`
     - Select and export **C32-D** frame as `c32d-en-cancellation-windows.png`
   - Locate **Section `836:4572`** (`W05 — ESPAÑOL | Despacho • Asignación • Equipo • Excepciones • W06`)
     - Select and export **C32-A** frame as `c32a-es-buscando-conductor.png`
     - Select and export **C32-B** frame as `c32b-es-conductor-asignado.png`
     - Select and export **C32-C** frame as `c32c-es-seguimiento-equipo.png`
     - Select and export **C32-D** frame as `c32d-es-ventanas-cancelacion.png`
3. Save the 8 exported PNG files into:
   `c:\Users\rakib_bro\sta-projects\haulix\haulix-mobile\docs\qa\phase-03-44a\figma\`
