import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { W03_M_DEFAULT_DATA } from "../fixtures/c27ServiceHandoffs";

describe("W03-M-HANDOFF Moving AI Review Entry — English (Node 392:405) & Spanish (Node 980:10826)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/moving-ai-handoff.tsx",
	);
	const reviewRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/moving-intake-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "w03m-es"');
		expect(navContent).toContain('id: "w03m-en"');
		expect(navContent).toContain('route: "/moving-ai-handoff"');
	});

	it("verifies upstream review route connects to moving-ai-handoff", () => {
		const reviewContent = fs.readFileSync(reviewRoutePath, "utf8");
		expect(reviewContent).toContain('router.push("/moving-ai-handoff")');
	});

	it("verifies exact W03-M-HANDOFF English and Spanish translation strings", () => {
		expect(en.w03mHandoff.title).toBe("Moving AI review available");
		expect(es.w03mHandoff.title).toBe("Revisión de mudanza con IA disponible");
		expect(en.w03mHandoff.subtitle).toBe(
			"Review moving items, destination and access before any estimate.",
		);
		expect(es.w03mHandoff.subtitle).toBe(
			"Revisa muebles, cajas, destino y acceso antes de estimar.",
		);
		expect(en.w03mHandoff.sectionPayloadTitle).toBe("Payload for W03");
		expect(es.w03mHandoff.sectionPayloadTitle).toBe("Datos para W03");
		expect(en.w03mHandoff.sectionAnchorTitle).toBe("Service rates pending");
		expect(es.w03mHandoff.sectionAnchorTitle).toBe("Tarifas pendientes");
		expect(en.w03mHandoff.reviewBadge).toBe("Moving scope review");
		expect(es.w03mHandoff.reviewBadge).toBe("Revisar alcance de mudanza");
		expect(en.w03mHandoff.primaryCta).toBe("Start moving AI review");
		expect(es.w03mHandoff.primaryCta).toBe("Iniciar revisión de mudanza");
		expect(en.w03mHandoff.secondaryCta).toBe("Edit items   ›");
		expect(es.w03mHandoff.secondaryCta).toBe("Editar objetos   ›");
	});

	it("verifies moving inventory, destination, and rates pending guidance", () => {
		expect(en.w03mHandoff.payloadLine2).toBe(
			"Customer inventory: sofa, dresser and 12 boxes",
		);
		expect(es.w03mHandoff.payloadLine2).toBe(
			"Inventario: sofá, cómoda y 12 cajas",
		);
		expect(en.w03mHandoff.payloadLine3).toBe(
			"Pickup: 2140 E Sample Road, Phoenix, AZ 85016",
		);
		expect(es.w03mHandoff.payloadLine3).toBe(
			"Recogida: 2140 E Sample Road, Phoenix, AZ 85016",
		);
		expect(en.w03mHandoff.payloadLine4).toBe(
			"Destination: 5678 N Demo Avenue, Phoenix, AZ 85012",
		);
		expect(es.w03mHandoff.payloadLine4).toBe(
			"Destino: 5678 N Demo Avenue, Phoenix, AZ 85012",
		);

		expect(en.w03mHandoff.anchorLine1).toBe(
			"AI must validate the customer-supplied inventory.",
		);
		expect(es.w03mHandoff.anchorLine1).toBe(
			"La IA debe validar el inventario proporcionado por el cliente.",
		);
		expect(en.w03mHandoff.anchorLine2).toBe(
			"No definitive rate or vehicle load is assumed.",
		);
		expect(es.w03mHandoff.anchorLine2).toBe(
			"No se presupone tarifa ni capacidad de vehículo definitivas.",
		);
	});

	it("verifies honest upcoming C22 notice string without fake classification or dispatch", () => {
		expect(en.w03mHandoff.noticeUpcomingC22).toContain(
			"Moving AI item recognition (C22) is scheduled for an upcoming sprint",
		);
		expect(es.w03mHandoff.noticeUpcomingC22).toContain(
			"El reconocimiento de mudanza con IA (C22) está programado para una fase próxima",
		);
	});

	it("verifies default W03-M-HANDOFF fixture data", () => {
		expect(W03_M_DEFAULT_DATA.serviceId).toBe("moving");
		expect(W03_M_DEFAULT_DATA.bookingId).toBe("HX-DEMO-MOVE-1034");
		expect(W03_M_DEFAULT_DATA.defaultCustomerEn).toBe("Daniel Ruiz");
	});
});
