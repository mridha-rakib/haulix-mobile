import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C21_RETAIL_DEFAULT_DATA } from "../fixtures/c25ServiceReviews";

describe("C21-RETAIL Retail Pickup Intake Review — English (Node 392:456) & Spanish (Node 980:10886)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/retail-intake-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c21retail-es"');
		expect(navContent).toContain('id: "c21retail-en"');
		expect(navContent).toContain('route: "/retail-intake-review"');
	});

	it("verifies exact C21-RETAIL English and Spanish translation strings", () => {
		expect(en.c21retail.title).toBe("Retail pickup intake review");
		expect(es.c21retail.title).toBe(
			"Revisión de solicitud de recogida comercial",
		);
		expect(en.c21retail.subtitle).toBe(
			"Emily Parker · Separate fictional collection request.",
		);
		expect(es.c21retail.subtitle).toBe(
			"Emily Parker · Solicitud ficticia de recogida independiente.",
		);
		expect(en.c21retail.sectionConfirmTitle).toBe("Intake data to confirm");
		expect(es.c21retail.sectionConfirmTitle).toBe(
			"Datos de solicitud por confirmar",
		);
		expect(en.c21retail.sectionPolicyTitle).toBe("Scope and policy checks");
		expect(es.c21retail.sectionPolicyTitle).toBe(
			"Controles de alcance y políticas",
		);
		expect(en.c21retail.reviewBadge).toBe("Review required");
		expect(es.c21retail.reviewBadge).toBe("Revisión necesaria");
		expect(en.c21retail.primaryCta).toBe("Confirm intake · Continue to W03");
		expect(es.c21retail.primaryCta).toBe(
			"Confirmar solicitud · Continuar a W03",
		);
		expect(en.c21retail.secondaryCta).toBe("Edit retail order   ›");
		expect(es.c21retail.secondaryCta).toBe("Editar pedido de tienda   ›");
	});

	it("verifies honest upcoming W03 notice string without fabricated pricing or dispatch", () => {
		expect(en.c21retail.noticeUpcomingW03).toContain(
			"Retail pricing & quoting (W03) is scheduled",
		);
		expect(es.c21retail.noticeUpcomingW03).toContain(
			"La cotización y tarifas comerciales (W03) están programadas",
		);
	});

	it("verifies default C21-RETAIL fixture data", () => {
		expect(C21_RETAIL_DEFAULT_DATA.bookingId).toBe("HX-DEMO-RETAIL-1035");
		expect(C21_RETAIL_DEFAULT_DATA.badgeLabel).toBe(
			"EMILY PARKER · HX-DEMO-RETAIL-1035",
		);
	});
});
