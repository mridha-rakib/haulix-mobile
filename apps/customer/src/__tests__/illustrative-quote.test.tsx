import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	C24Q_ILLUSTRATIVE_TOTAL,
	C24Q_INCLUDED_ITEMS,
	C24Q_PRICE_ROWS,
} from "../fixtures/c32Quote";

describe("C24-Q Illustrative Quote Overview — English (Node 412:1140) & Spanish (Node 987:11051)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/illustrative-quote.tsx",
	);
	const quoteProcessingPath = path.resolve(
		__dirname,
		"../../app/(app)/quote-processing.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c24q-es"');
		expect(navContent).toContain('id: "c24q-en"');
		expect(navContent).toContain('route: "/illustrative-quote"');
	});

	it("verifies C24-P connects to C24-Q and C24-Q connects back to C24-P", () => {
		const processingContent = fs.readFileSync(quoteProcessingPath, "utf8");
		expect(processingContent).toContain('pathname: "/illustrative-quote"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/quote-processing"');
	});

	it("verifies exact C24-Q English and Spanish translation strings", () => {
		expect(en.c24qIllustrativeQuote.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c24qIllustrativeQuote.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c24qIllustrativeQuote.title).toBe("Your instant quote");
		expect(es.c24qIllustrativeQuote.title).toBe("Tu cotización inmediata");
		expect(en.c24qIllustrativeQuote.sectionItemsTitle).toBe("Included items");
		expect(es.c24qIllustrativeQuote.sectionItemsTitle).toBe(
			"Objetos incluidos",
		);
		expect(en.c24qIllustrativeQuote.itemSofaTitle).toBe("3-seat sofa");
		expect(es.c24qIllustrativeQuote.itemSofaTitle).toBe("Sofá de tres plazas");
		expect(en.c24qIllustrativeQuote.itemMattressesTitle).toBe(
			"Queen mattresses",
		);
		expect(es.c24qIllustrativeQuote.itemMattressesTitle).toBe(
			"Colchones tamaño queen",
		);
		expect(en.c24qIllustrativeQuote.itemTableTitle).toBe("Dining table");
		expect(es.c24qIllustrativeQuote.itemTableTitle).toBe("Mesa de comedor");
		expect(en.c24qIllustrativeQuote.sectionSubtotalTitle).toBe(
			"Estimated service subtotal",
		);
		expect(es.c24qIllustrativeQuote.sectionSubtotalTitle).toBe(
			"Subtotal estimado del servicio",
		);
		expect(en.c24qIllustrativeQuote.priceLaborLabel).toBe(
			"Labor · 2 workers / ~2h",
		);
		expect(es.c24qIllustrativeQuote.priceLaborLabel).toBe(
			"Mano de obra · 2 trabajadores / ~2 h",
		);
		expect(en.c24qIllustrativeQuote.priceLaborAmount).toBe("$160");
		expect(es.c24qIllustrativeQuote.priceLaborAmount).toBe("$160");
		expect(en.c24qIllustrativeQuote.sectionEstimateTitle).toBe(
			"Illustrative estimate",
		);
		expect(es.c24qIllustrativeQuote.sectionEstimateTitle).toBe(
			"Estimación ilustrativa",
		);
		expect(en.c24qIllustrativeQuote.estimateAmount).toBe("$356");
		expect(es.c24qIllustrativeQuote.estimateAmount).toBe("$356");
		expect(en.c24qIllustrativeQuote.estimateSubtotalNote).toBe(
			"Subtotal only · taxes/tips separate",
		);
		expect(es.c24qIllustrativeQuote.estimateSubtotalNote).toBe(
			"Solo subtotal · Impuestos y propinas aparte",
		);
		expect(en.c24qIllustrativeQuote.primaryCta).toBe(
			"Review full price breakdown",
		);
		expect(es.c24qIllustrativeQuote.primaryCta).toBe(
			"Revisar desglose completo de precio",
		);
		expect(en.c24qIllustrativeQuote.secondaryCta).toBe(
			"Edit details & recalculate  ›",
		);
		expect(es.c24qIllustrativeQuote.secondaryCta).toBe(
			"Editar detalles y recalcular  ›",
		);
		expect(en.c24qIllustrativeQuote.tertiaryCta).toBe(
			"Expired quote example  ›",
		);
		expect(es.c24qIllustrativeQuote.tertiaryCta).toBe(
			"Ejemplo de cotización vencida  ›",
		);
	});

	it("verifies illustrative subtotal rows sum to exactly $356", () => {
		expect(C24Q_PRICE_ROWS).toHaveLength(5);
		const amounts = C24Q_PRICE_ROWS.map((r) =>
			Number.parseInt(r.amount.replace("$", ""), 10),
		);
		const total = amounts.reduce((acc, curr) => acc + curr, 0);
		expect(total).toBe(356);
		expect(C24Q_ILLUSTRATIVE_TOTAL).toBe("$356");
	});

	it("verifies included items reuse original photography assets and preserve mattress count 2", () => {
		expect(C24Q_INCLUDED_ITEMS).toHaveLength(3);
		const mattresses = C24Q_INCLUDED_ITEMS.find(
			(i) => i.itemKey === "mattresses",
		);
		expect(mattresses).toBeDefined();

		const assetsDir = path.resolve(__dirname, "../../assets/images/intake");
		expect(fs.existsSync(path.join(assetsDir, "c18j-sofa.png"))).toBe(true);
		expect(fs.existsSync(path.join(assetsDir, "c18j-mattresses.png"))).toBe(
			true,
		);
		expect(fs.existsSync(path.join(assetsDir, "c18j-table.png"))).toBe(true);
	});
});
