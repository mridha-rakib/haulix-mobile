import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import { C15_SERVICES, type C15ServiceId } from "../fixtures/c15Services";

describe("C15-S Service Selected — English ONLY (Figma Node 382:241)", () => {
	const serviceSelectedRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/service-selected.tsx",
	);
	const serviceDiscoveryRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/service-discovery.tsx",
	);
	const c15sIconsPath = path.resolve(
		__dirname,
		"../components/discovery/C15SIcons.tsx",
	);
	const originalSvgDir = path.resolve(
		__dirname,
		"../../assets/c15s/original-svg",
	);

	it("verifies C15-S Service Selected route exists and strictly omits CustomerBottomNav", () => {
		expect(fs.existsSync(serviceSelectedRoutePath)).toBe(true);

		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain("export default function ServiceSelectedScreen");
		expect(source).toContain("useTranslation");
		expect(source).toContain("HaulixSafeArea");
		expect(source).toContain("C15SFlowHeaderBack");
		// Strictly NO bottom navbar on C15-S
		expect(source).not.toContain("<CustomerBottomNav");
		expect(source).not.toContain("activeTab=");
	});

	it("verifies Flow Header · Back has explicit back hit area and no notification bell", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain('testID="c15s-header-back"');
		expect(source).toContain("C15SBackArrowIcon");
		expect(source).toContain("HAUL");
		expect(source).toContain("IX");
		expect(source).toContain("We Haul It All.");
		// No bell in W02 booking flow header
		expect(source).not.toContain("HeaderBellIcon");
		expect(source).not.toContain("c10s-header-bell");
	});

	it("verifies original Figma SVGs exist in assets folder", () => {
		const expectedSvgFiles = ["c15s_back_arrow.svg", "c15s_selected_truck.svg"];

		expectedSvgFiles.forEach((filename) => {
			const fullPath = path.join(originalSvgDir, filename);
			expect(fs.existsSync(fullPath)).toBe(true);
			const content = fs.readFileSync(fullPath, "utf8");
			expect(content).toContain("<svg");
			expect(content).toContain("</svg>");
		});
	});

	it("verifies C15SIcons exports typed SVG components", () => {
		expect(fs.existsSync(c15sIconsPath)).toBe(true);
		const source = fs.readFileSync(c15sIconsPath, "utf8");

		expect(source).toContain("export function C15SBackArrowIcon");
		expect(source).toContain("export function C15SSelectedTruckIcon");
	});

	it("verifies all 7 supported service categories resolve correctly", () => {
		const expectedIds: C15ServiceId[] = [
			"junk-removal",
			"moving",
			"furniture-pickup",
			"appliance-removal",
			"mattress-removal",
			"garage-cleanout",
			"store-pickup",
		];

		expectedIds.forEach((id) => {
			const match = C15_SERVICES.find((s) => s.id === id);
			expect(match).toBeDefined();
			expect(match?.name).toBeTruthy();
			expect(match?.subtitle).toBeTruthy();
		});
	});

	it("verifies default Junk Removal fixture is used when service parameter is missing or invalid", () => {
		const defaultService = C15_SERVICES[0];
		expect(defaultService.id).toBe("junk-removal");
		expect(defaultService.name).toBe("Junk Removal");

		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain("C15_SERVICES[0]");
		expect(source).toContain('"junk-removal"');
	});

	it("verifies dynamic profile loading uses English Sarah Mitchell fixture", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain("getC10DemoProfile");
		expect(source).toContain("loadProfileEdits");
		expect(source).toContain("subscribeToProfileEdits");
	});

	it("verifies How this booking works card contains the 3 exact Figma steps", () => {
		expect(en.c15s.step1).toBe("1. Confirm eligible Arizona pickup address");
		expect(en.c15s.step2).toBe(
			"2. Describe items, access and upload supporting photos",
		);
		expect(en.c15s.step3).toBe(
			"3. Review corrected AI suggestions in W03 before a quote",
		);

		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain('testID="c15s-how-booking-works-card"');
	});

	it("verifies Continue to service area CTA navigates to C16 with selected service preserved", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain('testID="c15s-continue-btn"');
		expect(source).toContain('pathname: "/service-area"');
		expect(source).toContain("params: { service: selectedService.id }");
	});

	it("verifies Change service CTA navigates back to C15 with selected service preserved", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain('testID="c15s-change-service-btn"');
		expect(source).toContain('pathname: "/service-discovery"');
		expect(source).toContain("params: { service: selectedService.id }");
	});

	it("verifies Android hardware back button handler returns to C15", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain("BackHandler.addEventListener");
		expect(source).toContain("hardwareBackPress");
		expect(source).toContain("handleBackToC15");
	});

	it("verifies C15 English primary Select <service> routes to C15-S", () => {
		const c15Source = fs.readFileSync(serviceDiscoveryRoutePath, "utf8");
		expect(c15Source).toContain('pathname: "/service-selected"');
		expect(c15Source).toContain("params: { service: selectedServiceId }");
	});

	it("verifies no fake backend booking persistence or quote calculations", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).not.toContain("fetch(");
		expect(source).not.toContain("axios");
		expect(source).not.toContain("createBooking");
		expect(source).not.toContain("paymentIntent");
		expect(source).toContain(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
	});

	it("verifies design tokens use authoritative HAULIX colors and typography", () => {
		expect(colors.brand).toBe("#BAFF42");
		expect(colors.background).toBe("#080B0B");
		expect(colors.surface).toBe("#151A19");
	});
});

