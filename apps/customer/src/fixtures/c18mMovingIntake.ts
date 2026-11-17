/**
 * C18-M Moving Service Intake — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:881 (430 × 1643 px)
 * Flow Context: W02 Service Discovery & Intake / C18-M [BK-02, BK-03, SV-14]
 */

export interface C18MRouteData {
  customer: string;
  pickup: string;
  dropoff: string;
  requestedScope: string;
}

export interface C18MInventoryData {
  largeItems: string;
  estimatedWeight: string;
  originStairs: string;
  destinationStairs: string;
  packingRequest: string;
}

export const C18M_DEFAULT_ROUTE: C18MRouteData = {
  customer: "Daniel Ruiz · fictional",
  pickup: "2140 E Sample Road, Phoenix, AZ 85016",
  dropoff: "5678 N Demo Avenue, Phoenix, AZ 85012",
  requestedScope: "Household moving · 1-bedroom apartment",
};

export const C18M_DEFAULT_ROUTE_ES: C18MRouteData = {
  customer: "Daniel Ruiz · ficticio",
  pickup: "2140 E Sample Road, Phoenix, AZ 85016",
  dropoff: "5678 N Demo Avenue, Phoenix, AZ 85012",
  requestedScope: "Mudanza residencial · Apartamento de 1 dormitorio",
};

export const C18M_DEFAULT_INVENTORY: C18MInventoryData = {
  largeItems: "2-seat couch ×1; dresser ×1; 12 moving boxes",
  estimatedWeight: "Customer estimate ~550 lb total",
  originStairs: "Ground floor",
  destinationStairs: "1 flight, no elevator",
  packingRequest: "No additional packing service selected",
};

export const C18M_DEFAULT_INVENTORY_ES: C18MInventoryData = {
  largeItems: "Sofá de 2 plazas ×1; cómoda ×1; 12 cajas",
  estimatedWeight: "Estimación del cliente: ~550 lb en total",
  originStairs: "Planta baja",
  destinationStairs: "Un tramo, sin ascensor",
  packingRequest: "No se seleccionó embalaje adicional",
};

export const C18M_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "  /  C18-M",
  title: "Moving details",
  subtitle: "Separate fictional scenario HX-DEMO-MOVE-1034 · No production quote.",
  defaultBookingId: "HX-DEMO-MOVE-1034",
  fictionalCustomer: "DANIEL RUIZ · HX-DEMO-MOVE-1034",
  // Section A
  sectionARouteTitle: "Moving route",
  labelCustomer: "Customer",
  labelPickup: "Pickup",
  labelDropoff: "Drop-off",
  labelRequestedScope: "Requested scope",
  // Section B
  sectionBInventoryTitle: "Inventory & access",
  labelLargeItems: "Large items",
  labelEstimatedWeight: "Estimated weight",
  labelOriginStairs: "Origin stairs",
  labelDestinationStairs: "Destination stairs",
  labelPackingRequest: "Packing request",
  // Section C
  sectionCAssessmentTitle: "Load and crew assessment needed",
  badgeReviewRequired: "Review required",
  assessmentDescription:
    "Worker count/vehicle suitability is determined from approved capacity rules.",
  runtimeClarification: "This moving intake is a demo and does not modify other bookings.",
  figmaStaticClarification: "This is separate from Sarah Mitchell's junk removal booking.",
  // CTAs
  continueCta: "Continue moving details",
  returnServiceListCta: "Return to service list   ›",
  // Footers
  footerNoticeDemo: "DEMO ONLY  ·  No confirmed booking, rates or payment",
  footerNoticeSrs: "SRS  BK-02, BK-03, SV-14  ·  430 px / vertical scroll",
  // Notices
  noticeC20M: "Moving quote estimation (C20-M) is scheduled for an upcoming phase.",
  noticeNonMoving:
    "Moving details apply specifically to Moving services. Currently selected service is {{service}}. This screen presents an illustrative demo intake.",
} as const;

export const C18M_DEMO_CONSTANTS_ES = {
  stepIndicator: "W02 · SERVICIOS Y SOLICITUD",
  stepSub: "  /  C18-M",
  title: "Detalles de la mudanza",
  subtitle: "Ejemplo independiente HX-DEMO-MOVE-1034 · Sin cotización real.",
  defaultBookingId: "HX-DEMO-MOVE-1034",
  fictionalCustomer: "DANIEL RUIZ · HX-DEMO-MOVE-1034",
  // Section A
  sectionARouteTitle: "Ruta de mudanza",
  labelCustomer: "Cliente",
  labelPickup: "Recogida",
  labelDropoff: "Entrega",
  labelRequestedScope: "Servicio solicitado",
  // Section B
  sectionBInventoryTitle: "Inventario y acceso",
  labelLargeItems: "Objetos grandes",
  labelEstimatedWeight: "Peso estimado",
  labelOriginStairs: "Escaleras en origen",
  labelDestinationStairs: "Escaleras en destino",
  labelPackingRequest: "Solicitud de embalaje",
  // Section C
  sectionCAssessmentTitle: "Se requiere evaluar carga y personal",
  badgeReviewRequired: "Revisión necesaria",
  assessmentDescription: "El personal y vehículo se determinan según límites aprobados.",
  runtimeClarification:
    "Esta solicitud de mudanza es una demostración y no modifica otras reservas.",
  figmaStaticClarification: "Es distinto del retiro de objetos solicitado por Sarah.",
  // CTAs
  continueCta: "Continuar detalles de mudanza",
  returnServiceListCta: "Volver a lista de servicios   ›",
  // Footers
  footerNoticeDemo: "SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
  footerNoticeSrs: "SRS  BK-02, BK-03, SV-14  ·  430 px / desplazamiento vertical",
  // Notices
  noticeC20M:
    "La estimación de cotización de mudanza (C20-M) está programada para una próxima fase.",
  noticeNonMoving:
    "Los detalles de mudanza aplican específicamente a servicios de Mudanza. Actualmente tienes seleccionado {{service}}. Esta pantalla muestra una solicitud de demostración ilustrativa sin alterar tu reserva activa.",
} as const;
