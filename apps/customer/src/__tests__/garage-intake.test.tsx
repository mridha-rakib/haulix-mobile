import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C18G_DEMO_CONSTANTS } from "../fixtures/c18gGarageIntake";

describe("C18-G Garage Cleanout Intake — English (Node 382:1056) & Spanish (Node 977:9399)", () => {
	const _c18gRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/garage-intake.tsx",
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

	it("1. verifies exact English copy from Figma Node 382:1056", () => {
		expect(en.c18g.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c18g.stepSub).toBe("  /  C18-G");
		expect(en.c18g.title).toBe("Garage cleanout intake");
		expect(en.c18g.subtitle).toBe(
			"Screen access, scope and hazardous material exclusions.",
		);
		expect(en.c18g.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c18g.scopeCardTitle).toBe("Cleanout scope & access");
		expect(en.c18g.labelSpaceScope).toBe("Space scope");
		expect(en.c18g.spaceScopeValue).toBe("Single residential garage · one bay");
		expect(en.c18g.labelAccess).toBe("Collection access");
		expect(en.c18g.accessValue).toBe("Driveway available");
		expect(en.c18g.labelIdentified).toBe("Identified items");
		expect(en.c18g.identifiedValue).toBe(
			"Cardboard boxes, wooden shelving, small furniture",
		);
		expect(en.c18g.labelUnidentified).toBe("Unidentified materials");
		expect(en.c18g.unidentifiedValue).toBe(
			"Requires customer photos and clarification",
		);
		expect(en.c18g.hazardCardTitle).toBe("Hazardous Materials Screening");
		expect(en.c18g.reviewBadge).toBe("Review required");
		expect(en.c18g.hazardNotice).toBe(
			"No chemicals, paints, solvents, gas tanks, or asbestos permitted.",
		);
		expect(en.c18g.continueCta).toBe("List garage items");
		expect(en.c18g.backServicesCta).toBe("Back to services   ›");
		expect(en.c18g.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c18g.footerSrs).toBe(
			"SRS  BK-01, BK-02, SV-14  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 977:9399", () => {
		expect(es.c18g.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
		expect(es.c18g.stepSub).toBe("  /  C18-G");
		expect(es.c18g.title).toBe("Solicitud de limpieza de garaje");
		expect(es.c18g.subtitle).toBe(
			"Evalúe el acceso, alcance y exclusión de residuos peligrosos.",
		);
		expect(es.c18g.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c18g.scopeCardTitle).toBe("Alcance de limpieza y acceso");
		expect(es.c18g.labelSpaceScope).toBe("Espacio");
		expect(es.c18g.spaceScopeValue).toBe(
			"Garaje residencial individual · un espacio",
		);
		expect(es.c18g.labelAccess).toBe("Acceso para recogida");
		expect(es.c18g.accessValue).toBe("Entrada para autos disponible");
		expect(es.c18g.labelIdentified).toBe("Objetos identificados");
		expect(es.c18g.identifiedValue).toBe(
			"Cajas de cartón, estanterías de madera, muebles pequeños",
		);
		expect(es.c18g.labelUnidentified).toBe("Materiales no identificados");
		expect(es.c18g.unidentifiedValue).toBe(
			"Requiere fotos del cliente y aclaración",
		);
		expect(es.c18g.hazardCardTitle).toBe("Detección de materiales peligrosos");
		expect(es.c18g.reviewBadge).toBe("Revisión necesaria");
		expect(es.c18g.hazardNotice).toBe(
			"No se permiten productos químicos, pinturas, disolventes, botellas de gas ni amianto.",
		);
		expect(es.c18g.continueCta).toBe("Revisar limpieza de garaje");
		expect(es.c18g.backServicesCta).toBe("Volver a servicios   ›");
		expect(es.c18g.footerDemo).toBe(
			"SOLO DEMO · Sin reserva confirmada, tarifas ni pago",
		);
		expect(es.c18g.footerSrs).toBe(
			"SRS  BK-01, BK-02, SV-14  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. verifies garage icons and demo constants", () => {
		const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
		expect(iconsSource).toContain("C18GarageIcon");
		expect(iconsSource).toContain("C18HazardShieldIcon");

		expect(C18G_DEMO_CONSTANTS.stepIndicator).toBe(
			"W02 · SERVICE DISCOVERY & INTAKE",
		);
		expect(C18G_DEMO_CONSTANTS.stepIndicatorEs).toBe(
			"W02 · SERVICIOS Y RECEPCIÓN",
		);
	});

	it("4. verifies demo screen navigator registration", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navSource).toContain('id: "c18g-en"');
		expect(navSource).toContain('id: "c18g-es"');
		expect(navSource).toContain('route: "/garage-intake"');
	});
});
