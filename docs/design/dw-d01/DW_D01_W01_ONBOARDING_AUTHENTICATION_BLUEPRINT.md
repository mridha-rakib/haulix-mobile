# HAULIX Driver/Worker Mobile App — DW-D01
# DW-W01: Onboarding & Authentication Canonical Design Blueprint

**Workflow ID:** `DW-W01`  
**Module Name:** Driver & Helper Onboarding, Role Intake & Authentication  
**Phase:** DW-D01  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**English Section:** `1085:2` (`HAULIX Driver & Helper — English · 68 Core Screens`)  
**Spanish Section:** `1088:2` (`HAULIX Driver & Helper — Español · 68 Pantallas`)  
**Signed SRS Crosswalk:** `1329:1824` (`WK-01–02, 13–15`)  
**Viewport:** 430 × 932 px reference canvas (Responsive down to 360dp Android physical baseline)

---

## 1. Authoritative Figma Screen Inventory & Node Mapping

The DW-W01 workflow encompasses 11 core screens (22 bilingual variants across English and Spanish), plus interactive role selector component sets:

| Screen ID | Canonical Function | English Screen Name | English Node ID | Spanish Screen Name | Spanish Node ID | Primary Actions / Prototype Transitions |
|:---:|:---|:---|:---:|:---|:---:|:---|
| **DW01** | Welcome & Landing | `DW01 · Welcome` | `1085:3` | `DW01 · Bienvenida` | `1088:3` | "Get started" ➔ `DW02`; "Sign in" ➔ `DW03`; Lang Pill toggles EN (`1085:3`) ↔ ES (`1088:3`) |
| **DW02** | Account Registration & Role Intake | `DW02 · Create your account` | `1085:39` | `DW02 · Crear cuenta` | `1088:39` | Role Selector (`1193:1072` / `1203:820`): Driver ➔ `DW58`; Helper ➔ `DW59` |
| **DW03** | Password Sign In | `DW03 · Sign in` | `1085:80` | `DW03 · Iniciar sesión` | `1088:80` | "Forgot password?" ➔ `DW43`; "Sign in with phone" ➔ `DW61`; Submit ➔ `DW09` / `DW13` |
| **DW04** | Phone OTP Verification | `DW04 · Phone verification` | `1085:114` | `DW04 · Verificación de teléfono` | `1088:114` | 6-Digit SMS Code entry; "Resend code in 45s"; Submit ➔ `DW05` (Eligibility) |
| **DW43** | Password Reset Request | `DW43 · Reset password` | `1301:556` | `DW43 · Restablecer contraseña` | `1301:1798` | Email input; Submit ➔ `DW44`; "Back to sign in" ➔ `DW03` |
| **DW44** | Reset Link Confirmation | `DW44 · Check your inbox` | `1301:611` | `DW44 · Revisa tu correo` | `1301:1853` | "Open email app"; "Back to sign in" ➔ `DW03` |
| **DW58** | Driver Account Details | `DW58 · Driver account details` | `1309:706` | `DW58 · Datos de cuenta conductor` | `1309:1429` | Full name, email, phone, password; Continue ➔ `DW04` |
| **DW59** | Helper Account Details | `DW59 · Helper account details` | `1309:772` | `DW59 · Datos de cuenta ayudante` | `1309:1495` | Full name, email, phone, password; Continue ➔ `DW60` |
| **DW60** | Helper Phone OTP Verification | `DW60 · Helper phone verification` | `1309:838` | `DW60 · Verificación teléfono ayudante` | `1309:1561` | 6-Digit code; Continue ➔ `DW06` (Helper identity & documents) |
| **DW61** | Phone Passwordless Sign In | `DW61 · Phone sign-in verification` | `1309:896` | `DW61 · Verificación inicio por teléfono` | `1309:1619` | Phone OTP flow for registered crew members; Submit ➔ Operational Home |
| **DW66** | OTP Resend / Code Issue Modal | `DW66 · Verification code issue` | `1309:1332` | `DW66 · Problema con código` | `1309:1991` | "Resend via SMS", "Call me instead", "Change phone number"; Action: Native `BACK` |

---

## 2. Interactive Role Selection Components

Located on Page `1:3`:

1. **English Component Set:**
   - **Node ID:** `1193:1072` (`Driver / Role Selection with CTA · Interactive`)
   - **Variants:** `Role=Driver` (Node `1193:1073`), `Role=Helper` (Node `1193:1095`)
   - **Driver Card:** "Primary Driver (Has vehicle & license)" — highlights required truck/van registration and insurance.
   - **Helper Card:** "Crew Helper (Moving assistant)" — highlights physical loading/unloading role without personal vehicle requirement.
   - **Behavior:** Toggling changes state locally and routes the primary CTA dynamically to either `DW58` (Driver account details) or `DW59` (Helper account details).

2. **Spanish Component Set:**
   - **Node ID:** `1203:820` (`Driver / Selector de rol / Español · Interactive`)
   - **Variants:** `Rol=Conductor` (Node `1203:821`), `Rol=Ayudante` (Node `1203:843`)
   - **Conductor Card:** "Conductor Principal (Con vehículo y licencia)"
   - **Ayudante Card:** "Ayudante de Cuadrilla (Asistente de mudanza)"

---

## 3. Visual & Styling Standards (Strict Design Token Reuse)

All DW-W01 screens adhere strictly to the HAULIX design system:
- **Background:** `#0D1111` (`colors.background` / `bg-background`)
- **Surface / Cards:** `#151A19` (`colors.surface` / `bg-surface`)
- **Card Borders:** `#222A28` (`colors.elevated` / `border-elevated`)
- **Brand Accent:** `#BAFF42` (`colors.brand` / `text-brand` / `bg-brand` Electric Lime)
- **Primary Text:** `#FFFFFF` (`colors.text.primary`)
- **Secondary Text:** `#8E9B97` (`colors.text.secondary`)
- **Muted / Inactive:** `#525D5A` (`colors.text.muted`)
- **Error / Failure:** `#FF4D4D` (`colors.status.error`)
- **Typography:**
  - Headlines: Display Bold 24–28px, tracking -0.5px
  - Form Labels: Medium 13–14px
  - Input Text: Regular 15–16px
  - Button Labels: Bold 15–16px uppercase or title case

---

## 4. Key SRS v1.6 Requirements Alignment

- **Role Intake vs System Authoritative Role (`WK-01–02`):**
  Role selection in `DW02` is an onboarding applicant preference intake only. The system does not grant operational primary driver dispatch access until vehicle registration, driver's license, and insurance are approved via `DW05` / `DW07` / `DW08`.
- **No Local Role Switching:**
  In accordance with Critical Rule #3, client-side role swapping is disabled in active operational states. Helpers cannot toggle themselves into Drivers locally.
- **Bi-directional Bilingual Parity (`NFR-14/15`):**
  Every English screen in `1085:2` has an identical Spanish peer in `1088:2`.
