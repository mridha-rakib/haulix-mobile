import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C18RE_DEFAULT_DATA } from "../fixtures/c18reRetailMissing";

describe("C18-R-E Retail Missing Order — English (Node 382:1197) & Spanish (Node 980:9247)", () => {
	const c18reRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/retail-order-missing.tsx",
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

	it("1. verifies exact English copy from Figma Node 382:1197", () => {
		expect(en.c18re.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c18re.stepSub).toBe("  /  C18-R");
		expect(en.c18re.title).toBe("Order information needed");
		expect(en.c18re.subtitle).toBe(
			"Manual retailer collection requires enough details for authorized pickup.",
		);
		expect(en.c18re.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c18re.validationCardTitle).toBe("Validation");
		expect(en.c18re.labelRetailer).toBe("Retailer");
		expect(en.c18re.retailerValue).toBe("Home Depot");
		expect(en.c18re.labelOrderNumber).toBe("Order number");
		expect(en.c18re.orderNumberValue).toBe("Missing — required");
		expect(en.c18re.labelStoreLocation).toBe("Store location");
		expect(en.c18re.storeLocationValue).toBe(
			"Phoenix, AZ · store branch not selected",
		);
		expect(en.c18re.cannotProceedTitle).toBe("Cannot proceed yet");
		expect(en.c18re.actionRequiredBadge).toBe("Action required");
		expect(en.c18re.errorGuidance).toBe(
			"Enter the customer's store order identifier and confirm collection instructions.",
		);
		expect(en.c18re.errorDisclaimer).toBe(
			"No store account integration or automatic order lookup is promised.",
		);
		expect(en.c18re.continueCta).toBe("Edit retail details");
		expect(en.c18re.backSelectionCta).toBe("Back to service selection   ›");
		expect(en.c18re.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c18re.footerSrs).toBe(
			"SRS  BK-14, SV-05  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 980:9247", () => {
		expect(es.c18re.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
		expect(es.c18re.stepSub).toBe("  /  C18-R");
		expect(es.c18re.title).toBe("Se necesitan datos del pedido");
		expect(es.c18re.subtitle).toBe(
			"La recogida manual requiere datos suficientes para retirar el pedido autorizado.",
		);
		expect(es.c18re.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c18re.validationCardTitle).toBe("Validación");
		expect(es.c18re.labelRetailer).toBe("Comercio");
		expect(es.c18re.retailerValue).toBe("Home Depot");
		expect(es.c18re.labelOrderNumber).toBe("Número de pedido");
		expect(es.c18re.orderNumberValue).toBe("Falta información obligatoria");
		expect(es.c18re.labelStoreLocation).toBe("Ubicación de la tienda");
		expect(es.c18re.storeLocationValue).toBe(
			"Phoenix, AZ · Sucursal no seleccionada",
		);
		expect(es.c18re.cannotProceedTitle).toBe("Aún no se puede continuar");
		expect(es.c18re.actionRequiredBadge).toBe("Acción necesaria");
		expect(es.c18re.errorGuidance).toBe(
			"Introduce el pedido de tienda y confirma instrucciones de recogida.",
		);
		expect(es.c18re.errorDisclaimer).toBe(
			"No se promete integración con cuenta de tienda ni consulta automática.",
		);
		expect(es.c18re.continueCta).toBe("Editar datos de tienda");
		expect(es.c18re.backSelectionCta).toBe("Volver a elegir servicio   ›");
		expect(es.c18re.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c18re.footerSrs).toBe(
			"SRS  BK-14, SV-05  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. verifies fixture and error icons", () => {
		expect(C18RE_DEFAULT_DATA.retailerName).toBe("Home Depot");
		expect(C18RE_DEFAULT_DATA.orderNumberStatus).toBe("Missing — required");

		const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
		expect(iconsSource).toContain("C18AlertTriangleIcon");
		expect(iconsSource).toContain("C18CheckIcon");
	});

	it("4. verifies demo screen navigator registration for English and Spanish", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navSource).toContain('id: "c18re-en"');
		expect(navSource).toContain('id: "c18re-es"');
		expect(navSource).toContain('route: "/retail-order-missing"');
	});

	it("5. verifies route file structure and dynamic profile isolation", () => {
		const routeSource = fs.readFileSync(c18reRoutePath, "utf8");
		expect(routeSource).toContain("useCustomerProfile");
		expect(routeSource).toContain("FlowHeaderBack");
		expect(routeSource).toContain("c18re-customer-chip");
		expect(routeSource).toContain("c18re-error-card");

		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});
});
