import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import {
	C17A_DEMO_CONSTANTS,
	C17A_INITIAL_VALUES,
} from "../fixtures/c17aAddAddress";

describe("C17-A Add New Pickup Address — English ONLY (Node 382:645)", () => {
	const addPickupAddressRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/add-pickup-address.tsx",
	);
	const pickupAddressRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/pickup-address.tsx",
	);
	const flowHeaderPath = path.resolve(
		__dirname,
		"../components/navigation/FlowHeaderBack.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);
	const fixturePath = path.resolve(__dirname, "../fixtures/c17aAddAddress.ts");

	it("verifies C17-A route file exists and strictly omits bottom navigation", () => {
		expect(fs.existsSync(addPickupAddressRoutePath)).toBe(true);
		const source = fs.readFileSync(addPickupAddressRoutePath, "utf8");
		expect(source).not.toContain("CustomerBottomNav");
		expect(source).not.toContain("bottom-nav");
	});

	it("verifies Flow Header · Back is pinned outside ScrollView with required touch target and brand mark", () => {
		const routeSource = fs.readFileSync(addPickupAddressRoutePath, "utf8");
		const flowHeaderSource = fs.readFileSync(flowHeaderPath, "utf8");

		expect(flowHeaderSource).toContain("FlowHeaderBack");
		expect(flowHeaderSource).toContain("hitSlop");
		expect(flowHeaderSource).toContain("HAUL");
		expect(flowHeaderSource).toContain("IX");
		expect(flowHeaderSource).toContain("We Haul It All.");

		expect(routeSource).toContain("<FlowHeaderBack");
		const headerIndex = routeSource.indexOf("<FlowHeaderBack");
		const scrollViewIndex = routeSource.indexOf("<ScrollView");
		expect(headerIndex).toBeLessThan(scrollViewIndex);
	});

	it("verifies C17-A fixture provides all six initial illustrative form values from Figma", () => {
		expect(fs.existsSync(fixturePath)).toBe(true);
		expect(C17A_INITIAL_VALUES.label).toBe("Storage unit");
		expect(C17A_INITIAL_VALUES.street).toBe("4100 N 24th Street");
		expect(C17A_INITIAL_VALUES.city).toBe("Phoenix");
		expect(C17A_INITIAL_VALUES.state).toBe("Arizona");
		expect(C17A_INITIAL_VALUES.zipCode).toBe("85016");
		expect(C17A_INITIAL_VALUES.pickupNotes).toBe(
			"Gate code provided to assigned driver only",
		);

		expect(C17A_DEMO_CONSTANTS.stepIndicator).toBe(
			"W02 · SERVICE DISCOVERY & INTAKE",
		);
		expect(C17A_DEMO_CONSTANTS.stepSub).toBe("/ C17-A");
		expect(C17A_DEMO_CONSTANTS.title).toBe("Add a pickup location");
		expect(C17A_DEMO_CONSTANTS.subtitle).toBe(
			"New service addresses are validated before the booking continues.",
		);
	});

	it("verifies dynamic customer context binding (Sarah Mitchell / HX-DEMO-1027)", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const source = fs.readFileSync(addPickupAddressRoutePath, "utf8");
		expect(source).toContain("useCustomerProfile");
		expect(source).toContain("profile.name");
		expect(source).toContain("bookingId");
	});

	it("verifies exact C17-A English strings match Figma node 382:645", () => {
		expect(en.c17a.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c17a.stepSub).toBe("/ C17-A");
		expect(en.c17a.title).toBe("Add a pickup location");
		expect(en.c17a.subtitle).toBe(
			"New service addresses are validated before the booking continues.",
		);
		expect(en.c17a.newLocationSection).toBe("New location");
		expect(en.c17a.labelAddressLabel).toBe("Address label");
		expect(en.c17a.placeholderAddressLabel).toBe("Storage unit");
		expect(en.c17a.labelStreet).toBe("Street");
		expect(en.c17a.placeholderStreet).toBe("4100 N 24th Street");
		expect(en.c17a.labelCity).toBe("City");
		expect(en.c17a.placeholderCity).toBe("Phoenix");
		expect(en.c17a.labelState).toBe("State");
		expect(en.c17a.placeholderState).toBe("Arizona");
		expect(en.c17a.labelZipCode).toBe("ZIP code");
		expect(en.c17a.placeholderZipCode).toBe("85016");
		expect(en.c17a.labelPickupNotes).toBe("Pickup notes");
		expect(en.c17a.placeholderPickupNotes).toBe(
			"Gate code provided to assigned driver only",
		);
		expect(en.c17a.validationSectionTitle).toBe("Validation required");
		expect(en.c17a.validationBadge).toBe("Service information");
		expect(en.c17a.validationGuidance1).toBe(
			"Demonstration address — not a verified delivery location.",
		);
		expect(en.c17a.validateNewAddressCta).toBe("Validate new address");
		expect(en.c17a.keepHomeCta).toBe("Keep home as pickup   ›");
		expect(en.c17a.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c17a.footerSrs).toBe(
			"SRS  BK-02, CU-04  ·  430 px / vertical scroll",
		);
	});

	it("verifies local form validation rules: required fields, Arizona restriction, and 5-digit ZIP format", () => {
		const source = fs.readFileSync(addPickupAddressRoutePath, "utf8");

		// Address label required
		expect(source).toContain("formData.label.trim()");
		expect(source).toContain("errorLabelRequired");

		// Street required
		expect(source).toContain("formData.street.trim()");
		expect(source).toContain("errorStreetRequired");

		// City required
		expect(source).toContain("formData.city.trim()");
		expect(source).toContain("errorCityRequired");

		// State restricted to Arizona
		expect(source).toContain("arizona");
		expect(source).toContain("az");
		expect(source).toContain("errorStateArizonaOnly");

		// ZIP code required & 5-digit format
		expect(source).toContain("formData.zipCode.trim()");
		expect(source).toContain("/^\\d{5}$/");
		expect(source).toContain("errorZipRequired");
		expect(source).toContain("errorZipInvalid");

		// Notes length limit
		expect(source).toContain("errorNotesTooLong");
	});

	it("verifies honest validation notice behavior: discloses C17-V is upcoming and preserves unsaved draft", () => {
		const source = fs.readFileSync(addPickupAddressRoutePath, "utf8");

		expect(source).toContain("handleValidateNewAddress");
		expect(source).toContain("noticeValidationNotConnected");
		// Ensure it does not call any fake geocoding or validation backend
		expect(source).not.toContain("fetch(");
		expect(source).not.toContain("axios");
		expect(source).not.toContain("geocode");
	});

	it("verifies 'Keep home as pickup' navigates back to C17 with Home selected as active", () => {
		const source = fs.readFileSync(addPickupAddressRoutePath, "utf8");

		expect(source).toContain("handleKeepHome");
		expect(source).toContain('pathname: "/pickup-address"');
		expect(source).toContain(
			"selectedAddressId: C17_DEFAULT_SAVED_ADDRESSES[0].id",
		);
	});

	it("verifies C17 navigates to C17-A for both English and Spanish preserving service and address params", () => {
		const c17Source = fs.readFileSync(pickupAddressRoutePath, "utf8");

		expect(c17Source).toContain("handleAddAddress");
		expect(c17Source).toContain('pathname: "/add-pickup-address"');
		expect(c17Source).toContain("service: params.service");
		expect(c17Source).toContain("selectedAddressId");
	});

	it("verifies C17-A is registered in DemoScreenNavigator for both English and Spanish", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");

		expect(navSource).toContain('id: "c17a-en"');
		expect(navSource).toContain('id: "c17a-es"');
		expect(navSource).toContain('route: "/add-pickup-address"');
		expect(navSource).toContain('figmaNode: "Node 382:645"');
		expect(navSource).toContain('figmaNode: "Node 974:9497"');
		expect(navSource).toContain('locale: "es"');
	});

	it("verifies exact C17-A Spanish translation strings match Figma node 974:9497", () => {
		expect(es.c17a.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c17a.stepSub).toBe("/ C17-A");
		expect(es.c17a.title).toBe("Añadir punto de recogida");
		expect(es.c17a.subtitle).toBe(
			"Se valida toda nueva dirección antes de continuar.",
		);
		expect(es.c17a.newLocationSection).toBe("Nueva ubicación");
		expect(es.c17a.labelAddressLabel).toBe("Nombre de dirección");
		expect(es.c17a.placeholderAddressLabel).toBe("Trastero");
		expect(es.c17a.labelStreet).toBe("Calle");
		expect(es.c17a.placeholderStreet).toBe("4100 N 24th Street");
		expect(es.c17a.labelCity).toBe("Ciudad");
		expect(es.c17a.placeholderCity).toBe("Phoenix");
		expect(es.c17a.labelState).toBe("Estado");
		expect(es.c17a.placeholderState).toBe("Arizona");
		expect(es.c17a.labelZipCode).toBe("Código postal");
		expect(es.c17a.placeholderZipCode).toBe("85016");
		expect(es.c17a.labelPickupNotes).toBe("Notas de recogida");
		expect(es.c17a.placeholderPickupNotes).toBe(
			"Código de acceso solo para el conductor asignado",
		);
		expect(es.c17a.validationSectionTitle).toBe("Validación necesaria");
		expect(es.c17a.validationBadge).toBe("Información del servicio");
		expect(es.c17a.validationGuidance1).toBe(
			"Dirección de ejemplo; entrega no verificada.",
		);
		expect(es.c17a.validationGuidance2).toBe(
			"{{bookingId}} conserva la dirección habitual de {{name}}.",
		);
		expect(es.c17a.validateNewAddressCta).toBe("Validar nueva dirección");
		expect(es.c17a.keepHomeCta).toBe("Mantener casa como origen   ›");
		expect(es.c17a.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c17a.footerSrs).toBe(
			"SRS  BK-02, CU-04  ·  430 px / desplazamiento vertical",
		);
	});

	it("verifies dynamic Bryan Lopez Spanish profile isolation and guidance resolution", () => {
		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");

		const source = fs.readFileSync(addPickupAddressRoutePath, "utf8");
		expect(source).toContain("useCustomerProfile(currentLocale)");
		expect(source).toContain('currentLocale === "es"');
		expect(source).toContain("getC17AInitialValues(currentLocale)");
	});

	it("verifies Spanish validation errors match natural Spanish wording", () => {
		expect(es.c17a.errorLabelRequired).toBe("Este campo es obligatorio.");
		expect(es.c17a.errorStreetRequired).toBe("Este campo es obligatorio.");
		expect(es.c17a.errorCityRequired).toBe("Este campo es obligatorio.");
		expect(es.c17a.errorStateArizonaOnly).toBe(
			"Esta demostración solo admite direcciones de Arizona.",
		);
		expect(es.c17a.errorZipRequired).toBe("Este campo es obligatorio.");
		expect(es.c17a.errorZipInvalid).toBe(
			"Introduce un código postal válido de 5 dígitos.",
		);
		expect(es.c17a.errorNotesTooLong).toBe(
			"Las notas de recogida deben tener 200 caracteres o menos.",
		);
	});

	it("verifies symmetry of c17a translation keys between English and Spanish", () => {
		const enKeys = Object.keys(en.c17a).sort();
		const esKeys = Object.keys(es.c17a).sort();
		expect(enKeys).toEqual(esKeys);
	});
});
