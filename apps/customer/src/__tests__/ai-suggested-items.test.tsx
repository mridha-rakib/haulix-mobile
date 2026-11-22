import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C22D_SUGGESTED_ITEMS } from "../fixtures/c29AiResults";

describe("C22-D AI Suggested Items / Quantity Mismatch — English (Node 412:328) & Spanish (Node 987:10084)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/ai-suggested-items.tsx",
	);
	const processingRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/ai-processing.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c22d-es"');
		expect(navContent).toContain('id: "c22d-en"');
		expect(navContent).toContain('route: "/ai-suggested-items"');
	});

	it("verifies C22-P connects to C22-D", () => {
		const processingContent = fs.readFileSync(processingRoutePath, "utf8");
		expect(processingContent).toContain('pathname: "/ai-suggested-items"');
	});

	it("verifies exact C22-D English and Spanish translation strings", () => {
		expect(en.c22dAiSuggestedItems.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c22dAiSuggestedItems.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c22dAiSuggestedItems.title).toBe("We found potential items");
		expect(es.c22dAiSuggestedItems.title).toBe("Encontramos posibles objetos");
		expect(en.c22dAiSuggestedItems.subtitle).toBe(
			"Please compare each result with what you entered.",
		);
		expect(es.c22dAiSuggestedItems.subtitle).toBe(
			"Compara cada resultado con lo que introdujiste.",
		);
		expect(en.c22dAiSuggestedItems.sectionSuggestionsTitle).toBe(
			"AI suggestions · unconfirmed",
		);
		expect(es.c22dAiSuggestedItems.sectionSuggestionsTitle).toBe(
			"Sugerencias de IA · Sin confirmar",
		);
		expect(en.c22dAiSuggestedItems.sectionMismatchTitle).toBe(
			"One quantity mismatch found",
		);
		expect(es.c22dAiSuggestedItems.sectionMismatchTitle).toBe(
			"Se encontró una diferencia de cantidad",
		);
		expect(en.c22dAiSuggestedItems.primaryCta).toBe("Verify each item");
		expect(es.c22dAiSuggestedItems.primaryCta).toBe("Verificar cada objeto");
		expect(en.c22dAiSuggestedItems.secondaryUncertainCta).toBe(
			"AI uncertain about an item  ›",
		);
		expect(es.c22dAiSuggestedItems.secondaryUncertainCta).toBe(
			"¿La IA duda sobre un objeto?  ›",
		);
	});

	it("verifies suggested items data contract and customer quantity preservation", () => {
		expect(C22D_SUGGESTED_ITEMS).toHaveLength(3);

		// Sofa
		const sofa = C22D_SUGGESTED_ITEMS[0];
		expect(sofa.nameKey).toBe("sofa");
		expect(sofa.suggestedQty).toBe(1);
		expect(sofa.customerQty).toBe(1);
		expect(sofa.hasMismatch).toBe(false);

		// Mattress: customer quantity 2 is preserved, AI suggested 1 is unconfirmed mismatch
		const mattress = C22D_SUGGESTED_ITEMS[1];
		expect(mattress.nameKey).toBe("mattress");
		expect(mattress.suggestedQty).toBe(1);
		expect(mattress.customerQty).toBe(2);
		expect(mattress.hasMismatch).toBe(true);

		// Table
		const table = C22D_SUGGESTED_ITEMS[2];
		expect(table.nameKey).toBe("diningTable");
		expect(table.suggestedQty).toBe(1);
		expect(table.customerQty).toBe(1);
		expect(table.hasMismatch).toBe(false);
	});

	it("verifies genuine image assets referenced by C22-D exist on disk", () => {
		const assetsDir = path.resolve(__dirname, "../../assets/images/intake");
		expect(fs.existsSync(path.join(assetsDir, "c18j-sofa.png"))).toBe(true);
		expect(fs.existsSync(path.join(assetsDir, "c18j-mattresses.png"))).toBe(
			true,
		);
		expect(fs.existsSync(path.join(assetsDir, "c18j-table.png"))).toBe(true);
	});

	it("verifies upcoming notices for C23 and C23-U without fabricated forms", () => {
		expect(en.c22dAiSuggestedItems.noticeUpcomingVerification).toContain("C23");
		expect(es.c22dAiSuggestedItems.noticeUpcomingVerification).toContain("C23");
		expect(en.c22dAiSuggestedItems.noticeUpcomingUncertainty).toContain(
			"C23-U",
		);
		expect(es.c22dAiSuggestedItems.noticeUpcomingUncertainty).toContain(
			"C23-U",
		);
		expect(en.c22dAiSuggestedItems.footerDemo).toBe(
			"DEMO STATE · No validated quote or booking yet",
		);
	});
});
