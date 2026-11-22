import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { W03_A_DEFAULT_DATA } from "../fixtures/c27ServiceHandoffs";

describe("W03-A-HANDOFF Appliance Removal AI Review Entry — English (Node 394:341) & Spanish (Node 980:11306)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/appliance-ai-handoff.tsx",
	);
	const reviewRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/appliance-intake-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "w03a-es"');
		expect(navContent).toContain('id: "w03a-en"');
		expect(navContent).toContain('route: "/appliance-ai-handoff"');
	});

	it("verifies upstream review route connects to appliance-ai-handoff", () => {
		const reviewContent = fs.readFileSync(reviewRoutePath, "utf8");
		expect(reviewContent).toContain('router.push("/appliance-ai-handoff")');
	});

	it("verifies exact W03-A-HANDOFF English and Spanish translation strings", () => {
		expect(en.w03aHandoff.title).toBe("Appliance Removal review available");
		expect(es.w03aHandoff.title).toBe(
			"Revisión de electrodomésticos disponible",
		);
		expect(en.w03aHandoff.subtitle).toBe(
			"Confirm model, condition, safe handling and access before quoting.",
		);
		expect(es.w03aHandoff.subtitle).toBe(
			"Confirma modelo, estado, manipulación segura y acceso antes de cotizar.",
		);
		expect(en.w03aHandoff.sectionPayloadTitle).toBe(
			"W03 service review connected",
		);
		expect(es.w03aHandoff.sectionPayloadTitle).toBe(
			"Revisión de servicio W03 conectada",
		);
		expect(en.w03aHandoff.sectionAnchorTitle).toBe(
			"Unresolved quote conditions",
		);
		expect(es.w03aHandoff.sectionAnchorTitle).toBe(
			"Revisión de alcance del aparato",
		);
		expect(en.w03aHandoff.reviewBadge).toBe("Appliance scope review");
		expect(es.w03aHandoff.reviewBadge).toBe("Revisión necesaria");
		expect(en.w03aHandoff.primaryCta).toBe("Review appliance details");
		expect(es.w03aHandoff.primaryCta).toBe("Revisar datos del aparato");
		expect(en.w03aHandoff.secondaryCta).toBe("Edit items   ›");
		expect(es.w03aHandoff.secondaryCta).toBe("Editar objetos   ›");
	});

	it("verifies appliance missing photo disclosure and disconnection requirements", () => {
		expect(en.w03aHandoff.payloadLine2).toBe(
			"Washing machine ×1 · 27 × 29 × 39 in · ~170 lb",
		);
		expect(es.w03aHandoff.payloadLine2).toBe(
			"Lavadora ×1 · 27 × 29 × 39 pulg. · ~170 lb",
		);
		expect(en.w03aHandoff.payloadLine3).toBe(
			"No appliance photo supplied · clarification required",
		);
		expect(es.w03aHandoff.payloadLine3).toBe(
			"No se aportó foto del aparato · Se necesita aclaración",
		);
		expect(en.w03aHandoff.payloadLine4).toBe(
			"Ground-floor pickup · water/electric disconnect not included",
		);
		expect(es.w03aHandoff.payloadLine4).toBe(
			"Planta baja · Desconexión de agua/electricidad no incluida",
		);

		expect(en.w03aHandoff.anchorLine1).toBe(
			"Appliance disconnection and disposal acceptance not yet verified.",
		);
		expect(es.w03aHandoff.anchorLine1).toBe(
			"Aún no se verificó la desconexión ni la aceptación para eliminación.",
		);
	});

	it("verifies honest upcoming C22 notice string without fake classification", () => {
		expect(en.w03aHandoff.noticeUpcomingC22).toContain(
			"Appliance AI recognition (C22) is scheduled for an upcoming sprint",
		);
		expect(es.w03aHandoff.noticeUpcomingC22).toContain(
			"El reconocimiento de electrodomésticos con IA (C22) está programado para una fase próxima",
		);
	});

	it("verifies default W03-A-HANDOFF fixture data", () => {
		expect(W03_A_DEFAULT_DATA.serviceId).toBe("appliance-removal");
		expect(W03_A_DEFAULT_DATA.bookingId).toBe("HX-DEMO-APPL-1036");
		expect(W03_A_DEFAULT_DATA.defaultCustomerEn).toBe("Sarah Mitchell");
	});
});
