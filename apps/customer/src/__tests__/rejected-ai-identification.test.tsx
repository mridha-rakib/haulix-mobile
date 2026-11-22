import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C23R_REJECTED_ITEM } from "../fixtures/c31Verification";

describe("C23-R Rejected AI Identification — English (Node 412:861) & Spanish (Node 987:10714)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/rejected-ai-identification.tsx",
	);
	const verifyRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/verify-suggested-inventory.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c23r-es"');
		expect(navContent).toContain('id: "c23r-en"');
		expect(navContent).toContain('route: "/rejected-ai-identification"');
	});

	it("verifies upstream screens connect to C23-R", () => {
		const verifyContent = fs.readFileSync(verifyRoutePath, "utf8");
		expect(verifyContent).toContain('pathname: "/rejected-ai-identification"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/correct-ai-items"');
		expect(routeContent).toContain('pathname: "/verify-suggested-inventory"');
	});

	it("verifies exact C23-R English and Spanish translation strings", () => {
		expect(en.c23rRejectedAiIdentification.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c23rRejectedAiIdentification.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c23rRejectedAiIdentification.title).toBe(
			"An AI suggestion looks incorrect",
		);
		expect(es.c23rRejectedAiIdentification.title).toBe(
			"Una sugerencia de IA parece incorrecta",
		);
		expect(en.c23rRejectedAiIdentification.subtitle).toBe(
			"Remove the wrong suggestion without deleting customer-confirmed booking data.",
		);
		expect(es.c23rRejectedAiIdentification.subtitle).toBe(
			"Elimina la sugerencia errónea sin borrar los datos confirmados.",
		);
		expect(en.c23rRejectedAiIdentification.sectionEvidenceTitle).toBe(
			"Customer evidence",
		);
		expect(es.c23rRejectedAiIdentification.sectionEvidenceTitle).toBe(
			"Pruebas del cliente",
		);
		expect(en.c23rRejectedAiIdentification.itemTitle).toBe("Queen mattresses");
		expect(es.c23rRejectedAiIdentification.itemTitle).toBe(
			"Colchones tamaño queen",
		);
		expect(en.c23rRejectedAiIdentification.itemCustomerUnits).toBe(
			"Customer confirms 2 units",
		);
		expect(es.c23rRejectedAiIdentification.itemCustomerUnits).toBe(
			"El cliente confirma 2 unidades",
		);
		expect(en.c23rRejectedAiIdentification.itemAiSuggestionWrong).toBe(
			"AI suggestion of 1 is incorrect",
		);
		expect(es.c23rRejectedAiIdentification.itemAiSuggestionWrong).toBe(
			"La sugerencia de 1 unidad es incorrecta",
		);
		expect(en.c23rRejectedAiIdentification.sectionNoticeTitle).toBe(
			"Keep the customer's validated items",
		);
		expect(es.c23rRejectedAiIdentification.sectionNoticeTitle).toBe(
			"Conservar objetos validados por el cliente",
		);
		expect(en.c23rRejectedAiIdentification.noticeSupporting).toBe(
			"Only the mistaken AI observation is rejected.",
		);
		expect(es.c23rRejectedAiIdentification.noticeSupporting).toBe(
			"Solo se rechaza la observación errónea de IA.",
		);
		expect(en.c23rRejectedAiIdentification.noticeParagraph).toBe(
			"Original customer input and media remain on the job audit trail.",
		);
		expect(es.c23rRejectedAiIdentification.noticeParagraph).toBe(
			"Los datos y fotos originales quedan en el historial de auditoría.",
		);
		expect(en.c23rRejectedAiIdentification.primaryCta).toBe(
			"Correct the item count",
		);
		expect(es.c23rRejectedAiIdentification.primaryCta).toBe(
			"Corregir cantidad de objetos",
		);
		expect(en.c23rRejectedAiIdentification.secondaryCta).toBe(
			"Return to verification  ›",
		);
		expect(es.c23rRejectedAiIdentification.secondaryCta).toBe(
			"Volver a verificación  ›",
		);
	});

	it("verifies rejected item evidence preserves customer qty = 2 vs AI qty = 1", () => {
		expect(C23R_REJECTED_ITEM.customerQty).toBe(2);
		expect(C23R_REJECTED_ITEM.aiSuggestedQty).toBe(1);

		const assetsDir = path.resolve(__dirname, "../../assets/images/intake");
		expect(fs.existsSync(path.join(assetsDir, "c18j-mattresses.png"))).toBe(
			true,
		);
	});
});
