import { colors, fontFamily, radius, spacing } from "@haulix/design-tokens";
import { changeLocale, getCurrentLocale, type SupportedLocale } from "@haulix/i18n";
import { type Href, usePathname, useRouter } from "expo-router";
import type React from "react";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenItem {
  id: string;
  name: string;
  figmaNode: string;
  route: string;
  params?: Record<string, string>;
  locale: SupportedLocale;
  description: string;
}

const IMPLEMENTED_SCREENS: ScreenItem[] = [
  {
    id: "w06-pre-es",
    name: "W06 · Conductor asignado, esperando salida (Español)",
    figmaNode: "Node 883:5495",
    route: "/active-service-awaiting-departure",
    locale: "es",
    description: "W06 Conductor asignado con ubicación privada oculta hasta inicio del trayecto",
  },
  {
    id: "w06-pre-en",
    name: "W06 · Driver Assigned, Awaiting Departure (English)",
    figmaNode: "Node 882:5131",
    route: "/active-service-awaiting-departure",
    locale: "en",
    description: "W06 Driver assigned with location privacy banner until transit initiates",
  },
  {
    id: "w06-enroute-es",
    name: "W06 · El conductor está en camino (Español)",
    figmaNode: "Node 883:5609",
    route: "/active-service-en-route",
    locale: "es",
    description: "W06 Mapa de despacho ilustrativo con ruta en camino hacia 742 Evergreen Terrace",
  },
  {
    id: "w06-enroute-en",
    name: "W06 · Driver Is on the Way (English)",
    figmaNode: "Node 882:5245",
    route: "/active-service-en-route",
    locale: "en",
    description:
      "W06 Illustrative dispatch map tracking authorized transit to 742 Evergreen Terrace",
  },
  {
    id: "w06-eta-pending-es",
    name: "W06 · Actualizando la estimación de ruta (Español)",
    figmaNode: "Node 883:5720",
    route: "/active-service-eta-pending",
    locale: "es",
    description: "W06 Verificación de hora estimada sin sintetizar ubicaciones simuladas de GPS",
  },
  {
    id: "w06-eta-pending-en",
    name: "W06 · Updating the Route Estimate (English)",
    figmaNode: "Node 882:5356",
    route: "/active-service-eta-pending",
    locale: "en",
    description: "W06 Route estimate verification without displaying fabricated GPS telemetry",
  },
  {
    id: "w06-gps-offline-es",
    name: "W06 · Ubicación temporalmente no disponible (Español)",
    figmaNode: "Node 883:5834",
    route: "/active-service-gps-offline",
    locale: "es",
    description: "W06 Estado de GPS sin conexión con preservación de privacidad y contacto directo",
  },
  {
    id: "w06-gps-offline-en",
    name: "W06 · Location Temporarily Unavailable (English)",
    figmaNode: "Node 882:5470",
    route: "/active-service-gps-offline",
    locale: "en",
    description: "W06 GPS offline state with privacy enforcement and direct driver contact options",
  },
  {
    id: "w06-gps-denied-es",
    name: "W06 · No se puede mostrar la ubicación (Español)",
    figmaNode: "Node 883:5948",
    route: "/active-service-gps-denied",
    locale: "es",
    description: "W06 Permisos o privacidad restringidos con continuidad de servicio asistido",
  },
  {
    id: "w06-gps-denied-en",
    name: "W06 · Location Cannot Be Displayed (English)",
    figmaNode: "Node 882:5584",
    route: "/active-service-gps-denied",
    locale: "en",
    description: "W06 Location permission restricted state with assisted service continuity",
  },
  {
    id: "w06-arrived-es",
    name: "W06 · Tu conductor ha llegado (Español)",
    figmaNode: "Node 883:6062",
    route: "/active-service-driver-arrived",
    locale: "es",
    description: "W06 Llegada confirmada del conductor con PIN de verificación y mapa en destino",
  },
  {
    id: "w06-arrived-en",
    name: "W06 · Your Driver Has Arrived (English)",
    figmaNode: "Node 882:5698",
    route: "/active-service-driver-arrived",
    locale: "en",
    description: "W06 Confirmed driver arrival state with verification PIN and destination map",
  },
  {
    id: "w06-working-es",
    name: "W06 · Servicio en curso (Español)",
    figmaNode: "Node 883:6173",
    route: "/active-service-working",
    locale: "es",
    description:
      "W06 Trabajo de servicio activo en progreso según el alcance confirmado de la reserva",
  },
  {
    id: "w06-working-en",
    name: "W06 · Service Is in Progress (English)",
    figmaNode: "Node 882:5809",
    route: "/active-service-working",
    locale: "en",
    description: "W06 Active service execution following confirmed booking scope and inventory",
  },
  {
    id: "w06-chat-es",
    name: "W06 · Conversación del servicio (Español)",
    figmaNode: "Node 883:6280",
    route: "/active-service-chat",
    locale: "es",
    description:
      "W06 Chat exclusivo del servicio con mensajes de prueba del conductor y compositor",
  },
  {
    id: "w06-chat-en",
    name: "W06 · Job Conversation (English)",
    figmaNode: "Node 882:5916",
    route: "/active-service-chat",
    locale: "en",
    description: "W06 Job-only chat interface with driver communication and message composer",
  },
  {
    id: "w06-chat-empty-es",
    name: "W06 · Aún no hay mensajes (Español)",
    figmaNode: "Node 883:6385",
    route: "/active-service-chat-empty",
    locale: "es",
    description: "W06 Conversación de servicio vacía con pautas de comunicación y privacidad",
  },
  {
    id: "w06-chat-empty-en",
    name: "W06 · No Messages Yet (English)",
    figmaNode: "Node 882:6021",
    route: "/active-service-chat-empty",
    locale: "en",
    description: "W06 Empty job conversation state with communication notes and privacy safeguards",
  },
  {
    id: "w06-chat-failed-es",
    name: "W06 · No se pudo enviar el mensaje (Español)",
    figmaNode: "Node 883:6490",
    route: "/active-service-chat-failed",
    locale: "es",
    description: "W06 Error de entrega de mensaje con borrador conservado y opciones de reintento",
  },
  {
    id: "w06-chat-failed-en",
    name: "W06 · Message Could Not Be Sent (English)",
    figmaNode: "Node 882:6126",
    route: "/active-service-chat-failed",
    locale: "en",
    description: "W06 Message delivery error state with preserved draft and retry capability",
  },
  {
    id: "w06-chat-sent-es",
    name: "W06 · Mensaje de prueba enviado (Español)",
    figmaNode: "Node 883:6595",
    route: "/active-service-chat-sent",
    locale: "es",
    description: "W06 Confirmación de entrega de mensaje de demostración con sello de tiempo",
  },
  {
    id: "w06-chat-sent-en",
    name: "W06 · Sample Message Sent (English)",
    figmaNode: "Node 882:6231",
    route: "/active-service-chat-sent",
    locale: "en",
    description: "W06 Demonstration message delivered confirmation with timestamp and alert note",
  },
  {
    id: "w06-media-es",
    name: "W06 · Enviar foto o audio (Español)",
    figmaNode: "Node 883:6700",
    route: "/active-service-media",
    locale: "es",
    description: "W06 Compositor de evidencia con selector de fotos y notas de voz asíncronas",
  },
  {
    id: "w06-media-en",
    name: "W06 · Send Photo or Voice Evidence (English)",
    figmaNode: "Node 882:6336",
    route: "/active-service-media",
    locale: "en",
    description: "W06 Evidence media composer supporting item photos and asynchronous voice clips",
  },
  {
    id: "w05-no-show-es",
    name: "W05 · El conductor aún no llega (Español)",
    figmaNode: "Node 844:8128",
    route: "/driver-no-show",
    locale: "es",
    description:
      "W05 El conductor no ha llegado; opciones de cancelación sin cargo o reprogramación bajo SRS",
  },
  {
    id: "w05-no-show-en",
    name: "W05 · Driver has not arrived (English)",
    figmaNode: "Node 844:5978",
    route: "/driver-no-show",
    locale: "en",
    description:
      "W05 Driver has not arrived; fee-free cancellation or reschedule options under SRS",
  },
  {
    id: "w05-reschedule-es",
    name: "W05 · Elige otra ventana de servicio (Español)",
    figmaNode: "Node 844:8496",
    route: "/dispatch-reschedule",
    locale: "es",
    description: "W05 Opciones de reprogramación de ventana de servicio para búsqueda de conductor",
  },
  {
    id: "w05-reschedule-en",
    name: "W05 · Choose another service window (English)",
    figmaNode: "Node 844:6346",
    route: "/dispatch-reschedule",
    locale: "en",
    description: "W05 Reschedule options for service window search following dispatch review",
  },
  {
    id: "w05-support-es",
    name: "W05 · Obtener ayuda con el despacho (Español)",
    figmaNode: "Node 844:8595",
    route: "/dispatch-support",
    locale: "es",
    description: "W05 Soporte de despacho asistido para opciones de conductor demorado o ausente",
  },
  {
    id: "w05-support-en",
    name: "W05 · Get dispatch support (English)",
    figmaNode: "Node 844:6445",
    route: "/dispatch-support",
    locale: "en",
    description: "W05 Assisted dispatch support for delayed driver or no-driver resolution",
  },
  {
    id: "w05-w06-bridge-es",
    name: "W05 · Siguiente: llegada y servicio (Español)",
    figmaNode: "Node 844:8687",
    route: "/job-active-bridge",
    locale: "es",
    description:
      "W05 Transferencia a W06 de llegada y servicio activo tras asignación completa de equipo",
  },
  {
    id: "w05-w06-bridge-en",
    name: "W05 · Next: arrival and service (English)",
    figmaNode: "Node 844:6537",
    route: "/job-active-bridge",
    locale: "en",
    description: "W05 Bridge handoff to W06 active service execution following crew assignment",
  },
  {
    id: "w05-accept-pending-es",
    name: "W05 · Esperando aceptación válida (Español)",
    figmaNode: "Node 844:7216",
    route: "/driver-offer-pending",
    locale: "es",
    description: "W05 Esperando aceptación de conductor verificado para la reserva",
  },
  {
    id: "w05-accept-pending-en",
    name: "W05 · Awaiting valid driver acceptance (English)",
    figmaNode: "Node 844:5066",
    route: "/driver-offer-pending",
    locale: "en",
    description: "W05 Awaiting valid verified driver acceptance for booking",
  },
  {
    id: "w05-driver-details-es",
    name: "W05 · Tu conductor verificado (Español)",
    figmaNode: "Node 844:7434",
    route: "/driver-profile-details",
    locale: "es",
    description: "W05 Datos del conductor asignado y equipo con furgoneta blanca",
  },
  {
    id: "w05-driver-details-en",
    name: "W05 · Your verified driver (English)",
    figmaNode: "Node 844:5284",
    route: "/driver-profile-details",
    locale: "en",
    description: "W05 Verified driver profile details and crew readiness",
  },
  {
    id: "w05-helper-matching-es",
    name: "W05 · Esperando confirmación del ayudante (Español)",
    figmaNode: "Node 844:7553",
    route: "/helper-matching",
    locale: "es",
    description: "W05 Esperando confirmación individual del ayudante en cuenta verificada",
  },
  {
    id: "w05-helper-matching-en",
    name: "W05 · Waiting for helper confirmation (English)",
    figmaNode: "Node 844:5403",
    route: "/helper-matching",
    locale: "en",
    description: "W05 Waiting for individual helper confirmation in verified account",
  },
  {
    id: "w05-dispatch-retry-es",
    name: "W05 · Buscando conductor sustituto (Español)",
    figmaNode: "Node 844:7791",
    route: "/dispatch-retry",
    locale: "es",
    description: "W05 Reasignando y buscando conductor sustituto verificado",
  },
  {
    id: "w05-dispatch-retry-en",
    name: "W05 · Finding a replacement driver (English)",
    figmaNode: "Node 844:5641",
    route: "/dispatch-retry",
    locale: "en",
    description: "W05 Searching eligible verified replacement drivers for booking",
  },
  {
    id: "w05-s50-es",
    name: "W05 · Búsqueda hasta 50 millas (Español)",
    figmaNode: "Node 844:7117",
    route: "/search-expanded-50mi",
    locale: "es",
    description: "W05 Búsqueda de radio máximo hasta 50 millas con cronograma de despacho",
  },
  {
    id: "w05-s50-en",
    name: "W05 · Searching up to 50 miles (English)",
    figmaNode: "Node 844:4967",
    route: "/search-expanded-50mi",
    locale: "en",
    description: "W05 Maximum 50-mile search radius reached with dispatch timeline",
  },
  {
    id: "w05-s40-es",
    name: "W05 · Búsqueda ampliada a 40 millas (Español)",
    figmaNode: "Node 844:7018",
    route: "/search-expanded-40mi",
    locale: "es",
    description: "W05 Búsqueda de despacho ampliada a 40 millas con mapa localizado",
  },
  {
    id: "w05-s40-en",
    name: "W05 · Search expanded to 40 miles (English)",
    figmaNode: "Node 844:4868",
    route: "/search-expanded-40mi",
    locale: "en",
    description: "W05 Dispatch search coverage expanded outward to 40 miles",
  },
  {
    id: "w05-s30-es",
    name: "W05 · Radio de búsqueda ampliando a 30 mi (Español)",
    figmaNode: "Node 844:6919",
    route: "/search-expanding-30mi",
    locale: "es",
    description: "W05 Radio de búsqueda ampliando a 30 millas en área metropolitana",
  },
  {
    id: "w05-s30-en",
    name: "W05 · Search radius expanding to 30 mi (English)",
    figmaNode: "Node 844:4769",
    route: "/search-expanding-30mi",
    locale: "en",
    description: "W05 Search radius expanding to 30-mile intermediate metro coverage",
  },
  {
    id: "w05-s20-es",
    name: "W05 · Búsqueda ampliada a 20 millas (Español)",
    figmaNode: "Node 844:6820",
    route: "/search-expanded-20mi",
    locale: "es",
    description: "W05 Búsqueda ampliada a 20 millas contactando conductores calificados",
  },
  {
    id: "w05-s20-en",
    name: "W05 · Search expanded to 20 miles (English)",
    figmaNode: "Node 844:4670",
    route: "/search-expanded-20mi",
    locale: "en",
    description: "W05 Search expanded to 20-mile radius with dispatch timeline",
  },
  {
    id: "w05-canceled-es",
    name: "W05 · Solicitud cancelada sin cargo (Español)",
    figmaNode: "Node 844:8404",
    route: "/request-canceled",
    locale: "es",
    description: "W05 Solicitud cancelada sin cargo: opciones de reprogramación o nueva búsqueda",
  },
  {
    id: "w05-canceled-en",
    name: "W05 · Request Canceled Without Fee (English)",
    figmaNode: "Node 844:6254",
    route: "/request-canceled",
    locale: "en",
    description: "W05 Request canceled fee-free: rescheduling or new demo search options",
  },
  {
    id: "w05-reassigned-es",
    name: "W05 · Conductor reasignado (Español)",
    figmaNode: "Node 844:7890",
    route: "/driver-reassigned",
    locale: "es",
    description:
      "W05 Asignación de conductor sustituto verificado (Sarah L.) tras cambio de despacho",
  },
  {
    id: "w05-reassigned-en",
    name: "W05 · Driver Reassigned (English)",
    figmaNode: "Node 844:5740",
    route: "/driver-reassigned",
    locale: "en",
    description: "W05 Replacement verified driver assignment (Sarah L.) following dispatch update",
  },
  {
    id: "w05-driver-late-es",
    name: "W05 · Actualización de llegada demorada (Español)",
    figmaNode: "Node 844:8009",
    route: "/driver-arrival-update",
    locale: "es",
    description: "W05 Notificación de demora de llegada del conductor con opciones de ausencia",
  },
  {
    id: "w05-driver-late-en",
    name: "W05 · Driver Arrival Update (English)",
    figmaNode: "Node 844:5859",
    route: "/driver-arrival-update",
    locale: "en",
    description: "W05 Driver arrival delay notice with no-show options and W06 handoff link",
  },
  {
    id: "w05-no-driver-es",
    name: "W05 · No hay conductor disponible (Español)",
    figmaNode: "Node 844:8220",
    route: "/no-driver-available",
    locale: "es",
    description:
      "W05 Búsqueda de radio 50 mi sin conductor: reprogramación o cancelación sin cargo",
  },
  {
    id: "w05-no-driver-en",
    name: "W05 · No Driver Available (English)",
    figmaNode: "Node 844:6070",
    route: "/no-driver-available",
    locale: "en",
    description: "W05 Search expanded to 50 mi with no driver: reschedule or cancel fee-free",
  },
  {
    id: "c32d-es",
    name: "C32-D · Ventanas de cancelación (Español)",
    figmaNode: "Section 836:4572",
    route: "/cancellation-windows",
    locale: "es",
    description:
      "W05 Política y ventanas de cancelación sin tarifa y cálculo ilustrativo de rescisión",
  },
  {
    id: "c32d-en",
    name: "C32-D · Cancellation Windows (English)",
    figmaNode: "Section 836:4571",
    route: "/cancellation-windows",
    locale: "en",
    description:
      "W05 Cancellation policies, fee-free window, and illustrative dispatch fee breakdown",
  },
  {
    id: "c32c-es",
    name: "C32-C · Seguimiento de equipo asignado (Español)",
    figmaNode: "Section 836:4572",
    route: "/crew-tracking",
    locale: "es",
    description:
      "W05 Mapa vectorial de alta fidelidad, ruta activa, equipo de 2 personas y telemetría",
  },
  {
    id: "c32c-en",
    name: "C32-C · Crew Assigned & Tracking (English)",
    figmaNode: "Section 836:4571",
    route: "/crew-tracking",
    locale: "en",
    description:
      "W05 High-fidelity vector dispatch map, route polyline, 2-person crew card, and live ETA",
  },
  {
    id: "c32b-es",
    name: "C32-B · Conductor asignado (Español)",
    figmaNode: "Section 836:4572",
    route: "/driver-matched",
    locale: "es",
    description: "W05 Notificación de asignación de conductor verificado con detalles del vehículo",
  },
  {
    id: "c32b-en",
    name: "C32-B · Driver Matched (English)",
    figmaNode: "Section 836:4571",
    route: "/driver-matched",
    locale: "en",
    description: "W05 Verified driver match confirmation card with vehicle specifications and ETA",
  },
  {
    id: "c32a-es",
    name: "C32-A · Buscando conductor (Español)",
    figmaNode: "Section 836:4572",
    route: "/searching-for-driver",
    locale: "es",
    description: "W05 Radar animado sobre mapa vectorial oscuro buscando conductores calificados",
  },
  {
    id: "c32a-en",
    name: "C32-A · Searching for Driver (English)",
    figmaNode: "Section 836:4571",
    route: "/searching-for-driver",
    locale: "en",
    description: "W05 Animated radar pulse over dark vector map querying verified driver network",
  },
  {
    id: "c31s-es",
    name: "C31-S · Tu reserva está registrada (Español)",
    figmaNode: "Node 766:1475",
    route: "/booking-recorded",
    locale: "es",
    description:
      "W04 Demostración de resultado: reserva programada registrada en espera de despacho",
  },
  {
    id: "c31s-en",
    name: "C31-S · Your Booking Is Recorded (English)",
    figmaNode: "Node 763:1089",
    route: "/booking-recorded",
    locale: "en",
    description:
      "W04 Outcome demonstration: scheduled booking recorded awaiting verified driver dispatch",
  },
  {
    id: "c31a-es",
    name: "C31-A · Tu solicitud inmediata está registrada (Español)",
    figmaNode: "Node 766:1541",
    route: "/asap-request-recorded",
    locale: "es",
    description:
      "W04 Demostración de resultado: solicitud inmediata (cuanto antes) en búsqueda de conductor",
  },
  {
    id: "c31a-en",
    name: "C31-A · Your ASAP Request Is Recorded (English)",
    figmaNode: "Node 763:1155",
    route: "/asap-request-recorded",
    locale: "en",
    description:
      "W04 Outcome demonstration: immediate ASAP request recorded searching live driver network",
  },
  {
    id: "c31f-es",
    name: "C31-F · La reserva aún no está confirmada (Español)",
    figmaNode: "Node 766:1607",
    route: "/booking-not-confirmed",
    locale: "es",
    description:
      "W04 Demostración de resultado: reserva aún no confirmada con opciones de espera o reprogramación",
  },
  {
    id: "c31f-en",
    name: "C31-F · Booking Not Yet Confirmed (English)",
    figmaNode: "Node 763:1221",
    route: "/booking-not-confirmed",
    locale: "en",
    description:
      "W04 Outcome demonstration: unconfirmed status with recovery options for slot selection or queued wait",
  },
  {
    id: "c30r-es",
    name: "C30-R · Restaurar autorización segura (Español)",
    figmaNode: "Node 766:1338",
    route: "/restore-secure-authorization",
    locale: "es",
    description: "W04 Recuperación de sesión de pago para autorizaciones interrumpidas o vencidas",
  },
  {
    id: "c30r-en",
    name: "C30-R · Restore Secure Authorization (English)",
    figmaNode: "Node 763:952",
    route: "/restore-secure-authorization",
    locale: "en",
    description: "W04 Payment authorization recovery interface for interrupted or expired holds",
  },
  {
    id: "c30c-es",
    name: "C30-C · Revisar una nueva retención de tarjeta (Español)",
    figmaNode: "Node 773:1053",
    route: "/review-fresh-card-hold",
    locale: "es",
    description:
      "W04 Punto de consentimiento comercial previo a una nueva solicitud de retención temporal",
  },
  {
    id: "c30c-en",
    name: "C30-C · Review a Fresh Card Hold (English)",
    figmaNode: "Node 773:836",
    route: "/review-fresh-card-hold",
    locale: "en",
    description:
      "W04 Commercial consent checkpoint requiring explicit agreement before fresh authorization",
  },
  {
    id: "c30ca-es",
    name: "C30-CA · Nuevo consentimiento de autorización registrado (Español)",
    figmaNode: "Node 773:1122",
    route: "/new-authorization-consent",
    locale: "es",
    description: "W04 Conformidad registrada bajo versión v2 para nueva retención de demostración",
  },
  {
    id: "c30ca-en",
    name: "C30-CA · New Authorization Consent Recorded (English)",
    figmaNode: "Node 773:905",
    route: "/new-authorization-consent",
    locale: "en",
    description:
      "W04 Local demonstration acknowledgement under v2 terms recorded for fresh authorization",
  },
  {
    id: "c31p-es",
    name: "C31-P · Verificando estado de la reserva (Español)",
    figmaNode: "Node 766:1407",
    route: "/checking-booking-status",
    locale: "es",
    description:
      "W04 Cola de verificación de solicitud de servicio y estado de reserva sin mutación de servidor",
  },
  {
    id: "c31p-en",
    name: "C31-P · Checking Booking Status (English)",
    figmaNode: "Node 763:1021",
    route: "/checking-booking-status",
    locale: "en",
    description:
      "W04 Service request verification queue demonstration; zero fabricated backend mutations",
  },
  {
    id: "c29_3d-es",
    name: "C29-3D · Confirma la autenticación de tu tarjeta (Español)",
    figmaNode: "Node 766:1062",
    route: "/confirm-card-authentication",
    locale: "es",
    description:
      "W04 Simulación de verificación 3D Secure 2.0 requerida por el banco emisor de la tarjeta",
  },
  {
    id: "c29_3d-en",
    name: "C29-3D · Confirm Card Authentication (English)",
    figmaNode: "Node 763:676",
    route: "/confirm-card-authentication",
    locale: "en",
    description:
      "W04 3D Secure 2.0 issuer authentication flow simulation; zero customer credential storage",
  },
  {
    id: "c29p-es",
    name: "C29-P · Autorizando tu pago (Español)",
    figmaNode: "Node 766:1131",
    route: "/payment-authorization-pending",
    locale: "es",
    description:
      "W04 Cola de procesamiento de retención temporal de autorización ($356.00 USD) para la reserva",
  },
  {
    id: "c29p-en",
    name: "C29-P · Payment Authorization Pending (English)",
    figmaNode: "Node 763:745",
    route: "/payment-authorization-pending",
    locale: "en",
    description:
      "W04 Temporary payment hold authorization queue ($356.00 USD) with simulation options",
  },
  {
    id: "c30d-es",
    name: "C30-D · La autorización fue rechazada (Español)",
    figmaNode: "Node 766:1200",
    route: "/payment-authorization-declined",
    locale: "es",
    description:
      "W04 Recuperación tras rechazo de autorización; garantía de sin cobro y cambio de método",
  },
  {
    id: "c30d-en",
    name: "C30-D · Authorization Was Declined (English)",
    figmaNode: "Node 763:814",
    route: "/payment-authorization-declined",
    locale: "en",
    description:
      "W04 Payment authorization decline recovery; zero charges placed and payment retry",
  },
  {
    id: "c30e-es",
    name: "C30-E · La retención de tu tarjeta venció (Español)",
    figmaNode: "Node 766:1269",
    route: "/card-hold-expired",
    locale: "es",
    description:
      "W04 Retención temporal vencida y liberada automáticamente ($0.00 cobrado); reautorización",
  },
  {
    id: "c30e-en",
    name: "C30-E · Your Card Hold Expired (English)",
    figmaNode: "Node 763:883",
    route: "/card-hold-expired",
    locale: "en",
    description:
      "W04 Temporary card hold timed out and automatically released ($0.00 charged); re-authorization",
  },
  {
    id: "c28u-es",
    name: "C28-U · Las condiciones de reserva han cambiado (Español)",
    figmaNode: "Node 766:922",
    route: "/booking-terms-changed",
    locale: "es",
    description:
      "W04 Actualización de políticas durante la reserva; invalidación de consentimiento anterior",
  },
  {
    id: "c28u-en",
    name: "C28-U · Booking Terms Changed (English)",
    figmaNode: "Node 763:536",
    route: "/booking-terms-changed",
    locale: "en",
    description:
      "W04 Policy update during booking; invalidates previous terms consent until re-reviewed",
  },
  {
    id: "c27x-es",
    name: "C27-X · Sin conductor · Cancelación sin cargo (Español)",
    figmaNode: "Node 773:993",
    route: "/no-driver-fee-free-cancellation",
    locale: "es",
    description:
      "W04 Cierre sin cargo ($0.00) tras no encontrar conductores disponibles para solicitud inmediata",
  },
  {
    id: "c27x-en",
    name: "C27-X · No Driver Found · Cancel Without Fee (English)",
    figmaNode: "Node 773:776",
    route: "/no-driver-fee-free-cancellation",
    locale: "en",
    description:
      "W04 Fee-free exit ($0.00 charge) when no eligible driver could be assigned to ASAP request",
  },
  {
    id: "c29-es",
    name: "C29 · Elige el método de pago (Español)",
    figmaNode: "Node 766:991",
    route: "/choose-payment-method",
    locale: "es",
    description:
      "W04 Selección de método de pago tras consentimiento de términos; tarjeta o billetera digital",
  },
  {
    id: "c29-en",
    name: "C29 · Choose Payment Method (English)",
    figmaNode: "Node 763:605",
    route: "/choose-payment-method",
    locale: "en",
    description:
      "W04 Payment method selection after terms consent; credit card or digital wallet authorization",
  },
  {
    id: "c29m-es",
    name: "C29-M · Configuración segura de tarjeta (Español)",
    figmaNode: "Node 814:4604",
    route: "/secure-card-setup",
    locale: "es",
    description:
      "W04 Demostración no interactiva de pasarela segura con proveedor externo (Stripe)",
  },
  {
    id: "c29m-en",
    name: "C29-M · Secure Card Setup / Provider Handoff (English)",
    figmaNode: "Node 814:4531",
    route: "/secure-card-setup",
    locale: "en",
    description:
      "W04 Non-interactive secure provider handoff demonstration; zero sensitive data collection",
  },
  {
    id: "c27v-es",
    name: "C27-V · Hora no válida para hoy (Español)",
    figmaNode: "Node 766:588",
    route: "/invalid-service-time",
    locale: "es",
    description: "W04 Aviso de hora del mismo día no disponible por margen mínimo de 60 minutos",
  },
  {
    id: "c27v-en",
    name: "C27-V · Invalid Same-Day Service Time (English)",
    figmaNode: "Node 763:202",
    route: "/invalid-service-time",
    locale: "en",
    description: "W04 Same-day slot blocked by 60-minute minimum advance notice rule",
  },
  {
    id: "c27r-es",
    name: "C27-R · Franja de servicio no disponible (Español)",
    figmaNode: "Node 766:655",
    route: "/service-window-unavailable",
    locale: "es",
    description: "W04 Franja seleccionada ocupada o caducada; selector de horarios actualizados",
  },
  {
    id: "c27r-en",
    name: "C27-R · Service Window Unavailable (English)",
    figmaNode: "Node 763:269",
    route: "/service-window-unavailable",
    locale: "en",
    description:
      "W04 Selected window booked or stale; refreshed slots and immediate ASAP alternative",
  },
  {
    id: "c27n-es",
    name: "C27-N · No encontramos conductores disponibles (Español)",
    figmaNode: "Node 766:722",
    route: "/no-eligible-driver",
    locale: "es",
    description:
      "W04 Sin conductores inmediatos con capacidad; programar después o cancelar sin cargo",
  },
  {
    id: "c27n-en",
    name: "C27-N · No Eligible Driver Found (English)",
    figmaNode: "Node 763:336",
    route: "/no-eligible-driver",
    locale: "en",
    description:
      "W04 No verified drivers nearby with vehicle capacity; schedule later or cancel without fee",
  },
  {
    id: "c28c-es",
    name: "C28-C · Términos aceptados para esta cotización (Español)",
    figmaNode: "Node 766:853",
    route: "/booking-terms-accepted",
    locale: "es",
    description: "W04 Términos confirmados explícitamente; continuación a pago seguro demostrativo",
  },
  {
    id: "c28c-en",
    name: "C28-C · Terms Accepted for This Quote (English)",
    figmaNode: "Node 763:467",
    route: "/booking-terms-accepted",
    locale: "en",
    description: "W04 Terms consent explicitly acknowledged; continue to demo payment flow",
  },
  {
    id: "c27-es",
    name: "C27 · Elige cuándo necesitas el servicio (Español)",
    figmaNode: "Node 766:388",
    route: "/choose-service-time",
    locale: "es",
    description:
      "W04 Entrada a programación; selector entre servicio inmediato (ASAP) o franja programada",
  },
  {
    id: "c27-en",
    name: "C27 · Choose Your Service Time (English)",
    figmaNode: "Node 763:2",
    route: "/choose-service-time",
    locale: "en",
    description: "W04 Scheduling entry; choose between immediate ASAP service or scheduled window",
  },
  {
    id: "c27a-es",
    name: "C27-A · Solicitar servicio cuanto antes (Español)",
    figmaNode: "Node 766:457",
    route: "/request-service-asap",
    locale: "es",
    description:
      "W04 Solicitud inmediata ASAP; criterios de conductor verificado sin horas garantizadas",
  },
  {
    id: "c27a-en",
    name: "C27-A · Request Service ASAP (English)",
    figmaNode: "Node 763:71",
    route: "/request-service-asap",
    locale: "en",
    description:
      "W04 Immediate ASAP request; verified driver capacity criteria without guaranteed arrival times",
  },
  {
    id: "c27s-es",
    name: "C27-S · Elige un horario disponible (Español)",
    figmaNode: "Node 766:519",
    route: "/select-available-window",
    locale: "es",
    description:
      "W04 Selector de fechas y franjas de 2 horas; aviso previo de 60 minutos para el mismo día",
  },
  {
    id: "c27s-en",
    name: "C27-S · Select Available Window (English)",
    figmaNode: "Node 763:133",
    route: "/select-available-window",
    locale: "en",
    description:
      "W04 Date and 2-hour window chooser; 60-minute same-day minimum advance notice rule",
  },
  {
    id: "c28-es",
    name: "C28 · Revisa tu reserva (Español)",
    figmaNode: "Node 766:782",
    route: "/review-booking",
    locale: "es",
    description:
      "W04 Revisión de reserva; cotización de $356, política de cancelación y casilla de consentimiento",
  },
  {
    id: "c28-en",
    name: "C28 · Review Your Booking (English)",
    figmaNode: "Node 763:396",
    route: "/review-booking",
    locale: "en",
    description:
      "W04 Booking review; $356 illustrative quote, cancellation policy, and terms consent gate",
  },
  {
    id: "c25a-es",
    name: "C25-A · ¿Aceptar este alcance ilustrativo? (Español)",
    figmaNode: "Node 987:11278",
    route: "/quote-acceptance-review",
    locale: "es",
    description:
      "W03 Revisión de alcance demo de $356; 4 piezas confirmadas sin cobro ni reserva real",
  },
  {
    id: "c25a-en",
    name: "C25-A · Accept This Illustrated Scope? (English)",
    figmaNode: "Node 412:1335",
    route: "/quote-acceptance-review",
    locale: "en",
    description:
      "W03 Review illustrative $356 demo scope; 4 confirmed pieces without actual booking or charge",
  },
  {
    id: "c25e-es",
    name: "C25-E · Este precio todavía no puede emitirse (Español)",
    figmaNode: "Node 987:11343",
    route: "/unapproved-rate-rules",
    locale: "es",
    description: "W03 Configuración de precios no disponible; solicitud de revisión administrativa",
  },
  {
    id: "c25e-en",
    name: "C25-E · This Price Cannot Be Issued Yet (English)",
    figmaNode: "Node 412:1388",
    route: "/unapproved-rate-rules",
    locale: "en",
    description: "W03 Pricing configuration unavailable; service-rate review request to Admin",
  },
  {
    id: "c26a-es",
    name: "C26-A · Alcance de la cotización revisado (Español)",
    figmaNode: "Node 987:11445",
    route: "/scope-accepted",
    locale: "es",
    description:
      "W03 Aceptación del alcance registrada (prototipo); aviso de próximos pasos hacia W04",
  },
  {
    id: "c26a-en",
    name: "C26-A · Quote Scope Reviewed (English)",
    figmaNode: "Node 412:1470",
    route: "/scope-accepted",
    locale: "en",
    description:
      "W03 Scope acceptance recorded (prototype); next required steps guidance towards W04",
  },
  {
    id: "c26r-es",
    name: "C26-R · No se pudo registrar tu decisión (Español)",
    figmaNode: "Node 987:11501",
    route: "/scope-acceptance-recovery",
    locale: "es",
    description: "W03 Error al guardar sin crear reserva; reintento seguro con datos preservados",
  },
  {
    id: "c26r-en",
    name: "C26-R · Couldn't Record Your Decision (English)",
    figmaNode: "Node 412:1517",
    route: "/scope-acceptance-recovery",
    locale: "en",
    description:
      "W03 Save failed with no booking created; safe retry preserving confirmed items and draft",
  },
  {
    id: "c24f-es",
    name: "C24-F · Estimación no disponible (Español)",
    figmaNode: "Node 987:10837",
    route: "/quote-error-recovery",
    locale: "es",
    description: "W03 No se pudo completar el cálculo; reintentar o enviar a revisión de Admin",
  },
  {
    id: "c24f-en",
    name: "C24-F · Estimate Isn't Available (English)",
    figmaNode: "Node 412:965",
    route: "/quote-error-recovery",
    locale: "en",
    description: "W03 Calculation could not be completed; retry estimate or request Admin review",
  },
  {
    id: "c24rev-es",
    name: "C24-REV · Recalcular tras editar (Español)",
    figmaNode: "Node 987:11137",
    route: "/quote-revision",
    locale: "es",
    description:
      "W03 Recalcular con datos confirmados tras correcciones del cliente (colchón 2 unidades)",
  },
  {
    id: "c24rev-en",
    name: "C24-REV · Recalculate After an Edit (English)",
    figmaNode: "Node 412:1214",
    route: "/quote-revision",
    locale: "en",
    description:
      "W03 Recalculate from confirmed inputs following customer corrections (queen mattress 2)",
  },
  {
    id: "c25-es",
    name: "C25 · Revisar desglose del precio (Español)",
    figmaNode: "Node 987:11193",
    route: "/itemized-quote",
    locale: "es",
    description: "W03 Desglose detallado de 6 cargos de ejemplo y subtotal ilustrativo de $356",
  },
  {
    id: "c25-en",
    name: "C25 · Review Your Price Breakdown (English)",
    figmaNode: "Node 412:1260",
    route: "/itemized-quote",
    locale: "en",
    description:
      "W03 Six itemized example charges and illustrative $356 subtotal with price disclosure",
  },
  {
    id: "c25x-es",
    name: "C25-X · Debes actualizar tu estimación (Español)",
    figmaNode: "Node 987:11394",
    route: "/quote-expired",
    locale: "es",
    description:
      "W03 Es necesario actualizar la estimación; ejemplo caducado y revalidación requerida",
  },
  {
    id: "c25x-en",
    name: "C25-X · Your Estimate Needs a Refresh (English)",
    figmaNode: "Node 412:1429",
    route: "/quote-expired",
    locale: "en",
    description:
      "W03 Estimate refresh needed; demonstration snapshot expired, recheck inputs before continuing",
  },
  {
    id: "c24p-es",
    name: "C24-P · Cálculo de Estimación en Proceso (Español)",
    figmaNode: "Node 987:10772",
    route: "/quote-processing",
    locale: "es",
    description:
      "W03 El motor de precios aprobado evaluaría los datos y reglas de Arizona; 4 piezas",
  },
  {
    id: "c24p-en",
    name: "C24-P · Quote Calculation Processing (English)",
    figmaNode: "Node 412:910",
    route: "/quote-processing",
    locale: "en",
    description:
      "W03 Approved pricing engine evaluates confirmed inputs and Arizona rules; 4 pieces",
  },
  {
    id: "c24adms-es",
    name: "C24-ADM-S · Revisión de Admin Registrada (Español)",
    figmaNode: "Node 987:10945",
    route: "/admin-review-resolved",
    locale: "es",
    description: "W03 Ejemplo ilustrativo de resultado aprobado tras confirmar datos del cliente",
  },
  {
    id: "c24adms-en",
    name: "C24-ADM-S · Admin Review Resolved (English)",
    figmaNode: "Node 412:1054",
    route: "/admin-review-resolved",
    locale: "en",
    description:
      "W03 Illustrative review outcome: approved example following confirmed customer scope",
  },
  {
    id: "c24admd-es",
    name: "C24-ADM-D · Se Solicitaron Más Detalles (Español)",
    figmaNode: "Node 987:11000",
    route: "/admin-clarification-requested",
    locale: "es",
    description:
      "W03 La revisión requiere corrección; confirmar colchones, medidas, dificultad y acceso",
  },
  {
    id: "c24admd-en",
    name: "C24-ADM-D · Admin Clarification Requested (English)",
    figmaNode: "Node 412:1099",
    route: "/admin-clarification-requested",
    locale: "en",
    description:
      "W03 Admin review requires correction before pricing; update item details fallback",
  },
  {
    id: "c24q-es",
    name: "C24-Q · Cotización Inmediata Ilustrativa (Español)",
    figmaNode: "Node 987:11051",
    route: "/illustrative-quote",
    locale: "es",
    description:
      "W03 Ejemplo revisable de 4 piezas; subtotal estimado de servicio de $356 ilustrativo",
  },
  {
    id: "c24q-en",
    name: "C24-Q · Illustrative Quote Overview (English)",
    figmaNode: "Node 412:1140",
    route: "/illustrative-quote",
    locale: "en",
    description:
      "W03 Reviewable example based on corrected 4-piece inventory; illustrative $356 subtotal",
  },
  {
    id: "c23c-es",
    name: "C23-C · Corregir Detalles del Objeto (Español)",
    figmaNode: "Node 987:10439",
    route: "/correct-ai-items",
    locale: "es",
    description:
      "W03 Inventario confirmado prevalece sobre sugerencias IA no verificadas; corrección de colchón",
  },
  {
    id: "c23c-en",
    name: "C23-C · Correct AI Items (English)",
    figmaNode: "Node 412:625",
    route: "/correct-ai-items",
    locale: "en",
    description:
      "W03 Customer-confirmed inventory overrides unverified AI suggestions; mattress correction",
  },
  {
    id: "c23s-es",
    name: "C23-S · Objetos Confirmados por el Cliente (Español)",
    figmaNode: "Node 987:10506",
    route: "/customer-confirmed-items",
    locale: "es",
    description:
      "W03 Tres categorías y cuatro piezas individuales confirmadas para cotización ilustrativa",
  },
  {
    id: "c23s-en",
    name: "C23-S · Customer Confirmed Items (English)",
    figmaNode: "Node 412:683",
    route: "/customer-confirmed-items",
    locale: "en",
    description:
      "W03 Three categories; four individual pieces verified by customer carried into quote inputs",
  },
  {
    id: "c23r-es",
    name: "C23-R · Identificación de IA Rechazada (Español)",
    figmaNode: "Node 987:10714",
    route: "/rejected-ai-identification",
    locale: "es",
    description:
      "W03 Eliminar sugerencia errónea sin borrar datos confirmados del cliente; 2 unidades frente a 1",
  },
  {
    id: "c23r-en",
    name: "C23-R · Rejected AI Identification (English)",
    figmaNode: "Node 412:861",
    route: "/rejected-ai-identification",
    locale: "en",
    description:
      "W03 Remove incorrect AI suggestion without deleting customer booking data; 2 units vs 1",
  },
  {
    id: "c24adm-es",
    name: "C24-ADM · Revisión Pendiente de Tarifas de Servicio (Español)",
    figmaNode: "Node 987:10887",
    route: "/admin-review-pending",
    locale: "es",
    description:
      "W03 Tarifas o elegibilidad requieren decisión autorizada de Admin antes del precio final",
  },
  {
    id: "c24adm-en",
    name: "C24-ADM · Admin Review Pending (English)",
    figmaNode: "Node 412:1006",
    route: "/admin-review-pending",
    locale: "en",
    description:
      "W03 Service-specific rates or eligibility need authorized Admin decision before final price",
  },
  {
    id: "c22q-es",
    name: "C22-Q · Resultado de IA Incierto (Español)",
    figmaNode: "Node 987:10309",
    route: "/ai-uncertain-result",
    locale: "es",
    description:
      "W03 Superposición o baja visibilidad impiden clasificar con fiabilidad; revisión de lista",
  },
  {
    id: "c22q-en",
    name: "C22-Q · Uncertain AI Result (English)",
    figmaNode: "Node 412:515",
    route: "/ai-uncertain-result",
    locale: "en",
    description:
      "W03 Photo overlap or low visibility prevents reliable classification; list correction",
  },
  {
    id: "c23-es",
    name: "C23 · Verificar Inventario Sugerido (Español)",
    figmaNode: "Node 987:10367",
    route: "/verify-suggested-inventory",
    locale: "es",
    description:
      "W03 Comparar sugerencias de IA con borrador del cliente; corregir cantidad de colchones",
  },
  {
    id: "c23-en",
    name: "C23 · Verify Suggested Inventory (English)",
    figmaNode: "Node 412:563",
    route: "/verify-suggested-inventory",
    locale: "en",
    description:
      "W03 Compare AI suggestions with customer draft; correct mattress quantity mismatch",
  },
  {
    id: "c23m-es",
    name: "C23-M · Verificación Manual de Objetos (Español)",
    figmaNode: "Node 987:10581",
    route: "/manual-item-verification",
    locale: "es",
    description:
      "W03 Confirmar objetos con inventario manual sin IA; tarifas y elegibilidad de Arizona",
  },
  {
    id: "c23m-en",
    name: "C23-M · Manual Item Verification (English)",
    figmaNode: "Node 412:748",
    route: "/manual-item-verification",
    locale: "en",
    description:
      "W03 Confirm items with saved manual inventory without AI; tariff rules and admin review",
  },
  {
    id: "c23u-es",
    name: "C23-U · Aclaración de Medidas (Español)",
    figmaNode: "Node 987:10646",
    route: "/measurement-clarification",
    locale: "es",
    description:
      "W03 Medidas inciertas de fotos; carga sin cotización garantizada y revisión manual",
  },
  {
    id: "c23u-en",
    name: "C23-U · Measurement Clarification (English)",
    figmaNode: "Node 412:803",
    route: "/measurement-clarification",
    locale: "en",
    description:
      "W03 Photo measurement uncertainty; unverified dimensions require correction or admin review",
  },
  {
    id: "w03f-es",
    name: "W03-F-HANDOFF · Entrada a Revisión de Retiro de Muebles (Español)",
    figmaNode: "Node 980:11246",
    route: "/furniture-ai-handoff",
    locale: "es",
    description:
      "W02/W03 Revisión de retiro de muebles con cantidad, estado, desmontaje y tarifas pendientes",
  },
  {
    id: "w03f-en",
    name: "W03-F-HANDOFF · Furniture Pickup Review Entry (English)",
    figmaNode: "Node 394:239",
    route: "/furniture-ai-handoff",
    locale: "en",
    description:
      "W02/W03 Furniture pickup review preview with count, disassembly, carry distance, and crew rules",
  },
  {
    id: "w03r-es",
    name: "W03-R-HANDOFF · Entrada a Revisión de Recogida Comercial (Español)",
    figmaNode: "Node 980:10946",
    route: "/retail-ai-handoff",
    locale: "es",
    description:
      "W02/W03 Revisión de recogida comercial con pedido sin verificar, entrega y tarifas pendientes",
  },
  {
    id: "w03r-en",
    name: "W03-R-HANDOFF · Retail Pickup Review Entry (English)",
    figmaNode: "Node 392:507",
    route: "/retail-ai-handoff",
    locale: "en",
    description:
      "W02/W03 Retail pickup review preview with store order, collection window, and rates pending",
  },
  {
    id: "c22-es",
    name: "C22 · Entrada a Reconocimiento de Fotos con IA (Español)",
    figmaNode: "Node 987:9929",
    route: "/ai-recognition",
    locale: "es",
    description: "W03 Analizar 4 fotos de objetos con IA orientativa y pruebas cargadas",
  },
  {
    id: "c22-en",
    name: "C22 · AI Review Entry / Analyze Item Photos (English)",
    figmaNode: "Node 412:195",
    route: "/ai-recognition",
    locale: "en",
    description:
      "W03 Analyze 4 uploaded item photos with advisory guidance and intake ready ledger",
  },
  {
    id: "c22p-es",
    name: "C22-P · Demostración de Procesamiento IA (Español)",
    figmaNode: "Node 987:10006",
    route: "/ai-processing",
    locale: "es",
    description:
      "W03 Estado simulado de procesamiento IA con progreso en 4 pasos y pruebas en análisis",
  },
  {
    id: "c22p-en",
    name: "C22-P · AI Processing Demonstration (English)",
    figmaNode: "Node 412:262",
    route: "/ai-processing",
    locale: "en",
    description: "W03 Simulated AI processing state with 4 progress steps and evidence analyzed",
  },
  {
    id: "c22d-es",
    name: "C22-D · Objetos Sugeridos por IA / Mismatch (Español)",
    figmaNode: "Node 987:10084",
    route: "/ai-suggested-items",
    locale: "es",
    description:
      "W03 Objetos potenciales sugeridos por IA con discrepancia de cantidad e inventario preservado",
  },
  {
    id: "c22d-en",
    name: "C22-D · AI Suggested Items / Quantity Mismatch (English)",
    figmaNode: "Node 412:328",
    route: "/ai-suggested-items",
    locale: "en",
    description:
      "W03 Potential items found by AI with quantity mismatch notice and customer inventory preserved",
  },
  {
    id: "c22f-es",
    name: "C22-F · Fallo de Reconocimiento / Borrador Conservado (Español)",
    figmaNode: "Node 987:10154",
    route: "/ai-recognition-failed",
    locale: "es",
    description:
      "W03 Servicio no disponible con borrador conservado, adjuntos intactos y reintento demo",
  },
  {
    id: "c22f-en",
    name: "C22-F · Recognition Failed / Preserved Draft (English)",
    figmaNode: "Node 412:388",
    route: "/ai-recognition-failed",
    locale: "en",
    description:
      "W03 Recognition service unavailable with preserved draft, attachments intact and demo retry",
  },
  {
    id: "c22o-es",
    name: "C22-O · Recuperación Sin Conexión (Español)",
    figmaNode: "Node 987:10209",
    route: "/ai-offline-recovery",
    locale: "es",
    description:
      "W03 Estado sin conexión de red con inventario retenido y reintento de conexión seguro",
  },
  {
    id: "c22o-en",
    name: "C22-O · Offline Recovery (English)",
    figmaNode: "Node 412:433",
    route: "/ai-offline-recovery",
    locale: "en",
    description:
      "W03 Temporarily offline state with retained draft and safe connection retry preview",
  },
  {
    id: "c22e-es",
    name: "C22-E · Fotos Faltantes / Verificación Manual (Español)",
    figmaNode: "Node 987:10259",
    route: "/ai-missing-photos",
    locale: "es",
    description:
      "W03 Solicitud sin fotos cargadas con aviso de no invención de medidas y revisión manual",
  },
  {
    id: "c22e-en",
    name: "C22-E · Missing Photo Evidence / Manual Confirmation (English)",
    figmaNode: "Node 412:474",
    route: "/ai-missing-photos",
    locale: "en",
    description:
      "W03 No uploaded image evidence with non-fabrication disclosure and manual intake review",
  },
  {
    id: "w03m-es",
    name: "W03-M-HANDOFF · Entrada a Revisión de Mudanza con IA (Español)",
    figmaNode: "Node 980:10826",
    route: "/moving-ai-handoff",
    locale: "es",
    description:
      "W02/W03 Entrada a revisión con IA de mudanza con datos de carga y tarifas pendientes",
  },
  {
    id: "w03m-en",
    name: "W03-M-HANDOFF · Moving AI Review Entry (English)",
    figmaNode: "Node 392:405",
    route: "/moving-ai-handoff",
    locale: "en",
    description: "W02/W03 Moving AI review entry preview with payload and rates pending anchor",
  },
  {
    id: "w03a-es",
    name: "W03-A-HANDOFF · Entrada a Revisión de Electrodomésticos (Español)",
    figmaNode: "Node 980:11306",
    route: "/appliance-ai-handoff",
    locale: "es",
    description:
      "W02/W03 Revisión de electrodomésticos con verificación de modelo y desconexión pendiente",
  },
  {
    id: "w03a-en",
    name: "W03-A-HANDOFF · Appliance Removal AI Review Entry (English)",
    figmaNode: "Node 394:341",
    route: "/appliance-ai-handoff",
    locale: "en",
    description:
      "W02/W03 Appliance removal review preview with model, condition, and unresolved conditions",
  },
  {
    id: "w03t-es",
    name: "W03-T-HANDOFF · Entrada a Revisión de Retiro de Colchones (Español)",
    figmaNode: "Node 980:11366",
    route: "/mattress-ai-handoff",
    locale: "es",
    description:
      "W02/W03 Revisión de colchones con cantidad, elegibilidad de desecho y manejo seguro",
  },
  {
    id: "w03t-en",
    name: "W03-T-HANDOFF · Mattress Removal AI Review Entry (English)",
    figmaNode: "Node 394:443",
    route: "/mattress-ai-handoff",
    locale: "en",
    description:
      "W02/W03 Mattress removal review preview with count, condition uncertainty, and disposal scope",
  },
  {
    id: "w03g-es",
    name: "W03-G-HANDOFF · Entrada a Revisión de Limpieza de Garaje (Español)",
    figmaNode: "Node 980:11426",
    route: "/garage-ai-handoff",
    locale: "es",
    description:
      "W02/W03 Revisión de limpieza de garaje con volumen, materiales inciertos y normas de desecho",
  },
  {
    id: "w03g-en",
    name: "W03-G-HANDOFF · Garage Cleanout AI Review Entry (English)",
    figmaNode: "Node 394:545",
    route: "/garage-ai-handoff",
    locale: "en",
    description:
      "W02/W03 Garage cleanout review preview with volume, uncertain materials, and safety scope",
  },
  {
    id: "c21a-es",
    name: "C21-A · Revisión de Solicitud de Retiro de Electrodomésticos (Español)",
    figmaNode: "Node 980:11066",
    route: "/appliance-intake-review",
    locale: "es",
    description:
      "W02 Revisión de retiro de electrodomésticos y evaluación de seguridad antes de W03",
  },
  {
    id: "c21a-en",
    name: "C21-A · Appliance Removal Intake Review (English)",
    figmaNode: "Node 394:290",
    route: "/appliance-intake-review",
    locale: "en",
    description: "W02 Appliance removal intake review and service safety assessment before W03",
  },
  {
    id: "c21t-es",
    name: "C21-T · Revisión de Solicitud de Retiro de Colchones (Español)",
    figmaNode: "Node 980:11126",
    route: "/mattress-intake-review",
    locale: "es",
    description: "W02 Revisión de retiro de colchones y evaluación de manejo seguro antes de W03",
  },
  {
    id: "c21t-en",
    name: "C21-T · Mattress Removal Intake Review (English)",
    figmaNode: "Node 394:392",
    route: "/mattress-intake-review",
    locale: "en",
    description: "W02 Mattress removal intake review and safe handling assessment before W03",
  },
  {
    id: "c21g-es",
    name: "C21-G · Revisión de Solicitud de Limpieza de Garaje (Español)",
    figmaNode: "Node 980:11186",
    route: "/garage-intake-review",
    locale: "es",
    description: "W02 Revisión de limpieza de garaje y controles de seguridad antes de W03",
  },
  {
    id: "c21g-en",
    name: "C21-G · Garage Cleanout Intake Review (English)",
    figmaNode: "Node 394:494",
    route: "/garage-intake-review",
    locale: "en",
    description: "W02 Garage cleanout intake review and safety checks before W03",
  },
  {
    id: "w03handoff-es",
    name: "W03-HANDOFF · Solicitud y Revisión con IA (Español)",
    figmaNode: "Node 980:10514",
    route: "/ai-review-handoff",
    locale: "es",
    description: "W02/W03 Entrada a revisión con IA con datos de entrada y punto de enlace",
  },
  {
    id: "w03handoff-en",
    name: "W03-HANDOFF · AI Review Entry Connected (English)",
    figmaNode: "Node 382:2161",
    route: "/ai-review-handoff",
    locale: "en",
    description: "W02/W03 General AI-assisted review entry preview with payload and handoff anchor",
  },
  {
    id: "c20retail-es",
    name: "C20-RETAIL · Revisar Acceso de Recogida en Tienda (Español)",
    figmaNode: "Node 980:10668",
    route: "/retail-collection-readiness",
    locale: "es",
    description: "W02 Confirmación de pedido en comercio, requisitos de recogida y entrega",
  },
  {
    id: "c20retail-en",
    name: "C20-RETAIL · Review Store Collection Access (English)",
    figmaNode: "Node 392:265",
    route: "/retail-collection-readiness",
    locale: "en",
    description:
      "W02 Review store collection, pickup requirements, delivery access and exception policy",
  },
  {
    id: "c21retail-es",
    name: "C21-RETAIL · Revisión de Solicitud de Recogida Comercial (Español)",
    figmaNode: "Node 980:10886",
    route: "/retail-intake-review",
    locale: "es",
    description:
      "W02 Confirmación de datos de recogida comercial y controles de políticas antes de W03",
  },
  {
    id: "c21retail-en",
    name: "C21-RETAIL · Retail Pickup Intake Review (English)",
    figmaNode: "Node 392:456",
    route: "/retail-intake-review",
    locale: "en",
    description: "W02 Retail pickup intake confirmation and scope checks before W03",
  },
  {
    id: "c21m-es",
    name: "C21-M · Revisión de Solicitud de Mudanza (Español)",
    figmaNode: "Node 980:10766",
    route: "/moving-intake-review",
    locale: "es",
    description:
      "W02 Revisión de solicitud de mudanza residencial con controles de escaleras y capacidad",
  },
  {
    id: "c21m-en",
    name: "C21-M · Moving Intake Review (English)",
    figmaNode: "Node 392:354",
    route: "/moving-intake-review",
    locale: "en",
    description:
      "W02 Moving intake confirmation, route details, stairs, and policy checks before W03",
  },
  {
    id: "c21f-es",
    name: "C21-F · Revisión de Solicitud de Retiro de Muebles (Español)",
    figmaNode: "Node 980:11006",
    route: "/furniture-intake-review",
    locale: "es",
    description:
      "W02 Revisión de retiro de muebles voluminosos y evaluación de seguridad antes de W03",
  },
  {
    id: "c21f-en",
    name: "C21-F · Furniture Pickup Intake Review (English)",
    figmaNode: "Node 394:188",
    route: "/furniture-intake-review",
    locale: "en",
    description:
      "W02 Furniture pickup intake review, dimensions, and service safety assessment before W03",
  },
  {
    id: "c21-es",
    name: "C21 · Revisar Detalles del Servicio (Español)",
    figmaNode: "Node 980:10268",
    route: "/intake-review",
    locale: "es",
    description:
      "W02 Resumen completo de solicitud con 7 fotos originales antes de revisión con IA",
  },
  {
    id: "c21-en",
    name: "C21 · Full Intake Review (English)",
    figmaNode: "Node 382:1966",
    route: "/intake-review",
    locale: "en",
    description: "W02 Complete intake summary with 7 original photo placements before AI review",
  },
  {
    id: "c21v-es",
    name: "C21-V · Solicitud No Lista (Español)",
    figmaNode: "Node 980:10409",
    route: "/intake-review-blocked",
    locale: "es",
    description:
      "W02 Estado de validación bloqueada: peso o acceso desconocido que requiere acción",
  },
  {
    id: "c21v-en",
    name: "C21-V · Intake Not Ready Yet (English)",
    figmaNode: "Node 382:2088",
    route: "/intake-review-blocked",
    locale: "en",
    description:
      "W02 Validation blocked state: unknown load weight or uncertain access requiring action",
  },
  {
    id: "c21s-es",
    name: "C21-S · Borrador Guardado (Español)",
    figmaNode: "Node 980:10461",
    route: "/intake-draft-saved",
    locale: "es",
    description: "W02 Borrador local de solicitud guardado para el cliente con fotos conservadas",
  },
  {
    id: "c21s-en",
    name: "C21-S · Intake Draft Saved (English)",
    figmaNode: "Node 382:2124",
    route: "/intake-draft-saved",
    locale: "en",
    description: "W02 Local intake draft saved for customer with preserved demonstration photos",
  },
  {
    id: "c20m-es",
    name: "C20-M · Confirmar Acceso de Mudanza (Español)",
    figmaNode: "Node 980:10574",
    route: "/moving-access",
    locale: "es",
    description: "W02 Origen, destino, escaleras y condiciones de mudanza residencial",
  },
  {
    id: "c20m-en",
    name: "C20-M · Confirm Moving Access (English)",
    figmaNode: "Node 392:180",
    route: "/moving-access",
    locale: "en",
    description: "W02 Moving route validation, origin/destination stairs and access review",
  },
  {
    id: "c20e-es",
    name: "C20-E · Solicitud de Manejo Adicional (Español)",
    figmaNode: "Node 980:9977",
    route: "/extra-access-help",
    locale: "es",
    description: "W02 Solicitud opcional de desmontaje y revisión de alcance sin aprobación previa",
  },
  {
    id: "c20e-en",
    name: "C20-E · Request Additional Handling (English)",
    figmaNode: "Node 382:1767",
    route: "/extra-access-help",
    locale: "en",
    description: "W02 Optional table disassembly and handling request requiring quote approval",
  },
  {
    id: "c20v-es",
    name: "C20-V · Confirmación de Acceso al Lugar (Español)",
    figmaNode: "Node 980:10048",
    route: "/access-validation",
    locale: "es",
    description:
      "W02 Estado de acceso incompleto: escaleras, estacionamiento y puertas sin confirmar",
  },
  {
    id: "c20v-en",
    name: "C20-V · Please Confirm Site Access (English)",
    figmaNode: "Node 382:1822",
    route: "/access-validation",
    locale: "en",
    description: "W02 Incomplete access state: missing stairs, parking and heavy-item clearance",
  },
  {
    id: "c20r-es",
    name: "C20-R · Confirmar Seguridad de Objetos (Español)",
    figmaNode: "Node 980:10115",
    route: "/service-restrictions",
    locale: "es",
    description:
      "W02 Preguntas de seguridad y confirmación obligatoria del cliente para cotización",
  },
  {
    id: "c20r-en",
    name: "C20-R · Confirm Item Safety (English)",
    figmaNode: "Node 382:1873",
    route: "/service-restrictions",
    locale: "en",
    description: "W02 Item safety questions and required customer acknowledgements before review",
  },
  {
    id: "c20x-es",
    name: "C20-X · Revisión de Objeto Señalado (Español)",
    figmaNode: "Node 980:10197",
    route: "/restricted-material",
    locale: "es",
    description: "W02 Detener y aclarar recipientes sin etiqueta en garaje antes de continuar",
  },
  {
    id: "c20x-en",
    name: "C20-X · Restricted Material Review (English)",
    figmaNode: "Node 382:1911",
    route: "/restricted-material",
    locale: "en",
    description: "W02 Hold and clarify unlabeled containers in garage cleanout demo fixture",
  },
  {
    id: "c19pr-es",
    name: "C19-P-R · Reemplazo de Foto (Español)",
    figmaNode: "Node 980:9692",
    route: "/replace-item-photo",
    locale: "es",
    description: "W02 Reemplazar foto seleccionada de sofá conservando datos del objeto",
  },
  {
    id: "c19pr-en",
    name: "C19-P-R · Replace Item Photo (English)",
    figmaNode: "Node 382:1546",
    route: "/replace-item-photo",
    locale: "en",
    description: "W02 Replace selected sofa photo while preserving item data until upload",
  },
  {
    id: "c19pf-es",
    name: "C19-P-F · Fallo de Carga de Foto (Español)",
    figmaNode: "Node 980:9752",
    route: "/photo-upload-failed",
    locale: "es",
    description: "W02 Error de red al 87% y lista de 3 fotos guardadas con reintento",
  },
  {
    id: "c19pf-en",
    name: "C19-P-F · Photo Upload Failed (English)",
    figmaNode: "Node 382:1590",
    route: "/photo-upload-failed",
    locale: "en",
    description: "W02 Network upload failure at 87% and list of 3 saved photos with retry",
  },
  {
    id: "c19pe-es",
    name: "C19-P-E · Estado Sin Fotos (Español)",
    figmaNode: "Node 980:9822",
    route: "/item-photos-empty",
    locale: "es",
    description: "W02 Estado alternativo sin fotos con aviso de IA y enlace a inventario",
  },
  {
    id: "c19pe-en",
    name: "C19-P-E · Empty Media State (English)",
    figmaNode: "Node 382:1644",
    route: "/item-photos-empty",
    locale: "en",
    description: "W02 Zero photos attached state with AI evidence notice and inventory link",
  },
  {
    id: "c20-es",
    name: "C20 · Detalles de Acceso y Mano de Obra (Español)",
    figmaNode: "Node 980:9874",
    route: "/access-details",
    locale: "es",
    description: "W02 Acceso a la propiedad, opciones de ayuda y evaluación de elegibilidad",
  },
  {
    id: "c20-en",
    name: "C20 · Access & Labor Details (English)",
    figmaNode: "Node 382:1680",
    route: "/access-details",
    locale: "en",
    description: "W02 Property access rows, additional help options, and crew eligibility notice",
  },
  {
    id: "c19e-es",
    name: "C19-E · Corrección de Medidas (Español)",
    figmaNode: "Node 980:9388",
    route: "/edit-inventory-item",
    locale: "es",
    description: "W02 Edición manual de sofá de 3 plazas con guardado a borrador",
  },
  {
    id: "c19e-en",
    name: "C19-E · Manual Item Correction (English)",
    figmaNode: "Node 382:1306",
    route: "/edit-inventory-item",
    locale: "en",
    description: "W02 Manual item correction for 3-seat sofa with save to draft inventory",
  },
  {
    id: "c19a-es",
    name: "C19-A · Añadir Objeto Manualmente (Español)",
    figmaNode: "Node 980:9463",
    route: "/add-inventory-item",
    locale: "es",
    description: "W02 Añadir nuevo objeto manual (estantería) con variante de prueba",
  },
  {
    id: "c19a-en",
    name: "C19-A · Add Item Manually (English)",
    figmaNode: "Node 382:1365",
    route: "/add-inventory-item",
    locale: "en",
    description: "W02 Add manual item (wooden bookshelf) with separate test variation",
  },
  {
    id: "c19v-es",
    name: "C19-V · Validación de Medidas (Español)",
    figmaNode: "Node 980:9538",
    route: "/inventory-validation",
    locale: "es",
    description: "W02 Validación de medidas incompletas con aviso de acción necesaria",
  },
  {
    id: "c19v-en",
    name: "C19-V · Missing Dimensions Validation (English)",
    figmaNode: "Node 382:1424",
    route: "/inventory-validation",
    locale: "en",
    description: "W02 Incomplete measurements validation with action required warning",
  },
  {
    id: "c19p-es",
    name: "C19-P · Fotos de Objetos (Español)",
    figmaNode: "Node 980:9613",
    route: "/item-photos",
    locale: "es",
    description: "W02 Cuatro fotos de ejemplo adjuntas con opciones de reemplazo y fallo",
  },
  {
    id: "c19p-en",
    name: "C19-P · Item Photo Uploads (English)",
    figmaNode: "Node 382:1483",
    route: "/item-photos",
    locale: "en",
    description: "W02 Four genuine demo photo uploads with replacement and error notices",
  },
  {
    id: "c18re-es",
    name: "C18-R-E · Pedido Minorista Faltante (Español)",
    figmaNode: "Node 980:9247",
    route: "/retail-order-missing",
    locale: "es",
    description: "W02 Estado de error por falta de información de pedido en recogida comercial",
  },
  {
    id: "c18re-en",
    name: "C18-R-E · Retail Missing Order (English)",
    figmaNode: "Node 382:1197",
    route: "/retail-order-missing",
    locale: "en",
    description: "W02 Retail missing order error state with action required badge and guidance",
  },
  {
    id: "c19-es",
    name: "C19 · Lista de Objetos (Español)",
    figmaNode: "Node 980:9314",
    route: "/item-inventory",
    locale: "es",
    description: "W02 Revisión de inventario de 3 objetos con fotos y resumen antes de W03",
  },
  {
    id: "c19-en",
    name: "C19 · Item Inventory Review (English)",
    figmaNode: "Node 382:1248",
    route: "/item-inventory",
    locale: "en",
    description: "W02 Item inventory review with 3 declared items, genuine photos & summary",
  },
  {
    id: "c18a-es",
    name: "C18-A · Retiro de Electrodomésticos (Español)",
    figmaNode: "Node 977:9572",
    route: "/appliance-intake",
    locale: "es",
    description: "W02 Retiro de electrodomésticos en español con dimensiones, desconexión y CTAs",
  },
  {
    id: "c18a-en",
    name: "C18-A · Appliance Removal Intake (English)",
    figmaNode: "Node 387:177",
    route: "/appliance-intake",
    locale: "en",
    description: "W02 Appliance removal intake with washing machine specs, disconnect check & CTAs",
  },
  {
    id: "c18t-es",
    name: "C18-T · Retiro de Colchones (Español)",
    figmaNode: "Node 977:9685",
    route: "/mattress-intake",
    locale: "es",
    description: "W02 Retiro de colchones en español con dimensiones, cantidad, idoneidad y CTAs",
  },
  {
    id: "c18t-en",
    name: "C18-T · Mattress Removal Intake (English)",
    figmaNode: "Node 387:274",
    route: "/mattress-intake",
    locale: "en",
    description: "W02 Mattress removal intake with queen mattress specs, disposal check & CTAs",
  },
  {
    id: "c18j-es",
    name: "C18-J · Retiro de Chatarra (Español)",
    figmaNode: "Node 977:9100",
    route: "/junk-intake",
    locale: "es",
    description: "W02 Solicitud de retiro de chatarra en español con fotos de objetos y CTAs",
  },
  {
    id: "c18j-en",
    name: "C18-J · Junk Removal Intake (English)",
    figmaNode: "Node 382:805",
    route: "/junk-intake",
    locale: "en",
    description: "W02 Junk removal intake with genuine item photos, staging area & CTAs",
  },
  {
    id: "c18f-es",
    name: "C18-F · Muebles y Objetos Pesados (Español)",
    figmaNode: "Node 977:9286",
    route: "/bulky-item-intake",
    locale: "es",
    description: "W02 Retiro de muebles en español con selector de 4 niveles y especificaciones",
  },
  {
    id: "c18f-en",
    name: "C18-F · Furniture & Bulky Items (English)",
    figmaNode: "Node 382:959",
    route: "/bulky-item-intake",
    locale: "en",
    description: "W02 Furniture handling with 4 tier rows, inventory specs & CTAs",
  },
  {
    id: "c18g-es",
    name: "C18-G · Limpieza de Garaje (Español)",
    figmaNode: "Node 977:9399",
    route: "/garage-intake",
    locale: "es",
    description:
      "W02 Limpieza de garaje en español con alcance, acceso y exclusión de residuos peligrosos",
  },
  {
    id: "c18g-en",
    name: "C18-G · Garage Cleanout Intake (English)",
    figmaNode: "Node 382:1056",
    route: "/garage-intake",
    locale: "en",
    description: "W02 Garage intake with scope, access, hazardous material screening & CTAs",
  },
  {
    id: "c18r-es",
    name: "C18-R · Recogida en Tienda (Español)",
    figmaNode: "Node 977:9474",
    route: "/retail-intake",
    locale: "es",
    description:
      "W02 Recogida en tienda comercial en español con datos de pedido, entrega y aviso de API",
  },
  {
    id: "c18r-en",
    name: "C18-R · Retail Store Pickup (English)",
    figmaNode: "Node 382:1115",
    route: "/retail-intake",
    locale: "en",
    description: "W02 Store pickup with order authorization, delivery specs & API notice",
  },
  {
    id: "c18m-es",
    name: "C18-M · Solicitud de Mudanza (Español)",
    figmaNode: "Node 977:9192",
    route: "/moving-intake",
    locale: "es",
    description:
      "W02 Solicitud de mudanza en español con ruta, inventario, evaluación de carga/personal y CTAs",
  },
  {
    id: "c18m-en",
    name: "C18-M · Moving Service Intake (English)",
    figmaNode: "Node 382:881",
    route: "/moving-intake",
    locale: "en",
    description: "W02 Moving details with route, inventory, access, load/crew review & CTAs",
  },
  {
    id: "c01-en",
    name: "C01 · Home & Services (English)",
    figmaNode: "Node 439:3498",
    route: "/(app)",
    locale: "en",
    description: "HAULIX Home with hero truck, search, services grid & recent jobs",
  },
  {
    id: "c01-es",
    name: "C01 · Inicio y Servicios (Español)",
    figmaNode: "Node 439:3498 / 974:8843",
    route: "/(app)",
    locale: "es",
    description:
      "HAULIX Inicio en español: camión hero, búsqueda, 8 servicios y trabajos recientes",
  },
  {
    id: "c15-en",
    name: "C15 · Service Discovery (English)",
    figmaNode: "Node 382:126",
    route: "/service-discovery",
    locale: "en",
    description: "W02 Service discovery & intake with 7 categories and Arizona service area",
  },
  {
    id: "c15-es",
    name: "C15 · Seleccionar Servicio (Español)",
    figmaNode: "Node 974:8843",
    route: "/service-discovery",
    locale: "es",
    description: "C15 selección de servicio y zona de Phoenix en español con perfil Bryan Lopez",
  },
  {
    id: "c15s-en",
    name: "C15-S · Service Selected (English)",
    figmaNode: "Node 382:241",
    route: "/service-selected",
    locale: "en",
    description: "W02 Selected service card, booking steps, C16 notice & change service",
  },
  {
    id: "c15s-es",
    name: "C15-S · Servicio Elegido (Español)",
    figmaNode: "Node 974:8965",
    route: "/service-selected",
    locale: "es",
    description: "C15-S servicio elegido en español con perfil Bryan Lopez, pasos y aviso C16",
  },
  {
    id: "c16-en",
    name: "C16 · Service Area Eligibility (English)",
    figmaNode: "Node 382:323",
    route: "/service-area",
    locale: "en",
    description:
      "W02 Service area eligibility with pickup region, demo eligibility & 4 action CTAs",
  },
  {
    id: "c16-es",
    name: "C16 · Zona de Servicio (Español)",
    figmaNode: "Node 974:9079",
    route: "/service-area",
    locale: "es",
    description:
      "W02 Consulta tu zona de servicio con tarjeta de dirección, elegibilidad demo y 4 acciones",
  },
  {
    id: "c17-en",
    name: "C17 · Choose Pickup Address (English)",
    figmaNode: "Node 382:576",
    route: "/pickup-address",
    locale: "en",
    description: "W02 Choose pickup address with saved addresses, instructions, rule card & CTAs",
  },
  {
    id: "c17-es",
    name: "C17 · Dirección de Recogida (Español)",
    figmaNode: "Node 974:9412",
    route: "/pickup-address",
    locale: "es",
    description:
      "W02 Dirección de recogida en español con perfil Bryan Lopez, direcciones guardadas y 3 acciones",
  },
  {
    id: "c17-es-invalid",
    name: "C17 · Servicio No Válido (Español)",
    figmaNode: "Node 974:9412",
    route: "/pickup-address",
    params: { service: "commercial-freight" },
    locale: "es",
    description: "C17 con servicio no válido demostrando la reversión segura y el aviso honesto",
  },
  {
    id: "c17a-en",
    name: "C17-A · Add Pickup Location (English)",
    figmaNode: "Node 382:645",
    route: "/add-pickup-address",
    locale: "en",
    description: "W02 Add a pickup location with 6 editable form fields, validation & disclosures",
  },
  {
    id: "c17a-es",
    name: "C17-A · Añadir Punto de Recogida (Español)",
    figmaNode: "Node 974:9497",
    route: "/add-pickup-address",
    locale: "es",
    description:
      "W02 Añadir punto de recogida en español con 6 campos editables, perfil Bryan Lopez y validaciones",
  },
  {
    id: "c17v-en",
    name: "C17-V · Address Validation Error (English)",
    figmaNode: "Node 382:708",
    route: "/pickup-address-validation",
    locale: "en",
    description:
      "W02 Address validation incomplete state with action required alert, guidance & recovery CTAs",
  },
  {
    id: "c17v-es",
    name: "C17-V · Validación de Dirección (Español)",
    figmaNode: "Node 974:9576",
    route: "/pickup-address-validation",
    locale: "es",
    description:
      "W02 Validación de dirección en español con alerta, aviso de acción necesaria y recuperación",
  },
  {
    id: "c17d-en",
    name: "C17-D · Moving Destination (English)",
    figmaNode: "Node 382:744",
    route: "/moving-destination",
    locale: "en",
    description:
      "W02 Moving drop-off destination with pickup/dropoff cards, safe handling checks & CTAs",
  },
  {
    id: "c17d-es",
    name: "C17-D · Destino de Mudanza (Español)",
    figmaNode: "Node 974:9628",
    route: "/moving-destination",
    locale: "es",
    description:
      "W02 Destino de entrega de mudanza con tarjetas de recogida/entrega, revisión segura y CTAs",
  },
  {
    id: "c06-en",
    name: "C06 · Email Sign-in (English)",
    figmaNode: "Node 331:2",
    route: "/sign-in",
    locale: "en",
    description: "English default sign-in with email & password",
  },
  {
    id: "c06-es",
    name: "C06 · Iniciar Sesión (Español)",
    figmaNode: "Node 347:86",
    route: "/sign-in",
    locale: "es",
    description: "Localización oficial en español con textos Figma",
  },
  {
    id: "c07-en",
    name: "C07 · Create Account (English)",
    figmaNode: "Node 331:35",
    route: "/create-account",
    locale: "en",
    description: "Account creation with terms consent checkbox",
  },
  {
    id: "c07-es",
    name: "C07 · Crear Cuenta (Español)",
    figmaNode: "Node 347:130",
    route: "/create-account",
    locale: "es",
    description: "Creación de cuenta con consentimiento legal",
  },
  {
    id: "c08-en",
    name: "C08 · Phone Verification (English)",
    figmaNode: "Node 331:75",
    route: "/verify-phone",
    locale: "en",
    description: "6-digit OTP verification with Phoenix chip",
  },
  {
    id: "c08-es",
    name: "C08 · Verificación OTP (Español)",
    figmaNode: "Node 347:179",
    route: "/verify-phone",
    locale: "es",
    description: "Verificación de 6 dígitos con teclado numérico",
  },
  {
    id: "c09-en",
    name: "C09 · Social Return (English)",
    figmaNode: "Node 331:118",
    route: "/social-return",
    locale: "en",
    description: "Sarah Mitchell profile preview card",
  },
  {
    id: "c09-es",
    name: "C09 · Retorno Social (Español)",
    figmaNode: "Node 347:283",
    route: "/social-return",
    locale: "es",
    description: "Ficha de cliente de demostración Bryan Lopez",
  },
  {
    id: "c10-en",
    name: "C10 · Account Overview (English)",
    figmaNode: "Node 333:26",
    route: "/account",
    locale: "en",
    description: "Sarah Mitchell account, bottom nav & photo manager",
  },
  {
    id: "c10-es",
    name: "C10 · Mi Cuenta (Español)",
    figmaNode: "Node 347:315",
    route: "/account",
    locale: "es",
    description: "Perfil de Bryan Lopez, barra de navegación y foto",
  },
  {
    id: "c10e-en",
    name: "C10-E · Edit Profile (English)",
    figmaNode: "Node 333:116",
    route: "/edit-profile",
    locale: "en",
    description: "Sarah Mitchell edit profile, input validation & local save",
  },
  {
    id: "c10e-es",
    name: "C10-E · Editar Perfil (Español)",
    figmaNode: "Node 333:116 / 347:315",
    route: "/edit-profile",
    locale: "es",
    description: "Edición de perfil Bryan Lopez, validación y guardado local",
  },
  {
    id: "c10s-en",
    name: "C10-S · Profile Updated (English)",
    figmaNode: "Node 333:171",
    route: "/profile-updated",
    locale: "en",
    description: "Profile updated success card, dynamic details & account navigation",
  },
  {
    id: "c10s-es",
    name: "C10-S · Cambios guardados (Español)",
    figmaNode: "Node 333:171 / 930:10246",
    route: "/profile-updated",
    locale: "es",
    description: "Ficha de cambios guardados en español, datos dinámicos de Bryan Lopez",
  },
];

