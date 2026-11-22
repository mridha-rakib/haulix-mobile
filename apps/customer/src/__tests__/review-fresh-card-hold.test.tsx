import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C30-C Review a Fresh Card Hold — English (Node 773:836) & Spanish (Node 773:1053)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/review-fresh-card-hold.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c30c-es"');
		expect(navContent).toContain('id: "c30c-en"');
		expect(navContent).toContain('route: "/review-fresh-card-hold"');
	});

	it("verifies explicit consent requirement and transition to C30-CA", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/new-authorization-consent"');
		expect(routeContent).toContain('pathname: "/choose-payment-method"');
		expect(routeContent).toContain("acknowledgeFreshHoldConsent");
		expect(routeContent).toContain("consentChecked");
	});

	it("verifies exact C30-C English and Spanish translation strings", () => {
		expect(en.c30cReviewFreshCardHold.progressLabel).toBe(
			"03 / 04  ·  PAYMENT",
		);
		expect(es.c30cReviewFreshCardHold.progressLabel).toBe("03 / 04  ·  PAGO");
		expect(en.c30cReviewFreshCardHold.screenTitle).toBe(
			"Review a fresh card hold",
		);
		expect(es.c30cReviewFreshCardHold.screenTitle).toBe(
			"Revisar una nueva retención de tarjeta",
		);
		expect(en.c30cReviewFreshCardHold.statusBadge).toBe(
			"FRESH AUTHORIZATION REVIEW",
		);
		expect(es.c30cReviewFreshCardHold.statusBadge).toBe(
			"REVISIÓN DE NUEVA AUTORIZACIÓN",
		);
		expect(en.c30cReviewFreshCardHold.holdAmountValue).toBe("$356.00 USD");
		expect(es.c30cReviewFreshCardHold.holdAmountValue).toBe("$356.00 USD");
		expect(en.c30cReviewFreshCardHold.primaryCta).toBe(
			"Acknowledge and proceed",
		);
		expect(es.c30cReviewFreshCardHold.primaryCta).toBe("Aceptar y continuar");
		expect(en.c30cReviewFreshCardHold.secondaryCta).toBe(
			"Cancel and return to payment methods",
		);
		expect(es.c30cReviewFreshCardHold.secondaryCta).toBe(
			"Cancelar y volver a métodos de pago",
		);
	});

	it("verifies no automatic hold creation or payment capture", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c30cReviewFreshCardHold.uiNote");
		expect(routeContent).not.toContain("stripe.confirmPayment");
		expect(routeContent).not.toContain("chargeCustomer");
	});
});
