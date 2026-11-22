/**
 * Phase 03.28 W03 Service Handoffs & C22 AI Recognition Fixtures
 *
 * Authoritative Figma Nodes:
 * - W03-F-HANDOFF: Node 394:239 (EN) & Node 980:11246 (ES)
 * - W03-R-HANDOFF: Node 392:507 (EN) & Node 980:10946 (ES)
 * - C22: Node 412:195 (EN) & Node 987:9929 (ES)
 * - C22-P: Node 412:262 (EN) & Node 987:10006 (ES)
 */

export interface W03FHandoffData {
  serviceId: "furniture-pickup";
  bookingId: string;
  defaultCustomerEn: string;
  defaultCustomerEs: string;
  payloadLine2En: string;
  payloadLine2Es: string;
  payloadLine3En: string;
  payloadLine3Es: string;
  payloadLine4En: string;
  payloadLine4Es: string;
  scopeBadgeEn: string;
  scopeBadgeEs: string;
  guidanceLine1En: string;
  guidanceLine1Es: string;
  guidanceLine2En: string;
  guidanceLine2Es: string;
  guidanceLine3En: string;
  guidanceLine3Es: string;
}

export const W03_F_DEFAULT_DATA: W03FHandoffData = {
  serviceId: "furniture-pickup",
  bookingId: "HX-DEMO-FURN-1039",
  defaultCustomerEn: "Sarah Mitchell",
  defaultCustomerEs: "Bryan Lopez Mendoza",
  payloadLine2En: "3-seat fabric sofa ×1 · 82 × 35 × 34 in · ~125 lb",
  payloadLine2Es: "Sofá de tela de 3 plazas ×1 · 82 × 35 × 34 pulg. · ~125 lb",
  payloadLine3En: "One furniture example image exists in original concepts",
  payloadLine3Es: "Existe una imagen de ejemplo de muebles en los conceptos.",
  payloadLine4En: "Pickup at 1234 E Example Lane · ground-floor driveway",
  payloadLine4Es: "Recogida en 1234 E Example Lane · Entrada de planta baja",
  scopeBadgeEn: "Furniture scope review",
  scopeBadgeEs: "Revisión necesaria",
  guidanceLine1En: "Bulky furniture handling requires approved vehicle/crew rules.",
  guidanceLine1Es: "Los muebles voluminosos requieren vehículo y equipo autorizados.",
  guidanceLine2En: "No quote, payment or booking has been confirmed.",
  guidanceLine2Es: "No hay precio final ni reserva confirmados.",
  guidanceLine3En: "Service rates require approval; no final price or booking is confirmed.",
  guidanceLine3Es: "Las tarifas requieren aprobación antes de mostrar un precio final.",
};

export interface W03RHandoffData {
  serviceId: "retail-pickup";
  bookingId: string;
  defaultCustomerEn: string;
  defaultCustomerEs: string;
  payloadLine2En: string;
  payloadLine2Es: string;
  payloadLine3En: string;
  payloadLine3Es: string;
  payloadLine4En: string;
  payloadLine4Es: string;
  scopeBadgeEn: string;
  scopeBadgeEs: string;
  guidanceLine1En: string;
  guidanceLine1Es: string;
  guidanceLine2En: string;
  guidanceLine2Es: string;
  guidanceLine3En: string;
  guidanceLine3Es: string;
}

export const W03_R_DEFAULT_DATA: W03RHandoffData = {
  serviceId: "retail-pickup",
  bookingId: "HX-DEMO-RETAIL-1035",
  defaultCustomerEn: "Emily Parker",
  defaultCustomerEs: "Emily Parker",
  payloadLine2En: "Home Depot · HD-DEMO-58321 · manually provided order",
  payloadLine2Es: "Home Depot · HD-DEMO-58321 · Pedido indicado manualmente",
  payloadLine3En: "Destination: 5678 N Demo Avenue, Phoenix, AZ 85012",
  payloadLine3Es: "Destino: 5678 N Demo Avenue, Phoenix, AZ 85012",
  payloadLine4En: "Shelving ×2, boxed furniture ×1 · packaging to verify",
  payloadLine4Es: "Estantes ×2, mueble embalado ×1 · Verificar embalaje",
  scopeBadgeEn: "Retail scope review",
  scopeBadgeEs: "Revisar pedido comercial",
  guidanceLine1En: "Verify order reference, store collection window and delivery access.",
  guidanceLine1Es: "Verifica referencia del pedido y condiciones de recogida y entrega.",
  guidanceLine2En: "No provider-authorized payment or confirmed pickup.",
  guidanceLine2Es: "Sin pago autorizado por proveedor ni recogida confirmada.",
  guidanceLine3En: "Prototype flow connected; no final price or booking is confirmed.",
  guidanceLine3Es: "Flujo demo conectado; no hay precio final ni reserva confirmados.",
};

export interface C22EvidenceItem {
  id: string;
  labelKey: "sofaLabel" | "mattressesLabel" | "tableLabel" | "otherJunkLabel";
  imageKey: "sofa" | "mattresses" | "table" | "boxes";
  testID: string;
}

export const C22_EVIDENCE_ITEMS: C22EvidenceItem[] = [
  {
    id: "sofa",
    labelKey: "sofaLabel",
    imageKey: "sofa",
    testID: "c22-evidence-sofa",
  },
  {
    id: "mattresses",
    labelKey: "mattressesLabel",
    imageKey: "mattresses",
    testID: "c22-evidence-mattresses",
  },
  {
    id: "table",
    labelKey: "tableLabel",
    imageKey: "table",
    testID: "c22-evidence-table",
  },
  {
    id: "otherJunk",
    labelKey: "otherJunkLabel",
    imageKey: "boxes",
    testID: "c22-evidence-other-junk",
  },
];

export interface C22PEvidenceItem {
  id: string;
  labelKey: "sofaLabel" | "mattressesLabel";
  imageKey: "sofa" | "mattresses";
  testID: string;
}

export const C22P_EVIDENCE_ITEMS: C22PEvidenceItem[] = [
  {
    id: "sofa",
    labelKey: "sofaLabel",
    imageKey: "sofa",
    testID: "c22p-evidence-sofa",
  },
  {
    id: "mattresses",
    labelKey: "mattressesLabel",
    imageKey: "mattresses",
    testID: "c22p-evidence-mattresses",
  },
];
