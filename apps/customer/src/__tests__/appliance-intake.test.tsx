import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C18A_DEFAULT_DATA } from "../fixtures/c18aApplianceIntake";

describe("C18-A Appliance Removal Intake — English (Node 387:177) & Spanish (Node 977:9572)", () => {
	const c18aRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/appliance-intake.tsx",
	);
	const c18IconsPath = path.resolve(
		__dirname,
		"../components/discovery/C18BatchIcons.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
	});

	it("1. verifies exact English copy from Figma Node 387:177", () => {
		expect(en.c18a.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c18a.stepSub).toBe("  /  C18-A");
		expect(en.c18a.title).toBe("Appliance removal details");
		expect(en.c18a.subtitle).toBe(
			"Document appliance dimensions, disconnect requirements and safe handling.",
		);
		expect(en.c18a.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c18a.tiersCardTitle).toBe("Services and optional paid extras");
		expect(en.c18a.detailsCardTitle).toBe("Appliance removal · item details");
		expect(en.c18a.labelItem).toBe("Item");
		expect(en.c18a.itemValue).toBe("Front-load washing machine");
		expect(en.c18a.labelQuantity).toBe("Quantity");
		expect(en.c18a.quantityValue).toBe("1");
		expect(en.c18a.labelSize).toBe("Approximate size");
		expect(en.c18a.sizeValue).toBe("27 × 29 × 39 in");
		expect(en.c18a.labelWeight).toBe("Estimated weight");
		expect(en.c18a.weightValue).toBe("~170 lb · customer estimate");
		expect(en.c18a.labelAccess).toBe("Access");
		expect(en.c18a.accessValue).toBe(
			"Ground floor · utility connections need review",
		);
		expect(en.c18a.handlingCardTitle).toBe("Additional handling check");
		expect(en.c18a.reviewBadge).toBe("Review required");
		expect(en.c18a.handlingNotice1).toBe(
			"Appliance disconnection, capacity and approved disposal restrictions require checking.",
		);
		expect(en.c18a.handlingNotice2).toBe(
			"No electrical or water disconnection is automatically included.",
		);
		expect(en.c18a.continueCta).toBe("Review appliance removal intake");
		expect(en.c18a.categoriesCta).toBe("See service categories   ›");
		expect(en.c18a.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c18a.footerSrs).toBe(
			"SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 977:9572", () => {
		expect(es.c18a.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
		expect(es.c18a.stepSub).toBe("  /  C18-A");
		expect(es.c18a.title).toBe("Detalles del retiro de electrodomésticos");
		expect(es.c18a.subtitle).toBe(
			"Indica dimensiones, desconexión y manejo seguro del aparato.",
		);
		expect(es.c18a.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c18a.tiersCardTitle).toBe(
			"Servicios y extras opcionales de pago",
		);
		expect(es.c18a.detailsCardTitle).toBe(
			"Retiro de electrodomésticos · detalles del objeto",
		);
		expect(es.c18a.labelItem).toBe("Objeto");
		expect(es.c18a.itemValue).toBe("Lavadora de carga frontal");
		expect(es.c18a.labelQuantity).toBe("Cantidad");
		expect(es.c18a.quantityValue).toBe("1");
		expect(es.c18a.labelSize).toBe("Tamaño aproximado");
		expect(es.c18a.sizeValue).toBe("27 × 29 × 39 in");
		expect(es.c18a.labelWeight).toBe("Peso estimado");
		expect(es.c18a.weightValue).toBe("~170 lb · Estimación del cliente");
		expect(es.c18a.labelAccess).toBe("Acceso");
		expect(es.c18a.accessValue).toBe("Planta baja · Revisar conexiones");
		expect(es.c18a.handlingCardTitle).toBe("Control de manejo adicional");
		expect(es.c18a.reviewBadge).toBe("Revisión necesaria");
		expect(es.c18a.handlingNotice1).toBe(
			"Se deben revisar desconexión, capacidad y eliminación aprobada.",
		);
		expect(es.c18a.handlingNotice2).toBe(
			"La desconexión eléctrica o de agua no está incluida.",
		);
		expect(es.c18a.continueCta).toBe("Revisar retiro de electrodomésticos");
		expect(es.c18a.categoriesCta).toBe("Ver categorías de servicio   ›");
		expect(es.c18a.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c18a.footerSrs).toBe(
			"SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. verifies tier structure in fixture and icons", () => {
		expect(C18A_DEFAULT_DATA.tiers).toHaveLength(4);
		expect(C18A_DEFAULT_DATA.tiers[0].id).toBe("appliance-removal");
		expect(C18A_DEFAULT_DATA.tiers[1].id).toBe("furniture-pickup");
		expect(C18A_DEFAULT_DATA.tiers[2].id).toBe("mattress-removal");
		expect(C18A_DEFAULT_DATA.tiers[3].id).toBe("assembly-help");

		const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
		expect(iconsSource).toContain("C18ApplianceIcon");
		expect(iconsSource).toContain("C18HazardShieldIcon");
		expect(iconsSource).toContain("C18CheckIcon");
	});

	it("4. verifies demo screen navigator registration for English and Spanish", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navSource).toContain('id: "c18a-en"');
		expect(navSource).toContain('id: "c18a-es"');
		expect(navSource).toContain('route: "/appliance-intake"');
	});

	it("5. verifies route file structure and dynamic profile isolation", () => {
		const routeSource = fs.readFileSync(c18aRoutePath, "utf8");
		expect(routeSource).toContain("useCustomerProfile");
		expect(routeSource).toContain("FlowHeaderBack");
		expect(routeSource).toContain("c18a-customer-chip");

		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});
});
