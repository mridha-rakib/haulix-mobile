/**
 * C18-J Junk Removal Intake — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:805 (EN) & Node 977:9100 (ES)
 * Flow Context: W02 Service Discovery & Intake / C18-J
 */

export interface C18JItem {
	id: string;
	name: string;
	nameEs: string;
	countText: string;
	countTextEs: string;
	dimensions: string;
	weight: string;
	imageKey: "sofa" | "mattresses" | "table";
}

export interface C18JIntakeData {
	serviceName: string;
	serviceNameEs: string;
	serviceSubtitle: string;
	serviceSubtitleEs: string;
	stagingArea: string;
	stagingAreaEs: string;
	specialNotes: string;
	specialNotesEs: string;
	summaryCount: string;
	summaryCountEs: string;
	summaryWeight: string;
	summaryWeightEs: string;
	items: C18JItem[];
}

export const C18J_DEFAULT_DATA: C18JIntakeData = {
	serviceName: "Junk Removal",
	serviceNameEs: "Retiro de chatarra",
	serviceSubtitle: "Non-hazardous hauling and disposal",
	serviceSubtitleEs: "Transporte y eliminación de residuos no peligrosos",
	stagingArea: "Living room / garage staging area",
	stagingAreaEs: "Sala de estar / área de preparación del garaje",
	specialNotes: "Please protect door frames when removing sofa",
	specialNotesEs:
		"Por favor proteja los marcos de las puertas al retirar el sofá",
	summaryCount: "3 item categories · 4 total pieces",
	summaryCountEs: "3 categorías de objetos · 4 piezas en total",
	summaryWeight: "~350 lb estimated",
	summaryWeightEs: "~350 lb estimados",
	items: [
		{
			id: "sofa",
			name: "3-seat sofa",
			nameEs: "Sofá de tres plazas",
			countText: "1 item",
			countTextEs: "1 objeto",
			dimensions: "~82 × 35 × 34 in",
			weight: "~125 lb",
			imageKey: "sofa",
		},
		{
			id: "mattresses",
			name: "Queen mattresses",
			nameEs: "Colchones tamaño queen",
			countText: "2 items",
			countTextEs: "2 objetos",
			dimensions: "~80 × 60 × 11 in each",
			weight: "~70 lb each",
			imageKey: "mattresses",
		},
		{
			id: "table",
			name: "Dining table",
			nameEs: "Mesa de comedor",
			countText: "1 item",
			countTextEs: "1 objeto",
			dimensions: "~60 × 36 × 30 in",
			weight: "~85 lb",
			imageKey: "table",
		},
	],
};

export const C18J_DEMO_CONSTANTS = {
	stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
	stepSub: "/ C18-J",
	stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
	stepSubEs: "/ C18-J",
	defaultBookingId: "HX-DEMO-1027",
	defaultAddress: "2140 E Sample Road, Phoenix, AZ 85016",
	footerNotice1: "DEMO ONLY · No confirmed booking, rates or payment",
	footerNotice1Es: "SOLO DEMO · Sin reserva confirmada, tarifas ni pago",
	footerNotice2: "SRS BK-01, BK-02, SV-14 · 430 px / vertical scroll",
	footerNotice2Es: "SRS BK-01, BK-02, SV-14 · 430 px / desplazamiento vertical",
} as const;
