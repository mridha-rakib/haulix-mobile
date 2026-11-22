/**
 * C18-G Garage Cleanout Intake — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:1056 (EN) & Node 977:9399 (ES)
 * Flow Context: W02 Service Discovery & Intake / C18-G
 */

export interface C18GIntakeData {
  serviceName: string;
  serviceNameEs: string;
  serviceSubtitle: string;
  serviceSubtitleEs: string;
  spaceScope: string;
  spaceScopeEs: string;
  collectionAccess: string;
  collectionAccessEs: string;
  identifiedItems: string;
  identifiedItemsEs: string;
  unidentifiedItems: string;
  unidentifiedItemsEs: string;
  hazardTitle: string;
  hazardTitleEs: string;
  hazardNotice: string;
  hazardNoticeEs: string;
}

export const C18G_DEFAULT_DATA: C18GIntakeData = {
  serviceName: "Garage Cleanout Intake",
  serviceNameEs: "Solicitud de limpieza de garaje",
  serviceSubtitle: "Screen access, scope and hazardous material exclusions.",
  serviceSubtitleEs: "Evalúe el acceso, alcance y exclusión de residuos peligrosos.",
  spaceScope: "Single residential garage · one bay",
  spaceScopeEs: "Garaje residencial individual · un espacio",
  collectionAccess: "Driveway available",
  collectionAccessEs: "Entrada para autos disponible",
  identifiedItems: "Cardboard boxes, wooden shelving, small furniture",
  identifiedItemsEs: "Cajas de cartón, estanterías de madera, muebles pequeños",
  unidentifiedItems: "Requires customer photos and clarification",
  unidentifiedItemsEs: "Requiere fotos del cliente y aclaración",
  hazardTitle: "Hazardous Materials Screening",
  hazardTitleEs: "Detección de materiales peligrosos",
  hazardNotice: "No chemicals, paints, solvents, gas tanks, or asbestos permitted.",
  hazardNoticeEs:
    "No se permiten productos químicos, pinturas, disolventes, botellas de gas ni amianto.",
};

export const C18G_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "/ C18-G",
  stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
  stepSubEs: "/ C18-G",
  defaultBookingId: "HX-DEMO-1027",
  defaultAddress: "2140 E Sample Road, Phoenix, AZ 85016",
  footerNotice1: "DEMO ONLY · No confirmed booking, rates or payment",
  footerNotice1Es: "SOLO DEMO · Sin reserva confirmada, tarifas ni pago",
  footerNotice2: "SRS BK-01, BK-02, SV-14 · 430 px / vertical scroll",
  footerNotice2Es: "SRS BK-01, BK-02, SV-14 · 430 px / desplazamiento vertical",
} as const;
