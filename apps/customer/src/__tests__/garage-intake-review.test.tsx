import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C21_G_DEFAULT_DATA } from "../fixtures/c26IntakeReviews";

describe("C21-G Garage Cleanout Intake Review — English (Node 394:494) & Spanish (Node 980:11186)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/garage-intake-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c21g-es"');
		expect(navContent).toContain('id: "c21g-en"');
		expect(navContent).toContain('route: "/garage-intake-review"');
	});

	it("verifies exact C21-G English and Spanish translation strings", () => {
		expect(en.c21g.title).toBe("Garage Cleanout intake review");
		expect(es.c21g.title).toBe("Revisión de solicitud de limpieza de garaje");
		expect(en.c21g.subtitle).toBe(
			"Review this independent illustrative service draft before W03.",
		);
		expect(es.c21g.subtitle).toBe(
			"Revisa este borrador independiente antes de W03.",
		);
		expect(en.c21g.sectionConfirmTitle).toBe("Service-specific intake review");
		expect(es.c21g.sectionConfirmTitle).toBe(
			"Revisión de solicitud por servicio",
		);
		expect(en.c21g.sectionPolicyTitle).toBe("Service safety assessment");
		expect(es.c21g.sectionPolicyTitle).toBe(
			"Evaluación de seguridad del servicio",
		);
		expect(en.c21g.reviewBadge).toBe("Review required");
		expect(es.c21g.reviewBadge).toBe("Revisión necesaria");
		expect(en.c21g.primaryCta).toBe("Confirm draft for AI review");
		expect(es.c21g.primaryCta).toBe("Confirmar borrador para revisión de IA");
		expect(en.c21g.secondaryCta).toBe("Edit garage details   ›");
		expect(es.c21g.secondaryCta).toBe("Editar datos del garaje   ›");
	});

	it("verifies honest upcoming W03 notice string without fabricated pricing or dispatch", () => {
		expect(en.c21g.noticeUpcomingW03).toContain(
			"Garage cleanout estimating (W03) is scheduled",
		);
		expect(es.c21g.noticeUpcomingW03).toContain(
			"La estimación de limpieza de garaje (W03) está programada",
		);
	});

	it("verifies default C21-G fixture data", () => {
		expect(C21_G_DEFAULT_DATA.bookingId).toBe("HX-DEMO-GAR-1040");
		expect(C21_G_DEFAULT_DATA.badgeLabel).toBe(
			"SARAH MITCHELL · HX-DEMO-GAR-1040",
		);
		expect(C21_G_DEFAULT_DATA.confirmLine2En).toBe(
			"Cardboard boxes and shelving · exact count not supplied",
		);
		expect(C21_G_DEFAULT_DATA.confirmLine2Es).toBe(
			"Cajas de cartón y estantes · cantidad pendiente",
		);
	});
});
