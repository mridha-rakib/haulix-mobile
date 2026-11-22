import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C27-X No-Driver Fee-Free Cancellation — English (Node 773:776) & Spanish (Node 773:993)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/no-driver-fee-free-cancellation.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c27x-es"');
		expect(navContent).toContain('id: "c27x-en"');
		expect(navContent).toContain('route: "/no-driver-fee-free-cancellation"');
	});

	it("verifies navigation transitions to C27 and C27-S", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/choose-service-time"');
		expect(routeContent).toContain('pathname: "/select-available-window"');
		expect(routeContent).toContain("recordFeeFreeCancellation");
	});

	it("verifies exact C27-X English and Spanish translation strings", () => {
		expect(en.c27xNoDriverCancellation.progressLabel).toBe(
			"01 / 04  ·  SCHEDULE",
		);
		expect(es.c27xNoDriverCancellation.progressLabel).toBe(
			"01 / 04  ·  HORARIO",
		);
		expect(en.c27xNoDriverCancellation.screenTitle).toBe("Cancel without fee");
		expect(es.c27xNoDriverCancellation.screenTitle).toBe("Cancelar sin cargo");
		expect(en.c27xNoDriverCancellation.cancelledBadge).toBe(
			"CANCELLED · $0.00 FEE",
		);
		expect(es.c27xNoDriverCancellation.cancelledBadge).toBe(
			"CANCELADO · $0.00 CARGO",
		);
		expect(en.c27xNoDriverCancellation.cancellationFeeValue).toBe(
			"$0.00 (Fee Waived)",
		);
		expect(es.c27xNoDriverCancellation.cancellationFeeValue).toBe(
			"$0.00 (Sin cargo)",
		);
		expect(en.c27xNoDriverCancellation.primaryCta).toBe(
			"Start another request",
		);
		expect(es.c27xNoDriverCancellation.primaryCta).toBe(
			"Iniciar otra solicitud",
		);
		expect(en.c27xNoDriverCancellation.secondaryCta).toBe(
			"Schedule for another date",
		);
		expect(es.c27xNoDriverCancellation.secondaryCta).toBe(
			"Programar para otra fecha",
		);
	});

	it("verifies fee-free guarantee invariant, honest disclaimers, and zero backend mutation", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c27xNoDriverCancellation.uiNote");
		expect(routeContent).not.toContain("chargeCancellationFee");
		expect(routeContent).not.toContain("fakeRefundProcessed");
	});
});
