import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C27 Choose Your Service Time — English (Node 763:2) & Spanish (Node 766:388)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/choose-service-time.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);
	const upstreamPath = path.resolve(
		__dirname,
		"../../app/(app)/scope-accepted.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c27-es"');
		expect(navContent).toContain('id: "c27-en"');
		expect(navContent).toContain('route: "/choose-service-time"');
	});

	it("verifies navigation transitions to C27-A, C27-S, and upstream C26-A", () => {
		const upstreamContent = fs.readFileSync(upstreamPath, "utf8");
		expect(upstreamContent).toContain('pathname: "/choose-service-time"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/select-available-window"');
		expect(routeContent).toContain('pathname: "/request-service-asap"');
		expect(routeContent).toContain('pathname: "/service-window-unavailable"');
		expect(routeContent).toContain('pathname: "/scope-accepted"');
	});

	it("verifies exact C27 English and Spanish translation strings", () => {
		expect(en.c27ChooseServiceTime.progressLabel).toBe("01 / 04  ·  SCHEDULE");
		expect(es.c27ChooseServiceTime.progressLabel).toBe("01 / 04  ·  HORARIO");
		expect(en.c27ChooseServiceTime.screenTitle).toBe(
			"Choose your service time",
		);
		expect(es.c27ChooseServiceTime.screenTitle).toBe(
			"Elige cuándo necesitas el servicio",
		);
		expect(en.c27ChooseServiceTime.screenSubtitle).toBe(
			"Choose an eligible ASAP request or a scheduled window.",
		);
		expect(es.c27ChooseServiceTime.screenSubtitle).toBe(
			"Elige una solicitud inmediata o un horario programado.",
		);
		expect(en.c27ChooseServiceTime.primaryCta).toBe("Choose a scheduled time");
		expect(es.c27ChooseServiceTime.primaryCta).toBe("Elegir fecha y hora");
		expect(en.c27ChooseServiceTime.secondaryCta).toBe("Request ASAP");
		expect(es.c27ChooseServiceTime.secondaryCta).toBe(
			"Solicitar lo antes posible",
		);
		expect(en.c27ChooseServiceTime.alternativeCta).toBe(
			"Preview unavailable slot",
		);
		expect(es.c27ChooseServiceTime.alternativeCta).toBe(
			"Ver horario no disponible",
		);
	});

	it("verifies honest availability checks, non-fabrication constraints, and footer disclaimers", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c27ChooseServiceTime.uiNote");
		expect(routeContent).toContain('pathname: "/service-window-unavailable"');
		expect(routeContent).not.toContain("dispatchDriver");
		expect(routeContent).not.toContain("createBookingReceipt");
	});
});
