import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import { C16_DEMO_ADDRESS } from "../fixtures/c16ServiceArea";

describe("C16 Service Area Eligibility — English & Spanish (Nodes 382:323 & 974:9079)", () => {
	const serviceAreaRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/service-area.tsx",
	);
	const serviceSelectedRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/service-selected.tsx",
	);
	const flowHeaderPath = path.resolve(
		__dirname,
		"../components/navigation/FlowHeaderBack.tsx",
	);
	const c16IconsPath = path.resolve(
		__dirname,
		"../components/discovery/C16Icons.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies C16 Service Area Eligibility route exists and strictly omits CustomerBottomNav", () => {
		expect(fs.existsSync(serviceAreaRoutePath)).toBe(true);
		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).not.toContain("CustomerBottomNav");
		expect(source).not.toContain("bottom-nav");
	});

	it("verifies Flow Header · Back is pinned outside ScrollView with required touch target and no notification bell", () => {
		const routeSource = fs.readFileSync(serviceAreaRoutePath, "utf8");
		const flowHeaderSource = fs.readFileSync(flowHeaderPath, "utf8");

		// FlowHeaderBack component inspection
		expect(flowHeaderSource).toContain("FlowHeaderBack");
		expect(flowHeaderSource).toContain("hitSlop");
		expect(flowHeaderSource).toContain("HAUL");
		expect(flowHeaderSource).toContain("IX");
		expect(flowHeaderSource).toContain("We Haul It All.");
		expect(flowHeaderSource).not.toContain("bell");
		expect(flowHeaderSource).not.toContain("Notification");

		// Route uses FlowHeaderBack pinned outside ScrollView
		expect(routeSource).toContain("<FlowHeaderBack");
		const headerIndex = routeSource.indexOf("<FlowHeaderBack");
		const scrollViewIndex = routeSource.indexOf("<ScrollView");
		expect(headerIndex).toBeLessThan(scrollViewIndex);
	});

	it("verifies C16Icons exports all 10 typed SVG components", () => {
		expect(fs.existsSync(c16IconsPath)).toBe(true);
		const source = fs.readFileSync(c16IconsPath, "utf8");

		expect(source).toContain("export function C16LocationPinIcon");
		expect(source).toContain("export function C16HomeIcon");
		expect(source).toContain("export function C16BuildingsIcon");
		expect(source).toContain("export function C16MapFoldIcon");
		expect(source).toContain("export function C16PostalEnvelopeIcon");
		expect(source).toContain("export function C16ShieldCheckIcon");
		expect(source).toContain("export function C16DemoCheckIcon");
		expect(source).toContain("export function C16SwapArrowsIcon");
		expect(source).toContain("export function C16CrosshairIcon");
		expect(source).toContain("export function C16InfoCircleIcon");
	});

	it("verifies step chip and screen headings match canonical Figma specifications", () => {
		expect(en.c16.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c16.stepSub).toBe("/ C16");
		expect(en.c16.title).toBe("Check your service area");
		expect(en.c16.subtitle).toBe(
			"Arizona is the only launch state. Availability depends on the exact address and service.",
		);

		expect(es.c16.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c16.stepSub).toBe("/ C16");
		expect(es.c16.title).toBe("Consulta tu zona de servicio");
		expect(es.c16.subtitle).toBe(
			"El lanzamiento es solo en Arizona. Depende de la dirección y servicio.",
		);

		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).toContain("C16StepChip");
		expect(source).toContain("C16Heading");
	});

	it("verifies dynamic profile loading uses English Sarah Mitchell and Spanish Bryan Lopez with isolation", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");

		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).toContain('testID="c16-customer-chip"');
		expect(source).toContain("getC10DemoProfile");
		expect(source).toContain("loadProfileEdits");
		expect(source).toContain("subscribeToProfileEdits");
	});

	it("verifies Requested pickup region card displays all 4 address items with exact demo values and localized labels", () => {
		expect(C16_DEMO_ADDRESS.street).toBe("1234 E Example Lane");
		expect(C16_DEMO_ADDRESS.city).toBe("Phoenix");
		expect(C16_DEMO_ADDRESS.state).toBe("Arizona");
		expect(C16_DEMO_ADDRESS.zipCode).toBe("85014");

		// English labels
		expect(en.c16.regionCardTitle).toBe("Requested pickup region");
		expect(en.c16.labelStreet).toBe("Street address");
		expect(en.c16.labelCity).toBe("City");
		expect(en.c16.labelState).toBe("State");
		expect(en.c16.labelZip).toBe("ZIP code");

		// Spanish labels
		expect(es.c16.regionCardTitle).toBe("Zona de recogida solicitada");
		expect(es.c16.labelStreet).toBe("Dirección");
		expect(es.c16.labelCity).toBe("Ciudad");
		expect(es.c16.labelState).toBe("Estado");
		expect(es.c16.labelZip).toBe("Código postal");

		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).toContain('testID="c16-pickup-region-card"');
		expect(source).toContain('testID="c16-address-street"');
		expect(source).toContain('testID="c16-address-city"');
		expect(source).toContain('testID="c16-address-state"');
		expect(source).toContain('testID="c16-address-zip"');
		expect(source).toContain("C16HomeIcon");
		expect(source).toContain("C16BuildingsIcon");
		expect(source).toContain("C16MapFoldIcon");
		expect(source).toContain("C16PostalEnvelopeIcon");
	});

	it("verifies Arizona request – Demo eligible card displays required status and caveats for both locales", () => {
		// English
		expect(en.c16.eligibilityTitle).toBe("Arizona request – Demo eligible");
		expect(en.c16.demoStatus).toBe("Completed in this demo");
		expect(en.c16.candidateArea).toBe(
			"Phoenix, AZ 85014 – Candidate service area",
		);
		expect(en.c16.eligibilityNotice).toBe(
			"Final location eligibility and capacity are validated before dispatch.",
		);

		// Spanish
		expect(es.c16.eligibilityTitle).toBe("Solicitud en Arizona · Apta en demo");
		expect(es.c16.demoStatus).toBe("Completado en esta demo");
		expect(es.c16.candidateArea).toBe("Phoenix, AZ 85014 · Zona candidata");
		expect(es.c16.eligibilityNotice).toBe(
			"La cobertura y capacidad finales se validan antes del despacho.",
		);

		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).toContain('testID="c16-eligibility-card"');
		expect(source).toContain('testID="c16-status-ribbon"');
		expect(source).toContain("C16ShieldCheckIcon");
		expect(source).toContain("C16DemoCheckIcon");
	});

	it("verifies all 4 action buttons exist and trigger truthful upcoming notices or navigation", () => {
		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).toContain('testID="c16-use-location-btn"');
		expect(source).toContain('testID="c16-change-location-btn"');
		expect(source).toContain('testID="c16-outside-zone-btn"');
		expect(source).toContain('testID="c16-permission-help-btn"');

		expect(source).toContain('pathname: "/pickup-address"');
		expect(source).toContain("noticeC16V");
		expect(source).toContain("noticeC16F");
		expect(source).toContain("noticeC16P");

		// English
		expect(en.c16.useLocationCta).toBe("Use this location");
		expect(en.c16.changeLocationCta).toBe("Choose another location   ›");
		expect(en.c16.outsideZoneCta).toBe("See outside-zone response   ›");
		expect(en.c16.permissionHelpCta).toBe("Location permission help   ›");
		expect(en.c16.noticeC17).toBe(
			"Address selection (C17) is scheduled for an upcoming phase.",
		);
		expect(en.c16.noticeC16V).toBe(
			"Location checking (C16-V) is scheduled for an upcoming phase.",
		);
		expect(en.c16.noticeC16F).toBe(
			"Outside launch area response (C16-F) is scheduled for an upcoming phase.",
		);
		expect(en.c16.noticeC16P).toBe(
			"Location permissions help (C16-P) is scheduled for an upcoming phase.",
		);

		// Spanish
		expect(es.c16.useLocationCta).toBe("Usar esta ubicación");
		expect(es.c16.changeLocationCta).toBe("Elegir otra ubicación ›");
		expect(es.c16.outsideZoneCta).toBe("Ver respuesta fuera de cobertura ›");
		expect(es.c16.permissionHelpCta).toBe("Ayuda con permiso de ubicación ›");
		expect(es.c16.noticeC17).toBe(
			"La selección de dirección de recogida (C17) estará disponible en una próxima fase.",
		);
		expect(es.c16.noticeC16V).toBe(
			"La comprobación de ubicación (C16-V) estará disponible en una próxima fase.",
		);
		expect(es.c16.noticeC16F).toBe(
			"La respuesta fuera de la zona de servicio (C16-F) estará disponible en una próxima fase.",
		);
		expect(es.c16.noticeC16P).toBe(
			"La ayuda de permisos de ubicación (C16-P) estará disponible en una próxima fase.",
		);
	});

	it("verifies back button and Android hardware back return to C15-S preserving service param", () => {
		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).toContain("BackHandler.addEventListener");
		expect(source).toContain("hardwareBackPress");
		expect(source).toContain('pathname: "/service-selected"');
		expect(source).toContain(
			"params: params.service ? { service: params.service } : undefined",
		);
	});

	it("verifies C15-S Continue CTA navigates to C16 for both English and Spanish preserving service param", () => {
		const c15sSource = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(c15sSource).toContain('pathname: "/service-area"');
		expect(c15sSource).toContain("params: { service: selectedService.id }");
	});

	it("verifies demo navigator registers both c16-en and c16-es", () => {
		const demoSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(demoSource).toContain('id: "c16-en"');
		expect(demoSource).toContain('id: "c16-es"');
		expect(demoSource).toContain('route: "/service-area"');
	});

	it("verifies no fake backend booking persistence or quote calculations", () => {
		const source = fs.readFileSync(serviceAreaRoutePath, "utf8");
		expect(source).not.toContain("fetch(");
		expect(source).not.toContain("axios");
		expect(source).not.toContain("createBooking");
	});
});
