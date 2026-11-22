/**
 * Phase 03.25 Service Review & Collection Readiness Fixtures
 *
 * Authoritative Figma Nodes:
 * - C20-RETAIL: Node 392:265 (EN) & Node 980:10668 (ES)
 * - C21-RETAIL: Node 392:456 (EN) & Node 980:10886 (ES)
 * - C21-M: Node 392:354 (EN) & Node 980:10766 (ES)
 * - C21-F: Node 394:188 (EN) & Node 980:11006 (ES)
 */

export interface C20RetailData {
  bookingId: string;
  customerNameEn: string;
  customerNameEs: string;
  retailerName: string;
  storeLocation: string;
  orderNumber: string;
  pickupContactEn: string;
  pickupContactEs: string;
  retailerReadinessEn: string;
  retailerReadinessEs: string;
  dropoffAddress: string;
  expectedItemsEn: string;
  expectedItemsEs: string;
  estimatedLoadEn: string;
  estimatedLoadEs: string;
  collectionNotesEn: string;
  collectionNotesEs: string;
}

export const C20_RETAIL_DEFAULT_DATA: C20RetailData = {
  bookingId: "HX-DEMO-RETAIL-1035",
  customerNameEn: "Emily Parker · fictional",
  customerNameEs: "Emily Parker · ficticia",
  retailerName: "Home Depot · Phoenix",
  storeLocation: "1800 E Demo Way, Phoenix, AZ 85016",
  orderNumber: "HD-DEMO-58321 · fictional",
  pickupContactEn: "Order holder or authorized collector",
  pickupContactEs: "Titular del pedido o persona autorizada",
  retailerReadinessEn: "Customer says ready · not verified by store",
  retailerReadinessEs: "Cliente indica listo · Sin verificar por la tienda",
  dropoffAddress: "5678 N Demo Avenue, Phoenix, AZ 85012",
  expectedItemsEn: "Flat-pack shelving ×2 · boxed furniture ×1",
  expectedItemsEs: "Estantes desmontados ×2 · Mueble embalado ×1",
  estimatedLoadEn: "Customer estimate; confirm packaging and weight",
  estimatedLoadEs: "Estimación del cliente; confirmar embalaje y peso",
  collectionNotesEn: "Bring order identifier and authorized pickup details",
  collectionNotesEs: "Lleva número de pedido y datos de autorización",
};

export interface C21RetailData {
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

export const C21_RETAIL_DEFAULT_DATA: C21RetailData = {
  bookingId: "HX-DEMO-RETAIL-1035",
  badgeLabel: "EMILY PARKER · HX-DEMO-RETAIL-1035",
  confirmLine1En: "HX-DEMO-RETAIL-1035 · Emily Parker · Store Pickup",
  confirmLine1Es: "HX-DEMO-RETAIL-1035 · Emily Parker · Store Pickup",
  confirmLine2En: "Home Depot · order HD-DEMO-58321 · pickup not verified",
  confirmLine2Es: "Home Depot · Pedido HD-DEMO-58321 · Recogida no verificada",
  confirmLine3En: "Destination: 5678 N Demo Avenue, Phoenix, AZ 85012",
  confirmLine3Es: "Destino: 5678 N Demo Avenue, Phoenix, AZ 85012",
  confirmLine4En: "Flat-pack shelving ×2 + boxed furniture ×1",
  confirmLine4Es: "Estantes desmontados ×2 + mueble embalado ×1",
};

export interface C21MData {
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

export const C21_M_DEFAULT_DATA: C21MData = {
  bookingId: "HX-DEMO-MOVE-1034",
  badgeLabel: "DANIEL RUIZ · HX-DEMO-MOVE-1034",
  confirmLine1En: "HX-DEMO-MOVE-1034 · Daniel Ruiz · Moving",
  confirmLine1Es: "HX-DEMO-MOVE-1034 · Daniel Ruiz · Moving",
  confirmLine2En: "2-seat sofa ×1, dresser ×1, 12 moving boxes · ~550 lb",
  confirmLine2Es: "Sofá de 2 plazas ×1, cómoda ×1, 12 cajas · ~550 lb",
  confirmLine3En: "Pickup: 2140 E Sample Road, Phoenix, AZ 85016",
  confirmLine3Es: "Recogida: 2140 E Sample Road, Phoenix, AZ 85016",
  confirmLine4En: "Drop-off: 5678 N Demo Avenue, Phoenix, AZ 85012",
  confirmLine4Es: "Entrega: 5678 N Demo Avenue, Phoenix, AZ 85012",
};

export interface C21FData {
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

export const C21_F_DEFAULT_DATA: C21FData = {
  bookingId: "HX-DEMO-FURN-1039",
  badgeLabel: "SARAH MITCHELL · HX-DEMO-FURN-1039",
  confirmLine1En: "HX-DEMO-FURN-1039 · Sarah Mitchell · Furniture Pickup",
  confirmLine1Es: "HX-DEMO-FURN-1039 · Sarah Mitchell · Furniture Pickup",
  confirmLine2En: "3-seat fabric sofa ×1 · 82 × 35 × 34 in · ~125 lb",
  confirmLine2Es: "Sofá de tela de 3 plazas ×1 · 82 × 35 × 34 pulg. · ~125 lb",
  confirmLine3En: "One furniture example image exists in original concepts",
  confirmLine3Es: "Existe una imagen de ejemplo de muebles en los conceptos.",
  confirmLine4En: "Pickup at 1234 E Example Lane · ground-floor driveway",
  confirmLine4Es: "Recogida en 1234 E Example Lane · Entrada de planta baja",
};
