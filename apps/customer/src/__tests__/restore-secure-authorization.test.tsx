import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C30-R Restore Secure Authorization — English (Node 763:952) & Spanish (Node 766:1338)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/restore-secure-authorization.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c30r-es"');
		expect(navContent).toContain('id: "c30r-en"');
		expect(navContent).toContain('route: "/restore-secure-authorization"');
	});

	it("verifies navigation transitions to C30-C hold review and C29 payment method", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/review-fresh-card-hold"');
		expect(routeContent).toContain('pathname: "/choose-payment-method"');
		expect(routeContent).toContain("recordAuthorizationRestoration");
	});

	it("verifies exact C30-R English and Spanish translation strings", () => {
		expect(en.c30rRestoreAuthorization.progressLabel).toBe(
			"03 / 04  ·  PAYMENT",
		);
		expect(es.c30rRestoreAuthorization.progressLabel).toBe("03 / 04  ·  PAGO");
		expect(en.c30rRestoreAuthorization.screenTitle).toBe(
			"Restore secure authorization",
		);
		expect(es.c30rRestoreAuthorization.screenTitle).toBe(
			"Restaurar autorización segura",
		);
		expect(en.c30rRestoreAuthorization.statusBadge).toBe(
			"AUTHORIZATION RESTORATION REQUIRED",
		);
		expect(es.c30rRestoreAuthorization.statusBadge).toBe(
			"RESTAURACIÓN DE AUTORIZACIÓN REQUERIDA",
		);
		expect(en.c30rRestoreAuthorization.priorAmountValue).toBe("$356.00 USD");
		expect(es.c30rRestoreAuthorization.priorAmountValue).toBe("$356.00 USD");
		expect(en.c30rRestoreAuthorization.primaryCta).toBe(
			"Proceed to hold review",
		);
		expect(es.c30rRestoreAuthorization.primaryCta).toBe(
			"Continuar a revisión de retención",
		);
		expect(en.c30rRestoreAuthorization.secondaryCta).toBe(
			"Choose another payment method",
		);
		expect(es.c30rRestoreAuthorization.secondaryCta).toBe(
			"Elegir otro método de pago",
		);
	});

	it("verifies zero sensitive data collection and preserved customer scope", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c30rRestoreAuthorization.uiNote");
		expect(routeContent).toContain("getEffectiveConfirmedItems");
		expect(routeContent).not.toContain("TextInput");
		expect(routeContent).not.toContain("saveCardData");
	});
});
