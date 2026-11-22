import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C23_VERIFICATION_ITEMS } from "../fixtures/c30Verification";

describe("C23 Verify Suggested Inventory — English (Node 412:563) & Spanish (Node 987:10367)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/verify-suggested-inventory.tsx",
	);
	const suggestedRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/ai-suggested-items.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c23-es"');
		expect(navContent).toContain('id: "c23-en"');
		expect(navContent).toContain('route: "/verify-suggested-inventory"');
	});

	it("verifies C22-D connects to C23", () => {
		const suggestedContent = fs.readFileSync(suggestedRoutePath, "utf8");
		expect(suggestedContent).toContain(
			'pathname: "/verify-suggested-inventory"',
		);
	});

	it("verifies exact C23 English and Spanish translation strings", () => {
		expect(en.c23VerifySuggestedInventory.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c23VerifySuggestedInventory.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c23VerifySuggestedInventory.title).toBe(
			"Check all recognized items",
		);
		expect(es.c23VerifySuggestedInventory.title).toBe(
			"Revisar todos los objetos reconocidos",
		);
		expect(en.c23VerifySuggestedInventory.subtitle).toBe(
			"Sarah must confirm or correct item type, quantities and dimensions.",
		);
		expect(es.c23VerifySuggestedInventory.subtitle).toBe(
			"Sarah debe confirmar o corregir tipo, cantidades y medidas.",
		);
		expect(en.c23VerifySuggestedInventory.sectionCompareTitle).toBe(
			"Compare suggestions with your draft",
		);
		expect(es.c23VerifySuggestedInventory.sectionCompareTitle).toBe(
			"Comparar sugerencias con tu borrador",
		);
		expect(en.c23VerifySuggestedInventory.sectionCorrectionTitle).toBe(
			"Your correction is required",
		);
		expect(es.c23VerifySuggestedInventory.sectionCorrectionTitle).toBe(
			"Debes corregir un dato",
		);
		expect(en.c23VerifySuggestedInventory.primaryCta).toBe(
			"Correct mattress quantity",
		);
		expect(es.c23VerifySuggestedInventory.primaryCta).toBe(
			"Corregir cantidad de colchones",
		);
		expect(en.c23VerifySuggestedInventory.secondaryMeasurementsCta).toBe(
			"Not sure about measurements  ›",
		);
		expect(es.c23VerifySuggestedInventory.secondaryMeasurementsCta).toBe(
			"¿No estás seguro de las medidas?  ›",
		);
		expect(en.c23VerifySuggestedInventory.secondaryWrongCta).toBe(
			"AI suggestion wrong?  ›",
		);
		expect(es.c23VerifySuggestedInventory.secondaryWrongCta).toBe(
			"¿Sugerencia de IA incorrecta?  ›",
		);
	});

	it("verifies verification items fixture preserves customer count of 2 mattresses", () => {
		expect(C23_VERIFICATION_ITEMS).toHaveLength(3);

		const sofa = C23_VERIFICATION_ITEMS.find((i) => i.key === "sofa");
		expect(sofa?.customerQty).toBe(1);
		expect(sofa?.aiSuggestedQty).toBe(1);
		expect(sofa?.hasMismatch).toBe(false);

		const mattresses = C23_VERIFICATION_ITEMS.find(
			(i) => i.key === "mattresses",
		);
		expect(mattresses?.customerQty).toBe(2); // Strict invariant
		expect(mattresses?.aiSuggestedQty).toBe(1); // AI mismatch
		expect(mattresses?.hasMismatch).toBe(true);

		const table = C23_VERIFICATION_ITEMS.find((i) => i.key === "table");
		expect(table?.customerQty).toBe(1);
		expect(table?.aiSuggestedQty).toBe(1);
		expect(table?.hasMismatch).toBe(false);
	});

	it("verifies genuine image assets referenced by C23 exist on disk", () => {
		const assetsDir = path.resolve(__dirname, "../../assets/images/intake");
		expect(fs.existsSync(path.join(assetsDir, "c18j-sofa.png"))).toBe(true);
		expect(fs.existsSync(path.join(assetsDir, "c18j-mattresses.png"))).toBe(
			true,
		);
		expect(fs.existsSync(path.join(assetsDir, "c18j-table.png"))).toBe(true);
	});
});
