import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C25-A Quote Acceptance Review — English (Node 412:1335) & Spanish (Node 987:11278)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/quote-acceptance-review.tsx",
	);
	const itemizedRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/itemized-quote.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c25a-es"');
		expect(navContent).toContain('id: "c25a-en"');
		expect(navContent).toContain('route: "/quote-acceptance-review"');
	});

	it("verifies upstream C25 routes to C25-A, and C25-A navigates to C26-A and C26-R", () => {
		const itemizedContent = fs.readFileSync(itemizedRoutePath, "utf8");
		expect(itemizedContent).toContain('pathname: "/quote-acceptance-review"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/scope-accepted"');
		expect(routeContent).toContain('pathname: "/scope-acceptance-recovery"');
		expect(routeContent).toContain('pathname: "/itemized-quote"');
	});

	it("verifies exact C25-A English and Spanish translation strings", () => {
		expect(en.c25aQuoteAcceptanceReview.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c25aQuoteAcceptanceReview.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c25aQuoteAcceptanceReview.flowSub).toBe("  /  C25-A");
		expect(es.c25aQuoteAcceptanceReview.flowSub).toBe("  /  C25-A");
		expect(en.c25aQuoteAcceptanceReview.title).toBe(
			"Accept this illustrated scope?",
		);
		expect(es.c25aQuoteAcceptanceReview.title).toBe(
			"¿Aceptar este alcance ilustrativo?",
		);
		expect(en.c25aQuoteAcceptanceReview.subtitle).toBe(
			"Review the amount and items before proceeding.",
		);
		expect(es.c25aQuoteAcceptanceReview.subtitle).toBe(
			"Revisa el importe y los objetos antes de continuar.",
		);
		expect(en.c25aQuoteAcceptanceReview.priceSubtotal).toBe("$356");
		expect(es.c25aQuoteAcceptanceReview.priceSubtotal).toBe("$356");
		expect(en.c25aQuoteAcceptanceReview.primaryCta).toBe(
			"Accept scope & continue",
		);
		expect(es.c25aQuoteAcceptanceReview.primaryCta).toBe(
			"Aceptar alcance y continuar",
		);
		expect(en.c25aQuoteAcceptanceReview.secondaryCta).toBe(
			"Back to breakdown  ›",
		);
		expect(es.c25aQuoteAcceptanceReview.secondaryCta).toBe(
			"Volver al desglose  ›",
		);
	});

	it("verifies non-fabrication constraints, illustrative total and honest disclaimers", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c25aQuoteAcceptanceReview.footerDemo");
		expect(routeContent).toContain("c25aQuoteAcceptanceReview.footerSrs");
		expect(routeContent).toContain("C25A_ILLUSTRATIVE_SUBTOTAL");
		expect(routeContent).not.toContain("createBooking");
		expect(routeContent).not.toContain("chargeCustomer");
	});
});
