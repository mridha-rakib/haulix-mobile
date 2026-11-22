import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C26-R Scope Acceptance Recovery — English (Node 412:1517) & Spanish (Node 987:11501)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/scope-acceptance-recovery.tsx",
	);
	const acceptanceReviewPath = path.resolve(
		__dirname,
		"../../app/(app)/quote-acceptance-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c26r-es"');
		expect(navContent).toContain('id: "c26r-en"');
		expect(navContent).toContain('route: "/scope-acceptance-recovery"');
	});

	it("verifies upstream C25-A routes to C26-R, and C26-R navigates back to C25-A and C25", () => {
		const acceptanceContent = fs.readFileSync(acceptanceReviewPath, "utf8");
		expect(acceptanceContent).toContain(
			'pathname: "/scope-acceptance-recovery"',
		);

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/quote-acceptance-review"');
		expect(routeContent).toContain('pathname: "/itemized-quote"');
	});

	it("verifies exact C26-R English and Spanish translation strings", () => {
		expect(en.c26rScopeAcceptanceRecovery.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c26rScopeAcceptanceRecovery.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c26rScopeAcceptanceRecovery.flowSub).toBe("  /  C26-R");
		expect(es.c26rScopeAcceptanceRecovery.flowSub).toBe("  /  C26-R");
		expect(en.c26rScopeAcceptanceRecovery.title).toBe(
			"Couldn't record your decision",
		);
		expect(es.c26rScopeAcceptanceRecovery.title).toBe(
			"No se pudo registrar tu decisión",
		);
		expect(en.c26rScopeAcceptanceRecovery.subtitle).toBe(
			"The selected scope is still available for review.",
		);
		expect(es.c26rScopeAcceptanceRecovery.subtitle).toBe(
			"El alcance seleccionado sigue disponible para revisión.",
		);
		expect(en.c26rScopeAcceptanceRecovery.primaryCta).toBe(
			"Retry accepting scope",
		);
		expect(es.c26rScopeAcceptanceRecovery.primaryCta).toBe(
			"Reintentar aceptación del alcance",
		);
		expect(en.c26rScopeAcceptanceRecovery.secondaryCta).toBe(
			"Review estimate again  ›",
		);
		expect(es.c26rScopeAcceptanceRecovery.secondaryCta).toBe(
			"Revisar estimación de nuevo  ›",
		);
	});

	it("verifies save failure recovery safeguards and honest disclaimers", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c26rScopeAcceptanceRecovery.footerDemo");
		expect(routeContent).toContain("c26rScopeAcceptanceRecovery.footerSrs");
		expect(routeContent).not.toContain("fakeErrorCode");
		expect(routeContent).not.toContain("persistedSuccessfully");
	});
});
