import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { W03_R_DEFAULT_DATA } from "../fixtures/c28AiHandoffs";

describe("W03-R-HANDOFF Retail Pickup Review Entry — English (Node 392:507) & Spanish (Node 980:10946)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/retail-ai-handoff.tsx",
	);
	const reviewRoutePath = path.resolve(
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
		expect(navContent).toContain('id: "w03r-es"');
		expect(navContent).toContain('id: "w03r-en"');
		expect(navContent).toContain('route: "/retail-ai-handoff"');
	});

	it("verifies upstream review route connects to retail-ai-handoff", () => {
		const reviewContent = fs.readFileSync(reviewRoutePath, "utf8");
		expect(reviewContent).toContain('router.push("/retail-ai-handoff")');
	});

	it("verifies exact W03-R-HANDOFF English and Spanish translation strings", () => {
		expect(en.w03rHandoff.title).toBe("Retail pickup review available");
		expect(es.w03rHandoff.title).toBe(
			"Revisión de recogida comercial disponible",
		);
		expect(en.w03rHandoff.subtitle).toBe(
			"Verify the order, collection window and delivery access before quoting.",
		);
		expect(es.w03rHandoff.subtitle).toBe(
			"Verifica pedido, horario de recogida y acceso de entrega antes de cotizar.",
		);
		expect(en.w03rHandoff.sectionPayloadTitle).toBe("Payload for W03");
		expect(es.w03rHandoff.sectionPayloadTitle).toBe("Datos para W03");
		expect(en.w03rHandoff.sectionAnchorTitle).toBe("Service rates pending");
		expect(es.w03rHandoff.sectionAnchorTitle).toBe("Tarifas pendientes");
		expect(en.w03rHandoff.reviewBadge).toBe("Retail scope review");
		expect(es.w03rHandoff.reviewBadge).toBe("Revisar pedido comercial");
		expect(en.w03rHandoff.primaryCta).toBe("Start retail pickup review");
		expect(es.w03rHandoff.primaryCta).toBe("Iniciar revisión comercial");
		expect(en.w03rHandoff.secondaryCta).toBe("Edit items   ›");
		expect(es.w03rHandoff.secondaryCta).toBe("Editar objetos   ›");
	});

	it("verifies retail order details remain manually provided and unverified", () => {
		expect(en.w03rHandoff.payloadLine2).toBe(
			"Home Depot · HD-DEMO-58321 · manually provided order",
		);
		expect(es.w03rHandoff.payloadLine2).toBe(
			"Home Depot · HD-DEMO-58321 · Pedido indicado manualmente",
		);
		expect(en.w03rHandoff.payloadLine3).toBe(
			"Destination: 5678 N Demo Avenue, Phoenix, AZ 85012",
		);
		expect(es.w03rHandoff.payloadLine3).toBe(
			"Destino: 5678 N Demo Avenue, Phoenix, AZ 85012",
		);
		expect(en.w03rHandoff.payloadLine4).toBe(
			"Shelving ×2, boxed furniture ×1 · packaging to verify",
		);
		expect(es.w03rHandoff.payloadLine4).toBe(
			"Estantes ×2, mueble embalado ×1 · Verificar embalaje",
		);
		expect(en.w03rHandoff.anchorLine1).toBe(
			"Verify order reference, store collection window and delivery access.",
		);
		expect(es.w03rHandoff.anchorLine1).toBe(
			"Verifica referencia del pedido y condiciones de recogida y entrega.",
		);
		expect(en.w03rHandoff.anchorLine2).toBe(
			"No provider-authorized payment or confirmed pickup.",
		);
		expect(es.w03rHandoff.anchorLine2).toBe(
			"Sin pago autorizado por proveedor ni recogida confirmada.",
		);
	});

	it("verifies typed default fixture properties", () => {
		expect(W03_R_DEFAULT_DATA.serviceId).toBe("retail-pickup");
		expect(W03_R_DEFAULT_DATA.bookingId).toBe("HX-DEMO-RETAIL-1035");
		expect(W03_R_DEFAULT_DATA.defaultCustomerEn).toBe("Emily Parker");
		expect(W03_R_DEFAULT_DATA.defaultCustomerEs).toBe("Emily Parker");
	});

	it("verifies honest upcoming notice mentions C22-D-RET and no fake pricing", () => {
		expect(en.w03rHandoff.noticeUpcomingC22).toContain("C22-D-RET");
		expect(es.w03rHandoff.noticeUpcomingC22).toContain("C22-D-RET");
		expect(en.w03rHandoff.footerDemo).toContain("DEMO ONLY");
		expect(es.w03rHandoff.footerDemo).toContain("SOLO DEMO");
	});
});
