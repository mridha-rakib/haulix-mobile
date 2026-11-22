/**
 * C18-R Retail Pickup Intake — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:1115 (EN) & Node 977:9474 (ES)
 * Flow Context: W02 Service Discovery & Intake / C18-R
 */

export interface C18RIntakeData {
	serviceName: string;
	serviceNameEs: string;
	serviceSubtitle: string;
	serviceSubtitleEs: string;
	retailerName: string;
	storeAddress: string;
	orderNumber: string;
	pickupContact: string;
	pickupContactEs: string;
	orderStatus: string;
	orderStatusEs: string;
	deliveryAddress: string;
	expectedItems: string;
	expectedItemsEs: string;
	estimatedLoad: string;
	estimatedLoadEs: string;
	collectionNotes: string;
	collectionNotesEs: string;
	apiNotice: string;
	apiNoticeEs: string;
}

export const C18R_DEFAULT_DATA: C18RIntakeData = {
	serviceName: "Retail Store Pickup",
	serviceNameEs: "Recogida de compra en tienda",
	serviceSubtitle: "Authorize order collection from retail partner or store.",
	serviceSubtitleEs:
		"Autorice la recogida de su pedido en tienda o comercio colaborador.",
	retailerName: "Home Depot · Phoenix",
	storeAddress: "1800 E Demo Way, Phoenix, AZ 85016",
	orderNumber: "HD-DEMO-58321 · fictional",
	pickupContact: "Order holder or authorized collector",
	pickupContactEs: "Titular del pedido o recolector autorizado",
	orderStatus: "Customer says ready · store has not verified",
	orderStatusEs:
		"El cliente dice que está listo · la tienda no lo ha verificado",
	deliveryAddress: "5678 N Demo Avenue, Phoenix, AZ 85012",
	expectedItems: "Flat-pack shelving ×2 · boxed furniture ×1",
	expectedItemsEs: "Estanterías en paquete plano ×2 · mueble en caja ×1",
	estimatedLoad: "Customer estimate; confirm packaging and weight",
	estimatedLoadEs: "Estimación del cliente; confirmar embalaje y peso",
	collectionNotes: "Bring order identifier and authorized pickup details",
	collectionNotesEs:
		"Llevar identificador de pedido y datos de recogida autorizada",
	apiNotice: "Direct retailer API integration is not active in demo mode.",
	apiNoticeEs:
		"La integración directa con la API de la tienda no está activa en modo demo.",
};

export const C18R_DEMO_CONSTANTS = {
	stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
	stepSub: "/ C18-R",
	stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
	stepSubEs: "/ C18-R",
	defaultBookingId: "HX-DEMO-1027",
	footerNotice1: "DEMO ONLY · No confirmed booking, rates or payment",
	footerNotice1Es: "SOLO DEMO · Sin reserva confirmada, tarifas ni pago",
	footerNotice2: "SRS BK-01, BK-02, SV-14 · 430 px / vertical scroll",
	footerNotice2Es: "SRS BK-01, BK-02, SV-14 · 430 px / desplazamiento vertical",
} as const;