describe("C15-S Service Selected — Spanish Localization (Figma Node 974:8965)", () => {
	const serviceSelectedRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/service-selected.tsx",
	);
	const serviceDiscoveryRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/service-discovery.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("ES-01 & ES-05: verifies safe fallback to Retiro de objetos default when service param is missing or unknown", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain("resolveSelectedService");
		expect(source).toContain("C15_SERVICES[0]");
		expect(es.c15s.defaultTitle).toBe("Retiro de objetos");
	});

	it("ES-02: verifies C15 Spanish routes to C15-S with canonical service ID", () => {
		const source = fs.readFileSync(serviceDiscoveryRoutePath, "utf8");
		expect(source).toContain('pathname: "/service-selected"');
		expect(source).toContain("params: { service: selectedServiceId }");
	});

	it("ES-03 & ES-04: verifies all 7 canonical services have authoritative Spanish translations", () => {
		expect(es.c15.serviceJunkRemoval).toBe("Retiro de objetos");
		expect(es.c15.subtitleJunkRemoval).toBe(
			"Retiro y eliminación de residuos no peligrosos",
		);
		expect(es.c15.serviceMoving).toBe("Mudanzas");
		expect(es.c15.subtitleMoving).toBe("Transporte del origen al destino");
		expect(es.c15.serviceFurniturePickup).toBe("Retiro de muebles");
		expect(es.c15.subtitleFurniturePickup).toBe("Sofás, mesas y otros muebles");
		expect(es.c15.serviceApplianceRemoval).toBe("Retiro de electrodomésticos");
		expect(es.c15.subtitleApplianceRemoval).toBe(
			"Retiro autorizado de electrodomésticos",
		);
		expect(es.c15.serviceMattressRemoval).toBe("Retiro de colchones");
		expect(es.c15.subtitleMattressRemoval).toBe(
			"Revisión de manejo y eliminación de colchones",
		);
		expect(es.c15.serviceGarageCleanout).toBe("Limpieza de garaje");
		expect(es.c15.subtitleGarageCleanout).toBe(
			"Fotos, acceso y revisión de contaminación",
		);
		expect(es.c15.serviceStorePickup).toBe("Recogida en tienda");
		expect(es.c15.subtitleStorePickup).toBe("Recogida y entrega de pedidos");
	});

	it("ES-06 & ES-07: verifies dynamic Spanish profile binds Bryan Lopez while preserving English Sarah Mitchell", () => {
		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");

		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		expect(esProfile.name).not.toBe(enProfile.name);
	});

	it("ES-08: verifies Spanish selected tile description uses approved C15-ES copy instead of leftover English", () => {
		expect(es.c15s.defaultTileSubtitle).toBe(
			"Retiro y eliminación de residuos no peligrosos",
		);
		expect(es.c15s.defaultTileSubtitle).not.toBe(en.c15s.defaultTileSubtitle);
	});

	it("ES-09 & ES-10: verifies Change service and Back navigation preserve state and return to C15", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain('pathname: "/service-discovery"');
		expect(source).toContain("params: { service: selectedService.id }");
		expect(source).toContain("handleBackToC15");
	});

	it("ES-11: verifies Continuar a zona de servicio triggers truthful localized C16 notice", () => {
		expect(es.c15s.noticeC16).toBe(
			"La verificación de la zona de servicio (C16) estará disponible en una próxima fase.",
		);
		expect(es.c15s.continueCta).toBe("Continuar a zona de servicio");
	});

	it("ES-12: verifies C15-S strictly omits bottom navigation bar and respects safe-area edges", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain('edges={["top", "left", "right"]}');
		expect(source).not.toContain("<CustomerBottomNav");
	});

	it("ES-13: verifies selected tile container uses minHeight to accommodate long titles without clipping", () => {
		const source = fs.readFileSync(serviceSelectedRoutePath, "utf8");
		expect(source).toContain("minHeight: 121");
		expect(source).toContain("tileTitleText");
		expect(source).toContain("tileSubtitleText");
	});

	it("ES-14: verifies English regression fidelity with Sarah Mitchell and English tokens intact", () => {
		expect(en.c15s.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c15s.selectedServiceTitle).toBe("Selected service");
		expect(en.c15s.selectedBadge).toBe("SELECTED");
		expect(en.c15s.defaultTileTitle).toBe("Junk Removal");
		expect(en.c15s.howBookingWorksTitle).toBe("How this booking works");
		expect(en.c15s.continueCta).toBe("Continue to service area");
		expect(en.c15s.changeServiceCta).toBe("Change service   ›");
	});

	it("ES-15: verifies demo navigator includes both English and Spanish C15-S entries", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navSource).toContain('id: "c15s-en"');
		expect(navSource).toContain('name: "C15-S · Service Selected (English)"');
		expect(navSource).toContain('id: "c15s-es"');
		expect(navSource).toContain('name: "C15-S · Servicio Elegido (Español)"');
		expect(navSource).toContain('figmaNode: "Node 974:8965"');
	});

	it("ES-16: verifies exact Figma 974:8965 copy for steps and disclaimers", () => {
		expect(es.c15s.step1).toBe("1. Confirma una dirección válida en Arizona");
		expect(es.c15s.step2).toBe("2. Describe objetos, acceso y sube fotos");
		expect(es.c15s.step3).toBe(
			"3. Revisa las sugerencias de IA en W03 antes del precio",
		);
		expect(es.c15s.footerNoticeDemo).toBe(
			"SOLO DEMO  ·  Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c15s.footerNoticeSrs).toBe(
			"SRS  BK-01, BK-02, SV-01  ·  430 px / desplazamiento vertical",
		);
	});
});
