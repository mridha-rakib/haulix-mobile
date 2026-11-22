/**
 * Phase 03.26 Service Intake Reviews & W03 AI Handoff Fixtures
 *
 * Authoritative Figma Nodes:
 * - C21-A: Node 394:290 (EN) & Node 980:11066 (ES)
 * - C21-T: Node 394:392 (EN) & Node 980:11126 (ES)
 * - C21-G: Node 394:494 (EN) & Node 980:11186 (ES)
 * - W03-HANDOFF: Node 382:2161 (EN) & Node 980:10514 (ES)
 */

export interface C21AData {
  bookingId: string;
  badgeLabel: string;
  confirmLine1En: string;
  confirmLine1Es: string;
  confirmLine2En: string;
  confirmLine2Es: string;
  confirmLine3En: string;
  confirmLine3Es: string;
  confirmLine4En: string;
  confirmLine4Es: string;
}

export const C21_A_DEFAULT_DATA: C21AData = {
  bookingId: "HX-DEMO-APPL-1036",
  badgeLabel: "SARAH MITCHELL · HX-DEMO-APPL-1036",
  confirmLine1En: "HX-DEMO-APPL-1036 · Sarah Mitchell · Appliance Removal",
  confirmLine1Es: "HX-DEMO-APPL-1036 · Sarah Mitchell · Appliance Removal",
  confirmLine2En: "Washing machine ×1 · 27 × 29 × 39 in · ~170 lb",
  confirmLine2Es: "Lavadora ×1 · 27 × 29 × 39 pulg. · ~170 lb",
  confirmLine3En: "No appliance photo supplied · clarification required",
  confirmLine3Es: "No se aportó foto del aparato · Se necesita aclaración",
  confirmLine4En: "Ground-floor pickup · water/electric disconnect not included",
  confirmLine4Es: "Planta baja · Desconexión de agua/electricidad no incluida",
};

export interface C21TData {
  bookingId: string;
  badgeLabel: string;
  confirmLine1En: string;
  confirmLine1Es: string;
  confirmLine2En: string;
  confirmLine2Es: string;
  confirmLine3En: string;
  confirmLine3Es: string;
  confirmLine4En: string;
  confirmLine4Es: string;
}

export const C21_T_DEFAULT_DATA: C21TData = {
  bookingId: "HX-DEMO-MATT-1037",
  badgeLabel: "SARAH MITCHELL · HX-DEMO-MATT-1037",
  confirmLine1En: "HX-DEMO-MATT-1037 · Sarah Mitchell · Mattress Removal",
  confirmLine1Es: "HX-DEMO-MATT-1037 · Sarah Mitchell · Mattress Removal",
  confirmLine2En: "Queen mattresses ×2 · 80 × 60 × 11 in each",
  confirmLine2Es: "Colchones queen ×2 · 80 × 60 × 11 pulg. c/u",
  confirmLine3En: "Mattress concept photo available · item condition unconfirmed",
  confirmLine3Es: "Foto de colchón disponible · Estado no confirmado",
  confirmLine4En: "Ground-floor driveway pickup · ~70 lb each",
  confirmLine4Es: "Recogida desde entrada en planta baja · ~70 lb c/u",
};

export interface C21GData {
  bookingId: string;
  badgeLabel: string;
  confirmLine1En: string;
  confirmLine1Es: string;
  confirmLine2En: string;
  confirmLine2Es: string;
  confirmLine3En: string;
  confirmLine3Es: string;
  confirmLine4En: string;
  confirmLine4Es: string;
}

export const C21_G_DEFAULT_DATA: C21GData = {
  bookingId: "HX-DEMO-GAR-1040",
  badgeLabel: "SARAH MITCHELL · HX-DEMO-GAR-1040",
  confirmLine1En: "HX-DEMO-GAR-1040 · Sarah Mitchell · Garage Cleanout",
  confirmLine1Es: "HX-DEMO-GAR-1040 · Sarah Mitchell · Garage Cleanout",
  confirmLine2En: "Cardboard boxes and shelving · exact count not supplied",
  confirmLine2Es: "Cajas de cartón y estantes · cantidad pendiente",
  confirmLine3En: "Additional garage photos required for uncertain materials",
  confirmLine3Es: "Se requieren más fotos del garaje por materiales inciertos",
  confirmLine4En: "One-bay residential garage · driveway accessible",
  confirmLine4Es: "Garaje residencial de una plaza · Entrada accesible",
};

export interface W03HandoffData {
  bookingId: string;
  badgeLabel: string;
  payloadLine1En: string;
  payloadLine1Es: string;
  payloadLine2En: string;
  payloadLine2Es: string;
  payloadLine3En: string;
  payloadLine3Es: string;
  payloadLine4En: string;
  payloadLine4Es: string;
}

export const W03_HANDOFF_DEFAULT_DATA: W03HandoffData = {
  bookingId: "HX-DEMO-1027",
  badgeLabel: "SARAH MITCHELL · HX-DEMO-1027",
  payloadLine1En: "HX-DEMO-1027 · Sarah Mitchell · Junk Removal",
  payloadLine1Es: "HX-DEMO-1027 · Sarah Mitchell · Retiro de objetos",
  payloadLine2En: "3 item types / 4 pieces · 4 attached demo images",
  payloadLine2Es: "3 tipos / 4 piezas · 4 imágenes demo adjuntas",
  payloadLine3En: "Pickup: 1234 E Example Lane, Phoenix, AZ 85014",
  payloadLine3Es: "Recogida: 1234 E Example Lane, Phoenix, AZ 85014",
  payloadLine4En: "Access: ground level, driveway, ~25-foot carry",
  payloadLine4Es: "Acceso: planta baja, entrada vehicular, traslado ~25 pies",
};
