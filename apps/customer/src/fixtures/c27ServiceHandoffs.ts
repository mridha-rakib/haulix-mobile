/**
 * Phase 03.27 Service-Specific AI Review Handoff Fixtures
 *
 * Authoritative Figma Nodes:
 * - W03-M-HANDOFF: Node 392:405 (EN) & Node 980:10826 (ES)
 * - W03-A-HANDOFF: Node 394:341 (EN) & Node 980:11306 (ES)
 * - W03-T-HANDOFF: Node 394:443 (EN) & Node 980:11366 (ES)
 * - W03-G-HANDOFF: Node 394:545 (EN) & Node 980:11426 (ES)
 */

export interface W03MHandoffData {
	serviceId: "moving";
	bookingId: string;
	defaultCustomerEn: string;
	defaultCustomerEs: string;
	inventoryEn: string;
	inventoryEs: string;
	pickupEn: string;
	pickupEs: string;
	destinationEn: string;
	destinationEs: string;
	scopeBadgeEn: string;
	scopeBadgeEs: string;
	guidanceLine1En: string;
	guidanceLine1Es: string;
	guidanceLine2En: string;
	guidanceLine2Es: string;
	guidanceLine3En: string;
	guidanceLine3Es: string;
}

export const W03_M_DEFAULT_DATA: W03MHandoffData = {
	serviceId: "moving",
	bookingId: "HX-DEMO-MOVE-1034",
	defaultCustomerEn: "Daniel Ruiz",
	defaultCustomerEs: "Daniel Ruiz",
	inventoryEn: "Customer inventory: sofa, dresser and 12 boxes",
	inventoryEs: "Inventario: sofá, cómoda y 12 cajas",
	pickupEn: "Pickup: 2140 E Sample Road, Phoenix, AZ 85016",
	pickupEs: "Recogida: 2140 E Sample Road, Phoenix, AZ 85016",
	destinationEn: "Destination: 5678 N Demo Avenue, Phoenix, AZ 85012",
	destinationEs: "Destino: 5678 N Demo Avenue, Phoenix, AZ 85012",
	scopeBadgeEn: "Moving scope review",
	scopeBadgeEs: "Revisar alcance de mudanza",
	guidanceLine1En: "AI must validate the customer-supplied inventory.",
	guidanceLine1Es:
		"La IA debe validar el inventario proporcionado por el cliente.",
	guidanceLine2En: "No definitive rate or vehicle load is assumed.",
	guidanceLine2Es:
		"No se presupone tarifa ni capacidad de vehículo definitivas.",
	guidanceLine3En:
		"Prototype flow connected; no final price or booking is confirmed.",
	guidanceLine3Es:
		"Flujo demo conectado; no hay precio final ni reserva confirmados.",
};

export interface W03AHandoffData {
	serviceId: "appliance-removal";
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

export const W03_A_DEFAULT_DATA: W03AHandoffData = {
	serviceId: "appliance-removal",
	bookingId: "HX-DEMO-APPL-1036",
	defaultCustomerEn: "Sarah Mitchell",
	defaultCustomerEs: "Sarah Mitchell",
	payloadLine2En: "Washing machine ×1 · 27 × 29 × 39 in · ~170 lb",
	payloadLine2Es: "Lavadora ×1 · 27 × 29 × 39 pulg. · ~170 lb",
	payloadLine3En: "No appliance photo supplied · clarification required",
	payloadLine3Es: "No se aportó foto del aparato · Se necesita aclaración",
	payloadLine4En:
		"Ground-floor pickup · water/electric disconnect not included",
	payloadLine4Es: "Planta baja · Desconexión de agua/electricidad no incluida",
	scopeBadgeEn: "Appliance scope review",
	scopeBadgeEs: "Revisión necesaria",
	guidanceLine1En:
		"Appliance disconnection and disposal acceptance not yet verified.",
	guidanceLine1Es:
		"Aún no se verificó la desconexión ni la aceptación para eliminación.",
	guidanceLine2En: "No quote, payment or booking has been confirmed.",
	guidanceLine2Es: "No hay precio final, pago ni reserva confirmados.",
	guidanceLine3En:
		"Service rates require approval; no final price or booking is confirmed.",
	guidanceLine3Es:
		"Las tarifas y condiciones de manipulación requieren aprobación.",
};

export interface W03THandoffData {
	serviceId: "mattress-removal";
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

export const W03_T_DEFAULT_DATA: W03THandoffData = {
	serviceId: "mattress-removal",
	bookingId: "HX-DEMO-MATT-1037",
	defaultCustomerEn: "Sarah Mitchell",
	defaultCustomerEs: "Sarah Mitchell",
	payloadLine2En: "Queen mattresses ×2 · 80 × 60 × 11 in each",
	payloadLine2Es: "Colchones queen ×2 · 80 × 60 × 11 pulg. c/u",
	payloadLine3En:
		"Mattress concept photo available · item condition unconfirmed",
	payloadLine3Es: "Foto de colchón disponible · Estado no confirmado",
	payloadLine4En: "Ground-floor driveway pickup · ~70 lb each",
	payloadLine4Es: "Recogida desde entrada en planta baja · ~70 lb c/u",
	scopeBadgeEn: "Mattress scope review",
	scopeBadgeEs: "Revisión necesaria",
	guidanceLine1En:
		"Confirm disposal eligibility and safe handling before a final price.",
	guidanceLine1Es: "Revisar eliminación local de colchones y manejo seguro.",
	guidanceLine2En: "No quote, payment or booking has been confirmed.",
	guidanceLine2Es: "No hay precio final, pago ni reserva confirmados.",
	guidanceLine3En:
		"Service rates require approval; no final price or booking is confirmed.",
	guidanceLine3Es: "Las tarifas requieren aprobación antes del precio final.",
};

export interface W03GHandoffData {
	serviceId: "garage-cleanout";
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

export const W03_G_DEFAULT_DATA: W03GHandoffData = {
	serviceId: "garage-cleanout",
	bookingId: "HX-DEMO-GAR-1040",
	defaultCustomerEn: "Sarah Mitchell",
	defaultCustomerEs: "Sarah Mitchell",
	payloadLine2En: "Cardboard boxes and shelving · exact count not supplied",
	payloadLine2Es: "Volumen y contenido del garaje · por confirmar",
	payloadLine3En: "Additional garage photos required for uncertain materials",
	payloadLine3Es: "Se requieren más fotos del garaje por materiales inciertos",
	payloadLine4En: "One-bay residential garage · driveway accessible",
	payloadLine4Es: "Garaje residencial de una plaza · Entrada accesible",
	scopeBadgeEn: "Garage scope review",
	scopeBadgeEs: "Revisión necesaria",
	guidanceLine1En:
		"Unknown liquids or contaminated loads require clarification/refusal.",
	guidanceLine1Es:
		"Líquidos desconocidos o cargas contaminadas exigen aclaración o rechazo.",
	guidanceLine2En: "No quote, payment or booking has been confirmed.",
	guidanceLine2Es: "No hay cotización, pago ni reserva confirmados.",
	guidanceLine3En:
		"Restricted materials and disposal rules may require authorized review.",
	guidanceLine3Es: "Las tarifas y normas de desecho requieren aprobación.",
};
