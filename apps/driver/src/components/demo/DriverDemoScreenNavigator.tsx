import { radius, spacing } from "@haulix/design-tokens";
import type { SupportedLocale } from "@haulix/i18n";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../i18n";
import { useDriverAuthStore } from "../../stores/authStore";
import { useAvailabilityStore } from "../../stores/availabilityStore";
import { useDispatchCrewStore } from "../../stores/dispatchCrewStore";
import { useDriverDocumentStore, type VerificationScenario } from "../../stores/documentStore";

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

export function DriverDemoScreenNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentLocale, toggleLanguage, setLanguage } = useDriverTranslation();
  const { role, setRole, loginMock, logout, isCleanMode, setCleanMode } = useDriverAuthStore();
  const { setScenario, resetDocuments, driver, helper } = useDriverDocumentStore();
  const { driverStatus, helperStatus, toggleDriverStatus, toggleHelperStatus, resetAvailability } =
    useAvailabilityStore();
  const { setScenario: setDispatchScenario, resetDispatchCrew } = useDispatchCrewStore();
  const [dispatchScenario, setDispatchScenarioState] = useState<string>("AVAILABLE");

  const handleSelectScreen = async (item: DemoScreenItem) => {
    if (item.locale !== currentLocale) {
      await setLanguage(item.locale);
    }
    if (item.role) {
      setRole(item.role);
    }
    if (item.route.startsWith("/(app)")) {
      loginMock(item.role || role);
    }
    setIsOpen(false);
    router.push(item.route as Href);
  };

  const handleResetDemoState = () => {
    logout();
    resetDocuments();
    resetAvailability();
    resetDispatchCrew();
    setRole("PRIMARY_DRIVER");
    setCleanMode(false);
    setIsOpen(false);
    router.replace("/(auth)/welcome");
  };

  const handleSetScenario = (
    scenario: VerificationScenario,
    targetRole: "PRIMARY_DRIVER" | "HELPER"
  ) => {
    setScenario(scenario, targetRole);
  };

  const handleDispatchScenario = (
    sc:
      | "AVAILABLE"
      | "EXPIRED"
      | "ACCEPTED"
      | "PENDING_INVITE"
      | "ACCEPTED_INVITE"
      | "DECLINED_INVITE"
      | "CREW_INCOMPLETE"
      | "CREW_READY"
  ) => {
    setDispatchScenarioState(sc);
    setDispatchScenario(sc);
  };

  const filteredScreens = DRIVER_DEMO_SCREENS.filter((screen) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      screen.id.toLowerCase().includes(query) ||
      screen.name.toLowerCase().includes(query) ||
      screen.figmaNode.toLowerCase().includes(query) ||
      screen.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Non-obstructive edge-docked trigger or invisible trigger for clean mode */}
      {isCleanMode ? (
        <Pressable
          onLongPress={() => setCleanMode(false)}
          onPress={() => setIsOpen(true)}
          style={styles.invisibleTrigger}
          accessibilityLabel="Open QA Navigator (Clean Mode Active)"
        />
      ) : (
        <View style={styles.floatingWrapper} pointerEvents="box-none">
          <Pressable
            onPress={() => (isMinimized ? setIsMinimized(false) : setIsOpen(true))}
            onLongPress={() => setIsMinimized(!isMinimized)}
            style={[styles.floatingDock, isMinimized && styles.floatingDockMinimized]}
            accessibilityRole="button"
            accessibilityLabel="Open QA Navigator"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.qaDot} />
            {!isMinimized && <Text style={styles.qaDockText}>QA</Text>}
          </Pressable>
        </View>
      )}

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Driver/Worker QA Navigator</Text>
                <Text style={styles.modalSubtitle}>Guard-Free Preview · 68-State Framework</Text>
              </View>

              <View style={styles.headerActions}>
                <Pressable onPress={toggleLanguage} style={styles.langToggle}>
                  <Text style={styles.langToggleText}>
                    {currentLocale === "en" ? "EN ➜ ES" : "ES ➜ EN"}
                  </Text>
                </Pressable>

                <Pressable onPress={() => setIsOpen(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>
            </View>

            {/* Quick Context Controls */}
            <View style={styles.controlsRow}>
              <Pressable
                onPress={() => setRole(role === "PRIMARY_DRIVER" ? "HELPER" : "PRIMARY_DRIVER")}
                style={[styles.controlChip, role === "PRIMARY_DRIVER" ? styles.chipActive : null]}
              >
                <Text style={styles.controlChipText}>
                  Role: {role === "PRIMARY_DRIVER" ? "Driver (Vehicle)" : "Helper (Crew)"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setCleanMode(!isCleanMode)}
                style={[styles.controlChip, isCleanMode ? styles.chipActive : null]}
              >
                <Text style={styles.controlChipText}>
                  {isCleanMode ? "Clean Mode: ON" : "Clean Mode: OFF"}
                </Text>
              </Pressable>

              <Pressable onPress={handleResetDemoState} style={styles.resetChip}>
                <Text style={styles.resetChipText}>↺ Reset All</Text>
              </Pressable>
            </View>

            {/* Scenario and Availability Matrix */}
            <View style={styles.scenarioMatrix}>
              {/* Driver Verification Scenarios */}
              <View style={styles.scenarioSection}>
                <Text style={styles.scenarioLabel}>Driver Verif ({driver.scenario}):</Text>
                <View style={styles.pillRow}>
                  {(
                    ["INITIAL", "PENDING", "ACTION_REQUIRED", "APPROVED"] as VerificationScenario[]
                  ).map((sc) => (
                    <Pressable
                      key={`d-${sc}`}
                      onPress={() => handleSetScenario(sc, "PRIMARY_DRIVER")}
                      style={[styles.miniPill, driver.scenario === sc && styles.miniPillActive]}
                    >
                      <Text
                        style={[
                          styles.miniPillText,
                          driver.scenario === sc && styles.miniPillTextActive,
                        ]}
                      >
                        {sc === "ACTION_REQUIRED" ? "ACTION" : sc}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Helper Verification Scenarios */}
              <View style={styles.scenarioSection}>
                <Text style={styles.scenarioLabel}>Helper Verif ({helper.scenario}):</Text>
                <View style={styles.pillRow}>
                  {(
                    ["INITIAL", "PENDING", "ACTION_REQUIRED", "APPROVED"] as VerificationScenario[]
                  ).map((sc) => (
                    <Pressable
                      key={`h-${sc}`}
                      onPress={() => handleSetScenario(sc, "HELPER")}
                      style={[styles.miniPill, helper.scenario === sc && styles.miniPillActive]}
                    >
                      <Text
                        style={[
                          styles.miniPillText,
                          helper.scenario === sc && styles.miniPillTextActive,
                        ]}
                      >
                        {sc === "ACTION_REQUIRED" ? "ACTION" : sc}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Live Availability Toggle */}
              <View style={styles.availabilityRow}>
                <Pressable
                  onPress={toggleDriverStatus}
                  style={[
                    styles.availPill,
                    driverStatus === "ONLINE" ? styles.availOnline : styles.availOffline,
                  ]}
                >
                  <Text style={styles.availText}>Driver: {driverStatus}</Text>
                </Pressable>

                <Pressable
                  onPress={toggleHelperStatus}
                  style={[
                    styles.availPill,
                    helperStatus === "ONLINE" ? styles.availOnline : styles.availOffline,
                  ]}
                >
                  <Text style={styles.availText}>Helper: {helperStatus}</Text>
                </Pressable>
              </View>

              {/* DW-F04 Dispatch & Crew Scenarios */}
              <View style={styles.scenarioSection}>
                <Text style={styles.scenarioLabel}>Dispatch & Crew ({dispatchScenario}):</Text>
                <View style={styles.pillRow}>
                  {(
                    [
                      "AVAILABLE",
                      "EXPIRED",
                      "ACCEPTED",
                      "PENDING_INVITE",
                      "ACCEPTED_INVITE",
                      "DECLINED_INVITE",
                      "CREW_INCOMPLETE",
                      "CREW_READY",
                    ] as const
                  ).map((sc) => (
                    <Pressable
                      key={`dc-${sc}`}
                      onPress={() => handleDispatchScenario(sc)}
                      style={[styles.miniPill, dispatchScenario === sc && styles.miniPillActive]}
                    >
                      <Text
                        style={[
                          styles.miniPillText,
                          dispatchScenario === sc && styles.miniPillTextActive,
                        ]}
                      >
                        {sc}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            {/* Search Input */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search screen by ID (e.g. DW01, DW04) or title..."
                placeholderTextColor="#687771"
                style={styles.searchInput}
                autoCapitalize="none"
              />
              {Boolean(searchQuery) && (
                <Pressable onPress={() => setSearchQuery("")}>
                  <Text style={styles.clearSearch}>✕</Text>
                </Pressable>
              )}
            </View>

            {/* Screen List */}
            <ScrollView style={styles.screensList} showsVerticalScrollIndicator={false}>
              {filteredScreens.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleSelectScreen(item)}
                  style={({ pressed }) => [styles.screenRow, pressed && styles.screenRowPressed]}
                >
                  <View style={styles.rowTop}>
                    <Text style={styles.screenName}>{item.name}</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.figmaNode}</Text>
                    </View>
                  </View>
                  <Text style={styles.screenDesc}>{item.description}</Text>
                </Pressable>
              ))}
              {filteredScreens.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No matching screens found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  invisibleTrigger: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 44,
    height: 44,
    zIndex: 9999,
  },
  floatingDock: {
    position: "absolute",
    top: "42%",
    right: 0,
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: "rgba(19, 25, 23, 0.92)",
    borderWidth: 1,
    borderColor: "#35403B",
    borderRightWidth: 0,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    zIndex: 9999,
  },
  floatingDockMinimized: {
    width: 10,
    paddingHorizontal: 0,
    borderColor: "#232C28",
  },
  qaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#BAFF42",
  },
  qaDockText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#151A19",
    borderTopLeftRadius: radius["2xl"],
    borderTopRightRadius: radius["2xl"],
    maxHeight: "85%",
    paddingTop: spacing[4],
    paddingHorizontal: spacing[4],
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: "#222B27",
  },
  modalTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
  },
  modalSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#ADB8B0",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 10,
  },
  controlChip: {
    flex: 1,
    backgroundColor: "#1E2523",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
  },
  chipActive: {
    borderColor: "#BAFF42",
  },
  controlChipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#F6F8F6",
  },
  resetChip: {
    backgroundColor: "#2A1818",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#5A2828",
  },
  resetChipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#FF8080",
  },
  scenarioMatrix: {
    backgroundColor: "#151B19",
    borderRadius: radius.md,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2B3532",
    gap: 6,
  },
  scenarioSection: {
    gap: 4,
  },
  scenarioLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: "#ADB8B0",
  },
  pillRow: {
    flexDirection: "row",
    gap: 4,
  },
  miniPill: {
    flex: 1,
    backgroundColor: "#1E2523",
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
  },
  miniPillActive: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    borderColor: "#BAFF42",
  },
  miniPillText: {
    fontFamily: "Inter_500Medium",
    fontSize: 9,
    color: "#ADB8B0",
  },
  miniPillTextActive: {
    color: "#BAFF42",
    fontFamily: "Inter_700Bold",
  },
  availabilityRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  availPill: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: "center",
  },
  availOnline: {
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderColor: "#BAFF42",
  },
  availOffline: {
    backgroundColor: "rgba(255, 128, 128, 0.12)",
    borderColor: "#FF8080",
  },
  availText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#F6F8F6",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1110",
    borderWidth: 1,
    borderColor: "#232C28",
    borderRadius: radius.lg,
    paddingHorizontal: 10,
    marginBottom: 8,
    height: 40,
  },
  searchIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FFFFFF",
    paddingVertical: 0,
  },
  clearSearch: {
    fontSize: 12,
    color: "#ADB8B0",
    padding: 4,
  },
  langToggle: {
    backgroundColor: "#222B27",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#BAFF42",
  },
  langToggleText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#BAFF42",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#222B27",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#F6F8F6",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  screensList: {
    paddingVertical: spacing[2],
  },
  screenRow: {
    backgroundColor: "#1E2523",
    borderRadius: radius.xl,
    padding: spacing[3],
    marginBottom: spacing[2.5],
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  screenRowPressed: {
    borderColor: "#BAFF42",
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
    flex: 1,
  },
  badge: {
    backgroundColor: "#2C3330",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginLeft: spacing[2],
  },
  badgeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 9,
    color: "#BAFF42",
  },
  screenDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#ADB8B0",
    marginTop: 4,
    lineHeight: 15,
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#687771",
  },
});
