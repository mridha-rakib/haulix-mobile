/**
 * C18-R-E Retail Missing Order — Fixture
 *
 * Authoritative Figma: Node 382:1197 (EN) & Node 980:9247 (ES)
 * Flow Context: W02 Service Discovery & Intake / C18-R-E
 */

export interface C18REValidationData {
	serviceName: string;
	serviceNameEs: string;
	serviceSubtitle: string;
	serviceSubtitleEs: string;
	retailerName: string;
	retailerNameEs: string;
	orderNumberStatus: string;
	orderNumberStatusEs: string;
	storeLocationStatus: string;
	storeLocationStatusEs: string;
	cannotProceedTitle: string;
	cannotProceedTitleEs: string;
	actionRequiredBadge: string;
	actionRequiredBadgeEs: string;
	errorGuidance: string;
	errorGuidanceEs: string;
	errorDisclaimer: string;
	errorDisclaimerEs: string;
}

export const C18RE_DEFAULT_DATA: C18REValidationData = {
	serviceName: "Order information needed",
	serviceNameEs: "Se necesitan datos del pedido",
	serviceSubtitle:
		"Manual retailer collection requires enough details for authorized pickup.",
	serviceSubtitleEs:
		"La recogida manual requiere datos suficientes para retirar el pedido autorizado.",
	retailerName: "Home Depot",
	retailerNameEs: "Home Depot",
	orderNumberStatus: "Missing — required",
	orderNumberStatusEs: "Falta información obligatoria",
	storeLocationStatus: "Phoenix, AZ · store branch not selected",
	storeLocationStatusEs: "Phoenix, AZ · Sucursal no seleccionada",
	cannotProceedTitle: "Cannot proceed yet",
	cannotProceedTitleEs: "Aún no se puede continuar",
	actionRequiredBadge: "Action required",
	actionRequiredBadgeEs: "Acción necesaria",
	errorGuidance:
		"Enter the customer's store order identifier and confirm collection instructions.",
	errorGuidanceEs:
		"Introduce el pedido de tienda y confirma instrucciones de recogida.",
	errorDisclaimer:
		"No store account integration or automatic order lookup is promised.",
	errorDisclaimerEs:
		"No se promete integración con cuenta de tienda ni consulta automática.",
};

export const C18RE_DEMO_CONSTANTS = {
	stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
	stepSub: "/ C18-R",
	stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
	stepSubEs: "/ C18-R",
	defaultBookingId: "HX-DEMO-1027",
	footerNotice1: "DEMO ONLY  ·  No confirmed booking, rates or payment",
	footerNotice1Es: "SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
	footerNotice2: "SRS  BK-14, SV-05  ·  430 px / vertical scroll",
	footerNotice2Es: "SRS  BK-14, SV-05  ·  430 px / desplazamiento vertical",
} as const;
