/**
 * C18-T Mattress Removal Intake — Fixture
 *
 * Authoritative Figma: Node 387:274 (EN) & Node 977:9685 (ES)
 * Flow Context: W02 Service Discovery & Intake / C18-T
 */

export interface C18TTier {
	id: string;
	title: string;
	titleEs: string;
	subtitle: string;
	subtitleEs: string;
	badge?: string;
	badgeEs?: string;
	isSelected?: boolean;
}

export interface C18TIntakeData {
	serviceName: string;
	serviceNameEs: string;
	serviceSubtitle: string;
	serviceSubtitleEs: string;
	itemTitle: string;
	itemTitleEs: string;
	itemQuantity: string;
	itemQuantityEs: string;
	itemSize: string;
	itemSizeEs: string;
	itemWeight: string;
	itemWeightEs: string;
	itemAccess: string;
	itemAccessEs: string;
	handlingTitle: string;
	handlingTitleEs: string;
	handlingNotice1: string;
	handlingNotice1Es: string;
	handlingNotice2: string;
	handlingNotice2Es: string;
	tiers: C18TTier[];
}

export const C18T_DEFAULT_DATA: C18TIntakeData = {
	serviceName: "Mattress removal details",
	serviceNameEs: "Detalles de retiro de colchones",
	serviceSubtitle:
		"Confirm size, quantity, stair access and disposal suitability.",
	serviceSubtitleEs:
		"Confirma tamaño, cantidad, acceso a escaleras y viabilidad de eliminación.",
	itemTitle: "Queen mattress",
	itemTitleEs: "Colchón queen",
	itemQuantity: "2",
	itemQuantityEs: "2",
	itemSize: "80 × 60 × 11 in each",
	itemSizeEs: "80 × 60 × 11 pulg. cada uno",
	itemWeight: "~70 lb each · customer estimate",
	itemWeightEs: "~70 lb cada uno · Estimación del cliente",
	itemAccess: "Ground floor · driveway pickup",
	itemAccessEs: "Planta baja · Recogida desde entrada",
	handlingTitle: "Additional handling check",
	handlingTitleEs: "Control de manejo adicional",
	handlingNotice1:
		"Local disposal acceptance and worker/vehicle capacity remain conditional.",
	handlingNotice1Es:
		"Eliminación local y capacidad de personal/vehículo sujetas a validación.",
	handlingNotice2:
		"Customer describes condition; treatment or special disposal is not assumed.",
	handlingNotice2Es:
		"El cliente describe el estado; no se presupone tratamiento especial.",
	tiers: [
		{
			id: "mattress-removal",
			title: "Mattress Removal",
			titleEs: "Retiro de colchones",
			subtitle: "Size, quantity and local disposal eligibility",
			subtitleEs: "Tamaño, cantidad y eliminación local permitida",
			isSelected: true,
		},
		{
			id: "appliance-removal",
			title: "Appliance Removal",
			titleEs: "Retiro de electrodomésticos",
			subtitle: "Appliance type and safe disconnect details",
			subtitleEs: "Tipo de aparato y desconexión segura",
		},
		{
			id: "furniture-pickup",
			title: "Furniture Pickup",
			titleEs: "Retiro de muebles",
			subtitle: "Sofas, tables and bulky furniture",
			subtitleEs: "Sofás, mesas y muebles voluminosos",
		},
		{
			id: "assembly-help",
			title: "Assembly / Disassembly add-on",
			titleEs: "Extra de montaje / desmontaje",
			subtitle: "Optional labor · not standalone booking",
			subtitleEs: "Mano de obra opcional · No es reserva independiente",
			badge: "Add-on",
			badgeEs: "Opcional",
		},
	],
};

export const C18T_DEMO_CONSTANTS = {
	stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
	stepSub: "/ C18-T",
	stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
	stepSubEs: "/ C18-T",
	defaultBookingId: "HX-DEMO-1027",
	defaultAddress: "2140 E Sample Road, Phoenix, AZ 85016",
	footerNotice1: "DEMO ONLY  ·  No confirmed booking, rates or payment",
	footerNotice1Es: "SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
	footerNotice2:
		"SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / vertical scroll",
	footerNotice2Es:
		"SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / desplazamiento vertical",
} as const;
