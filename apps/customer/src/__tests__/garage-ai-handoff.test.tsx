import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { W03_G_DEFAULT_DATA } from "../fixtures/c27ServiceHandoffs";

describe("W03-G-HANDOFF Garage Cleanout AI Review Entry — English (Node 394:545) & Spanish (Node 980:11426)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/garage-ai-handoff.tsx",
	);
	const reviewRoutePath = path.resolve(
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
		expect(navContent).toContain('id: "w03g-es"');
		expect(navContent).toContain('id: "w03g-en"');
		expect(navContent).toContain('route: "/garage-ai-handoff"');
	});

	it("verifies upstream review route connects to garage-ai-handoff", () => {
		const reviewContent = fs.readFileSync(reviewRoutePath, "utf8");
		expect(reviewContent).toContain('router.push("/garage-ai-handoff")');
	});

	it("verifies exact W03-G-HANDOFF English and Spanish translation strings", () => {
		expect(en.w03gHandoff.title).toBe("Garage Cleanout review available");
		expect(es.w03gHandoff.title).toBe(
			"Revisión de limpieza de garaje disponible",
		);
		expect(en.w03gHandoff.subtitle).toBe(
			"Confirm volume, access and restricted materials before quoting.",
		);
		expect(es.w03gHandoff.subtitle).toBe(
			"Confirma volumen, acceso y materiales restringidos antes de cotizar.",
		);
		expect(en.w03gHandoff.sectionPayloadTitle).toBe(
			"W03 service review connected",
		);
		expect(es.w03gHandoff.sectionPayloadTitle).toBe(
			"Revisión de servicio W03 conectada",
		);
		expect(en.w03gHandoff.sectionAnchorTitle).toBe(
			"Unresolved quote conditions",
		);
		expect(es.w03gHandoff.sectionAnchorTitle).toBe(
			"Revisión de alcance del garaje",
		);
		expect(en.w03gHandoff.reviewBadge).toBe("Garage scope review");
		expect(es.w03gHandoff.reviewBadge).toBe("Revisión necesaria");
		expect(en.w03gHandoff.primaryCta).toBe("Start garage review");
		expect(es.w03gHandoff.primaryCta).toBe("Iniciar revisión de garaje");
		expect(en.w03gHandoff.secondaryCta).toBe("Edit items   ›");
		expect(es.w03gHandoff.secondaryCta).toBe("Editar objetos   ›");
	});

	it("verifies garage uncertain volume, missing photos, and restricted material notices", () => {
		expect(en.w03gHandoff.payloadLine2).toBe(
			"Cardboard boxes and shelving · exact count not supplied",
		);
		expect(es.w03gHandoff.payloadLine2).toBe(
			"Volumen y contenido del garaje · por confirmar",
		);
		expect(en.w03gHandoff.payloadLine3).toBe(
			"Additional garage photos required for uncertain materials",
		);
		expect(es.w03gHandoff.payloadLine3).toBe(
			"Se requieren más fotos del garaje por materiales inciertos",
		);
		expect(en.w03gHandoff.payloadLine4).toBe(
			"One-bay residential garage · driveway accessible",
		);
		expect(es.w03gHandoff.payloadLine4).toBe(
			"Garaje residencial de una plaza · Entrada accesible",
		);

		expect(en.w03gHandoff.anchorLine1).toBe(
			"Unknown liquids or contaminated loads require clarification/refusal.",
		);
		expect(es.w03gHandoff.anchorLine1).toBe(
			"Líquidos desconocidos o cargas contaminadas exigen aclaración o rechazo.",
		);
		expect(en.w03gHandoff.anchorLine3).toBe(
			"Restricted materials and disposal rules may require authorized review.",
		);
		expect(es.w03gHandoff.anchorLine3).toBe(
			"Las tarifas y normas de desecho requieren aprobación.",
		);
	});

	it("verifies honest upcoming C22 notice string without fake classification", () => {
		expect(en.w03gHandoff.noticeUpcomingC22).toContain(
			"Garage AI recognition (C22) is scheduled for an upcoming sprint",
		);
		expect(es.w03gHandoff.noticeUpcomingC22).toContain(
			"El reconocimiento de limpieza de garaje con IA (C22) está programado para una fase próxima",
		);
	});

	it("verifies default W03-G-HANDOFF fixture data", () => {
		expect(W03_G_DEFAULT_DATA.serviceId).toBe("garage-cleanout");
		expect(W03_G_DEFAULT_DATA.bookingId).toBe("HX-DEMO-GAR-1040");
		expect(W03_G_DEFAULT_DATA.defaultCustomerEn).toBe("Sarah Mitchell");
	});
});
