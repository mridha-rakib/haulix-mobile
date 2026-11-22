import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C18T_DEFAULT_DATA } from "../fixtures/c18tMattressIntake";

describe("C18-T Mattress Removal Intake — English (Node 387:274) & Spanish (Node 977:9685)", () => {
	const c18tRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/mattress-intake.tsx",
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

	it("1. verifies exact English copy from Figma Node 387:274", () => {
		expect(en.c18t.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c18t.stepSub).toBe("  /  C18-T");
		expect(en.c18t.title).toBe("Mattress removal details");
		expect(en.c18t.subtitle).toBe(
			"Confirm size, quantity, stair access and disposal suitability.",
		);
		expect(en.c18t.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c18t.tiersCardTitle).toBe("Services and optional paid extras");
		expect(en.c18t.detailsCardTitle).toBe("Mattress removal · item details");
		expect(en.c18t.labelItem).toBe("Item");
		expect(en.c18t.itemValue).toBe("Queen mattress");
		expect(en.c18t.labelQuantity).toBe("Quantity");
		expect(en.c18t.quantityValue).toBe("2");
		expect(en.c18t.labelSize).toBe("Approximate size");
		expect(en.c18t.sizeValue).toBe("80 × 60 × 11 in each");
		expect(en.c18t.labelWeight).toBe("Estimated weight");
		expect(en.c18t.weightValue).toBe("~70 lb each · customer estimate");
		expect(en.c18t.labelAccess).toBe("Access");
		expect(en.c18t.accessValue).toBe("Ground floor · driveway pickup");
		expect(en.c18t.handlingCardTitle).toBe("Additional handling check");
		expect(en.c18t.reviewBadge).toBe("Review required");
		expect(en.c18t.handlingNotice1).toBe(
			"Local disposal acceptance and worker/vehicle capacity remain conditional.",
		);
		expect(en.c18t.handlingNotice2).toBe(
			"Customer describes condition; treatment or special disposal is not assumed.",
		);
		expect(en.c18t.continueCta).toBe("Review mattress removal intake");
		expect(en.c18t.categoriesCta).toBe("See service categories   ›");
		expect(en.c18t.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c18t.footerSrs).toBe(
			"SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 977:9685", () => {
		expect(es.c18t.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
		expect(es.c18t.stepSub).toBe("  /  C18-T");
		expect(es.c18t.title).toBe("Detalles de retiro de colchones");
		expect(es.c18t.subtitle).toBe(
			"Confirma tamaño, cantidad, acceso a escaleras y viabilidad de eliminación.",
		);
		expect(es.c18t.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c18t.tiersCardTitle).toBe(
			"Servicios y extras opcionales de pago",
		);
		expect(es.c18t.detailsCardTitle).toBe(
			"Retiro de colchones · detalles del objeto",
		);
		expect(es.c18t.labelItem).toBe("Objeto");
		expect(es.c18t.itemValue).toBe("Colchón queen");
		expect(es.c18t.labelQuantity).toBe("Cantidad");
		expect(es.c18t.quantityValue).toBe("2");
		expect(es.c18t.labelSize).toBe("Tamaño aproximado");
		expect(es.c18t.sizeValue).toBe("80 × 60 × 11 pulg. cada uno");
		expect(es.c18t.labelWeight).toBe("Peso estimado");
		expect(es.c18t.weightValue).toBe(
			"~70 lb cada uno · Estimación del cliente",
		);
		expect(es.c18t.labelAccess).toBe("Acceso");
		expect(es.c18t.accessValue).toBe("Planta baja · Recogida desde entrada");
		expect(es.c18t.handlingCardTitle).toBe("Control de manejo adicional");
		expect(es.c18t.reviewBadge).toBe("Revisión necesaria");
		expect(es.c18t.handlingNotice1).toBe(
			"Eliminación local y capacidad de personal/vehículo sujetas a validación.",
		);
		expect(es.c18t.handlingNotice2).toBe(
			"El cliente describe el estado; no se presupone tratamiento especial.",
		);
		expect(es.c18t.continueCta).toBe("Revisar retiro de colchones");
		expect(es.c18t.categoriesCta).toBe("Ver categorías de servicio   ›");
		expect(es.c18t.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c18t.footerSrs).toBe(
			"SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. verifies tier structure in fixture and icons", () => {
		expect(C18T_DEFAULT_DATA.tiers).toHaveLength(4);
		expect(C18T_DEFAULT_DATA.tiers[0].id).toBe("mattress-removal");
		expect(C18T_DEFAULT_DATA.tiers[1].id).toBe("appliance-removal");
		expect(C18T_DEFAULT_DATA.tiers[2].id).toBe("furniture-pickup");
		expect(C18T_DEFAULT_DATA.tiers[3].id).toBe("assembly-help");

		const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
		expect(iconsSource).toContain("C18MattressIcon");
		expect(iconsSource).toContain("C18HazardShieldIcon");
		expect(iconsSource).toContain("C18CheckIcon");
	});

	it("4. verifies demo screen navigator registration for English and Spanish", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navSource).toContain('id: "c18t-en"');
		expect(navSource).toContain('id: "c18t-es"');
		expect(navSource).toContain('route: "/mattress-intake"');
	});

	it("5. verifies route file structure and dynamic profile isolation", () => {
		const routeSource = fs.readFileSync(c18tRoutePath, "utf8");
		expect(routeSource).toContain("useCustomerProfile");
		expect(routeSource).toContain("FlowHeaderBack");
		expect(routeSource).toContain("c18t-customer-chip");

		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});
});
