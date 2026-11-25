# HAULIX Driver/Worker Mobile App — DW-D01
# DW-W01: Onboarding & Authentication Canonical Design Blueprint

**Workflow ID:** `DW-W01`  
**Module Name:** Driver & Worker Onboarding & Authentication  
**Phase:** DW-D01  
**Languages:** English (`en`) & Spanish (`es`)  
**Target Viewport:** 430px reference width (Responsive down to 360dp)

---

## 1. Canonical Screen Inventory & Matrix

| State ID | Canonical Screen Name | Applicable Roles | Screen Identifier | English Section Title | Spanish Section Title | Primary CTA | Next Transition |
|:---:|:---|:---:|:---|:---|:---|:---|:---|
| **DW-W01-01** | Driver/Worker Welcome Hero | All Users | `dw-welcome` | Welcome to HAULIX Crew | Bienvenido a la Cuadrilla HAULIX | "Get Started" / "Empezar" | `DW-W01-02` |
| **DW-W01-02** | Role Selection & Overview | Applicants | `dw-role-selection` | Select Your Crew Role | Selecciona tu Rol de Cuadrilla | "Continue" / "Continuar" | `DW-W01-03` |
| **DW-W01-03** | Phone Number Authentication | All Users | `dw-auth-phone` | Enter Mobile Phone | Ingresar Teléfono Móvil | "Send Verification Code" / "Enviar Código" | `DW-W01-04` |
| **DW-W01-04** | SMS OTP Code Verification | All Users | `dw-auth-otp` | Verify 6-Digit Code | Verificar Código de 6 Dígitos | "Verify & Continue" / "Verificar y Continuar" | `DW-W01-06` (or `05`) |
| **DW-W01-05** | Password Login (Returning Users) | Registered Users | `dw-auth-password` | Sign In with Password | Iniciar Sesión con Contraseña | "Sign In" / "Iniciar Sesión" | `DW-W03-01` (Home) |
| **DW-W01-06** | Legal Consent & Contractor Agreement | Applicants | `dw-auth-legal` | Contractor Agreements | Acuerdos de Contratista | "Accept & Agree" / "Aceptar y Continuar" | `DW-W02-01` (Docs) |
| **DW-W01-07** | Password Reset / Recovery | Registered Users | `dw-auth-forgot-password` | Reset Your Password | Restablecer Contraseña | "Send Reset Link" / "Enviar Enlace" | `DW-W01-05` |
| **DW-W01-08** | Authentication Error & Network Retry | All Users | `dw-auth-error` | Authentication Issue | Problema de Autenticación | "Try Again" / "Reintentar" | Prior Auth State |

---

## 2. Detailed Screen Compositions

### DW-W01-01: Driver/Worker Welcome Hero
- **Header:** HAULIX Wordmark + Language Switcher Pill (EN ↔ ES) in top-right.
- **Hero Graphic:** Dark high-tech container with stylized cargo van illustration + logistics route accent lines in Electric Lime (`#BAFF42`).
- **Headlines:**
  - EN: "Drive & Earn with HAULIX" / Sub: "The on-demand platform for professional drivers and moving helpers in Arizona."
  - ES: "Conduce y Gana con HAULIX" / Sub: "La plataforma bajo demanda para conductores profesionales y ayudantes de mudanza en Arizona."
- **CTAs:**
  - Primary CTA: "Get Started" / "Empezar" (Electric Lime `#BAFF42` pill button, 54dp height)
  - Secondary CTA: "Sign In to Account" / "Iniciar Sesión" (Ghost button with elevated border)

### DW-W01-02: Role Selection & Operational Overview
- **Header:** Back button (`‹`), Step Indicator "Step 1 of 3", Language Switcher.
- **Title:** "Choose Your Operating Role" / "¿Cómo deseas trabajar con nosotros?"
- **Role Cards (Radio Selection):**
  - Card 1: **Primary Driver with Vehicle**
    - Description: "You have a pickup truck, cargo van, or box truck with active registration and insurance. You manage transport and route navigation."
    - Requirements Tag: "Driver's License + Vehicle Required"
  - Card 2: **Helper / Moving Laborer**
    - Description: "You assist with loading, unloading, carrying, and item handling. No personal transport vehicle required."
    - Requirements Tag: "ID Verification Required"
- **Primary CTA:** "Continue with Selected Role" / "Continuar con Rol Seleccionado"

### DW-W01-03: Phone Number Authentication
- **Header:** Back button, Title "Phone Verification", Language Switcher.
- **Input Module:** Country Code Selector (`+1` USA) + Formatted Phone Input Field (`(555) 000-0000`).
- **Helper Notice:** "We'll send a 6-digit SMS verification code to verify your mobile device for dispatch notifications."
- **Primary CTA:** "Send Verification Code" / "Enviar Código de Verificación"

### DW-W01-04: SMS OTP Code Verification
- **Header:** Back button, Title "Verify Phone".
- **Code Inputs:** 6 individual box digits with auto-advance and numeric keypad focus.
- **Resend Action:** Countdown timer (`Resend code in 45s`) + "Resend Code" link.
- **Primary CTA:** "Verify & Proceed" / "Verificar y Continuar"

### DW-W01-06: Legal Consent & Contractor Agreement
- **Header:** Title "Legal Disclosures".
- **Scrollable Review Containers:**
  - 1. Independent Contractor Services Agreement (Arizona Logistics Standards)
  - 2. Background Check (MVR & Identity) Authorization Disclosure
  - 3. Commercial Transport Safety & Cargo Handling Guidelines
- **Consent Checkboxes:**
  - [x] "I agree to the HAULIX Independent Contractor Agreement."
  - [x] "I consent to background check and driving record verification."
- **Primary CTA:** "Accept & Continue to Verification" / "Aceptar y Continuar a Verificación"
