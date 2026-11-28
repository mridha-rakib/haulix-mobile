import type { SupportedLocale } from "@haulix/i18n";

export interface DemoScreenItem {
  id: string;
  name: string;
  figmaNode: string;
  route: string;
  locale: SupportedLocale;
  role?: "PRIMARY_DRIVER" | "HELPER";
  description: string;
}

export const DRIVER_DEMO_SCREENS: DemoScreenItem[] = [
  // DW09 Driver Dashboard (DW-F03)
  {
    id: "DW09-EN",
    name: "DW09 · Driver dashboard (English)",
    figmaNode: "1086:3",
    route: "/(app)/(tabs)",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Operational Home: Active job offers, Arizona routing, availability switch & rating",
  },
  {
    id: "DW09-ES",
    name: "DW09 · Inicio del conductor (Español)",
    figmaNode: "1088:332",
    route: "/(app)/(tabs)",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Panel operativo de conductor con ofertas de trabajo activas y control de disponibilidad",
  },

  // DW31 Helper Dashboard (DW-F03)
  {
    id: "DW31-EN",
    name: "DW31 · Helper dashboard (English)",
    figmaNode: "1086:1058",
    route: "/(app)/(tabs)",
    locale: "en",
    role: "HELPER",
    description: "Helper Home: Crew job invitations, assignment preview, helper earnings ledger",
  },
  {
    id: "DW31-ES",
    name: "DW31 · Inicio del ayudante (Español)",
    figmaNode: "1088:1387",
    route: "/(app)/(tabs)",
    locale: "es",
    role: "HELPER",
    description: "Panel operativo de ayudante con invitaciones de cuadrilla y ganancias",
  },

  // DW39 Availability Settings (DW-F03)
  {
    id: "DW39-EN",
    name: "DW39 · Availability settings (English)",
    figmaNode: "1270:793",
    route: "/(app)/availability-settings",
    locale: "en",
    description: "Operational hours, active days selection, service radius & vacation pause",
  },
  {
    id: "DW39-ES",
    name: "DW39 · Disponibilidad (Español)",
    figmaNode: "1270:1744",
    route: "/(app)/availability-settings",
    locale: "es",
    description:
      "Configuración de horarios laborales, días activos, radio de servicio y modo vacaciones",
  },

  // DW10 Job Offers (DW-F04)
  {
    id: "DW10-EN",
    name: "DW10 · Job offers (English)",
    figmaNode: "1086:81",
    route: "/(app)/job-offers",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Driver dispatch offer radar: Tiered radius offer cards, New badges & route details",
  },
  {
    id: "DW10-ES",
    name: "DW10 · Ofertas de trabajo (Español)",
    figmaNode: "1088:410",
    route: "/(app)/job-offers",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Radar de ofertas de trabajo con tarjetas de radio, insignias y detalles de ruta",
  },

  // DW11 Job Details (DW-F04)
  {
    id: "DW11-EN",
    name: "DW11 · Job details (English)",
    figmaNode: "1086:162",
    route: "/(app)/job-details",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Detailed job review: Service items breakdown, cargo sizing, schedule and crew needs",
  },
  {
    id: "DW11-ES",
    name: "DW11 · Detalles del trabajo (Español)",
    figmaNode: "1088:491",
    route: "/(app)/job-details",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Revisión detallada del trabajo: Artículos, horario, estimación y necesidades de equipo",
  },

  // DW12 Offer Unavailable (DW-F04)
  {
    id: "DW12-EN",
    name: "DW12 · Offer unavailable (English)",
    figmaNode: "1086:205",
    route: "/(app)/offer-unavailable",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Expired or peer-accepted job state with return to offers and dashboard recovery",
  },
  {
    id: "DW12-ES",
    name: "DW12 · Oferta no disponible (Español)",
    figmaNode: "1088:534",
    route: "/(app)/offer-unavailable",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Oferta vencida o tomada por otro conductor con opciones de retorno",
  },

  // DW13 Invite a Helper (DW-F04)
  {
    id: "DW13-EN",
    name: "DW13 · Invite a Helper (English)",
    figmaNode: "1086:231",
    route: "/(app)/invite-helper",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Driver crew invitation hub: Search verified helpers or continue solo",
  },
  {
    id: "DW13-ES",
    name: "DW13 · Invitar a un ayudante (Español)",
    figmaNode: "1088:560",
    route: "/(app)/invite-helper",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Invitación de equipo opcional para conductores: Selección de ayudante o trabajo individual",
  },

  // DW14 Helper Invitations (DW-F04)
  {
    id: "DW14-EN",
    name: "DW14 · Helper invitations (English)",
    figmaNode: "1086:268",
    route: "/(app)/helper-invitations",
    locale: "en",
    role: "HELPER",
    description: "Helper invitation inbox: Incoming crew invitations, individual decision notice",
  },
  {
    id: "DW14-ES",
    name: "DW14 · Invitaciones de ayudante (Español)",
    figmaNode: "1088:597",
    route: "/(app)/helper-invitations",
    locale: "es",
    role: "HELPER",
    description: "Bandeja de invitaciones para ayudantes con aviso de decisión individual",
  },

  // DW15 Review Invitation (DW-F04)
  {
    id: "DW15-EN",
    name: "DW15 · Review invitation (English)",
    figmaNode: "1086:328",
    route: "/(app)/review-invitation",
    locale: "en",
    role: "HELPER",
    description:
      "Helper invitation review: Trip scope, helper earnings share & accept/decline actions",
  },
  {
    id: "DW15-ES",
    name: "DW15 · Revisar invitación (Español)",
    figmaNode: "1088:657",
    route: "/(app)/review-invitation",
    locale: "es",
    role: "HELPER",
    description:
      "Revisión de invitación por el ayudante: Alcance, ganancias individuales y aceptación",
  },

  // DW16 Crew Readiness (DW-F04)
  {
    id: "DW16-EN",
    name: "DW16 · Crew readiness (English)",
    figmaNode: "1086:365",
    route: "/(app)/crew-readiness",
    locale: "en",
    description: "Mutual confirmation status: Driver accepted, helper response and readiness check",
  },
  {
    id: "DW16-ES",
    name: "DW16 · Preparación del equipo (Español)",
    figmaNode: "1088:694",
    route: "/(app)/crew-readiness",
    locale: "es",
    description:
      "Estado de confirmación mutua: Conductor aceptado, respuesta del ayudante y equipo listo",
  },

  // DW48 Choose a Helper (DW-F04)
  {
    id: "DW48-EN",
    name: "DW48 · Choose a Helper (English)",
    figmaNode: "1301:920",
    route: "/(app)/choose-helper",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Candidate list for Driver crew invitation: Helper rating, proximity & eligibility",
  },
  {
    id: "DW48-ES",
    name: "DW48 · Elegir ayudante (Español)",
    figmaNode: "1301:2162",
    route: "/(app)/choose-helper",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Lista de candidatos a ayudante para el conductor: Calificación y proximidad",
  },

  // DW49 Invitation Pending (DW-F04)
  {
    id: "DW49-EN",
    name: "DW49 · Invitation pending (English)",
    figmaNode: "1301:1010",
    route: "/(app)/invitation-pending",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Pending invitation wait state: Independent response notice and crew readiness link",
  },
  {
    id: "DW49-ES",
    name: "DW49 · Invitación pendiente (Español)",
    figmaNode: "1301:2252",
    route: "/(app)/invitation-pending",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Espera de respuesta del ayudante: Aviso de aceptación independiente y preparación",
  },

  // DW17 Active Job (DW-F05)
  {
    id: "DW17-EN",
    name: "DW17 · Active job (English)",
    figmaNode: "1086:405",
    route: "/(app)/active-job",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Driver active transit: simulated route preview, transit progress stepper, and arrival confirmation",
  },
  {
    id: "DW17-ES",
    name: "DW17 · Trabajo activo (Español)",
    figmaNode: "1088:734",
    route: "/(app)/active-job",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Tránsito activo del conductor: vista previa de ruta simulada, progreso y llegada",
  },

  // DW18 Job Messages (DW-F05)
  {
    id: "DW18-EN",
    name: "DW18 · Job messages (English)",
    figmaNode: "1086:459",
    route: "/(app)/job-messages",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "In-job communication: customer/driver chat, asynchronous voice note waveform & attachments",
  },
  {
    id: "DW18-ES",
    name: "DW18 · Mensajes del trabajo (Español)",
    figmaNode: "1088:788",
    route: "/(app)/job-messages",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Comunicación de trabajo: chat con cliente/conductor, nota de voz con forma de onda y adjuntos",
  },

  // DW34 Connection Interrupted (DW-F05)
  {
    id: "DW34-EN",
    name: "DW34 · Connection interrupted (English)",
    figmaNode: "1086:1188",
    route: "/(app)/connection-interrupted",
    locale: "en",
    description:
      "Network/GPS offline recovery: amber warning, queued status disclosure, and retry reconnection",
  },
  {
    id: "DW34-ES",
    name: "DW34 · Conexión interrumpida (Español)",
    figmaNode: "1088:1517",
    route: "/(app)/connection-interrupted",
    locale: "es",
    description:
      "Recuperación de conexión fuera de línea: aviso ámbar, actualizaciones en cola y reintento",
  },

  // DW47 Message Status (DW-F05)
  {
    id: "DW47-EN",
    name: "DW47 · Message status (English)",
    figmaNode: "1301:837",
    route: "/(app)/message-status",
    locale: "en",
    description:
      "Message delivery lifecycle: queued status disclosure, conversation privacy, and return to chat",
  },
  {
    id: "DW47-ES",
    name: "DW47 · Estado del mensaje (Español)",
    figmaNode: "1301:2079",
    route: "/(app)/message-status",
    locale: "es",
    description:
      "Ciclo de entrega del mensaje: aviso de envío en cola, privacidad y retorno al chat",
  },

  // DW50 Location & Connection (DW-F05)
  {
    id: "DW50-EN",
    name: "DW50 · Location & connection (English)",
    figmaNode: "1301:1097",
    route: "/(app)/location-connection",
    locale: "en",
    description:
      "Diagnostic hub: location permission diagnostic, network status row, and safety control",
  },
  {
    id: "DW50-ES",
    name: "DW50 · Ubicación y conexión (Español)",
    figmaNode: "1301:2339",
    route: "/(app)/location-connection",
    locale: "es",
    description:
      "Centro de diagnóstico: permisos de ubicación, estado de red y control de seguridad",
  },

  // DW62 Helper Active Job (DW-F05)
  {
    id: "DW62-EN",
    name: "DW62 · Helper active job (English)",
    figmaNode: "1309:954",
    route: "/(app)/helper-active-job",
    locale: "en",
    role: "HELPER",
    description:
      "Helper active assignment: driver status, vehicle model, work location, and independent arrival confirmation",
  },
  {
    id: "DW62-ES",
    name: "DW62 · Trabajo activo de ayudante (Español)",
    figmaNode: "1309:1677",
    route: "/(app)/helper-active-job",
    locale: "es",
    role: "HELPER",
    description:
      "Asignación activa del ayudante: estado del conductor, ubicación y confirmación de llegada independiente",
  },

  // OV-06 Native Call Preview (DW-F05)
  {
    id: "OV06-EN",
    name: "OV-06 · Call preview modal (English)",
    figmaNode: "1305:706",
    route: "/(app)/active-job",
    locale: "en",
    description:
      "Native telephony preview: masked voice call disclosure card with full-width close action",
  },
  {
    id: "OV06-ES",
    name: "OV-06 · Llamada modal (Español)",
    figmaNode: "1305:716",
    route: "/(app)/active-job",
    locale: "es",
    description:
      "Vista previa de telefonía nativa: aviso de llamada con número enmascarado y botón de cierre",
  },

  // OV-07 Location Permission Preview (DW-F05)
  {
    id: "OV07-EN",
    name: "OV-07 · Location permission preview (English)",
    figmaNode: "1305:726",
    route: "/(app)/location-connection",
    locale: "en",
    description:
      "Device settings preview: location permission explanation modal with full-width close action",
  },
  {
    id: "OV07-ES",
    name: "OV-07 · Permiso de ubicación (Español)",
    figmaNode: "1305:735",
    route: "/(app)/location-connection",
    locale: "es",
    description:
      "Vista previa de ajustes de dispositivo: modal explicativo de permisos de ubicación y cierre",
  },

  // DW19 On-site Job Progress (DW-F06)
  {
    id: "DW19-EN",
    name: "DW19 · On-site job progress (English)",
    figmaNode: "1086:512",
    route: "/(app)/on-site-progress",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "On-site service stepper: Arrived, Work started, In progress & Ready for completion",
  },
  {
    id: "DW19-ES",
    name: "DW19 · Progreso en sitio (Español)",
    figmaNode: "1088:841",
    route: "/(app)/on-site-progress",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Control de etapas en sitio: Llegada, Trabajo iniciado, En curso y Listo para finalizar",
  },

  // DW20 Additional Work Approval (DW-F06)
  {
    id: "DW20-EN",
    name: "DW20 · Additional work approval (English)",
    figmaNode: "1086:562",
    route: "/(app)/additional-work-approval",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Scope expansion intake: Original scope card, extra item input & two-party approval notice",
  },
  {
    id: "DW20-ES",
    name: "DW20 · Aprobación de trabajo extra (Español)",
    figmaNode: "1088:891",
    route: "/(app)/additional-work-approval",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Solicitud de servicios extra: Alcance original, entrada de ítems y aviso de doble aprobación",
  },

  // DW51 Extra Work Pending (DW-F06)
  {
    id: "DW51-EN",
    name: "DW51 · Extra work pending (English)",
    figmaNode: "1301:1190",
    route: "/(app)/extra-work-pending",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Two-party approval wait state: Admin authorization & customer acceptance pending",
  },
  {
    id: "DW51-ES",
    name: "DW51 · Trabajo extra pendiente (Español)",
    figmaNode: "1301:2432",
    route: "/(app)/extra-work-pending",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Estado pendiente de doble aprobación: Autorización de Admin y aceptación del cliente",
  },

  // DW52 Extra Work Approved (DW-F06)
  {
    id: "DW52-EN",
    name: "DW52 · Extra work approved (English)",
    figmaNode: "1301:1279",
    route: "/(app)/extra-work-approved",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Confirmed scope expansion: Both approvals recorded with idempotent scope application",
  },
  {
    id: "DW52-ES",
    name: "DW52 · Trabajo extra aprobado (Español)",
    figmaNode: "1301:2521",
    route: "/(app)/extra-work-approved",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Expansión de alcance confirmada: Ambas aprobaciones registradas y aplicadas de forma segura",
  },

  // DW53 Extra Work Declined (DW-F06)
  {
    id: "DW53-EN",
    name: "DW53 · Extra work declined (English)",
    figmaNode: "1301:1362",
    route: "/(app)/extra-work-declined",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Scope expansion declined: Rejection preview with original scope preservation",
  },
  {
    id: "DW53-ES",
    name: "DW53 · Trabajo extra rechazado (Español)",
    figmaNode: "1301:2604",
    route: "/(app)/extra-work-declined",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Trabajo extra rechazado: Vista previa de rechazo preservando el alcance original",
  },

  // DW63 Helper On-Site Progress (DW-F06)
  {
    id: "DW63-EN",
    name: "DW63 · Helper on-site progress (English)",
    figmaNode: "1309:1052",
    route: "/(app)/helper-on-site-progress",
    locale: "en",
    role: "HELPER",
    description:
      "Helper individual on-site checklist: Arrival, task assignment, safety & no unilateral completion",
  },
  {
    id: "DW63-ES",
    name: "DW63 · Progreso del ayudante en sitio (Español)",
    figmaNode: "1309:1759",
    route: "/(app)/helper-on-site-progress",
    locale: "es",
    role: "HELPER",
    description:
      "Seguimiento individual del ayudante en sitio: Llegada, tareas, seguridad y sin cierre unilateral",
  },

  // DW21 Completion Evidence (DW-F07)
  {
    id: "DW21-EN",
    name: "DW21 · Completion evidence (English)",
    figmaNode: "1086:596",
    route: "/(app)/completion-evidence",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Primary Driver delivery proof: Before & after service photographic evidence cards with ISO timestamps",
  },
  {
    id: "DW21-ES",
    name: "DW21 · Evidencia de finalización (Español)",
    figmaNode: "1088:925",
    route: "/(app)/completion-evidence",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Prueba de entrega del Conductor: Tarjetas de foto antes y después del servicio con registro horario ISO",
  },

  // DW22 Job Completed (DW-F07)
  {
    id: "DW22-EN",
    name: "DW22 · Job completed (English)",
    figmaNode: "1086:637",
    route: "/(app)/job-completed",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Job completed confirmation: Evidence received, payout pending notice, earnings breakdown & 24h review policy",
  },
  {
    id: "DW22-ES",
    name: "DW22 · Trabajo completado (Español)",
    figmaNode: "1088:966",
    route: "/(app)/job-completed",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description:
      "Confirmación de trabajo finalizado: Evidencia recibida, aviso de pago pendiente y desglose de ganancias",
  },

  // DW64 Helper Work Evidence (DW-F07)
  {
    id: "DW64-EN",
    name: "DW64 · Helper work evidence (English)",
    figmaNode: "1309:1147",
    route: "/(app)/helper-work-evidence",
    locale: "en",
    role: "HELPER",
    description:
      "Helper task labor evidence: Individual labor proof upload, task photos & non-unilateral completion notice",
  },
  {
    id: "DW64-ES",
    name: "DW64 · Evidencia del ayudante (Español)",
    figmaNode: "1309:1838",
    route: "/(app)/helper-work-evidence",
    locale: "es",
    role: "HELPER",
    description:
      "Evidencia de labores del ayudante: Registro fotográfico individual sin cierre unilateral del trabajo",
  },

  // DW65 Helper Work Submitted (DW-F07)
  {
    id: "DW65-EN",
    name: "DW65 · Helper work submitted (English)",
    figmaNode: "1309:1243",
    route: "/(app)/helper-work-submitted",
    locale: "en",
    role: "HELPER",
    description:
      "Helper work submitted confirmation: Work submitted badge, awaiting Driver completion & payable share disclosure",
  },
  {
    id: "DW65-ES",
    name: "DW65 · Trabajo del ayudante enviado (Español)",
    figmaNode: "1309:1918",
    route: "/(app)/helper-work-submitted",
    locale: "es",
    role: "HELPER",
    description:
      "Confirmación de trabajo del ayudante enviado: Estado enviado, espera de cierre del Conductor y desglose",
  },

  // DW01 Welcome
  {
    id: "DW01-EN",
    name: "DW01 · Welcome (English)",
    figmaNode: "1085:3",
    route: "/(auth)/welcome",
    locale: "en",
    description: "Welcome landing with Arizona hero, benefits cards, Get Started & Sign In",
  },
  {
    id: "DW01-ES",
    name: "DW01 · Bienvenida (Español)",
    figmaNode: "1088:3",
    route: "/(auth)/welcome",
    locale: "es",
    description:
      "Pantalla de bienvenida en español con tarjetas de beneficios y selector de idioma",
  },

  // DW02 Create Account
  {
    id: "DW02-EN",
    name: "DW02 · Create your account (English)",
    figmaNode: "1085:39",
    route: "/(auth)/register",
    locale: "en",
    description: "Role selection: Driver (Vehicle operator) vs Helper (Crew member)",
  },
  {
    id: "DW02-ES",
    name: "DW02 · Crea tu cuenta (Español)",
    figmaNode: "1088:39",
    route: "/(auth)/register",
    locale: "es",
    description: "Selección de rol independiente: Conductor vs Ayudante",
  },

  // DW03 Sign In
  {
    id: "DW03-EN",
    name: "DW03 · Sign in (English)",
    figmaNode: "1085:80",
    route: "/(auth)/sign-in",
    locale: "en",
    description: "Email/Phone & Password sign-in, forgot password & phone login links",
  },
  {
    id: "DW03-ES",
    name: "DW03 · Iniciar sesión (Español)",
    figmaNode: "1088:80",
    route: "/(auth)/sign-in",
    locale: "es",
    description: "Acceso a cuenta existente con correo o número de teléfono",
  },

  // DW04 Phone Verification
  {
    id: "DW04-EN",
    name: "DW04 · Phone verification (English)",
    figmaNode: "1085:114",
    route: "/(auth)/verify-phone",
    locale: "en",
    description: "6-digit OTP verification with countdown timer and code-help navigation",
  },
  {
    id: "DW04-ES",
    name: "DW04 · Verificación de teléfono (Español)",
    figmaNode: "1088:114",
    route: "/(auth)/verify-phone",
    locale: "es",
    description: "Verificación de código de seguridad de 6 dígitos con cuenta regresiva",
  },

  // DW43 Reset Password
  {
    id: "DW43-EN",
    name: "DW43 · Reset password (English)",
    figmaNode: "1301:556",
    route: "/(auth)/forgot-password",
    locale: "en",
    description: "Password recovery request with privacy protection notice",
  },
  {
    id: "DW43-ES",
    name: "DW43 · Restablecer contraseña (Español)",
    figmaNode: "1301:1798",
    route: "/(auth)/forgot-password",
    locale: "es",
    description: "Recuperación de cuenta protegida con privacidad",
  },

  // DW44 Check Your Inbox
  {
    id: "DW44-EN",
    name: "DW44 · Check your inbox (English)",
    figmaNode: "1301:611",
    route: "/(auth)/reset-confirmation",
    locale: "en",
    description: "Password reset confirmation notice with return to sign-in CTA",
  },
  {
    id: "DW44-ES",
    name: "DW44 · Revisa tu bandeja de entrada (Español)",
    figmaNode: "1301:1853",
    route: "/(auth)/reset-confirmation",
    locale: "es",
    description: "Confirmación de solicitud de recuperación enviada",
  },

  // DW58 Driver Account Details
  {
    id: "DW58-EN",
    name: "DW58 · Driver account details (English)",
    figmaNode: "1309:706",
    route: "/(auth)/driver-register",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Driver intake: Legal name, email, phone, password and terms consent",
  },
  {
    id: "DW58-ES",
    name: "DW58 · Detalles de cuenta de Conductor (Español)",
    figmaNode: "1309:1429",
    route: "/(auth)/driver-register",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Registro de Conductor con consentimiento de términos",
  },

  // DW59 Helper Account Details
  {
    id: "DW59-EN",
    name: "DW59 · Helper account details (English)",
    figmaNode: "1309:772",
    route: "/(auth)/helper-register",
    locale: "en",
    role: "HELPER",
    description: "Helper intake: Legal name, email, phone, password and crew consent",
  },
  {
    id: "DW59-ES",
    name: "DW59 · Detalles de cuenta de Ayudante (Español)",
    figmaNode: "1309:1495",
    route: "/(auth)/helper-register",
    locale: "es",
    role: "HELPER",
    description: "Registro independiente de Ayudante de cuadrilla",
  },

  // DW60 Helper Phone Verification
  {
    id: "DW60-EN",
    name: "DW60 · Helper phone verification (English)",
    figmaNode: "1309:838",
    route: "/(auth)/helper-verify-phone",
    locale: "en",
    role: "HELPER",
    description: "Helper-specific OTP verification with security disclosure",
  },
  {
    id: "DW60-ES",
    name: "DW60 · Verificación telefónica de Ayudante (Español)",
    figmaNode: "1309:1561",
    route: "/(auth)/helper-verify-phone",
    locale: "es",
    role: "HELPER",
    description: "Validación de teléfono para el rol de Ayudante",
  },

  // DW61 Phone Sign-In Verification
  {
    id: "DW61-EN",
    name: "DW61 · Phone sign-in verification (English)",
    figmaNode: "1309:896",
    route: "/(auth)/phone-sign-in",
    locale: "en",
    description: "Phone OTP sign-in with Driver vs Helper dashboard preview options",
  },
  {
    id: "DW61-ES",
    name: "DW61 · Verificación de inicio por teléfono (Español)",
    figmaNode: "1309:1619",
    route: "/(auth)/phone-sign-in",
    locale: "es",
    description: "Inicio de sesión directo con teléfono y opciones de vista previa",
  },

  // DW66 Verification Code Issue
  {
    id: "DW66-EN",
    name: "DW66 · Verification code issue (English)",
    figmaNode: "1309:1332",
    route: "/(auth)/code-help",
    locale: "en",
    description: "Expired/invalid OTP recovery with security rule disclosure",
  },
  {
    id: "DW66-ES",
    name: "DW66 · Problema con código (Español)",
    figmaNode: "1309:1991",
    route: "/(auth)/code-help",
    locale: "es",
    description: "Recuperación de código vencido o no recibido",
  },

  // DW05 Driver Verification (DW-F02)
  {
    id: "DW05-EN",
    name: "DW05 · Driver verification (English)",
    figmaNode: "1085:154",
    route: "/(auth)/driver-verification",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Driver intake requirements: Identity, DL, Vehicle Registration, Insurance & Background",
  },
  {
    id: "DW05-ES",
    name: "DW05 · Verificación de Conductor (Español)",
    figmaNode: "1088:154",
    route: "/(auth)/driver-verification",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Requisitos de Conductor: Identidad, Licencia, Registro, Seguro y Antecedentes",
  },

  // DW06 Helper Verification (DW-F02)
  {
    id: "DW06-EN",
    name: "DW06 · Helper verification (English)",
    figmaNode: "1085:207",
    route: "/(auth)/helper-verification",
    locale: "en",
    role: "HELPER",
    description:
      "Helper intake requirements: Government ID, Selfie & Background check (No vehicle needed)",
  },
  {
    id: "DW06-ES",
    name: "DW06 · Verificación de Ayudante (Español)",
    figmaNode: "1088:207",
    route: "/(auth)/helper-verification",
    locale: "es",
    role: "HELPER",
    description:
      "Requisitos de Ayudante: Identificación oficial, Foto y Verificación sin vehículo propio",
  },

  // DW07 Driver Documents Checklist (DW-F02)
  {
    id: "DW07-EN",
    name: "DW07 · Driver documents (English)",
    figmaNode: "1085:254",
    route: "/(auth)/driver-documents",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "Document upload checklist: DL, Vehicle Registration, Commercial Insurance & Background Consent",
  },
  {
    id: "DW07-ES",
    name: "DW07 · Documentos de Conductor (Español)",
    figmaNode: "1088:254",
    route: "/(auth)/driver-documents",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Lista de documentos de Conductor con carga de archivos y consentimiento",
  },

  // DW08 Verification Status (DW-F02)
  {
    id: "DW08-EN",
    name: "DW08 · Verification status (English)",
    figmaNode: "1085:298",
    route: "/(auth)/verification-status",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Document review status with 24-48h review window and direct dashboard preview",
  },
  {
    id: "DW08-ES",
    name: "DW08 · Estado de verificación (Español)",
    figmaNode: "1088:298",
    route: "/(auth)/verification-status",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Estado de revisión de documentos con tiempo estimado y vista previa de panel",
  },

  // DW33 Verification Action Required (DW-F02)
  {
    id: "DW33-EN",
    name: "DW33 · Verification needs action (English)",
    figmaNode: "1086:1155",
    route: "/(auth)/verification-action",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Attention needed: Rejected/expired document resolution and re-upload flow",
  },
  {
    id: "DW33-ES",
    name: "DW33 · Acción requerida en verificación (Español)",
    figmaNode: "1088:1484",
    route: "/(auth)/verification-action",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Atención requerida: Solución de documentos rechazados o vencidos",
  },

  // DW38 Documents & Vehicle (DW-F02)
  {
    id: "DW38-EN",
    name: "DW38 · Documents & vehicle (English)",
    figmaNode: "1270:665",
    route: "/(app)/vehicle-docs",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description:
      "In-app Driver vehicle & compliance hub: DL, Registration, Insurance and Inspection",
  },
  {
    id: "DW38-ES",
    name: "DW38 · Documentos y vehículo (Español)",
    figmaNode: "1270:1616",
    route: "/(app)/vehicle-docs",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Centro de cumplimiento y vehículo en la app para conductores de HAULIX",
  },

  // DW56 Helper Eligibility & Documents (DW-F02)
  {
    id: "DW56-EN",
    name: "DW56 · Helper eligibility & documents (English)",
    figmaNode: "1301:1633",
    route: "/(app)/helper-docs",
    locale: "en",
    role: "HELPER",
    description:
      "In-app Helper eligibility & documents hub: Government ID, Selfie & Safety training",
  },
  {
    id: "DW56-ES",
    name: "DW56 · Elegibilidad y documentos de Ayudante (Español)",
    figmaNode: "1301:2875",
    route: "/(app)/helper-docs",
    locale: "es",
    role: "HELPER",
    description: "Centro de elegibilidad y documentos de identidad para ayudantes de cuadrilla",
  },

  // 5-Tab Navigation Shell
  {
    id: "TAB-HOME-DRIVER",
    name: "Tab 1 · Driver Home Hub (DW09)",
    figmaNode: "1084:26 / 1085:388",
    route: "/(app)/(tabs)",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Authoritative 5-Tab bar — Driver Home hub",
  },
  {
    id: "TAB-HOME-HELPER",
    name: "Tab 1 · Helper Home Hub (DW31)",
    figmaNode: "1084:26 / 1086:1049",
    route: "/(app)/(tabs)",
    locale: "en",
    role: "HELPER",
    description: "Authoritative 5-Tab bar — Helper Home hub",
  },
  {
    id: "TAB-JOBS",
    name: "Tab 2 · Jobs Hub",
    figmaNode: "1084:26 / 1085:470",
    route: "/(app)/(tabs)/jobs",
    locale: "en",
    description: "Authoritative 5-Tab bar — Jobs & invitations tab",
  },
  {
    id: "TAB-EARNINGS",
    name: "Tab 3 · Earnings Hub",
    figmaNode: "1084:26 / 1086:714",
    route: "/(app)/(tabs)/earnings",
    locale: "en",
    description: "Authoritative 5-Tab bar — Earnings ledger & cash-out tab",
  },
  {
    id: "TAB-MESSAGES",
    name: "Tab 4 · Messages Hub",
    figmaNode: "1084:26 / 1085:810",
    route: "/(app)/(tabs)/messages",
    locale: "en",
    description: "Authoritative 5-Tab bar — Crew & dispatch messaging tab",
  },
  {
    id: "TAB-PROFILE",
    name: "Tab 5 · Profile & Settings",
    figmaNode: "1084:26 / 1086:840",
    route: "/(app)/(tabs)/profile",
    locale: "en",
    description: "Authoritative 5-Tab bar — Profile, credentials & safety tab",
  },
];
