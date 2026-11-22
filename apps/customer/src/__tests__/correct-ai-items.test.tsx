import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C23C_DEFAULT_CORRECTION_FIELDS } from "../fixtures/c31Verification";

describe("C23-C Correct AI Items — English (Node 412:625) & Spanish (Node 987:10439)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/correct-ai-items.tsx",
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
		expect(navContent).toContain('id: "c23c-es"');
		expect(navContent).toContain('id: "c23c-en"');
		expect(navContent).toContain('route: "/correct-ai-items"');
	});

	it("verifies upstream screens connect to C23-C", () => {
		const verifyContent = fs.readFileSync(verifyRoutePath, "utf8");
		expect(verifyContent).toContain('pathname: "/correct-ai-items"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/customer-confirmed-items"');
		expect(routeContent).toContain('pathname: "/verify-suggested-inventory"');
	});

	it("verifies exact C23-C English and Spanish translation strings", () => {
		expect(en.c23cCorrectAiItems.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c23cCorrectAiItems.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c23cCorrectAiItems.title).toBe("Correct the item details");
		expect(es.c23cCorrectAiItems.title).toBe("Corregir detalles del objeto");
		expect(en.c23cCorrectAiItems.subtitle).toBe(
			"The customer-confirmed inventory overrides unverified AI suggestions.",
		);
		expect(es.c23cCorrectAiItems.subtitle).toBe(
			"El inventario confirmado prevalece sobre sugerencias IA no verificadas.",
		);
		expect(en.c23cCorrectAiItems.sectionCorrectionTitle).toBe(
			"Queen mattress correction",
		);
		expect(es.c23cCorrectAiItems.sectionCorrectionTitle).toBe(
			"Corrección del colchón queen",
		);
		expect(en.c23cCorrectAiItems.fieldItemNameLabel).toBe("Correct item name");
		expect(es.c23cCorrectAiItems.fieldItemNameLabel).toBe(
			"Nombre correcto del objeto",
		);
		expect(en.c23cCorrectAiItems.fieldItemNameValue).toBe("Queen mattress");
		expect(es.c23cCorrectAiItems.fieldItemNameValue).toBe("Colchón queen");
		expect(en.c23cCorrectAiItems.fieldQuantityLabel).toBe(
			"Number of mattresses",
		);
		expect(es.c23cCorrectAiItems.fieldQuantityLabel).toBe(
			"Número de colchones",
		);
		expect(en.c23cCorrectAiItems.fieldQuantityValue).toBe("2");
		expect(es.c23cCorrectAiItems.fieldQuantityValue).toBe("2");
		expect(en.c23cCorrectAiItems.fieldDimensionsLabel).toBe(
			"Dimensions per item",
		);
		expect(es.c23cCorrectAiItems.fieldDimensionsLabel).toBe(
			"Dimensiones por objeto",
		);
		expect(en.c23cCorrectAiItems.fieldDimensionsValue).toBe(
			"80 × 60 × 11 in · customer estimated",
		);
		expect(es.c23cCorrectAiItems.fieldDimensionsValue).toBe(
			"80 × 60 × 11 pulg. · Estimación del cliente",
		);
		expect(en.c23cCorrectAiItems.fieldWeightLabel).toBe("Weight per item");
		expect(en.c23cCorrectAiItems.fieldWeightValue).toBe(
			"~70 lb · customer estimated",
		);
		expect(es.c23cCorrectAiItems.fieldWeightValue).toBe(
			"~70 lb · Estimación del cliente",
		);
		expect(en.c23cCorrectAiItems.fieldPhotoLabel).toBe("Supporting photo");
		expect(es.c23cCorrectAiItems.fieldPhotoLabel).toBe(
			"Fotografía de respaldo",
		);
		expect(en.c23cCorrectAiItems.fieldPhotoValue).toBe(
			"Existing image retained",
		);
		expect(es.c23cCorrectAiItems.fieldPhotoValue).toBe(
			"Se conserva la imagen anterior",
		);
		expect(en.c23cCorrectAiItems.sectionNoticeTitle).toBe(
			"Updated draft inputs",
		);
		expect(es.c23cCorrectAiItems.sectionNoticeTitle).toBe(
			"Datos del borrador actualizados",
		);
		expect(en.c23cCorrectAiItems.noticeSupporting).toBe(
			"Quantity corrected from AI's 1 to Sarah's 2.",
		);
		expect(es.c23cCorrectAiItems.noticeSupporting).toBe(
			"Cantidad corregida: IA indicó 1 y Sarah confirmó 2.",
		);
		expect(en.c23cCorrectAiItems.noticeParagraph).toBe(
			"Price inputs must be recalculated from corrected, rule-versioned information.",
		);
		expect(es.c23cCorrectAiItems.noticeParagraph).toBe(
			"Los precios se recalculan con datos corregidos y reglas vigentes.",
		);
		expect(en.c23cCorrectAiItems.primaryCta).toBe("Save and confirm all items");
		expect(es.c23cCorrectAiItems.primaryCta).toBe(
			"Guardar y confirmar todos los objetos",
		);
		expect(en.c23cCorrectAiItems.secondaryCta).toBe("Return to comparison  ›");
		expect(es.c23cCorrectAiItems.secondaryCta).toBe("Volver a comparación  ›");
	});

	it("verifies correction default values match customer specifications", () => {
		expect(C23C_DEFAULT_CORRECTION_FIELDS).toHaveLength(5);
		const qtyField = C23C_DEFAULT_CORRECTION_FIELDS.find(
			(f) => f.fieldKey === "quantity",
		);
		expect(qtyField?.defaultValue).toBe("2");
	});
});