/**
 * DemoScreenNavigator
 *
 * Dedicated client demo navigation helper.
 * Provides a discrete floating pill button allowing instant 1-tap switching
 * to any implemented screen in English or Spanish for QA reviewers.
 */
export const DemoScreenNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const insets = useSafeAreaInsets();

  // Preview builds explicitly enable QA navigation even when NODE_ENV === "production"
  const isPreviewBuild = process.env.EXPO_PUBLIC_APP_ENV === "preview";

  // Strict isolation of QA-only navigator: strictly disabled in public production builds
  const isProductionBuild =
    !isPreviewBuild &&
    (process.env.NODE_ENV === "production" ||
      process.env.EXPO_PUBLIC_APP_ENV === "production" ||
      process.env.APP_ENV === "production") &&
    process.env.EXPO_PUBLIC_ENABLE_QA_NAVIGATOR !== "true";

  const isEnabled =
    isPreviewBuild ||
    (!isProductionBuild && (__DEV__ || process.env.EXPO_PUBLIC_ENABLE_QA_NAVIGATOR === "true"));

  if (!isEnabled) {
    return null;
  }

  const handleSelectScreen = async (screen: ScreenItem) => {
    if (getCurrentLocale() !== screen.locale) {
      await changeLocale(screen.locale);
    }
    setIsOpen(false);
    if (screen.params) {
      router.replace({
        pathname: screen.route as Href,
        params: screen.params,
      } as unknown as Href);
    } else {
      router.replace(screen.route as Href);
    }
  };

  return (
    <>
      {/* Floating Pill Trigger or Clean Mode Restore Target */}
      {isCleanMode ? (
        <View
          style={[styles.floatingTriggerContainer, { top: Math.max(insets.top, 10) + 4 }]}
          pointerEvents="box-none"
        >
          <Pressable
            style={styles.cleanModeRestoreArea}
            onPress={() => setIsCleanMode(false)}
            accessibilityRole="button"
            accessibilityLabel="Restore QA Navigator pill"
            hitSlop={12}
            testID="restore-qa-navigator"
          />
        </View>
      ) : (
        <View
          style={[styles.floatingTriggerContainer, { top: Math.max(insets.top, 10) + 4 }]}
          pointerEvents="box-none"
        >
          <Pressable
            style={({ pressed }) => [styles.floatingPill, pressed && styles.floatingPillPressed]}
            onPress={() => setIsOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Open demo screen navigator"
            hitSlop={8}
            testID="demo-screen-navigator-trigger"
          >
            <View style={styles.pillDot} />
            <Text style={styles.pillText}>QA Screens</Text>
          </Pressable>
        </View>
      )}

      {/* Screen Selector Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.backdropPressable}
            onPress={() => setIsOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close screen navigator"
          />

          <View
            style={[styles.sheetContainer, { paddingBottom: Math.max(insets.bottom, 16) + 12 }]}
          >
            {/* Grab handle */}
            <View style={styles.grabHandleContainer}>
              <View style={styles.grabHandle} />
            </View>

            {/* Title */}
            <View style={styles.header}>
              <View style={styles.badgeRow}>
                <View style={styles.statusDot} />
                <Text style={styles.badgeText}>CLIENT DEMO · FRONTEND ONLY</Text>
              </View>
              <Text style={styles.title}>Screen Navigator</Text>
              <Text style={styles.subtitle}>
                Tap any implemented screen to inspect its UI, layout, and language state.
              </Text>
            </View>

            {/* List */}
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {IMPLEMENTED_SCREENS.map((screen) => {
                const isActive =
                  currentPath === screen.route && getCurrentLocale() === screen.locale;

                return (
                  <Pressable
                    key={screen.id}
                    style={({ pressed }) => [
                      styles.screenItem,
                      isActive && styles.screenItemActive,
                      pressed && styles.screenItemPressed,
                    ]}
                    onPress={() => handleSelectScreen(screen)}
                    accessibilityRole="button"
                    accessibilityLabel={screen.name}
                    testID={`demo-nav-${screen.id}`}
                  >
                    <View style={styles.screenItemTop}>
                      <Text style={[styles.screenName, isActive && styles.screenNameActive]}>
                        {screen.name}
                      </Text>
                      <View style={styles.nodeBadge}>
                        <Text style={styles.nodeBadgeText}>{screen.figmaNode}</Text>
                      </View>
                    </View>
                    <Text style={styles.screenDescription}>{screen.description}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Clean Screenshot Mode Toggle */}
            <Pressable
              style={styles.cleanModeToggle}
              onPress={() => {
                setIsCleanMode(true);
                setIsOpen(false);
              }}
              accessibilityRole="button"
              accessibilityLabel="Hide QA pill for clean visual mode"
              testID="demo-clean-mode-toggle"
            >
              <Text style={styles.cleanModeToggleText}>Hide QA Pill for Clean Screenshots</Text>
            </Pressable>

            {/* Close Button */}
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsOpen(false)}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.closeButtonText}>Close Navigator</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingTriggerContainer: {
    position: "absolute",
    right: 14,
    zIndex: 9999,
  },
  floatingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101614",
    borderWidth: 1,
    borderColor: colors.brand, // #BAFF42
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  floatingPillPressed: {
    opacity: 0.8,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  pillText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.brand,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    justifyContent: "flex-end",
  },
  backdropPressable: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: colors.surface, // #151A19
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: "#35403B",
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: "82%",
  },
  grabHandleContainer: {
    alignItems: "center",
    paddingVertical: 4,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#35403B",
  },
  header: {
    marginTop: 8,
    marginBottom: spacing[3],
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  badgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primaryText,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  scroll: {
    marginVertical: spacing[2],
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 10,
  },
  screenItem: {
    backgroundColor: colors.elevated, // #222827
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: radius.xl,
    padding: 14,
  },
  screenItemActive: {
    borderColor: colors.brand,
    backgroundColor: "#1A2520",
  },
  screenItemPressed: {
    opacity: 0.8,
  },
  screenItemTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  screenName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.primaryText,
    flex: 1,
  },
  screenNameActive: {
    color: colors.brand,
  },
  nodeBadge: {
    backgroundColor: "#101614",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#28342E",
  },
  nodeBadgeText: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: "#8FA397",
  },
  screenDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  cleanModeRestoreArea: {
    width: 32,
    height: 32,
    backgroundColor: "transparent",
  },
  cleanModeToggle: {
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.35)",
    borderRadius: radius.xl,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing[2],
  },
  cleanModeToggleText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  closeButton: {
    backgroundColor: "#222827",
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: radius.xl,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing[2],
  },
  closeButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.secondaryText,
  },
});
