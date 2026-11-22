import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C21_T_DEFAULT_DATA } from "../fixtures/c26IntakeReviews";

describe("C21-T Mattress Removal Intake Review — English (Node 394:392) & Spanish (Node 980:11126)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/mattress-intake-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c21t-es"');
		expect(navContent).toContain('id: "c21t-en"');
		expect(navContent).toContain('route: "/mattress-intake-review"');
	});

	it("verifies exact C21-T English and Spanish translation strings", () => {
		expect(en.c21t.title).toBe("Mattress Removal intake review");
		expect(es.c21t.title).toBe("Revisión de solicitud de retiro de colchones");
		expect(en.c21t.subtitle).toBe(
			"Review this independent illustrative service draft before W03.",
		);
		expect(es.c21t.subtitle).toBe(
			"Revisa este borrador independiente antes de W03.",
		);
		expect(en.c21t.sectionConfirmTitle).toBe("Service-specific intake review");
		expect(es.c21t.sectionConfirmTitle).toBe(
			"Revisión de solicitud por servicio",
		);
		expect(en.c21t.sectionPolicyTitle).toBe("Service safety assessment");
		expect(es.c21t.sectionPolicyTitle).toBe(
			"Evaluación de seguridad del servicio",
		);
		expect(en.c21t.reviewBadge).toBe("Review required");
		expect(es.c21t.reviewBadge).toBe("Revisión necesaria");
		expect(en.c21t.primaryCta).toBe("Confirm draft for AI review");
		expect(es.c21t.primaryCta).toBe("Confirmar borrador para revisión de IA");
		expect(en.c21t.secondaryCta).toBe("Edit mattress details   ›");
		expect(es.c21t.secondaryCta).toBe("Editar datos del colchón   ›");
	});

	it("verifies honest upcoming W03 notice string without fabricated pricing or dispatch", () => {
		expect(en.c21t.noticeUpcomingW03).toContain(
			"Mattress recycling & disposal quoting (W03) is scheduled",
		);
		expect(es.c21t.noticeUpcomingW03).toContain(
			"La cotización y eliminación de colchones (W03) están programadas",
		);
	});

	it("verifies default C21-T fixture data", () => {
		expect(C21_T_DEFAULT_DATA.bookingId).toBe("HX-DEMO-MATT-1037");
		expect(C21_T_DEFAULT_DATA.badgeLabel).toBe(
			"SARAH MITCHELL · HX-DEMO-MATT-1037",
		);
		expect(C21_T_DEFAULT_DATA.confirmLine2En).toBe(
			"Queen mattresses ×2 · 80 × 60 × 11 in each",
		);
		expect(C21_T_DEFAULT_DATA.confirmLine2Es).toBe(
			"Colchones queen ×2 · 80 × 60 × 11 pulg. c/u",
		);
	});
});
