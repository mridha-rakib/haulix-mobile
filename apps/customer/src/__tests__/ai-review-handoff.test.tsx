import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { W03_HANDOFF_DEFAULT_DATA } from "../fixtures/c26IntakeReviews";

describe("W03-HANDOFF AI Review Entry Preview — English (Node 382:2161) & Spanish (Node 980:10514)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/ai-review-handoff.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "w03handoff-es"');
		expect(navContent).toContain('id: "w03handoff-en"');
		expect(navContent).toContain('route: "/ai-review-handoff"');
	});

	it("verifies exact W03-HANDOFF English and Spanish translation strings", () => {
		expect(en.w03handoff.title).toBe("AI Recognition & Quotation available");
		expect(es.w03handoff.title).toBe(
			"Siguiente: Reconocimiento y cotización con IA",
		);
		expect(en.w03handoff.subtitle).toBe(
			"W03 AI review is connected in this demo; final pricing still requires approved rules.",
		);
		expect(es.w03handoff.subtitle).toBe(
			"Abre W03 para revisar sugerencias de IA en esta demo.",
		);
		expect(en.w03handoff.sectionPayloadTitle).toBe("Input payload for W03");
		expect(es.w03handoff.sectionPayloadTitle).toBe("Datos de entrada para W03");
		expect(en.w03handoff.sectionAnchorTitle).toBe(
			"Handoff anchor — not a priced quote",
		);
		expect(es.w03handoff.sectionAnchorTitle).toBe(
			"Punto de enlace · No es una cotización",
		);
		expect(en.w03handoff.reviewBadge).toBe("Review required");
		expect(es.w03handoff.reviewBadge).toBe("Revisión necesaria");
		expect(en.w03handoff.primaryCta).toBe("Begin AI-assisted item review");
		expect(es.w03handoff.primaryCta).toBe("Continuar al reconocimiento con IA");
		expect(en.w03handoff.secondaryCta).toBe("Edit items   ›");
		expect(es.w03handoff.secondaryCta).toBe("Editar objetos   ›");
	});

	it("verifies honest upcoming C22 notice string without fake classification", () => {
		expect(en.w03handoff.noticeUpcomingC22).toContain(
			"AI item recognition (C22) is scheduled for an upcoming sprint",
		);
		expect(es.w03handoff.noticeUpcomingC22).toContain(
			"El reconocimiento de objetos con IA (C22) está programado para un próximo sprint",
		);
	});

	it("verifies default W03-HANDOFF fixture data", () => {
		expect(W03_HANDOFF_DEFAULT_DATA.bookingId).toBe("HX-DEMO-1027");
		expect(W03_HANDOFF_DEFAULT_DATA.badgeLabel).toBe(
			"SARAH MITCHELL · HX-DEMO-1027",
		);
		expect(W03_HANDOFF_DEFAULT_DATA.payloadLine1En).toBe(
			"HX-DEMO-1027 · Sarah Mitchell · Junk Removal",
		);
		expect(W03_HANDOFF_DEFAULT_DATA.payloadLine1Es).toBe(
			"HX-DEMO-1027 · Sarah Mitchell · Retiro de objetos",
		);
	});
});
