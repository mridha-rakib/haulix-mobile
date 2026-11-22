import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C19E_DEFAULT_ITEM } from "../fixtures/c19eEditItem";

describe("C19-E Manual Item Correction — English (Node 382:1306) & Spanish (Node 980:9388)", () => {
	const c19eRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/edit-inventory-item.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
	});

	it("1. verifies exact English copy from Figma Node 382:1306", () => {
		expect(en.c19e.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c19e.stepSub).toBe("  /  C19-E");
		expect(en.c19e.title).toBe("Edit a listed item");
		expect(en.c19e.subtitle).toBe(
			"Make corrections to quantity, measurements and handling details.",
		);
		expect(en.c19e.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c19e.itemSectionTitle).toBe("3-seat sofa");
		expect(en.c19e.labelItemType).toBe("Item type");
		expect(en.c19e.valueItemType).toBe("Sofa · 3-seat");
		expect(en.c19e.labelQuantity).toBe("Quantity");
		expect(en.c19e.valueQuantity).toBe("1");
		expect(en.c19e.labelDimensions).toBe("Length / Width / Height");
		expect(en.c19e.valueDimensions).toBe("82 / 35 / 34 inches");
		expect(en.c19e.labelWeight).toBe("Approximate weight");
		expect(en.c19e.valueWeight).toBe("125 lb · customer estimate");
		expect(en.c19e.labelRemovalDifficulty).toBe("Removal difficulty");
		expect(en.c19e.valueRemovalDifficulty).toBe(
			"2 adults recommended for review",
		);
		expect(en.c19e.saveSectionTitle).toBe("Edit can be saved");
		expect(en.c19e.completedBadge).toBe("Completed in this demo");
		expect(en.c19e.saveDisclaimer1).toBe(
			"Corrected customer information becomes input to subsequent AI recognition and pricing.",
		);
		expect(en.c19e.saveDisclaimer2).toBe(
			"No exact measurements are claimed from images.",
		);
		expect(en.c19e.saveCta).toBe("Save corrected item");
		expect(en.c19e.cancelCta).toBe("Cancel changes   ›");
		expect(en.c19e.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c19e.footerSrs).toBe(
			"SRS  BK-03, AI-03, AI-04  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 980:9388", () => {
		expect(es.c19e.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
		expect(es.c19e.stepSub).toBe("  /  C19-E");
		expect(es.c19e.title).toBe("Editar objeto de la lista");
		expect(es.c19e.subtitle).toBe(
			"Corrige cantidad, medidas y detalles de manejo.",
		);
		expect(es.c19e.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c19e.itemSectionTitle).toBe("Sofá de tres plazas");
		expect(es.c19e.labelItemType).toBe("Tipo de objeto");
		expect(es.c19e.valueItemType).toBe("Sofá · 3 plazas");
		expect(es.c19e.labelQuantity).toBe("Cantidad");
		expect(es.c19e.valueQuantity).toBe("1");
		expect(es.c19e.labelDimensions).toBe("Largo / Ancho / Alto");
		expect(es.c19e.valueDimensions).toBe("82 / 35 / 34 pulgadas");
		expect(es.c19e.labelWeight).toBe("Peso aproximado");
		expect(es.c19e.valueWeight).toBe("125 lb · estimación del cliente");
		expect(es.c19e.labelRemovalDifficulty).toBe("Dificultad de retiro");
		expect(es.c19e.valueRemovalDifficulty).toBe(
			"Se recomiendan dos adultos para la evaluación",
		);
		expect(es.c19e.saveSectionTitle).toBe("La edición se puede guardar");
		expect(es.c19e.completedBadge).toBe("Completado en esta demo");
		expect(es.c19e.saveDisclaimer1).toBe(
			"Los datos corregidos alimentan el reconocimiento y precio posteriores.",
		);
		expect(es.c19e.saveDisclaimer2).toBe(
			"No se afirman medidas exactas a partir de fotos.",
		);
		expect(es.c19e.saveCta).toBe("Guardar objeto corregido");
		expect(es.c19e.cancelCta).toBe("Cancelar cambios   ›");
		expect(es.c19e.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c19e.footerSrs).toBe(
			"SRS  BK-03, AI-03, AI-04  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. validates customer profiles for English (Sarah) and Spanish (Bryan)", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});

	it("4. verifies route implementation and demo registration exist", () => {
		expect(fs.existsSync(c19eRoutePath)).toBe(true);
		const routeContent = fs.readFileSync(c19eRoutePath, "utf-8");
		expect(routeContent).toContain("c19e-save-button");
		expect(routeContent).toContain("c19e-cancel-button");

		expect(fs.existsSync(demoNavigatorPath)).toBe(true);
		const demoContent = fs.readFileSync(demoNavigatorPath, "utf-8");
		expect(demoContent).toContain("c19e-en");
		expect(demoContent).toContain("c19e-es");
	});

	it("5. verifies fixture data integrity", () => {
		expect(C19E_DEFAULT_ITEM.details).toHaveLength(5);
		expect(C19E_DEFAULT_ITEM.details.map((d) => d.key)).toEqual([
			"itemType",
			"quantity",
			"dimensions",
			"weight",
			"removalDifficulty",
		]);
	});
});
