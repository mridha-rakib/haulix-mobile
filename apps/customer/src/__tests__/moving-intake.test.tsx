import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
	saveProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C15_SERVICES } from "../fixtures/c15Services";
import {
	C18M_DEFAULT_INVENTORY_ES,
	C18M_DEFAULT_ROUTE,
	C18M_DEFAULT_ROUTE_ES,
	C18M_DEMO_CONSTANTS,
} from "../fixtures/c18mMovingIntake";

describe("C18-M Moving Service Intake — Spanish Localization (Node 977:9192)", () => {
	const c18mRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/moving-intake.tsx",
	);
	const c17dRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/moving-destination.tsx",
	);
	const c18mIconsPath = path.resolve(
		__dirname,
		"../components/discovery/C18MIcons.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
	});

	it("1. verifies exact C18-M Spanish copy from authoritative Figma Node 977:9192", () => {
		expect(es.c18m.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c18m.stepSub).toBe("  /  C18-M");
		expect(es.c18m.title).toBe("Detalles de la mudanza");
		expect(es.c18m.subtitle).toBe(
			"Ejemplo independiente HX-DEMO-MOVE-1034 · Sin cotización real.",
		);
		expect(es.c18m.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c18m.fictionalCustomerBadge).toBe(
			"DANIEL RUIZ · HX-DEMO-MOVE-1034",
		);
		expect(es.c18m.fictionalCustomerName).toBe("Daniel Ruiz · ficticio");
		expect(es.c18m.sectionARouteTitle).toBe("Ruta de mudanza");
		expect(es.c18m.labelCustomer).toBe("Cliente");
		expect(es.c18m.labelPickup).toBe("Recogida");
		expect(es.c18m.defaultPickupAddress).toBe(
			"2140 E Sample Road, Phoenix, AZ 85016",
		);
		expect(es.c18m.labelDropoff).toBe("Entrega");
		expect(es.c18m.defaultDropoffAddress).toBe(
			"5678 N Demo Avenue, Phoenix, AZ 85012",
		);
		expect(es.c18m.labelRequestedScope).toBe("Servicio solicitado");
		expect(es.c18m.defaultRequestedScope).toBe(
			"Mudanza residencial · Apartamento de 1 dormitorio",
		);
		expect(es.c18m.sectionBInventoryTitle).toBe("Inventario y acceso");
		expect(es.c18m.labelLargeItems).toBe("Objetos grandes");
		expect(es.c18m.defaultLargeItems).toBe(
			"Sofá de 2 plazas ×1; cómoda ×1; 12 cajas",
		);
		expect(es.c18m.labelEstimatedWeight).toBe("Peso estimado");
		expect(es.c18m.defaultEstimatedWeight).toBe(
			"Estimación del cliente: ~550 lb en total",
		);
		expect(es.c18m.labelOriginStairs).toBe("Escaleras en origen");
		expect(es.c18m.defaultOriginStairs).toBe("Planta baja");
		expect(es.c18m.labelDestinationStairs).toBe("Escaleras en destino");
		expect(es.c18m.defaultDestinationStairs).toBe("Un tramo, sin ascensor");
		expect(es.c18m.labelPackingRequest).toBe("Solicitud de embalaje");
		expect(es.c18m.defaultPackingRequest).toBe(
			"No se seleccionó embalaje adicional",
		);
		expect(es.c18m.sectionCAssessmentTitle).toBe(
			"Se requiere evaluar carga y personal",
		);
		expect(es.c18m.badgeReviewRequired).toBe("Revisión necesaria");
		expect(es.c18m.assessmentDescription).toBe(
			"El personal y vehículo se determinan según límites aprobados.",
		);
		expect(es.c18m.continueCta).toBe("Continuar detalles de mudanza");
		expect(es.c18m.returnServiceListCta).toBe(
			"Volver a lista de servicios   ›",
		);
		expect(es.c18m.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c18m.footerSrs).toBe(
			"SRS  BK-02, BK-03, SV-14  ·  430 px / desplazamiento vertical",
		);
		expect(es.c18m.noticeC20M).toBe(
			"La estimación de cotización de mudanza (C20-M) está programada para una próxima fase.",
		);
	});

	it("2. verifies dynamic Bryan Lopez Mendoza Spanish profile binding and booking ID", () => {
		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
		expect(C18M_DEMO_CONSTANTS.defaultBookingId).toBe("HX-DEMO-MOVE-1034");

		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("useCustomerProfile");
		expect(source).toContain("customerChipText");
		expect(source).toContain("BRYAN LOPEZ MENDOZA");
	});

	it("3. verifies Spanish profile edits reflect dynamically in real time", async () => {
		await saveProfileEdits("es", { name: "Bryan Lopez Ramirez" });
		const updatedProfile = getC10DemoProfile("es");
		expect(updatedProfile.name).toBe("Bryan Lopez Ramirez");
	});

	it("4. verifies English Sarah Mitchell profile vs Spanish Bryan Lopez isolation", () => {
		const enProfile = getC10DemoProfile("en");
		const esProfile = getC10DemoProfile("es");
		expect(enProfile.name).toBe("Sarah Mitchell");
		expect(esProfile.name).toBe("Bryan Lopez");
		expect(enProfile.name).not.toBe(esProfile.name);
	});

	it("5. verifies Moving service canonical identification", () => {
		const movingService = C15_SERVICES.find((s) => s.id === "moving");
		expect(movingService).toBeDefined();
		expect(movingService?.id).toBe("moving");

		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain('match.id === "moving"');
	});

	it("6. verifies selected pickup address preservation from C17/C17-D", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("params.pickupAddress");
		expect(source).toContain("params.selectedAddressId");
		expect(source).toContain("C17_DEFAULT_SAVED_ADDRESSES");
	});

	it("7. verifies drop-off destination preservation from C17-D", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("params.destinationAddress");
		expect(source).toContain("params.destinationCityStateZip");
		expect(source).toContain("defaultDropoffAddress");
	});

	it("8. verifies Spanish Moving scope matches Figma exactly", () => {
		expect(es.c18m.labelRequestedScope).toBe("Servicio solicitado");
		expect(es.c18m.defaultRequestedScope).toBe(
			"Mudanza residencial · Apartamento de 1 dormitorio",
		);
		expect(C18M_DEFAULT_ROUTE_ES.requestedScope).toBe(
			"Mudanza residencial · Apartamento de 1 dormitorio",
		);
	});

	it("9. verifies all 5 Inventory & access detail rows match Spanish Figma", () => {
		expect(es.c18m.sectionBInventoryTitle).toBe("Inventario y acceso");
		expect(es.c18m.labelLargeItems).toBe("Objetos grandes");
		expect(es.c18m.defaultLargeItems).toBe(
			"Sofá de 2 plazas ×1; cómoda ×1; 12 cajas",
		);
		expect(es.c18m.labelEstimatedWeight).toBe("Peso estimado");
		expect(es.c18m.defaultEstimatedWeight).toBe(
			"Estimación del cliente: ~550 lb en total",
		);
		expect(es.c18m.labelOriginStairs).toBe("Escaleras en origen");
		expect(es.c18m.defaultOriginStairs).toBe("Planta baja");
		expect(es.c18m.labelDestinationStairs).toBe("Escaleras en destino");
		expect(es.c18m.defaultDestinationStairs).toBe("Un tramo, sin ascensor");
		expect(es.c18m.labelPackingRequest).toBe("Solicitud de embalaje");
		expect(es.c18m.defaultPackingRequest).toBe(
			"No se seleccionó embalaje adicional",
		);
	});

	it("10. verifies customer estimated weight disclaimer without claiming independent weighing", () => {
		expect(C18M_DEFAULT_INVENTORY_ES.estimatedWeight).toContain(
			"Estimación del cliente",
		);
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("estimatedWeight");
	});

	it("11. verifies original review checkmark vector (18 × 18, amber #FFC85A)", () => {
		const iconsSource = fs.readFileSync(c18mIconsPath, "utf8");
		expect(iconsSource).toContain("C18MReviewCheckIcon");
		expect(iconsSource).toContain("#FFC85A");
		expect(iconsSource).toContain("M3 9.75L6.75 13.5L15 5.25");
	});

	it("12. verifies Section C pending crew assessment status and guidance", () => {
		expect(es.c18m.sectionCAssessmentTitle).toBe(
			"Se requiere evaluar carga y personal",
		);
		expect(es.c18m.badgeReviewRequired).toBe("Revisión necesaria");
		expect(es.c18m.assessmentDescription).toBe(
			"El personal y vehículo se determinan según límites aprobados.",
		);
	});

	it("13. verifies neutral non-leaking runtime demo explanation in live flow", () => {
		expect(es.c18m.runtimeClarification).toBe(
			"Esta solicitud de mudanza es una demostración y no modifica otras reservas.",
		);
		expect(es.c18m.figmaStaticClarification).toBe(
			"Es distinto del retiro de objetos solicitado por Sarah.",
		);

		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("isFictional");
		expect(source).toContain("runtimeClarification");
	});

	it("14. verifies Spanish C17-D navigates directly to C18-M on Continue CTA", () => {
		const c17dSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(c17dSource).toContain('pathname: "/moving-intake"');
		expect(c17dSource).toContain("handleContinue");
	});

	it("15. verifies Header Back button navigation preserves safe fallback", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("FlowHeaderBack");
		expect(source).toContain("handleBack");
		expect(source).toContain('pathname: "/moving-destination"');
	});

	it("16. verifies Android hardware back press returns safely to C17-D", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("BackHandler.addEventListener");
		expect(source).toContain("hardwareBackPress");
		expect(source).toContain("useHardwareBack(handleBack)");
	});

	it("17. verifies secondary CTA Return to service list navigates to C15", () => {
		expect(es.c18m.returnServiceListCta).toBe(
			"Volver a lista de servicios   ›",
		);
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("handleReturnToServiceList");
		expect(source).toContain('pathname: "/service-discovery"');
		expect(source).toContain('service: "moving"');
	});

	it("18. verifies primary CTA connects to canonical C20-M moving access route", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("handleContinue");
		expect(source).toContain('pathname: "/moving-access"');
	});

	it("19. verifies non-Moving service triggers informative notice without creating moving booking", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("isMoving");
		expect(source).toContain("noticeNonMoving");
	});

	it("20. verifies unsupported service ID handling", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("isUnsupported");
		expect(source).toContain("noticeUnsupportedService");
	});

	it("21. verifies no fake quote or production booking simulation", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).not.toContain("fakeQuote");
		expect(source).not.toContain("confirmBooking");
		expect(es.c18m.footerDemo).toContain("SOLO DEMO");
	});

	it("22. verifies direct QA route registered in DemoScreenNavigator for Spanish C18-M", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navSource).toContain('id: "c18m-es"');
		expect(navSource).toContain('route: "/moving-intake"');
		expect(navSource).toContain('locale: "es"');
		expect(navSource).toContain('figmaNode: "Node 977:9192"');
	});

	it("23. verifies 13 semantic icons reused without duplicates or photographic hero images", () => {
		const iconsSource = fs.readFileSync(c18mIconsPath, "utf8");
		expect(iconsSource).toContain("C18MCheckIcon");
		expect(iconsSource).toContain("C18MReviewCheckIcon");
		expect(iconsSource).toContain("C18MUserIcon");
		expect(iconsSource).toContain("C18MPickupPinIcon");
		expect(iconsSource).toContain("C18MDropoffPinIcon");
		expect(iconsSource).toContain("C18MScopeIcon");
		expect(iconsSource).toContain("C18MRouteIcon");
		expect(iconsSource).toContain("C18MInventoryIcon");
		expect(iconsSource).toContain("C18MLargeItemsIcon");
		expect(iconsSource).toContain("C18MWeightIcon");
		expect(iconsSource).toContain("C18MStairsIcon");
		expect(iconsSource).toContain("C18MPackageIcon");
		expect(iconsSource).toContain("C18MCrewShieldIcon");

		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).not.toContain("<Image");
		expect(source).not.toContain("stockPhoto");
	});

	it("24. verifies narrow-screen text wrapping and layout flexibility", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("flexWrap");
		expect(source).toContain("flexShrink");
	});

	it("25. verifies English C18-M regression passes intact", () => {
		expect(en.c18m.title).toBe("Moving details");
		expect(en.c18m.continueCta).toBe("Continue moving details");
		expect(en.c18m.labelRequestedScope).toBe("Requested scope");
		expect(C18M_DEFAULT_ROUTE.requestedScope).toBe(
			"Household moving · 1-bedroom apartment",
		);
	});

	it("26. verifies English and Spanish C17-D regression passes intact", () => {
		expect(en.c17d.title).toBe("Where is the drop-off?");
		expect(es.c17d.title).toBe("¿Dónde se realiza la entrega?");
		expect(en.c17d.continueCta).toBe("Continue moving intake");
		expect(es.c17d.continueCta).toBe("Continuar solicitud de mudanza");
	});
});
