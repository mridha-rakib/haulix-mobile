import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C24-F Quote Error Recovery — English (Node 412:965) & Spanish (Node 987:10837)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/quote-error-recovery.tsx",
	);
	const processingRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/quote-processing.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c24f-es"');
		expect(navContent).toContain('id: "c24f-en"');
		expect(navContent).toContain('route: "/quote-error-recovery"');
	});

	it("verifies upstream C24-P routes to C24-F, and C24-F navigates to C24-P and C24-ADM", () => {
		const processingContent = fs.readFileSync(processingRoutePath, "utf8");
		expect(processingContent).toContain('pathname: "/quote-error-recovery"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/quote-processing"');
		expect(routeContent).toContain('pathname: "/admin-review-pending"');
	});

	it("verifies exact C24-F English and Spanish translation strings", () => {
		expect(en.c24fQuoteErrorRecovery.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c24fQuoteErrorRecovery.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c24fQuoteErrorRecovery.flowSub).toBe("  /  C24-F");
		expect(es.c24fQuoteErrorRecovery.flowSub).toBe("  /  C24-F");
		expect(en.c24fQuoteErrorRecovery.title).toBe("Estimate isn't available");
		expect(es.c24fQuoteErrorRecovery.title).toBe("Estimación no disponible");
		expect(en.c24fQuoteErrorRecovery.subtitle).toBe(
			"We couldn't validate current pricing rules or the estimate calculation.",
		);
		expect(es.c24fQuoteErrorRecovery.subtitle).toBe(
			"No pudimos validar las reglas de precios ni el cálculo.",
		);
		expect(en.c24fQuoteErrorRecovery.noticeTitle).toBe(
			"Calculation could not be completed",
		);
		expect(es.c24fQuoteErrorRecovery.noticeTitle).toBe(
			"No se pudo completar el cálculo",
		);
		expect(en.c24fQuoteErrorRecovery.noticeSupporting).toBe(
			"No definitive price was published.",
		);
		expect(es.c24fQuoteErrorRecovery.noticeSupporting).toBe(
			"No se publicó ningún precio definitivo.",
		);
		expect(en.c24fQuoteErrorRecovery.guidance).toBe(
			"Retry the approved calculation, or request authorized review.",
		);
		expect(es.c24fQuoteErrorRecovery.guidance).toBe(
			"Reintenta el cálculo aprobado o solicita revisión autorizada.",
		);
		expect(en.c24fQuoteErrorRecovery.primaryCta).toBe("Try quotation again");
		expect(es.c24fQuoteErrorRecovery.primaryCta).toBe("Reintentar cotización");
		expect(en.c24fQuoteErrorRecovery.secondaryCta).toBe(
			"Send to Admin review  ›",
		);
		expect(es.c24fQuoteErrorRecovery.secondaryCta).toBe(
			"Enviar a revisión de Admin  ›",
		);
	});

	it("verifies non-fabrication constraints and honest prototype disclaimers", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c24fQuoteErrorRecovery.footerDemo");
		expect(routeContent).toContain("c24fQuoteErrorRecovery.footerSrs");
		expect(routeContent).not.toContain("stripe");
		expect(routeContent).not.toContain("checkout");
	});
});
