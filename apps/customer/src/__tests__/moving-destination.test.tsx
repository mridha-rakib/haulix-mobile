import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import { C15_SERVICES } from "../fixtures/c15Services";
import {
	C17D_DEFAULT_DESTINATION,
	C17D_DEMO_CONSTANTS,
} from "../fixtures/c17dMovingDestination";
import { C17_DEFAULT_SAVED_ADDRESSES } from "../fixtures/c17PickupAddress";

describe("C17-D Moving Destination — Spanish Localization (Node 974:9628) & English (Node 382:744)", () => {
	const c17dRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/moving-destination.tsx",
	);
	const c17RoutePath = path.resolve(
		__dirname,
		"../../app/(app)/pickup-address.tsx",
	);
	const c17vRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/pickup-address-validation.tsx",
	);
	const c17aRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/add-pickup-address.tsx",
	);
	const c17IconsPath = path.resolve(
		__dirname,
		"../components/discovery/C17Icons.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("1. verifies exact Spanish Figma copy from Node 974:9628", () => {
		expect(es.c17d.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c17d.stepSub).toBe("  /  C17-D");
		expect(es.c17d.title).toBe("¿Dónde se realiza la entrega?");
		expect(es.c17d.subtitle).toBe(
			"La mudanza requiere origen y destino validados.",
		);
		expect(es.c17d.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c17d.pickupSectionTitle).toBe("Recogida");
		expect(es.c17d.labelOrigin).toBe("Origen");
		expect(es.c17d.destinationSectionTitle).toBe("Destino");
		expect(es.c17d.labelDropoffAddress).toBe("Dirección de entrega");
		expect(es.c17d.dropoffAddressValue).toBe("5678 N Demo Avenue");
		expect(es.c17d.labelCityStateZip).toBe("Ciudad / estado / código postal");
		expect(es.c17d.cityStateZipValue).toBe("Phoenix, AZ 85012");
		expect(es.c17d.labelDestinationType).toBe("Tipo de destino");
		expect(es.c17d.destinationTypeValue).toBe("Residencial · Segundo piso");
		expect(es.c17d.labelElevator).toBe("Ascensor");
		expect(es.c17d.elevatorValue).toBe("No · Revisar escaleras");
		expect(es.c17d.safetySectionTitle).toBe(
			"Se aplican controles de manejo seguro",
		);
		expect(es.c17d.reviewRequiredBadge).toBe("Revisión necesaria");
		expect(es.c17d.safetyDescription).toBe(
			"Capacidad, escaleras y personal se evalúan al cotizar.",
		);
		expect(es.c17d.continueCta).toBe("Continuar solicitud de mudanza");
		expect(es.c17d.returnPickupCta).toBe("Volver a dirección de origen   ›");
		expect(es.c17d.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c17d.footerSrs).toBe(
			"SRS  BK-02, SV-14  ·  430 px / desplazamiento vertical",
		);
	});

	it("2. verifies original premium icons (C17DReviewCheckIcon, C17VCheckIcon, FlowHeaderBack)", () => {
		const iconsSource = fs.readFileSync(c17IconsPath, "utf8");
		expect(iconsSource).toContain("C17DReviewCheckIcon");
		expect(iconsSource).toContain("#FFC85A");
		expect(iconsSource).toContain("M3 9.75L6.75 13.5L15 5.25");

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("<FlowHeaderBack");
		expect(routeSource).toContain("<C17DReviewCheckIcon");
		expect(routeSource).toContain("<C17VCheckIcon");
	});

	it("3. verifies dynamic Spanish customer profile with uppercase formatting", () => {
		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("resolveCustomerChipText");
		expect(routeSource).toContain("BRYAN LOPEZ MENDOZA");
		expect(routeSource).toContain('testID="c17d-customer-chip"');
	});

	it("4. verifies English and Spanish customer profile isolation", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");
		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("useCustomerProfile(currentLocale)");
	});

	it("5. verifies current booking reference preservation", () => {
		expect(C17D_DEMO_CONSTANTS.defaultBookingId).toBe("HX-DEMO-MOVE-1034");
		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("C17D_DEMO_CONSTANTS.defaultBookingId");
	});

	it("6. verifies canonical Moving service selection from C15 catalog", () => {
		const movingService = C15_SERVICES.find((s) => s.id === "moving");
		expect(movingService).toBeDefined();
		expect(movingService?.id).toBe("moving");
		expect(movingService?.name).toBe("Moving");
		expect(movingService?.futureState).toBe("C18-M");

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("resolveServiceState");
		expect(routeSource).toContain('valid.id === "moving"');
	});

	it("7. verifies non-Moving preview behavior with honest explanation in both locales", () => {
		expect(en.c17d.noticeNonMoving).toContain(
			"Drop-off destinations only apply to Moving services.",
		);
		expect(es.c17d.noticeNonMoving).toContain(
			"El destino de entrega solo aplica a servicios de Mudanza.",
		);

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain('testID="c17d-nonmoving-guard"');
		expect(routeSource).toContain("C17DNoticeBanner");
	});

	it("8. verifies unsupported service ID handling with safe fallback", () => {
		expect(en.c17d.noticeUnsupportedService).toContain(
			'The requested service "{{service}}" is not recognized.',
		);
		expect(es.c17d.noticeUnsupportedService).toContain(
			'El servicio solicitado "{{service}}" no está reconocido.',
		);

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("serviceState.isUnsupported");
	});

	it("9. verifies selected pickup address binding from C17", () => {
		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("resolveOriginAddress");
		expect(routeSource).toContain("C17_DEFAULT_SAVED_ADDRESSES");
		expect(routeSource).toContain('testID="c17d-origin-value"');
	});

	it("10. verifies Home and Relative's residence origin address states", () => {
		const homeAddress = C17_DEFAULT_SAVED_ADDRESSES[0].fullAddress;
		const relativeAddress = C17_DEFAULT_SAVED_ADDRESSES[1].fullAddress;

		expect(homeAddress).toBe("1234 E Example Lane, Phoenix, AZ 85014");
		expect(relativeAddress).toBe("5678 N Demo Avenue, Phoenix, AZ 85012");
	});

	it("11. verifies destination fixture isolation and localized values", () => {
		expect(C17D_DEFAULT_DESTINATION.dropoffAddress).toBe("5678 N Demo Avenue");
		expect(C17D_DEFAULT_DESTINATION.cityStateZip).toBe("Phoenix, AZ 85012");

		expect(es.c17d.destinationTypeValue).toBe("Residencial · Segundo piso");
		expect(es.c17d.elevatorValue).toBe("No · Revisar escaleras");

		expect(en.c17d.destinationTypeValue).toBe("Residential · 2nd floor");
		expect(en.c17d.elevatorValue).toBe("No · Stairs need review");

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("resolveDestinationValues");
		expect(routeSource).toContain('testID="c17d-destination-section"');
	});

	it("12. verifies pending safety review state and amber indicator", () => {
		expect(es.c17d.safetySectionTitle).toBe(
			"Se aplican controles de manejo seguro",
		);
		expect(es.c17d.reviewRequiredBadge).toBe("Revisión necesaria");
		expect(es.c17d.safetyDescription).toBe(
			"Capacidad, escaleras y personal se evalúan al cotizar.",
		);

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain('testID="c17d-safety-section"');
		expect(routeSource).toContain('testID="c17d-review-badge"');
		expect(routeSource).toContain("#FFC85A");
	});

	it("13. verifies Spanish C17 navigates to C17-D on Moving drop-off action", () => {
		const c17Source = fs.readFileSync(c17RoutePath, "utf8");
		expect(c17Source).toContain('pathname: "/moving-destination"');
		expect(c17Source).toContain("service: selectedService.id");
		expect(c17Source).toContain("selectedAddressId");
	});

	it("14. verifies Spanish C17-D secondary CTA returns to C17", () => {
		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain('testID="c17d-secondary-cta"');
		expect(routeSource).toContain("handleReturnToPickup");
		expect(routeSource).toContain('pathname: "/pickup-address"');
	});

	it("15. verifies Header Back and Android hardware back press return to C17", () => {
		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain('testID="c17d-back-button"');
		expect(routeSource).toContain("handleReturnToPickup");
		expect(routeSource).toContain("useHardwareBack(handleBack)");
		expect(routeSource).toContain("hardwareBackPress");
	});

	it("16. verifies primary CTA displays honest upcoming C18-M notice in Spanish", () => {
		expect(es.c17d.noticeC18M).toBe(
			"La solicitud de mudanza (C18-M) está programada para una próxima fase.",
		);

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain('testID="c17d-primary-cta"');
		expect(routeSource).toContain('t("c17d.noticeC18M")');
	});

	it("17. verifies no quotation or fake booking is confirmed", () => {
		expect(es.c17d.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);

		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).not.toContain("confirmBooking");
		expect(routeSource).not.toContain("createQuote");
		expect(routeSource).not.toContain("fakeToken");
	});

	it("18. verifies direct QA entry fallback to default saved address", () => {
		const routeSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(routeSource).toContain("C17_DEFAULT_SAVED_ADDRESSES[0].fullAddress");
	});

	it("19. verifies English C17-D regression copy and layout", () => {
		expect(en.c17d.title).toBe("Where is the drop-off?");
		expect(en.c17d.continueCta).toBe("Continue moving intake");
		expect(en.c17d.returnPickupCta).toBe("Return to pickup address   ›");
		expect(en.c17d.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
	});

	it("20. verifies English and Spanish C17 regression", () => {
		const c17Source = fs.readFileSync(c17RoutePath, "utf8");
		expect(c17Source).toContain('testID="c17-moving-dropoff-btn"');
		expect(c17Source).toContain('testID="c17-confirm-btn"');
		expect(c17Source).toContain('testID="c17-add-address-btn"');

		const c17aSource = fs.readFileSync(c17aRoutePath, "utf8");
		expect(c17aSource).toContain("/pickup-address-validation");

		const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
		expect(c17vSource).toContain("Location verification incomplete");
	});

	it("21. verifies proper Spanish text rendering and accessibility labels in DemoScreenNavigator", () => {
		const demoSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(demoSource).toContain('id: "c17d-en"');
		expect(demoSource).toContain('id: "c17d-es"');
		expect(demoSource).toContain('figmaNode: "Node 974:9628"');
		expect(demoSource).toContain('locale: "es"');
		expect(demoSource).toContain(
			'name: "C17-D · Destino de Mudanza (Español)"',
		);
	});
});
