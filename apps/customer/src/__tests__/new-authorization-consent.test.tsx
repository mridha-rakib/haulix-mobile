import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C30-CA New Authorization Consent Recorded — English (Node 773:905) & Spanish (Node 773:1122)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/new-authorization-consent.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c30ca-es"');
		expect(navContent).toContain('id: "c30ca-en"');
		expect(navContent).toContain('route: "/new-authorization-consent"');
	});

	it("verifies navigation transition to C31-P booking status and C30-C review return", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/checking-booking-status"');
		expect(routeContent).toContain('pathname: "/review-fresh-card-hold"');
	});

	it("verifies exact C30-CA English and Spanish translation strings", () => {
		expect(en.c30caNewAuthorizationConsent.progressLabel).toBe(
			"03 / 04  ·  PAYMENT",
		);
		expect(es.c30caNewAuthorizationConsent.progressLabel).toBe(
			"03 / 04  ·  PAGO",
		);
		expect(en.c30caNewAuthorizationConsent.screenTitle).toBe(
			"New authorization consent recorded",
		);
		expect(es.c30caNewAuthorizationConsent.screenTitle).toBe(
			"Nuevo consentimiento de autorización registrado",
		);
		expect(en.c30caNewAuthorizationConsent.statusBadge).toBe(
			"CONSENT RECORDED (v2)",
		);
		expect(es.c30caNewAuthorizationConsent.statusBadge).toBe(
			"CONSENTIMIENTO REGISTRADO (v2)",
		);
		expect(en.c30caNewAuthorizationConsent.termsVersionValue).toBe(
			"2026.11-v2",
		);
		expect(es.c30caNewAuthorizationConsent.termsVersionValue).toBe(
			"2026.11-v2",
		);
		expect(en.c30caNewAuthorizationConsent.primaryCta).toBe(
			"Check booking status",
		);
		expect(es.c30caNewAuthorizationConsent.primaryCta).toBe(
			"Verificar estado de reserva",
		);
		expect(en.c30caNewAuthorizationConsent.secondaryCta).toBe(
			"Review hold details",
		);
		expect(es.c30caNewAuthorizationConsent.secondaryCta).toBe(
			"Revisar detalles de retención",
		);
	});

	it("verifies local demonstration provenance and zero server-side claims", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c30caNewAuthorizationConsent.uiNote");
		expect(routeContent).toContain("getEffectiveConfirmedItems");
		expect(routeContent).not.toContain("saveServerConsent");
		expect(routeContent).not.toContain("stripeIntentId");
	});
});
