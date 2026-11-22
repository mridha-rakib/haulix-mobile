import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C24-ADM-S Admin Review Resolved — English (Node 412:1054) & Spanish (Node 987:10945)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/admin-review-resolved.tsx",
	);
	const adminPendingPath = path.resolve(
		__dirname,
		"../../app/(app)/admin-review-pending.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c24adms-es"');
		expect(navContent).toContain('id: "c24adms-en"');
		expect(navContent).toContain('route: "/admin-review-resolved"');
	});

	it("verifies C24-ADM connects to C24-ADM-S and C24-ADM-S connects to C24-Q and C23-S", () => {
		const adminContent = fs.readFileSync(adminPendingPath, "utf8");
		expect(adminContent).toContain('pathname: "/admin-review-resolved"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/illustrative-quote"');
		expect(routeContent).toContain('pathname: "/customer-confirmed-items"');
		expect(routeContent).toContain('pathname: "/admin-review-pending"');
	});

	it("verifies exact C24-ADM-S English and Spanish translation strings", () => {
		expect(en.c24admSAdminReviewResolved.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c24admSAdminReviewResolved.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c24admSAdminReviewResolved.title).toBe("Admin review recorded");
		expect(es.c24admSAdminReviewResolved.title).toBe(
			"Revisión de Admin registrada",
		);
		expect(en.c24admSAdminReviewResolved.subtitle).toBe(
			"Example of an authorized decision after customer details are confirmed.",
		);
		expect(es.c24admSAdminReviewResolved.subtitle).toBe(
			"Ejemplo de decisión autorizada tras confirmar datos del cliente.",
		);
		expect(en.c24admSAdminReviewResolved.sectionNoticeTitle).toBe(
			"Illustrative review outcome: approved",
		);
		expect(es.c24admSAdminReviewResolved.sectionNoticeTitle).toBe(
			"Resultado ilustrativo de revisión: aprobado",
		);
		expect(en.c24admSAdminReviewResolved.sectionScopeTitle).toBe(
			"Confirmed scope",
		);
		expect(es.c24admSAdminReviewResolved.sectionScopeTitle).toBe(
			"Alcance confirmado",
		);
		expect(en.c24admSAdminReviewResolved.scopeItems).toBe(
			"Sofa ×1; queen mattress ×2; dining table ×1",
		);
		expect(es.c24admSAdminReviewResolved.scopeItems).toBe(
			"Sofá ×1; colchón queen ×2; mesa ×1",
		);
		expect(en.c24admSAdminReviewResolved.primaryCta).toBe(
			"View illustrative quote",
		);
		expect(es.c24admSAdminReviewResolved.primaryCta).toBe(
			"Ver cotización ilustrativa",
		);
		expect(en.c24admSAdminReviewResolved.secondaryCta).toBe(
			"Review confirmed items  ›",
		);
		expect(es.c24admSAdminReviewResolved.secondaryCta).toBe(
			"Revisar objetos confirmados  ›",
		);
	});
});
