import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C27-S Select Available Window — English (Node 763:133) & Spanish (Node 766:519)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/select-available-window.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c27s-es"');
		expect(navContent).toContain('id: "c27s-en"');
		expect(navContent).toContain('route: "/select-available-window"');
	});

	it("verifies navigation transitions to C28 Booking Review, switch to ASAP, and back to C27", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/review-booking"');
		expect(routeContent).toContain('pathname: "/request-service-asap"');
		expect(routeContent).toContain('pathname: "/choose-service-time"');
		expect(routeContent).toContain('pathname: "/invalid-service-time"');
		expect(routeContent).toContain('pathname: "/service-window-unavailable"');
	});

	it("verifies exact C27-S English and Spanish translation strings", () => {
		expect(en.c27sSelectAvailableWindow.progressLabel).toBe(
			"01 / 04  ·  SCHEDULE",
		);
		expect(es.c27sSelectAvailableWindow.progressLabel).toBe(
			"01 / 04  ·  HORARIO",
		);
		expect(en.c27sSelectAvailableWindow.screenTitle).toBe(
			"Select an available window",
		);
		expect(es.c27sSelectAvailableWindow.screenTitle).toBe(
			"Elige un horario disponible",
		);
		expect(en.c27sSelectAvailableWindow.screenSubtitle).toBe(
			"Same-day schedules need at least 60 minutes' notice.",
		);
		expect(es.c27sSelectAvailableWindow.screenSubtitle).toBe(
			"Las reservas para hoy requieren al menos 60 minutos de anticipación.",
		);
		expect(en.c27sSelectAvailableWindow.dateHeading).toBe("SELECT A DATE");
		expect(es.c27sSelectAvailableWindow.dateHeading).toBe("ELIGE UNA FECHA");
		expect(en.c27sSelectAvailableWindow.timeHeading).toBe(
			"SAMPLE SERVICE WINDOWS",
		);
		expect(es.c27sSelectAvailableWindow.timeHeading).toBe(
			"FRANJAS HORARIAS · EJEMPLOS",
		);
		expect(en.c27sSelectAvailableWindow.primaryCta).toBe("Continue to review");
		expect(es.c27sSelectAvailableWindow.primaryCta).toBe(
			"Continuar a revisión",
		);
		expect(en.c27sSelectAvailableWindow.secondaryCta).toBe(
			"Try invalid same-day time",
		);
		expect(es.c27sSelectAvailableWindow.secondaryCta).toBe(
			"Probar hora inválida",
		);
		expect(en.c27sSelectAvailableWindow.alternativeCta).toBe(
			"Preview stale slot",
		);
		expect(es.c27sSelectAvailableWindow.alternativeCta).toBe(
			"Ver horario vencido",
		);
	});

	it("verifies sample window selection, 60-minute notice policy disclosures, and disclaimers", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain(
			"c27sSelectAvailableWindow.availabilityDisclaimer",
		);
		expect(routeContent).toContain('pathname: "/invalid-service-time"');
		expect(routeContent).toContain('pathname: "/service-window-unavailable"');
		expect(routeContent).toContain("c27sSelectAvailableWindow.uiNote");
		expect(routeContent).not.toContain("reserveSlotLive");
	});
});
