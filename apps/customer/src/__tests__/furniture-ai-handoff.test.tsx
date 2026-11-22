import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { W03_F_DEFAULT_DATA } from "../fixtures/c28AiHandoffs";

describe("W03-F-HANDOFF Furniture Pickup Review Entry — English (Node 394:239) & Spanish (Node 980:11246)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/furniture-ai-handoff.tsx",
	);
	const reviewRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/furniture-intake-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "w03f-es"');
		expect(navContent).toContain('id: "w03f-en"');
		expect(navContent).toContain('route: "/furniture-ai-handoff"');
	});

	it("verifies upstream review route connects to furniture-ai-handoff", () => {
		const reviewContent = fs.readFileSync(reviewRoutePath, "utf8");
		expect(reviewContent).toContain('router.push("/furniture-ai-handoff")');
	});

	it("verifies exact W03-F-HANDOFF English and Spanish translation strings", () => {
		expect(en.w03fHandoff.title).toBe("Furniture Pickup review available");
		expect(es.w03fHandoff.title).toBe(
			"Revisión de retiro de muebles disponible",
		);
		expect(en.w03fHandoff.subtitle).toBe(
			"Confirm furniture count, condition, disassembly and carry distance before quoting.",
		);
		expect(es.w03fHandoff.subtitle).toBe(
			"Confirma cantidad, estado, desmontaje y distancia antes de cotizar.",
		);
		expect(en.w03fHandoff.sectionPayloadTitle).toBe(
			"W03 service review connected",
		);
		expect(es.w03fHandoff.sectionPayloadTitle).toBe(
			"Revisión de servicio W03 conectada",
		);
		expect(en.w03fHandoff.sectionAnchorTitle).toBe(
			"Unresolved quote conditions",
		);
		expect(es.w03fHandoff.sectionAnchorTitle).toBe(
			"Revisión de alcance de muebles",
		);
		expect(en.w03fHandoff.reviewBadge).toBe("Furniture scope review");
		expect(es.w03fHandoff.reviewBadge).toBe("Revisión necesaria");
		expect(en.w03fHandoff.primaryCta).toBe("Start furniture review");
		expect(es.w03fHandoff.primaryCta).toBe("Iniciar revisión de muebles");
		expect(en.w03fHandoff.secondaryCta).toBe("Edit items   ›");
		expect(es.w03fHandoff.secondaryCta).toBe("Editar objetos   ›");
	});

	it("verifies furniture payload, crew rules, and unconfirmed quote conditions", () => {
		expect(en.w03fHandoff.payloadLine2).toBe(
			"3-seat fabric sofa ×1 · 82 × 35 × 34 in · ~125 lb",
		);
		expect(es.w03fHandoff.payloadLine2).toBe(
			"Sofá de tela de 3 plazas ×1 · 82 × 35 × 34 pulg. · ~125 lb",
		);
		expect(en.w03fHandoff.payloadLine3).toBe(
			"One furniture example image exists in original concepts",
		);
		expect(es.w03fHandoff.payloadLine3).toBe(
			"Existe una imagen de ejemplo de muebles en los conceptos.",
		);
		expect(en.w03fHandoff.payloadLine4).toBe(
			"Pickup at 1234 E Example Lane · ground-floor driveway",
		);
		expect(es.w03fHandoff.payloadLine4).toBe(
			"Recogida en 1234 E Example Lane · Entrada de planta baja",
		);
		expect(en.w03fHandoff.anchorLine1).toBe(
			"Bulky furniture handling requires approved vehicle/crew rules.",
		);
		expect(es.w03fHandoff.anchorLine1).toBe(
			"Los muebles voluminosos requieren vehículo y equipo autorizados.",
		);
		expect(en.w03fHandoff.anchorLine2).toBe(
			"No quote, payment or booking has been confirmed.",
		);
		expect(es.w03fHandoff.anchorLine2).toBe(
			"No hay precio final ni reserva confirmados.",
		);
	});

	it("verifies typed default fixture properties", () => {
		expect(W03_F_DEFAULT_DATA.serviceId).toBe("furniture-pickup");
		expect(W03_F_DEFAULT_DATA.bookingId).toBe("HX-DEMO-FURN-1039");
		expect(W03_F_DEFAULT_DATA.defaultCustomerEn).toBe("Sarah Mitchell");
		expect(W03_F_DEFAULT_DATA.defaultCustomerEs).toBe("Bryan Lopez Mendoza");
	});

	it("verifies honest upcoming notice mentions C22-D-FUR and no fake pricing", () => {
		expect(en.w03fHandoff.noticeUpcomingC22).toContain("C22-D-FUR");
		expect(es.w03fHandoff.noticeUpcomingC22).toContain("C22-D-FUR");
		expect(en.w03fHandoff.footerDemo).toContain("DEMO ONLY");
		expect(es.w03fHandoff.footerDemo).toContain("SOLO DEMO");
	});
});
